import { useState } from "react";
import type { ReactNode } from "react";
import { BabyBreath, Blossom, Daisy, Rose, Sprig, Torn } from "./Art";
import { Reveal } from "../hooks";

type SpotId = "book" | "window" | "candle" | "flowers" | "record" | "tea" | "letters" | "moon" | "house" | "plant";

const MSG: Record<SpotId, { label: string; text: string }> = {
  book: { label: "the book", text: "I want to know all the chapters you haven't told me yet." },
  window: { label: "the window", text: "Even from far away, somehow you became home." },
  candle: { label: "the candle", text: "You make things feel warmer." },
  flowers: { label: "the flowers", text: "Thank you for making my life a little more beautiful." },
  record: { label: "the record", text: "If I could, I'd play you every song that reminds me of you. Out loud. Badly sung." },
  tea: { label: "the tea", text: "Come sit. I'll make us something warm, and we can talk until it goes cold." },
  letters: { label: "the letters", text: "Every message from you feels like a small letter I get to keep." },
  moon: { label: "the moon", text: "Same moon, different sky. I look up and somehow end up thinking of you." },
  house: { label: "the little house", text: "Maybe someday, somewhere small and quiet. I just like imagining you in it." },
  plant: { label: "the plant", text: "I want to take care of the little things that make you happy. Slowly. Properly." },
};

function bez(p: number[][], t: number) {
  const u = 1 - t;
  const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
  const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
  return [x, y];
}
const SEG1 = [[-10, 30], [120, 90], [240, 70], [300, 40]];
const SEG2 = [[300, 40], [360, 70], [480, 90], [610, 30]];
const LEAVES: { x: number; y: number; a: number }[] = [];
[SEG1, SEG2].forEach((s, si) => {
  for (let i = 1; i < 12; i++) {
    const [x, y] = bez(s, i / 12);
    LEAVES.push({ x, y, a: (i % 2 ? 40 : 140) + si * 6 });
  }
});
const DROPS = [bez(SEG1, 0.28), bez(SEG1, 0.66), bez(SEG2, 0.36), bez(SEG2, 0.74)];

function Spot({
  id,
  active,
  visited,
  onPick,
  rects,
  spark,
  children,
}: {
  id: SpotId;
  active: SpotId | null;
  visited: Set<SpotId>;
  onPick: (id: SpotId) => void;
  rects: [number, number, number, number][];
  spark: [number, number];
  children?: ReactNode;
}) {
  const on = active === id;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${MSG[id].label} — touch to read`}
      style={{ cursor: "pointer", outline: "none" }}
      onClick={() => onPick(id)}
      onMouseEnter={() => onPick(id)}
      onFocus={() => onPick(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(id);
        }
      }}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill="transparent" />
      ))}
      {children}
      {on &&
        rects.map((r, i) => (
          <rect key={`o${i}`} x={r[0]} y={r[1]} width={r[2]} height={r[3]} rx="10" fill="none" stroke="#F6F0E7" strokeOpacity=".85" strokeWidth="1.6" strokeDasharray="5 6" pointerEvents="none" />
        ))}
      {!visited.has(id) && (
        <text x={spark[0]} y={spark[1]} fontSize="18" fill="#C8A66A" className="hint-pulse" pointerEvents="none">
          ✦
        </text>
      )}
    </g>
  );
}

const ink = { stroke: "#4B3430", strokeWidth: 1.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

function At({ cx, cy, w, rot = 0, children }: { cx: number; cy: number; w: number; rot?: number; children: ReactNode }) {
  return (
    <div
      className="absolute nopoint"
      style={{ left: `${((cx - w / 2) / 600) * 100}%`, top: `${((cy - w / 2) / 700) * 100}%`, width: `${(w / 600) * 100}%`, transform: `rotate(${rot}deg)` }}
    >
      {children}
    </div>
  );
}

/** Scene 7 — a very small world, with very small voices. */
export default function World() {
  const [active, setActive] = useState<SpotId | null>(null);
  const [visited, setVisited] = useState<Set<SpotId>>(new Set());
  const pick = (id: SpotId) => {
    setActive(id);
    setVisited((v) => (v.has(id) ? v : new Set(v).add(id)));
  };
  const sp = { active, visited, onPick: pick };
  const cur = active ? MSG[active] : null;

  return (
    <section id="world" className="sec py-24 md:py-36 px-4" style={{ background: "#7B3F46" }} aria-labelledby="world-h">
      <Torn color="#7B3F46" v={2} />
      <div className="relative max-w-[1120px] mx-auto grid gap-8 md:gap-x-12 md:grid-cols-[1fr_620px] md:items-center">
        <div className="text-center md:text-left md:col-start-1 md:row-start-1 md:self-end">
          <Reveal as="p" className="hand text-2xl text-blush">
            the fifth page
          </Reveal>
          <Reveal as="h2" delay={0.3} className="serif italic font-light text-ivory text-[2.9rem] md:text-[5rem] leading-none mt-2">
            <span id="world-h">Our little world</span>
          </Reveal>
          <Reveal as="p" delay={0.9} className="serif text-ivory/75 text-lg md:text-2xl mt-5 max-w-sm mx-auto md:mx-0">
            It's small. It's quiet. Walk around, and see what it says.
          </Reveal>
        </div>

        {/* the room */}
        <Reveal mode="still" dur={2.4} className="md:col-start-2 md:row-start-1 md:row-span-2 mx-auto w-full max-w-[560px] md:max-w-none" threshold={0.2}>
          <div className="relative" style={{ padding: 8, background: "#F6F0E7", boxShadow: "0 24px 40px -24px rgba(0,0,0,.6)" }}>
            <div className="relative" style={{ aspectRatio: "600 / 700", outline: "1px solid rgba(75,52,48,.6)", outlineOffset: -5 }}>
              <svg viewBox="0 0 600 700" className="absolute inset-0 w-full h-full" role="group" aria-label="A small illustrated room">
                <defs>
                  <clipPath id="winclip">
                    <path d="M190 400 V190 A110 110 0 0 1 410 190 V400Z" />
                  </clipPath>
                </defs>

                {/* wall + table */}
                <rect width="600" height="700" fill="#E8D2C6" />
                <g fill="#D8A7A0" opacity=".22">
                  {Array.from({ length: 30 }, (_, i) => (
                    <circle key={i} cx={30 + ((i * 97) % 540)} cy={110 + ((i * 53) % 380)} r="2.2" />
                  ))}
                </g>

                {/* garland */}
                <g filter="url(#rough)" {...ink} strokeWidth={1}>
                  <path d="M-10 30 C120 90 240 70 300 40 C360 70 480 90 610 30" fill="none" />
                  {LEAVES.map((l, i) => (
                    <ellipse key={i} cx={l.x} cy={l.y} rx="9" ry="3.6" transform={`rotate(${l.a} ${l.x} ${l.y})`} fill="#8C927F" fillOpacity=".8" />
                  ))}
                  {DROPS.map(([x, y], i) => (
                    <g key={i}>
                      <path d={`M${x} ${y} v16`} />
                      <circle cx={x} cy={y + 22} r="6" fill={i % 2 ? "#F4EBD9" : "#D8A7A0"} />
                      <circle cx={x - 6} cy={y + 18} r="3.2" fill="#F4EBD9" />
                      <circle cx={x + 6} cy={y + 18} r="3.2" fill="#C8A66A" fillOpacity=".7" />
                    </g>
                  ))}
                </g>

                {/* window */}
                <Spot id="window" {...sp} rects={[[176, 70, 248, 350]]} spark={[300, 270]}>
                  <g clipPath="url(#winclip)">
                    <rect x="180" y="70" width="240" height="340" fill="#2B3144" />
                    {[[210, 130], [240, 100], [270, 160], [290, 110], [390, 110], [370, 200], [225, 210], [320, 220], [255, 250], [395, 160]].map(([x, y], i) => (
                      <circle key={i} className="twinkle" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r={i % 3 ? 1.3 : 2} fill="#F6F0E7" />
                    ))}
                    <path d="M345 118 A24 24 0 1 0 372 152 A19 19 0 1 1 345 118Z" fill="#F0E2B8" />
                    <path d="M190 330 C230 300 270 320 300 310 C340 300 380 318 410 304 V400 H190Z" fill="#3A4257" />
                    <path d="M190 362 C240 338 290 354 330 348 C370 342 395 352 410 348 V400 H190Z" fill="#4A5446" />
                    <path d="M300 348 C288 364 312 376 296 402" stroke="#D8C7A8" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <circle className="glow" cx="300" cy="336" r="20" fill="#F4C97A" />
                    <rect x="288" y="326" width="24" height="18" fill="#D9CDB6" />
                    <path d="M285 328 L300 314 L315 328Z" fill="#B97878" />
                    <rect x="295" y="332" width="7" height="7" fill="#F7D590" />
                  </g>
                  <g filter="url(#rough)" fill="none" strokeLinecap="round">
                    <path d="M190 400 V190 A110 110 0 0 1 410 190 V400Z" stroke="#F6F0E7" strokeWidth="9" />
                    <path d="M300 82 V400 M190 250 H410" stroke="#F6F0E7" strokeWidth="5" />
                    <path d="M185 400 V190 A115 115 0 0 1 415 190 V400 M194 400 V190 A106 106 0 0 1 406 190 V400" stroke="#4B3430" strokeWidth="1.2" />
                    <rect x="176" y="398" width="248" height="14" fill="#F6F0E7" stroke="#4B3430" strokeWidth="1.3" />
                  </g>
                </Spot>
                <Spot id="moon" {...sp} rects={[[330, 108, 56, 58]]} spark={[386, 112]} />
                <Spot id="house" {...sp} rects={[[280, 306, 42, 44]]} spark={[318, 304]} />

                {/* curtains + rod */}
                <g filter="url(#rough)" {...ink}>
                  <path d="M118 58 C160 64 188 80 192 112 C196 200 196 300 150 424 L96 424 C110 300 96 170 118 58Z" fill="#8C927F" fillOpacity=".92" />
                  <g transform="translate(600 0) scale(-1 1)">
                    <path d="M118 58 C160 64 188 80 192 112 C196 200 196 300 150 424 L96 424 C110 300 96 170 118 58Z" fill="#8C927F" fillOpacity=".92" />
                  </g>
                  <path d="M138 92 C150 200 150 300 128 414 M162 100 C172 200 170 300 148 410" strokeWidth=".9" fill="none" strokeOpacity=".6" />
                  <path d="M462 92 C450 200 450 300 472 414 M438 100 C428 200 430 300 452 410" strokeWidth=".9" fill="none" strokeOpacity=".6" />
                  <path d="M82 52 H518" strokeWidth="3" />
                  <circle cx="80" cy="52" r="5" fill="#C8A66A" />
                  <circle cx="520" cy="52" r="5" fill="#C8A66A" />
                  <path d="M118 424 C 130 440 100 446 100 424" fill="#B97878" fillOpacity=".7" strokeWidth="1" />
                </g>

                {/* little framed drawing */}
                <g filter="url(#rough)" {...ink} strokeWidth={1.2}>
                  <rect x="26" y="130" width="62" height="78" fill="#F6F0E7" />
                  <rect x="33" y="137" width="48" height="64" fill="#EFE4D6" />
                  <path d="M57 190 C55 172 59 162 57 150" fill="none" />
                  <circle cx="57" cy="148" r="6" fill="#D8A7A0" />
                  <path d="M57 178 C48 174 46 168 44 164 C52 164 56 170 57 178Z" fill="#8C927F" />
                </g>

                {/* shelf + plant */}
                <Spot id="plant" {...sp} rects={[[440, 96, 140, 154]]} spark={[560, 112]}>
                  <g filter="url(#rough)" {...ink}>
                    <path d="M508 192 C480 186 462 170 458 152 C482 156 502 170 508 192Z M510 192 C490 172 484 152 492 134 C506 148 512 170 510 192Z M510 192 C506 162 508 132 516 110 C524 134 520 166 510 192Z M512 192 C532 174 540 152 534 130 C518 146 510 168 512 192Z M512 192 C540 186 558 172 562 154 C538 158 516 170 512 192Z" fill="#8C927F" fillOpacity=".92" />
                    <path d="M488 190 h44 l-6 46 h-32Z" fill="#C08A70" />
                    <path d="M488 198 h44" strokeWidth="1" />
                    <rect x="440" y="236" width="140" height="9" fill="#8A6552" />
                    <path d="M456 245 v18 l16 -18 M564 245 v18 l-16 -18" fill="none" strokeWidth="1.2" />
                  </g>
                </Spot>

                {/* table */}
                <g filter="url(#rough)" {...ink}>
                  <rect x="-6" y="522" width="612" height="190" fill="#8A6552" />
                  <path d="M-6 522 H606" strokeWidth="2" />
                  <path d="M-6 534 H606" strokeWidth=".8" strokeOpacity=".5" />
                  <path d="M70 600 L530 600 L548 700 L52 700Z" fill="#F1E6D4" strokeWidth="1" />
                </g>

                {/* candle */}
                <circle className="glow" cx="262" cy="436" r="64" fill="#F4C97A" />
                <Spot id="candle" {...sp} rects={[[236, 398, 52, 134]]} spark={[274, 410]}>
                  <g filter="url(#rough)" {...ink}>
                    <ellipse cx="262" cy="522" rx="26" ry="6" fill="#C8A66A" />
                    <path d="M252 522 v-10 h20 v10" fill="#C8A66A" fillOpacity=".8" />
                    <path d="M254 512 V452 h16 V512Z" fill="#F6F0E7" />
                    <path d="M254 458 c3 8 5 2 8 6 c3 -4 5 4 8 -4" fill="none" strokeWidth="1" />
                    <path d="M262 452 v-8" strokeWidth="1.2" />
                  </g>
                  <g className="flame">
                    <path d="M262 448 C250 436 257 426 262 410 C267 426 274 436 262 448Z" fill="#F4C97A" stroke="#C8A66A" strokeWidth="1" />
                    <path d="M262 446 C257 440 260 434 262 428 C264 434 267 440 262 446Z" fill="#FBEBC0" />
                  </g>
                </Spot>

                {/* books: stack + one open on the table */}
                <Spot id="book" {...sp} rects={[[36, 452, 160, 74], [44, 560, 198, 96]]} spark={[196, 456]}>
                  <g filter="url(#rough)" {...ink}>
                    <rect x="40" y="500" width="150" height="22" fill="#7B3F46" />
                    <path d="M54 500 v22 M176 500 v22" strokeWidth="1" strokeOpacity=".6" stroke="#F6F0E7" />
                    <g transform="rotate(-2 116 489)">
                      <rect x="52" y="478" width="128" height="22" fill="#8C927F" />
                      <path d="M64 478 v22" strokeWidth="1" />
                    </g>
                    <g transform="rotate(2 116 468)">
                      <rect x="62" y="458" width="108" height="20" fill="#EFE4D6" />
                      <rect x="62" y="464" width="108" height="6" fill="#B97878" fillOpacity=".7" />
                    </g>
                    <path d="M170 470 c6 10 -2 22 4 34" fill="none" stroke="#C8A66A" strokeWidth="2.4" />
                    {/* open book */}
                    <path d="M50 584 L50 648 C95 634 125 636 142 646 C159 636 189 634 234 648 L234 584Z" fill="#7B3F46" />
                    <path d="M60 578 C95 566 125 568 142 578 L142 636 C125 626 95 624 60 636Z" fill="#F8F3EA" />
                    <path d="M142 578 C159 568 189 566 224 578 L224 636 C189 624 159 626 142 636Z" fill="#FAF6EE" />
                    <path d="M72 592 C95 586 115 588 130 594 M72 602 C95 596 115 598 130 604 M72 612 C95 606 115 608 130 614 M156 594 C171 588 191 586 212 592 M156 604 C171 598 191 596 212 602" strokeWidth=".7" strokeOpacity=".55" fill="none" />
                    <circle cx="196" cy="618" r="6" fill="#D8A7A0" strokeWidth=".8" />
                    <path d="M196 624 C195 630 197 633 196 636" strokeWidth=".8" fill="none" />
                  </g>
                </Spot>

                {/* record player */}
                <Spot id="record" {...sp} rects={[[296, 462, 166, 66]]} spark={[448, 466]}>
                  <g filter="url(#rough)" {...ink}>
                    <rect x="300" y="496" width="150" height="28" fill="#A47C66" />
                    <path d="M300 504 H450" strokeWidth=".8" strokeOpacity=".5" />
                  </g>
                  <g transform="translate(375 492) scale(1 .18)">
                    <circle r="64" fill="#30302D" />
                    <circle r="50" fill="none" stroke="#5a5a55" strokeWidth="1.5" />
                    <circle r="38" fill="none" stroke="#5a5a55" strokeWidth="1.5" />
                    <g className="spin">
                      <circle r="19" fill="#B97878" />
                      <path d="M0 -19 V-60" stroke="#8a8a84" strokeWidth="2.5" />
                      <circle r="3" fill="#F6F0E7" />
                    </g>
                  </g>
                  <g {...ink} strokeWidth={2.4} fill="none" stroke="#C8A66A">
                    <path d="M436 490 L400 494" />
                    <circle cx="438" cy="489" r="4" fill="#C8A66A" />
                  </g>
                  <text x="320" y="470" className="hand steam" fontSize="26" fill="#F6F0E7" pointerEvents="none">
                    ♪
                  </text>
                </Spot>

                {/* vase stems + vase */}
                <Spot id="flowers" {...sp} rects={[[470, 340, 112, 190]]} spark={[580, 350]}>
                  <g filter="url(#rough)" {...ink} strokeWidth={1.2} fill="none">
                    <path d="M524 460 C516 440 500 420 492 404" />
                    <path d="M526 460 C526 430 526 400 526 370" />
                    <path d="M528 460 C540 440 556 420 562 402" />
                    <path d="M525 460 C520 450 514 436 512 422" />
                    <path d="M530 460 C540 450 548 440 552 430" />
                  </g>
                  <g filter="url(#rough)" {...ink}>
                    <path d="M512 522 C496 502 496 472 510 454 L540 454 C554 472 554 502 538 522Z" fill="#8E9AA6" fillOpacity=".5" />
                    <path d="M506 470 C520 476 530 476 544 470" fill="none" strokeWidth=".8" strokeOpacity=".6" />
                  </g>
                </Spot>

                {/* tea */}
                <Spot id="tea" {...sp} rects={[[394, 556, 108, 100]]} spark={[498, 566]}>
                  <g filter="url(#rough)" {...ink}>
                    <ellipse cx="440" cy="644" rx="54" ry="12" fill="#C9CDBE" />
                    <path d="M404 598 h72 c0 34 -14 48 -36 48 c-22 0 -36 -14 -36 -48Z" fill="#F6F0E7" />
                    <path d="M406 608 h68 c-1 6 -2 11 -4 15 h-60 c-2 -4 -3 -9 -4 -15Z" fill="#D8A7A0" fillOpacity=".8" strokeWidth=".8" />
                    <path d="M476 606 c22 -4 22 28 -6 32" fill="none" />
                    <path className="steam" d="M428 586 c-8 -8 8 -14 0 -26" fill="none" strokeWidth="1.2" />
                    <path className="steam" style={{ animationDelay: "1.5s" }} d="M450 586 c-8 -8 8 -14 0 -26" fill="none" strokeWidth="1.2" />
                  </g>
                </Spot>

                {/* letters */}
                <Spot id="letters" {...sp} rects={[[240, 584, 150, 100]]} spark={[380, 590]}>
                  <g filter="url(#rough)" {...ink}>
                    <g transform="rotate(5 310 640)">
                      <rect x="262" y="604" width="104" height="66" fill="#E2D0B8" />
                      <path d="M262 604 L314 640 L366 604" fill="none" strokeWidth="1" />
                    </g>
                    <g transform="rotate(-7 310 640)">
                      <rect x="254" y="608" width="108" height="68" fill="#F1E6D4" />
                      <path d="M254 608 L308 648 L362 608 M254 676 L292 640 M362 676 L324 640" fill="none" strokeWidth="1" />
                    </g>
                  </g>
                  <circle cx="306" cy="646" r="9" fill="#7B3F46" />
                  <path d="M306 652 C298 647 298 642 301 641 C304 640 306 642 306 643 C306 642 308 640 311 641 C314 642 314 647 306 652Z" fill="#F6F0E7" fillOpacity=".5" />
                </Spot>
              </svg>

              {/* hand-painted heads layered on top, kept soft */}
              <At cx={538} cy={420} w={58} rot={-20}>
                <Sprig className="w-full" />
              </At>
              <At cx={500} cy={424} w={50} rot={-40}>
                <Sprig className="w-full" leaf="#8C927F" />
              </At>
              <At cx={492} cy={400} w={46} rot={-10}>
                <Daisy className="w-full sway" />
              </At>
              <At cx={526} cy={364} w={58}>
                <Rose className="w-full" />
              </At>
              <At cx={562} cy={398} w={42} rot={14}>
                <Blossom className="w-full" tone="#E7BFB8" />
              </At>
              <At cx={512} cy={424} w={40}>
                <Rose className="w-full" tone="#F1E1D3" />
              </At>
              <At cx={552} cy={430} w={46} rot={10}>
                <BabyBreath className="w-full" />
              </At>
              <At cx={74} cy={528} w={38}>
                <Blossom className="w-full" tone="#F4EBD9" />
              </At>
            </div>
          </div>
        </Reveal>

        {/* what it says */}
        <div className="md:col-start-1 md:row-start-2 md:self-start text-center md:text-left" aria-live="polite" style={{ minHeight: "9.5rem" }}>
          {cur ? (
            <div key={active} className="msg">
              <p className="serif uppercase tracking-[0.22em] text-xs text-blush mb-3">{cur.label}</p>
              <p className="hand text-ivory text-[2rem] md:text-[2.8rem] leading-[1.15] max-w-md mx-auto md:mx-0">{cur.text}</p>
            </div>
          ) : (
            <p className="hand text-ivory/60 text-2xl md:text-3xl">touch anything. ✦</p>
          )}
          <p className="serif italic text-ivory/50 mt-4 text-base">
            {visited.size > 0 && `${visited.size} of ${Object.keys(MSG).length} whispers heard`}
          </p>
        </div>
      </div>
    </section>
  );
}
