require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const filePath = path.join(process.cwd(), "outreach-processed.csv");

if (!fs.existsSync(filePath)) {
  console.error("❌ outreach-processed.csv not found.");
  process.exit(1);
}

async function run() {

  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", async () => {

      console.log(`📄 Found ${rows.length} rows`);

      const leads = rows
        .map(row => {

          const email = row["Email"]?.trim().toLowerCase();
          const businessName = row["Business Name"]?.trim() || null;

          if (!email) return null;

          return {
            businessName,
            email,
            status: "pending",
            sentAt: null,
            followUp1At: null,
            followUp2At: null,
            senderInbox: null,
            replyDetected: false,
            bounceDetected: false
          };

        })
        .filter(Boolean);

      try {

        const result = await prisma.lead.createMany({
          data: leads,
          skipDuplicates: true
        });

        console.log("\n===========================");
        console.log(`Inserted: ${result.count}`);
        console.log(`Skipped (duplicates): ${leads.length - result.count}`);
        console.log("===========================\n");

      } catch (err) {

        console.error("❌ Bulk insert failed");
        console.error(err);

      } finally {

        await prisma.$disconnect();

      }

    });

}

run();