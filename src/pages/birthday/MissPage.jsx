import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Music2, Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import CandleCake from "../../components/birthday/CandleCake";
import MemoryGallery from "../../components/birthday/MemoryGallery";
import OriginStory from "../../components/birthday/OriginStory";
import { storyChapters, storyByline, wishLetter } from "../../data/birthday";
import song1 from "../../assets/song/song1.mp3";

const petals = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  delay: (i % 7) * 0.8,
  duration: 8 + (i % 5) * 1.3,
  size: 6 + (i % 4) * 3,
  sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 9),
  color: i % 3 === 0 ? "#fda4af" : i % 3 === 1 ? "#f43f5e" : "#93c5fd",
}));

const SectionHeading = ({ kicker, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto mb-12 max-w-2xl text-center"
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
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
  const audioRef = useRef(null);

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
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF9F7] text-zinc-700">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-rose-300/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-300/20 blur-[120px]" />

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
        className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-white/85 text-rose-500 shadow-[0_8px_30px_-10px_rgba(244,63,94,0.35)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-rose-400 hover:text-rose-600"
      >
        {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
      </button>

      {/* Back link */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          to="/happybirthday/ankita"
          className="rounded-full border border-rose-200/80 bg-white/60 px-5 py-2 text-xs font-medium tracking-wide text-zinc-500 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-rose-400 hover:text-rose-600"
        >
          ← Back to Countdown
        </Link>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-rose-300 bg-rose-100/60 shadow-[0_0_30px_-8px_rgba(244,63,94,0.4)]"
        >
          <Sparkles size={32} className="text-rose-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose-500"
        >
          A birthday surprise, just for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-rose-500 via-pink-400 to-sky-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl"
        >
          Happy Birthday, Ankita Ji! 🌸
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="mt-5 inline-block rounded-full border border-rose-300 bg-rose-100/70 px-6 py-2 text-sm font-semibold text-rose-600 backdrop-blur-md"
        >
          Welcome to your 20s! ✨
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
          className="mt-8 max-w-xl rounded-[1.5rem] border border-rose-100 bg-white/80 p-6 text-base leading-relaxed text-zinc-600 shadow-[0_20px_60px_-30px_rgba(244,63,94,0.25)] backdrop-blur-md sm:p-8"
        >
          Hi Ankita Ji! I'm your <span className="font-bold text-rose-500">caring
          person</span> — I created this surprise website just for you to
          celebrate your 20th birthday and honor all the unforgettable memories
          we share.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => document.getElementById("cake")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-rose-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(244,63,94,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-rose-400"
          >
            Blow the Candle 🎂
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-rose-200 bg-white/70 px-8 py-4 text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-rose-400 hover:text-rose-600"
          >
            Our Story 📖
          </button>
        </motion.div>
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
          className="-mt-8 mb-12 text-center text-sm font-medium tracking-wide text-rose-400"
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
              className="relative overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white/85 p-8 shadow-[0_20px_60px_-35px_rgba(244,63,94,0.3)] backdrop-blur-md sm:p-10"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-300 bg-rose-100 text-sm font-bold text-rose-600">
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
                        className="rounded-2xl border border-rose-100 bg-rose-50/60 p-6"
                      >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
                          {side.title}
                        </p>
                        <ul className="space-y-2">
                          {side.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                            >
                              <Heart size={14} className="mt-1 shrink-0 text-rose-500" />
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
          className="relative overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-b from-rose-100/60 to-white p-8 shadow-[0_30px_80px_-40px_rgba(244,63,94,0.35)] backdrop-blur-md sm:p-12"
        >
          <Flower2 size={28} className="mb-6 text-rose-500" />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">
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
          <p className="mt-8 whitespace-pre-line text-sm font-semibold text-rose-600">
            {wishLetter.signature}
          </p>
        </motion.div>
      </section>

      {/* Memories */}
      <MemoryGallery />

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
            One more flower to visit
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#1e3a8a] sm:text-4xl">
            The garden still has petals left
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/gallery"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(244,63,94,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-rose-400 sm:w-auto"
            >
              Explore Full Photo Garden 🌻
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/"
              className="w-full rounded-full border border-rose-200 bg-white/70 px-8 py-4 text-center text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-rose-400 hover:text-rose-600 sm:w-auto"
            >
              Back Home
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MissPage;
