import React from "react";
import { motion } from "framer-motion";
import { Cake, Heart, Sparkles, ArrowRight } from "lucide-react";

const WelcomeTo20s = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF9F7] text-zinc-700">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-300/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-xl shadow-pink-200"
        >
          <Cake size={36} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-pink-500"
        >
          Welcome to your 20s
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-black leading-tight tracking-tight text-[#1e3a8a] sm:text-6xl"
        >
          Happy Birthday
          <br />
          Aayusa Neupane
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mx-auto my-8 h-px w-48 bg-gradient-to-r from-transparent via-pink-400/70 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 text-sm text-zinc-500"
        >
          <Heart size={16} className="text-pink-400" />
          <Sparkles size={16} className="text-amber-400" />
        </motion.div>

        <motion.a
          href="https://aayusaneupane.com.np/"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: "easeOut" }}
          className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-pink-200/60 transition-all duration-300 ease-out hover:-translate-y-1 sm:w-auto"
        >
          Back Home
          <ArrowRight size={16} />
        </motion.a>
      </div>
    </div>
  );
};

export default WelcomeTo20s;
