import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "../hooks";

/* ───────── dust motes ───────── */
export function Dust() {
  const motes = useMemo(() => {
    let s = 9;
    const r = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: 18 }, () => ({
      l: `${(r() * 100).toFixed(1)}%`,
      s: `${(2 + r() * 3).toFixed(1)}px`,
      d: `${(22 + r() * 22).toFixed(0)}s`,
      dl: `${(-r() * 40).toFixed(0)}s`,
      x: `${((r() - 0.5) * 120).toFixed(0)}px`,
    }));
  }, []);
  return (
    <div className="dust" aria-hidden="true">
      {motes.map((m, i) => (
        <span key={i} style={{ ["--l" as string]: m.l, ["--s" as string]: m.s, ["--d" as string]: m.d, ["--dl" as string]: m.dl, ["--x" as string]: m.x } as CSSProperties} />
      ))}
    </div>
  );
}

/* ───────── a tiny music box, synthesized — no files, never autoplays ───────── */
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const PROG = [
  [57, 60, 64, 69, 72, 69, 64, 60],
  [53, 57, 60, 65, 69, 65, 60, 57],
  [48, 52, 55, 60, 64, 60, 55, 52],
  [55, 59, 62, 67, 71, 67, 62, 59],
];
const MEL: [number, number][][] = [
  [[2, 81], [5, 79], [7, 76]],
  [[1, 81], [4, 84], [6, 81]],
  [[2, 79], [5, 76], [7, 84]],
  [[0, 83], [3, 79], [6, 86]],
];
const STEP = 0.46;

function useMusicBox() {
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const timer = useRef<number | null>(null);
  const step = useRef(0);
  const next = useRef(0);
  const [on, setOn] = useState(false);

  const voice = useCallback((f: number, t: number, g: number, d: number) => {
    const c = ctx.current;
    const m = master.current;
    if (!c || !m) return;
    const env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(g, t + 0.006);
    env.gain.exponentialRampToValueAtTime(0.0001, t + d);
    env.connect(m);
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(env);
    o.start(t);
    o.stop(t + d + 0.05);
    const o2 = c.createOscillator();
    const g2 = c.createGain();
    g2.gain.value = 0.22;
    o2.type = "triangle";
    o2.frequency.value = f * 2;
    o2.connect(g2).connect(env);
    o2.start(t);
    o2.stop(t + d + 0.05);
  }, []);

  const schedule = useCallback(() => {
    const c = ctx.current;
    if (!c) return;
    while (next.current < c.currentTime + 0.7) {
      const s = step.current;
      const bar = Math.floor(s / 8) % 4;
      const i = s % 8;
      voice(mtof(PROG[bar][i]), next.current, 0.11, 2.4);
      if (i === 0) voice(mtof(PROG[bar][0] - 12), next.current, 0.09, 3.2);
      MEL[bar].forEach(([k, n]) => {
        if (k === i) voice(mtof(n), next.current, 0.07, 2.8);
      });
      next.current += STEP;
      step.current += 1;
    }
  }, [voice]);

  const start = useCallback(() => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const c = new AC();
    ctx.current = c;
    c.resume?.();
    const m = c.createGain();
    m.gain.value = 0;
    m.gain.linearRampToValueAtTime(0.5, c.currentTime + 2.5);
    const delay = c.createDelay(1);
    delay.delayTime.value = 0.36;
    const fb = c.createGain();
    fb.gain.value = 0.34;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    const wet = c.createGain();
    wet.gain.value = 0.45;
    m.connect(c.destination);
    m.connect(delay);
    delay.connect(lp);
    lp.connect(fb).connect(delay);
    lp.connect(wet).connect(c.destination);
    master.current = m;
    step.current = 0;
    next.current = c.currentTime + 0.15;
    schedule();
    timer.current = window.setInterval(schedule, 150);
    setOn(true);
  }, [schedule]);

  const stop = useCallback(() => {
    const c = ctx.current;
    const m = master.current;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    if (c && m) {
      m.gain.cancelScheduledValues(c.currentTime);
      m.gain.setValueAtTime(m.gain.value, c.currentTime);
      m.gain.linearRampToValueAtTime(0, c.currentTime + 0.9);
      window.setTimeout(() => c.close().catch(() => undefined), 1100);
    }
    ctx.current = null;
    master.current = null;
    setOn(false);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
      ctx.current?.close().catch(() => undefined);
    },
    []
  );

  return { on, start, stop, toggle: () => (on ? stop() : start()) };
}

/* ───────── hybrid player: custom audio file if provided in /music/song.mp3, else synthesized music box ───────── */
const MUSIC_PATH_MP3 = `${import.meta.env.BASE_URL}music/song.mp3`;
const MUSIC_PATH_M4A = `${import.meta.env.BASE_URL}music/song.m4a`;
const MUSIC_PATH_WAV = `${import.meta.env.BASE_URL}music/song.wav`;

function useAudioPlayer() {
  const synth = useMusicBox();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingCustom, setIsPlayingCustom] = useState(false);
  const [on, setOn] = useState(false);
  const customFailed = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.src = MUSIC_PATH_MP3;
    audioRef.current = audio;

    const onError = () => {
      // Try alternate extension if mp3 fails
      if (audio.src.endsWith(".mp3")) {
        audio.src = MUSIC_PATH_M4A;
      } else if (audio.src.endsWith(".m4a")) {
        audio.src = MUSIC_PATH_WAV;
      } else {
        customFailed.current = true;
      }
    };
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("error", onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    if (on) {
      if (isPlayingCustom && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlayingCustom(false);
      } else {
        synth.stop();
      }
      setOn(false);
    } else {
      const audio = audioRef.current;
      if (audio && !customFailed.current) {
        const promise = audio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlayingCustom(true);
              setOn(true);
            })
            .catch(() => {
              customFailed.current = true;
              synth.start();
              setOn(true);
            });
        } else {
          setIsPlayingCustom(true);
          setOn(true);
        }
      } else {
        synth.start();
        setOn(true);
      }
    }
  }, [on, isPlayingCustom, synth]);

  return { on, toggle };
}

export function Music() {
  const { on, toggle } = useAudioPlayer();
  const [touched, setTouched] = useState(false);
  return (
    <div className="fixed z-[60] right-3 flex flex-col items-center" style={{ top: "max(12px, env(safe-area-inset-top))" }}>
      <button
        onClick={() => {
          setTouched(true);
          toggle();
        }}
        aria-pressed={on}
        aria-label={on ? "Turn music off" : "Turn music on"}
        title={on ? "music: on" : "music: off"}
        className="w-11 h-11 rounded-full relative"
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full ${on ? "spin spin-slow" : ""}`} aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="#30302D" stroke="#4B3430" strokeWidth="2" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#6a6a64" strokeWidth="1" />
          <circle cx="50" cy="50" r="31" fill="none" stroke="#6a6a64" strokeWidth="1" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#6a6a64" strokeWidth="1" />
          <path d="M20 30 A36 36 0 0 1 40 16" stroke="#F6F0E7" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="50" r="15" fill="#B97878" />
          <path d="M50 58 C42 52 42 46 46 45 C48 44.5 50 46 50 47 C50 46 52 44.5 54 45 C58 46 58 52 50 58Z" fill="#F6F0E7" fillOpacity=".8" />
          <circle cx="50" cy="50" r="2" fill="#30302D" />
        </svg>
      </button>
      <span
        className="hand text-sm text-brown/70 leading-none mt-1 pointer-events-none select-none transition-opacity duration-1000"
        style={{ opacity: touched ? 0 : 0.8 }}
        aria-hidden="true"
      >
        music?
      </span>
    </div>
  );
}

/* ───────── chapter tabs ───────── */
const CHAPTERS: { id: string; label: string; ids: string[] }[] = [
  { id: "letter", label: "Letter", ids: ["letter"] },
  { id: "little-things", label: "Little Things", ids: ["little-things", "small-things"] },
  { id: "after-you", label: "After You", ids: ["after-you"] },
  { id: "promise", label: "Promise", ids: ["promise"] },
  { id: "world", label: "Our World", ids: ["world"] },
  { id: "future", label: "Future", ids: ["future"] },
  { id: "agreement", label: "Agreement", ids: ["agreement"] },
  { id: "love", label: "Love", ids: ["love"] },
  { id: "bouquet", label: "Bouquet", ids: ["bouquet"] },
];

export function Nav({ visible }: { visible: boolean }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("letter");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const update = () => {
      const mid = window.innerHeight * 0.45;
      let cur = "";
      CHAPTERS.forEach((c) =>
        c.ids.forEach((id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (r.top <= mid && r.bottom > mid) cur = c.id;
        })
      );
      if (cur) setActive(cur);
    };
    update();
    let raf = 0;
    const on = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), update()));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [visible]);

  useEffect(() => {
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", k);
    document.body.classList.add("locked");
    return () => {
      window.removeEventListener("keydown", k);
      document.body.classList.remove("locked");
    };
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }), menu ? 60 : 0);
  };

  if (!visible) return null;

  return (
    <>
      {/* desktop: little index tabs along the edge of the page */}
      <nav aria-label="Chapters" className="chrome-nav hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[55] flex-col items-end gap-1.5">
        {CHAPTERS.map((c) => {
          const on = active === c.id;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(c.id);
              }}
              aria-current={on ? "true" : undefined}
              className="tab hand text-[1.1rem] leading-none whitespace-nowrap py-1.5 pl-3 pr-3 text-brown bg-ivory border border-brown/30 border-r-0 rounded-l-[5px]"
              style={{
                ["--tx" as string]: on ? "calc(100% - 26px)" : "calc(100% - 14px)",
                borderLeft: `4px solid ${on ? "#7B3F46" : "#D8A7A0"}`,
              } as CSSProperties}
            >
              {c.label}
            </a>
          );
        })}
      </nav>

      {/* mobile: a ribbon bookmark that opens the table of contents */}
      <button
        onClick={() => setMenu(true)}
        className="md:hidden chrome-nav fixed left-3 z-[55] flex flex-col items-center"
        style={{ top: "max(0px, env(safe-area-inset-top))" }}
        aria-label="Open chapters"
        aria-expanded={menu}
      >
        <svg viewBox="0 0 30 52" className="w-7 h-12" aria-hidden="true">
          <path d="M3 0 V48 L15 40 L27 48 V0Z" fill="#B97878" stroke="#4B3430" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 0 V38" stroke="#F6F0E7" strokeOpacity=".4" strokeWidth="1" />
        </svg>
      </button>

      {menu && (
        <div className="md:hidden fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Chapters">
          <button className="absolute inset-0 w-full h-full" style={{ background: "rgba(48,48,45,.45)" }} onClick={() => setMenu(false)} aria-label="Close chapters" />
          <div className="msg absolute left-0 top-0 bottom-0 w-[78%] max-w-[320px] bg-ivory px-7 pt-10 pb-8 overflow-y-auto" style={{ borderRight: "1px solid rgba(75,52,48,.35)" }}>
            <p className="hand text-3xl text-dusty -rotate-2">chapters</p>
            <div className="h-px bg-brown/30 mt-2 mb-5" />
            <ul className="space-y-1">
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <button
                    onClick={() => go(c.id)}
                    className="w-full text-left py-2 flex items-baseline gap-3"
                    aria-current={active === c.id ? "true" : undefined}
                  >
                    <span className="hand text-xl text-brown/45 w-5">{i + 1}</span>
                    <span className={`serif italic text-[1.7rem] leading-none ${active === c.id ? "text-burgundy border-b border-burgundy/50" : "text-brown"}`}>{c.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setMenu(false)} className="hand text-xl text-brown/60 mt-8 underline underline-offset-4 decoration-brown/30">
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

