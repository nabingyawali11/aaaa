import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import letterContent from "../utils/developer.font.js";

const LINES_PER_PAGE = 15;

const NavbarFooter = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    document.title = "🌻";
  }, []);

  const allLines = letterContent.split("\n");

  const pages = [];
  for (let i = 0; i < allLines.length; i += LINES_PER_PAGE) {
    pages.push(allLines.slice(i, i + LINES_PER_PAGE));
  }

  const totalPages = pages.length;
  const visibleLines = pages[page];

  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -30 : 30 }),
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#f9a8d4" : "#60a5fa",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 flex flex-col flex-1 w-full">
        <motion.button
          onClick={() => navigate("/")}
          className="self-start mb-6 text-sm tracking-widest uppercase text-yellow-400/60 hover:text-yellow-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← back
        </motion.button>

        {page === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-light text-yellow-400 mb-4 tracking-wide">
              The Feelings I Never Told You
            </h1>
            <div className="w-16 h-px bg-pink-300/60 mb-10" />
          </motion.div>
        )}

        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6 text-base md:text-lg leading-[1.9] tracking-wide whitespace-pre-wrap font-serif"
            >
              {visibleLines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) {
                  return <div key={i} className="h-3" />;
                }

                const isDivider = trimmed.startsWith("---") || trimmed.startsWith("—");
                const isDate = trimmed.match(/^Date/i);
                const isPoem = /^[कयमन]/.test(trimmed);
                const isHeart = trimmed === "❤️";

                if (isDivider) {
                  return (
                    <div key={i} className="flex items-center gap-3 my-6">
                      <div className="flex-1 h-px bg-pink-300/20" />
                      <span className="text-pink-300/40 text-sm">✦</span>
                      <div className="flex-1 h-px bg-pink-300/20" />
                    </div>
                  );
                }

                if (isHeart) {
                  return (
                    <p key={i} className="text-center text-3xl mt-4">{trimmed}</p>
                  );
                }

                if (isDate) {
                  return (
                    <p key={i} className="text-pink-300/80 text-sm tracking-widest uppercase font-sans">
                      {trimmed}
                    </p>
                  );
                }

                if (isPoem) {
                  return (
                    <p key={i} className="text-pink-300/90 text-center text-lg leading-loose">
                      {trimmed}
                    </p>
                  );
                }

                return (
                  <p key={i} className="text-gray-300/90 first-letter:text-yellow-400 first-letter:text-2xl first-letter:font-serif">
                    {trimmed}
                  </p>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="text-sm tracking-widest uppercase text-yellow-400/60 hover:text-yellow-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← previous
          </button>

          <span className="text-xs text-gray-500 tracking-wider font-mono">
            {page + 1} / {totalPages}
          </span>

          {page < totalPages - 1 ? (
            <button
              onClick={goNext}
              className="text-sm tracking-widest uppercase text-yellow-400/60 hover:text-yellow-400 transition-colors"
            >
              next →
            </button>
          ) : (
            <motion.button
              onClick={() => navigate("/")}
              className="text-sm tracking-widest uppercase text-pink-300/80 hover:text-pink-300 transition-colors"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              finish reading 💛
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarFooter;
