import { prisma } from "@/lib/prisma";
import { DesignRequestsTable } from "./DesignRequestsTable";
import { ManualDesignButton } from "./ManualDesignButton";

export default async function DesignRequestsPage() {
  const requests = await prisma.designRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Pedidos de Design
        </h1>

        <ManualDesignButton />
      </div>

      <DesignRequestsTable requests={requests} />
    </>
  );
}