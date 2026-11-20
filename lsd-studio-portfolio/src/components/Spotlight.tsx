"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS, POPULAR_PROJECTS, PROJECT_CATEGORIES } from "@/data/site";

type Result = { label: string; sub: string; href: string };

/** Pencarian ala Spotlight macOS untuk halaman & karya. */
export default function Spotlight({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const all = useMemo<Result[]>(() => {
    const pages = NAV_LINKS.map((l) => ({ label: l.label, sub: "Halaman", href: l.href }));
    const cats = PROJECT_CATEGORIES.map((c) => ({ label: c.title, sub: "Kategori", href: `/projects#${c.id}` }));
    const works = [
      ...POPULAR_PROJECTS.map((p) => ({ label: p.title, sub: `Popular · ${p.category}`, href: "/projects#popular" })),
      ...PROJECT_CATEGORIES.flatMap((c) => c.projects.map((p) => ({ label: p.title, sub: c.title, href: `/projects#${c.id}` }))),
    ];
    return [...pages, ...cats, ...works];
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all.slice(0, 8);
    return all.filter((r) => `${r.label} ${r.sub}`.toLowerCase().includes(s)).slice(0, 10);
  }, [q, all]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/20 px-4 pt-[15vh] backdrop-blur-sm" onClick={onClose}>
      <div className="window w-full max-w-xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Cari">
        <div className="flex items-center gap-3 px-5 py-4">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari karya, kategori, halaman…"
            className="flex-1 bg-transparent text-xl outline-none placeholder:text-black/30"
          />
          <kbd className="rounded border border-black/10 px-1.5 font-mono text-[10px] text-muted">ESC</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto border-t border-black/5 p-2">
          {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted">Tidak ada hasil untuk “{q}”.</li>}
          {results.map((r, i) => (
            <li key={`${r.href}-${r.label}-${i}`}>
              <Link
                href={r.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-lg px-4 py-2.5 hover:bg-select hover:text-white"
              >
                <span className="font-medium">{r.label}</span>
                <span className="text-xs opacity-60">{r.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
