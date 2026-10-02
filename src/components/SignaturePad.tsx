import { useCallback, useEffect, useRef, useState } from "react";
import { WaxSeal } from "./Art";
import { Write } from "../hooks";

const PEN = "#2E3550";
const H = 168;

function Accepted() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <p className="hand text-burgundy text-[2.1rem] leading-none">
      <Write dur={1.6} show={on}>
        Promise accepted.
      </Write>
    </p>
  );
}

/** A quiet little pad. Draw with mouse, finger or pen — or type, if drawing isn't possible. */
export default function SignaturePad() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number; t: number } | null>(null);
  const mid = useRef<{ x: number; y: number } | null>(null);
  const lw = useRef(2.4);
  const widthRef = useRef(0);
  const timer = useRef<number | null>(null);

  const [hasInk, setHasInk] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [blot, setBlot] = useState<{ x: number; y: number; k: number } | null>(null);
  const [typing, setTyping] = useState(false);
  const [typed, setTyped] = useState("");

  const setup = useCallback(() => {
    const c = canvasRef.current;
    const w = wrapRef.current;
    if (!c || !w) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = w.clientWidth;
    widthRef.current = width;
    c.width = Math.round(width * dpr);
    c.height = Math.round(H * dpr);
    c.style.width = `${width}px`;
    c.style.height = `${H}px`;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = PEN;
    ctx.fillStyle = PEN;
  }, []);

  useEffect(() => {
    setup();
    const onResize = () => {
      const w = wrapRef.current;
      if (w && Math.abs(w.clientWidth - widthRef.current) > 4) {
        setup();
        setHasInk(false);
        setAccepted(false);
        setBlot(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [setup]);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() };
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (typing) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* some browsers throw for synthetic pointers */
    }
    if (timer.current) clearTimeout(timer.current);
    setAccepted(false);
    setBlot(null);
    drawing.current = true;
    const p = pos(e);
    last.current = p;
    mid.current = { x: p.x, y: p.y };
    lw.current = 2.4;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
    ctx.fill();
    setHasInk(true);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current || !mid.current) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    const dist = Math.hypot(p.x - last.current.x, p.y - last.current.y);
    const speed = dist / Math.max(1, p.t - last.current.t);
    const target = Math.max(1.1, Math.min(3.4, 3.4 - speed * 1.5));
    lw.current = lw.current * 0.75 + target * 0.25;
    const m = { x: (last.current.x + p.x) / 2, y: (last.current.y + p.y) / 2 };
    ctx.lineWidth = lw.current;
    ctx.beginPath();
    ctx.moveTo(mid.current.x, mid.current.y);
    ctx.quadraticCurveTo(last.current.x, last.current.y, m.x, m.y);
    ctx.stroke();
    mid.current = m;
    last.current = p;
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const l = last.current;
    if (l) setBlot({ x: l.x, y: l.y, k: Date.now() });
    timer.current = window.setTimeout(() => setAccepted(true), 900);
  };

  const clear = () => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (c && ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.restore();
    }
    if (timer.current) clearTimeout(timer.current);
    setHasInk(false);
    setAccepted(false);
    setBlot(null);
    setTyped("");
  };

  const typeIt = (v: string) => {
    setTyped(v);
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.restore();
    if (timer.current) clearTimeout(timer.current);
    if (!v.trim()) {
      setHasInk(false);
      setAccepted(false);
      return;
    }
    ctx.save();
    ctx.font = `64px "Mrs Saint Delafield", "Caveat", cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(v, widthRef.current / 2, H - 46, widthRef.current - 20);
    ctx.restore();
    setHasInk(true);
    setBlot(null);
    timer.current = window.setTimeout(() => setAccepted(true), 1200);
  };

  return (
    <div>
      <p className="hand text-burgundy text-[1.9rem] md:text-3xl -rotate-1 mb-1">
        <Write>Your turn, babe.</Write>
      </p>

      <div ref={wrapRef} className="relative" style={{ height: H }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Signature pad. Draw your signature with a mouse, finger or pen. A typing option is below."
          className="absolute inset-0 touch-none cursor-crosshair"
          style={{ touchAction: "none" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
        {!hasInk && (
          <span className="hand absolute inset-0 flex items-center justify-center text-brown/25 text-3xl pointer-events-none select-none">
            sign here
          </span>
        )}
        <span className="hand absolute left-0 bottom-3 text-brown/50 text-2xl pointer-events-none select-none">×</span>
        {blot && (
          <span
            key={blot.k}
            className="ink-blot absolute pointer-events-none"
            style={{ left: blot.x - 9, top: blot.y - 9, width: 18, height: 18, background: PEN }}
            aria-hidden="true"
          />
        )}
        {/* the seal presses itself onto the promise */}
        <div
          className={`pop ${accepted ? "in" : ""} absolute pointer-events-none`}
          style={{ right: -4, bottom: -26, width: 58, height: 58, ["--delay" as string]: "0.5s" }}
          aria-hidden="true"
        >
          <WaxSeal className="w-full h-full rotate-12" />
        </div>
      </div>
      <div className="h-px bg-brown/70" />

      <div className="flex items-start justify-between gap-4 mt-3 min-h-[3.4rem]">
        <div aria-live="polite" className="min-h-[2.6rem]">
          {accepted && <Accepted />}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 pt-1">
          <button
            type="button"
            onClick={clear}
            disabled={!hasInk}
            className="serif italic text-brown/80 underline underline-offset-4 decoration-brown/30 text-base disabled:opacity-35 disabled:no-underline"
          >
            clear signature
          </button>
          <button
            type="button"
            onClick={() => setTyping((t) => !t)}
            className="serif italic text-brown/55 text-sm underline underline-offset-4 decoration-brown/20"
            aria-expanded={typing}
          >
            {typing ? "draw instead" : "or type it"}
          </button>
        </div>
      </div>

      {typing && (
        <label className="block mt-3">
          <span className="sr-only">Type your name to sign</span>
          <input
            type="text"
            value={typed}
            onChange={(e) => typeIt(e.target.value)}
            placeholder="Julian"
            maxLength={24}
            className="w-full bg-transparent border-b border-brown/40 serif italic text-xl py-1 outline-none focus:border-burgundy placeholder:text-brown/30"
          />
        </label>
      )}
    </div>
  );
}
