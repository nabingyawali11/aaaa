import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cake, Heart, Flower2 } from "lucide-react";
import CandleCake from "../components/birthday/CandleCake";

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

const HappyBirthday = () => {
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
          initial={{ y: -40, opacity: 0, rotate: 0 }}
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
            Happy Birthday, Ankita Ji! 🌸
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
            Welcome to your 20s! ✨ Today the world celebrates the day it
            became a little brighter. May this year bring you all the laughter,
            love, and light you've given everyone around you. Here's to you —
            and to every beautiful moment still waiting ahead.
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/gallery"
              className="w-full rounded-full bg-amber-500 px-8 py-3 text-center text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-amber-400 sm:w-auto"
            >
              Visit the Garden
            </Link>
            <Link
              to="/"
              className="w-full rounded-full border border-white/15 px-8 py-3 text-center text-sm font-medium text-slate-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/40 hover:text-white sm:w-auto"
            >
              Back Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Blow out the candle */}
      <CandleCake />
    </div>
  );
};

export default HappyBirthday;
