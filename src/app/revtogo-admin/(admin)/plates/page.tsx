import { prisma } from "@/lib/prisma";
import { PlatesTable } from "./PlatesTable";

export default async function PlatesPage() {
  const plates = await prisma.plate.findMany({
    orderBy: { createdAt: "desc" },
    include: {
        designRequest: true,
        scans: {
        select: {
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        },
    },
    });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Placas</h1>
      <PlatesTable plates={plates} />
    </>
  );
}
