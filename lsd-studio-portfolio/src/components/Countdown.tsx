"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Hari: Math.floor(ms / 86_400_000),
    Jam: Math.floor((ms / 3_600_000) % 24),
    Menit: Math.floor((ms / 60_000) % 60),
    Detik: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex flex-wrap gap-3">
      {(["Hari", "Jam", "Menit", "Detik"] as const).map((k) => (
        <div key={k} className="w-20 rounded-2xl bg-ink py-3 text-center text-white shadow-icon sm:w-24">
          <div className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">{t ? String(t[k]).padStart(2, "0") : "--"}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">{k}</div>
        </div>
      ))}
    </div>
  );
}
