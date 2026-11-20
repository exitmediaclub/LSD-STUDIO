"use client";

import { useEffect, useRef, useState } from "react";

type Track = { title: string; duration: string; src: string };

/** Daftar musik game ala aplikasi Music. Isi `src` di data agar audio benar-benar diputar. */
export default function MusicPlayer({ tracks }: { tracks: Track[] }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggle = (i: number) => {
    const audio = audioRef.current ?? (audioRef.current = new Audio());
    if (playing === i) {
      audio.pause();
      setPlaying(null);
      return;
    }
    setPlaying(i);
    if (tracks[i].src) {
      audio.src = tracks[i].src;
      audio.play().catch(() => {});
      audio.onended = () => setPlaying(null);
    } else {
      audio.pause();
    }
  };

  return (
    <div className="window">
      <div className="window-bar">
        <span className="traffic"><span /><span /><span /></span>
        <span className="flex-1 text-center font-mono text-xs text-muted">Music — Original Soundtrack</span>
      </div>
      <ul className="divide-y divide-black/5">
        {tracks.map((t, i) => {
          const active = playing === i;
          return (
            <li key={t.title}>
              <button
                onClick={() => toggle(i)}
                className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors ${active ? "bg-select text-white" : "hover:bg-black/5"}`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${active ? "bg-white text-select" : "bg-ink text-white"}`}>
                  {active ? "❚❚" : "▶"}
                </span>
                <span className="w-6 font-mono text-xs opacity-50">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-medium">{t.title}</span>
                {active && (
                  <span className="flex h-4 items-end gap-0.5" aria-hidden>
                    {[0, 1, 2, 3].map((b) => (
                      <span key={b} className="w-1 animate-bounce rounded bg-white" style={{ height: `${40 + b * 15}%`, animationDelay: `${b * 0.12}s` }} />
                    ))}
                  </span>
                )}
                <span className="font-mono text-xs opacity-60">{t.duration}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {tracks.every((t) => !t.src) && (
        <p className="border-t border-black/5 px-5 py-3 font-mono text-[11px] text-muted">Preview audio segera hadir.</p>
      )}
    </div>
  );
}
