import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await ctx.params; // 🔑 THIS WAS MISSING

  const plate = await prisma.plate.findUnique({
    where: { shortId },
  });

  if (!plate) {
    return NextResponse.json(
      { error: "Plate not found" },
      { status: 404 }
    );
  }

  const now = new Date();

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const [totalScans, scansLast7Days, scansLast30Days] =
    await Promise.all([
      prisma.plateScan.count({
        where: { plateId: plate.id },
      }),
      prisma.plateScan.count({
        where: {
          plateId: plate.id,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.plateScan.count({
        where: {
          plateId: plate.id,
          createdAt: { gte: thirtyDaysAgo },
        },
      }),
    ]);

  return NextResponse.json({
    totalScans,
    scansLast7Days,
    scansLast30Days,
  });
}
