import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!API_KEY) throw new Error("Missing Google Maps API key");

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const OUTPUT = "outreach.csv";

const GLOBAL_LIMIT = 5000;
const CONCURRENCY = 10;

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
  // hospitality
  "restaurant",
  "pizzeria",
  "cafe",
  "bar",
  "hotel",
  "hostel",
  "guesthouse",
  "pastelaria",

  // beauty
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
  fs.writeFileSync(OUTPUT, "Business Name,Email\n");
}

function appendRow(name: string, email: string) {
  const line = `"${name.replace(/"/g, '""')}","${email}"\n`;
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
/* EMAIL EXTRACTION */
/* -------------------------------------------------- */

const EMAIL_REGEX =
/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const MAILTO_REGEX =
/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

const BAD = [
  "example",
  "test",
  "noreply",
  "no-reply",
  "wix",
  "wordpress",
  "cloudflare",
  "facebook",
  "instagram",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".gif",
  ".css",
  ".js"
];

const BAD_DOMAINS = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "youtube.com",
  "tiktok.com",
  "twitter.com",
  "domain.com",
  "tripadvisor.pt",
  "tripadvisor.es",
  "tripadvisor.com",
  "alicarius.pt"
];

function clean(email: string) {
  const e = email.toLowerCase();
  if (BAD.some(b => e.includes(b))) return null;
  return email;
}

function normalizeUrl(url: string) {
  if (!url.startsWith("http")) return "https://" + url;
  return url;
}

/* -------------------------------------------------- */
/* EMAIL GUESSER */
/* -------------------------------------------------- */

function guessEmails(domain: string) {
  const base = domain.replace("www.", "");

  return [
    `info@${base}`,
    `geral@${base}`,
    `contacto@${base}`,
    `contact@${base}`,
    `reservas@${base}`,
    `booking@${base}`
  ];
}

/* -------------------------------------------------- */
/* FACEBOOK SCRAPER */
/* -------------------------------------------------- */

async function extractFacebookEmail(url: string) {
  try {
    const r = await axios.get(url, {
      timeout: 8000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = r.data;

    const emails = html.match(EMAIL_REGEX);

    if (!emails) return null;

    for (const e of emails) {
      const c = clean(e);
      if (c) return c;
    }

  } catch {}

  return null;
}

/* -------------------------------------------------- */
/* WEBSITE EMAIL SCRAPER */
/* -------------------------------------------------- */

async function extractEmail(site: string) {

  site = normalizeUrl(site);

  const pages = [
    site,
    site + "/contact",
    site + "/contacto",
    site + "/contactos",
    site + "/contato",
    site + "/about",
    site + "/sobre",
    site + "/empresa",
    site + "/quem-somos"
  ];

  for (const url of pages) {

    try {

      const r = await axios.get(url, {
        timeout: 8000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      let html = r.data;

      html = html
        .replace(/\[at\]/g, "@")
        .replace(/\(at\)/g, "@");

      for (const m of html.matchAll(MAILTO_REGEX)) {
        const e = clean(m[1]);
        if (e) return e;
      }

      const emails = html.match(EMAIL_REGEX);

      if (emails) {
        for (const e of emails) {
          const c = clean(e);
          if (c) return c;
        }
      }

      const facebook = html.match(/https?:\/\/(www\.)?facebook\.com\/[^\s"'<>]+/i);

      if (facebook) {
        const fbEmail = await extractFacebookEmail(facebook[0]);
        if (fbEmail) return fbEmail;
      }

    } catch {}

  }

  return null;
}

/* -------------------------------------------------- */
/* GOOGLE SEARCH */
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
            "places.id,places.displayName,places.websiteUri"
        }
      }
    );

    return r.data;

  });
}

/* -------------------------------------------------- */
/* WORKER POOL */
/* -------------------------------------------------- */

async function processBatch(places: any[], seenEmails: Set<string>, totalRef: {v:number}) {

  await Promise.allSettled(

    places.map(async place => {

      if (totalRef.v >= GLOBAL_LIMIT) return;

      const name = place.displayName?.text || "";
      const website = place.websiteUri;

      if (!website) return;

      let email = await extractEmail(website);

      if (!email) {

        const domain = new URL(website).hostname.replace("www.","");

        if (BAD_DOMAINS.some(d => domain.includes(d))) return;

        const guesses = guessEmails(domain);

        for (const g of guesses) {
          if (!seenEmails.has(g)) {
            email = g;
            break;
          }
        }
      }

      if (!email) return;
      if (seenEmails.has(email)) return;

      seenEmails.add(email);

      appendRow(name, email);

      totalRef.v++;

      console.log(`✔ ${name} → ${email} (${totalRef.v})`);

    })

  );

}

/* -------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------- */

async function run() {

  let totalRef = { v: 0 };

  const seenPlaces = new Set<string>();
  const seenEmails = new Set<string>();

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

        const batch = [];

        for (const p of places) {

          if (seenPlaces.has(p.id)) continue;

          seenPlaces.add(p.id);

          batch.push(p);

          if (batch.length >= CONCURRENCY) {
            await processBatch(batch.splice(0), seenEmails, totalRef);
          }

        }

        if (batch.length) {
          await processBatch(batch, seenEmails, totalRef);
        }

        if (token) await sleep(2000);

        if (totalRef.v >= GLOBAL_LIMIT) break;

      } while (token);

      if (totalRef.v >= GLOBAL_LIMIT) break;

    }

    if (totalRef.v >= GLOBAL_LIMIT) break;

  }

  console.log(`\nDONE — ${totalRef.v} leads collected.`);

}

run();