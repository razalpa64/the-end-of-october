import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Torn, Sprig } from "./Art";
import { CupIcon, FlowerFull, HeadphonesIcon, HeartIcon, MoonIcon, NoteIcon, NotebookIcon, PhoneIcon, StarIcon } from "./Icons";
import { Reveal } from "../hooks";

type Item = {
  key: string;
  label: string;
  icon: ReactNode;
  msg: string;
  m: [string, string, string]; // mobile x, y, width
  d: [string, string, string]; // desktop x, y, width
  rot?: string;
};

const ITEMS: Item[] = [
  { key: "phone", label: "the phone", icon: <PhoneIcon />, msg: "Somehow, I started checking my phone hoping it was you.", m: ["2%", "0%", "21%"], d: ["5%", "6%", "11%"], rot: "-4deg" },
  { key: "moon", label: "the moon", icon: <MoonIcon />, msg: "Some nights feel different because you're the person I want to talk to before sleeping.", m: ["39%", "0%", "20%"], d: ["80%", "4%", "11%"] },
  { key: "star", label: "a star", icon: <StarIcon />, msg: "Out of all the people in the world, somehow I found you. I still can't get over that.", m: ["75%", "2%", "19%"], d: ["68%", "27%", "9%"], rot: "8deg" },
  { key: "flower", label: "the flower", icon: <FlowerFull />, msg: "You made ordinary days feel a little softer.", m: ["-2%", "25%", "19%"], d: ["19%", "29%", "11%"] },
  { key: "note", label: "a little note", icon: <NoteIcon />, msg: "Note to self: tell her you care. Again. Even if you already did today.", m: ["80%", "22%", "19%"], d: ["85%", "29%", "11%"] },
  { key: "heart", label: "the heart", icon: <HeartIcon />, msg: "You became part of my thoughts without even asking.", m: ["79%", "50%", "19%"], d: ["72%", "56%", "10%"], rot: "-6deg" },
  { key: "cup", label: "the cup", icon: <CupIcon />, msg: "Even the most boring cup of tea feels nicer when I'm texting you at the same time.", m: ["3%", "77%", "21%"], d: ["4%", "52%", "11%"] },
  { key: "notebook", label: "the notebook", icon: <NotebookIcon />, msg: "There are so many tiny things that happen during the day that I immediately want to tell you.", m: ["38%", "77%", "21%"], d: ["19%", "71%", "11%"] },
  { key: "headphones", label: "the headphones", icon: <HeadphonesIcon />, msg: "Songs sound different now. A lot of them remind me of you, and I haven't even told you which ones.", m: ["74%", "77%", "21%"], d: ["85%", "58%", "11%"] },
];

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><g fill='none' stroke='%23f6f0e7' stroke-opacity='.05' stroke-width='1.4'><path d='M0 20 C80 12 140 30 220 20 S340 10 400 22'/><path d='M0 52 C60 60 150 44 230 54 S350 62 400 50'/><path d='M0 88 C90 80 130 96 210 88 S330 80 400 92'/></g></svg>\")";

/** Scene 3 — a warm desk, lit by one lamp. Touch the little things. */
export default function Desk() {
  const [active, setActive] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const cur = ITEMS.find((i) => i.key === active);

  const pick = (k: string) => {
    setActive(k);
    setSeen((s) => new Set(s).add(k));
  };

  return (
    <section
      id="little-things"
      className="sec py-24 md:py-32 px-4"
      style={{ background: "#4B3430", backgroundImage: GRAIN }}
      aria-labelledby="desk-h"
    >
      <Torn color="#4B3430" v={1} />

      <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
        <Reveal as="p" className="hand text-2xl text-blush">
          the second page
        </Reveal>
        <Reveal as="h2" delay={0.3} className="serif italic font-light text-ivory text-[2.3rem] md:text-[3.6rem] leading-[1.05] mt-2" >
          <span id="desk-h">What you changed without realizing it</span>
        </Reveal>
        <Reveal as="p" delay={0.8} className="serif text-ivory/70 text-lg mt-4">
          {seen.size === 0 ? "Touch the little things on my desk." : `${seen.size} of ${ITEMS.length} found.`}
        </Reveal>
      </div>

      <Reveal mode="still" dur={2.4} className="relative mx-auto w-full max-w-[440px] md:max-w-[1100px] aspect-[360/560] md:aspect-[1100/640]">
        {/* the sheet everything is gathered around */}
        <div
          className="paper absolute z-[1] left-[15%] top-[19%] w-[70%] h-[56%] md:left-[31%] md:top-[6%] md:w-[38%] md:h-[88%] flex flex-col items-center justify-center text-center px-4 md:px-10 rotate-[-1.2deg]"
          aria-live="polite"
        >
          <span className="tape" style={{ left: "50%", top: -12, marginLeft: -43, rotate: "-3deg" }} />
          {cur ? (
            <div key={cur.key} className="msg">
              <p className="serif uppercase tracking-[0.22em] text-[.68rem] md:text-xs text-burgundy/80 mb-3">{cur.label}</p>
              <p className="hand text-brown text-[1.4rem] md:text-[2.15rem] leading-[1.2] md:leading-[1.18]">{cur.msg}</p>
            </div>
          ) : (
            <div className="msg">
              <p className="hand text-dusty text-xl md:text-3xl -rotate-2">babe,</p>
              <p className="serif italic text-brown text-[1.25rem] md:text-[1.9rem] leading-snug mt-2">
                there are things you did
                <br />
                without even knowing.
              </p>
              <p className="hand text-brown/60 text-lg md:text-2xl mt-5">pick something up ↴</p>
            </div>
          )}
          <Sprig className="nopoint absolute right-1 bottom-1 w-10 md:w-16 opacity-70 rotate-[20deg]" />
        </div>

        {ITEMS.map((it) => {
          const st = {
            "--mx": it.m[0],
            "--my": it.m[1],
            "--mw": it.m[2],
            "--dx": it.d[0],
            "--dy": it.d[1],
            "--dw": it.d[2],
            "--rot": it.rot ?? "0deg",
            zIndex: active === it.key ? 4 : 2,
          } as CSSProperties;
          return (
            <button
              key={it.key}
              className={`obj ${active === it.key ? "active" : ""}`}
              style={st}
              onClick={() => pick(it.key)}
              onMouseEnter={() => pick(it.key)}
              onFocus={() => pick(it.key)}
              aria-label={`${it.label}: tap to read`}
            >
              {it.icon}
              {!seen.has(it.key) && (
                <span className="absolute -right-0.5 top-1 text-gold text-sm hint-pulse" aria-hidden="true">
                  ✦
                </span>
              )}
            </button>
          );
        })}

        <Sprig className="nopoint absolute left-[2%] top-[52%] w-[14%] md:left-[2%] md:top-[82%] md:w-[7%] opacity-80 -rotate-12 sway" leaf="#8C927F" />
      </Reveal>
    </section>
  );
}
