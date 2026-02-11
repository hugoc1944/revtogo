import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const outcome = body.outcome as
      | "accepted"
      | "refused"
      | "skipped";

    const refusalReason = body.refusalReason ?? null;

    if (!id) {
      return NextResponse.json(
        { error: "Missing stop id" },
        { status: 400 }
      );
    }

    if (!outcome) {
      return NextResponse.json(
        { error: "Missing outcome" },
        { status: 400 }
      );
    }

    /**
     * 1️⃣ Update stop
     */
    const updatedStop = await prisma.findMissionStop.update({
      where: { id },
      data: {
        visitOutcome: outcome,
        refusalReason,
        visitedAt: new Date(),
      },
      include: {
        mission: {
          include: {
            stops: true,
          },
        },
      },
    });

    /**
     * 2️⃣ If accepted → auto-create DesignRequest
     */
    

    /**
     * 3️⃣ Auto-complete mission if all stops done
     */
    const allCompleted = updatedStop.mission.stops.every(
      (s) => s.visitOutcome !== "pending"
    );

    if (allCompleted) {
      await prisma.findMission.update({
        where: { id: updatedStop.missionId },
        data: {
          status: "done",
          finishedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Outcome update error:", error);

    return NextResponse.json(
      { error: "Failed to update stop outcome" },
      { status: 500 }
    );
  }
}