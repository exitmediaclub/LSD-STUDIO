"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SOCIALS } from "@/data/site";
import SocialButtons from "./SocialButtons";

/**
 * Tombol kreatif "CONTACT ME":
 * - Magnetik (mengikuti kursor), teks berputar melingkar, ikon amplop.
 * - Klik → membuka jendela "New Message" ala macOS berisi semua kontak.
 */
export default function ContactMeButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  const ring = "CONTACT ME • CONTACT ME • CONTACT ME • ";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => setOpen(true)}
        aria-label="Contact Me"
        className="group relative grid h-44 w-44 place-items-center rounded-full bg-ink text-white shadow-window transition-transform duration-200 ease-out active:scale-95"
      >
        {/* Teks melingkar berputar */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
          <defs>
            <path id="ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
          </defs>
          <text className="fill-white font-mono text-[15px] font-bold tracking-[0.18em]">
            <textPath href="#ring">{ring}</textPath>
          </text>
        </svg>
        {/* Inti tombol */}
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white text-3xl text-ink transition-all duration-500 group-hover:scale-110 group-hover:bg-select group-hover:text-white">
          <span className="transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">✉</span>
        </span>
        <span className="absolute -right-1 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#ff3b30] font-mono text-xs font-bold text-white shadow-icon">1</span>
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[90] grid place-items-center bg-black/25 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <div className="window w-full max-w-lg animate-[float_0.4s_ease-out]" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Contact Me">
              <div className="window-bar">
                <button onClick={() => setOpen(false)} aria-label="Tutup" className="traffic">
                  <span /><span /><span />
                </button>
                <span className="flex-1 text-center font-mono text-xs text-muted">New Message</span>
              </div>
              <div className="space-y-1 border-b border-black/5 px-6 py-4 text-sm">
                <p><span className="text-muted">Kepada:</span> <span className="rounded bg-select/10 px-1.5 text-select">LSD STUDIO</span></p>
                <p><span className="text-muted">Subjek:</span> Ayo kerja sama! ✦</p>
              </div>
              <div className="space-y-6 p-6">
                <p className="text-muted">Pilih cara paling nyaman untuk menghubungi kami. Biasanya kami membalas dalam 1×24 jam.</p>
                <SocialButtons withLabel />
                <div className="flex flex-wrap gap-3">
                  <a href={SOCIALS.whatsapp} target="_blank" rel="noreferrer" className="btn-dark">Chat WhatsApp ↗</a>
                  <a href={SOCIALS.email} className="btn-light">Kirim Email</a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
