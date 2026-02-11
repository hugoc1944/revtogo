import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    designCount,
    contactCount,
  ] = await Promise.all([
    prisma.designRequest.count(),
    prisma.contact.count(),
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pedidos de Design"
          value={designCount}
        />
        <StatCard
          title="Contactos"
          value={contactCount}
        />
        <StatCard
          title="Clientes"
          value="—"
        />
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-ink/10 p-6 bg-white">
      <p className="text-sm text-ink/60 mb-2">{title}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}
