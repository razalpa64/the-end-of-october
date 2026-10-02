import branch from "../assets/branch.jpg";
import posy from "../assets/posy.jpg";
import scatter from "../assets/scatter.jpg";
import { Divider, Sprig, Torn, WaxSeal, Washblob } from "./Art";
import { Write, useInView } from "../hooks";

/** Scene 2 — the letter unfolds, and the plain paper becomes a painted place. */
export default function Letter() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <section id="letter" className="sec bg-parchment py-24 md:py-36 px-4" aria-labelledby="letter-h">
      <Torn color="#EFE4D6" v={0} />

      {/* the illustrated world fades in behind the paper */}
      <div
        className="nopoint absolute inset-0 transition-opacity duration-[3500ms] delay-[1200ms]"
        style={{ opacity: seen ? 1 : 0 }}
        aria-hidden="true"
      >
        <Washblob className="absolute -left-24 top-10 w-[420px] opacity-40" color="#D8A7A0" />
        <Washblob className="absolute -right-24 bottom-10 w-[460px] opacity-35" color="#8C927F" />
        <img src={branch} alt="" loading="lazy" decoding="async" className="mult absolute -left-14 top-0 w-[68%] max-w-[420px] md:w-[34%] rotate-[10deg]" />
        <img src={branch} alt="" loading="lazy" decoding="async" className="mult absolute -right-16 bottom-0 w-[64%] max-w-[420px] md:w-[30%] -rotate-[8deg] -scale-x-100" />
        <img src={scatter} alt="" loading="lazy" decoding="async" className="mult absolute right-0 top-8 w-[46%] max-w-[360px] opacity-80 hidden md:block" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-[640px]">
        <div className={`unfold paper relative px-7 pt-14 pb-16 md:px-16 md:pt-20 md:pb-20 text-center ${seen ? "in" : ""}`}>
          <span className="tape" style={{ left: "10%", top: -12, rotate: "-8deg" }} />
          <span className="tape sage" style={{ right: "8%", top: -10, rotate: "6deg" }} />
          <span className="crease" style={{ top: "33%" }} />
          <span className="crease" style={{ top: "66%" }} />

          <p className="hand text-2xl text-dusty -rotate-2 mb-3">
            <Write show={seen} delay={0.2}>
              dear Julian,
            </Write>
          </p>
          <h2 id="letter-h" className="serif italic font-light text-burgundy text-[2.7rem] md:text-[4.2rem] leading-[1.02]">
            <Write show={seen} delay={0.5} dur={1.4}>
              Happy one month, babe.
            </Write>
          </h2>

          <Divider className="w-40 mx-auto my-8 opacity-70" />

          <p
            className="serif text-brown text-[1.5rem] md:text-[1.8rem] leading-snug rv-still"
            style={{ ["--delay" as string]: "0.9s", opacity: seen ? 1 : 0, transition: "opacity 0.8s ease 0.9s" }}
          >
            September 1 to October 1.
          </p>
          <p
            className="serif text-brown/90 text-[1.25rem] md:text-[1.5rem] leading-relaxed mt-5"
            style={{ opacity: seen ? 1 : 0, transition: "opacity 0.8s ease 1.3s" }}
          >
            It may only be one month on a calendar...
            <br />
            <span className="italic text-burgundy">but somehow, you made it feel like so much more.</span>
          </p>

          <div
            className="mt-10 flex items-center justify-center gap-3"
            style={{ opacity: seen ? 1 : 0, transition: "opacity 0.8s ease 1.7s" }}
          >
            <WaxSeal className="w-12 h-12 -rotate-12" />
            <span className="hand text-[1.55rem] text-brown/80">— Razal</span>
          </div>

          <Sprig className="nopoint absolute -left-4 bottom-4 w-16 -rotate-[24deg] opacity-80 sway" />
        </div>

        <img
          src={posy}
          alt=""
          loading="lazy"
          decoding="async"
          className="mult nopoint relative z-20 -mt-12 ml-auto mr-2 w-40 md:w-52 rotate-[6deg]"
          style={{ opacity: seen ? 1 : 0, transition: "opacity 0.8s ease 2.0s" }}
        />
        <p
          className="hand text-center text-2xl text-brown/70 -mt-2"
          style={{ opacity: seen ? 1 : 0, transition: "opacity 0.8s ease 2.2s" }}
        >
          keep going, babe ↓
        </p>
      </div>
    </section>
  );
}
