import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePlateShortId } from "@/lib/shortId";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { status } = await req.json();

  const updatedRequest = await prisma.designRequest.update({
    where: { id },
    data: {
      status,
      statusUpdatedAt: new Date(),
    },
    include: {
      plate: true,
    },
  });

  // 1️⃣ Create plate when entering producing
  if (status === "producing" && !updatedRequest.plate) {
    // Find or create client by email
    const client = await prisma.client.upsert({
      where: { email: updatedRequest.contactEmail },
      update: {},
      create: {
        email: updatedRequest.contactEmail,
        name: updatedRequest.contactName,
        phone: updatedRequest.contactPhone,
      },
    });

    await prisma.plate.create({
      data: {
        shortId: generatePlateShortId(),
        name: updatedRequest.businessName,
        designRequestId: updatedRequest.id,
        clientId: client.id,
        status: "producing",
      },
    });
  }

  // 2️⃣ Auto-activate plate when delivered
  if (status === "delivered" && updatedRequest.plate) {
    await prisma.plate.update({
      where: { id: updatedRequest.plate.id },
      data: { status: "active" },
    });
  }

  return NextResponse.json(updatedRequest);
}
