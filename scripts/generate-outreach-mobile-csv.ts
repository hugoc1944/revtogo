import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!API_KEY) throw new Error("Missing Google Maps API key");

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const OUTPUT = "phone-outreach.csv";

const GLOBAL_LIMIT = 5000;
const DETAILS_DELAY = 120;

const CITIES = [
  "Aveiro",
  "Coimbra",
  "Figueira da Foz",
  "Leiria",
  "Caldas da Rainha",
  "Tomar",
  "Santarém",
  "Torres Vedras",
  "Lisboa",
  "Setúbal"
];

const KEYWORDS = [
  "restaurant",
  "pizzeria",
  "cafe",
  "bar",
  "hotel",
  "hostel",
  "guesthouse",
  "pastelaria",
  "hair salon",
  "barber shop",
  "nail salon",
  "beauty salon",
  "esthetician",
  "spa"
];

/* -------------------------------------------------- */
/* CSV */
/* -------------------------------------------------- */

if (!fs.existsSync(OUTPUT)) {
  fs.writeFileSync(OUTPUT, "Business Name,Phone\n");
}

function appendRow(name: string, phone: string) {
  const line = `"${name.replace(/"/g, '""')}","${phone}"\n`;
  fs.appendFileSync(OUTPUT, line);
}

/* -------------------------------------------------- */
/* UTIL */
/* -------------------------------------------------- */

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

async function retry<T>(fn: () => Promise<T>, attempts = 5): Promise<T | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch {
      await sleep(2000 + i * 2000);
    }
  }
  return null;
}

/* -------------------------------------------------- */
/* SEARCH (Places API New) */
/* -------------------------------------------------- */

async function search(query: string, pageToken?: string) {

  return retry(async () => {

    const r = await axios.post(
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
          "X-Goog-FieldMask":
            "places.id,places.displayName"
        }
      }
    );

    return r.data;

  });

}

/* -------------------------------------------------- */
/* DETAILS (Places API New) */
/* -------------------------------------------------- */

async function getPhone(placeId: string) {

  const res = await retry(async () => {

    const r = await axios.get(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY!,
          "X-Goog-FieldMask":
            "id,displayName,nationalPhoneNumber"
        }
      }
    );

    return r.data;

  });

  return res?.nationalPhoneNumber || null;

}

/* -------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------- */

async function run() {

  let total = 0;

  const seenPlaces = new Set<string>();
  const seenPhones = new Set<string>();

  for (const city of CITIES) {

    console.log("\n🌍", city);

    for (const keyword of KEYWORDS) {

      const query = `${keyword} in ${city} Portugal`;

      console.log("🔎", query);

      let token: string | undefined = undefined;

      do {

        const res = await search(query, token);

        if (!res) continue;

        token = res.nextPageToken;

        const places = res.places || [];

        for (const p of places) {

          if (total >= GLOBAL_LIMIT) break;

          if (seenPlaces.has(p.id)) continue;
          seenPlaces.add(p.id);

          const name = p.displayName?.text || "";

          const phone = await getPhone(p.id);

          if (!phone) continue;
          if (seenPhones.has(phone)) continue;

          seenPhones.add(phone);

          appendRow(name, phone);

          total++;

          console.log(`✔ ${name} → ${phone} (${total})`);

          await sleep(DETAILS_DELAY);

        }

        if (token) await sleep(2000);

        if (total >= GLOBAL_LIMIT) break;

      } while (token);

      if (total >= GLOBAL_LIMIT) break;

    }

    if (total >= GLOBAL_LIMIT) break;

  }

  console.log(`\nDONE — ${total} phone leads collected.`);

}

run();