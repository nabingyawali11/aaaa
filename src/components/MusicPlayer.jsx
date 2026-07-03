import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Unlock, X } from "lucide-react";
import songFile from "../assets/song/song1.mp3";

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    // Instantiate Audio object
    audioRef.current = new Audio(songFile);
    audioRef.current.loop = true;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (!isUnlocked) {
      setIsOpen(true);
      setError("");
      setPassword("");
    } else {
      togglePlay();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback failed:", err);
          setError("Failed to play audio. Please interact with the page first.");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "20630431") {
      setIsUnlocked(true);
      setIsOpen(false);
      setError("");
      // Auto-play music upon unlocking
      setTimeout(() => {
        togglePlay();
      }, 100);
    } else {
      setError("Incorrect password! Try again.");
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <motion.button
          onClick={handleButtonClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative p-4 rounded-full shadow-2xl flex items-center justify-center text-white focus:outline-none transition-colors border ${isPlaying
              ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-400/40 shadow-emerald-500/20"
              : isUnlocked
                ? "bg-cyan-600 hover:bg-cyan-500 border-cyan-400/40 shadow-cyan-500/20"
                : "bg-slate-800 hover:bg-slate-700 border-slate-600/40 shadow-slate-900/40"
            }`}
          aria-label="Music Player"
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <Music2 size={24} />
            </motion.div>
          ) : isUnlocked ? (
            <Music2 size={24} />
          ) : (
            <Music size={24} />
          )}

          {/* Pulsing indicator when playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Password Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Backdrop click closes modal */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </button>

              {/* Title & Icon */}
              <div className="flex flex-col items-center text-center mb-6 mt-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                  <Music size={24} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Secret Audio Player
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Enter the password to listen to the song.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-medium"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Hint */}
                <div className="bg-slate-800/40 rounded-lg p-3.5 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-0.5">
                    Hint
                  </span>
                  <span className="text-xs text-slate-400 font-medium italic">
                    "only close own now this"
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm shadow-lg shadow-cyan-500/20 transition"
                  >
                    Unlock &amp; Play
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
