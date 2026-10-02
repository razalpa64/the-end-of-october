import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import bouquetImg from "../assets/bouquet.jpg";
import { BabyBreath, Blossom, Daisy, Heart, Petal, Rose, Sprig, Torn } from "./Art";
import { useInView, useReducedMotion } from "../hooks";

const CREAM = "#F3EBDD";

type BloomDef = { kind: "rose" | "daisy" | "blossom" | "baby" | "sprig"; x: number; y: number; tone?: string; w: string; bd: number };
const BLOOMS: BloomDef[] = [
  { kind: "rose", x: 20, y: 24, tone: "#D8A7A0", w: "clamp(54px,17vw,84px)", bd: 0 },
  { kind: "daisy", x: 80, y: 18, w: "clamp(46px,14vw,70px)", bd: 0.7 },
  { kind: "blossom", x: 13, y: 60, tone: "#E7BFB8", w: "clamp(42px,13vw,64px)", bd: 1.4 },
  { kind: "rose", x: 87, y: 56, tone: "#F1E1D3", w: "clamp(50px,16vw,78px)", bd: 2.1 },
  { kind: "baby", x: 32, y: 88, w: "clamp(50px,15vw,76px)", bd: 2.8 },
  { kind: "sprig", x: 70, y: 90, w: "clamp(54px,16vw,80px)", bd: 3.5 },
  { kind: "daisy", x: 50, y: 6, w: "clamp(40px,12vw,60px)", bd: 4.2 },
  { kind: "blossom", x: 52, y: 70, tone: "#D8A7A0", w: "clamp(36px,11vw,54px)", bd: 4.8 },
];

function BloomArt({ b }: { b: BloomDef }) {
  const c = "w-full h-full";
  if (b.kind === "rose") return <Rose className={c} tone={b.tone} />;
  if (b.kind === "daisy") return <Daisy className={c} />;
  if (b.kind === "blossom") return <Blossom className={c} tone={b.tone} />;
  if (b.kind === "baby") return <BabyBreath className={c} />;
  return <Sprig className={c} />;
}

function Group({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      style={{ opacity: on ? 1 : 0, transition: "opacity 1.8s ease", pointerEvents: on ? "auto" : "none" }}
      aria-hidden={!on}
    >
      {children}
    </div>
  );
}
function Ln({ on, className = "", children, style }: { on: boolean; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <p
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(8px)",
        transition: "opacity 2.2s ease, transform 2.4s ease",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

const PETAL_COLORS = ["#D8A7A0", "#F1E1D3", "#E7BFB8", "#B97878", "#F4EBD9"];
function usePetals(n: number) {
  return useMemo(() => {
    let s = 42;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: n }, (_, i) => ({
      l: `${(r() * 100).toFixed(1)}%`,
      w: `${(14 + r() * 14).toFixed(0)}px`,
      d: `${(11 + r() * 8).toFixed(1)}s`,
      dl: `${(r() * 7).toFixed(1)}s`,
      sx: `${((r() - 0.5) * 220).toFixed(0)}px`,
      rot: `${((r() - 0.5) * 900).toFixed(0)}deg`,
      sw: `${(2.4 + r() * 2.2).toFixed(1)}s`,
      c: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
  }, [n]);
}

/** Scene 11 — the end. Quiet paper, one sentence at a time, and a bouquet. */
export default function Bouquet() {
  const reduced = useReducedMotion();
  const secRef = useRef<HTMLElement>(null);
  const [startRef, started] = useInView<HTMLDivElement>(0.6, "0px");
  const capRef = useRef<HTMLDivElement>(null);
  const stageImg = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [beat, setBeat] = useState(0);
  const [stage, setStage] = useState<"idle" | "bloom" | "gather" | "done">("idle");
  const [taken, setTaken] = useState(false);
  const [fly, setFly] = useState<{ left: number; top: number; height: number } | null>(null);
  const [flown, setFlown] = useState(false);
  const [showText, setShowText] = useState(0);
  const petals = usePetals(26);

  /* the screen quiets down while this scene is on */
  useEffect(() => {
    const el = secRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) document.body.dataset.quiet = "1";
      else delete document.body.dataset.quiet;
    }, { threshold: 0.25 });
    io.observe(el);
    return () => {
      io.disconnect();
      delete document.body.dataset.quiet;
    };
  }, []);

  /* the little film, in beats */
  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setStage("done");
      setBeat(14);
      return;
    }
    const nudge = () => {
      const c = capRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 20 || r.top < 0) c.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const T: [number, () => void][] = [
      [300, () => setBeat(1)],
      [1400, () => setBeat(2)],
      [2600, () => { setStage("bloom"); setBeat(3); }],
      [4200, () => { setStage("gather"); setBeat(4); }],
      [5600, () => { setStage("done"); setBeat(5); nudge(); }],
      [6600, () => setBeat(6)],
      [7600, () => setBeat(7)],
      [8600, () => setBeat(8)],
      [9600, () => setBeat(9)],
      [10400, () => setBeat(10)],
      [11200, () => setBeat(11)],
      [12000, () => { setBeat(12); nudge(); }],
      [12800, () => setBeat(13)],
      [13600, () => { setBeat(14); nudge(); }],
    ];
    const ids = T.map(([t, f]) => window.setTimeout(f, t));
    return () => ids.forEach(clearTimeout);
  }, [started, reduced]);

  /* taking the flowers */
  const take = () => {
    const img = stageImg.current;
    if (!img) return;
    const r = img.getBoundingClientRect();
    setFly({ left: r.left, top: r.top, height: r.height });
    setFlown(false);
    setShowText(0);
    setTaken(true);
    const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0.67;
    const go = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const height = Math.min(vh * 0.58, 540);
      const width = height * ratio;
      setFly({ left: vw / 2 - width / 2, top: vh * 0.4 - height / 2, height });
      setFlown(true);
    };
    if (reduced) go();
    else requestAnimationFrame(() => requestAnimationFrame(go));
    const t = [reduced ? 100 : 1200, reduced ? 200 : 2000, reduced ? 300 : 2600, reduced ? 400 : 3400];
    t.forEach((ms, i) => window.setTimeout(() => setShowText((s) => Math.max(s, i + 1)), ms));
  };
  const close = () => {
    setTaken(false);
    setFly(null);
    setFlown(false);
    setShowText(0);
  };
  useEffect(() => {
    document.body.classList.toggle("locked", taken);
    if (!taken) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const f = window.setTimeout(() => closeRef.current?.focus(), 400);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(f);
      document.body.classList.remove("locked");
    };
  }, [taken]);

  const v = (a: number, b = 99) => beat >= a && beat < b;
  const bloomOn = stage === "bloom" || stage === "gather" || stage === "done";

  return (
    <section ref={secRef} id="bouquet" className="sec min-h-[100svh] pt-28 md:pt-36 pb-20 px-4" style={{ background: CREAM }} aria-labelledby="bouquet-h">
      <Torn color={CREAM} v={2} />
      <h2 id="bouquet-h" className="sr-only">
        The bouquet
      </h2>
      <Sprig className="nopoint absolute -left-5 top-24 w-20 md:w-28 -rotate-12 opacity-40 sway" />
      <Sprig className="nopoint absolute -right-6 bottom-28 w-20 md:w-28 rotate-[196deg] opacity-40 sway" />

      <div ref={startRef} className="relative mx-auto" style={{ width: "min(88vw, 420px)", height: "min(56svh, 500px)" }}>
        {/* the prelude */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ opacity: stage === "idle" ? 1 : 0, transition: "opacity 2s ease", pointerEvents: "none" }}
        >
          <Ln on={beat >= 1} className="serif italic font-light text-brown text-[2.1rem] md:text-[2.9rem] leading-tight">
            If I could be there right now...
          </Ln>
          <Ln on={beat >= 2} className="hand text-dusty text-[2.3rem] md:text-5xl mt-6">
            I'd probably have something for you.
          </Ln>
        </div>

        {/* loose flowers arrive, one at a time */}
        {BLOOMS.map((b, i) => (
          <div
            key={i}
            className={`bloom ${bloomOn ? "show" : ""} ${stage === "gather" || stage === "done" ? "gather" : ""}`}
            style={{ "--bx": `${b.x}%`, "--by": `${b.y}%`, "--bw": b.w, "--bd": `${b.bd * 0.6}s` } as CSSProperties}
            aria-hidden="true"
          >
            <div className="w-full h-full sway" style={{ animationDelay: `${i * 0.4}s` }}>
              <BloomArt b={b} />
            </div>
          </div>
        ))}

        {/* the painted bouquet appears from the top down, then sways ever so slightly */}
        <img
          ref={stageImg}
          src={bouquetImg}
          alt="A hand-painted bouquet of soft roses, baby's breath, wildflowers and eucalyptus, tied with a dusty rose ribbon."
          className={`bq mult mx-auto block ${stage === "gather" || stage === "done" ? "on" : ""} ${stage === "done" ? "full sway-img" : ""}`}
          style={{ height: "100%", width: "auto", visibility: taken ? "hidden" : "visible" }}
        />
      </div>

      {/* the words, in turn */}
      <div ref={capRef} className="relative mx-auto w-full max-w-[560px] mt-4 md:mt-6" style={{ minHeight: 330 }}>
        <Group on={v(5, 6)}>
          <Ln on={v(5)} className="serif italic font-light text-burgundy text-[2.6rem] md:text-[3.6rem]">
            These are for you.
          </Ln>
        </Group>

        <Group on={v(6, 9)}>
          <Ln on={v(6)} className="hand font-semibold text-burgundy text-[3.2rem] md:text-[4.4rem] leading-none">
            Happy one month, babe.
          </Ln>
          <Ln on={v(7)} className="serif tracking-[0.14em] text-brown text-[1.2rem] md:text-[1.5rem] mt-7">
            September 1 → October 1
          </Ln>
          <Ln on={v(8)} className="hand text-dusty text-[2.3rem] md:text-5xl mt-5 -rotate-1">
            One month down.
          </Ln>
        </Group>

        <Group on={v(9, 11)}>
          <Ln on={v(9)} className="serif italic text-brown/80 text-[1.8rem] md:text-[2.4rem]">
            And I hope...
          </Ln>
          <Ln on={v(10)} className="serif italic font-light text-burgundy text-[2.5rem] md:text-[3.6rem] leading-[1.08] mt-4">
            ...so, so many more to go.
          </Ln>
        </Group>

        <Group on={v(11)}>
          <Ln on={v(11)} className="serif italic font-light text-burgundy text-[2.3rem] md:text-[3.2rem] leading-[1.05]">
            Forever sounds beautiful.
          </Ln>
          <Ln on={v(12)} className="hand text-brown text-[1.9rem] md:text-[2.5rem] leading-[1.15] mt-4">
            but for now,
            <br />
            I'll just keep choosing you.
          </Ln>
          <Ln on={v(13)} className="mt-5 text-brown">
            <span className="hand text-[1.7rem] md:text-[2.1rem] block leading-none">With all my love,</span>
            <span className="font-sign text-burgundy text-[3.6rem] md:text-[4.6rem] leading-[.95] block mt-1">Razal ♡</span>
          </Ln>
          <div
            className="mt-5"
            style={{ opacity: v(14) ? 1 : 0, transition: "opacity 2.4s ease", pointerEvents: v(14) ? "auto" : "none" }}
          >
            <button onClick={take} className="inkbtn" tabIndex={v(14) ? 0 : -1}>
              Take the flowers ♡
            </button>
          </div>
        </Group>
      </div>

      {/* ───────── after taking them ───────── */}
      {taken && fly && (
        <>
          <div
            className="fixed inset-0"
            style={{ zIndex: 98, background: "#F6F0E7", opacity: flown ? 1 : 0, transition: "opacity 2s ease" }}
            aria-hidden="true"
          />
          <img
            src={bouquetImg}
            alt=""
            aria-hidden="true"
            className="fixed mult pointer-events-none"
            style={{
              zIndex: 99,
              left: fly.left,
              top: fly.top,
              height: fly.height,
              width: "auto",
              transition: flown ? "left 3.2s cubic-bezier(.45,.05,.2,1), top 3.2s cubic-bezier(.45,.05,.2,1), height 3.2s cubic-bezier(.45,.05,.2,1)" : "none",
            }}
          />
          {flown &&
            petals.map((p, i) => (
              <span
                key={i}
                className="petal"
                style={{ ["--l" as string]: p.l, ["--w" as string]: p.w, ["--d" as string]: p.d, ["--dl" as string]: p.dl, ["--sx" as string]: p.sx, ["--rot" as string]: p.rot, ["--sw" as string]: p.sw, zIndex: 102 } as CSSProperties}
                aria-hidden="true"
              >
                <Petal fill={p.c} />
              </span>
            ))}

          <div
            role="dialog"
            aria-modal="true"
            aria-label="The flowers are yours"
            className="fixed inset-x-0 bottom-0 text-center px-6 pb-[5svh] pt-6"
            style={{ zIndex: 101 }}
          >
            <p className="serif italic font-light text-burgundy text-[3.2rem] md:text-[4.6rem] leading-none" style={{ opacity: showText >= 1 ? 1 : 0, transition: "opacity 2.4s ease" }}>
              Keep them.
            </p>
            <p className="hand text-brown text-[1.9rem] md:text-[2.6rem] leading-[1.1] mt-3 max-w-md mx-auto" style={{ opacity: showText >= 2 ? 1 : 0, transition: "opacity 2.4s ease" }}>
              And keep this little piece of my heart too.
            </p>
            <div className={`pop ${showText >= 3 ? "in" : ""} mt-3`}>
              <Heart className="w-9 mx-auto" fill="#B97878" />
            </div>
            <p className="serif italic text-brown/60 mt-2 text-lg" style={{ opacity: showText >= 3 ? 1 : 0, transition: "opacity 2.4s ease 1s" }}>
              — Razal
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={close}
            className="fixed top-4 right-4 hand text-2xl text-brown/70 underline underline-offset-4 decoration-brown/30 px-2 py-1"
            style={{ zIndex: 103, opacity: showText >= 4 ? 1 : 0.0, transition: "opacity 2s ease" }}
          >
            back to the page
          </button>
        </>
      )}
    </section>
  );
}
