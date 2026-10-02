import type { CSSProperties, ReactNode } from "react";

export const INK = "#4B3430";
export const L = {
  fill: "none",
  stroke: INK,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type P = { className?: string; style?: CSSProperties };

/** Shared SVG filters: wobbly ink lines + watercolour bleed. Rendered once in <App/>. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" />
        </filter>
        <filter id="wash" x="-6%" y="-6%" width="112%" height="112%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>
    </svg>
  );
}

/* helpers */
function petalRing(n: number, cx: number, cy: number, dist: number, rx: number, ry: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i * 360) / n;
    return <ellipse key={i} cx={cx} cy={cy - dist} rx={rx} ry={ry} transform={`rotate(${a} ${cx} ${cy})`} />;
  });
}
function starPath(cx: number, cy: number, R: number, r: number) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    d += `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `;
  }
  return d + "Z";
}

/* ───────── flowers ───────── */
export function TinyFlower({ className, style }: P) {
  return (
    <svg viewBox="0 0 80 112" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".8">
        <g fill="#D8A7A0">{petalRing(5, 40, 34, 13, 9.5, 13.5)}</g>
        <path d="M39 84 C28 78 22 80 17 70 C28 69 35 74 39 84Z" fill="#8C927F" />
        <path d="M40 94 C50 88 58 90 64 80 C52 79 44 84 40 94Z" fill="#8C927F" />
      </g>
      <g filter="url(#rough)" {...L}>
        {petalRing(5, 40, 34, 13, 9.5, 13.5)}
        <circle cx="40" cy="34" r="5" fill="#C8A66A" fillOpacity=".8" />
        <path className="draw" pathLength={1} d="M40 50 C38 70 43 92 38 110" />
        <path d="M39 84 C28 78 22 80 17 70 C28 69 35 74 39 84Z" />
        <path d="M40 94 C50 88 58 90 64 80 C52 79 44 84 40 94Z" />
      </g>
    </svg>
  );
}

export function Daisy({ className, style }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".9" fill="#F4EBD9">
        {petalRing(12, 50, 50, 24, 6, 17)}
      </g>
      <g filter="url(#rough)" {...L} strokeWidth={1.3}>
        {petalRing(12, 50, 50, 24, 6, 17)}
        <circle cx="50" cy="50" r="9" fill="#C8A66A" fillOpacity=".85" />
        <path d="M46 48 q4 -3 8 0 M46 53 q4 3 8 0" strokeWidth={1} />
      </g>
    </svg>
  );
}

export function Blossom({ className, style, tone = "#D8A7A0" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".9" fill={tone}>
        {petalRing(5, 50, 50, 20, 15, 18)}
      </g>
      <g filter="url(#rough)" {...L} strokeWidth={1.4}>
        {petalRing(5, 50, 50, 20, 15, 18)}
        <circle cx="50" cy="50" r="6" fill="#C8A66A" fillOpacity=".8" />
        <path d="M50 44 v-8 M44 48 l-7 -4 M56 48 l7 -4" strokeWidth={1} />
      </g>
    </svg>
  );
}

export function Rose({ className, style, tone = "#D8A7A0" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".92">
        <path d="M16 46 C14 22 40 12 58 16 C82 20 90 44 82 64 C72 86 44 92 26 78 C18 70 16 58 16 46Z" fill={tone} />
        <circle cx="50" cy="52" r="22" fill="#B97878" opacity=".35" />
      </g>
      <g filter="url(#rough)" {...L}>
        <path d="M16 46 C14 22 40 12 58 16 C82 20 90 44 82 64 C72 86 44 92 26 78 C18 70 16 58 16 46Z" />
        <path d="M30 50 C32 34 52 28 63 38 C74 49 66 68 50 70 C36 72 26 62 30 50Z" />
        <path d="M41 50 C43 41 57 41 59 50 C61 59 48 63 44 57" />
        <path d="M49 49 c3 -2 6 1 4 4" />
        <path d="M22 70 C30 80 44 84 56 80 M70 24 C78 30 82 38 80 46" strokeWidth={1.1} />
      </g>
    </svg>
  );
}

export function Sprig({ className, style, leaf = "#8C927F", n = 5 }: P & { leaf?: string; n?: number }) {
  const ys = Array.from({ length: n }, (_, i) => 88 - i * (70 / n));
  const leaves = (fill?: string) =>
    ys.map((y, i) => (
      <g key={i}>
        <path d={`M49 ${y} C37 ${y - 3} 28 ${y - 12} 24 ${y - 17} C37 ${y - 19} 46 ${y - 11} 49 ${y}Z`} fill={fill} />
        <path d={`M51 ${y - 6} C63 ${y - 9} 72 ${y - 18} 76 ${y - 23} C63 ${y - 25} 54 ${y - 17} 51 ${y - 6}Z`} fill={fill} />
      </g>
    ));
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".85">
        {leaves(leaf)}
      </g>
      <g filter="url(#rough)" {...L} strokeWidth={1.3}>
        <path d="M50 99 C48 70 54 40 50 6" />
        {leaves()}
      </g>
    </svg>
  );
}

export function BabyBreath({ className, style }: P) {
  const dots: [number, number][] = [[22, 18], [38, 10], [58, 14], [76, 24], [30, 34], [50, 28], [68, 40], [16, 48], [42, 46], [60, 58], [28, 62], [76, 60]];
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#rough)" {...L} strokeWidth={1}>
        <path d="M50 98 C50 80 48 66 42 46 M48 74 C56 66 62 62 60 58 M46 60 C36 56 30 56 28 62 M44 50 C34 42 28 30 22 18 M42 46 C40 30 40 20 38 10 M52 40 C54 28 56 20 58 14 M54 44 C66 38 72 30 76 24" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.2} fill="#F6F0E7" />
        ))}
      </g>
    </svg>
  );
}

/* ───────── small romantic objects ───────── */
export function Heart({ className, style, fill = "#D8A7A0" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".9">
        <path d="M50 86 C14 60 10 36 27 25 C40 17 48 27 50 34 C52 27 60 17 73 25 C90 36 86 60 50 86Z" fill={fill} />
      </g>
      <g filter="url(#rough)" {...L}>
        <path className="draw" pathLength={1} d="M50 86 C14 60 10 36 27 25 C40 17 48 27 50 34 C52 27 60 17 73 25 C90 36 86 60 50 86Z" />
      </g>
    </svg>
  );
}

export function StarShape({ className, style, fill = "#E5CF9A" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)" opacity=".9">
        <path d={starPath(50, 52, 38, 16)} fill={fill} />
      </g>
      <g filter="url(#rough)" {...L}>
        <path d={starPath(50, 52, 38, 16)} />
      </g>
    </svg>
  );
}

export function WaxSeal({ className, style }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)">
        <path
          d="M50 5 C66 3 70 14 82 18 C96 24 92 38 94 50 C96 64 90 72 82 82 C70 94 62 90 50 95 C36 98 30 90 20 82 C8 72 8 62 6 50 C4 36 12 26 20 18 C32 8 38 8 50 5Z"
          fill="#7B3F46"
        />
        <path d="M24 30 C34 14 56 10 70 16" stroke="#B97878" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".55" />
      </g>
      <g filter="url(#rough)" fill="none" stroke="#F6F0E7" strokeOpacity=".5" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="50" cy="50" r="29" />
        <path d="M50 70 C28 54 26 40 36 34 C43 30 48 35 50 40 C52 35 57 30 64 34 C74 40 72 54 50 70Z" strokeOpacity=".75" fill="#F6F0E7" fillOpacity=".12" />
      </g>
    </svg>
  );
}

export function Envelope({ open, children }: { open: boolean; children?: ReactNode }) {
  return (
    <div className={`env ${open ? "is-open" : ""}`}>
      <svg className="env-back" viewBox="0 0 220 150" aria-hidden="true">
        <g filter="url(#wash)">
          <rect x="3" y="3" width="214" height="144" fill="#CDB99D" />
        </g>
        <g filter="url(#rough)" {...L}>
          <rect x="3" y="3" width="214" height="144" />
        </g>
      </svg>
      <div className="env-letter">{children}</div>
      <svg className="env-front" viewBox="0 0 220 150" aria-hidden="true">
        <g filter="url(#wash)">
          <path d="M3 147 V3 L110 84 L217 3 V147Z" fill="#E9DCC8" />
        </g>
        <g filter="url(#rough)" {...L}>
          <path d="M3 147 V3 L110 84 L217 3 V147Z" />
          <path d="M3 147 L92 76 M217 147 L128 76" strokeWidth={1.1} />
        </g>
      </svg>
      <div className="env-flap">
        <svg className="outer" viewBox="0 0 220 150" aria-hidden="true">
          <g filter="url(#wash)">
            <path d="M3 3 H217 L110 96Z" fill="#EFE4D6" />
          </g>
          <g filter="url(#rough)" {...L}>
            <path d="M3 3 H217 L110 96Z" />
          </g>
        </svg>
        <svg className="inner" viewBox="0 0 220 150" aria-hidden="true">
          <g filter="url(#wash)">
            <path d="M3 3 H217 L110 96Z" fill="#C9B494" />
          </g>
          <g filter="url(#rough)" {...L}>
            <path d="M3 3 H217 L110 96Z" />
          </g>
        </svg>
      </div>
      <WaxSeal className="env-seal" />
    </div>
  );
}

/* ───────── paper edges & ornaments ───────── */
function mkTorn(seed: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  let d = "M0 30 ";
  let line = "";
  for (let x = 0; x <= 100; x += 1.6) {
    const y = 8 + rnd() * 9 + Math.sin(x / 9) * 2;
    d += `L${x.toFixed(1)} ${y.toFixed(1)} `;
    line += `${x === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return { fill: d + "L100 30Z", line };
}
const TORN = [mkTorn(7), mkTorn(21), mkTorn(55), mkTorn(91)];

/** A hand-torn paper edge that hangs over the bottom of the previous scene. */
export function Torn({ color, v = 0 }: { color: string; v?: number }) {
  const t = TORN[v % TORN.length];
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: "calc(100% - 1px)", width: "100%", height: 26, zIndex: 4, pointerEvents: "none" }}
    >
      <path d={t.fill} fill={color} />
      <path d={t.line} fill="none" stroke="rgba(75,52,48,.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Squiggle({ className, style, color = "#B97878" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} style={style} aria-hidden="true">
      <path className="draw" pathLength={1} d="M2 8 C30 2 60 11 100 5 S170 9 198 3" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Divider({ className, color = INK }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 16" className={className} aria-hidden="true" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round">
      <path d="M0 8 H80 M120 8 H200" />
      <path d="M100 2 L106 8 L100 14 L94 8Z" fill={color} fillOpacity=".25" />
      <path d="M86 8 c-4 -7 -11 -2 -6 2 M114 8 c4 -7 11 -2 6 2" />
    </svg>
  );
}

export function Corner({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".75">
      <path d="M3 61 V16 C3 8 8 3 16 3 H61" />
      <path d="M11 53 V22 C11 16 16 11 22 11 H53" strokeOpacity=".6" />
      <path d="M20 20 c6 -2 10 2 8 8 c-6 2 -10 -2 -8 -8Z" fill="#B97878" fillOpacity=".35" />
      <path d="M32 20 q8 -3 14 0 M20 32 q-3 8 0 14" strokeOpacity=".6" />
    </svg>
  );
}

export function Petal({ fill = "#D8A7A0", className }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 20 36" className={className} aria-hidden="true">
      <path d="M10 1 C23 9 22 26 10 35 C-2 26 -3 9 10 1Z" fill={fill} fillOpacity=".85" stroke={INK} strokeWidth=".8" strokeLinejoin="round" />
      <path d="M10 6 V28" stroke={INK} strokeWidth=".5" strokeOpacity=".5" fill="none" />
    </svg>
  );
}

export function Washblob({ className, style, color = "#D8A7A0", d }: P & { color?: string; d?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <g filter="url(#wash)">
        <path
          d={d ?? "M40 70 C30 30 80 8 120 22 C170 38 190 80 170 125 C150 170 90 190 50 160 C20 138 46 100 40 70Z"}
          fill={color}
        />
      </g>
    </svg>
  );
}
