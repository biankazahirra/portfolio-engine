interface AnimatedTitleProps {
  text: string;
  as?: "h1" | "h2";
  className?: string;
}

export function AnimatedTitle({ text, as: Tag = "h2", className }: AnimatedTitleProps) {
  return (
    <Tag className={className} aria-label={text} data-animated-title="">
      {text
        .split(/\s+/)
        .filter(Boolean)
        .map((word, index) => (
          <span
            key={`${word}-${index}`}
            data-word=""
            aria-hidden="true"
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </span>
        ))}
    </Tag>
  );
}
