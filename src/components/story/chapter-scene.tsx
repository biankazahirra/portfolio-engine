import type { JSX } from "react";
import type { SceneKind } from "@/types/chapter";

interface ChapterSceneProps {
  kind: SceneKind;
}

function Sprout() {
  return (
    <>
      <line className="scene-line" x1="30" y1="210" x2="330" y2="210" data-part="soil" />
      <g data-part="seed">
        <ellipse className="scene-gold" cx="180" cy="204" rx="15" ry="9" />
      </g>
      <g data-part="stem">
        <path className="scene-accent-stroke" d="M180 198 C172 165, 190 140, 180 106" fill="none" />
        <ellipse className="scene-accent-fill" cx="158" cy="156" rx="20" ry="9" transform="rotate(-28 158 156)" />
        <ellipse className="scene-accent-fill" cx="202" cy="136" rx="20" ry="9" transform="rotate(28 202 136)" />
      </g>
      <g data-part="numbers">
        <circle className="scene-bloom-fill" cx="86" cy="96" r="20" />
        <text className="scene-text" x="86" y="100" textAnchor="middle">3.80</text>
        <circle className="scene-bloom-fill" cx="272" cy="88" r="20" />
        <text className="scene-text" x="272" y="92" textAnchor="middle">AB</text>
      </g>
    </>
  );
}

function Journal() {
  return (
    <>
      <g data-part="rules">
        {[70, 108, 146, 184, 222].map((y) => (
          <line key={y} className="scene-line" x1="40" y1={y} x2="320" y2={y} />
        ))}
      </g>
      <g data-part="rows">
        <rect className="scene-muted-fill" x="52" y="78" width="96" height="8" rx="4" />
        <rect className="scene-muted-fill" x="52" y="116" width="132" height="8" rx="4" />
        <rect className="scene-muted-fill" x="52" y="154" width="84" height="8" rx="4" />
        <rect className="scene-muted-fill" x="52" y="192" width="116" height="8" rx="4" />
      </g>
      <g data-part="figures">
        <text className="scene-text" x="300" y="88" textAnchor="end">SPT</text>
        <text className="scene-text" x="300" y="126" textAnchor="end">2023</text>
        <text className="scene-text" x="300" y="164" textAnchor="end">2024</text>
      </g>
    </>
  );
}

function Audit() {
  return (
    <>
      <g data-part="docs">
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(44 ${62 + row * 44})`}>
            <rect className="scene-card" x="0" y="0" width="216" height="28" rx="3" />
            <line className="scene-line" x1="14" y1="10" x2={120 + (row % 2) * 40} y2="10" />
            <line className="scene-line" x1="14" y1="20" x2={88 + (row % 2) * 28} y2="20" />
          </g>
        ))}
      </g>
      <g data-part="checks">
        {[0, 1, 2, 3].map((row) => (
          <path
            key={row}
            className="scene-accent-stroke"
            d={`M282 ${76 + row * 44} l8 8 l16 -18`}
            fill="none"
          />
        ))}
      </g>
    </>
  );
}

function Ledger() {
  return (
    <>
      <g data-part="columns">
        <rect className="scene-card" x="40" y="56" width="130" height="170" rx="4" />
        <rect className="scene-card" x="190" y="56" width="130" height="170" rx="4" />
        <text className="scene-label" x="105" y="82" textAnchor="middle">AR</text>
        <text className="scene-label" x="255" y="82" textAnchor="middle">AP</text>
      </g>
      <g data-part="entries">
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect className="scene-muted-fill" x="56" y={104 + row * 32} width="98" height="8" rx="4" />
            <rect className="scene-bloom-fill" x="206" y={104 + row * 32} width="98" height="8" rx="4" />
          </g>
        ))}
      </g>
    </>
  );
}

function Oversight() {
  return (
    <>
      <g data-part="reports">
        <rect className="scene-card" x="42" y="62" width="130" height="154" rx="4" />
        <rect className="scene-card" x="188" y="62" width="130" height="154" rx="4" />
        <text className="scene-label" x="107" y="88" textAnchor="middle">2023</text>
        <text className="scene-label" x="253" y="88" textAnchor="middle">2024</text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <line className="scene-line" x1="58" y1={112 + row * 24} x2="156" y2={112 + row * 24} />
            <line className="scene-line" x1="204" y1={112 + row * 24} x2="302" y2={112 + row * 24} />
          </g>
        ))}
      </g>
      <g data-part="irregularity">
        <rect className="scene-highlight" x="202" y="154" width="102" height="16" rx="3" />
      </g>
    </>
  );
}

function Reporting() {
  return (
    <>
      <g data-part="loose">
        {[0, 1, 2, 3, 4].map((row) => (
          <rect
            key={row}
            className="scene-muted-fill"
            x={48 + (row % 3) * 94}
            y={52 + Math.floor(row / 3) * 34}
            width="72"
            height="12"
            rx="3"
          />
        ))}
      </g>
      <g data-part="report">
        <rect className="scene-card" x="88" y="126" width="184" height="106" rx="5" />
        {[0, 1, 2, 3].map((row) => (
          <line key={row} className="scene-line" x1="108" y1={150 + row * 20} x2="252" y2={150 + row * 20} />
        ))}
      </g>
    </>
  );
}

function Closing() {
  return (
    <>
      <g data-part="balance">
        <rect className="scene-card" x="52" y="60" width="118" height="150" rx="4" />
        <rect className="scene-card" x="190" y="60" width="118" height="150" rx="4" />
        <text className="scene-label" x="111" y="88" textAnchor="middle">DEBIT</text>
        <text className="scene-label" x="249" y="88" textAnchor="middle">CREDIT</text>
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect className="scene-muted-fill" x="70" y={110 + row * 28} width="82" height="8" rx="4" />
            <rect className="scene-bloom-fill" x="208" y={110 + row * 28} width="82" height="8" rx="4" />
          </g>
        ))}
      </g>
      <g data-part="bloom">
        <circle className="scene-gold" cx="180" cy="224" r="10" />
        {[0, 1, 2, 3, 4, 5].map((petal) => (
          <ellipse
            key={petal}
            className="scene-bloom-fill"
            cx="180"
            cy="207"
            rx="6"
            ry="11"
            transform={`rotate(${petal * 60} 180 224)`}
          />
        ))}
      </g>
    </>
  );
}

const scenes: Record<SceneKind, () => JSX.Element> = {
  sprout: Sprout,
  journal: Journal,
  audit: Audit,
  ledger: Ledger,
  oversight: Oversight,
  reporting: Reporting,
  closing: Closing,
};

export function ChapterScene({ kind }: ChapterSceneProps) {
  const Scene = scenes[kind];
  return (
    <svg
      className={`scene scene-${kind}`}
      viewBox="0 0 360 260"
      aria-hidden="true"
      focusable="false"
    >
      <Scene />
    </svg>
  );
}
