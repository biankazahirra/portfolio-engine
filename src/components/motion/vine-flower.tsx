const petals = [0, 1, 2, 3, 4, 5];

export function VineFlower() {
  return (
    <svg
      className="vine-flower"
      data-vine-flower=""
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      {petals.map((petal) => (
        <ellipse
          key={petal}
          cx="20"
          cy="12.5"
          rx="4.6"
          ry="8"
          fill={petal % 2 === 0 ? "#E98FA6" : "#F3B7C6"}
          transform={`rotate(${petal * 60} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#F2C14E" />
    </svg>
  );
}
