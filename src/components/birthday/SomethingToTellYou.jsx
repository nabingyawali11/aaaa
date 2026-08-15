import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ChevronDown,
  PenLine,
  Send,
  Check,
} from "lucide-react";

const hearts = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 67) % 100}%`,
  delay: (i % 6) * 0.9,
  duration: 9 + (i % 5) * 1.4,
  size: 8 + (i % 4) * 5,
  sway: (i % 2 === 0 ? 1 : -1) * (18 + (i % 5) * 10),
  color: i % 3 === 0 ? "#fbcfe8" : i % 3 === 1 ? "#f472b6" : "#bfdbfe",
}));

const SectionHeading = ({ kicker, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto mb-12 max-w-2xl text-center"
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
      {kicker}
    </p>
    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-sm leading-relaxed text-slate-400">{subtitle}</p>
    )}
  </motion.div>
);

const LETTER_STORAGE_KEY = "aayusa_letter";

function LetterWriter() {
  const [letter, setLetter] = useState(() => {
    try {
      return window.localStorage.getItem(LETTER_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [sealed, setSealed] = useState(() => letter.length > 0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const sealLetter = async (e) => {
    e.preventDefault();
    const trimmed = letter.trim();
    if (!trimmed) return;
    try {
      window.localStorage.setItem(LETTER_STORAGE_KEY, trimmed);
    } catch {}
    setSaving(true);
    setSaveError("");
    try {
      const response = await fetch("/api/save-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter: trimmed }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Could not save your letter");
      }
      setSealed(true);
    } catch (error) {
      setSaveError(error.message || "Could not save your letter");
    } finally {
      setSaving(false);
    }
  };

  const rewrite = () => setSealed(false);

  return (
    <section id="letter" className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:px-8">
      <SectionHeading
        kicker="The Letter"
        title="What you want to tell me"
        subtitle="This page is yours now — write the words you've kept bottled up. They'll only ever be between us."
      />

      <motion.form
        onSubmit={sealLetter}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-3xl border border-pink-500/20 bg-white/5 p-8 backdrop-blur-xl sm:p-10"
      >
        <div className="mb-5 flex items-center gap-3 text-pink-400">
          <PenLine size={18} />
          <p className="text-sm font-semibold uppercase tracking-[0.25em]">
            Dear Your Caring Person
          </p>
        </div>

        {sealed ? (
          <div className="py-6 text-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-400"
            >
              <Check size={28} />
            </motion.span>
            <p className="text-lg font-bold text-white">Sealed with care 💌</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Your letter is safely kept on this device and sent to me — only
              you can ever rewrite it. I can't wait to read it.
            </p>
            <button
              type="button"
              onClick={rewrite}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-6 py-3 text-sm font-semibold text-pink-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-pink-400/60 hover:text-pink-200"
            >
              <PenLine size={16} />
              Edit my letter
            </button>
          </div>
        ) : (
          <>
            <textarea
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              maxLength={2000}
              placeholder="Write what you want to tell me here... no rushing, no editing. Just your heart on this page."
              className="min-h-[240px] w-full resize-y rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-base leading-relaxed text-slate-200 placeholder:text-slate-500 transition-colors duration-300 ease-out focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              {saveError ? (
                <span className="text-xs text-rose-400">{saveError}</span>
              ) : (
                <span className="text-xs tabular-nums text-slate-500">
                  {letter.length}/2000
                </span>
              )}
              <button
                type="submit"
                disabled={!letter.trim() || saving}
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <Send size={16} className={saving ? "animate-pulse" : ""} />
                {saving ? "Sealing..." : "Seal & Send"}
              </button>
            </div>
          </>
        )}
      </motion.form>
    </section>
  );
}

function SomethingToTellYou({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[130px]" />

      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute top-[-5%] rounded-full"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            backgroundColor: h.color,
          }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", x: [0, h.sway, -h.sway, 0], opacity: [0, 0.6, 0.6, 0], rotate: 360 }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeIn" }}
        />
      ))}

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 text-center md:px-12">
        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 shadow-[0_0_40px_-8px_rgba(236,72,153,0.5)]"
          >
            <Sparkles size={32} className="text-pink-500" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-400"
          >
            A message from your caring person
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            What do you think that special thing I am going to tell
            <span className="text-pink-500">?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
          >
            <p>
              You made it past the lock — so before I tell you, I want to know
              what you think it could be.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-pink-400"
          >
            <span className="h-px w-14 bg-pink-500/40" />
            <Heart size={20} className="animate-pulse" />
            <span className="h-px w-14 bg-pink-500/40" />
          </motion.div>

          <motion.button
            type="button"
            onClick={() =>
              document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" })
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mx-auto flex flex-col items-center gap-1 text-slate-500 transition hover:text-pink-400"
            aria-label="Scroll down"
          >
            <ChevronDown size={22} />
          </motion.button>
        </div>
      </section>

      <LetterWriter />

      {children}
    </div>
  );
}

export default SomethingToTellYou;
