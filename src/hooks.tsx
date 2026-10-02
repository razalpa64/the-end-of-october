import { createElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode, RefObject } from "react";

export function useReducedMotion(): boolean {
  const [r, setR] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setR(m.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);
  return r;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.25,
  rootMargin = "0px 0px -8% 0px"
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    // very tall elements can never be 30% visible on a phone — ask for less
    const t = el.offsetHeight > window.innerHeight * 0.8 ? 0.04 : threshold;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: t, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, seen];
}

type RevealProps = {
  children?: ReactNode;
  delay?: number;
  dur?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  show?: boolean;
  /** "rise" = fade + gentle lift, "still" = pure fade, "write" = handwriting wipe, "pop" = bloom in */
  mode?: "rise" | "still" | "write" | "pop";
  threshold?: number;
};

/** One reveal primitive. Fires once, when it scrolls into view (or when `show` flips true). */
export function Reveal({
  children,
  delay = 0,
  dur,
  as = "div",
  className = "",
  style,
  show,
  mode = "rise",
  threshold = 0.3,
}: RevealProps) {
  const [ref, seen] = useInView<HTMLElement>(threshold);
  const on = show ?? seen;
  const base = mode === "write" ? "write" : mode === "still" ? "rv-still" : mode === "pop" ? "pop" : "rv";
  const st = { "--delay": `${delay}s`, ...(dur ? { "--dur": `${dur}s` } : {}), ...style } as CSSProperties;
  return createElement(
    as,
    { ref, className: `${base} ${on ? "in" : ""} ${className}`, style: st },
    children
  );
}

/** Handwriting wipe for short lines; stays block-level friendly. */
export function Write({
  children,
  delay = 0,
  dur = 1.1,
  show,
  className = "",
  style,
  as = "span",
  threshold,
}: {
  children: ReactNode;
  delay?: number;
  dur?: number;
  show?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  threshold?: number;
}) {
  return (
    <Reveal as={as} mode="write" delay={delay} dur={dur} show={show} className={className} style={style} threshold={threshold}>
      {children}
    </Reveal>
  );
}

export function useIsMobile(bp = 900) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < bp);
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return m;
}
