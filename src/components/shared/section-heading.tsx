import { AnimatedTitle } from "./animated-title";

interface SectionHeadingProps {
  index: number;
  label: string;
  title: string;
}

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <header className="section-header">
      <hr className="gold-rule" />
      <p className="eyebrow">
        {String(index).padStart(2, "0")} / {label}
      </p>
      <AnimatedTitle text={title} className="section-title" />
    </header>
  );
}
