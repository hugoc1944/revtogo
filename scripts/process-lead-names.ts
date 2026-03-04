import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const inputPath = path.join(process.cwd(), "outreach.csv");
const outputPath = path.join(process.cwd(), "outreach-processed.csv");

/* ------------------------------------------------ */
/* CONFIG */
/* ------------------------------------------------ */

const CITY_PATTERNS = [
  "aveiro",
  "porto",
  "lisboa",
  "coimbra",
  "figueira da foz"
];

const ADDRESS_WORDS = [
  "praça",
  "rua",
  "avenida",
  "av",
  "largo",
  "centro"
];

const DESCRIPTORS = [
  "apartamento",
  "apartamentos",
  "residences",
  "residence"
];

const TRAILING_FILLERS = [
  "em",
  "na",
  "no"
];

/* ------------------------------------------------ */
/* HELPERS */
/* ------------------------------------------------ */

function titleCase(str: string) {

  return str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

}

function removeCommaSegments(name: string) {

  if (!name.includes(",")) return name;

  const first = name.split(",")[0];

  return first;

}

function removeParenthesis(name: string) {

  return name.replace(/\(.+\)/g, "");

}

function removeCity(name: string) {

  for (const city of CITY_PATTERNS) {

    const regex = new RegExp(`\\b${city}\\b`, "i");

    name = name.replace(regex, "");

  }

  return name;

}

function removeAddress(name: string) {

  const words = name.split(" ");

  const filtered = words.filter(
    w => !ADDRESS_WORDS.includes(w.toLowerCase())
  );

  return filtered.join(" ");

}

function removeDescriptors(name: string) {

  const words = name.split(" ");

  const filtered = words.filter(
    w => !DESCRIPTORS.includes(w.toLowerCase())
  );

  return filtered.join(" ");

}

function removeTrailingFillers(name: string) {

  const words = name.split(" ");

  const last = words[words.length - 1]?.toLowerCase();

  if (TRAILING_FILLERS.includes(last)) {
    words.pop();
  }

  return words.join(" ");

}

function normalizeSymbols(name: string) {

  name = name.replace(/&/g, " & ");

  name = name.replace(/\s+/g, " ");

  return name.trim();

}

/* ------------------------------------------------ */
/* MAIN NORMALIZER */
/* ------------------------------------------------ */

function normalizeName(raw: string) {

  if (!raw) return raw;

  let name = raw.trim();

  name = removeParenthesis(name);

  name = removeCommaSegments(name);

  name = name.replace(/ - .*/i, "");

  name = removeCity(name);

  name = removeAddress(name);

  name = removeDescriptors(name);

  name = removeTrailingFillers(name);

  name = normalizeSymbols(name);

  name = name.replace(/\s+/g, " ").trim();

  if (/^\d+$/.test(name)) return name;

  name = titleCase(name);

  return name;

}

/* ------------------------------------------------ */
/* MAIN */
/* ------------------------------------------------ */

async function run() {

  const rows: any[] = [];

  fs.createReadStream(inputPath)
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", () => {

      console.log(`📄 Processing ${rows.length} rows`);

      const output: string[] = [];

      output.push("Business Name,Email");

      for (const row of rows) {

        const rawName = row["Business Name"];
        const email = row["Email"];

        const cleanName = normalizeName(rawName);

        output.push(`"${cleanName}","${email}"`);

      }

      fs.writeFileSync(outputPath, output.join("\n"));

      console.log("✅ Processed file saved:");
      console.log("outreach-processed.csv");

    });

}

run();