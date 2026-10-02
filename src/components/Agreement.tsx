import { Corner, Divider, Squiggle, Torn, WaxSeal } from "./Art";
import { Reveal, Write } from "../hooks";
import SignaturePad from "./SignaturePad";

function sheetPoly() {
  let s = 5;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const pts: string[] = [];
  for (let x = 0; x <= 100; x += 3) pts.push(`${x}% ${(rnd() * 0.5).toFixed(2)}%`);
  for (let y = 4; y <= 100; y += 5) pts.push(`${(100 - rnd() * 0.5).toFixed(2)}% ${y}%`);
  for (let x = 100; x >= 0; x -= 3) pts.push(`${x}% ${(100 - rnd() * 0.5).toFixed(2)}%`);
  for (let y = 96; y >= 4; y -= 5) pts.push(`${(rnd() * 0.5).toFixed(2)}% ${y}%`);
  return `polygon(${pts.join(",")})`;
}
const POLY = sheetPoly();

const CLAUSES = [
  ["I", "we will talk before we disappear."],
  ["II", "We will not let one bad day erase all the good days."],
  ["III", "We will try to understand before assuming."],
  ["IV", "We will communicate instead of giving up."],
  ["V", "We will remember why we chose each other."],
  ["VI", "We will be patient with each other."],
  ["VII", "And whenever life gets complicated, we will choose a conversation before choosing goodbye."],
];

const WOOD =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='140'><g fill='none' stroke='%23f6f0e7' stroke-opacity='.045' stroke-width='1.4'><path d='M0 22 C90 14 160 34 250 22 S410 12 500 24'/><path d='M0 66 C70 74 170 56 260 68 S420 76 500 62'/><path d='M0 108 C100 100 150 118 240 108 S400 98 500 112'/></g></svg>\")";

/** Scene 9 — an antique agreement between two very unserious people. */
export default function Agreement() {
  return (
    <section
      id="agreement"
      className="sec py-24 md:py-36 px-3 md:px-6"
      style={{ background: "#3A2A27", backgroundImage: WOOD }}
      aria-labelledby="agreement-h"
    >
      <Torn color="#3A2A27" v={0} />

      <Reveal mode="still" dur={2.4} className="relative max-w-[780px] mx-auto" style={{ filter: "drop-shadow(0 26px 22px rgba(0,0,0,.5))" }}>
        <div
          className="relative px-6 pt-16 pb-14 md:px-20 md:pt-24 md:pb-20"
          style={{
            background: "#EDE0CB",
            clipPath: POLY,
            boxShadow: "inset 0 0 70px rgba(139,100,60,.28)",
          }}
        >
          {/* old stains */}
          <span className="absolute -left-10 top-[22%] w-48 h-48 rounded-full opacity-[.13]" style={{ background: "#B58B5A" }} aria-hidden="true" />
          <span className="absolute right-[-3rem] bottom-[26%] w-56 h-40 rounded-full opacity-[.12]" style={{ background: "#9C6B4A" }} aria-hidden="true" />
          <span className="absolute left-[30%] top-[8%] w-24 h-24 rounded-full opacity-[.08]" style={{ background: "#7B3F46" }} aria-hidden="true" />

          {/* borders */}
          <span className="absolute inset-[12px] md:inset-[18px] border border-brown/55 pointer-events-none" aria-hidden="true" />
          <span className="absolute inset-[17px] md:inset-[25px] border border-brown/25 pointer-events-none" aria-hidden="true" />
          <Corner className="absolute left-[8px] top-[8px] w-9 md:w-14" />
          <Corner className="absolute right-[8px] top-[8px] w-9 md:w-14 rotate-90" />
          <Corner className="absolute right-[8px] bottom-[8px] w-9 md:w-14 rotate-180" />
          <Corner className="absolute left-[8px] bottom-[8px] w-9 md:w-14 -rotate-90" />

          <div className="relative text-center">
            <p className="serif text-burgundy/80 tracking-[0.5em] text-[.65rem] md:text-xs uppercase">Be it known</p>
            <h2
              id="agreement-h"
              className="serif font-semibold text-brown uppercase tracking-[0.12em] md:tracking-[0.16em] leading-[1.18] text-[1.7rem] md:text-[2.7rem] mt-4"
            >
              The Non-Break-Up
              <br />
              Agreement
            </h2>
            <Divider className="w-44 md:w-56 mx-auto mt-5 opacity-80" />
            <p className="serif italic text-brown/80 text-[1.1rem] md:text-[1.35rem] mt-4 max-w-sm mx-auto leading-snug">
              A very serious document between two very unserious people.
            </p>
          </div>

          <div className="relative mt-10 md:mt-14 max-w-[34rem] mx-auto">
            <Reveal as="p" className="serif italic text-brown text-[1.35rem] md:text-[1.7rem] leading-snug text-center">
              <span className="float-left serif not-italic text-burgundy text-[4rem] md:text-[5.2rem] leading-[0.78] pr-2 pt-1">W</span>
              e, <span className="font-medium">Razal</span> and <span className="font-medium">Julian</span>, promise that when things become difficult,
            </Reveal>
            <div className="clear-both" />

            <ol className="mt-8 space-y-4 md:space-y-5">
              {CLAUSES.map(([n, t], i) => (
                <Reveal as="li" key={n} delay={0.1 + (i % 2) * 0.1} dur={1.8} className="grid grid-cols-[2.4rem_1fr] md:grid-cols-[3rem_1fr] items-baseline gap-1">
                  <span className="serif text-burgundy/80 text-[.9rem] md:text-base tracking-widest">{n}.</span>
                  <span className="serif text-brown text-[1.25rem] md:text-[1.5rem] leading-[1.3]">{t}</span>
                </Reveal>
              ))}
            </ol>

            <Reveal as="p" delay={0.2} dur={2.2} className="serif italic text-brown/80 text-[1.05rem] md:text-[1.2rem] leading-relaxed mt-9 md:mt-11 border-t border-brown/25 pt-6">
              <span className="text-burgundy not-italic">*</span> This agreement is not a promise that we will never have difficult days.
              <br />
              It is a promise that difficult days will not automatically become the end of us.
            </Reveal>
          </div>

          <div className="relative text-center mt-12 md:mt-16">
            <Reveal as="p" dur={2.2} className="hand text-brown text-[1.85rem] md:text-[2.4rem] leading-[1.3]">
              Because I don't want a relationship
              <br />
              that only survives when everything is easy.
            </Reveal>
            <Reveal as="p" delay={1.2} dur={2.2} className="hand text-burgundy text-[1.95rem] md:text-[2.6rem] leading-[1.3] mt-3">
              I want the kind where we <span className="relative inline-block">learn how to stay.<Squiggle className="absolute left-0 right-0 -bottom-2 w-full h-2" /></span>
            </Reveal>
          </div>

          {/* signatures */}
          <div className="relative mt-14 md:mt-20 grid gap-12 md:grid-cols-2 md:gap-14 items-start">
            <div>
              <p className="serif uppercase tracking-[0.3em] text-[.7rem] text-brown/70 mb-1">Razal</p>
              <div className="relative h-[168px]">
                <p className="font-sign text-brown text-[4.6rem] md:text-[5.6rem] leading-none absolute left-1 bottom-2 -rotate-3 whitespace-nowrap" style={{ color: "#2E3550" }}>
                  <Write dur={2.8} delay={0.4}>
                    Razal
                  </Write>
                </p>
                <WaxSeal className="absolute right-0 -bottom-5 w-14 h-14 -rotate-12 opacity-95" />
              </div>
              <div className="h-px bg-brown/70" />
              <p className="serif italic text-brown/80 text-lg mt-3">01 October 2026</p>
            </div>

            <div>
              <p className="serif uppercase tracking-[0.3em] text-[.7rem] text-brown/70 mb-1">Julian</p>
              <SignaturePad />
              <p className="serif italic text-brown/80 text-lg -mt-[1px] hidden">01 October 2026</p>
              <p className="serif italic text-brown/80 text-lg mt-1">01 October 2026</p>
            </div>
          </div>

          <p className="serif italic text-brown/50 text-sm text-center mt-12">(signing is optional, babe. the promise already counts.)</p>
        </div>
      </Reveal>
    </section>
  );
}
