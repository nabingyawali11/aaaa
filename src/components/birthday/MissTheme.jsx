import React, { createContext, useContext, useEffect, useState } from "react";

export const MISS_THEMES = {
  lily: {
    key: "lily",
    label: "Lily",
    swatch: "#ec4899",
    pageBg: "bg-white",
    petalColors: ["#fbcfe8", "#f472b6", "#bfdbfe"],
    glowA: "bg-pink-100/50",
    glowB: "bg-sky-100/50",
    heroGlow: "bg-pink-200/40",
    heroFrame: "shadow-[0_40px_80px_-20px_rgba(244,114,182,0.35)] ring-1 ring-pink-200/70",
    heroTapeA: "bg-sky-200/70",
    heroTapeB: "bg-pink-200/80",
    heroMat: "border-pink-100/80 bg-pink-50/40",
    primaryBtn:
      "bg-pink-500 text-white shadow-[0_16px_40px_-16px_rgba(236,72,153,0.5)] hover:bg-pink-400",
    secondaryBtn:
      "border-pink-200/50 bg-white/70 text-zinc-500 hover:border-pink-400 hover:text-pink-600",
    musicBtn:
      "border-pink-200/50 bg-white/70 text-pink-500 shadow-[0_8px_30px_-10px_rgba(236,72,153,0.25)] backdrop-blur-md hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600",
    backLink:
      "border-pink-200/50 bg-white/60 text-zinc-500 hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600",
    heroBadge:
      "border-pink-200/50 bg-pink-100/60 shadow-[0_0_30px_-8px_rgba(236,72,153,0.3)]",
    heroIcon: "text-pink-500",
    heroKicker: "text-pink-500",
    heroTitle: "text-pink-600",
    heroTitleHighlight: "text-sky-500",
    heroWelcome:
      "border-pink-200/50 bg-pink-100/70 text-pink-600 backdrop-blur-md",
    heroBodyAccent: "text-pink-600",
    headingKicker: "text-pink-500",
    headingTitle: "text-[#1e3a8a]",
    storyByline: "text-pink-400",
    storyCard: "border-pink-200/50 bg-white/70 shadow-xl",
    storyBadge: "border-pink-200/50 bg-pink-100 text-pink-600",
    storyContrastBox: "border-pink-200/50 bg-pink-50/60",
    storyContrastKicker: "text-pink-500",
    storyIcon: "text-pink-500",
    letterCard:
      "border-white/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(236,72,153,0.3)]",
    letterIcon: "text-pink-500",
    letterSalutation: "text-pink-500",
    letterSignature: "text-pink-600",
    ctaKicker: "text-pink-500",
    ctaTitle: "text-[#1e3a8a]",
    gateBackdrop: "bg-pink-100/60",
    gateCard:
      "border-pink-200/50 bg-white/90 shadow-[0_40px_120px_-40px_rgba(236,72,153,0.4)]",
    gateClose:
      "border-pink-200/50 bg-pink-50 text-zinc-500 hover:bg-pink-100 hover:text-pink-600",
    gateIconBox: "border-pink-200/50 bg-pink-100",
    gateInput:
      "border-pink-200/50 bg-pink-50/60 focus:border-pink-400 focus:ring-pink-400/30",
    gateError: "text-pink-500",
    gateHint: "border-pink-200/50 bg-pink-50/60 text-pink-600",
    cakeGlowA: "bg-pink-200/50",
    cakeGlowB: "bg-sky-200/40",
    cakeListeningDot: "bg-pink-400",
    cakeListeningText: "text-pink-600",
    cakeDeniedText: "text-pink-500",
    cakeTapBtn:
      "border-pink-400/50 bg-pink-500/10 text-pink-600 hover:bg-pink-500/20",
    cakeModalBackdrop: "bg-pink-100/50",
    cakeModalCard:
      "border-pink-200/50 bg-white/95 shadow-[0_40px_120px_-40px_rgba(236,72,153,0.3)]",
    cakeModalClose:
      "border-pink-200/50 bg-pink-50 text-zinc-500 hover:bg-pink-100 hover:text-pink-600",
    cakeModalIconBox: "border-pink-200/50 bg-pink-100 text-pink-500",
    cakeSongActive:
      "border-pink-400 bg-pink-500/15 shadow-[0_0_24px_-6px_rgba(236,72,153,0.4)]",
    cakeSongInactive:
      "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/60",
    cakeSongNumActive: "bg-pink-500 text-white",
    cakeSongNumInactive: "bg-pink-100 text-pink-400",
    cakeSongTitleActive: "text-pink-600",
    cakeDefaultBtn:
      "border-pink-200/50 bg-pink-50 text-zinc-500 hover:bg-pink-100 hover:text-pink-600",
    cakePlayerBar:
      "border-pink-200/50 bg-white/80 shadow-[0_20px_50px_-20px_rgba(236,72,153,0.3)]",
    cakeMuteActive: "border-pink-400/40 bg-pink-500/15 text-pink-600",
    cakeMuteIdle:
      "border-pink-200/50 bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-600",
    cakePlayerClose:
      "border-pink-200/50 bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-600",
    originHighlight: "text-pink-600",
    letterForm:
      "border-pink-200/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(236,72,153,0.3)]",
    letterCheck: "border-pink-200/50 bg-white/60 text-pink-500",
    letterEditBtn:
      "border-pink-200/50 bg-white/60 text-pink-600 hover:border-pink-400 hover:text-pink-500",
    letterTextarea:
      "border-pink-200/50 bg-white/60 focus:border-pink-400 focus:ring-pink-400/30",
    giftBox:
      "border-pink-300/40 bg-gradient-to-b from-pink-500 via-rose-500 to-pink-600 shadow-[0_20px_40px_rgba(244,114,182,0.4)]",
    giftLid:
      "border-pink-600/40 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500",
    giftLight: "bg-pink-300/50",
    giftCard:
      "border-pink-100/90 bg-white/95 shadow-[0_15px_35px_-5px_rgba(244,114,182,0.3)]",
    giftCardAccent: "bg-gradient-to-b from-pink-400 to-amber-400",
    giftBtn:
      "border-pink-200/50 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700",
  },
  navy: {
    key: "navy",
    label: "Navy Blue",
    swatch: "#1e3a8a",
    pageBg: "bg-[#f4f7ff]",
    petalColors: ["#bfdbfe", "#93c5fd", "#a5b4fc"],
    glowA: "bg-blue-100/50",
    glowB: "bg-indigo-100/50",
    heroGlow: "bg-blue-200/40",
    heroFrame: "shadow-[0_40px_80px_-20px_rgba(30,58,138,0.35)] ring-1 ring-blue-200/70",
    heroTapeA: "bg-sky-200/70",
    heroTapeB: "bg-blue-200/80",
    heroMat: "border-blue-100/80 bg-blue-50/40",
    primaryBtn:
      "bg-[#1e3a8a] text-white shadow-[0_16px_40px_-16px_rgba(30,58,138,0.5)] hover:bg-[#1e40af]",
    secondaryBtn:
      "border-blue-200/50 bg-white/70 text-zinc-500 hover:border-blue-400 hover:text-blue-700",
    musicBtn:
      "border-blue-200/50 bg-white/70 text-blue-700 shadow-[0_8px_30px_-10px_rgba(30,58,138,0.25)] backdrop-blur-md hover:-translate-y-1 hover:border-blue-400 hover:text-blue-800",
    backLink:
      "border-blue-200/50 bg-white/60 text-zinc-500 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-700",
    heroBadge:
      "border-blue-200/50 bg-blue-100/60 shadow-[0_0_30px_-8px_rgba(30,58,138,0.3)]",
    heroIcon: "text-blue-700",
    heroKicker: "text-blue-600",
    heroTitle: "text-blue-800",
    heroTitleHighlight: "text-blue-600",
    heroWelcome:
      "border-blue-200/50 bg-blue-100/70 text-blue-700 backdrop-blur-md",
    heroBodyAccent: "text-blue-700",
    headingKicker: "text-blue-600",
    headingTitle: "text-[#1e3a8a]",
    storyByline: "text-blue-500",
    storyCard: "border-blue-200/50 bg-white/70 shadow-xl",
    storyBadge: "border-blue-200/50 bg-blue-100 text-blue-700",
    storyContrastBox: "border-blue-200/50 bg-blue-50/60",
    storyContrastKicker: "text-blue-600",
    storyIcon: "text-blue-600",
    letterCard:
      "border-white/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(30,58,138,0.3)]",
    letterIcon: "text-blue-700",
    letterSalutation: "text-blue-600",
    letterSignature: "text-blue-700",
    ctaKicker: "text-blue-600",
    ctaTitle: "text-[#1e3a8a]",
    gateBackdrop: "bg-blue-100/60",
    gateCard:
      "border-blue-200/50 bg-white/90 shadow-[0_40px_120px_-40px_rgba(30,58,138,0.4)]",
    gateClose:
      "border-blue-200/50 bg-blue-50 text-zinc-500 hover:bg-blue-100 hover:text-blue-700",
    gateIconBox: "border-blue-200/50 bg-blue-100",
    gateInput:
      "border-blue-200/50 bg-blue-50/60 focus:border-blue-400 focus:ring-blue-400/30",
    gateError: "text-blue-600",
    gateHint: "border-blue-200/50 bg-blue-50/60 text-blue-700",
    cakeGlowA: "bg-blue-200/50",
    cakeGlowB: "bg-indigo-200/40",
    cakeListeningDot: "bg-blue-400",
    cakeListeningText: "text-blue-700",
    cakeDeniedText: "text-blue-600",
    cakeTapBtn:
      "border-blue-400/50 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20",
    cakeModalBackdrop: "bg-blue-100/50",
    cakeModalCard:
      "border-blue-200/50 bg-white/95 shadow-[0_40px_120px_-40px_rgba(30,58,138,0.3)]",
    cakeModalClose:
      "border-blue-200/50 bg-blue-50 text-zinc-500 hover:bg-blue-100 hover:text-blue-700",
    cakeModalIconBox: "border-blue-200/50 bg-blue-100 text-blue-700",
    cakeSongActive:
      "border-blue-400 bg-blue-500/15 shadow-[0_0_24px_-6px_rgba(30,58,138,0.4)]",
    cakeSongInactive:
      "border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50/60",
    cakeSongNumActive: "bg-[#1e3a8a] text-white",
    cakeSongNumInactive: "bg-blue-100 text-blue-400",
    cakeSongTitleActive: "text-blue-700",
    cakeDefaultBtn:
      "border-blue-200/50 bg-blue-50 text-zinc-500 hover:bg-blue-100 hover:text-blue-700",
    cakePlayerBar:
      "border-blue-200/50 bg-white/80 shadow-[0_20px_50px_-20px_rgba(30,58,138,0.3)]",
    cakeMuteActive: "border-blue-400/40 bg-blue-500/15 text-blue-700",
    cakeMuteIdle:
      "border-blue-200/50 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
    cakePlayerClose:
      "border-blue-200/50 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700",
    originHighlight: "text-blue-700",
    letterForm:
      "border-blue-200/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(30,58,138,0.3)]",
    letterCheck: "border-blue-200/50 bg-white/60 text-blue-700",
    letterEditBtn:
      "border-blue-200/50 bg-white/60 text-blue-700 hover:border-blue-400 hover:text-blue-600",
    letterTextarea:
      "border-blue-200/50 bg-white/60 focus:border-blue-400 focus:ring-blue-400/30",
    giftBox:
      "border-blue-300/40 bg-gradient-to-b from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] shadow-[0_20px_40px_rgba(30,58,138,0.4)]",
    giftLid:
      "border-blue-700/40 bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#1e40af]",
    giftLight: "bg-blue-300/50",
    giftCard:
      "border-blue-100/90 bg-white/95 shadow-[0_15px_35px_-5px_rgba(30,58,138,0.3)]",
    giftCardAccent: "bg-gradient-to-b from-blue-500 to-sky-400",
    giftBtn:
      "border-blue-200/50 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800",
  },
  sunflower: {
    key: "sunflower",
    label: "Sunflower",
    swatch: "#f59e0b",
    pageBg: "bg-[#fff9ef]",
    petalColors: ["#fde68a", "#fbbf24", "#fcd34d"],
    glowA: "bg-amber-100/50",
    glowB: "bg-yellow-100/50",
    heroGlow: "bg-amber-200/40",
    heroFrame: "shadow-[0_40px_80px_-20px_rgba(245,158,11,0.35)] ring-1 ring-amber-200/70",
    heroTapeA: "bg-sky-200/70",
    heroTapeB: "bg-amber-200/80",
    heroMat: "border-amber-100/80 bg-amber-50/40",
    primaryBtn:
      "bg-amber-500 text-slate-900 shadow-[0_16px_40px_-16px_rgba(245,158,11,0.5)] hover:bg-amber-400",
    secondaryBtn:
      "border-amber-200/50 bg-white/70 text-zinc-500 hover:border-amber-400 hover:text-amber-700",
    musicBtn:
      "border-amber-200/50 bg-white/70 text-amber-600 shadow-[0_8px_30px_-10px_rgba(245,158,11,0.25)] backdrop-blur-md hover:-translate-y-1 hover:border-amber-400 hover:text-amber-700",
    backLink:
      "border-amber-200/50 bg-white/60 text-zinc-500 hover:-translate-y-1 hover:border-amber-400 hover:text-amber-700",
    heroBadge:
      "border-amber-200/50 bg-amber-100/60 shadow-[0_0_30px_-8px_rgba(245,158,11,0.3)]",
    heroIcon: "text-amber-500",
    heroKicker: "text-amber-600",
    heroTitle: "text-amber-700",
    heroTitleHighlight: "text-amber-500",
    heroWelcome:
      "border-amber-200/50 bg-amber-100/70 text-amber-700 backdrop-blur-md",
    heroBodyAccent: "text-amber-700",
    headingKicker: "text-amber-600",
    headingTitle: "text-amber-700",
    storyByline: "text-amber-500",
    storyCard: "border-amber-200/50 bg-white/70 shadow-xl",
    storyBadge: "border-amber-200/50 bg-amber-100 text-amber-700",
    storyContrastBox: "border-amber-200/50 bg-amber-50/60",
    storyContrastKicker: "text-amber-600",
    storyIcon: "text-amber-600",
    letterCard:
      "border-white/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(245,158,11,0.3)]",
    letterIcon: "text-amber-600",
    letterSalutation: "text-amber-600",
    letterSignature: "text-amber-700",
    ctaKicker: "text-amber-600",
    ctaTitle: "text-amber-700",
    gateBackdrop: "bg-amber-100/60",
    gateCard:
      "border-amber-200/50 bg-white/90 shadow-[0_40px_120px_-40px_rgba(245,158,11,0.4)]",
    gateClose:
      "border-amber-200/50 bg-amber-50 text-zinc-500 hover:bg-amber-100 hover:text-amber-700",
    gateIconBox: "border-amber-200/50 bg-amber-100",
    gateInput:
      "border-amber-200/50 bg-amber-50/60 focus:border-amber-400 focus:ring-amber-400/30",
    gateError: "text-amber-600",
    gateHint: "border-amber-200/50 bg-amber-50/60 text-amber-700",
    cakeGlowA: "bg-amber-200/50",
    cakeGlowB: "bg-yellow-200/40",
    cakeListeningDot: "bg-amber-400",
    cakeListeningText: "text-amber-700",
    cakeDeniedText: "text-amber-600",
    cakeTapBtn:
      "border-amber-400/50 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20",
    cakeModalBackdrop: "bg-amber-100/50",
    cakeModalCard:
      "border-amber-200/50 bg-white/95 shadow-[0_40px_120px_-40px_rgba(245,158,11,0.3)]",
    cakeModalClose:
      "border-amber-200/50 bg-amber-50 text-zinc-500 hover:bg-amber-100 hover:text-amber-700",
    cakeModalIconBox: "border-amber-200/50 bg-amber-100 text-amber-600",
    cakeSongActive:
      "border-amber-400 bg-amber-500/15 shadow-[0_0_24px_-6px_rgba(245,158,11,0.4)]",
    cakeSongInactive:
      "border-amber-100 bg-white hover:border-amber-300 hover:bg-amber-50/60",
    cakeSongNumActive: "bg-amber-500 text-slate-900",
    cakeSongNumInactive: "bg-amber-100 text-amber-500",
    cakeSongTitleActive: "text-amber-700",
    cakeDefaultBtn:
      "border-amber-200/50 bg-amber-50 text-zinc-500 hover:bg-amber-100 hover:text-amber-700",
    cakePlayerBar:
      "border-amber-200/50 bg-white/80 shadow-[0_20px_50px_-20px_rgba(245,158,11,0.3)]",
    cakeMuteActive: "border-amber-400/40 bg-amber-500/15 text-amber-700",
    cakeMuteIdle:
      "border-amber-200/50 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700",
    cakePlayerClose:
      "border-amber-200/50 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700",
    originHighlight: "text-amber-600",
    letterForm:
      "border-amber-200/50 bg-white/30 shadow-[0_20px_60px_-20px_rgba(245,158,11,0.3)]",
    letterCheck: "border-amber-200/50 bg-white/60 text-amber-600",
    letterEditBtn:
      "border-amber-200/50 bg-white/60 text-amber-700 hover:border-amber-400 hover:text-amber-600",
    letterTextarea:
      "border-amber-200/50 bg-white/60 focus:border-amber-400 focus:ring-amber-400/30",
    giftBox:
      "border-amber-300/40 bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-600 shadow-[0_20px_40px_rgba(245,158,11,0.4)]",
    giftLid:
      "border-amber-600/40 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500",
    giftLight: "bg-amber-300/50",
    giftCard:
      "border-amber-100/90 bg-white/95 shadow-[0_15px_35px_-5px_rgba(245,158,11,0.3)]",
    giftCardAccent: "bg-gradient-to-b from-amber-400 to-yellow-500",
    giftBtn:
      "border-amber-200/50 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:text-amber-900",
  },
};

const STORAGE_KEY = "aayusa_miss_theme";

const MissThemeContext = createContext({
  themeKey: "navy",
  setThemeKey: () => {},
  theme: MISS_THEMES.navy,
});

export function MissThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return MISS_THEMES[saved] ? saved : "navy";
    } catch {
      return "navy";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, themeKey);
    } catch {}
  }, [themeKey]);

  return (
    <MissThemeContext.Provider
      value={{
        themeKey,
        setThemeKey,
        theme: MISS_THEMES[themeKey] || MISS_THEMES.navy,
      }}
    >
      {children}
    </MissThemeContext.Provider>
  );
}

export function useMissTheme() {
  return useContext(MissThemeContext);
}
