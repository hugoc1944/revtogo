"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDesignRequestStore } from "@/stores/design-request.store";

type Stop = {
  id: string;
  businessName: string;
  googlePlaceId: string;
  lat: number;
  lng: number;
  visitOutcome: "pending" | "accepted" | "refused" | "skipped";
  refusalReason?: string | null;
};

type Mission = {
  id: string;
  name: string;
  city: string;
  stops: Stop[];
};

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();

  const openDesignRequest = useDesignRequestStore((s) => s.open);
  const updateDesignRequest = useDesignRequestStore((s) => s.update);
  const resetDesignRequest = useDesignRequestStore((s) => s.reset);

  const step = useDesignRequestStore((s) => s.step);
  const designData = useDesignRequestStore((s) => s.data);

  const missionId =
    Array.isArray(params.id) ? params.id[0] : params.id;

  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);

  const [refusalStop, setRefusalStop] = useState<Stop | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch(
        `/revtogo-admin/api/find/missions/${missionId}`
      );
      if (!res.ok) return;
      const data = await res.json();
      setMission(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (missionId) load();
  }, [missionId]);

  useEffect(() => {
    if (step === "success" && designData.source === "find_mission") {
      load();
    }
  }, [step]);

  function handleManualDesign() {
    resetDesignRequest();
    openDesignRequest();
  }

  async function updateOutcome(
    stopId: string,
    outcome: "refused" | "skipped",
    refusalReason?: string
  ) {
    await fetch(
      `/revtogo-admin/api/find/stops/${stopId}/outcome`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome, refusalReason }),
      }
    );
    load();
  }

  function handleAccept(stop: Stop) {
    if (!mission) return;

    updateDesignRequest({
      businessName: stop.businessName,
      businessLabel: stop.businessName,
      googlePlaceId: stop.googlePlaceId,
      businessCity: mission.city,
      source: "find_mission",
      stopId: stop.id,
    });

    openDesignRequest();
  }

  if (loading) {
    return <div className="p-10 text-lg">A carregar missão...</div>;
  }

  if (!mission) {
    return <div className="p-10 text-red-600">Erro ao carregar missão.</div>;
  }

  const total = mission.stops.length;
  const done = mission.stops.filter(
    (s) => s.visitOutcome !== "pending"
  ).length;

  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">

      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b bg-white/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-start">

          <div>
            <button
              onClick={() => router.push("/revtogo-admin/find")}
              className="text-sm text-gray-400 hover:text-black transition mb-2"
            >
              ← Voltar
            </button>

            <h1 className="text-3xl font-bold tracking-tight">
              {mission.name}
            </h1>
            <p className="text-gray-500 mt-1">{mission.city}</p>
          </div>

          <button
            onClick={handleManualDesign}
            className="
              px-5 py-2.5
              rounded-2xl
              bg-black text-white
              text-sm font-semibold
              shadow-lg
              hover:scale-[1.04]
              transition-all
            "
          >
            + Pedir Design Manual
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">

        {/* Progress Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-black/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Progresso</span>
            <span className="text-sm font-semibold">
              {done}/{total} • {progress}%
            </span>
          </div>

          <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
            <div
              className="bg-black h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stops */}
        <div className="grid gap-6">
          {mission.stops.map((stop) => (
            <div
              key={stop.id}
              className="bg-white rounded-3xl shadow-md border border-black/5 p-8 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start mb-5">

                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {stop.businessName}
                  </h3>

                  {stop.visitOutcome !== "pending" && (
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                        stop.visitOutcome === "accepted"
                          ? "bg-green-100 text-green-700"
                          : stop.visitOutcome === "refused"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {stop.visitOutcome.toUpperCase()}
                    </span>
                  )}
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Direções →
                </a>
              </div>

              {stop.visitOutcome === "pending" && (
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleAccept(stop)}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Aceitou
                  </button>

                  <button
                    onClick={() => setRefusalStop(stop)}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Recusou
                  </button>

                  <button
                    onClick={() =>
                      updateOutcome(stop.id, "skipped")
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-xl font-semibold transition"
                  >
                    Saltar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {progress === 100 && (
          <div className="pt-10">
            <button
              onClick={() => router.push("/revtogo-admin/find")}
              className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold shadow-xl hover:opacity-90 transition"
            >
              Missão Concluída — Voltar às Missões
            </button>
          </div>
        )}
      </div>

      {/* Refusal Modal */}
      {refusalStop && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6">

            <h3 className="text-xl font-semibold">
              Motivo da recusa
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { value: "not_interested", label: "Não interessado" },
                { value: "already_has_solution", label: "Já tem solução" },
                { value: "franchise", label: "Franchise" },
                { value: "language_barrier", label: "Barreira linguística" },
              ].map((reason) => (
                <button
                  key={reason.value}
                  onClick={() => setSelectedReason(reason.value)}
                  className={`text-left px-4 py-3 rounded-xl border transition ${
                    selectedReason === reason.value
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => {
                  setRefusalStop(null);
                  setSelectedReason(null);
                }}
                className="text-sm text-gray-500 hover:text-black"
              >
                Cancelar
              </button>

              <button
                disabled={!selectedReason}
                onClick={async () => {
                  if (!refusalStop || !selectedReason) return;

                  await updateOutcome(
                    refusalStop.id,
                    "refused",
                    selectedReason
                  );

                  setRefusalStop(null);
                  setSelectedReason(null);
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-xl disabled:opacity-40"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
