import { prisma } from "@/lib/prisma";
import { ContactsTable } from "./ContactsTable";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Contactos</h1>
      <ContactsTable contacts={contacts} />
    </>
  );
}
