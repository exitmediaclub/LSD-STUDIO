"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESKTOP_ICONS, HERO } from "@/data/site";
import Artwork from "./Artwork";
import Dock from "./Dock";
import Spotlight from "./Spotlight";

gsap.registerPlugin(ScrollTrigger);

/**
 * HERO — Scroll-based Video Scrubbing (GSAP ScrollTrigger)
 * - Section di-pin selama ±250% tinggi layar.
 * - Progress scroll → video.currentTime (di-lerp agar halus).
 * - Poster/foto besar di tengah: blur → tajam saat di-scroll.
 * - Ikon karya ala desktop menyebar keluar, lalu judul besar muncul.
 */
export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [spotlight, setSpotlight] = useState(false);

  // Muat video sebagai blob agar seek mulus di semua frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let objectUrl: string | null = null;
    let cancelled = false;
    fetch(HERO.video)
      .then((r) => {
        if (!r.ok) throw new Error("video not found");
        return r.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {
        if (!cancelled) video.src = HERO.video;
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let raf = 0;
    const tick = () => {
      current += (target - current) * 0.15;
      if (video.duration && Math.abs(video.currentTime - current) > 0.01) video.currentTime = current;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // iOS Safari: unlock video agar bisa di-seek
    const unlock = () => video.play().then(() => video.pause()).catch(() => {});
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video.duration) target = self.progress * (video.duration - 0.05);
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      if (reduce) return;

      // Foto/video: blur → tajam, sedikit zoom-in
      tl.fromTo(mediaRef.current, { filter: "blur(10px) saturate(0.6)", scale: 1.08 }, { filter: "blur(0px) saturate(1)", scale: 1, duration: 0.5 }, 0);

      // Ikon desktop menyebar keluar dari pusat
      const icons = gsap.utils.toArray<HTMLElement>("[data-icon]");
      icons.forEach((el) => {
        const x = Number(el.dataset.x) - 50;
        const y = Number(el.dataset.y) - 50;
        tl.to(el, { xPercent: x * 9, yPercent: y * 9, rotate: x * 0.6, opacity: 0, duration: 0.45 }, 0.05 + Math.random() * 0.1);
      });

      tl.to(hintRef.current, { opacity: 0, y: 20, duration: 0.1 }, 0);
      tl.fromTo(titleRef.current, { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 }, 0.55);
    }, section);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("touchstart", unlock);
      ctx.revert();
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  };

  return (
    <section ref={sectionRef} className="relative -mt-16 h-[100svh] w-full overflow-hidden bg-paper sm:-mt-20">
      {/* Poster + video, tepi memudar ke latar seperti referensi */}
      <div
        ref={mediaRef}
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, #000 45%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, #000 45%, transparent 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO.poster}
          alt="Poster utama LSD STUDIO"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Ikon karya ala desktop */}
      <div ref={iconsRef} className="absolute inset-0">
        {DESKTOP_ICONS.map((ic, i) => (
          <div
            key={ic.label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${i > 7 ? "hidden md:block" : ""}`}
            style={{ left: `${ic.x}%`, top: `${ic.y}%` }}
          >
            <div data-icon data-x={ic.x} data-y={ic.y}>
            <Link href={ic.href} className="group flex w-20 flex-col items-center gap-1.5 sm:w-24">
              <span className="block h-12 w-12 overflow-hidden rounded-md bg-white p-0.5 shadow-icon transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:h-14 sm:w-14">
                <Artwork image={ic.image} title={ic.label} showTitle={false} className="h-full w-full rounded-[4px]" />
              </span>
              <span className="icon-label">{ic.label}</span>
            </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Judul besar (muncul saat di-scroll) */}
      <div ref={titleRef} className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center opacity-0">
        <div>
          <h1 className="font-display text-[17vw] font-black uppercase leading-[0.8] tracking-[-0.06em] text-white [filter:drop-shadow(0_8px_40px_rgba(0,0,0,.35))] sm:text-[14vw]">
            {HERO.title}
          </h1>
          <p className="mt-6 inline-block rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white sm:text-xs">{HERO.subtitle}</p>
        </div>
      </div>

      {/* Hint scroll */}
      <div ref={hintRef} className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:left-8">
        ↓ Scroll untuk menjelajah
      </div>

      {/* Tombol bulat kanan bawah (seperti referensi) */}
      <div className="absolute bottom-32 right-4 z-20 flex flex-col gap-3 sm:bottom-14 sm:right-8">
        <button onClick={toggleFullscreen} aria-label="Layar penuh" className="round-btn">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
          </svg>
        </button>
        <button onClick={() => setSpotlight(true)} aria-label="Cari karya" className="round-btn">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>

      {/* Dock */}
      <div className="absolute inset-x-0 bottom-12 z-20 flex justify-center px-3">
        <Dock onSearch={() => setSpotlight(true)} />
      </div>

      {/* Progress scroll */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-black/5">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-ink" />
      </div>

      <Spotlight open={spotlight} onClose={() => setSpotlight(false)} />
    </section>
  );
}
