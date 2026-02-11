import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("MISSION ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Missing mission id" },
        { status: 400 }
      );
    }

    const mission = await prisma.findMission.findUnique({
      where: { id },
      include: {
        stops: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!mission) {
      return NextResponse.json(
        { error: "Mission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mission);
  } catch (error) {
    console.error("Mission GET error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
