import { prisma } from "@/lib/prisma";
import { DesignRequestsTable } from "./DesignRequestsTable";

export default async function DesignRequestsPage() {
  const requests = await prisma.designRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Pedidos de Design
      </h1>

      <DesignRequestsTable requests={requests} />
    </>
  );
}
