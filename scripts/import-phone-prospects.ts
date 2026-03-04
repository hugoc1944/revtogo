/**
 * Phone CSV → Prospect Import (FAST)
 *
 * CSV format:
 * Business Name,Phone
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient, ProspectCategory } from "@prisma/client";

const prisma = new PrismaClient();

const filePath = path.join(process.cwd(), "phone-outreach.csv");

/* ---------------------------------- */

function normalizePhone(phone: string) {

  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("351")) return `+${digits}`;
  if (digits.startsWith("9")) return `+351${digits}`;

  return `+${digits}`;
}

/* ---------------------------------- */

async function run() {

  const rows: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", async () => {

      console.log(`📄 Found ${rows.length} rows`);

      const prospects = rows
        .map(row => {

          const name = row["Business Name"]?.trim();
          const phoneRaw = row["Phone"]?.trim();

          if (!name || !phoneRaw) return null;

          const phone = normalizePhone(phoneRaw);

          return {

            name,
            city: "unknown",

            category: "restaurant" as ProspectCategory,

            phone,
            whatsapp: phone,

            email: null,
            instagram: null,
            website: null,

            googlePlaceId: null,

            handled: false

          };

        })
        .filter(Boolean);

      try {

        const result = await prisma.prospect.createMany({

          data: prospects as any[],
          skipDuplicates: true

        });

        console.log("\n===========================");
        console.log(`Inserted: ${result.count}`);
        console.log(`Skipped: ${prospects.length - result.count}`);
        console.log("===========================\n");

      } catch (err) {

        console.error("❌ Import failed");
        console.error(err);

      } finally {

        await prisma.$disconnect();

      }

    });

}

run().catch(async (err) => {

  console.error(err);
  await prisma.$disconnect();
  process.exit(1);

});