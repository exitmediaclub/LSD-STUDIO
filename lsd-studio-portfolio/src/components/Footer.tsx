"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();
  // Halaman About menampilkan teks hak cipta sendiri di akhir konten.
  const showCopyright = pathname !== "/about";

  return (
    <footer className="mt-24 border-t border-black/10">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-black">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-[10px] text-white">LSD</span>
          STUDIO
        </Link>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        {showCopyright && <p className="font-mono text-xs text-muted">© 2026 LSD STUDIO. Semua hak dilindungi.</p>}
      </div>
    </footer>
  );
}
