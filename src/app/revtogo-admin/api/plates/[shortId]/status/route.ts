import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await context.params;
  const { status } = await req.json();

  if (!["active", "inactive"].includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const plate = await prisma.plate.update({
    where: { shortId },
    data: { status },
  });

  return NextResponse.json(plate);
}
