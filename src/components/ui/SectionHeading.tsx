type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  accent: string;
  className?: string;
};

export function SectionHeading({ index, label, title, accent, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="mono mb-4 text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">
        {index} — {label}
      </div>
      <h2 className="max-w-4xl text-balance text-[clamp(2.4rem,5vw,5.5rem)] font-black tracking-[-0.045em] leading-none">
        {title} <span className="serif-italic">{accent}</span>
      </h2>
    </div>
  );
}