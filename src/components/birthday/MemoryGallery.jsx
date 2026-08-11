import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { memoryPhotos } from "../../data/birthday";

const SPRING = { type: "spring", stiffness: 260, damping: 25, mass: 1 };
const AUTOPLAY_MS = 5000;
const DRAG_NAV_THRESHOLD = 60;

const MemoryGallery = () => {
  const count = memoryPhotos.length;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(
    typeof window !== "undefined"
      ? Math.min(window.innerWidth * 0.5, 250)
      : 250,
  );
  const dragMoved = useRef(0);

  useEffect(() => {
    const onResize = () =>
      setOffsetX(Math.min(window.innerWidth * 0.5, 250));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const goTo = (i) => setIndex(((i % count) + count) % count);

  // Auto-rotation (paused on hover, drag, or open modal)
  useEffect(() => {
    if (open || hovered || isDragging) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [open, hovered, isDragging, index]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDragStart = () => {
    dragMoved.current = 0;
    setIsDragging(true);
  };

  const onDrag = (event, info) => {
    dragMoved.current = Math.max(dragMoved.current, Math.abs(info.offset.x));
  };

  const onDragEnd = (event, info) => {
    setIsDragging(false);
    if (info.offset.x < -DRAG_NAV_THRESHOLD || info.velocity.x < -400) next();
    else if (info.offset.x > DRAG_NAV_THRESHOLD || info.velocity.x > 400) prev();
  };

  const slides = [
    {
      key: "left",
      photoIndex: (index - 1 + count) % count,
      target: { x: -offsetX, y: "-50%", rotateY: -25, scale: 0.85, opacity: 0.6, z: -100, zIndex: 20 },
    },
    {
      key: "center",
      photoIndex: index,
      target: { x: 0, y: "-50%", rotateY: 0, scale: 1.05, opacity: 1, z: 0, zIndex: 30 },
    },
    {
      key: "right",
      photoIndex: (index + 1) % count,
      target: { x: offsetX, y: "-50%", rotateY: 25, scale: 0.85, opacity: 0.6, z: -100, zIndex: 20 },
    },
  ];

  const activePhoto = memoryPhotos[index];

  return (
    <section className="relative z-10 mx-auto max-w-5xl overflow-hidden px-6 pt-14 pb-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto mb-4 max-w-2xl text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
          Memories
        </p>
        <h2 className="text-2xl font-black tracking-tight text-[#1e3a8a] sm:text-3xl">
          Memories with Ankita Ji 📸
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">
          A few photographs, each holding a little more than pixels — swipe to
          wander through them.
        </p>
      </motion.div>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Navy glow behind active card */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[100px]" />

        <div
          className="relative h-[470px] sm:h-[560px]"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence>
            {slides.map((slide) => {
              const item = memoryPhotos[slide.photoIndex];
              const isCenter = slide.key === "center";
              return (
                <motion.button
                  key={item.src}
                  type="button"
                  initial={{ opacity: 0, scale: 0.5, z: -200, y: "-50%" }}
                  animate={slide.target}
                  exit={{ opacity: 0, scale: 0.4, z: -250, y: "-50%" }}
                  transition={SPRING}
                  drag="x"
                  dragElastic={0.4}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragStart={onDragStart}
                  onDrag={onDrag}
                  onDragEnd={onDragEnd}
                  onClick={() => {
                    if (dragMoved.current > 10) return;
                    if (isCenter) setOpen(true);
                  }}
                  whileTap={{ scale: isCenter ? 1.0 : 0.8 }}
                  className={`pointer-events-auto absolute left-0 right-0 mx-auto touch-pan-y select-none overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white ${
                    isCenter ? "cursor-pointer" : "cursor-grab"
                  }`}
                  style={{
                    top: "50%",
                    width: "70vw",
                    maxWidth: 320,
                    aspectRatio: "4/5",
                    transformStyle: "preserve-3d",
                    boxShadow: isCenter
                      ? "0 40px 90px -25px rgba(30,58,138,0.35), 0 30px 70px -40px rgba(30,58,138,0.25)"
                      : "0 20px 50px -25px rgba(30,58,138,0.18)",
                  }}
                >
                  <img
                    src={item.src}
                    alt="Memory"
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/75 via-[#1e3a8a]/10 to-transparent" />
                  {isCenter && (
                    <p className="absolute inset-x-0 bottom-0 p-5 text-center text-[13px] italic leading-relaxed text-blue-50 sm:text-sm">
                      "{item.quote}"
                    </p>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation Controls Below Card */}
      <div className="relative z-30 mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous memory"
          className="pointer-events-auto rounded-full border border-blue-200 bg-white/85 p-3 text-[#1e3a8a] shadow-[0_8px_30px_-12px_rgba(30,58,138,0.3)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {memoryPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to memory ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                i === index ? "w-6 bg-[#1e3a8a]" : "w-2 bg-blue-200/70 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next memory"
          className="pointer-events-auto rounded-full border border-blue-200 bg-white/85 p-3 text-[#1e3a8a] shadow-[0_8px_30px_-12px_rgba(30,58,138,0.3)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Glassmorphic quote modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(238,242,255,0.85)" }}
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
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-blue-200 bg-white/95 shadow-[0_40px_120px_-40px_rgba(30,58,138,0.4)] backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-white/90 text-zinc-500 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:text-[#1e3a8a]"
              >
                <X size={18} />
              </button>
              <img
                src={activePhoto.src}
                alt="Memory"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                  Memory {index + 1} of {count}
                </p>
                <p className="text-lg leading-relaxed text-zinc-700">
                  "{activePhoto.quote}"
                </p>
                <p className="mt-5 text-sm font-medium text-zinc-500">
                  A moment worth keeping forever 🌻
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGallery;
