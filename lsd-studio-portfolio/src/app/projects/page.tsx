import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { POPULAR_PROJECTS, PROJECT_CATEGORIES } from "@/data/site";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const tabs = [{ id: "popular", title: "Popular" }, ...PROJECT_CATEGORIES.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <div className="pb-8">
      {/* Header halaman */}
      <section className="container-x pb-10 pt-12 sm:pt-20">
        <Reveal>
          <span className="eyebrow">~/LSD STUDIO/Projects</span>
          <h1 className="mt-4 font-display text-[16vw] font-black uppercase leading-[0.8] tracking-[-0.05em] sm:text-[10vw]">Projects</h1>
          <p className="mt-6 max-w-xl text-muted">
            Kumpulan karya terpilih: ilustrasi, logofolio, desain grafis, social media handling, dan branding.
          </p>
        </Reveal>
      </section>

      {/* Navigasi kategori (sticky, gaya tab Finder) */}
      <div className="sticky top-16 z-30 border-y border-black/5 bg-paper/80 backdrop-blur-xl sm:top-20">
        <div className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase transition-colors hover:bg-ink hover:text-white"
            >
              {t.title}
            </a>
          ))}
        </div>
      </div>

      {/* 1. Most Popular */}
      <section id="popular" className="container-x scroll-mt-40 pt-20">
        <SectionHeading
          eyebrow="The Most Popular Projects"
          number="01"
          title="Most Popular"
          description="Proyek dengan views dan apresiasi terbanyak."
        />
        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {POPULAR_PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} size="lg" />
          ))}
        </Reveal>
      </section>

      {/* 2–6. Kategori */}
      {PROJECT_CATEGORIES.map((cat, i) => (
        <section key={cat.id} id={cat.id} className="container-x scroll-mt-40 pt-24">
          <SectionHeading eyebrow={`Project ${cat.title}`} number={String(i + 2).padStart(2, "0")} title={cat.title} description={cat.description} />
          <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cat.projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </Reveal>
        </section>
      ))}
    </div>
  );
}
