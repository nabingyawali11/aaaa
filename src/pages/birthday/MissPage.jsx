import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Music2, Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import CandleCake from "../../components/birthday/CandleCake";
import MemoryGallery from "../../components/birthday/MemoryGallery";
import OriginStory from "../../components/birthday/OriginStory";
import { storyChapters, storyByline, wishLetter } from "../../data/birthday";
import song1 from "../../assets/song/song1.mp3";
import heroBackdrop from "../../assets/cartoon2.png";
import cartoon1 from "../../assets/cartoon1.png";

const petals = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  delay: (i % 7) * 0.8,
  duration: 8 + (i % 5) * 1.3,
  size: 6 + (i % 4) * 3,
  sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 9),
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
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">
      {kicker}
    </p>
    <h2 className="text-3xl font-black tracking-tight text-[#1e3a8a] sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{subtitle}</p>
    )}
  </motion.div>
);

const MissPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const audioRef = useRef(null);

  const FRAME_IMAGES = [heroBackdrop, cartoon1];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAME_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(song1);
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-zinc-700">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-100/50 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-100/50 blur-[120px]" />

      {/* Falling petals */}
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute top-[-5%] rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.3,
            backgroundColor: p.color,
          }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", x: [0, p.sway, -p.sway, 0], opacity: [0, 0.6, 0.6, 0], rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
        />
      ))}

      {/* Music toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label="Toggle music"
        className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-pink-200/50 bg-white/70 text-pink-500 shadow-[0_8px_30px_-10px_rgba(236,72,153,0.25)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600"
      >
        {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
      </button>

      {/* Back link */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          to="/happybirthday/ankita"
          className="rounded-full border border-pink-200/50 bg-white/60 px-5 py-2 text-xs font-medium tracking-wide text-zinc-500 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600"
        >
          ← Back to Countdown
        </Link>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 md:px-12">
        {/* Warmth pulse behind character */}
        <div className="pointer-events-none absolute right-[8%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-pink-200/40 blur-[110px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="relative z-20 w-full space-y-6 text-center md:text-left lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-pink-200/50 bg-pink-100/60 shadow-[0_0_30px_-8px_rgba(236,72,153,0.3)] md:mx-0 mx-auto"
            >
              <Sparkles size={32} className="text-pink-500" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-pink-500"
            >
              A birthday surprise, just for you
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
              className="text-4xl font-bold leading-tight tracking-tight text-pink-600 sm:text-5xl lg:text-6xl"
            >
              Happy Birthday, <br className="hidden sm:inline" />
              <span className="inline-block text-sky-500 drop-shadow-sm">Ankita Ji! 🌸</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="mt-5 inline-block rounded-full border border-pink-200/50 bg-pink-100/70 px-6 py-2 text-sm font-semibold text-pink-600 backdrop-blur-md"
            >
              Welcome to your 20s! ✨
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-base leading-relaxed text-zinc-700"
            >
              Hi Ankita Ji! I'm one of your's friend which you tag name as your <span className="font-bold text-pink-600">bestfriend</span> — I created this surprise website just for you to
              celebrate your 20th birthday and honor all the unforgettable
              memories we share.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start"
            >
              <button
                type="button"
                onClick={() => document.getElementById("cake")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full bg-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(236,72,153,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-pink-400"
              >
                Blow the Candle 🎂
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full border border-pink-200/50 bg-white/70 px-8 py-4 text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600"
              >
                Our Story 📖
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — physical photo frame */}
        <div className="z-10 flex h-full items-center justify-center lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[430px]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative -rotate-1 rounded-md bg-white p-3 pb-12 shadow-[0_40px_80px_-20px_rgba(244,114,182,0.35)] ring-1 ring-pink-200/70 sm:p-4 sm:pb-14"
            >
              {/* Washi tape corners */}
              <div className="pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rotate-2 rounded-sm bg-sky-200/70 shadow-sm" />
              <div className="pointer-events-none absolute -top-2 left-5 z-20 h-6 w-16 -rotate-12 rounded-sm bg-pink-200/80 shadow-sm" />

              {/* Inner mat + photo */}
              <div className="relative h-[44vh] max-h-[560px] min-h-[260px] overflow-hidden rounded-sm border border-pink-100/80 bg-pink-50/40 sm:h-[52vh] sm:max-h-[600px]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={frameIndex}
                    src={FRAME_IMAGES[frameIndex]}
                    alt="Cartoon portrait for Ankita Ji"
                    className="absolute inset-0 h-full w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>

              {/* Caption */}
              <p className="mt-3 text-center font-serif text-sm italic text-zinc-500 sm:mt-4 sm:text-base">
                Our First meet and first image duo together 🌸
              </p>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Candle */}
      <div id="cake" className="scroll-mt-24">
        <CandleCake />
      </div>

      {/* Story */}
      <section id="story" className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:px-8">
        <SectionHeading
          kicker="Our Story"
          title="Three chapters, one garden"
          subtitle="A quiet editor, a vibrant host — and how two different worlds slowly became one."
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="-mt-8 mb-12 text-center text-sm font-medium tracking-wide text-pink-400"
        >
          Written with love by {storyByline.author} for his {storyByline.for} 📖
        </motion.p>
        <div className="space-y-10">
          <OriginStory />
          {storyChapters.slice(1).map((chapter, index) => (
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[1.75rem] border border-pink-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-md sm:p-10"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-200/50 bg-pink-100 text-sm font-bold text-pink-600">
                  {chapter.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-zinc-800 sm:text-2xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
                    {chapter.period}
                  </p>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-[1.75] text-zinc-600">
                {chapter.body}
              </p>

              {chapter.contrast && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[chapter.contrast.introvert, chapter.contrast.extrovert].map(
                    (side) => (
                      <div
                        key={side.title}
                        className="rounded-2xl border border-pink-200/50 bg-pink-50/60 p-6"
                      >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">
                          {side.title}
                        </p>
                        <ul className="space-y-2">
                          {side.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                            >
                              <Heart size={14} className="mt-1 shrink-0 text-pink-500" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Letter */}
      <section id="letter" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-6 py-20 sm:px-8">
        <SectionHeading
          kicker="A Letter"
          title="Written, just for her"
          subtitle="Every word below is true, and none of it is said lightly."
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-pink-200/50 bg-gradient-to-b from-pink-100/50 to-white p-8 shadow-xl backdrop-blur-md sm:p-12"
        >
          <Flower2 size={28} className="mb-6 text-pink-500" />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            {wishLetter.salutation}
          </p>
          <div className="space-y-5">
            {wishLetter.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-[1.9] text-zinc-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 whitespace-pre-line text-sm font-semibold text-pink-600">
            {wishLetter.signature}
          </p>
        </motion.div>
      </section>

      {/* Memories */}
      <MemoryGallery />

      {/* Final CTA */}
      <section className="relative z-10 overflow-hidden px-6 py-28 sm:px-8">
        <img
          src={heroBackdrop}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">
              One more flower to visit
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#1e3a8a] sm:text-4xl">
              The garden still has petals left
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/gallery"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(236,72,153,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-pink-400 sm:w-auto"
              >
                Explore Full Photo Garden 🌻
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/"
                className="w-full rounded-full border border-pink-200/50 bg-white/70 px-8 py-4 text-center text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pink-400 hover:text-pink-600 sm:w-auto"
              >
                Back Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MissPage;
