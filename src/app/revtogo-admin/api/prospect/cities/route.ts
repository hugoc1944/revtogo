import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const cities = await prisma.prospect.findMany({
    distinct: ["city"],
    select: { city: true },
  });

  return NextResponse.json(
    cities
      .map((c) => c.city)
      .filter(Boolean)
      .sort()
  );
}