/**
 * Outreach CSV Import (Clean & Safe)
 * CSV format:
 * "name","location","category","email"
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient, ProspectCategory } from "@prisma/client";

const prisma = new PrismaClient();

const filePath = path.join(process.cwd(), "outreach-clean.csv");

/* ---------------------------------- */
/* CONFIG */
/* ---------------------------------- */

const BAD_EMAIL_PATTERNS = [
  "example",
  "test",
  "noreply",
  "no-reply",
  "user@domain",
  "info@website",
  "contato@exemplo",
  "@sentry.io",
  ".png",
  ".jpg",
];

/* ---------------------------------- */
/* HELPERS */
/* ---------------------------------- */

function isValidEmail(email: string): boolean {
  if (!email) return false;

  const lower = email.toLowerCase();

  if (BAD_EMAIL_PATTERNS.some((bad) => lower.includes(bad))) {
    return false;
  }

  const regex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(lower);
}

function isPortugalLocation(location: string): boolean {
  return location?.toLowerCase().includes("portugal");
}

function mapCategory(raw: string): ProspectCategory | null {
  if (!raw) return null;

  const value = raw.toLowerCase();

  // Restaurants / food
  if (
    value.includes("restaurant") ||
    value.includes("sushi") ||
    value.includes("pizzeria") ||
    value.includes("burger") ||
    value.includes("cafe") ||
    value.includes("bar")
  ) return "restaurant";

  // Health
  if (
    value.includes("physio") ||
    value.includes("clinic") ||
    value.includes("dental") ||
    value.includes("dermatology")
  ) return "health";

  return null;
}

function extractCity(location: string): string {
  if (!location) return "";

  const match = location.match(
    /,\s*(\d{4}-\d{3}\s+)?(.+?),\s*Portugal$/i
  );

  return match ? match[2].trim() : "";
}

/* ---------------------------------- */
/* MAIN */
/* ---------------------------------- */

async function run() {
  const rows: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv({ headers: ["name", "location", "category", "email"] }))
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      console.log(`📄 Found ${rows.length} rows in CSV`);

      let inserted = 0;
      let skipped = 0;

      for (const row of rows) {
        try {
          const name = row.name?.trim();
          const location = row.location?.trim();
          const email = row.email?.trim().toLowerCase();
          const rawCategory = row.category;

          if (!name || !email) {
            skipped++;
            continue;
          }

          if (!isPortugalLocation(location)) {
            skipped++;
            continue;
          }

          if (!isValidEmail(email)) {
            skipped++;
            continue;
          }

          const category = mapCategory(rawCategory);
          if (!category) {
            skipped++;
            continue;
          }

          const city = extractCity(location);

          // Prevent duplicate email in DB
          const existingEmail = await prisma.prospect.findFirst({
            where: { email },
            select: { id: true },
          });

          if (existingEmail) {
            skipped++;
            continue;
          }

          await prisma.prospect.create({
            data: {
              name,
              city,
              location,
              email,
              category,
              handled: false,
              outreachStatus: "not_sent",
            },
          });

          inserted++;

        } catch (err: any) {
          console.log("❌ Error inserting:", row.name);
          console.log(err.message);
          skipped++;
        }
      }

      console.log(`\n✅ Inserted: ${inserted}`);
      console.log(`⏭ Skipped: ${skipped}`);

      await prisma.$disconnect();
    });
}

run().catch(async (err) => {
  console.error("Fatal error:", err);
  await prisma.$disconnect();
  process.exit(1);
});