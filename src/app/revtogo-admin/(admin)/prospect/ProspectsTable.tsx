"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Globe,
  Instagram,
  Phone,
  ExternalLink,
  Mail,
} from "lucide-react";

type Prospect = {
  id: string;
  name: string;
  city: string;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
  website?: string | null;
  category: "beauty" | "health" | "fitness" | "restaurant";
};

export default function ProspectsTable() {
  const [data, setData] = useState<Prospect[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // ✅ NEW
  const [handled, setHandled] = useState(false);
  const [category, setCategory] = useState("all");
  const [emailPriority, setEmailPriority] = useState(false);

  async function fetchData() {
    const params = new URLSearchParams({
      page: String(page),
      handled: String(handled),
      emailFirst: String(emailPriority),
    });

    if (category !== "all") {
      params.append("category", category);
    }

    const res = await fetch(`/revtogo-admin/api/prospect?${params}`);
    const json = await res.json();

    const normalized = json.data.map((p: Prospect) => ({
      ...p,
      email: p.email ?? undefined,
      phone: p.phone ?? undefined,
      instagram: p.instagram ?? undefined,
      website: p.website ?? undefined,
    }));

    setData(normalized);
    setTotalPages(json.totalPages);
    setTotalCount(json.total); // ✅ SAVE TOTAL
  }

  useEffect(() => {
    fetchData();
  }, [page, handled, category, emailPriority]);

  async function markHandled(id: string) {
    await fetch(`/revtogo-admin/api/prospect/${id}/handled`, {
      method: "PATCH",
    });
    fetchData();
  }

  function buildWhatsAppLink(
    phone: string | null | undefined,
    businessName: string
  ) {
    if (!phone) return undefined;

    const cleaned = phone.replace(/\D/g, "");

    const message = [
      `Olá ${businessName}! Tudo bem?`,
      `Apenas contacto porque acredito que pode ser do vosso interesse - o nosso objetivo é ajudar-vos a subir nas pesquisas do Google através de uma peça de avaliações cuidadosamente concebida, tornando o pedido de review algo simples e natural.`,
      ``,
      `Envio algumas imagens do que fazemos e gostava de saber se posso desenhar uma placa para vocês e enviar por aqui uma fotografia, semelhante às que envio, sem compromisso 😊`,
      `Se gostarem, ótimo - se não, fica assim! Obrigado 🙌`,
    ].join("\n");

    const cleanMessage = message.replace(/\r/g, "");
    const encodedMessage = encodeURIComponent(cleanMessage);

    return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodedMessage}`;
  }

  function buildGoogleSearchLink(name: string) {
    return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  }

  function categoryLabel(cat: Prospect["category"]) {
    switch (cat) {
      case "beauty":
        return "Beauty";
      case "health":
        return "Health";
      case "fitness":
        return "Fitness";
      case "restaurant":
        return "Restaurant";
    }
  }

  function handleEmailClick(e: React.MouseEvent<HTMLDivElement>) {
    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#0f172a]">
            Prospect+
          </h1>
          <p className="text-sm text-gray-500">
            Manage cold outreach targets
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setPage(1);
              setHandled(false);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              !handled
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => {
              setPage(1);
              setHandled(true);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              handled
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Handled
          </button>

          <button
            onClick={() => {
              setPage(1);
              setEmailPriority((prev) => !prev);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              emailPriority
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Mail size={16} />
            Email First
          </button>

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a8]"
          >
            <option value="all">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="health">Health</option>
            <option value="fitness">Fitness</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
      </div>

      {/* ✅ Handled Counter */}
      {handled && (
        <div className="flex justify-between items-center bg-[#0ea5a8]/10 border border-[#0ea5a8]/20 rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-[#0f172a]">
            Total Handled Prospects
          </span>
          <span className="text-lg font-semibold text-[#0ea5a8]">
            {totalCount}
          </span>
        </div>
      )}

      {/* Cards */}
      <div className="space-y-4">
        {data.map((p) => {
          const waLink = buildWhatsAppLink(p.phone, p.name);

          return (
            <div
              key={p.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="space-y-2 max-w-[70%]">
                <div className="flex items-center gap-3">
                  <a
                    href={buildGoogleSearchLink(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0f172a] hover:text-[#0ea5a8] flex items-center gap-1"
                  >
                    {p.name}
                    <ExternalLink size={14} />
                  </a>

                  <span className="text-xs px-2 py-1 rounded-full bg-[#0ea5a8]/10 text-[#0ea5a8] font-medium">
                    {categoryLabel(p.category)}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  {p.city}
                </div>

                {p.email && (
                  <div
                    onClick={handleEmailClick}
                    className="inline-block text-sm font-mono bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 cursor-text hover:bg-gray-100 transition"
                  >
                    {p.email}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-green-50 hover:bg-green-100 transition"
                  >
                    <Phone size={18} className="text-green-600" />
                  </a>
                )}

                {p.instagram && (
                  <a
                    href={p.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 transition"
                  >
                    <Instagram size={18} className="text-pink-600" />
                  </a>
                )}

                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <Globe size={18} className="text-blue-600" />
                  </a>
                )}

                {!handled && (
                  <button
                    onClick={() => markHandled(p.id)}
                    className="p-2 rounded-xl bg-[#0ea5a8] hover:bg-[#0891b2] text-white transition"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              page === i + 1
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
