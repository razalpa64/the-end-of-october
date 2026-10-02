import { L, Heart, StarShape, Daisy } from "./Art";

const cls = "w-full h-full overflow-visible";

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g transform="rotate(-9 50 50)">
        <g filter="url(#wash)" opacity=".92">
          <rect x="30" y="9" width="42" height="82" rx="8" fill="#8E9AA6" />
          <rect x="34" y="16" width="34" height="64" rx="3" fill="#F6F0E7" />
          <path d="M39 30 h20 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-13 l-5 5 v-5 a3 3 0 0 1 -5 -3 v-7 a3 3 0 0 1 3 -3Z" fill="#D8A7A0" />
        </g>
        <g filter="url(#rough)" {...L} strokeWidth={1.5}>
          <rect x="30" y="9" width="42" height="82" rx="8" />
          <rect x="34" y="16" width="34" height="64" rx="3" />
          <path d="M45 86 h10" />
          <path d="M39 30 h20 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-13 l-5 5 v-5 a3 3 0 0 1 -5 -3 v-7 a3 3 0 0 1 3 -3Z" />
          <path d="M42 36 h14 M42 40 h8" strokeWidth={1} />
          <path d="M76 12 l5 -5 M79 21 l8 -2 M72 5 l1 -5" stroke="#C8A66A" strokeWidth={2} />
        </g>
      </g>
    </svg>
  );
}

export function CupIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g filter="url(#wash)" opacity=".92">
        <ellipse cx="50" cy="80" rx="36" ry="8" fill="#8C927F" />
        <path d="M22 44 h50 c0 24 -9 36 -25 36 c-16 0 -25 -12 -25 -36Z" fill="#F6F0E7" />
        <path d="M24 52 h46 c-1 6 -2 11 -4 15 h-38 c-2 -4 -3 -9 -4 -15Z" fill="#D8A7A0" />
      </g>
      <g filter="url(#rough)" {...L}>
        <ellipse cx="50" cy="80" rx="36" ry="8" />
        <path d="M22 44 h50 c0 24 -9 36 -25 36 c-16 0 -25 -12 -25 -36Z" />
        <path d="M72 50 c15 -3 15 18 -4 21" />
        <path d="M24 52 h46" strokeWidth={1} />
        <path className="steam" d="M40 33 c-7 -6 6 -11 0 -19" strokeWidth={1.3} />
        <path className="steam" style={{ animationDelay: "1.4s" }} d="M55 33 c-7 -6 6 -11 0 -19" strokeWidth={1.3} />
      </g>
    </svg>
  );
}

export function NotebookIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g transform="rotate(6 50 50)">
        <g filter="url(#wash)" opacity=".95">
          <rect x="22" y="10" width="58" height="80" rx="3" fill="#B97878" />
          <rect x="34" y="24" width="36" height="22" fill="#F6F0E7" />
          <path d="M74 10 v52 l5 -6 l5 6 V10Z" fill="#C8A66A" />
        </g>
        <g filter="url(#rough)" {...L}>
          <rect x="22" y="10" width="58" height="80" rx="3" />
          <rect x="34" y="24" width="36" height="22" />
          <path d="M39 31 h26 M39 37 h18" strokeWidth={1} />
          <path d="M29 10 v80" strokeWidth={1.1} />
          <path d="M74 10 v52 l5 -6 l5 6 V10" />
          <path d="M22 78 h58" strokeWidth={1} strokeOpacity=".6" />
        </g>
      </g>
    </svg>
  );
}

export function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g filter="url(#wash)" opacity=".95">
        <ellipse cx="22" cy="64" rx="11" ry="17" fill="#8E9AA6" />
        <ellipse cx="78" cy="64" rx="11" ry="17" fill="#8E9AA6" />
      </g>
      <g filter="url(#rough)" {...L}>
        <path d="M17 52 C14 14 86 14 83 52" strokeWidth={5} stroke="#B97878" strokeOpacity=".7" />
        <path d="M17 52 C14 14 86 14 83 52" />
        <ellipse cx="22" cy="64" rx="11" ry="17" />
        <ellipse cx="78" cy="64" rx="11" ry="17" />
        <path d="M22 56 v16 M78 56 v16" strokeWidth={1} />
        <path d="M89 30 q6 6 0 14 M94 26 q10 10 0 22" strokeWidth={1.1} stroke="#C8A66A" />
      </g>
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g filter="url(#wash)" opacity=".95">
        <path d="M62 10 A40 40 0 1 0 90 66 A32 32 0 1 1 62 10Z" fill="#EBD9A8" />
      </g>
      <g filter="url(#rough)" {...L}>
        <path d="M62 10 A40 40 0 1 0 90 66 A32 32 0 1 1 62 10Z" />
      </g>
      <path d="M78 22 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z" fill="#C8A66A" />
      <circle cx="88" cy="46" r="1.8" fill="#C8A66A" />
    </svg>
  );
}

export function StarIcon() {
  return (
    <div className="w-full h-full">
      <StarShape className={cls} />
    </div>
  );
}

export function FlowerIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g transform="rotate(8 50 60)">
        <g filter="url(#wash)" opacity=".85">
          <path d="M49 68 C38 62 30 66 24 56 C36 54 44 59 49 68Z" fill="#8C927F" />
          <path d="M51 80 C62 72 70 76 78 66 C64 63 55 69 51 80Z" fill="#8C927F" />
        </g>
        <g filter="url(#rough)" {...L}>
          <path d="M50 44 C48 62 54 80 49 98" />
          <path d="M49 68 C38 62 30 66 24 56 C36 54 44 59 49 68Z" />
          <path d="M51 80 C62 72 70 76 78 66 C64 63 55 69 51 80Z" />
        </g>
      </g>
    </svg>
  );
}

/** Flower composed with HTML so the daisy head can be its own svg. */
export function FlowerFull() {
  return (
    <div className="relative w-full h-full">
      <FlowerIcon />
      <div className="absolute left-[16%] top-[-6%] w-[64%] h-[64%] sway">
        <Daisy className={cls} />
      </div>
    </div>
  );
}

export function NoteIcon() {
  return (
    <svg viewBox="0 0 100 100" className={cls} aria-hidden="true">
      <g transform="rotate(-6 50 50)">
        <g filter="url(#wash)" opacity=".95">
          <path d="M20 16 H80 V80 L66 90 H20Z" fill="#F6F0E7" />
          <path d="M66 90 V80 H80Z" fill="#D8C7A8" />
        </g>
        <g filter="url(#rough)" {...L}>
          <path d="M20 16 H80 V80 L66 90 H20Z" />
          <path d="M66 90 V80 H80" />
          <path d="M28 36 h40 M28 46 h30 M28 56 h36" strokeWidth={1} strokeOpacity=".55" />
        </g>
        <text x="28" y="34" fontFamily="Caveat, cursive" fontSize="17" fill="#7B3F46">
          babe ♡
        </text>
        <rect x="38" y="8" width="26" height="12" fill="#D8A7A0" fillOpacity=".7" transform="rotate(4 50 14)" />
      </g>
    </svg>
  );
}

export function HeartIcon() {
  return <Heart className={cls} />;
}
