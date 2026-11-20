import Image from "next/image";

/**
 * Menampilkan gambar karya. Jika `image` kosong, tampil thumbnail
 * generatif warna-warni (seperti cover album/poster di referensi).
 */
type Props = {
  image?: string;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showTitle?: boolean;
};

const PALETTES = [
  ["#E8402C", "#111111", "#F5E6D3"],
  ["#2F6BFF", "#0A0A23", "#E9F0FF"],
  ["#FF5FA2", "#1A1A1A", "#FFE3EF"],
  ["#F2C230", "#121212", "#FFF7DA"],
  ["#1FA67A", "#0E1F18", "#E2F6EE"],
  ["#7A4CFF", "#140C2E", "#EFE9FF"],
  ["#111111", "#E8402C", "#EDEDED"],
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function Artwork({ image, title, className = "", sizes = "(max-width:768px) 100vw, 33vw", priority, showTitle = true }: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={title} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const h = hash(title);
  const [a, b, c] = PALETTES[h % PALETTES.length];
  const variant = h % 5;

  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={title} style={{ background: c }}>
      {variant === 0 && (
        <>
          <div className="absolute inset-0" style={{ background: `repeating-radial-gradient(circle at 50% 50%, ${b} 0 6%, ${c} 6% 12%)` }} />
        </>
      )}
      {variant === 1 && (
        <>
          <div className="absolute inset-0" style={{ background: b }} />
          <div className="absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: a }} />
        </>
      )}
      {variant === 2 && (
        <>
          <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: a }} />
          <div className="absolute bottom-[15%] left-[10%] font-display text-[3rem] font-black leading-none" style={{ color: b }}>
            {title.slice(0, 2).toUpperCase()}
          </div>
        </>
      )}
      {variant === 3 && (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${a} 0 33%, ${b} 33% 66%, ${c} 66%)` }} />
      )}
      {variant === 4 && (
        <>
          <div className="absolute inset-0" style={{ background: a }} />
          <div className="absolute inset-[18%] rotate-12 border-[6px]" style={{ borderColor: b }} />
        </>
      )}
      {showTitle && (
        <span className="absolute bottom-2 left-3 rounded bg-white/85 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink">
          {title}
        </span>
      )}
    </div>
  );
}
