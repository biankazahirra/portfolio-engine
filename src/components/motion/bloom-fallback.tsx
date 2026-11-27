interface BloomFallbackProps {
  className?: string;
}

export function BloomFallback({ className }: BloomFallbackProps) {
  return (
    <svg
      className={className ? `bloom-fallback ${className}` : "bloom-fallback"}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(100 104)">
        <ellipse cx="0" cy="-52" rx="20" ry="38" fill="#4F7A5A" opacity="0.85" transform="rotate(0)" />
        <ellipse cx="0" cy="-52" rx="20" ry="38" fill="#4F7A5A" opacity="0.85" transform="rotate(120)" />
        <ellipse cx="0" cy="-52" rx="20" ry="38" fill="#4F7A5A" opacity="0.85" transform="rotate(240)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#E98FA6" transform="rotate(30)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#E98FA6" transform="rotate(90)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#E98FA6" transform="rotate(150)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#F3B7C6" transform="rotate(210)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#F3B7C6" transform="rotate(270)" />
        <ellipse cx="0" cy="-40" rx="26" ry="46" fill="#F3B7C6" transform="rotate(330)" />
        <circle r="20" fill="#F2C14E" />
      </g>
    </svg>
  );
}
