import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ MUST await params

  if (!id) {
    return NextResponse.json(
      { error: "Missing prospect id" },
      { status: 400 }
    );
  }

  const prospect = await prisma.prospect.update({
    where: { id },
    data: {
      handled: true,
    },
  });

  return NextResponse.json(prospect);
}
