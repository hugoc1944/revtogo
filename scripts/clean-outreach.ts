import fs from "fs";
import path from "path";
import readline from "readline";

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const INPUT_FILE = "outreach.csv";
const OUTPUT_FILE = "outreach-clean.csv";

/* -------------------------------------------------- */
/* FILTER RULES */
/* -------------------------------------------------- */

const BAD_PATTERNS = [
  "example",
  "test",
  "noreply",
  "no-reply",
  "oseuemail",
  "seuemail",
  "user@domain",
  "domain.com",
  "localhost",
  "mail.com",
  "your@email",
  "yourname@",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp"
];

// Known booking / SaaS engines (expand if needed)
const BLOCKED_DOMAINS = [
  "maarlab.com",
  "tambourine.com",
  "opentable.com",
  "resy.com",
  "booking.com",
  "thefork.com"
];

/* -------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------- */

function isValidEmail(email: string): boolean {
  const lower = email.toLowerCase();

  // Basic structure check
  if (!lower.includes("@")) return false;

  // Remove obvious junk patterns
  if (BAD_PATTERNS.some(p => lower.includes(p))) return false;

  // Block known SaaS domains
  const domain = lower.split("@")[1];
  if (!domain) return false;
  if (BLOCKED_DOMAINS.some(d => domain.includes(d))) return false;

  // Remove obvious US placeholder domains
  if (
    domain.endsWith(".us") ||
    domain.endsWith(".ny") ||
    domain.includes("gmail.con")
  ) return false;

  return true;
}

/* -------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------- */

async function run() {
  const inputPath = path.resolve(INPUT_FILE);
  const outputPath = path.resolve(OUTPUT_FILE);

  if (!fs.existsSync(inputPath)) {
    console.error("❌ outreach.csv not found.");
    process.exit(1);
  }

  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const seen = new Set<string>();
  const cleanRows: string[] = [];

  let total = 0;
  let removed = 0;

  for await (const line of rl) {
    total++;

    if (!line.trim()) continue;

    // Parse CSV manually (safe because format is consistent)
    const parts = line.split('","').map(p =>
      p.replace(/^"/, "").replace(/"$/, "")
    );

    if (parts.length < 4) {
      removed++;
      continue;
    }

    const [name, location, category, email] = parts;

    if (!email || !isValidEmail(email)) {
      removed++;
      continue;
    }

    // Remove duplicates (email-based)
    if (seen.has(email.toLowerCase())) {
      removed++;
      continue;
    }

    seen.add(email.toLowerCase());

    cleanRows.push(`"${name}","${location}","${category}","${email}"`);
  }

  fs.writeFileSync(outputPath, cleanRows.join("\n"));

  console.log("\n===============================");
  console.log(`Total rows: ${total}`);
  console.log(`Removed: ${removed}`);
  console.log(`Final clean list: ${cleanRows.length}`);
  console.log(`Saved as: ${OUTPUT_FILE}`);
  console.log("===============================\n");
}

run();