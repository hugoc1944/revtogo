"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ===============================
   TYPES
================================ */

type Stop = {
  id: string;
  lat: number;
  lng: number;
};

type Mission = {
  id: string;
  name: string;
  category: string;
  city: string;
  estimatedDurationMinutes: number;
  status: "todo" | "in_progress" | "done" | "abandoned";
  stops: Stop[];
  distance?: number | null;
};

/* ===============================
   DISTANCE CALC
================================ */

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ===============================
   PAGE
================================ */

export default function FindPage() {
  const router = useRouter();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);

  /* ===============================
     INTRO TRANSITION
  ================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     LOCATION REQUEST
  ================================= */

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      () => {
        setLocationError("Permissão de localização negada.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  /* ===============================
     LOAD MISSIONS
  ================================= */

  async function load() {
    const res = await fetch("/revtogo-admin/api/find/missions");
    const data: Mission[] = await res.json();

    if (userLocation) {
      const enriched = data.map((mission) => {
        const firstStop = mission.stops?.[0];
        if (!firstStop) return { ...mission, distance: null };

        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          firstStop.lat,
          firstStop.lng
        );

        return { ...mission, distance };
      });

      enriched.sort((a, b) => {
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });

      setMissions(enriched);
    } else {
      setMissions(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [userLocation]);

  /* ===============================
     GROUPING
  ================================= */

  const grouped = {
    todo: missions.filter((m) => m.status === "todo"),
    in_progress: missions.filter((m) => m.status === "in_progress"),
    done: missions.filter((m) => m.status === "done"),
  };

  return (
    <>
      {/* ===============================
           INTRO SCREEN
      ================================= */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="
              fixed inset-0 z-[999]
              flex items-center justify-center
              bg-gradient-to-br from-purple-600 via-indigo-600 to-black
              text-white
            "
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold tracking-tight mb-4">
                Olá!
              </h1>
              <p className="text-xl opacity-80">
                Boa sorte ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================
           MAIN CONTENT
      ================================= */}

      <div className="p-8 max-w-7xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Missões
            </h1>
            <p className="text-gray-500 mt-1">
              Ordenadas por proximidade
            </p>
          </div>

          {!userLocation && (
            <button
              onClick={requestLocation}
              className="
                px-5 py-3 rounded-2xl
                bg-gradient-to-r from-black to-gray-800
                text-white font-semibold
                shadow-xl
                hover:scale-[1.03]
                transition-all
              "
            >
              Ativar localização
            </button>
          )}
        </div>

        {locationError && (
          <p className="text-sm text-red-500">
            {locationError}
          </p>
        )}

        <Section title="🟡 Por Fazer" missions={grouped.todo} router={router} />
        <Section title="🔵 Em Progresso" missions={grouped.in_progress} router={router} />
        <Section title="🟢 Concluídas" missions={grouped.done} router={router} />
      </div>
    </>
  );
}

/* ===============================
   SECTION
================================ */

function Section({
  title,
  missions,
  router,
}: {
  title: string;
  missions: Mission[];
  router: any;
}) {
  if (!missions.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {title}
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} router={router} />
        ))}
      </div>
    </div>
  );
}

/* ===============================
   CARD
================================ */

function MissionCard({
  mission,
  router,
}: {
  mission: Mission;
  router: any;
}) {
  async function startMission() {
    await fetch(`/revtogo-admin/api/find/missions/${mission.id}/start`, {
      method: "POST",
    });

    router.push(`/revtogo-admin/find/${mission.id}`);
  }

  return (
    <div className="
      relative bg-white rounded-3xl shadow-xl p-6
      border border-gray-100 flex flex-col justify-between
      min-h-[260px] hover:shadow-2xl hover:-translate-y-1 transition-all
    ">

      {mission.distance && mission.distance < 500 && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          Próxima de si
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">
          {mission.name}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          {mission.city} • {mission.stops.length} paragens • {mission.estimatedDurationMinutes} min
        </p>

        {mission.distance && (
          <p className="text-xs text-gray-400 mb-3">
            📍 {Math.round(mission.distance)} metros
          </p>
        )}

        <div className="
          inline-flex items-center text-xs font-semibold
          px-3 py-1 rounded-full
          bg-gradient-to-r from-gray-100 to-gray-50
          border border-gray-200
        ">
          {mission.category.toUpperCase()}
        </div>
      </div>

      <div className="mt-6">
        {mission.status === "todo" && (
          <button
            onClick={startMission}
            className="
              w-full bg-gradient-to-r from-black to-gray-800
              text-white py-3 rounded-2xl font-semibold shadow-lg
              hover:scale-[1.02] transition-all
            "
          >
            Iniciar Missão
          </button>
        )}

        {mission.status === "in_progress" && (
          <button
            onClick={() => router.push(`/revtogo-admin/find/${mission.id}`)}
            className="
              w-full bg-gradient-to-r from-blue-600 to-blue-500
              text-white py-3 rounded-2xl font-semibold shadow-lg
              hover:scale-[1.02] transition-all
            "
          >
            Continuar
          </button>
        )}

        {mission.status === "done" && (
          <div className="text-green-600 font-semibold text-center">
            Missão concluída
          </div>
        )}
      </div>
    </div>
  );
}
