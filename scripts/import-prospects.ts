/**
 * Prospect+ CSV Import
 * Manual workflow — CSV → DB
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient, ProspectCategory } from "@prisma/client";

/**
 * IMPORTANT:
 * Your project uses Prisma Accelerate.
 * So we must initialize Prisma exactly like Find+.
 */
const prisma = new PrismaClient();

const filePath = path.join(process.cwd(), "prospects.csv");

async function run() {
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log(`📄 Found ${results.length} rows in CSV`);

      let inserted = 0;
      let skipped = 0;

      for (const row of results) {
        try {
          if (!row.googlePlaceId || !row.name) {
            skipped++;
            continue;
          }

          const category = row.category as ProspectCategory;

          if (
            category !== "beauty" &&
            category !== "health" &&
            category !== "fitness" &&
            category !== "restaurant"
          ) {
            skipped++;
            continue;
          }

          await prisma.prospect.create({
            data: {
              googlePlaceId: row.googlePlaceId,
              name: row.name,
              city: row.city || "",
              email: row.email || null,
              phone: row.phone || null,
              instagram: row.instagram || null,
              website: row.website || null,
              category,
              handled: false,
            },
          });

          inserted++;
        } catch (err: any) {
          // Most likely duplicate googlePlaceId
          skipped++;
        }
      }

      console.log(`\n✅ Inserted: ${inserted}`);
      console.log(`⏭ Skipped (duplicates/invalid): ${skipped}`);

      await prisma.$disconnect();
    });
}

run().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
