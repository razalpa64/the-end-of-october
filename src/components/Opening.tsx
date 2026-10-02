import { useEffect, useRef, useState } from "react";
import { Envelope, Sprig, TinyFlower, INK } from "./Art";
import { Write, useReducedMotion } from "../hooks";

/** Scene 1 — an almost empty sheet of paper. It writes itself, slowly. */
export default function Opening({ onOpened, opened }: { onOpened: () => void; opened: boolean }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [opening, setOpening] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) {
      setStage(8);
      return;
    }
    const at = [200, 600, 1000, 1500, 2000, 2600, 3000];
    timers.current = at.map((t, i) => window.setTimeout(() => setStage(i + 1), t));
    return () => timers.current.forEach(clearTimeout);
  }, [reduced]);

  const skip = () => {
    if (stage < 7) {
      timers.current.forEach(clearTimeout);
      setStage(7);
    }
  };

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpened, reduced ? 50 : 450);
  };

  return (
    <section
      id="top"
      className="sec min-h-[100svh] flex flex-col items-center justify-center px-6 py-14 text-center"
      onClick={skip}
      aria-label="An opening note"
    >
      {/* the faintest hint of a garden in the corners, arriving last */}
      <Sprig
        className="nopoint absolute -left-6 bottom-8 w-28 md:w-40 -rotate-12 transition-opacity duration-[3000ms]"
        style={{ opacity: stage >= 6 ? 0.55 : 0 }}
      />
      <Sprig
        className="nopoint absolute -right-7 top-12 w-24 md:w-36 rotate-[200deg] transition-opacity duration-[3000ms]"
        style={{ opacity: stage >= 6 ? 0.4 : 0 }}
      />

      <div className="hand text-[1.9rem] md:text-4xl text-brown leading-none">
        <Write show={stage >= 1}>September 1</Write>
      </div>

      <svg viewBox="0 0 60 100" className="h-[70px] md:h-[88px] w-auto my-1" aria-hidden="true">
        <g className={stage >= 3 ? "in" : ""}>
          <path
            className="draw"
            pathLength={1}
            style={{ ["--dur" as string]: "2.6s" }}
            d="M30 4 C 18 20, 42 30, 30 48 S 16 72, 30 96"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="30" cy="3" r="2.4" fill={INK} opacity={stage >= 3 ? 0.8 : 0} style={{ transition: "opacity 1s" }} />
          <circle cx="30" cy="97" r="2.4" fill="#B97878" opacity={stage >= 3 ? 0.9 : 0} style={{ transition: "opacity 1s 2.4s" }} />
        </g>
      </svg>

      <div className="hand text-[1.9rem] md:text-4xl text-brown leading-none">
        <Write show={stage >= 2}>October 1</Write>
      </div>

      <h1 className="serif italic font-light text-burgundy text-[3.6rem] md:text-[6rem] leading-none mt-8 md:mt-10">
        <Write show={stage >= 4} dur={2.8}>
          One month.
        </Write>
      </h1>

      <p className="serif text-brown text-[1.35rem] md:text-[1.9rem] leading-snug mt-7 md:mt-8 max-w-[22rem] md:max-w-xl">
        <Write show={stage >= 5} className="italic" dur={1.8}>
          And somehow...
        </Write>
        <br />
        <Write show={stage >= 5} delay={1.9} dur={3}>
          you became such a beautiful part of my life.
        </Write>
      </p>

      <div className="mt-7 flex items-end justify-center gap-1">
        <span className="hand text-[2rem] md:text-4xl text-dusty">
          <Write show={stage >= 6} dur={2.2}>
            For my babe, Julian.
          </Write>
        </span>
        <div
          className={`w-9 md:w-11 -mb-2 ${stage >= 6 ? "in" : ""}`}
          style={{
            opacity: stage >= 6 ? 1 : 0,
            transform: stage >= 6 ? "scale(1)" : "scale(.3)",
            transformOrigin: "50% 100%",
            transition: "opacity 1.6s ease 2s, transform 2.4s ease 2s",
            ["--delay" as string]: "2.2s",
            ["--dur" as string]: "2.6s",
          }}
        >
          <TinyFlower className="w-full sway" />
        </div>
      </div>

      <div
        className="mt-9 md:mt-10"
        style={{ opacity: stage >= 7 ? 1 : 0, transition: "opacity 2.4s ease", pointerEvents: stage >= 7 ? "auto" : "none" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          aria-label="open this"
          className="group block mx-auto"
          disabled={opened}
        >
          <div className="scale-[.78] md:scale-90 origin-bottom transition-transform duration-[1200ms] group-hover:-translate-y-1">
            <Envelope open={opening || opened}>
              <div className="hand text-[1.15rem] text-burgundy leading-tight text-left">
                for Julian
                <div className="mt-2 space-y-[7px]">
                  <div className="h-px bg-brown/30" />
                  <div className="h-px bg-brown/30 w-4/5" />
                  <div className="h-px bg-brown/30 w-3/5" />
                </div>
              </div>
            </Envelope>
          </div>
          <span className="hand text-3xl text-brown block -mt-1 border-b border-dashed border-brown/40 pb-0.5 mx-auto w-fit">
            open this
          </span>
        </button>
      </div>
    </section>
  );
}
