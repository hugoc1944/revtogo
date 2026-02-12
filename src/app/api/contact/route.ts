import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

/* 👇 REQUIRED FOR PRISMA */
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      message,
      company,     // honeypot
      startedAt,   // timing
    } = body;

    /* 🐝 Honeypot check (bots fill hidden fields) */
    if (company) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    /* ⏱ Time-based check (bots submit too fast) */
    if (!startedAt || Date.now() - startedAt < 5000) {
      return NextResponse.json(
        { error: "Submission too fast" },
        { status: 400 }
      );
    }

    /* ✅ Required fields */
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        message,
        source: "contact_page",
      },
    });
    await sendContactEmail({
      to: email,
      name: `${firstName} ${lastName}`,
    });
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

