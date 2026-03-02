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

  const handledParam = searchParams.get("handled");
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const search = searchParams.get("search");
  const emailOnly = searchParams.get("emailOnly") === "true";
  const emailFirst = searchParams.get("emailFirst") === "true";

  /* ---------------------------------- */
  /* WHERE BUILDING (TS SAFE) */
  /* ---------------------------------- */

  const andConditions: Prisma.ProspectWhereInput[] = [];

  // Handled filter
  if (handledParam !== null) {
    andConditions.push({
      handled: handledParam === "true",
    });
  }

  // Category filter
  if (
    category &&
    ["beauty", "health", "fitness", "restaurant"].includes(category)
  ) {
    andConditions.push({
      category: category as ProspectCategory,
    });
  }

  // City filter
  if (city && city !== "all") {
    andConditions.push({
      city: {
        contains: city.trim(),
        mode: "insensitive",
      },
    });
  }

  // Search filter (business name)
  if (search && search.trim().length > 0) {
    andConditions.push({
      name: {
        contains: search.trim(),
        mode: "insensitive",
      },
    });
  }

  // Email-only filter
  if (emailOnly) {
    andConditions.push(
      { email: { not: null } },
      { email: { not: "" } }
    );
  }

  const where: Prisma.ProspectWhereInput =
    andConditions.length > 0
      ? { AND: andConditions }
      : {};

  /* ---------------------------------- */
  /* ORDERING */
  /* ---------------------------------- */

  let orderBy: Prisma.ProspectOrderByWithRelationInput[] = [];

  if (emailFirst) {
    orderBy = [
      {
        email: {
          sort: "desc",
          nulls: "last",
        },
      },
      { createdAt: "desc" },
    ];
  } else {
    orderBy = [
      {
        nextFollowUpAt: {
          sort: "asc",
          nulls: "last",
        },
      },
      {
        outreachStatus: "asc",
      },
      {
        createdAt: "desc",
      },
    ];
  }

  /* ---------------------------------- */
  /* QUERY */
  /* ---------------------------------- */

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