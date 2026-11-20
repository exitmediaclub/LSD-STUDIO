import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ABOUT_PARAGRAPHS } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container-x pt-12 sm:pt-20">
      <Reveal>
        <span className="eyebrow">~/LSD STUDIO/about.txt</span>
        <h1 className="mt-4 font-display text-[18vw] font-black uppercase leading-[0.8] tracking-[-0.06em] sm:text-[11vw]">About</h1>
      </Reveal>

      {/* Deskripsi panjang 6 paragraf, dalam jendela TextEdit */}
      <Reveal className="window mx-auto mt-14 max-w-4xl">
        <div className="window-bar">
          <span className="traffic"><span /><span /><span /></span>
          <span className="flex-1 text-center font-mono text-xs text-muted">about.txt — Edited</span>
        </div>
        <article className="space-y-7 p-7 text-lg leading-relaxed sm:p-14 sm:text-xl">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8]" : ""}>
              {p}
            </p>
          ))}
        </article>
      </Reveal>

      {/* Teks penutup */}
      <Reveal className="mt-20 border-t border-black/10 pt-8 text-center">
        <p className="font-mono text-sm text-muted">© 2026 LSD STUDIO. Semua hak dilindungi.</p>
      </Reveal>
    </div>
  );
}
