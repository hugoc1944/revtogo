import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendAdminDesignRequestNotification, sendDesignRequestEmail } from "@/lib/email";

/* =========================
   Validation Schema
   ========================= */

const DesignRequestSchema = z.object({
  // Anti-spam
  company: z.string().optional(),
  startedAt: z.number(),

  // Business
  businessName: z.string().min(1),
  googlePlaceId: z.string().optional(),
  businessCity: z.string().optional(),

  // Contact
  contactFirstName: z.string().min(1),
  contactLastName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),

  // Design / Delivery
  designStyle: z.enum(["solid", "art"]),
  deliveryMethod: z.enum(["email", "whatsapp"]),

  // Notes
  notes: z.string().max(500).optional(),

  // NEW (Admin / Find)
  source: z.string().optional(),
  stopId: z.string().optional(),
});

/* =========================
   POST handler
   ========================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.company) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    if (!body.startedAt || Date.now() - body.startedAt < 3000) {
      return NextResponse.json(
        { error: "Submission too fast" },
        { status: 400 }
      );
    }

    const data = DesignRequestSchema.parse(body);

    if (data.deliveryMethod === "whatsapp" && !data.contactPhone) {
      return NextResponse.json(
        { error: "Phone required for WhatsApp delivery." },
        { status: 400 }
      );
    }

    const fullName = `${data.contactFirstName} ${data.contactLastName}`;

    /**
     * 1️⃣ Create DesignRequest
     */
    const designRequest = await prisma.designRequest.create({
      data: {
        businessName: data.businessName,
        googlePlaceId: data.googlePlaceId,
        businessCity: data.businessCity,

        contactName: fullName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,

        designStyle: data.designStyle,
        deliveryMethod: data.deliveryMethod,

        notes: data.notes,
        source: data.source ?? "landing",
      },
    });

    /**
     * 2️⃣ If coming from Find Mission
     */
    if (data.source === "find_mission" && data.stopId) {

      const updatedStop = await prisma.findMissionStop.update({
        where: { id: data.stopId },
        data: {
          visitOutcome: "accepted",
          visitedAt: new Date(),
        },
        include: {
          mission: {
            include: { stops: true },
          },
        },
      });

      await prisma.findVisit.create({
        data: {
          missionStopId: data.stopId,
          outcome: "accepted",
          designRequestId: designRequest.id,
          arrivedAt: new Date(),
          actionTakenAt: new Date(),
        },
      });

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
    }

    await sendDesignRequestEmail({
    to: data.contactEmail,
    name: fullName,
    businessName: data.businessName,
    designStyle: data.designStyle,
    deliveryMethod: data.deliveryMethod,
    phone: data.contactPhone,
    notes: data.notes,
  });

  await sendAdminDesignRequestNotification({
    name: fullName,
    email: data.contactEmail,
    businessName: data.businessName,
    designStyle: data.designStyle,
    deliveryMethod: data.deliveryMethod,
    phone: data.contactPhone,
    notes: data.notes,
  });

    return NextResponse.json(
      { success: true, id: designRequest.id },
      { status: 201 }
    );

  } catch (error) {
    console.error("[DESIGN_REQUEST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
