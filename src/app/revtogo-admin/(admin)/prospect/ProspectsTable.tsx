"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Globe,
  Instagram,
  Phone,
  ExternalLink,
} from "lucide-react";

/* ---------------------------------- */
/* TYPES */
/* ---------------------------------- */

type OutreachStatus =
  | "not_sent"
  | "email_sent"
  | "follow_up_1"
  | "follow_up_2"
  | "replied"
  | "removed";

type Prospect = {
  id: string;
  name: string;
  city: string;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
  website?: string | null;
  category: "beauty" | "health" | "fitness" | "restaurant";
  outreachStatus?: OutreachStatus;
  nextFollowUpAt?: string | null;
};

/* ---------------------------------- */
/* COMPONENT */
/* ---------------------------------- */

export default function ProspectsTable() {
  const [view, setView] = useState<"prospects" | "email">("prospects");
  const [data, setData] = useState<Prospect[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [handled, setHandled] = useState(false);
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all"); // ✅ NEW
  const [cities, setCities] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  /* ---------------------------------- */
  /* FETCH */
  /* ---------------------------------- */

  async function fetchData() {
    const params = new URLSearchParams({
      page: String(page),
      handled: String(handled),
    });

    if (view === "email") {
      params.append("emailOnly", "true");
    }

    if (category !== "all") {
      params.append("category", category);
    }

    if (city !== "all") {
      params.append("city", city);
    }

    if (search.trim().length > 0) {
      params.append("search", search.trim());
    }

    const res = await fetch(`/revtogo-admin/api/prospect?${params}`);
    const json = await res.json();

    setData(json.data);
    setTotalPages(json.totalPages);
    setTotalCount(json.total);
  }

  useEffect(() => {
    fetchData();
  }, [page, view, handled, category, city, search]);

  useEffect(() => {
    async function fetchCities() {
      const res = await fetch("/revtogo-admin/api/prospect/cities");
      const json = await res.json();
      setCities(json);
    }

    fetchCities();
  }, []);
  /* ---------------------------------- */
  /* PROSPECT+ HELPERS (UNCHANGED) */
  /* ---------------------------------- */

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
      `Olá 🙂`,,
      `Posso partilhar convosco uma observação rápida sobre o vosso perfil no Google?`,,
    ].join("\n");

    return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodeURIComponent(
      message
    )}`;
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

  /* ---------------------------------- */
  /* EMAIL HELPERS (UNCHANGED) */
  /* ---------------------------------- */

  function generateEmailTemplate(
    type: "email1" | "follow1" | "follow2",
    p: Prospect
  ) {
    const templates = {
      email1: {
        subject: `Uma forma simples de aumentar as avaliações Google do vosso espaço`,
        body: `Exmos. Senhores,

Encontrámos o vosso espaço no Google e verificámos que já têm uma presença interessante. No entanto, mais avaliações podem ter um impacto direto na captação de novos clientes.

Somos a Revtogo, um projeto português que desenvolve placas físicas personalizadas para recolha de avaliações Google.

A nossa solução é colocada discretamente no balcão e permite que o cliente deixe uma avaliação em apenas 5 segundos, através de QR Code ou tecnologia NFC - sem necessidade de procurar manualmente pelo negócio no Google.

Além de facilitar o processo, a placa:
• Reforça a identidade visual do espaço
• Mantém uma imagem profissional e premium
• Aumenta a probabilidade de o cliente efetivamente deixar uma avaliação

Gostariam que vos enviássemos uma imagem exemplo personalizada para o vosso estabelecimento, sem qualquer compromisso?

Com os melhores cumprimentos,`,
      },
      follow1: {
        subject: `Avaliações Google para o vosso espaço`,
        body: `Exmos. Senhores,

Retomamos o nosso contacto anterior, caso tenha passado despercebido.

A maioria dos negócios sabe que precisa de mais avaliações Google, mas raramente facilita o processo ao cliente no momento certo.

A Revtogo resolve exatamente esse ponto: transforma o pedido de avaliação numa ação simples, rápida e natural.

Podemos enviar-vos um exemplo visual adaptado ao vosso espaço para apreciação?

Ficamos a aguardar o vosso feedback.

Cumprimentos,
`,
      },
      follow2: {
        subject: `Posso enviar um exemplo para apreciação?`,
        body: `Exmos. Senhores,

Enviamos este último contacto para perceber se faz sentido continuar esta conversa.

Podemos preparar e enviar-vos uma imagem personalizada da placa Revtogo aplicada ao vosso espaço, apenas para que avaliem o potencial?

Caso não seja um tema prioritário neste momento, agradecemos igualmente a vossa indicação.

Obrigado pelo vosso tempo.

Com os melhores cumprimentos,`,
      },
    };

    return templates[type];
  }

  function copyEmail(
    type: "email1" | "follow1" | "follow2",
    p: Prospect
  ) {
    if (!p.email) return;

    const template = generateEmailTemplate(type, p);

    const full = `Para: ${p.email}
Assunto: ${template.subject}

${template.body}`;

    navigator.clipboard.writeText(full);
  }

  async function updateOutreachStatus(
    id: string,
    status: OutreachStatus
  ) {
    await fetch(`/revtogo-admin/api/prospect/${id}/outreach`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  }

  function statusBadge(status?: OutreachStatus, next?: string | null) {
    if (!status) return null;

    const now = new Date();
    const nextDate = next ? new Date(next) : null;

    let color = "bg-gray-100 text-gray-600";

    if (status === "email_sent") color = "bg-blue-100 text-blue-700";
    if (status === "follow_up_1") color = "bg-yellow-100 text-yellow-700";
    if (status === "follow_up_2") color = "bg-orange-100 text-orange-700";
    if (status === "replied") color = "bg-green-100 text-green-700";

    let countdown = "";

    if (nextDate) {
      const diff = nextDate.getTime() - now.getTime();

      if (diff <= 0) {
        countdown = " • Follow-up Due";
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        countdown = ` • ${days}d`;
      }
    }

    return (
      <span className={`text-xs px-3 py-1 rounded-full ${color}`}>
        {status.replaceAll("_", " ")}
        {countdown}
      </span>
    );
  }

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#0f172a]">
            Prospect+
          </h1>
          <p className="text-sm text-gray-500">
            Manage cold outreach targets
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center max-w-full">          <button
            onClick={() => {
              setView("prospects");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-sm ${
              view === "prospects"
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100"
            }`}
          >
            Prospect+
          </button>

          <button
            onClick={() => {
              setView("email");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-sm ${
              view === "email"
                ? "bg-[#0ea5a8] text-white"
                : "bg-gray-100"
            }`}
          >
            Email Outreach
          </button>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="health">Health</option>
            <option value="fitness">Fitness</option>
            <option value="restaurant">Restaurant</option>
          </select>

          {/* ✅ CITY FILTER */}
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setPage(1);
            }}
            className="
              px-3 py-2
              rounded-xl
              border border-gray-200
              text-sm
              max-w-[160px]
              truncate
            "
          >
            <option value="all">All Cities</option>

            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search business..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm w-48"
          />

          {view === "prospects" && (
            <button
              onClick={() => {
                setHandled((prev) => !prev);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl text-sm bg-gray-100"
            >
              {handled ? "Handled" : "Active"}
            </button>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Total: {totalCount}
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {data.map((p) => {
          const waLink = buildWhatsAppLink(p.phone, p.name);

          return (
            <div
              key={p.id}
              className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between"
            >
              <div className="space-y-2 max-w-[65%]">
                <div className="flex items-center gap-3">
                  <a
                    href={buildGoogleSearchLink(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold flex items-center gap-1"
                  >
                    {p.name}
                    <ExternalLink size={14} />
                  </a>

                  <span className="text-xs px-2 py-1 rounded-full bg-[#0ea5a8]/10 text-[#0ea5a8]">
                    {categoryLabel(p.category)}
                  </span>

                  {view === "email" &&
                    statusBadge(p.outreachStatus, p.nextFollowUpAt)}
                </div>

                <div className="text-sm text-gray-500">
                  {p.city}
                </div>

                {p.email && (
                  <div className="text-sm font-mono bg-gray-50 px-3 py-1 rounded-lg border">
                    {p.email}
                  </div>
                )}

                {/* FULL EMAIL CONTROLS */}
                {view === "email" && p.email && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => copyEmail("email1", p)}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg"
                    >
                      Copy Email 1
                    </button>

                    <button
                      onClick={() => copyEmail("follow1", p)}
                      className="px-3 py-1 text-xs bg-yellow-50 text-yellow-700 rounded-lg"
                    >
                      Copy Follow 1
                    </button>

                    <button
                      onClick={() => copyEmail("follow2", p)}
                      className="px-3 py-1 text-xs bg-orange-50 text-orange-700 rounded-lg"
                    >
                      Copy Follow 2
                    </button>

                    <button
                      onClick={() =>
                        updateOutreachStatus(p.id, "email_sent")
                      }
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg"
                    >
                      Mark Email Sent
                    </button>

                    <button
                      onClick={() =>
                        updateOutreachStatus(p.id, "follow_up_1")
                      }
                      className="px-3 py-1 text-xs bg-yellow-600 text-white rounded-lg"
                    >
                      Mark Follow 1
                    </button>

                    <button
                      onClick={() =>
                        updateOutreachStatus(p.id, "follow_up_2")
                      }
                      className="px-3 py-1 text-xs bg-orange-600 text-white rounded-lg"
                    >
                      Mark Follow 2
                    </button>

                    <button
                      onClick={() =>
                        updateOutreachStatus(p.id, "replied")
                      }
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg"
                    >
                      Replied
                    </button>

                    <button
                      onClick={() =>
                        updateOutreachStatus(p.id, "removed")
                      }
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE ACTIONS (Prospect+) */}
              {view === "prospects" && (
                <div className="flex items-center gap-3">
                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-green-50 hover:bg-green-100"
                    >
                      <Phone size={18} className="text-green-600" />
                    </a>
                  )}

                  {p.instagram && (
                    <a
                      href={p.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100"
                    >
                      <Instagram size={18} className="text-pink-600" />
                    </a>
                  )}

                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100"
                    >
                      <Globe size={18} className="text-blue-600" />
                    </a>
                  )}

                  {!handled && (
                    <button
                      onClick={() => markHandled(p.id)}
                      className="p-2 rounded-xl bg-[#0ea5a8] text-white"
                    >
                      <Check size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 pt-6 flex-wrap">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded-lg text-sm bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>

        {(() => {
          const pages: number[] = [];

          const start = Math.max(1, page - 2);
          const end = Math.min(totalPages, page + 2);

          for (let i = start; i <= end; i++) {
            pages.push(i);
          }

          return pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-lg text-sm ${
                page === p ? "bg-[#0ea5a8] text-white" : "bg-gray-100"
              }`}
            >
              {p}
            </button>
          ));
        })()}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 rounded-lg text-sm bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
}