import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminShell({
  children,
  hideSidebar = false,
}: {
  children: React.ReactNode;
  hideSidebar?: boolean;
}) {
  return (
    <div className="min-h-screen flex">
      {!hideSidebar && <AdminSidebar />}

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className={hideSidebar ? "px-10 py-8 w-full" : "p-6"}>
          {children}
        </main>
      </div>
    </div>
  );
}
