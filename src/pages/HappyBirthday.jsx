import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cake, Heart, Flower2, ArrowRight } from "lucide-react";
import { getNextBirthday, getBirthdayAge } from "../data/birthday";

const balloons = [
  { left: "6%", size: 56, delay: 0, duration: 16, sway: 24 },
  { left: "16%", size: 44, delay: 1.4, duration: 18, sway: 18 },
  { left: "82%", size: 52, delay: 0.8, duration: 15, sway: 22 },
  { left: "70%", size: 40, delay: 2.2, duration: 19, sway: 16 },
  { left: "46%", size: 60, delay: 3.0, duration: 17, sway: 26 },
  { left: "91%", size: 38, delay: 4.1, duration: 20, sway: 14 },
];

const BALLOON_COLORS = ["#f59e0b", "#fb7185", "#eab308", "#f472b6", "#fbbf24"];

const confetti = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: (i % 8) * 0.7,
  duration: 5 + (i % 5) * 1.1,
  rotate: (i % 360) * 2,
  color: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#fb7185" : "#fbbf24",
  width: 6 + (i % 3) * 3,
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

const HappyBirthday = () => {
  const navigate = useNavigate();
  const [target] = useState(() => getNextBirthday());
  const [timeLeft, setTimeLeft] = useState(() => getNextBirthday() - Date.now());
  const [reached, setReached] = useState(false);

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

  const days = Math.floor(timeLeft / 86400000);
  const hours = Math.floor((timeLeft % 86400000) / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[120px]" />

      {/* Confetti */}
      {confetti.map((piece, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute top-[-5%] rounded-sm"
          style={{
            left: piece.left,
            width: piece.width,
            height: piece.width * 1.4,
            backgroundColor: piece.color,
          }}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: piece.rotate }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: b.left, bottom: "-15%" }}
          animate={{ y: [0, -1150], x: [0, b.sway, -b.sway, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2 + (i % 3) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="relative rounded-[50%]"
              style={{
                width: b.size,
                height: b.size * 1.2,
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), transparent 45%), linear-gradient(135deg, ${
                  BALLOON_COLORS[i % BALLOON_COLORS.length]
                }, ${BALLOON_COLORS[i % BALLOON_COLORS.length]}99)`,
                boxShadow: `0 0 40px -8px ${
                  BALLOON_COLORS[i % BALLOON_COLORS.length]
                }66`,
              }}
            >
              <div
                className="absolute bottom-[-7px] left-1/2 h-0 w-0 -translate-x-1/2"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: `8px solid ${
                    BALLOON_COLORS[i % BALLOON_COLORS.length]
                  }`,
                }}
              />
            </div>
            <div className="mx-auto h-28 w-px bg-gradient-to-b from-white/25 to-transparent" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main card */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_40px_120px_-60px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-12"
        >
          <motion.div
            animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10"
          >
            <Cake size={36} className="text-amber-400" />
          </motion.div>

          <AnimatePresence mode="wait">
            {reached ? (
              <motion.div
                key="reached"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400"
                >
                  A little something for you
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
                  className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
                >
                  Happy Birthday to you, Aayusa! 🌸
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  className="mx-auto my-8 h-px w-40 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
                />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.7, ease: "easeOut" }}
                  className="mx-auto max-w-md text-base leading-relaxed text-slate-300"
                >
                  Today you turn {age}. The day has finally come — and a special
                  surprise has been waiting just for you.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400"
                >
                  <Heart size={16} className="text-rose-400" />
                  <span>Made with love by your Caring Person · Tech Lead</span>
                  <Flower2 size={16} className="text-amber-400" />
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => navigate("/happybirthday/ankita/miss")}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.25, duration: 0.6, ease: "easeOut" }}
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-amber-400 sm:w-auto"
                >
                  Open Your Surprise 🌸
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="counting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">
                  Something special is blooming
                </p>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Counting down to Aayusa's {age}th Birthday 🎂
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                  The garden is counting down to the day a little more sunshine
                  enters the world. The surprise unlocks right here.
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default HappyBirthday;
