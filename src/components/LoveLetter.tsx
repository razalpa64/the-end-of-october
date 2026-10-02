import type { CSSProperties } from "react";
import dried from "../assets/dried.jpg";
import scatter from "../assets/scatter.jpg";
import branch from "../assets/branch.jpg";
import { Heart, Sprig, Squiggle, Torn, WaxSeal } from "./Art";
import { Reveal, Write } from "../hooks";

const STANZAS: string[][] = [
  ["Julian,"],
  ["I don't think you fully understand how grateful I am that you came into my life."],
  ["Out of all the people I could have met,", "somehow I found you.", "And somehow,", "you became someone incredibly important to me."],
  ["You became the person I want to tell things to.", "The person I look for.", "The person I miss.", "The person whose happiness matters to me."],
  [
    "I care about the little things you don't think anyone notices.",
    "Your moods.",
    "Your little jokes.",
    "Your messages.",
    "Your random thoughts.",
    "The way you make me laugh.",
    "The way you make ordinary conversations feel special.",
  ],
  ["I don't love some perfect version of you.", "I love you as you are."],
  ["And I want you to know that even though we're far apart,", "my care for you is very real."],
  [
    "Thank you for giving me a place in your life.",
    "Thank you for staying.",
    "Thank you for laughing with me.",
    "Thank you for letting me know you.",
    "Thank you for becoming my babe.",
  ],
  ["And most importantly...", "thank you for coming into my life."],
];

/** Scene 10 — the letter itself. Ruled paper, a margin, and nothing but the truth. */
export default function LoveLetter() {
  const ruledStyle: CSSProperties = {
    backgroundColor: "#FAF5EC",
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--lh) - 1px), rgba(123,63,70,.16) calc(var(--lh) - 1px), rgba(123,63,70,.16) var(--lh))",
  };
  return (
    <section id="love" className="sec py-28 md:py-40 px-3 md:px-6" style={{ background: "#F6F0E7" }} aria-labelledby="love-h">
      <Torn color="#F6F0E7" v={1} />

      <img src={dried} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-10 top-24 w-[36%] max-w-[260px] rotate-[18deg] opacity-80" />
      <img src={branch} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -right-24 top-[34%] w-[56%] max-w-[420px] rotate-[10deg] opacity-80 hidden md:block" />
      <img src={scatter} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-6 top-[58%] w-[48%] max-w-[340px] opacity-70 hidden md:block" />

      <div className="relative z-10 max-w-[720px] mx-auto">
        <div className="text-center mb-12 md:mb-16 px-2">
          <Reveal as="p" className="hand text-2xl text-dusty">
            the last pages
          </Reveal>
          <h2 id="love-h" className="serif italic font-light text-burgundy text-[2.6rem] md:text-[4.4rem] leading-[1.05] mt-2">
            <Write dur={1.4}>One thing I need you to know.</Write>
          </h2>
        </div>

        <Reveal
          mode="still"
          dur={1.0}
          className="paper relative pl-[3.4rem] pr-5 pt-[2.2rem] pb-[2.2rem] md:pl-[5.2rem] md:pr-12 md:pt-[2.6rem] md:pb-[2.6rem] [--lh:2.2rem] md:[--lh:2.6rem]"
          style={ruledStyle}
        >
          <span className="absolute left-[2.5rem] md:left-[4rem] top-0 bottom-0 w-px bg-dusty/55" aria-hidden="true" />
          <span className="tape" style={{ left: "12%", top: -12, rotate: "-5deg" }} />
          <span className="tape sage" style={{ right: "10%", top: -10, rotate: "4deg" }} />
          <span className="absolute left-3 md:left-5 top-[20%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-parchment border border-brown/30" aria-hidden="true" />
          <span className="absolute left-3 md:left-5 top-[50%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-parchment border border-brown/30" aria-hidden="true" />
          <span className="absolute left-3 md:left-5 top-[80%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-parchment border border-brown/30" aria-hidden="true" />

          {STANZAS.map((lines, si) => {
            const last = si === STANZAS.length - 1;
            return (
              <Reveal
                key={si}
                dur={1.0}
                threshold={0.2}
                className={`hand text-[1.5rem] md:text-[2rem] leading-[var(--lh)] mb-[var(--lh)] last:mb-0 ${si === 0 ? "text-dusty" : last ? "text-burgundy" : "text-brown"}`}
                style={{ transform: undefined }}
              >
                {lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </Reveal>
            );
          })}

          <WaxSeal className="absolute right-3 -bottom-7 w-14 h-14 rotate-12" />
        </Reveal>

        {/* the pause, and then the line */}
        <div className="relative text-center mt-32 md:mt-48 pb-10">
          <Sprig className="nopoint absolute left-0 top-0 w-20 md:w-28 -rotate-12 sway opacity-80" />
          <Sprig className="nopoint absolute right-0 top-6 w-16 md:w-24 rotate-[200deg] sway opacity-70" />
          <p className="hand font-semibold text-burgundy leading-[1.02] text-[4.2rem] md:text-[8rem]" style={{ textWrap: "balance" } as CSSProperties}>
            <Write dur={1.4} delay={0.2} threshold={0.4}>
              I love you,
            </Write>
            <br />
            <Write dur={1.4} delay={1.2} threshold={0.4}>
              Julian.
            </Write>
          </p>
          <Reveal mode="still" delay={1.8} dur={1.0} threshold={0.4}>
            <Squiggle className="w-48 md:w-72 h-3 mx-auto mt-3" color="#B97878" />
          </Reveal>
          <Reveal mode="pop" delay={2.2} threshold={0.4} className="mt-8">
            <Heart className="w-14 mx-auto" fill="#B97878" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
