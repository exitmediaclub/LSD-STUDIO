import Link from "next/link";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import Artwork from "@/components/Artwork";
import { POPULAR_PROJECTS, PROJECT_CATEGORIES } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* 3 & 5. Banner besar + Scroll-based Video Scrubbing */}
      <ScrollVideoHero />

      {/* 4. Shortcut karya */}
      <section className="container-x pt-24">
        <SectionHeading
          eyebrow="Shortcut"
          number="01"
          title={<>Karya-karya<br />kami</>}
          description="Buka folder untuk melihat karya berdasarkan kategori, atau langsung lihat proyek terpopuler di bawah."
        />

        {/* Jendela Finder berisi folder kategori */}
        <Reveal>
          <div className="window">
            <div className="window-bar">
              <span className="traffic"><span /><span /><span /></span>
              <span className="flex-1 text-center font-mono text-xs text-muted">~/LSD STUDIO/Projects</span>
              <Link href="/projects" className="font-mono text-xs text-select hover:underline">Lihat semua →</Link>
            </div>
            <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 sm:p-10 lg:grid-cols-6">
              {[{ id: "popular", title: "POPULAR", count: POPULAR_PROJECTS.length }, ...PROJECT_CATEGORIES.map((c) => ({ id: c.id, title: c.title, count: c.projects.length }))].map(
                (f) => (
                  <Link key={f.id} href={`/projects#${f.id}`} className="group flex flex-col items-center gap-2">
                    <span className="relative block h-20 w-24 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      {/* Ikon folder */}
                      <span className="absolute left-0 top-0 h-4 w-10 rounded-t-md bg-[#5AB0FF]" />
                      <span className="absolute inset-x-0 bottom-0 top-2.5 rounded-lg bg-gradient-to-b from-[#7CC4FF] to-[#3E97F5] shadow-icon" />
                      <span className="absolute bottom-2 right-2 rounded bg-white/90 px-1.5 font-mono text-[10px] font-bold text-ink">{f.count}</span>
                    </span>
                    <span className="icon-label">{f.title}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Proyek populer */}
      <section className="container-x pt-24">
        <SectionHeading eyebrow="Most Popular" number="02" title="Paling banyak dilihat" />
        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {POPULAR_PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} size="lg" />
          ))}
        </Reveal>
      </section>

      {/* Strip karya terbaru (marquee) */}
      <section className="mt-24 overflow-hidden border-y border-black/10 bg-white/60 py-8">
        <div className="flex w-max animate-marquee gap-6">
          {[...Array(2)].flatMap((_, k) =>
            PROJECT_CATEGORIES.flatMap((c) => c.projects.slice(0, 2)).map((p) => (
              <div key={`${k}-${p.slug}`} className="flex items-center gap-3">
                <Artwork title={p.title} showTitle={false} className="h-16 w-16 rounded-md shadow-icon" />
                <div>
                  <p className="font-display text-lg font-black uppercase leading-none">{p.title}</p>
                  <p className="font-mono text-[10px] uppercase text-muted">{p.category}</p>
                </div>
                <span className="ml-3 text-2xl text-black/20">✦</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pt-24">
        <Reveal className="window">
          <div className="grid items-center gap-8 p-8 sm:p-14 md:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="eyebrow">New message</span>
              <h2 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
                Punya ide?<br />Ayo wujudkan.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/profile#contact" className="btn-dark">Contact Me ↗</Link>
              <Link href="/projects" className="btn-light">Lihat Projects</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
