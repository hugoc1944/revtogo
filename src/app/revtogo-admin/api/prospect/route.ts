import { NextRequest, NextResponse } from "next/server";
import {
  PrismaClient,
  ProspectCategory,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const pageSize = 25;

  const handled = searchParams.get("handled") === "true";
  const category = searchParams.get("category");
  const emailFirst = searchParams.get("emailFirst") === "true";

  const where: Prisma.ProspectWhereInput = {
    handled,
  };

  if (
    category &&
    ["beauty", "health", "fitness", "restaurant"].includes(category)
  ) {
    where.category = category as ProspectCategory;
  }

  // ✅ Explicitly typed orderBy
  let orderBy: Prisma.ProspectOrderByWithRelationInput[] = [];

if (emailFirst) {
  orderBy = [
    {
      email: {
        sort: "desc",
        nulls: "last", // 🔥 force nulls last
      },
    },
    { createdAt: "desc" },
  ];
} else {
  orderBy = [{ createdAt: "desc" }];
}

  const [total, prospects] = await Promise.all([
    prisma.prospect.count({ where }),
    prisma.prospect.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({
    data: prospects,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  });
}
