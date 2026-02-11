import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { status } = await req.json();

  if (!["active", "inactive"].includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const plate = await prisma.plate.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(plate);
}
