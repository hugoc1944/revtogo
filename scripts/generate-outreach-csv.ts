import axios from "axios"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!API_KEY) throw new Error("Missing Google Maps API key")

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const OUTPUT = "outreach.csv"

const GLOBAL_LIMIT = 5000
const CONCURRENCY = 10

const MAX_REVIEWS = 400
const MIN_RATING = 3.5
const MAX_RATING = 4.8

/* -------------------------------------------------- */
/* EMAIL VALIDATION */
/* -------------------------------------------------- */

const EMAIL_REGEX =
/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

const BAD_FILE_EXT = [
".png",".jpg",".jpeg",".svg",".gif",".webp",".css",".js",".ico"
]

const BAD_DOMAINS = [
"facebook.com",
"instagram.com",
"linkedin.com",
"youtube.com",
"tiktok.com",
"tripadvisor",
"booking.com",
"linktr.ee",
"canva.site",
"zappysoftware",
"ubereats",
"justeat",
"info.com"
]

const ALLOWED_TLDS = [
".pt",".com",".com.pt",".net",".org",".eu"
]

function isValidEmail(email:string){

  const e=email.toLowerCase()

  if(!EMAIL_REGEX.test(e)) return false

  if(BAD_FILE_EXT.some(ext=>e.endsWith(ext))) return false

  if(BAD_DOMAINS.some(d=>e.includes(d))) return false

  const domain=e.split("@")[1]

  if(!domain) return false

  if(!ALLOWED_TLDS.some(tld=>domain.endsWith(tld))) return false

  return true
}

/* -------------------------------------------------- */
/* CSV */
/* -------------------------------------------------- */

if(!fs.existsSync(OUTPUT)){
  fs.writeFileSync(OUTPUT,"Business Name,Email\n")
}

function appendRow(name:string,email:string){

  const line=`"${name.replace(/"/g,'""')}","${email}"\n`

  fs.appendFileSync(OUTPUT,line)

}

/* -------------------------------------------------- */

function sleep(ms:number){
  return new Promise(r=>setTimeout(r,ms))
}

async function retry<T>(fn:()=>Promise<T>,attempts=5):Promise<T|null>{

  for(let i=0;i<attempts;i++){

    try{
      return await fn()
    }catch{
      await sleep(2000+i*2000)
    }

  }

  return null

}

/* -------------------------------------------------- */
/* EMAIL SCRAPER */
/* -------------------------------------------------- */

async function extractEmail(site:string){

  try{

    if(!site.startsWith("http")) site="https://"+site

    const pages=[
      site,
      site+"/contact",
      site+"/contactos",
      site+"/contacto",
      site+"/about",
      site+"/sobre"
    ]

    for(const url of pages){

      try{

        const r=await axios.get(url,{
          timeout:8000,
          headers:{ "User-Agent":"Mozilla/5.0" }
        })

        const html=r.data

        const matches=html.match(EMAIL_REGEX)

        if(!matches) continue

        for(const email of matches){

          if(isValidEmail(email)) return email

        }

      }catch{}

    }

  }catch{}

  return null

}
/* -------------------------------------------------- */
/* EMAIL GUESSER */
/* -------------------------------------------------- */

function guessEmails(domain:string){

  const base=domain.replace("www.","")

  const guesses=[
    `info@${base}`,
    `geral@${base}`,
    `contacto@${base}`,
    `contact@${base}`,
    `reservas@${base}`,
    `booking@${base}`
  ]

  for(const g of guesses){

    if(isValidEmail(g)) return g

  }

  return null
}

/* -------------------------------------------------- */
/* GOOGLE SEARCH */
/* -------------------------------------------------- */

async function search(keyword:string,lat:number,lng:number,pageToken?:string){

  return retry(async()=>{

    const r=await axios.post(

      "https://places.googleapis.com/v1/places:searchText",

      {
        textQuery:keyword,
        pageSize:20,
        pageToken,

        locationBias:{
          rectangle:{
            low:{ latitude:lat-0.01, longitude:lng-0.01 },
            high:{ latitude:lat+0.01, longitude:lng+0.01 }
          }
        }

      },

      {
        headers:{
          "Content-Type":"application/json",
          "X-Goog-Api-Key":API_KEY,
          "X-Goog-FieldMask":
          "places.id,places.displayName,places.websiteUri,places.rating,places.userRatingCount"
        }
      }

    )

    return r.data

  })

}

/* -------------------------------------------------- */

async function processBatch(

  places:any[],
  seenEmails:Set<string>,
  totalRef:{v:number}

){
 
  await Promise.allSettled(

    places.map(async place=>{

      if(totalRef.v>=GLOBAL_LIMIT) return

      const name=place.displayName?.text||""
      const reviews=place.userRatingCount
      const rating=place.rating

      if(!reviews) return
      if(reviews>MAX_REVIEWS) return
      if(rating && (rating<MIN_RATING || rating>MAX_RATING)) return

      const website=place.websiteUri

      if(!website) return

      let email=await extractEmail(website)

      if(!email){

        try{

          const domain=new URL(website).hostname

          email=guessEmails(domain)

        }catch{}

      }

      if(!email) return
      if(!isValidEmail(email)) return
      if(seenEmails.has(email)) return

      seenEmails.add(email)

      appendRow(name,email)

      totalRef.v++

      console.log(`✔ ${name} → ${email} (${totalRef.v})`)

    })

  )

}

/* -------------------------------------------------- */
/* GRID */
/* -------------------------------------------------- */

function buildGrid(lat:number,lng:number){

  const pts=[]

  const GRID=5
  const STEP=0.02

  for(let x=-GRID;x<=GRID;x++){

    for(let y=-GRID;y<=GRID;y++){

      pts.push({

        lat:lat+x*STEP,
        lng:lng+y*STEP

      })

    }

  }

  return pts

}

/* -------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------- */

async function run(){

  let totalRef={v:0}

  const seenPlaces=new Set<string>()
  const seenEmails=new Set<string>()

 const cities=[

  /* ---------- BEIRA INTERIOR ---------- */

  {name:"Covilhã",lat:40.2810,lng:-7.5040},
  {name:"Fundão",lat:40.1408,lng:-7.5010},
  {name:"Guarda",lat:40.5373,lng:-7.2670},
  {name:"Castelo Branco",lat:39.8230,lng:-7.4910},
  {name:"Belmonte",lat:40.3610,lng:-7.3500},

  /* ---------- BEIRA LITORAL ---------- */

  {name:"Coimbra",lat:40.2033,lng:-8.4103},
  {name:"Figueira da Foz",lat:40.1521,lng:-8.8558},
  {name:"Cantanhede",lat:40.3558,lng:-8.5940},

  /* ---------- LEIRIA DISTRICT ---------- */

  {name:"Leiria",lat:39.7436,lng:-8.8071},
  {name:"Pombal",lat:39.9160,lng:-8.6290},

  /* ---------- OESTE REGION ---------- */

  {name:"Caldas da Rainha",lat:39.4035,lng:-9.1383},
  {name:"Óbidos",lat:39.3600,lng:-9.1570},
  {name:"Peniche",lat:39.3558,lng:-9.3810},

  /* ---------- RIBATEJO ---------- */

  {name:"Santarém",lat:39.2362,lng:-8.6850},
  {name:"Tomar",lat:39.6014,lng:-8.4092},

  /* ---------- LISBON METRO ---------- */

  {name:"Lisboa",lat:38.7223,lng:-9.1393},
  {name:"Odivelas",lat:38.7920,lng:-9.1820},
  {name:"Loures",lat:38.8300,lng:-9.1680},
  {name:"Sintra",lat:38.8020,lng:-9.3810},
  {name:"Cascais",lat:38.6970,lng:-9.4210},
  {name:"Oeiras",lat:38.6970,lng:-9.3080},
  {name:"Torres Vedras",lat:39.0911,lng:-9.2586},

]

  const keywords=[

    "restaurant",
    "pizzeria",
    "cafe",
    "bar",
    "pastelaria",
    "hair salon",
    "barber shop",
    "beauty salon",
    "spa"

  ]

  for(const city of cities){

    console.log("\n🌍",city.name)

    const grid=buildGrid(city.lat,city.lng)

    for(const keyword of keywords){

      console.log("🔎",keyword)

      for(const tile of grid){

        let token: string|undefined=undefined

        do{

          const res=await search(keyword,tile.lat,tile.lng,token)

          if(!res) continue

          token=res.nextPageToken

          const places=res.places||[]

          const batch=[]

          for(const p of places){

            if(seenPlaces.has(p.id)) continue

            seenPlaces.add(p.id)

            batch.push(p)

            if(batch.length>=CONCURRENCY){

              await processBatch(batch.splice(0),seenEmails,totalRef)

            }

          }

          if(batch.length){

            await processBatch(batch,seenEmails,totalRef)

          }

          if(token) await sleep(2000)

          if(totalRef.v>=GLOBAL_LIMIT) break

        }while(token)

        if(totalRef.v>=GLOBAL_LIMIT) break

      }

      if(totalRef.v>=GLOBAL_LIMIT) break

    }

    if(totalRef.v>=GLOBAL_LIMIT) break

  }

  console.log(`\nDONE — ${totalRef.v} leads collected.`)

}

run()