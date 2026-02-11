import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const runtime = "nodejs";

function hashIp(ip?: string | null) {
  if (!ip) return null;
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function GET(
  req: Request,
  context: { params: Promise<{ shortId: string }> }
) {
  const { shortId } = await context.params;

  const plate = await prisma.plate.findUnique({
    where: { shortId },
    include: { designRequest: true },
  });

  // ❌ Plate missing or broken
  if (!plate || !plate.designRequest.googlePlaceId) {
    return NextResponse.redirect("https://revtogo.pt");
  }

  // ⛔ INACTIVE → redirect to UI page
  if (plate.status === "inactive") {
    return NextResponse.redirect(
      new URL(`/r/${shortId}/inativo`, req.url)
    );
  }

  // 🔥 Track scan (never block UX)
  try {
    await prisma.plateScan.create({
      data: {
        plateId: plate.id,
        userAgent: req.headers.get("user-agent"),
        ipHash: hashIp(
          req.headers.get("x-forwarded-for") ??
          req.headers.get("x-real-ip")
        ),
      },
    });
  } catch {
    // swallow errors
  }

  // ✅ Active → Google Reviews
  const googleReviewUrl =
    `https://search.google.com/local/writereview?placeid=${plate.designRequest.googlePlaceId}`;

  return NextResponse.redirect(googleReviewUrl, 302);
}
