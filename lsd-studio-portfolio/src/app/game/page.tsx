import type { Metadata } from "next";
import Artwork from "@/components/Artwork";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { GAME } from "@/data/site";

export const metadata: Metadata = { title: "Game Segment" };

export default function GamePage() {
  return (
    <div>
      {/* 1. Soon, Q1 2027 */}
      <section className="container-x pt-12 sm:pt-20">
        <Reveal className="window">
          <div className="window-bar">
            <span className="traffic"><span /><span /><span /></span>
            <span className="flex-1 text-center font-mono text-xs text-muted">{GAME.title}.app</span>
          </div>
          <div className="relative grid gap-10 p-8 sm:p-14 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFD84D] px-3 py-1 font-mono text-[11px] font-bold uppercase">
                ⚠️ In Development
              </span>
              <h1 className="mt-6 font-display text-[20vw] font-black uppercase leading-[0.8] tracking-[-0.06em] sm:text-[11vw] lg:text-[8.5rem]">
                Soon
              </h1>
              <p className="mt-2 font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">{GAME.release}</p>
              <p className="mt-6 max-w-lg text-muted">{GAME.tagline}</p>
              <div className="mt-8">
                <p className="eyebrow mb-3">Menuju Q1 2027</p>
                <Countdown date={GAME.releaseDate} />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rotate-3 overflow-hidden rounded-2xl shadow-window">
                <Artwork title="Key Art" className="h-full w-full" />
              </div>
              <div className="absolute -bottom-6 -left-8 h-32 w-32 -rotate-6 overflow-hidden rounded-xl border-4 border-white shadow-window">
                <Artwork title="Game Logo" showTitle={false} className="h-full w-full" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. Feature Gameplay */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Gameplay" number="01" title="Fitur Gameplay" />
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAME.features.map((f) => (
            <div key={f.title} className="window group p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-paper text-2xl shadow-icon transition-transform group-hover:rotate-6">{f.icon}</span>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 3. Screenshot Gameplay */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Screenshots" number="02" title="Screenshot Gameplay" />
        <Reveal stagger className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {GAME.screenshots.map((s, i) => (
            <figure key={s.title} className={`window group overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
              <Artwork image={s.image} title={s.title} className="aspect-video h-full w-full transition-transform duration-700 group-hover:scale-105" />
            </figure>
          ))}
        </Reveal>
      </section>

      {/* 4. Music Game */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Soundtrack" number="03" title="Music Game" />
        <Reveal>
          <MusicPlayer tracks={GAME.music} />
        </Reveal>
      </section>

      {/* 5. Credits */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Credits" number="04" title="Credits" align="center" />
        <Reveal stagger className="mx-auto max-w-2xl space-y-8 text-center">
          {GAME.credits.map((c) => (
            <div key={c.role}>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{c.role}</p>
              {c.names.map((n) => (
                <p key={n} className="mt-1 font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">{n}</p>
              ))}
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
