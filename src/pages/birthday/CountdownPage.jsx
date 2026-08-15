import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Music, Music2, ArrowRight, Sparkles } from "lucide-react";
import { getNextBirthday, getBirthdayAge } from "../../data/birthday";
import happyBirthdaySong from "../../assets/song/happy-birthday-song.mp3";

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  delay: (i % 6) * 0.9,
  duration: 7 + (i % 4) * 1.4,
  size: 3 + (i % 3) * 2,
  sway: (i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 8),
}));

const pad = (value) => String(value).padStart(2, "0");

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-24 sm:w-24">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-3xl font-bold tabular-nums text-white sm:text-4xl"
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/5" />
    </div>
    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80 sm:text-xs">
      {label}
    </span>
  </div>
);

const CountdownPage = ({ forceReveal = false }) => {
  const navigate = useNavigate();
  const [target, setTarget] = useState(() => getNextBirthday());
  const [timeLeft, setTimeLeft] = useState(() => getNextBirthday() - Date.now());
  const [reached, setReached] = useState(forceReveal);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const age = getBirthdayAge();

  useEffect(() => {
    const timer = window.setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setReached(true);
        setTimeLeft(0);
        window.clearInterval(timer);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  useEffect(() => {
    audioRef.current = new Audio(happyBirthdaySong);
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const days = Math.floor(timeLeft / 86400000);
  const hours = Math.floor((timeLeft % 86400000) / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[120px]" />

      {/* Falling particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute top-[-5%] rounded-full bg-amber-300"
          style={{ left: p.left, width: p.size, height: p.size }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "105vh", x: [0, p.sway, -p.sway, 0], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
        />
      ))}

      {/* Music toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label="Toggle music"
        className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-amber-300 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400/40 hover:text-amber-200"
      >
        {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
      </button>

      {/* Main card */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_40px_120px_-60px_rgba(251,191,36,0.15)] backdrop-blur-xl sm:p-12"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
            <Sparkles size={32} className="text-amber-300" />
          </div>

          {!reached && (
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                Something special is blooming
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                Counting down to Ankita Ji's 20th Birthday 🎂
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                The garden is counting down to the day a little more sunshine
                enters the world.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <TimeBox value={days} label="Days" />
                <span className="text-2xl font-bold text-amber-300/60 sm:text-3xl">:</span>
                <TimeBox value={hours} label="Hours" />
                <span className="text-2xl font-bold text-amber-300/60 sm:text-3xl">:</span>
                <TimeBox value={minutes} label="Minutes" />
                <span className="text-2xl font-bold text-amber-300/60 sm:text-3xl">:</span>
                <TimeBox value={seconds} label="Seconds" />
              </div>
            </>
          )}

          {/* Reveal / unlock */}
          <AnimatePresence mode="wait">
            {reached ? (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-10"
              >
                <div className="mx-auto mb-6 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-6 py-3">
                  <span className="text-4xl font-black tracking-tight text-amber-300">
                    20 Years
                  </span>
                </div>
                <p className="mb-2 text-base leading-relaxed text-slate-300">
                  Happy Birthday Aayusa Neupane! Today you turns 20! 🌸
                </p>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  A special surprise website crafted with love by your Caring
                  Person ·
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/happybirthday/ankita/miss")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-amber-400 sm:w-auto"
                >
                  Enter Ankita Ji's Realm 🌸
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownPage;
