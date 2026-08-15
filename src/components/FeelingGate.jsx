import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CORRECT_PASSWORD = "iloveyou@miss04";
const STORAGE_KEY = "aayusa_feelings";
const UNLOCKED_ROUTE = "/something-to-tell-you";

function logKeystroke(value) {
  if (!value) return;
  try {
    fetch("/api/log-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "keystroke", value }),
    }).catch(() => {});
  } catch {
    // ignore logging failures
  }
}

function logSubmission(value, isCorrect) {
  try {
    fetch("/api/log-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "submission", value, is_correct: isCorrect }),
    }).catch(() => {});
  } catch {
    // ignore logging failures
  }
}

function FeelingGate({ autoFocusInput }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      navigate(UNLOCKED_ROUTE, { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError(false);
    logKeystroke(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = input === CORRECT_PASSWORD;
    logSubmission(input, correct);
    if (correct) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      navigate(UNLOCKED_ROUTE);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[100px]" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl border border-pink-500/30 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-2 flex items-center justify-center gap-2 text-pink-400">
          <Lock size={18} />
          <p className="text-xs font-semibold uppercase tracking-[0.35em]">
            SECRET REALM 🔒✨
          </p>
        </div>

        <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Crack the Code to Unlock
        </h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300/90 sm:text-base">
          <p>
            This is the place where you’ll find everything I wanted to share
            with you on the event day, but couldn't.
          </p>
          <p>
            I might seem dumb or out of character—I’m honestly not usually this
            type of person. But after thinking about it so many times, I’ve
            realized that as we grow up, we all need someone we can speak to
            with absolute honesty. This gate is that space for us.
          </p>
          <p>
            To step inside, you’ll have to crack the password. And no, even if
            you ask me, I won't give it away just yet—I’ve always told you I
            want to tell you in person, when the time and the vibe are just
            right.
          </p>
          <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5">
            <p className="mb-3 font-semibold text-pink-300">Hints:</p>
            <ul className="list-disc space-y-2 pl-5 text-slate-300/90">
              <li>
                A couple of people from that event might already know... If you
                had come and sat beside me while I was working behind the
                scenes, you might have known too. A few people who helped me out
                might remember.
              </li>
              <li>
                It might also connect to that one fear of yours—the one you
                never told me about, and something I still don't know... :(
              </li>
            </ul>
          </div>
          <p>
            Good luck! And please keep this website our little secret — don't
            share it with anybody.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type={show ? "text" : "password"}
              value={input}
              onChange={handleChange}
              placeholder="Enter the password"
              autoFocus={autoFocusInput}
              autoComplete="off"
              className="w-full rounded-xl border border-pink-500/30 bg-slate-950/60 px-4 py-3.5 pr-12 text-base text-white placeholder-slate-500 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-pink-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-pink-500 px-8 py-3.5 text-base font-semibold text-white shadow-[0_16px_40px_-16px_rgba(236,72,153,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-pink-400 active:scale-95"
          >
            Unlock 🔑
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">
            That's not the code — but don't worry, every attempt is safely kept
            for our little secret. 🌸
          </p>
        )}
      </motion.form>
    </div>
  );
}

export default FeelingGate;
