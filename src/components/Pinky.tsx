import pinky from "../assets/pinky.jpg";
import scatter from "../assets/scatter.jpg";
import { Sprig, Squiggle, StarShape, Torn, Washblob } from "./Art";
import { Reveal, Write, useInView } from "../hooks";

const maskL = "linear-gradient(90deg,#000 50%,transparent 57%)";
const maskR = "linear-gradient(90deg,transparent 43%,#000 50%)";

/** Scene 6 — two hands, two sleeves, one small promise. */
export default function Pinky() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  const tr = "transform 1.2s cubic-bezier(0.3, 0.1, 0.2, 1) 0.1s, opacity 1s ease 0.1s";
  return (
    <section id="promise" className="sec py-28 md:py-40 px-4" style={{ background: "#F6F0E7" }} aria-labelledby="promise-h">
      <Torn color="#F6F0E7" v={1} />

      <Washblob className="nopoint absolute -left-28 top-[30%] w-[380px] md:w-[560px] opacity-40" color="#8E9AA6" />
      <Washblob className="nopoint absolute -right-28 top-[34%] w-[380px] md:w-[560px] opacity-45" color="#D8A7A0" />
      <img src={scatter} alt="" loading="lazy" decoding="async" className="mult nopoint absolute right-0 bottom-6 w-[52%] max-w-[360px] opacity-80" />
      <Sprig className="nopoint absolute left-3 top-24 w-16 md:w-24 -rotate-12 sway" />
      <StarShape className="nopoint absolute right-[10%] top-28 w-8 md:w-11 rotate-12 opacity-80" />

      <div className="relative z-10 max-w-[980px] mx-auto text-center">
        <Reveal as="p" className="hand text-2xl text-dusty">
          the fourth page
        </Reveal>
        <h2 id="promise-h" className="serif italic font-light text-brown text-[2.5rem] md:text-[4.6rem] leading-[1.05] mt-2">
          <Write dur={1.4}>Some promises don't need witnesses.</Write>
        </h2>
        <Reveal as="p" delay={0.4} dur={1.0} className="serif text-brown/80 text-[1.4rem] md:text-[2rem] mt-5">
          Just two people who mean them.
        </Reveal>

        <div ref={ref} className="relative mt-8 md:mt-10 -mx-[18%] md:mx-0 mult" style={{ isolation: "isolate" }}>
          <img
            src={pinky}
            alt="Two hands, one in a blue-gray sleeve and one in a dusty rose sleeve, hooking their little fingers together in a pinky promise."
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
            style={{
              WebkitMaskImage: maskL,
              maskImage: maskL,
              transform: seen ? "none" : "translateX(-11%)",
              opacity: seen ? 1 : 0,
              transition: tr,
            }}
          />
          <img
            src={pinky}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="block w-full h-auto absolute inset-0"
            style={{
              WebkitMaskImage: maskR,
              maskImage: maskR,
              transform: seen ? "none" : "translateX(11%)",
              opacity: seen ? 1 : 0,
              transition: tr,
            }}
          />
        </div>

        <div className="mt-6 md:mt-8">
          <p className="serif italic text-burgundy text-[2.5rem] md:text-[4.4rem] leading-[1.05]">
            <Write delay={0.3} dur={1.4}>
              I promise to keep choosing you.
            </Write>
          </p>
          <Reveal as="p" delay={0.8} dur={1.0} className="hand text-brown/80 text-[1.9rem] md:text-4xl mt-5 -rotate-2">
            even on ordinary days.
          </Reveal>
          <Reveal mode="still" delay={1.1}>
            <Squiggle className="w-40 h-3 mx-auto mt-2" color="#C8A66A" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
