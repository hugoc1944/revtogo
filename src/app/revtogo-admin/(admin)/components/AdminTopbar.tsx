"use client";

export function AdminTopbar() {
  const logout = async () => {
    await fetch("/revtogo-admin/api/logout", {
      method: "POST",
      credentials: "include", // REQUIRED
    });
    window.location.href = "/revtogo-admin/login";
  };

  return (
    <div className="h-14 border-b bg-white px-6 flex items-center justify-end">
      <button
        onClick={logout}
        className="text-sm text-muted hover:text-primary"
      >
        Terminar sessão
      </button>
    </div>
  );
}
