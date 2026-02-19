/**
 * Prospect+ Email Enrichment
 * Finds emails from business websites
 */

import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

const EMAIL_REGEX =
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

async function extractEmailFromUrl(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RevtogoBot/1.0)",
      },
    });

    const html = response.data as string;

    // 1️⃣ Try mailto links first
    const mailtoMatch = html.match(/mailto:([^"]+)/i);
    if (mailtoMatch) {
      return mailtoMatch[1];
    }

    // 2️⃣ Fallback regex
    const matches = html.match(EMAIL_REGEX);
    if (matches && matches.length > 0) {
      return matches[0];
    }

    return null;
  } catch {
    return null;
  }
}

async function run() {
  const prospects = await prisma.prospect.findMany({
    where: {
        website: { not: null },
        email: null,
    },
    orderBy: {
        createdAt: "asc",
    },
    take: 550,
    });

  console.log(`Found ${prospects.length} prospects to enrich`);

  let updated = 0;

  for (const p of prospects) {
    if (!p.website) continue;

    const email = await extractEmailFromUrl(p.website);

    if (email) {
      await prisma.prospect.update({
        where: { id: p.id },
        data: { email },
      });

      console.log(`✔ Email found for ${p.name}: ${email}`);
      updated++;
    } else {
      console.log(`✖ No email found for ${p.name}`);
    }
  }

  console.log(`\nDone. Updated ${updated} prospects.`);

  await prisma.$disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
