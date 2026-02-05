import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* 👇 THIS IS THE FIX */
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, message } = body;

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

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[CONTACT_POST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
