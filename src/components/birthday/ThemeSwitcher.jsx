import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { MISS_THEMES, useMissTheme } from "./MissTheme";

const ThemeSwitcher = () => {
  const { themeKey, setThemeKey } = useMissTheme();
  const theme = MISS_THEMES[themeKey];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button — top right corner */}
      <motion.button
        type="button"
        aria-label="Change theme color"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:bg-slate-800"
        style={{
          boxShadow: isOpen
            ? `0 0 0 3px rgba(255,255,255,0.6), 0 0 22px 2px ${theme.swatch}`
            : "0 16px 40px -20px rgba(0,0,0,0.35)",
        }}
      >
        <Palette size={20} />
      </motion.button>

      {/* Popup window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-5 top-5 z-50 mt-16 w-64 origin-top-right rounded-2xl border border-white/70 bg-white/95 p-5 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-800">Theme Color</h4>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Pick the mood for this garden
                </p>
              </div>
              <button
                type="button"
                aria-label="Close theme picker"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(MISS_THEMES).map((key) => {
                const t = MISS_THEMES[key];
                const active = key === themeKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setThemeKey(key);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ease-out ${
                      active
                        ? "border-transparent text-zinc-900"
                        : "border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:bg-zinc-50 hover:text-zinc-700"
                    }`}
                    style={{
                      backgroundColor: active ? `${t.swatch}1a` : "transparent",
                      boxShadow: active
                        ? `inset 0 0 0 1px ${t.swatch}`
                        : "none",
                    }}
                  >
                    <span
                      className="h-6 w-6 shrink-0 rounded-full"
                      style={{
                        backgroundColor: t.swatch,
                        boxShadow: active
                          ? `0 0 0 2px #fff, 0 0 12px 1px ${t.swatch}`
                          : "none",
                      }}
                    />
                    <span className="text-sm font-semibold">{t.label}</span>
                    {active && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto flex h-5 w-5 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: t.swatch }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;
