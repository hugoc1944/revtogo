import { prisma } from "@/lib/prisma";
import { ClientsTable } from "./ClientsTable";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      plates: {
        orderBy: { createdAt: "desc" },
        include: {
          designRequest: true,
          scans: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Clientes
      </h1>

      <ClientsTable clients={clients} />
    </>
  );
}
