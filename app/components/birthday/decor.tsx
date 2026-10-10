import { useState, type CSSProperties } from "react";
import { IconHeart } from "@tabler/icons-react";

export function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-100 ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

const POPPER_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2Fa298068d661e43fdb45effc9440c6145%2Fa641b637c5204fb4984eee97df04fc06?format=webp&width=800&height=1200";

const PARTICLE_COLORS = ["#f472b6", "#fde68a", "#ffffff", "#fb7185", "#facc15", "#60a5fa", "#a78bfa"];

const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const angle = ((-72 + ((i * 29) % 56)) * Math.PI) / 180;
  const distance = 140 + ((i * 47) % 150);
  return {
    tx: `${Math.round(Math.cos(angle) * distance)}px`,
    ty: `${Math.round(Math.sin(angle) * distance)}px`,
    rot: `${(i * 113) % 540}deg`,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    delay: `${0.12 + (i % 5) * 0.03}s`,
    size: i % 2 ? 6 : 4,
    round: i % 3 === 0,
  };
});

function Popper({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute bottom-0 w-[24%] max-w-[220px] ${side === "left" ? "left-0" : "right-0 -scale-x-100"}`}
    >
      <img
        src={POPPER_IMAGE}
        alt=""
        className="block w-full origin-bottom-left drop-shadow-xl animate-[bday-popper-burst_0.9s_cubic-bezier(0.2,0.8,0.3,1)_forwards]"
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute left-[38%] top-[69%] ${p.round ? "rounded-full" : "rounded-sm"}`}
          style={
            {
              width: p.size,
              height: p.size,
              background: p.color,
              "--tx": p.tx,
              "--ty": p.ty,
              "--rot": p.rot,
              animation: `bday-particle 1.8s cubic-bezier(0.1, 0.7, 0.3, 1) ${p.delay} forwards`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function PartyPoppers() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <Popper side="left" />
      <Popper side="right" />
    </div>
  );
}

export function BokehOrb() {
  return (
    <div className="relative h-72 w-72 animate-[bday-pulse_4s_ease-in-out_infinite] sm:h-96 sm:w-96">
      <div
        className="absolute inset-0 rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #ffffff 0%, #fff1f7 25%, rgba(251,207,232,0.85) 55%, rgba(244,114,182,0.35) 75%, rgba(255,255,255,0) 80%)",
          boxShadow: "0 0 120px 40px rgba(251, 207, 232, 0.7)",
        }}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fa298068d661e43fdb45effc9440c6145%2F9cbd78e3c4824b7a96570ea8b62d3b29?format=webp&width=800&height=1200"
        alt=""
        className="relative h-full w-full object-contain drop-shadow-xl"
      />
    </div>
  );
}

const TOP_FROSTING =
  "M70 0 H250 V10 Q242 20 234 10 Q226 0 218 10 Q210 22 202 10 Q194 0 186 10 Q178 20 170 10 Q162 0 154 10 Q146 22 138 10 Q130 0 122 10 Q114 20 106 10 Q98 0 90 10 Q82 22 70 10 Z";

const BOTTOM_FROSTING =
  "M30 0 H290 V12 Q280 26 270 12 Q260 0 250 12 Q240 28 230 12 Q220 0 210 12 Q200 26 190 12 Q180 0 170 12 Q160 28 150 12 Q140 0 130 12 Q120 26 110 12 Q100 0 90 12 Q80 28 70 12 Q60 0 50 12 Q40 26 30 12 Z";

const SPRINKLES: [number, number, number, string][] = [
  [96, 170, 20, "#f472b6"],
  [120, 188, -30, "#fde68a"],
  [150, 202, 15, "#ffffff"],
  [180, 176, 60, "#fb7185"],
  [208, 194, -10, "#fde68a"],
  [236, 170, 35, "#c084fc"],
  [60, 196, 70, "#ffffff"],
  [270, 190, -45, "#f472b6"],
  [104, 112, 25, "#fde68a"],
  [132, 102, -20, "#f472b6"],
  [160, 116, 40, "#ffffff"],
  [190, 106, -35, "#fb7185"],
  [218, 118, 10, "#fde68a"],
];

const CANDLE_X = [100, 130, 160, 190, 220];

export function Cake({ lit }: { lit: boolean }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-[300px] drop-shadow-2xl"
      role="img"
      aria-label="Birthday cake with candles"
    >
      <defs>
        <linearGradient id="cakeTop" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f9c2dc" />
          <stop offset="0.5" stopColor="#fde2ee" />
          <stop offset="1" stopColor="#f5a8ca" />
        </linearGradient>
        <linearGradient id="cakeBottom" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ec7fae" />
          <stop offset="0.5" stopColor="#fbbfd9" />
          <stop offset="1" stopColor="#e86aa0" />
        </linearGradient>
        <linearGradient id="cakeCandle" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="0.5" stopColor="#fff7fb" />
          <stop offset="1" stopColor="#fbcfe8" />
        </linearGradient>
        <radialGradient id="cakeFlame" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="0.45" stopColor="#fde047" />
          <stop offset="1" stopColor="#fb923c" />
        </radialGradient>
        <linearGradient id="cakePlate" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fdf2f8" />
          <stop offset="1" stopColor="#f9d0e0" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="226" rx="150" ry="13" fill="#e9a6c0" opacity="0.45" />
      <ellipse cx="160" cy="222" rx="150" ry="13" fill="url(#cakePlate)" />

      <rect x="30" y="140" width="260" height="80" rx="18" fill="url(#cakeBottom)" />
      <rect x="36" y="196" width="248" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
      <g transform="translate(0 140)">
        <path d={BOTTOM_FROSTING} fill="#fff7fb" />
      </g>

      <rect x="70" y="80" width="180" height="62" rx="14" fill="url(#cakeTop)" />
      <rect x="78" y="128" width="164" height="4" rx="2" fill="#ffffff" opacity="0.4" />
      <g transform="translate(0 80)">
        <path d={TOP_FROSTING} fill="#fff7fb" />
      </g>

      {SPRINKLES.map(([x, y, rotation, color], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="7"
          height="2.5"
          rx="1.2"
          fill={color}
          transform={`rotate(${rotation} ${x} ${y})`}
        />
      ))}

      {CANDLE_X.map((x, i) => (
        <g key={x}>
          <line x1={x} y1="34" x2={x} y2="42" stroke="#57534e" strokeWidth="1.5" />
          <rect x={x - 5} y="42" width="10" height="40" rx="2.5" fill={i % 2 ? "url(#cakeCandle)" : "#fde68a"} />
          {lit && (
            <ellipse
              cx={x}
              cy="30"
              rx="5"
              ry="9"
              fill="url(#cakeFlame)"
              style={{
                animation: "bday-flame 0.6s ease-in-out infinite",
                transformOrigin: `${x}px 40px`,
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

export function GiftBox({ opening }: { opening: boolean }) {
  return (
    <svg
      viewBox="0 0 240 200"
      className="w-64 drop-shadow-2xl"
      role="img"
      aria-label="Gift box"
    >
      <defs>
        <linearGradient id="giftBody" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f472b6" />
          <stop offset="0.5" stopColor="#f9a8d4" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="giftLid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="giftRibbon" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#fef9c3" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="190" rx="92" ry="9" fill="#be185d" opacity="0.18" />
      <rect x="30" y="84" width="180" height="108" rx="10" fill="url(#giftBody)" />
      <rect x="112" y="84" width="16" height="108" fill="url(#giftRibbon)" />

      <g
        style={{
          transform: opening ? "translate(-14px, -90px) rotate(-22deg)" : "none",
          transformOrigin: "120px 70px",
          transition: "transform 0.8s cubic-bezier(0.3, 1.3, 0.5, 1)",
        }}
      >
        <rect x="20" y="54" width="200" height="34" rx="8" fill="url(#giftLid)" />
        <rect x="112" y="54" width="16" height="34" fill="url(#giftRibbon)" />
        <path
          d="M120 56 C96 18 62 26 74 50 C82 66 110 60 120 56Z"
          fill="url(#giftRibbon)"
          stroke="#eab308"
          strokeWidth="1"
        />
        <path
          d="M120 56 C144 18 178 26 166 50 C158 66 130 60 120 56Z"
          fill="url(#giftRibbon)"
          stroke="#eab308"
          strokeWidth="1"
        />
        <circle cx="120" cy="54" r="9" fill="#facc15" stroke="#eab308" strokeWidth="1" />
      </g>
    </svg>
  );
}

const FLOATING_HEARTS = [
  { left: "5%", top: "8%", size: 30, delay: "0s" },
  { left: "14%", top: "62%", size: 18, delay: "1.2s" },
  { left: "24%", top: "24%", size: 14, delay: "2.1s" },
  { left: "36%", top: "84%", size: 22, delay: "0.6s" },
  { left: "48%", top: "10%", size: 16, delay: "1.8s" },
  { left: "62%", top: "78%", size: 26, delay: "2.6s" },
  { left: "76%", top: "16%", size: 20, delay: "0.9s" },
  { left: "88%", top: "58%", size: 30, delay: "1.5s" },
  { left: "93%", top: "86%", size: 16, delay: "2.3s" },
  { left: "8%", top: "40%", size: 12, delay: "3s" },
  { left: "70%", top: "42%", size: 14, delay: "0.4s" },
  { left: "42%", top: "50%", size: 10, delay: "1.9s" },
];

export function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {FLOATING_HEARTS.map((h, i) => (
        <IconHeart
          key={i}
          className="absolute fill-pink-300 text-pink-300 opacity-60 animate-[bday-float_4s_ease-in-out_infinite]"
          style={{
            left: h.left,
            top: h.top,
            width: h.size,
            height: h.size,
            animationDelay: h.delay,
          }}
        />
      ))}
    </div>
  );
}
