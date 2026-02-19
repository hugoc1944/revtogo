import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!API_KEY) throw new Error("Missing Google Maps API key");

/* -------------------------------------------------- */
/* LIMITS */
/* -------------------------------------------------- */

const MAX_PER_KEYWORD = 20;
const GLOBAL_LIMIT = 5000;
const GRID_SIZE = 5;

/* -------------------------------------------------- */
/* TARGET REGIONS */
/* -------------------------------------------------- */

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Porto: { lat: 41.1579, lng: -8.6291 },
  Aveiro: { lat: 40.6405, lng: -8.6538 },
  Coimbra: { lat: 40.2033, lng: -8.4103 }
};

/* -------------------------------------------------- */
/* KEYWORDS */
/* -------------------------------------------------- */

const KEYWORDS = [
  "restaurant","sushi restaurant","pizzeria","burger restaurant","cafe","bar",
  "hotel","hostel","guesthouse",
  "physiotherapy clinic","dental clinic","dermatology clinic","psychology clinic"
];

/* -------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------- */

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

const EMAIL_REGEX =
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const MAILTO_REGEX =
  /mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

const BAD_EMAILS = ["example","test","noreply","no-reply","wix","wordpress","cloudflare","1@2x",".png",".jpg"];

function cleanEmail(email: string) {
  email = email.trim().replace(/["'<>]/g, "");
  if (BAD_EMAILS.some(b => email.toLowerCase().includes(b))) return null;
  return email;
}

/* -------------------------------------------------- */
/* EMAIL EXTRACTION */
/* -------------------------------------------------- */

async function extractEmail(website: string): Promise<string | null> {

  if (!website.startsWith("http"))
    website = "http://" + website;

  const pages = [
    website,
    website + "/contact",
    website + "/contactos",
    website + "/about",
    website + "/sobre"
  ];

  for (const url of pages) {
    try {
      const res = await axios.get(url, {
        timeout: 8000,
        maxRedirects: 5,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const html: string = res.data;

      for (const m of html.matchAll(MAILTO_REGEX)) {
        const email = cleanEmail(m[1]);
        if (email) return email;
      }

      const matches = html.match(EMAIL_REGEX);
      if (!matches) continue;

      for (const e of matches) {
        const email = cleanEmail(e);
        if (email) return email;
      }

    } catch {}
  }

  return null;
}

/* -------------------------------------------------- */
/* GOOGLE SEARCH */
/* -------------------------------------------------- */

async function textSearchGrid(keyword: string, lat: number, lng: number, pageToken?: string) {

  const query = `${keyword} near ${lat},${lng}`;

  const res = await axios.post(
    "https://places.googleapis.com/v1/places:searchText",
    {
      textQuery: query,
      pageSize: 20,
      pageToken
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress"
      }
    }
  );

  return res.data;
}

async function getDetails(placeId: string) {
  const res = await axios.get(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask": "id,displayName,formattedAddress,websiteUri"
      }
    }
  );
  return res.data;
}

/* -------------------------------------------------- */
/* GRID */
/* -------------------------------------------------- */

function generateGrid(lat: number, lng: number, size: number) {
  const points: { lat: number; lng: number }[] = [];
  const step = 0.01;

  for (let x = -size; x <= size; x++)
    for (let y = -size; y <= size; y++)
      points.push({ lat: lat + x * step, lng: lng + y * step });

  return points;
}

/* -------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------- */

async function run() {

  const rows: any[] = [];
  const seen = new Set<string>();

  for (const city of Object.keys(CITY_COORDS)) {

    console.log(`\n🌍 CITY: ${city}`);
    const { lat, lng } = CITY_COORDS[city];
    const grid = generateGrid(lat, lng, GRID_SIZE);

    for (const keyword of KEYWORDS) {

      let collected = 0;
      console.log(`🔎 ${keyword}`);

      for (const point of grid) {

        if (collected >= MAX_PER_KEYWORD || rows.length >= GLOBAL_LIMIT) break;

        let pageToken: string | undefined = undefined;

        do {
          await sleep(250);

          const search = await textSearchGrid(keyword, point.lat, point.lng, pageToken);
          const places = search.places || [];
          pageToken = search.nextPageToken;

          for (const place of places) {

            if (collected >= MAX_PER_KEYWORD || rows.length >= GLOBAL_LIMIT) break;
            if (seen.has(place.id)) continue;

            seen.add(place.id);

            const details = await getDetails(place.id);
            if (!details.websiteUri) continue;

            const email = await extractEmail(details.websiteUri);
            if (!email) continue;

            rows.push({
            name: details.displayName?.text || "",
            location: details.formattedAddress || "",
            category: keyword,
            email
            });

            collected++;
            console.log(`✔ ${details.displayName?.text} → ${email}`);
          }

          if (pageToken) await sleep(2000);

        } while (pageToken);
      }

      console.log(`→ ${collected}/${MAX_PER_KEYWORD}`);
      if (rows.length >= GLOBAL_LIMIT) break;
    }
  }

  const csvWriter = createObjectCsvWriter({
    path: "outreach.csv",
    header: [
      { id: "name", title: "Business Name" },
      { id: "location", title: "Location" },
      { id: "category", title: "Category" },
      { id: "email", title: "Email" }
    ],
  });

  await csvWriter.writeRecords(rows);

  console.log(`\nDONE ✅ ${rows.length} contacts saved`);
}

run();
