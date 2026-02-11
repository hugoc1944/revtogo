import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "revtogo_admin_session";

/* =========================
   Session helpers
   ========================= */

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(COOKIE_NAME));
}

export async function createAdminSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();

  // Optional but recommended: store session in DB later
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return token;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/* =========================
   Credentials validation
   ========================= */

export async function validateAdminCredentials(
  username: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return null;

  const valid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!valid) return null;

  return user; // 👈 return the user, not just boolean
}
