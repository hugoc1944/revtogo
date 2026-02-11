"use client";

import { getPlateTrackingUrl } from "@/lib/plate-url";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function PlateModal({
  plate,
  onClose,
}: {
  plate: any;
  onClose: () => void;
}) {
  const trackingUrl = getPlateTrackingUrl(plate.shortId);

  const downloadQr = async () => {
    const dataUrl = await QRCode.toDataURL(trackingUrl, {
      width: 800,
      margin: 2,
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `revtogo-${plate.shortId}.png`;
    a.click();
  };

  const [stats, setStats] = useState<null | {
    totalScans: number;
    scansLast7Days: number;
    scansLast30Days: number;
    }>(null);

    useEffect(() => {
    setStats(null); // important
    
    fetch(`/revtogo-admin/api/plates/${plate.shortId}/stats`)
        .then((res) => res.json())
        .then(setStats)
        .catch(() => {});
    }, [plate.shortId, plate.id]);

    const togglePlate = async () => {
        const next =
            plate.status === "active" ? "inactive" : "active";

        const res = await fetch(
            `/revtogo-admin/api/plates/${plate.id}/status`,
            {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: next }),
            }
        );

        if (res.ok) {
            onClose(); // simplest safe refresh strategy
        }
    };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Placa {plate.shortId}
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          {/* LEFT */}
          <div className="space-y-2">
            <p><b>Negócio:</b> {plate.designRequest.businessName}</p>
            <p><b>Estilo:</b> {plate.designRequest.designStyle}</p>

            {plate.designRequest.googlePlaceId && (
              <p>
                <b>Google Place ID:</b>{" "}
                <span className="font-mono text-xs">
                  {plate.designRequest.googlePlaceId}
                </span>
              </p>
            )}

            <p><b>Criada em:</b> {new Date(plate.createdAt).toLocaleString("pt-PT")}</p>
            <p><b>Atualizada em:</b> {new Date(plate.updatedAt).toLocaleString("pt-PT")}</p>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Link da placa</label>
              <input
                readOnly
                value={trackingUrl}
                className="w-full border rounded px-3 py-2 text-xs font-mono"
              />
            </div>

            <button
              onClick={downloadQr}
              className="bg-primary text-white rounded-lg px-4 py-2"
            >
              📥 Descarregar QR (PNG)
            </button>
            <button
                onClick={togglePlate}
                className={`rounded-lg px-4 py-2 text-white ${
                    plate.status === "active"
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
                >
                {plate.status === "active"
                    ? "⛔ Desativar placa"
                    : "✅ Ativar placa"}
            </button>
          </div>
        </div>
        <div className="pt-6 border-t mt-6">
            <h3 className="font-semibold mb-2">
                Estatísticas de scans
            </h3>

            {!stats ? (
                <p className="text-sm text-muted">A carregar…</p>
            ) : (
                <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="font-semibold">{stats.totalScans}</p>
                    <p className="text-muted">Total</p>
                </div>
                <div>
                    <p className="font-semibold">{stats.scansLast7Days}</p>
                    <p className="text-muted">Últimos 7 dias</p>
                </div>
                <div>
                    <p className="font-semibold">{stats.scansLast30Days}</p>
                    <p className="text-muted">Últimos 30 dias</p>
                </div>
                </div>
            )}
            </div>
      </div>


    </div>
    
  );
}
