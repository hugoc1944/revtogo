import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


async function main() {
  const password = "@Rev2GO*";
  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username: "revtogoAdm" },
    update: {},
    create: {
      username: "revtogoAdm",
      email: "admin@revtogo.pt",
      passwordHash: hash,
      role: "admin",
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
