import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

/* =========================
   Validation Schema
   ========================= */

const DesignRequestSchema = z.object({
  // Business
  businessName: z.string().min(1),
  googlePlaceId: z.string().optional(),
  businessCity: z.string().optional(),

  // Contact
  contactFirstName: z.string().min(1),
  contactLastName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),

  designStyle: z.enum(["solid", "art"]).refine(Boolean, {
    message: "Design style is required",
    }),
  deliveryMethod: z.enum(["email", "whatsapp"]).refine(Boolean, {
    message: "Delivery method is required",
  }),


  // Notes
  notes: z.string().max(500).optional(),
});

/* =========================
   POST handler
   ========================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = DesignRequestSchema.parse(body);

    // Enforce WhatsApp → phone rule
    if (data.deliveryMethod === "whatsapp" && !data.contactPhone) {
      return NextResponse.json(
        { error: "Phone number required for WhatsApp delivery." },
        { status: 400 }
      );
    }

    const fullName = `${data.contactFirstName} ${data.contactLastName}`;

    const designRequest = await prisma.designRequest.create({
      data: {
        // Business
        businessName: data.businessName,
        googlePlaceId: data.googlePlaceId,
        businessCity: data.businessCity,

        // Contact
        contactName: fullName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,

        // Design / Delivery
        designStyle: data.designStyle,
        deliveryMethod: data.deliveryMethod,

        // Notes
        notes: data.notes,

        // Meta
        source: "landing",
      },
    });

    return NextResponse.json(
      { success: true, id: designRequest.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("[DESIGN_REQUEST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
