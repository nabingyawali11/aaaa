import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useMissTheme } from "./MissTheme";
import bouquet from "../../assets/lily/boquet_transpaernt.png";

const SurpriseGiftSection = () => {
  const { theme } = useMissTheme();
  const [isOpen, setIsOpen] = useState(false);

  const burst = () => {
    const colors = ["#fbbf24", "#f59e0b", "#ec4899", "#f472b6", "#ffffff"];
    confetti({ particleCount: 100, spread: 80, ticks: 240, gravity: 0.9, startVelocity: 45, origin: { x: 0.5, y: 0.45 }, colors });
    confetti({ particleCount: 60, angle: 60, spread: 60, ticks: 200, origin: { x: 0.2, y: 0.6 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 60, ticks: 200, origin: { x: 0.8, y: 0.6 }, colors });
  };

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) burst();
  };

  return (
    <section className="relative flex min-h-[750px] w-full select-none flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Soft ambient background light */}
      <div className={`pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${theme.glowA}`} />
      <div className={`pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full blur-[100px] ${theme.glowB}`} />

      {/* Header */}
      <div className="relative z-10 mx-auto mb-4 max-w-xl text-center">
        <p className={`mb-1 text-xs font-bold uppercase tracking-widest ${theme.headingKicker}`}>
          One more gift
        </p>
        <h2 className={`flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${theme.headingTitle}`}>
          A Little Surprise, Just for You{" "}
          <span className="inline-block animate-bounce">🎁</span>
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Tap the gift box below to unwrap your special bouquet...
        </p>
      </div>

      {/* Interactive composite container */}
      <div className="relative z-10 flex min-h-[520px] w-full max-w-md flex-col items-center justify-end">
        {/* Floating bouquet + horizontal note card */}
        <div
          className={`relative z-20 flex flex-col items-center transition-all duration-1000 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${
            isOpen
              ? "-translate-y-12 scale-100 opacity-100 pointer-events-auto"
              : "pointer-events-none translate-y-24 scale-75 opacity-0"
          }`}
        >
          <img
            src={bouquet}
            alt="Sunflower and Lily Bouquet"
            className="pointer-events-none h-auto w-64 select-none drop-shadow-[0_20px_35px_rgba(251,191,36,0.35)] sm:w-72"
          />

          {/* Horizontal note overlay attached at the handle */}
          <div className="absolute bottom-6 left-1/2 z-30 w-[92%] -translate-x-1/2 max-w-sm sm:w-full">
            {/* Yellow tape header */}
            <div className="absolute -top-3 left-1/2 z-40 -translate-x-1/2 rounded border border-amber-300 bg-amber-200 px-3.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-900 shadow-sm">
              A NOTE FOR YOU
            </div>

            {/* Glassmorphic note box */}
            <div className={`relative overflow-hidden rounded-2xl border px-5 py-4 text-center backdrop-blur-md ${theme.giftCard}`}>
              <div className={`absolute left-0 top-0 h-full w-1.5 ${theme.giftCardAccent}`} />
              <p className="pt-1 font-serif text-xs italic leading-relaxed text-slate-700 sm:text-sm">
                “Like a sunflower, keep shining; like a lily, keep
                blooming—beautifully, naturally, and always in your own way.”
                🌻🌸
              </p>
            </div>
          </div>
        </div>

        {/* 3D realistic gift box */}
        <div
          onClick={toggle}
          className="relative z-10 my-4 flex cursor-pointer flex-col items-center justify-end group"
        >
          {/* Inner glowing light beam when open */}
          <div
            className={`pointer-events-none absolute -top-12 h-32 w-48 rounded-full blur-2xl transition-opacity duration-700 ${
              isOpen ? `animate-pulse opacity-100 ${theme.giftLight}` : "opacity-0"
            }`}
          />

          {/* Realistic box lid with bow */}
          <div
            className={`relative z-30 flex h-12 w-64 origin-top-left items-center justify-center rounded-xl border-b shadow-lg transition-all duration-700 ease-in-out sm:w-72 ${theme.giftLid} ${
              isOpen
                ? "-translate-x-44 -translate-y-4 opacity-80 shadow-2xl"
                : "shadow-md group-hover:-translate-y-1"
            }`}
          >
            {/* Horizontal satin ribbon on lid */}
            <div className="flex h-full w-10 items-center justify-center bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-inner">
              {/* 3D ribbon bow accent */}
              <div className="h-6 w-6 -translate-y-0.5 rounded-full border-2 border-amber-200 bg-amber-400 shadow-md" />
            </div>
          </div>

          {/* Realistic box base */}
          <div className={`relative z-10 -mt-1 flex h-28 w-60 items-center justify-center overflow-hidden rounded-b-3xl border-t sm:h-32 sm:w-68 ${theme.giftBox}`}>
            {/* Vertical gold ribbon */}
            <div className="h-full w-10 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-inner" />
            {/* Glossy reflection stripe */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Action toggle button */}
        <button
          type="button"
          onClick={toggle}
          className={`mt-6 z-20 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-semibold shadow-sm transition-all active:scale-95 sm:text-sm ${theme.giftBtn}`}
        >
          <span>✨</span>
          {isOpen ? "Replay / Close Box" : "Open the Gift Box 🎁"}
        </button>
      </div>
    </section>
  );
};

export default SurpriseGiftSection;
