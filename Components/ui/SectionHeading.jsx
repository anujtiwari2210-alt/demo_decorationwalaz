import Reveal from "./Reveal";

/** Eyebrow + title + gold diamond divider + subtitle (centered ya left) */
export default function SectionHeading({ eyebrow, title, text, center = true }) {
  return (
    <Reveal className={`mb-12 flex flex-col gap-3 ${center ? "mx-auto max-w-2xl items-center text-center" : ""}`}>
      <span className={center ? "label-sm text-gold-deep" : "eyebrow"}>{eyebrow}</span>
      <h2 className="font-display text-display-md-m md:text-display-md">{title}</h2>
      {center && (
        <div className="my-1 flex items-center gap-2">
          <span className="h-px w-10 bg-gold/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-10 bg-gold/70" />
        </div>
      )}
      {text && <p className="text-ink/80">{text}</p>}
    </Reveal>
  );
}
