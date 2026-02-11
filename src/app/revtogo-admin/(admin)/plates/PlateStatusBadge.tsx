export function PlateStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    producing: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-200 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}