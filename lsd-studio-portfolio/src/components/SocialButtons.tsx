import { SOCIALS } from "@/data/site";
import { BehanceIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "./Icons";

const ITEMS = [
  { key: "behance", label: "Behance", Icon: BehanceIcon, bg: "#1769FF" },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon, bg: "#000000" },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, bg: "linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)" },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon, bg: "#25D366" },
] as const;

/** Tombol kontak berbentuk ikon aplikasi (app icon) ala dock macOS. */
export default function SocialButtons({ size = "md", withLabel = false }: { size?: "sm" | "md"; withLabel?: boolean }) {
  const box = size === "sm" ? "h-11 w-11 rounded-xl" : "h-16 w-16 rounded-[18px]";
  const icon = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  return (
    <div className="flex flex-wrap gap-3">
      {ITEMS.map(({ key, label, Icon, bg }) => (
        <a
          key={key}
          href={SOCIALS[key]}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="group flex flex-col items-center gap-2"
        >
          <span
            className={`grid ${box} place-items-center text-white shadow-icon transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-active:scale-95`}
            style={{ background: bg }}
          >
            <Icon className={icon} />
          </span>
          {withLabel && <span className="icon-label">{label}</span>}
        </a>
      ))}
    </div>
  );
}
