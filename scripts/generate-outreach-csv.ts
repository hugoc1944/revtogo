import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
if (!API_KEY) throw new Error("Missing Google Maps API key");

/* -------------------------------------------------- */

const MAX_PER_KEYWORD = 20;
const GLOBAL_LIMIT = 5000;
const GRID_SIZE = 5;
const OUTPUT = "outreach.csv";

/* -------------------------------------------------- */

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Porto: { lat: 41.1579, lng: -8.6291 },
  Aveiro: { lat: 40.6405, lng: -8.6538 },
  Coimbra: { lat: 40.2033, lng: -8.4103 }
};

const KEYWORDS = [
  "restaurant","sushi restaurant","pizzeria","burger restaurant","cafe","bar",
  "hotel","hostel","guesthouse",
  "physiotherapy clinic","dental clinic","dermatology clinic","psychology clinic"
];

/* -------------------------------------------------- */
/* CSV INIT (append mode) */
/* -------------------------------------------------- */

if (!fs.existsSync(OUTPUT)) {
  fs.writeFileSync(OUTPUT, "Business Name,Location,Category,Email\n");
}

function appendRow(row: any) {
  const line = `"${row.name.replace(/"/g,'""')}","${row.location.replace(/"/g,'""')}","${row.category}","${row.email}"\n`;
  fs.appendFileSync(OUTPUT, line);
}

/* -------------------------------------------------- */

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

async function retry<T>(fn: () => Promise<T>, attempts = 5): Promise<T | null> {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch {
      console.log("⚠ retrying...");
      await sleep(2000 + i * 2000);
    }
  }
  return null;
}

/* -------------------------------------------------- */
/* EMAIL EXTRACTION */
/* -------------------------------------------------- */

const EMAIL_REGEX=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const MAILTO_REGEX=/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
const BAD=["example","test","noreply","no-reply","wix","wordpress","cloudflare",".png",".jpg"];

function clean(e:string){ if(BAD.some(b=>e.toLowerCase().includes(b))) return null; return e;}

async function extractEmail(site:string){
  if(!site.startsWith("http")) site="http://"+site;

  const pages=[site,site+"/contact",site+"/contactos",site+"/about",site+"/sobre"];

  for(const url of pages){
    try{
      const r=await axios.get(url,{timeout:8000,headers:{"User-Agent":"Mozilla/5.0"}});
      const html=r.data;

      for(const m of html.matchAll(MAILTO_REGEX)){ const e=clean(m[1]); if(e) return e;}
      const vis=html.match(EMAIL_REGEX);
      if(vis) for(const e of vis){ const c=clean(e); if(c) return c;}

    }catch{}
  }
  return null;
}

/* -------------------------------------------------- */
/* GOOGLE */
/* -------------------------------------------------- */

async function search(keyword:string,lat:number,lng:number,pageToken?:string){
  return retry(async()=>{
    const r=await axios.post("https://places.googleapis.com/v1/places:searchText",
    {textQuery:`${keyword} near ${lat},${lng}`,pageSize:20,pageToken},
    {headers:{"Content-Type":"application/json","X-Goog-Api-Key":API_KEY!,"X-Goog-FieldMask":"places.id,places.displayName,places.formattedAddress"}});
    return r.data;
  });
}

async function details(id:string){
  return retry(async()=>{
    const r=await axios.get(`https://places.googleapis.com/v1/places/${id}`,
    {headers:{"X-Goog-Api-Key":API_KEY!,"X-Goog-FieldMask":"id,displayName,formattedAddress,websiteUri"}});
    return r.data;
  });
}

/* -------------------------------------------------- */

function grid(lat:number,lng:number,size:number){
  const pts=[];
  for(let x=-size;x<=size;x++)
    for(let y=-size;y<=size;y++)
      pts.push({lat:lat+x*0.01,lng:lng+y*0.01});
  return pts;
}

/* -------------------------------------------------- */

async function run(){

  let total=0;
  const seen=new Set<string>();

  for(const city of Object.keys(CITY_COORDS)){

    console.log("\n🌍",city);
    const {lat,lng}=CITY_COORDS[city];
    const g=grid(lat,lng,GRID_SIZE);

    for(const keyword of KEYWORDS){

      let collected=0;
      console.log("🔎",keyword);

      for(const p of g){

        if(collected>=MAX_PER_KEYWORD||total>=GLOBAL_LIMIT) break;

        let token: string|undefined=undefined;

        do{
          await sleep(250);

          const res=await search(keyword,p.lat,p.lng,token);
          if(!res) continue;

          token=res.nextPageToken;
          const places=res.places||[];

          for(const place of places){

            if(collected>=MAX_PER_KEYWORD||total>=GLOBAL_LIMIT) break;
            if(seen.has(place.id)) continue;
            seen.add(place.id);

            const det=await details(place.id);
            if(!det?.websiteUri) continue;

            const email=await extractEmail(det.websiteUri);
            if(!email){ console.log("✖",det.displayName?.text); continue;}

            const row={name:det.displayName?.text||"",location:det.formattedAddress||"",category:keyword,email};
            appendRow(row);

            collected++; total++;
            console.log(`✔ ${row.name} → ${email} (${total})`);
          }

          if(token) await sleep(2000);

        }while(token);
      }
    }
  }

  console.log(`\nDONE — ${total} contacts saved safely.`);
}

run();
