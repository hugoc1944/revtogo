"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    const res = await fetch("/revtogo-admin/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Credenciais inválidas");
      return;
    }

    window.location.href = "/revtogo-admin";
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-[20px] font-semibold mb-6">
          Revtogo Admin
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Utilizador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />

          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-primary text-white py-2 font-medium"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
