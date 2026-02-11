import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const missions = await prisma.findMission.findMany({
      include: {
        stops: {
          orderBy: {
            orderIndex: "asc",
          },
          select: {
            id: true,
            lat: true,
            lng: true,
            orderIndex: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(missions);
  } catch (error) {
    console.error("MISSIONS_FETCH_ERROR", error);

    return NextResponse.json(
      { error: "Failed to fetch missions" },
      { status: 500 }
    );
  }
}
