import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Torn } from "./Art";

const clampCss = (start: number, speed = 6) => `clamp(0, calc((var(--p) - ${start}) * ${speed}), 1)`;
const fade = (start: number, speed = 6): CSSProperties => ({ opacity: clampCss(start, speed) as unknown as number });

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const R = rng(11);
const STARS = Array.from({ length: 64 }, () => ({
  x: -80 + R() * 1160,
  y: -120 + R() * 450,
  r: 0.8 + R() * 1.8,
  at: 0.24 + R() * 0.32,
  d: R() * 4,
  big: R() > 0.86,
}));
const BLOOMS: [number, number, string, number, number][] = [
  [372, 590, "#D8A7A0", 1, 0.42],
  [410, 566, "#F4EBD9", 0.9, 0.45],
  [440, 596, "#B97878", 1.1, 0.5],
  [470, 560, "#F4EBD9", 0.8, 0.47],
  [548, 566, "#D8A7A0", 1, 0.44],
  [575, 598, "#F4EBD9", 1.1, 0.52],
  [602, 566, "#B97878", 0.9, 0.48],
  [628, 592, "#D8A7A0", 1, 0.55],
  [392, 540, "#D8A7A0", 0.7, 0.5],
  [610, 538, "#F4EBD9", 0.7, 0.53],
  [330, 596, "#F4EBD9", 1, 0.56],
  [670, 600, "#D8A7A0", 1, 0.58],
  [250, 580, "#B97878", 1.1, 0.6],
  [740, 584, "#D8A7A0", 1, 0.62],
  [150, 566, "#F4EBD9", 1, 0.64],
  [860, 570, "#D8A7A0", 1, 0.66],
];

type Line = { t: ReactNode; from: number; to: number; cls: string };
const BIG = "serif italic font-light text-[2.7rem] md:text-[5rem] leading-[1.04]";
const MID = "serif italic font-light text-[2.15rem] md:text-[3.6rem] leading-[1.1]";
const SMALL = "serif text-[1.35rem] md:text-[2rem] leading-snug mt-4";
const GROUPS: Line[][] = [
  [{ t: "Before you...", from: 0, to: 0.11, cls: BIG }],
  [{ t: "Life was still life.", from: 0.11, to: 0.22, cls: BIG }],
  [
    { t: "But after you...", from: 0.28, to: 0.4, cls: BIG },
    { t: "The days started carrying little pieces of you.", from: 0.315, to: 0.4, cls: SMALL },
  ],
  [{ t: "I smile at messages differently.", from: 0.4, to: 0.47, cls: MID }],
  [{ t: "I have someone I want to tell things to.", from: 0.47, to: 0.54, cls: MID }],
  [{ t: "I have someone I miss.", from: 0.54, to: 0.61, cls: MID }],
  [{ t: "I have someone I care about.", from: 0.61, to: 0.68, cls: MID }],
  [{ t: "I have someone I look forward to.", from: 0.68, to: 0.75, cls: MID }],
  [
    { t: <span className="hand not-italic">And suddenly...</span>, from: 0.8, to: 1.1, cls: "text-[2.4rem] md:text-5xl" },
    { t: "my ordinary days don't feel quite so ordinary anymore.", from: 0.88, to: 1.1, cls: "serif italic font-light text-[2.1rem] md:text-[3.6rem] leading-[1.1] mt-3" },
  ],
];

function Layer({ children, z, style }: { children: ReactNode; z: number; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: z, ...style }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Tree({ x, y, s = 1, c = "#6B7560" }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#4B3430" strokeWidth="1.2" strokeLinejoin="round">
      <rect x="-3" y="-28" width="6" height="28" fill="#5A4038" />
      <circle cx="0" cy="-48" r="20" fill={c} />
      <circle cx="-14" cy="-34" r="14" fill={c} />
      <circle cx="14" cy="-34" r="14" fill={c} />
    </g>
  );
}

function Scenery() {
  return (
    <Layer z={4}>
      <g filter="url(#rough)" stroke="#4B3430" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M-400 430 C-200 380 0 400 160 392 C300 384 420 420 560 410 C700 400 800 360 960 384 C1100 405 1250 380 1400 420 V620 H-400Z" fill="#B9BCA6" />
        {/* distant village */}
        <g strokeWidth="1">
          <rect x="146" y="380" width="22" height="14" fill="#E8DCC8" />
          <path d="M143 381 L157 369 L171 381Z" fill="#B97878" />
          <rect x="182" y="384" width="16" height="11" fill="#E8DCC8" />
          <path d="M180 385 L190 376 L200 385Z" fill="#8C927F" />
          <rect x="790" y="364" width="24" height="15" fill="#E8DCC8" />
          <path d="M787 365 L802 352 L817 365Z" fill="#B97878" />
          <rect x="826" y="368" width="16" height="11" fill="#E8DCC8" />
          <path d="M824 369 L834 360 L844 369Z" fill="#8C927F" />
        </g>
        <path d="M-400 480 C-200 430 60 450 220 450 C400 450 460 478 600 470 C760 460 860 430 1040 446 C1200 460 1300 450 1400 470 V620 H-400Z" fill="#9AA088" />
        <Tree x={90} y={470} s={1.2} c="#707A63" />
        <Tree x={190} y={462} s={0.9} c="#7B8570" />
        <Tree x={812} y={462} s={1} c="#707A63" />
        <Tree x={920} y={468} s={1.3} c="#7B8570" />
        <Tree x={378} y={476} s={0.85} c="#6B7560" />
        <Tree x={626} y={478} s={0.95} c="#6B7560" />
        {/* the little house */}
        <g>
          <rect x="470" y="438" width="60" height="42" fill="#F0E5D2" />
          <path d="M461 441 L500 405 L539 441Z" fill="#B97878" />
          <rect x="516" y="410" width="9" height="20" fill="#8A5A52" />
          <rect x="493" y="456" width="14" height="24" fill="#7B3F46" />
          <rect x="476" y="448" width="12" height="12" fill="#D9CDB6" />
          <rect x="512" y="448" width="12" height="12" fill="#D9CDB6" />
          <path d="M482 448 v12 M476 454 h12 M518 448 v12 M512 454 h12" strokeWidth=".8" />
        </g>
        <path d="M-400 540 C-100 500 150 520 330 520 C450 520 520 540 640 528 C780 514 900 500 1100 522 C1250 536 1320 520 1400 530 V620 H-400Z" fill="#7C8469" />
        <path d="M440 620 C470 590 400 565 470 540 C505 525 478 500 496 480 L506 480 C524 500 506 524 540 540 C608 566 540 592 570 620Z" fill="#E3D3B5" strokeWidth="1" />
      </g>
    </Layer>
  );
}

/** Scene 5 — scroll slowly. The same landscape, before and after. */
export default function AfterYou() {
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = secRef.current;
      const st = stageRef.current;
      if (!el || !st) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const v = Math.min(1, Math.max(0, -rect.top / total));
      st.style.setProperty("--p", v.toFixed(4));
      setP((old) => (Math.abs(old - v) > 0.004 ? v : old));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={secRef} id="after-you" className="relative h-[240svh]" aria-label="My life after you">
      <Torn color="#E9DDC9" v={3} />
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ ["--p" as string]: 0, ["--n" as string]: "clamp(0, calc((var(--p) - .2) * 2.6), 1)", background: "#E9DDC9" } as CSSProperties}
      >
        {/* night sky fades over day paper */}
        <div className="absolute inset-0" style={{ background: "#262A3A", opacity: "var(--n)" as unknown as number, zIndex: 1 }} />

        {/* a pale sun that sinks as the first lines pass */}
        <Layer z={2}>
          <g style={{ transform: "translateY(calc(var(--p) * 380px))", opacity: `calc(1 - ${clampCss(0.06, 4)})` as unknown as number }}>
            <circle cx="410" cy="190" r="46" fill="#F3E4C0" />
            <circle cx="410" cy="190" r="46" fill="none" stroke="#C8A66A" strokeOpacity=".4" strokeWidth="1.2" strokeDasharray="3 5" />
          </g>
        </Layer>

        {/* stars arriving one at a time */}
        <Layer z={2}>
          {STARS.map((s, i) => (
            <g key={i} style={fade(s.at, 9)}>
              <circle
                className="twinkle"
                style={{ animationDelay: `${s.d}s` }}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill={s.big ? "#EBD9A8" : "#F6F0E7"}
              />
              {s.big && <path d={`M${s.x - 7} ${s.y} H${s.x + 7} M${s.x} ${s.y - 7} V${s.y + 7}`} stroke="#EBD9A8" strokeWidth=".8" />}
            </g>
          ))}
        </Layer>

        {/* moon rises */}
        <Layer z={3}>
          <g style={{ transform: `translateY(calc((1 - ${clampCss(0.25, 4)}) * 90px))`, opacity: clampCss(0.25, 5) as unknown as number }}>
            <path d="M580 28 A34 34 0 1 0 618 82 A27 27 0 1 1 580 28Z" fill="#F0E2B8" />
            <circle cx="590" cy="62" r="52" fill="#F0E2B8" opacity=".08" />
          </g>
        </Layer>

        <Scenery />

        {/* the night settles over the land */}
        <div className="absolute inset-0" style={{ background: "#1B1F2C", opacity: "calc(var(--n) * .6)" as unknown as number, zIndex: 5 }} />

        {/* warm things, switched on one by one */}
        <Layer z={6}>
          <g style={fade(0.4, 7)}>
            <circle className="glow" cx="482" cy="454" r="26" fill="#F4C97A" />
            <circle className="glow" cx="518" cy="454" r="26" fill="#F4C97A" style={{ animationDelay: ".8s" }} />
            <rect x="476" y="448" width="12" height="12" fill="#F7D590" />
            <rect x="512" y="448" width="12" height="12" fill="#F7D590" />
            <path d="M482 448 v12 M476 454 h12 M518 448 v12 M512 454 h12" stroke="#7B3F46" strokeWidth=".8" />
            <path className="steam" d="M520 406 c-6 -8 6 -12 0 -22 c-5 -8 5 -10 2 -18" stroke="#F6F0E7" strokeOpacity=".6" fill="none" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g style={fade(0.46, 7)}>
            <rect x="152" y="384" width="6" height="6" fill="#F7D590" />
            <rect x="796" y="370" width="6" height="6" fill="#F7D590" />
            <rect x="832" y="372" width="5" height="5" fill="#F7D590" />
            <rect x="186" y="388" width="5" height="5" fill="#F7D590" />
          </g>
          <g style={fade(0.66, 8)}>
            {[
              [462, 566],
              [546, 566],
              [484, 532],
              [522, 530],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle className="glow" cx={x} cy={y} r="13" fill="#F4C97A" style={{ animationDelay: `${i * 0.6}s` }} />
                <circle cx={x} cy={y} r="3" fill="#F7D590" />
              </g>
            ))}
          </g>
          <g style={fade(0.72, 8)}>
            {[
              [420, 510, 0],
              [590, 500, 1.2],
              [350, 540, 2.1],
              [655, 535, 0.7],
              [455, 470, 1.8],
              [550, 478, 2.6],
            ].map(([x, y, d], i) => (
              <circle key={i} className="twinkle" cx={x} cy={y} r="2.2" fill="#F7D590" style={{ animationDelay: `${d}s` }} />
            ))}
          </g>
        </Layer>

        {/* flowers wake up along the path */}
        <Layer z={7}>
          {BLOOMS.map(([x, y, c, s, at], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 100%",
                  transform: `scale(${clampCss(at, 8)})`,
                  opacity: clampCss(at, 8) as unknown as number,
                }}
              >
                <g className="sway" style={{ animationDelay: `${(i % 5) * 0.7}s` }}>
                  <path d="M0 0 C-2 -8 2 -16 0 -24" fill="none" stroke="#4B3430" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M0 -8 C-9 -10 -11 -16 -13 -19 C-5 -19 0 -15 0 -8Z" fill="#8C927F" stroke="#4B3430" strokeWidth=".7" />
                  {[0, 72, 144, 216, 288].map((a) => (
                    <circle key={a} cx={Math.cos(((a - 90) * Math.PI) / 180) * 4.6} cy={-27 + Math.sin(((a - 90) * Math.PI) / 180) * 4.6} r="3.6" fill={c} stroke="#4B3430" strokeWidth=".6" />
                  ))}
                  <circle cx="0" cy="-27" r="2.2" fill="#C8A66A" />
                </g>
              </g>
            </g>
          ))}
        </Layer>

        {/* birds, going home */}
        <Layer z={7} style={{ opacity: clampCss(0.58, 6) as unknown as number }}>
          <g className="drift">
            {[
              [300, 190, 1],
              [338, 168, 0.8],
              [280, 148, 0.65],
            ].map(([x, y, s], i) => (
              <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 q7 -9 14 0 q7 -9 14 0" fill="none" stroke="#EBD9A8" strokeWidth="1.8" strokeLinecap="round" />
            ))}
          </g>
        </Layer>

        {/* the words */}
        <div
          className="absolute inset-x-0 top-[15svh] md:top-[16svh] px-6 text-center pointer-events-none"
          style={{ zIndex: 10, color: "color-mix(in srgb, #4B3430 calc((1 - var(--n)) * 100%), #F6F0E7)" }}
        >
          <div className="relative mx-auto max-w-[22rem] md:max-w-3xl" style={{ minHeight: "min(52svh, 22rem)" }}>
            {GROUPS.map((g, gi) => (
              <div key={gi} className="absolute inset-x-0 top-0">
                {g.map((l, li) => {
                  const on = p >= l.from && p < l.to;
                  return (
                    <p
                      key={li}
                      className={l.cls}
                      style={{
                        opacity: on ? 1 : 0,
                        transform: on ? "none" : "translateY(8px)",
                        transition: "opacity 1.6s ease, transform 1.8s ease",
                        margin: li ? undefined : 0,
                      }}
                    >
                      {l.t}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <p
          className="hand absolute bottom-5 inset-x-0 text-center text-xl text-brown/60"
          style={{ zIndex: 10, opacity: p < 0.02 ? 1 : 0, transition: "opacity 1s" }}
          aria-hidden="true"
        >
          scroll slowly ↓
        </p>
      </div>
    </section>
  );
}
