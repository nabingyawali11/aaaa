import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, Save, RotateCcw, ArrowRight, CheckCircle2 } from "lucide-react";
import { getCustomCountdown, setCustomCountdown, getNextBirthday } from "../../data/birthday";

const toLocalInputValue = (date) => {
  const d = new Date(date);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};

const CountdownSettings = () => {
  const navigate = useNavigate();
  const [custom, setCustom] = useState(() => getCustomCountdown());
  const [value, setValue] = useState(() => toLocalInputValue(custom || getNextBirthday()));
  const [saved, setSaved] = useState(false);

  const flashSaved = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const save = () => {
    if (!value) return;
    setCustomCountdown(new Date(value));
    setCustom(getCustomCountdown());
    flashSaved();
  };

  const reset = () => {
    setCustomCountdown(null);
    setCustom(null);
    setValue(toLocalInputValue(getNextBirthday()));
    flashSaved();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 sm:px-8">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_40px_120px_-60px_rgba(251,191,36,0.15)] backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
            <CalendarClock size={28} className="text-amber-300" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">
            Secret setup
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Countdown Setup ⏳
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Set a custom date &amp; time for the countdown to reach zero. It
            overrides the default birthday moment.
          </p>

          <label
            htmlFor="countdown-datetime"
            className="mt-8 block text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
          >
            Countdown target
          </label>
          <input
            id="countdown-datetime"
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-300 ease-out focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
          />

          <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-left text-xs leading-relaxed text-slate-400">
            <span className="text-slate-500">Currently targeting: </span>
            <span className="font-semibold text-amber-200">
              {custom
                ? custom.toLocaleString()
                : `Default — next Aug 16, 10:01 PM (${getNextBirthday().toLocaleString()})`}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={save}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-400"
            >
              <Save size={16} />
              Save Target
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-200"
            >
              <RotateCcw size={16} />
              Reset to Default
            </button>
          </div>

          {saved && (
            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs font-medium text-emerald-300">
              <CheckCircle2 size={14} />
              Countdown target updated!
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/happybirthday")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-200"
          >
            View the Countdown
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownSettings;
