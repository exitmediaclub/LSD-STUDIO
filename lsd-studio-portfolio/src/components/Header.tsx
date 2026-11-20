"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/site";
import SocialButtons from "./SocialButtons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Jam ala menu bar macOS
    const fmt = () =>
      setTime(new Date().toLocaleTimeString("id-ID", { weekday: "short", hour: "2-digit", minute: "2-digit" }));
    fmt();
    const t = setInterval(fmt, 30_000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(t);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled ? "border-b border-black/5 bg-paper/75 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between sm:h-20">
          {/* Logo push button */}
          <Link
            href="/"
            aria-label="LSD STUDIO — Home"
            className="group flex items-center gap-3 rounded-2xl py-1 pl-1 pr-3 transition-colors hover:bg-black/5 active:scale-95"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-ink font-display text-[13px] font-black tracking-tight text-white shadow-icon transition-transform duration-500 group-hover:-rotate-12">
              LSD
            </span>
            <span className="font-display text-lg font-black tracking-tight">STUDIO</span>
          </Link>

          {/* Desktop nav ala menu bar */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    active ? "bg-ink text-white" : "text-ink/70 hover:bg-black/5 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-muted sm:block" suppressHydrationWarning>
              {time}
            </span>
            {/* Drawer push button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              className="group grid h-11 w-11 place-items-center rounded-full bg-white shadow-icon transition-all duration-300 hover:scale-105 hover:bg-ink active:scale-95"
            >
              <span className="grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-[2px] bg-ink transition-colors group-hover:bg-white" />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Drawer (jendela macOS) */}
      <div className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          role="dialog"
          aria-label="Menu navigasi"
          className={`absolute bottom-3 right-3 top-3 flex w-[calc(100%-1.5rem)] max-w-md flex-col overflow-hidden rounded-3xl bg-white/90 shadow-window backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
            open ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0"
          }`}
        >
          <div className="window-bar">
            <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="traffic group">
              <span className="grid place-items-center text-[8px] font-bold text-black/0 group-hover:text-black/60">✕</span>
              <span />
              <span />
            </button>
            <span className="flex-1 text-center font-mono text-xs text-muted">~/LSD STUDIO/menu</span>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {NAV_LINKS.map((l, i) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                  className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-500 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  } ${active ? "bg-select text-white" : "hover:bg-black/5"}`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${active ? "bg-white/20" : "bg-paper"}`}>
                    {["🏠", "📁", "🎮", "👤", "📄"][i]}
                  </span>
                  <span className="font-display text-3xl font-black tracking-tight sm:text-4xl">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-black/5 p-6">
            <p className="font-mono text-xs text-muted">Mari berkolaborasi ✦</p>
            <SocialButtons size="sm" />
          </div>
        </aside>
      </div>
    </>
  );
}
