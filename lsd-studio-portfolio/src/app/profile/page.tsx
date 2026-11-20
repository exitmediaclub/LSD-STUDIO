import type { Metadata } from "next";
import Image from "next/image";
import ContactMeButton from "@/components/ContactMeButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SocialButtons from "@/components/SocialButtons";
import { PROFILE } from "@/data/site";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div>
      {/* 1–3. Foto, nama, deskripsi */}
      <section className="container-x grid items-center gap-12 pt-12 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="window rotate-[-3deg] transition-transform duration-500 hover:rotate-0">
              <div className="window-bar !py-2.5">
                <span className="traffic"><span /><span /><span /></span>
                <span className="flex-1 text-center font-mono text-[10px] text-muted">me.jpg</span>
              </div>
              <div className="relative aspect-[4/5] bg-paper-dark">
                {PROFILE.photo ? (
                  <Image src={PROFILE.photo} alt={PROFILE.name} fill sizes="400px" className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#d9d9d6] to-[#bcbcb8]">
                    <span className="font-display text-7xl font-black tracking-tighter text-white/90">LSD</span>
                    <span className="absolute bottom-3 font-mono text-[10px] text-ink/50">/public/images/profile.jpg</span>
                  </div>
                )}
              </div>
            </div>
            {/* Stiker dekoratif */}
            <span className="absolute -right-4 -top-4 rotate-12 rounded-full bg-[#FFD84D] px-4 py-2 font-mono text-xs font-bold shadow-icon">Available ✦</span>
            <span className="absolute -bottom-5 -left-3 -rotate-6 rounded-lg bg-ink px-3 py-1.5 font-mono text-[11px] text-white shadow-icon">Jakarta, ID</span>
          </div>
        </Reveal>

        <Reveal>
          <span className="eyebrow">Profile</span>
          <h1 className="mt-3 font-display text-[18vw] font-black uppercase leading-[0.8] tracking-[-0.06em] sm:text-8xl">
            {PROFILE.name}
          </h1>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">{PROFILE.role}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{PROFILE.description}</p>
        </Reveal>
      </section>

      {/* 4. Workflow */}
      <section className="container-x pt-28">
        <SectionHeading eyebrow="Proses kerja" number="01" title="Workflow" />
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE.workflow.map((w) => (
            <div key={w.step} className="window group relative p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="font-display text-6xl font-black leading-none text-black/10 transition-colors group-hover:text-select">{w.step}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted">{w.description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 5. Tools */}
      <section id="tools" className="container-x scroll-mt-28 pt-28">
        <SectionHeading eyebrow="Tools" number="02" title="Tools yang digunakan" />
        <Reveal stagger className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {PROFILE.tools.map((t) => (
            <div key={t.name} className="group flex flex-col items-center gap-2">
              <span
                className="grid h-16 w-16 place-items-center rounded-[18px] font-display text-xl font-bold shadow-icon transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110"
                style={{ background: t.bg, color: t.color }}
              >
                {t.short}
              </span>
              <span className="icon-label">{t.name}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 6–7. Kontak + Contact Me */}
      <section id="contact" className="container-x scroll-mt-28 pt-28">
        <Reveal className="window">
          <div className="grid items-center gap-10 p-8 sm:p-14 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Mari bikin<br />sesuatu bareng.
              </h2>
              <p className="mt-4 max-w-md text-muted">Temukan kami di Behance, TikTok, Instagram, atau langsung chat via WhatsApp.</p>
              <div className="mt-8">
                <SocialButtons withLabel />
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <ContactMeButton />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
