import React from "react";
import { Palette } from "lucide-react";
import { MISS_THEMES, useMissTheme } from "./MissTheme";

const ThemeSwitcher = () => {
  const { themeKey, setThemeKey } = useMissTheme();
  const theme = MISS_THEMES[themeKey];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border border-white/70 bg-white/85 px-4 py-2.5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.3)] backdrop-blur-md">
      <Palette size={15} className="text-zinc-500" />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
        {theme.label}
      </span>
      <div className="flex items-center gap-2">
        {Object.keys(MISS_THEMES).map((key) => {
          const t = MISS_THEMES[key];
          const active = key === themeKey;
          return (
            <button
              key={key}
              type="button"
              title={`${t.label} theme`}
              aria-label={`Use ${t.label} theme`}
              aria-pressed={active}
              onClick={() => setThemeKey(key)}
              className={`h-5 w-5 rounded-full transition-all duration-300 ease-out hover:scale-125 ${
                active ? "scale-110" : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor: t.swatch,
                boxShadow: active
                  ? `0 0 0 2px #fff, 0 0 12px 1px ${t.swatch}`
                  : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
