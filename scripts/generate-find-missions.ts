/**
 * Revtogo Find+
 * Phase 3 — Persist missions (auto-overwrite)
 */

import "dotenv/config";
import { PrismaClient, FindCategory } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

/* =========================
   CONFIG
   ========================= */

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
if (!GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_MAPS_API_KEY");
}

const AVEIRO_CENTER = { lat: 40.640496, lng: -8.653784 };
const RADIUS_METERS = 2000;

const CATEGORY_PLACES: Record<FindCategory, string[]> = {
  beauty: ["beauty_salon", "hair_care", "spa"],
  food: ["restaurant", "cafe", "bar"],
  tourism: [
    "store",
    "clothing_store",
    "jewelry_store",
    "home_goods_store",
  ],
};

/* =========================
   TYPES
   ========================= */

type RawPlace = {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  rating?: number;
  userRatingCount?: number;
  types: string[];
  businessStatus: string;
};

type ScoredPlace = RawPlace & {
  score: number;
};

/* =========================
   FETCH
   ========================= */

async function fetchByType(type: string): Promise<RawPlace[]> {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.location,places.rating,places.userRatingCount,places.types,places.businessStatus",
      },
      body: JSON.stringify({
        includedTypes: [type],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: AVEIRO_CENTER.lat,
              longitude: AVEIRO_CENTER.lng,
            },
            radius: RADIUS_METERS,
          },
        },
        languageCode: "pt",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data: any = await response.json();

  return (data.places ?? []).map((p: any): RawPlace => ({
    placeId: p.id,
    name: p.displayName?.text ?? "Unknown",
    lat: p.location.latitude,
    lng: p.location.longitude,
    rating: p.rating,
    userRatingCount: p.userRatingCount,
    types: p.types ?? [],
    businessStatus: p.businessStatus,
  }));
}

async function fetchPlacesForCategory(
  category: FindCategory
): Promise<RawPlace[]> {
  const seen = new Map<string, RawPlace>();

  for (const type of CATEGORY_PLACES[category]) {
    const results = await fetchByType(type);

    for (const place of results) {
      if (!seen.has(place.placeId)) {
        seen.set(place.placeId, place);
      }
    }
  }

  return Array.from(seen.values());
}

/* =========================
   FILTERING
   ========================= */

const CHAIN_KEYWORDS = [
  "zara",
  "h&m",
  "bershka",
  "pull&bear",
  "lefties",
  "pandora",
  "sephora",
  "jd sports",
  "flying tiger",
  "mercadona",
  "pingo doce",
  "auchan",
  "forum",
  "glicínias",
];

function filterPlaces(places: RawPlace[]): RawPlace[] {
  return places.filter((p) => {
    if (p.businessStatus !== "OPERATIONAL") return false;
    if (!p.rating || !p.userRatingCount) return false;
    if (p.userRatingCount >= 1500) return false;

    const lower = p.name.toLowerCase();
    if (CHAIN_KEYWORDS.some((k) => lower.includes(k))) return false;

    return true;
  });
}

/* =========================
   SCORING
   ========================= */

function scorePlaces(
  places: RawPlace[],
  category: FindCategory
): ScoredPlace[] {
  return places.map((p) => {
    let score = 0;
    const reviews = p.userRatingCount ?? 0;
    const rating = p.rating ?? 0;

    if (reviews <= 80) score += 4;
    else if (reviews <= 200) score += 3;
    else if (reviews <= 350) score += 1;
    else score -= 1;

    if (rating >= 4.8) score += 3;
    else if (rating >= 4.5) score += 2;
    else if (rating >= 4.2) score += 1;

    if (p.types.some((t) => CATEGORY_PLACES[category].includes(t)))
      score += 1;

    return { ...p, score };
  });
}

/* =========================
   ROUTE BUILDER
   ========================= */

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

type GeneratedMission = {
  category: FindCategory;
  stops: ScoredPlace[];
  estimatedMinutes: number;
};

function buildMissions(
  places: ScoredPlace[],
  category: FindCategory
): GeneratedMission[] {
  const remaining = [...places];
  const missions: GeneratedMission[] = [];

  while (remaining.length >= 4) {
    let currentLat = AVEIRO_CENTER.lat;
    let currentLng = AVEIRO_CENTER.lng;
    let totalMinutes = 0;
    const stops: ScoredPlace[] = [];

    while (remaining.length > 0) {
      let nearestIndex = -1;
      let nearestDistance = Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const p = remaining[i];
        const distance = haversine(
          currentLat,
          currentLng,
          p.lat,
          p.lng
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }

      if (nearestIndex === -1) break;

      const walkMinutes = (nearestDistance / 5) * 60;
      const visitMinutes = 10;

      if (totalMinutes + walkMinutes + visitMinutes > 90) break;

      const next = remaining.splice(nearestIndex, 1)[0];
      stops.push(next);
      totalMinutes += walkMinutes + visitMinutes;

      currentLat = next.lat;
      currentLng = next.lng;
    }

    if (stops.length >= 4) {
      missions.push({
        category,
        stops,
        estimatedMinutes: Math.round(totalMinutes),
      });
    } else {
      break;
    }
  }

  return missions;
}

/* =========================
   MAIN
   ========================= */

async function run() {
  console.log("🔥 Overwriting existing missions...");

  await prisma.findMission.deleteMany();

  for (const category of Object.keys(
    CATEGORY_PLACES
  ) as FindCategory[]) {
    const raw = await fetchPlacesForCategory(category);
    const filtered = filterPlaces(raw);
    const scored = scorePlaces(filtered, category);
    const sorted = scored.sort((a, b) => b.score - a.score);

    const missions = buildMissions(sorted, category);

    for (let i = 0; i < missions.length; i++) {
      const m = missions[i];

      await prisma.findMission.create({
        data: {
          name: `${category.toUpperCase()} Route ${i + 1}`,
          city: "Aveiro",
          category,
          centerLat: AVEIRO_CENTER.lat,
          centerLng: AVEIRO_CENTER.lng,
          radiusKm: RADIUS_METERS / 1000,
          estimatedDurationMinutes: m.estimatedMinutes,
          stops: {
            create: m.stops.map((p, index) => ({
              googlePlaceId: p.placeId,
              businessName: p.name,
              lat: p.lat,
              lng: p.lng,
              orderIndex: index,
            })),
          },
        },
      });
    }

    console.log(`✅ ${category} missions saved`);
  }

  console.log("🚀 All missions regenerated successfully");
  await prisma.$disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
