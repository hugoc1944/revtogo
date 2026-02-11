import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.findMission.update({
    where: { id },
    data: {
      status: "in_progress",
      startedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}