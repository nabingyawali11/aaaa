import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Music, Music2, Flower2, Heart, Sparkles, X } from "lucide-react";
import CandleCake from "../../components/birthday/CandleCake";
import MemoryGallery from "../../components/birthday/MemoryGallery";
import DuoPhotosSection from "../../components/birthday/DuoPhotosSection";
import OriginStory from "../../components/birthday/OriginStory";
import MissLetter from "../../components/birthday/MissLetter";
import SurpriseGiftSection from "../../components/birthday/SurpriseGiftSection";
import ThemeSwitcher from "../../components/birthday/ThemeSwitcher";
import { MissThemeProvider, useMissTheme } from "../../components/birthday/MissTheme";
import { storyChapters, storyByline, wishLetter } from "../../data/birthday";
import happyBirthdaySong from "../../assets/song/happy-birthday-song.mp3";
import heroBackdrop from "../../assets/cartoon2.png";
import cartoon1 from "../../assets/cartoon1.png";

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

const MissPageContent = () => {
  const { theme } = useMissTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [galleryGateOpen, setGalleryGateOpen] = useState(false);
  const [gatePassword, setGatePassword] = useState("");
  const [gateError, setGateError] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const FRAME_IMAGES = [heroBackdrop, cartoon1];

  const petals = Array.from({ length: 16 }, (_, i) => ({
    left: `${(i * 61) % 100}%`,
    delay: (i % 7) * 0.8,
    duration: 8 + (i % 5) * 1.3,
    size: 6 + (i % 4) * 3,
    sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 9),
    color: theme.petalColors[i % 3],
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAME_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitGate = (e) => {
    e.preventDefault();
    if (gatePassword === "20820804") {
      sessionStorage.setItem("aayusa_auth", "true");
      navigate("/gallery");
    } else {
      setGateError(true);
      setGatePassword("");
    }
  };

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

  useEffect(() => {
    const pauseAmbient = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    };
    window.addEventListener("aayusa:audio-pause-ambient", pauseAmbient);
    return () =>
      window.removeEventListener("aayusa:audio-pause-ambient", pauseAmbient);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(new CustomEvent("aayusa:audio-pause-cake"));
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${theme.pageBg} text-zinc-700`}>
      {/* Ambient glows */}
      <div className={`pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full ${theme.glowA} blur-[120px]`} />
      <div className={`pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full ${theme.glowB} blur-[120px]`} />

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
        className={`fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-out ${theme.musicBtn}`}
      >
        {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
      </button>

      {/* Back link */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          to="/happybirthday/ankita"
          className={`rounded-full px-5 py-2 text-xs font-medium tracking-wide text-zinc-500 backdrop-blur-md transition-all duration-300 ease-out ${theme.backLink}`}
        >
          ← Back to Countdown
        </Link>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 md:px-12">
        {/* Warmth pulse behind character */}
        <div className={`pointer-events-none absolute right-[8%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full ${theme.heroGlow} blur-[110px]`} />

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
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full md:mx-0 mx-auto ${theme.heroBadge}`}
              >
                <Sparkles size={32} className={theme.heroIcon} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`mb-4 text-xs font-semibold uppercase tracking-[0.35em] ${theme.heroKicker}`}
              >
                A birthday surprise, just for you
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
                className={`text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${theme.heroTitle}`}
              >
                Happy Birthday, <br className="hidden sm:inline" />
                <span className={`inline-block drop-shadow-sm ${theme.heroTitleHighlight}`}>Aiyesha Miss! 🌸</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className={`mt-5 inline-block rounded-full px-6 py-2 text-sm font-semibold backdrop-blur-md ${theme.heroWelcome}`}
              >
                Welcome to your 20s! ✨
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
                className="mt-8 text-base leading-relaxed text-zinc-700"
              >
                Hi Neupnae Miss! I'm one of your's friend which you tag name as your <span className={`font-bold ${theme.heroBodyAccent}`}>bestfriend</span> — I created this surprise website just for you to
                celebrate your 20th birthday and honor all the unforgettable
                memories we share, and I have this to give you as a birthday
                gift. Enjoy the gift — for it's everything I am capable of
                giving you. 🌻
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
                  className={`rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 ${theme.primaryBtn}`}
                >
                  Blow the Candle 🎂
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
                  className={`rounded-full px-8 py-4 text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 ${theme.secondaryBtn}`}
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
                className={`relative -rotate-1 rounded-md bg-white p-3 pb-12 sm:p-4 sm:pb-14 ${theme.heroFrame}`}
              >
                {/* Washi tape corners */}
                <div className={`pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rotate-2 rounded-sm shadow-sm ${theme.heroTapeA}`} />
                <div className={`pointer-events-none absolute -top-2 left-5 z-20 h-6 w-16 -rotate-12 rounded-sm shadow-sm ${theme.heroTapeB}`} />

                {/* Inner mat + photo */}
                <div className={`relative h-[44vh] max-h-[560px] min-h-[260px] overflow-hidden rounded-sm sm:h-[52vh] sm:max-h-[600px] ${theme.heroMat}`}>
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={frameIndex}
                      src={FRAME_IMAGES[frameIndex]}
                      alt="Cartoon portrait for Ankita Ji"
                      className="absolute inset-x-0 top-3 h-full w-full object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </div>

                {/* Caption */}
                <p className="mt-3 text-center font-serif text-sm italic text-zinc-500 sm:mt-4 sm:text-base">
                  Our First meet and first duo photograph together 🌸
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

      {/* Memories */}
      <MemoryGallery />

      {/* Story */}
      <section id="story" className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:px-8">
        <SectionHeading
          theme={theme}
          kicker="Our Story"
          title="Three chapters, one garden"
          subtitle="A intovert shy boy, a vibrant host — and how two different worlds slowly became one."
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`-mt-8 mb-12 text-center text-sm font-medium tracking-wide ${theme.storyByline}`}
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
              className={`relative overflow-hidden rounded-[1.75rem] p-8 backdrop-blur-md sm:p-10 ${theme.storyCard}`}
            >
              <div className="mb-4 flex items-center gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${theme.storyBadge}`}>
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
                        className={`rounded-2xl p-6 ${theme.storyContrastBox}`}
                      >
                        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] ${theme.storyContrastKicker}`}>
                          {side.title}
                        </p>
                        <ul className="space-y-2">
                          {side.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                            >
                              <Heart size={14} className={`mt-1 shrink-0 ${theme.storyIcon}`} />
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

      {/* Duo Photo Collection */}
      <DuoPhotosSection />

      {/* Surprise gift box + floating bouquet */}
      <SurpriseGiftSection />

      {/* Letter + Final CTA — shared cartoon2 backdrop */}
      <div className="relative overflow-hidden">
        <img
          src={heroBackdrop}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

        {/* Letter */}
        <section id="letter" className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-6 py-20 sm:px-8">
          <SectionHeading
            theme={theme}
            kicker="A Letter"
            title={wishLetter.subtitle}
            subtitle={wishLetter.tagline}
          />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-[2rem] p-8 backdrop-blur-xl sm:p-12 ${theme.letterCard}`}
          >
            <Flower2 size={28} className={`mb-6 ${theme.letterIcon}`} />
            {wishLetter.salutation && (
              <h3 className={`mb-6 font-serif text-2xl font-bold not-italic sm:text-3xl ${theme.letterSalutation}`}>
                {wishLetter.salutation}
              </h3>
            )}
            <div className="space-y-4">
              {wishLetter.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="border-l-2 border-amber-400/50 py-1 pl-4 font-serif text-base italic leading-[1.9] text-zinc-600 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {wishLetter.signOff && (
              <div className="mt-8 border-t border-pink-200/60 pt-6 text-right">
                <p className={`whitespace-pre-line font-serif text-lg font-bold not-italic sm:text-xl ${theme.letterSignature}`}>
                  {wishLetter.signOff}
                </p>
              </div>
            )}
          </motion.div>
        </section>

        <MissLetter />
      </div>

      {/* Gallery password gate modal */}
      <AnimatePresence>
        {galleryGateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className={`absolute inset-0 backdrop-blur-sm ${theme.gateBackdrop}`}
              onClick={() => setGalleryGateOpen(false)}
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onSubmit={submitGate}
              className={`relative w-full max-w-md overflow-hidden rounded-[2rem] p-8 text-center backdrop-blur-xl sm:p-10 ${theme.gateCard}`}
            >
              <button
                type="button"
                onClick={() => setGalleryGateOpen(false)}
                aria-label="Close"
                className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-out ${theme.gateClose}`}
              >
                <X size={16} />
              </button>
              <span className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${theme.gateIconBox}`}>
                🔒
              </span>
              <h3 className="text-xl font-bold text-zinc-800">
                Enter Password
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                This garden is password protected 🌷
              </p>
              <input
                type="password"
                value={gatePassword}
                onChange={(e) => {
                  setGatePassword(e.target.value);
                  setGateError(false);
                }}
                placeholder="Password"
                autoFocus
                className={`mt-6 w-full rounded-xl px-4 py-3 text-center text-lg text-zinc-800 placeholder-zinc-400 outline-none transition focus:ring-2 ${theme.gateInput}`}
              />
              {gateError && (
                <p className={`mt-2 text-sm ${theme.gateError}`}>Incorrect password</p>
              )}
              <p className={`mt-3 rounded-lg px-3 py-2 text-xs ${theme.gateHint}`}>
                Hint: First time we meet and exchange name and talk
              </p>
              <button
                type="submit"
                className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 ${theme.primaryBtn}`}
              >
                Unlock the Garden 🌻
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeSwitcher />
    </div>
  );
};

const MissPage = () => (
  <MissThemeProvider>
    <MissPageContent />
  </MissThemeProvider>
);

export default MissPage;
