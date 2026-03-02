import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type OutreachStatus =
  | "not_sent"
  | "email_sent"
  | "follow_up_1"
  | "follow_up_2"
  | "replied"
  | "removed";

/* ---------------------------------- */
/* UTILS */
/* ---------------------------------- */

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/* ---------------------------------- */
/* PATCH */
/* ---------------------------------- */

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing prospect id" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { status } = body as { status?: OutreachStatus };

  if (!status) {
    return NextResponse.json(
      { error: "Missing status" },
      { status: 400 }
    );
  }

  const now = new Date();

  const data: Prisma.ProspectUpdateInput = {
    outreachStatus: status,
  };

  /* ---------------------------------- */
  /* STATUS WORKFLOW LOGIC */
  /* ---------------------------------- */

  switch (status) {
    case "email_sent":
      data.firstEmailSentAt = now;
      data.nextFollowUpAt = addDays(now, 3);
      break;

    case "follow_up_1":
      data.followUp1SentAt = now;
      data.nextFollowUpAt = addDays(now, 4);
      break;

    case "follow_up_2":
      data.followUp2SentAt = now;
      data.nextFollowUpAt = null;
      break;

    case "replied":
    case "removed":
    case "not_sent":
      data.nextFollowUpAt = null;
      break;
  }

  try {
    const updated = await prisma.prospect.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Outreach update error:", error);

    return NextResponse.json(
      { error: "Failed to update prospect" },
      { status: 500 }
    );
  }
}