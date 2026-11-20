import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="relative z-50 h-9 w-full overflow-hidden bg-ink text-white">
      {/* Running line */}
      <div className="absolute inset-y-0 left-0 flex w-[200%] animate-marquee items-center whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="flex w-1/2 justify-around">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>● Illustration ● Logofolio ● Branding ● Game Q1 2027</span>
            ))}
          </span>
        ))}
      </div>

      {/* Push button */}
      <div className="relative flex h-full items-center justify-center">
        <Link
          href="/profile"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink shadow-[0_0_0_4px_rgba(0,0,0,1)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
          </span>
          LSD STUDIO
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
    </div>
  );
}
