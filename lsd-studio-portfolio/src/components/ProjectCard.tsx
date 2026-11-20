import type { Project } from "@/data/site";
import Artwork from "./Artwork";
import { ArrowIcon } from "./Icons";

/** Kartu proyek berbentuk jendela mini macOS. */
export default function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const Wrapper = project.link ? "a" : "div";
  return (
    <Wrapper
      {...(project.link ? { href: project.link, target: "_blank", rel: "noreferrer" } : {})}
      className="window group block transition-all duration-500 hover:-translate-y-2 hover:rotate-[-0.5deg]"
    >
      <div className="window-bar !py-2.5">
        <span className="traffic"><span /><span /><span /></span>
        <span className="flex-1 truncate text-center font-mono text-[10px] text-muted">
          {project.slug}.{project.category.toLowerCase().includes("social") ? "mp4" : "png"}
        </span>
      </div>
      <div className="relative overflow-hidden">
        <Artwork
          image={project.image}
          title={project.title}
          showTitle={false}
          className={`w-full transition-transform duration-700 group-hover:scale-105 ${size === "lg" ? "aspect-[4/5]" : "aspect-[4/3]"}`}
        />
        <span className="absolute right-3 top-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 shadow-icon transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowIcon className="h-5 w-5" />
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-bold">{project.title}</h3>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tags?.map((t) => (
            <span key={t} className="rounded-md bg-paper px-2 py-0.5 font-mono text-[10px] text-ink/70">
              {t}
            </span>
          ))}
          {(project.views || project.likes) && (
            <span className="ml-auto flex gap-3 font-mono text-xs text-muted">
              {project.views && <span>👁 {project.views}</span>}
              {project.likes && <span className="text-[#E8402C]">♥ {project.likes}</span>}
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
