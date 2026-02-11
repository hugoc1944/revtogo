export default function PlateInactivePage({
  params,
}: {
  params: { shortId: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">😕</div>

        <h1 className="text-2xl font-bold mb-2">
          Oops!
        </h1>

        <p className="text-muted mb-6">
          Esta placa encontra-se temporariamente inativa.
        </p>

        <a
          href="https://revtogo.pt/contactos"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Contactar suporte
        </a>
      </div>
    </div>
  );
}
