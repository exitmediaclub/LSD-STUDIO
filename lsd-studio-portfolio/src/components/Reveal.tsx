"use client";

import { useEffect, useRef } from "react";

/**
 * Animasi fade-up saat elemen masuk viewport (IntersectionObserver + Web Animations API).
 * `stagger` menganimasikan anak langsung satu per satu.
 * Konten tetap terlihat jika JavaScript mati (state awal hanya diset di browser).
 */
export default function Reveal({
  children,
  className = "",
  stagger = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = (stagger ? Array.from(el.children) : [el]) as HTMLElement[];
    // Hanya sembunyikan elemen yang belum terlihat di layar
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    targets.forEach((t) => (t.style.opacity = "0"));

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        targets.forEach((t, i) => {
          const anim = t.animate(
            [
              { opacity: 0, transform: "translateY(48px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 900, delay: delay * 1000 + (stagger ? i * 100 : 0), easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
          );
          t.style.opacity = "";
          anim.onfinish = () => anim.cancel();
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
