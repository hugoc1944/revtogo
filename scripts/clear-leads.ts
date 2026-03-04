const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting leads...");
  const result = await prisma.lead.deleteMany();
  console.log("Deleted:", result.count);
  await prisma.$disconnect();
}

main();