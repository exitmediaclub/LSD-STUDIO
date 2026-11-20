"use client";

import Link from "next/link";
import { useState } from "react";
import { SOCIALS } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

type Item = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  render: React.ReactNode;
  bg: string;
};

/** Dock ala macOS dengan efek magnifikasi saat hover. */
export default function Dock({ onSearch }: { onSearch?: () => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const [trashShake, setTrashShake] = useState(false);

  const appText = (t: string, color: string) => (
    <span className="font-display text-[15px] font-bold" style={{ color }}>
      {t}
    </span>
  );

  const items: (Item | "divider")[] = [
    { label: "Projects", href: "/projects", bg: "linear-gradient(#6EC1FF,#1E7BFF)", render: <span className="text-xl">📁</span> },
    { label: "Illustrator", href: "/projects#illustration", bg: "#330000", render: appText("Ai", "#FF9A00") },
    { label: "Photoshop", href: "/projects#graphic", bg: "#001E36", render: appText("Ps", "#31A8FF") },
    { label: "After Effects", href: "/projects#social", bg: "#00005B", render: appText("Ae", "#9999FF") },
    { label: "Game 2027", href: "/game", bg: "linear-gradient(#FFD84D,#FF9F1C)", render: <span className="text-xl">⚠️</span> },
    { label: "Notes · About", href: "/about", bg: "linear-gradient(#FFF6C2,#FFE066)", render: <span className="text-xl">📝</span> },
    { label: "Profile", href: "/profile", bg: "#FFFFFF", render: <span className="text-xl">🌸</span> },
    { label: "Search", onClick: onSearch, bg: "#FFFFFF", render: <span className="text-xl">🔍</span> },
    "divider",
    { label: "Instagram", href: SOCIALS.instagram, external: true, bg: "linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)", render: <InstagramIcon className="h-6 w-6 text-white" /> },
    { label: "WhatsApp", href: SOCIALS.whatsapp, external: true, bg: "#25D366", render: <WhatsAppIcon className="h-6 w-6 text-white" /> },
    {
      label: "Trash",
      onClick: () => {
        setTrashShake(true);
        setTimeout(() => setTrashShake(false), 600);
      },
      bg: "rgba(255,255,255,.6)",
      render: <span className={`text-xl ${trashShake ? "animate-bounce" : ""}`}>🗑️</span>,
    },
  ];

  let idx = -1;
  return (
    <nav
      aria-label="Dock"
      onMouseLeave={() => setHover(null)}
      className="flex max-w-full items-end gap-1.5 overflow-x-auto rounded-[22px] border border-white/60 bg-white/50 px-2.5 py-2 shadow-window backdrop-blur-2xl [scrollbar-width:none] sm:gap-2"
    >
      {items.map((it, i) => {
        if (it === "divider") return <span key={`d${i}`} className="mx-1 h-10 w-px self-center bg-black/15" />;
        idx++;
        const my = idx;
        const dist = hover === null ? 99 : Math.abs(hover - my);
        const scale = dist === 0 ? 1.45 : dist === 1 ? 1.2 : dist === 2 ? 1.07 : 1;

        const tile = (
          <span
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-[12px] shadow-icon transition-transform duration-200 ease-out sm:h-12 sm:w-12"
            style={{ background: it.bg, transform: `translateY(${(1 - scale) * 28}px) scale(${scale})`, transformOrigin: "bottom" }}
          >
            {it.render}
            <span
              className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink/85 px-2 py-1 text-[11px] text-white transition-opacity ${
                hover === my ? "opacity-100" : "opacity-0"
              }`}
            >
              {it.label}
            </span>
          </span>
        );

        const common = {
          onMouseEnter: () => setHover(my),
          onFocus: () => setHover(my),
          "aria-label": it.label,
          className: "outline-none",
        };

        if (it.href && it.external)
          return (
            <a key={it.label} href={it.href} target="_blank" rel="noreferrer" {...common}>
              {tile}
            </a>
          );
        if (it.href)
          return (
            <Link key={it.label} href={it.href} {...common}>
              {tile}
            </Link>
          );
        return (
          <button key={it.label} type="button" onClick={it.onClick} {...common}>
            {tile}
          </button>
        );
      })}
    </nav>
  );
}
