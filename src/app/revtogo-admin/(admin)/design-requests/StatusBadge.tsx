export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    solved: "bg-green-100 text-green-800",

    // design requests reuse
    design_sent: "bg-blue-100 text-blue-800",
    producing: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    refused: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
        map[status] ?? "bg-gray-100 text-gray-800"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
