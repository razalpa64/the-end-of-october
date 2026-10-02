import type { CSSProperties } from "react";
import dried from "../assets/dried.jpg";
import scatter from "../assets/scatter.jpg";
import branch from "../assets/branch.jpg";
import { Heart, Sprig, Squiggle, StarShape, Torn, BabyBreath } from "./Art";
import { Reveal, Write } from "../hooks";

type Variant = "lined" | "kraft" | "tag" | "plain" | "env";
type Note = {
  text: string;
  variant: Variant;
  rot: number;
  w: string;
  ml: string;
  dw: string;
  dml: string;
  aside?: string;
  asideSide?: "l" | "r";
};

const NOTES: Note[] = [
  { text: "The little conversations.", variant: "lined", rot: -2.2, w: "76%", ml: "0%", dw: "38%", dml: "6%", aside: "the ones about nothing" },
  { text: "The random jokes.", variant: "kraft", rot: 1.8, w: "60%", ml: "36%", dw: "30%", dml: "56%" },
  { text: "The teasing.", variant: "tag", rot: -3.5, w: "52%", ml: "8%", dw: "26%", dml: "24%", aside: "(you know what you did)", asideSide: "r" },
  { text: "The stupid things that somehow become funny.", variant: "plain", rot: 2.4, w: "80%", ml: "18%", dw: "40%", dml: "50%" },
  { text: "The moments when we stay talking longer than we planned.", variant: "env", rot: -1.4, w: "86%", ml: "4%", dw: "44%", dml: "4%", aside: "just five more minutes", asideSide: "r" },
  { text: "The way I wait for your message.", variant: "kraft", rot: 2.6, w: "66%", ml: "30%", dw: "32%", dml: "58%" },
  { text: "The way one small message from you can completely change my mood.", variant: "lined", rot: -1.8, w: "84%", ml: "2%", dw: "46%", dml: "18%", aside: "it really can", asideSide: "r" },
];

function Paper({ n }: { n: Note }) {
  const big = n.text.length > 50;
  const common = `serif italic text-brown ${big ? "text-[1.5rem] md:text-[1.9rem]" : "text-[1.7rem] md:text-[2.2rem]"} leading-[1.15]`;
  switch (n.variant) {
    case "lined":
      return (
        <div className="paper ruled relative pl-12 pr-5 py-7" style={{ backgroundColor: "#FAF5EC" }}>
          <span className="absolute left-9 top-0 bottom-0 w-px bg-dusty/50" />
          <span className="absolute left-3 top-6 w-3 h-3 rounded-full bg-parchment border border-brown/30" />
          <span className="absolute left-3 bottom-6 w-3 h-3 rounded-full bg-parchment border border-brown/30" />
          <p className="hand text-brown text-[1.7rem] md:text-[2.1rem] leading-[2.2rem] md:leading-[2.2rem]" style={{ lineHeight: "2.2rem" }}>
            {n.text}
          </p>
        </div>
      );
    case "kraft":
      return (
        <div
          className="relative px-6 py-8"
          style={{
            background: "#D9C3A5",
            clipPath: "polygon(0 3%,6% 0,14% 4%,26% 1%,40% 4%,55% 0,70% 3%,84% 0,100% 3%,98% 40%,100% 70%,97% 100%,80% 97%,62% 100%,44% 96%,28% 100%,10% 97%,0 100%,2% 60%)",
          }}
        >
          <p className={common}>{n.text}</p>
        </div>
      );
    case "tag":
      return (
        <div
          className="relative pl-11 pr-5 py-6"
          style={{ background: "#EFE4D6", clipPath: "polygon(14% 0,100% 0,100% 100%,14% 100%,0 50%)", border: "1px solid #4B3430" }}
        >
          <span className="absolute left-[8%] top-1/2 -mt-2 w-4 h-4 rounded-full bg-burgundy/80" />
          <p className="hand text-burgundy text-[1.8rem] md:text-[2.2rem] leading-none">{n.text}</p>
        </div>
      );
    case "env":
      return (
        <div className="paper relative px-6 pt-14 pb-7" style={{ backgroundColor: "#EADBC6" }}>
          <svg className="absolute inset-x-0 top-0 w-full h-12" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 L100 46 L200 0" fill="#E2D0B8" stroke="#4B3430" strokeOpacity=".5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-1/2 -ml-5 top-5 w-10 h-10">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="#7B3F46" />
              <path d="M50 70 C28 54 26 40 36 34 C43 30 48 35 50 40 C52 35 57 30 64 34 C74 40 72 54 50 70Z" fill="#F6F0E7" fillOpacity=".35" />
            </svg>
          </span>
          <p className={common}>{n.text}</p>
        </div>
      );
    default:
      return (
        <div className="paper relative px-6 py-8" style={{ backgroundColor: "#FAF5EC" }}>
          <span className="tape gold" style={{ left: "50%", top: -12, marginLeft: -43, rotate: "-2deg" }} />
          <p className={common}>{n.text}</p>
        </div>
      );
  }
}

/** Scene 4 — a scrapbook page. Nothing here is a photograph; everything is a feeling. */
export default function SmallThings() {
  return (
    <section
      id="small-things"
      className="sec py-28 md:py-40 px-5"
      style={{ background: "#EFE4D6", backgroundImage: "radial-gradient(rgba(75,52,48,.13) 1px, transparent 1.3px)", backgroundSize: "24px 24px" }}
      aria-labelledby="small-h"
    >
      <Torn color="#EFE4D6" v={2} />

      {/* margin decorations */}
      <img src={branch} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-24 top-[6%] w-[70%] max-w-[460px] rotate-[18deg] opacity-90" />
      <img src={dried} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -right-16 top-[30%] w-[52%] max-w-[300px] rotate-[14deg]" />
      <img src={scatter} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-10 top-[52%] w-[60%] max-w-[360px] -rotate-6 opacity-90" />
      <img src={dried} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-16 top-[72%] w-[44%] max-w-[260px] -rotate-[24deg] -scale-x-100 hidden md:block" />
      <BabyBreath className="nopoint absolute right-2 top-[60%] w-20 md:w-28 rotate-12 sway" />
      <StarShape className="nopoint absolute right-[12%] top-[14%] w-8 md:w-12 rotate-12 opacity-80" />

      <div className="relative z-10 max-w-[1040px] mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <Reveal as="p" className="hand text-2xl text-dusty">
            the third page
          </Reveal>
          <Reveal as="h2" delay={0.3} className="serif italic font-light text-burgundy text-[3rem] md:text-[5rem] leading-none mt-1">
            <span id="small-h">The small things</span>
          </Reveal>
          <Reveal mode="still" delay={0.3}>
            <Squiggle className="w-44 h-3 mx-auto mt-4" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 md:gap-4">
          {NOTES.map((n, i) => (
            <Reveal
              key={n.text}
              dur={0.9}
              className="scrap"
              style={{ "--w": n.w, "--ml": n.ml, "--dw": n.dw, "--dml": n.dml, "--r": `${n.rot}deg` } as CSSProperties}
            >
              <Paper n={n} />
              {n.aside && (
                <span
                  className={`hand absolute text-brown/65 text-xl md:text-2xl whitespace-nowrap ${n.asideSide === "r" ? "left-[6%] -bottom-8" : "right-[4%] -bottom-8"}`}
                  style={{ rotate: `${(i % 2 ? 1 : -1) * 2}deg` }}
                >
                  {n.aside}
                </span>
              )}
              {i % 3 === 1 && <Sprig className="nopoint absolute -right-5 -top-8 w-14 rotate-[30deg] sway" />}
              {i % 3 === 2 && <Heart className="nopoint absolute -left-4 -top-5 w-9 -rotate-12" />}
            </Reveal>
          ))}
        </div>

        {/* the quiet turn */}
        <div className="text-center mt-28 md:mt-40 max-w-xl mx-auto">
          <Reveal as="p" dur={1.1} className="serif text-brown/85 text-[1.45rem] md:text-[2rem] leading-snug">
            The tiny things probably don't look important from the outside.
          </Reveal>
          <Reveal as="p" delay={0.4} dur={1.1} className="hand text-dusty text-[2.4rem] md:text-5xl mt-8">
            But to me...
          </Reveal>
          <p className="serif italic text-burgundy text-[3.4rem] md:text-[6rem] leading-none mt-4">
            <Write delay={0.8} dur={1.4}>
              They became ours.
            </Write>
          </p>
          <Reveal mode="pop" delay={0.3} className="mt-8">
            <Heart className="w-14 mx-auto" fill="#B97878" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
