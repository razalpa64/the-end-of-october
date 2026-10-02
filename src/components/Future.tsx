import cats from "../assets/cats.jpg";
import branch from "../assets/branch.jpg";
import dried from "../assets/dried.jpg";
import { BabyBreath, Heart, Squiggle, TinyFlower, Torn } from "./Art";
import { Reveal, Write } from "../hooks";

const HOPES_A = [
  "I hope we keep growing.",
  "I hope we keep laughing.",
  "I hope distance becomes a chapter we eventually close.",
  "I hope one day I don't have to say goodnight through a screen.",
  "I hope I get to sit beside you.",
];
const HOPES_B = ["I hope I get to hold your hand.", "I hope we get to build a quiet little life together."];

function Hope({ text, i }: { text: string; i: number }) {
  return (
    <li className="flex items-end gap-3 md:gap-5" style={{ marginLeft: i % 2 ? "min(8%, 3rem)" : 0 }}>
      <Reveal mode="pop" delay={0.1} className="shrink-0 w-8 md:w-10 -mb-1">
        <TinyFlower className="w-full sway" style={{ animationDelay: `${i * 0.6}s` }} />
      </Reveal>
      <Reveal as="p" delay={0.4} dur={2} className="serif text-brown text-[1.45rem] md:text-[2rem] leading-[1.2] pb-0.5">
        {text}
      </Reveal>
    </li>
  );
}

/** Scene 8 — a few quiet hopes. Nothing is promised; everything is hoped. */
export default function Future() {
  return (
    <section id="future" className="sec py-28 md:py-40 px-5" style={{ background: "#E4E3D3" }} aria-labelledby="future-h">
      <Torn color="#E4E3D3" v={3} />
      <img src={branch} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -right-24 top-10 w-[66%] max-w-[420px] rotate-[8deg] opacity-70 md:opacity-90" />
      <img src={dried} alt="" loading="lazy" decoding="async" className="mult nopoint absolute -left-14 bottom-[8%] w-[40%] max-w-[240px] -rotate-[14deg] opacity-80 hidden md:block" />
      <BabyBreath className="nopoint absolute left-2 top-40 w-20 -rotate-12 sway hidden md:block" />

      <div className="relative z-10 max-w-[760px] mx-auto">
        <Reveal as="p" className="hand text-2xl text-dusty">
          the sixth page
        </Reveal>
        <h2 id="future-h" className="serif italic font-light text-brown text-[2.4rem] md:text-[4rem] leading-[1.08] mt-2">
          <Write dur={1.4}>I don't know exactly what every tomorrow will look like.</Write>
        </h2>
        <Reveal as="p" delay={0.3} dur={1.0} className="hand text-[#5F6652] text-[2.1rem] md:text-5xl mt-8 -rotate-1">
          But I know what I hope for.
        </Reveal>

        <ul className="mt-12 md:mt-16 space-y-8 md:space-y-10">
          {HOPES_A.map((t, i) => (
            <Hope key={t} text={t} i={i} />
          ))}
        </ul>

        <Reveal mode="still" dur={1.2} className="relative my-10 md:my-14">
          <img
            src={cats}
            alt="Two little cats sitting side by side, their tails curling together into a heart."
            loading="lazy"
            decoding="async"
            className="mult w-[112%] -ml-[6%] md:w-full md:ml-0 max-w-[640px] mx-auto h-auto"
          />
          <p className="hand text-brown/60 text-xl md:text-2xl text-center -mt-3 rotate-1">something like this, maybe.</p>
        </Reveal>

        <ul className="space-y-8 md:space-y-10">
          {HOPES_B.map((t, i) => (
            <Hope key={t} text={t} i={i + 5} />
          ))}
        </ul>

        <div className="mt-24 md:mt-32 text-center">
          <Reveal as="p" dur={1.0} className="hand text-brown/80 text-[2.4rem] md:text-5xl">
            But for now...
          </Reveal>
          <p className="serif italic text-burgundy text-[2.7rem] md:text-[4.6rem] leading-[1.05] mt-4">
            <Write delay={0.4} dur={1.5}>
              I just want to keep loving you.
            </Write>
          </p>
          <Reveal mode="pop" delay={0.4} className="mt-8">
            <Heart className="w-12 mx-auto" fill="#B97878" />
          </Reveal>
          <Reveal mode="still" delay={0.8}>
            <Squiggle className="w-32 h-3 mx-auto mt-3 opacity-70" color="#8C927F" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
