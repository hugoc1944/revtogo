// scripts/fetch-prospects.ts

import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env");
}

/* =========================================
   CONFIG
========================================= */

const REGIONS = [
  "Aveiro District, Portugal",
  "Viseu District, Portugal",
];

const CATEGORY_QUERIES = {
  beauty: [
    "nail salon",
    "beauty salon",
    "hair salon",
    "barbershop",
    "aesthetic clinic",
  ],
  health: [
    "dental clinic",
    "physiotherapy clinic",
    "massage clinic",
    "dermatology clinic",
    "private doctor clinic",
  ],
  fitness: [
    "gym",
    "pilates studio",
    "yoga studio",
    "crossfit box",
    "martial arts dojo",
  ],
  restaurant: [
    "restaurant",
    "pizzeria",
    "cafe",
    "bar",
  ],
};

/* =========================================
   HELPERS
========================================= */

function extractCity(addressComponents: any[]) {
  if (!Array.isArray(addressComponents)) return "";

  const locality = addressComponents.find(
    (c) =>
      Array.isArray(c.types) &&
      c.types.includes("locality")
  );

  return locality?.longText || "";
}

/* =========================================
   GOOGLE CALLS
========================================= */

async function textSearch(query: string) {
  const url = "https://places.googleapis.com/v1/places:searchText";

  const response = await axios.post(
    url,
    {
      textQuery: query,
      pageSize: 20,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress",
      },
    }
  );

  return response.data.places || [];
}

async function getPlaceDetails(placeId: string) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  const response = await axios.get(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask":
        "id,displayName,formattedAddress,addressComponents,internationalPhoneNumber,websiteUri",
    },
  });

  return response.data;
}

/* =========================================
   MAIN
========================================= */

async function run() {
  const prospects: any[] = [];
  const seen = new Set<string>();

  for (const [category, queries] of Object.entries(CATEGORY_QUERIES)) {
    for (const region of REGIONS) {
      for (const q of queries) {
        const fullQuery = `${q} in ${region}`;
        console.log(`Searching: ${fullQuery}`);

        const places = await textSearch(fullQuery);

        for (const place of places) {
          if (seen.has(place.id)) continue;
          seen.add(place.id);

          const details = await getPlaceDetails(place.id);

          const phone = details.internationalPhoneNumber || null;
          const website = details.websiteUri || null;
          const city = extractCity(details.addressComponents);

          // REQUIRE at least phone OR website
          if (!phone && !website) continue;

          prospects.push({
            googlePlaceId: details.id,
            name: details.displayName?.text || "",
            city,
            email: "",
            phone,
            instagram: "", // not supported directly via API
            website,
            category,
          });

          console.log(`✔ Added: ${details.displayName?.text}`);
        }
      }
    }
  }

  const csvWriter = createObjectCsvWriter({
    path: "prospects.csv",
    header: [
      { id: "googlePlaceId", title: "googlePlaceId" },
      { id: "name", title: "name" },
      { id: "city", title: "city" },
      { id: "email", title: "email" },
      { id: "phone", title: "phone" },
      { id: "instagram", title: "instagram" },
      { id: "website", title: "website" },
      { id: "category", title: "category" },
    ],
  });

  await csvWriter.writeRecords(prospects);

  console.log(`\nDONE ✅ Generated prospects.csv with ${prospects.length} entries.`);
}

run();
