import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  number?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">
          {number && <span className="rounded bg-ink px-1.5 py-0.5 text-white">{number}</span>}
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h2>
      {description && <p className="max-w-2xl text-muted">{description}</p>}
    </Reveal>
  );
}
