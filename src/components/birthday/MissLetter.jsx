import React, { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Send, Check, Flower2 } from "lucide-react";
import { useMissTheme } from "./MissTheme";

const STORAGE_KEY = "aayusa_birthday_letter";

const SectionHeading = ({ theme, kicker, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto mb-12 max-w-2xl text-center"
  >
    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${theme.headingKicker}`}>
      {kicker}
    </p>
    <h2 className={`text-3xl font-black tracking-tight ${theme.headingTitle} sm:text-4xl`}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{subtitle}</p>
    )}
  </motion.div>
);

const MissLetter = () => {
  const { theme } = useMissTheme();
  const [letter, setLetter] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || "";
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
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {}
    setSaving(true);
    setSaveError("");
    try {
      const response = await fetch("/api/save-birthday-letter", {
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
    <section id="reply-letter" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-6 py-20 sm:px-8">
      <SectionHeading
        theme={theme}
        kicker="One More Letter"
        title="Write your reply to me"
        subtitle="A page where your words become part of this garden — tell me what you couldn't say out loud."
      />

      <motion.form
        onSubmit={sealLetter}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-[2rem] p-8 backdrop-blur-xl sm:p-12 ${theme.letterForm}`}
      >
        <div className={`mb-5 flex items-center gap-3 ${theme.letterSalutation}`}>
          <Flower2 size={20} />
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
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${theme.letterCheck}`}
            >
              <Check size={28} />
            </motion.span>
            <p className="text-lg font-bold text-zinc-800">Sealed with care 💌</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              Your letter is safely kept and sent to me — only you can ever
              rewrite it. It now blooms in this garden forever.
            </p>
            <button
              type="button"
              onClick={rewrite}
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 ${theme.letterEditBtn}`}
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
              placeholder="Write your reply here... no rushing, no editing. Just your heart on this page."
              className={`min-h-[240px] w-full resize-y rounded-2xl p-5 text-base leading-relaxed text-zinc-700 placeholder:text-zinc-400 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 ${theme.letterTextarea}`}
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              {saveError ? (
                <span className="text-xs text-rose-500">{saveError}</span>
              ) : (
                <span className="text-xs tabular-nums text-zinc-400">
                  {letter.length}/2000
                </span>
              )}
              <button
                type="submit"
                disabled={!letter.trim() || saving}
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${theme.primaryBtn}`}
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
};

export default MissLetter;
