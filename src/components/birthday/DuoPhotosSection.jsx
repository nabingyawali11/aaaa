import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Image as ImageIcon, Wand2, ChevronLeft, ChevronRight, X } from "lucide-react";

import img1 from "../../assets/duo/img1.jpg";
import img1Cartoon1 from "../../assets/duo/img1-cartoon1.png";
import img1Cartoon2 from "../../assets/duo/img1-cartoon2.png";
import img2 from "../../assets/duo/img2.jpg";
import img2Cartoon1 from "../../assets/duo/img2-cartoon1.png";
import img2Cartoon2 from "../../assets/duo/img2-cartoon2.png";
import img3 from "../../assets/duo/img3.jpg";
import img3Cartoon1 from "../../assets/duo/img3-cartoon1.png";
import img3Cartoon2 from "../../assets/duo/img3-cartoon2.png";

const SPRING = { type: "spring", stiffness: 260, damping: 25 };

const DUO_COLLECTIONS = [
  {
    id: 1,
    title: "Collection 01: The First Chapter",
    subtitle: "Where our story began 🌸",
    photos: [
      { id: "orig", label: "Original", src: img1, isCartoon: false, isLandscape: false },
      { id: "c1", label: "Cartoon V1", src: img1Cartoon1, isCartoon: true, isLandscape: false },
      { id: "c2", label: "Cartoon V2", src: img1Cartoon2, isCartoon: true, isLandscape: false },
    ],
  },
  {
    id: 2,
    title: "Collection 02: Unforgettable Moments",
    subtitle: "Smiles kept close to heart ✨",
    photos: [
      { id: "orig", label: "Original", src: img2, isCartoon: false, isLandscape: false },
      { id: "c1", label: "Cartoon V1", src: img2Cartoon1, isCartoon: true, isLandscape: false },
      { id: "c2", label: "Cartoon V2", src: img2Cartoon2, isCartoon: true, isLandscape: false },
    ],
  },
  {
    id: 3,
    title: "Collection 03: Special Memories",
    subtitle: "Crafted just for us ✨",
    photos: [
      { id: "orig", label: "Original", src: img3, isCartoon: false, isLandscape: true },
      { id: "c1", label: "Cartoon V1", src: img3Cartoon1, isCartoon: true, isLandscape: true },
      { id: "c2", label: "Cartoon V2", src: img3Cartoon2, isCartoon: true, isLandscape: true },
    ],
  },
];

const ALL_PHOTOS = DUO_COLLECTIONS.flatMap((col, colIdx) =>
  col.photos.map((p, pIdx) => ({
    ...p,
    colIdx,
    pIdx,
    collectionTitle: col.title,
    collectionSubtitle: col.subtitle,
  })),
);

export default function DuoPhotosSection() {
  const total = ALL_PHOTOS.length;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = ALL_PHOTOS[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const goToVersion = (vIdx) => setIndex(photo.colIdx * 3 + vIdx);
  const goToCollection = (cIdx) => setIndex(cIdx * 3);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1e3a8a]">
          <Sparkles size={14} />
          Memories & Animations
        </span>
        <h2 className="text-3xl font-black tracking-tight text-amber-500 drop-shadow-sm sm:text-4xl">
          Our Duo Photo Magic 📸
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
          Use the arrows to flip through our memories, and tap a photo to view
          it up close!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={SPRING}
        className="group relative mx-auto w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-blue-300/30 bg-gradient-to-br from-[#1e3a8a] via-[#1d2a63] to-[#0f1b3d] p-6 shadow-[0_30px_80px_-25px_rgba(30,58,138,0.6)]">
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-sky-400/25 via-blue-500/15 to-pink-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {photo.collectionTitle}
                </h3>
                <p className="mt-1 text-xs text-sky-200/80">
                  {photo.collectionSubtitle}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-[#0f1b3d]/80 px-3 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-md">
                {photo.isCartoon ? (
                  <>
                    <Wand2 size={12} className="text-pink-400" />
                    <span className="text-pink-300">Cartoon Edition ✨</span>
                  </>
                ) : (
                  <>
                    <ImageIcon size={12} className="text-sky-300" />
                    <span className="text-sky-200">Original Memories</span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a122e] ${
                photo.isLandscape ? "aspect-[4/3]" : "aspect-[4/5]"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={photo.src}
                  alt={photo.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setOpen(true)}
                  className="h-full w-full cursor-zoom-in object-cover"
                />
              </AnimatePresence>

              <button
                type="button"
                aria-label="Previous photo"
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1e3a8a]/70 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#2563eb] md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={next}
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1e3a8a]/70 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#2563eb] md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {DUO_COLLECTIONS[photo.colIdx].photos.map((p, pIdx) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={p.label}
                  onClick={() => goToVersion(pIdx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    photo.pIdx === pIdx
                      ? "scale-105 bg-white text-[#1e3a8a] shadow-lg shadow-blue-500/30"
                      : "bg-white/5 text-blue-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
              {DUO_COLLECTIONS.map((col, cIdx) => (
                <button
                  key={col.id}
                  type="button"
                  aria-label={`Go to ${col.title}`}
                  onClick={() => goToCollection(cIdx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    cIdx === photo.colIdx
                      ? "w-6 bg-white"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">
        Tap a photo to view it up close 🔍
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(15,27,61,0.75)" }}
          >
            <div
              className="absolute inset-0 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={SPRING}
              className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-blue-300/30 bg-gradient-to-br from-[#1e3a8a] via-[#1d2a63] to-[#0f1b3d] shadow-[0_40px_120px_-40px_rgba(30,58,138,0.6)]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0f1b3d]/70 text-white backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#2563eb]"
              >
                <X size={18} />
              </button>

              <img
                src={photo.src}
                alt={photo.label}
                className="max-h-[62vh] w-full bg-[#0a122e] object-contain"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                    {photo.collectionTitle}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {photo.label} · {photo.collectionSubtitle}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0f1b3d]/80 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                  {photo.isCartoon ? (
                    <>
                      <Wand2 size={12} className="text-pink-400" />
                      <span className="text-pink-300">Cartoon Edition ✨</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={12} className="text-sky-300" />
                      <span className="text-sky-200">Original Memories</span>
                    </>
                  )}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
