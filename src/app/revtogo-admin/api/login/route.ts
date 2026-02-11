import { NextResponse } from "next/server";
import {
  validateAdminCredentials,
  createAdminSession,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await validateAdminCredentials(username, password);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  await createAdminSession(user.id);

  return NextResponse.json({ success: true });
}
