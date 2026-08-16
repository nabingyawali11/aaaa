import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mic, MicOff, Music, Pause, Play, Volume2, VolumeX, X, Heart, Sparkles } from "lucide-react";
import { CHIME_NOTES } from "../../data/birthday";
import { useMissTheme } from "./MissTheme";
import song1 from "../../assets/song/hbd/1hbd.mp3";
import song2 from "../../assets/song/hbd/2hbd.mp3";
import song3 from "../../assets/song/hbd/3hbd.mp3";
import song4 from "../../assets/song/hbd/4hbd.mp3";

const SONGS = [
  { id: 1, title: "English · Acoustic", src: song4 },
  { id: 2, title: "Nepali v1 · Upbeat", src: song1 },
  { id: 3, title: "Nepali v2 · Melodic", src: song2 },
  { id: 4, title: "Nepali v3 · Acoustic", src: song3 },
];
const DEFAULT_SONG_INDEX = 3;

const BLOW_THRESHOLD = 0.22;
const BLOW_STREAK = 5;

const CakeSvg = ({ blown }) => (
  <svg viewBox="0 0 320 360" className="mx-auto w-full max-w-[340px] drop-shadow-[0_30px_60px_-20px_rgba(251,191,36,0.25)]">
    <defs>
      <linearGradient id="tierGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="tierRose" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fecdd3" />
        <stop offset="100%" stopColor="#fb7185" />
      </linearGradient>
      <linearGradient id="tierCream" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>

    {/* Plate */}
    <ellipse cx="160" cy="322" rx="138" ry="16" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <ellipse cx="160" cy="319" rx="118" ry="11" fill="#0f172a" />

    {/* Bottom tier */}
    <rect x="46" y="248" width="228" height="70" rx="14" fill="url(#tierGold)" />
    <rect x="46" y="248" width="228" height="16" rx="8" fill="#fff7ed" opacity="0.7" />
    <rect x="52" y="282" width="14" height="4" rx="2" fill="#fb7185" opacity="0.85" />
    <rect x="84" y="288" width="14" height="4" rx="2" fill="#fb7185" opacity="0.85" />
    <rect x="222" y="284" width="14" height="4" rx="2" fill="#fb7185" opacity="0.85" />
    <rect x="254" y="292" width="14" height="4" rx="2" fill="#fb7185" opacity="0.85" />

    {/* Middle tier */}
    <rect x="82" y="178" width="156" height="70" rx="12" fill="url(#tierRose)" />
    <rect x="82" y="178" width="156" height="14" rx="7" fill="#fff1f2" opacity="0.7" />
    <rect x="90" y="210" width="12" height="4" rx="2" fill="#fde68a" />
    <rect x="218" y="216" width="12" height="4" rx="2" fill="#fde68a" />

    {/* Top tier */}
    <rect x="118" y="118" width="84" height="60" rx="10" fill="url(#tierCream)" />
    <rect x="118" y="118" width="84" height="12" rx="6" fill="#fffbeb" opacity="0.85" />

    {/* Candle */}
    <rect x="152" y="76" width="16" height="42" rx="5" fill="#f8fafc" />
    <rect x="152" y="88" width="16" height="6" fill="#fb7185" />
    <rect x="152" y="102" width="16" height="6" fill="#fb7185" />
    <line x1="160" y1="76" x2="160" y2="68" stroke="#475569" strokeWidth="2" />

    {/* Flame */}
    <AnimatePresence>
      {!blown && (
        <motion.g
          key="flame"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0.1, opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ originX: "50%", originY: "100%" }}
        >
          <motion.ellipse
            cx="160"
            cy="54"
            rx="7"
            ry="15"
            fill="#f59e0b"
            animate={{ scaleY: [1, 1.25, 0.9, 1.2, 1], skewX: [-1.5, 2, -1, 1.5, 0] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "50%", originY: "100%" }}
          />
          <motion.ellipse
            cx="160"
            cy="59"
            rx="3.5"
            ry="8"
            fill="#fef9c3"
            animate={{ scaleY: [1, 1.3, 0.85, 1.25, 1], opacity: [1, 0.85, 1, 0.9, 1] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "50%", originY: "100%" }}
          />
        </motion.g>
      )}
    </AnimatePresence>

    {/* Smoke (blown) */}
    <AnimatePresence>
      {blown && (
        <motion.g key="smoke" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="160"
              cy="60"
              r={4 + i * 2}
              fill="#cbd5e1"
              initial={{ opacity: 0.6, y: 0, x: 0, scale: 0.5 }}
              animate={{
                opacity: 0,
                y: -(34 + i * 22),
                x: (i % 2 === 0 ? 1 : -1) * (10 + i * 6),
                scale: 1.6,
              }}
              transition={{ duration: 1.9, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </motion.g>
      )}
    </AnimatePresence>
  </svg>
);

const CandleCake = () => {
  const { theme } = useMissTheme();
  const [micState, setMicState] = useState("idle"); // idle | listening | blown | denied
  const [blown, setBlown] = useState(false);
  const [selectedSong, setSelectedSong] = useState(DEFAULT_SONG_INDEX);
  const [songModalOpen, setSongModalOpen] = useState(true);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const frameRef = useRef(null);
  const streakRef = useRef(0);
  const blownRef = useRef(false);
  const audioRef = useRef(null);

  const cleanupMic = () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (ctxRef.current && ctxRef.current.state !== "closed") {
      ctxRef.current.close().catch(() => { });
      ctxRef.current = null;
    }
    analyserRef.current = null;
  };

  useEffect(() => {
    return cleanupMic;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      startListening();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const pauseCakeAudio = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    };
    window.addEventListener("aayusa:audio-pause-cake", pauseCakeAudio);
    return () =>
      window.removeEventListener("aayusa:audio-pause-cake", pauseCakeAudio);
  }, []);

  const playSelectedSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(SONGS[selectedSong].src);
    audioRef.current = audio;
    audio.muted = false;
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio
      .play()
      .then(() => {
        window.dispatchEvent(new CustomEvent("aayusa:audio-pause-ambient"));
        setPlayerOpen(true);
        setIsPlaying(true);
        setIsMuted(false);
      })
      .catch(() => setIsPlaying(false));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          window.dispatchEvent(new CustomEvent("aayusa:audio-pause-ambient"));
          setIsPlaying(true);
        })
        .catch(() => { });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const closePlayer = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setPlayerOpen(false);
  };

  const playChime = () => {
    const ctx =
      ctxRef.current && ctxRef.current.state !== "closed"
        ? ctxRef.current
        : new AudioContext();
    if (ctx.state === "suspended") ctx.resume().catch(() => { });
    CHIME_NOTES.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.05);
    });
  };

  const fireConfetti = () => {
    const colors = ["#fbbf24", "#f59e0b", "#fb7185", "#f472b6", "#ffffff"];
    confetti({ particleCount: 90, spread: 75, ticks: 220, gravity: 1, startVelocity: 45, origin: { x: 0.5, y: 0.55 }, colors });
    confetti({ particleCount: 55, angle: 60, spread: 60, ticks: 200, origin: { x: 0.15, y: 0.65 }, colors });
    confetti({ particleCount: 55, angle: 120, spread: 60, ticks: 200, origin: { x: 0.85, y: 0.65 }, colors });
  };

  const extinguish = () => {
    if (blownRef.current) return;
    blownRef.current = true;
    setBlown(true);
    setMicState("blown");
    playChime();
    fireConfetti();
    playSelectedSong();
    cleanupMic();
  };

  const monitorLoop = () => {
    const analyser = analyserRef.current;
    if (!analyser || blownRef.current) return;
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i += 1) sum += data[i] * data[i];
    const rms = Math.sqrt(sum / data.length);
    if (rms > BLOW_THRESHOLD) {
      streakRef.current += 1;
      if (streakRef.current >= BLOW_STREAK) {
        extinguish();
        return;
      }
    } else {
      streakRef.current = 0;
    }
    frameRef.current = window.requestAnimationFrame(monitorLoop);
  };

  const startListening = async () => {
    if (blownRef.current) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicState("denied");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      streamRef.current = stream;
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      streakRef.current = 0;
      setMicState("listening");
      frameRef.current = window.requestAnimationFrame(monitorLoop);
    } catch {
      setMicState("denied");
    }
  };

  const stopListening = () => {
    cleanupMic();
    if (!blownRef.current) setMicState("idle");
  };

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-8 lg:px-10">
      {/* Soft pink + sky glows behind cake */}
      <div className={`pointer-events-none absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full blur-[110px] ${theme.cakeGlowA}`} />
      <div className={`pointer-events-none absolute right-10 top-40 h-72 w-72 rounded-full blur-[100px] ${theme.cakeGlowB}`} />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${theme.headingKicker}`}>
            Make a wish
          </p>
          <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${theme.headingTitle}`}>
            Make a Wish &amp; Blow the Candle! 🕯️
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            Allow your microphone, then gently blow into your phone — and watch
            the magic happen. 🎂
          </p>
        </motion.div>

        <div className="relative mt-10">
          <CakeSvg blown={blown} />

          {/* Banner */}
          <AnimatePresence>
            {blown && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-900/80 p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-md sm:p-10"
              >
                {/* Floating heart + sparkle */}
                <motion.span
                  className="absolute bottom-4 right-5 text-pink-400"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart size={18} />
                </motion.span>
                <motion.span
                  className="absolute bottom-10 right-12 text-amber-300"
                  animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <Sparkles size={14} />
                </motion.span>

                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                  Written, just for you ✨
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-white sm:text-2xl">
                  Make a Wish, Ankita Ji! 🕯️
                </h3>
                <div className="mt-5 font-serif text-base leading-relaxed text-slate-200 md:text-lg">
                  <p>
                    Happy 20th Birthday, Ankita Ji! May your heart stay open to
                    pure happiness, and may sadness never even cross your path.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            {micState === "listening" && (
              <div className="relative flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${theme.cakeListeningDot}`} />
                  <span className={`relative inline-flex h-4 w-4 rounded-full ${theme.cakeListeningDot}`} />
                </span>
                <span className={`text-sm font-medium ${theme.cakeListeningText}`}>
                  Listening... blow into your mic!
                </span>
              </div>
            )}

            {micState === "denied" && (
              <p className={`max-w-sm text-center text-sm leading-relaxed ${theme.cakeDeniedText}`}>
                Microphone unavailable. No worries — tap the button below to
                blow out the candle manually.
              </p>
            )}

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {micState === "idle" && (
                <button
                  type="button"
                  onClick={startListening}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 sm:w-auto ${theme.primaryBtn}`}
                >
                  <Mic size={16} />
                  Turn on Mic to Blow Candle 🎤
                </button>
              )}

              {micState === "listening" && (
                <button
                  type="button"
                  onClick={stopListening}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-zinc-500 transition-all duration-300 ease-out hover:-translate-y-1 sm:w-auto ${theme.secondaryBtn}`}
                >
                  <MicOff size={16} />
                  Stop Listening
                </button>
              )}

              {micState !== "listening" && !blown && (
                <button
                  type="button"
                  onClick={extinguish}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-1 sm:w-auto ${theme.cakeTapBtn}`}
                >
                  Tap to Blow 🎂
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Song picker popup */}
      <AnimatePresence>
        {songModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className={`absolute inset-0 backdrop-blur-sm ${theme.cakeModalBackdrop}`}
              onClick={() => setSongModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative w-full max-w-md overflow-hidden rounded-[1.75rem] p-8 backdrop-blur-xl ${theme.cakeModalCard}`}
            >
              <button
                type="button"
                onClick={() => setSongModalOpen(false)}
                aria-label="Close song picker"
                className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-out ${theme.cakeModalClose}`}
              >
                <X size={16} />
              </button>

              <div className="text-center">
                <span className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${theme.cakeModalIconBox}`}>
                  <Music size={24} />
                </span>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.35em] ${theme.headingKicker}`}>
                  Pick your birthday song 🎵
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-800">
                  Which melody should play when you blow the candle?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Choose one of the four versions — it will auto-play with the
                  confetti when your wish takes flight.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SONGS.map((song, i) => {
                  const active = i === selectedSong;
                  return (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => {
                        setSelectedSong(i);
                        setSongModalOpen(false);
                      }}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ease-out ${active
                          ? theme.cakeSongActive
                          : theme.cakeSongInactive
                        }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${active
                            ? theme.cakeSongNumActive
                            : theme.cakeSongNumInactive
                          }`}
                      >
                        {song.id}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block truncate text-sm font-semibold ${active ? theme.cakeSongTitleActive : "text-zinc-700"
                            }`}
                        >
                          {song.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSong(DEFAULT_SONG_INDEX);
                  setSongModalOpen(false);
                }}
                className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-zinc-500 transition-all duration-300 ease-out ${theme.cakeDefaultBtn}`}
              >
                Skip — use default (Nepali v3)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating mini-player */}
      <AnimatePresence>
        {playerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2"
          >
            <div className={`flex items-center gap-3 rounded-full px-5 py-3 backdrop-blur-md ${theme.cakePlayerBar}`}>
              <motion.span
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: isPlaying ? Infinity : 0, duration: 3, ease: "linear" }}
                className="shrink-0 text-amber-500"
              >
                <Music size={18} />
              </motion.span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-800">
                  {SONGS[selectedSong].title}
                </p>
                {isPlaying && (
                  <p className="text-[10px] uppercase tracking-widest text-amber-600/80">
                    Now playing
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-slate-900 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-amber-400"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5 ${isMuted
                    ? theme.cakeMuteActive
                    : theme.cakeMuteIdle
                  }`}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                type="button"
                onClick={closePlayer}
                aria-label="Close player"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 ${theme.cakePlayerClose}`}
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CandleCake;
