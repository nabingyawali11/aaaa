import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGalleryImages } from "../utils/cloudinary";

const STORAGE_KEY = "aayusa-portfolio-gallery";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const cloudImages = await fetchGalleryImages();
        setImages(cloudImages);
        setVisibleCount(Math.min(6, cloudImages.length));
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(cloudImages.slice(0, 50)),
        );
      } catch {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setImages(parsed);
            setVisibleCount(Math.min(6, parsed.length));
          } catch {
            setImages([]);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 600 &&
        visibleCount < images.length
      ) {
        setVisibleCount((current) => Math.min(images.length, current + 6));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images.length, visibleCount, isMobile]);


  const goNext = useCallback(() => {
    setMobileIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setMobileIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <div
      className="relative min-h-screen overflow-hidden text-[#2a2a2a]"
      style={{ backgroundColor: "#F8F8F5" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%236F8A6D' fill-opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #F6C343 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #6F8A6D 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="overflow-hidden rounded-[2rem] border border-[#6F8A6D]/15 bg-white/60 p-10 shadow-[0_40px_120px_-80px_rgba(111,138,109,0.15)] backdrop-blur-2xl sm:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p
                className="text-sm uppercase tracking-[0.35em]"
                style={{ color: "#6F8A6D" }}
              >
                A Garden of Smiles
              </p>
              <h1
                className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: "#2a2a2a" }}
              >
                Every flower has its own language.
              </h1>
              <div className="mt-6 max-w-2xl space-y-1">
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5a5a5a" }}
                >
                  The sunflower speaks of hope,
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5a5a5a" }}
                >
                  The lily whispers of grace,
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5a5a5a" }}
                >
                  But neither has words
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5a5a5a" }}
                >
                  For the quiet beauty
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#5a5a5a" }}
                >
                  You leave behind in every photograph.
                </p>
              </div>
            </div>

            <div
              className="rounded-[1.75rem] border p-6 shadow-lg"
              style={{
                borderColor: "rgba(111,138,109,0.15)",
                backgroundColor: "rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px rgba(111,138,109,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <Flower2 size={20} style={{ color: "#E8B923" }} />
                <span
                  className="text-sm uppercase tracking-[0.32em]"
                  style={{ color: "#6F8A6D" }}
                >
                  Reflections
                </span>
              </div>
              <p
                className="mt-4 text-base leading-7"
                style={{ color: "#5a5a5a" }}
              >
                Perhaps that is why even gardens seem to bloom a little brighter
                when they bloom around you.
              </p>
              <div
                className="mt-5 h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #E8B923, transparent)",
                }}
              />
              <p
                className="mt-4 text-sm italic leading-7"
                style={{ color: "#888" }}
              >
                "Where flowers bloom, so does hope."
              </p>
            </div>
          </div>
        </motion.div>

        {isMobile ? (
          <div className="mt-14">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <div
                  className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
                  style={{ borderColor: "rgba(111,138,109,0.2)", borderTopColor: "transparent" }}
                />
                <p className="mt-4 text-sm" style={{ color: "#888" }}>
                  The garden is blooming...
                </p>
              </motion.div>
            ) : images.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-[2rem] border border-dashed p-16 text-center shadow-[0_40px_120px_-90px_rgba(111,138,109,0.12)]"
                style={{
                  borderColor: "rgba(111,138,109,0.25)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              >
                <div
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(246,195,67,0.1)" }}
                >
                  <Flower2 size={36} style={{ color: "#E8B923" }} />
                </div>
                <p
                  className="text-sm uppercase tracking-[0.35em]"
                  style={{ color: "#6F8A6D" }}
                >
                  Waiting to bloom
                </p>
                <h2
                  className="mt-6 text-3xl font-semibold"
                  style={{ color: "#2a2a2a" }}
                >
                  A garden in stillness
                </h2>
                <p
                  className="mx-auto mt-4 max-w-xl text-base leading-8"
                  style={{ color: "#888" }}
                >
                  No photographs are here yet.
                </p>
              </motion.div>
            ) : (
              <div className="relative overflow-hidden rounded-[2rem] border bg-white/50 shadow-[0_20px_70px_-40px_rgba(111,138,109,0.12)]" style={{ borderColor: "rgba(111,138,109,0.12)", aspectRatio: "4/5" }}>
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={images[mobileIndex]?.id || images[mobileIndex]?.public_id || mobileIndex}
                    src={images[mobileIndex]?.secure_url}
                    alt={images[mobileIndex]?.original_filename || images[mobileIndex]?.filename || images[mobileIndex]?.public_id}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => openLightbox(images[mobileIndex])}
                  className="absolute inset-0"
                />
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition active:scale-90"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(248,248,245,0.85)",
                    color: "#2a2a2a",
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition active:scale-90"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(248,248,245,0.85)",
                    color: "#2a2a2a",
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-24"
                >
                  <div
                    className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
                    style={{ borderColor: "rgba(111,138,109,0.2)", borderTopColor: "transparent" }}
                  />
                  <p className="mt-4 text-sm" style={{ color: "#888" }}>
                    The garden is blooming...
                  </p>
                </motion.div>
              ) : images.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="col-span-full rounded-[2rem] border border-dashed p-16 text-center shadow-[0_40px_120px_-90px_rgba(111,138,109,0.12)]"
                  style={{
                    borderColor: "rgba(111,138,109,0.25)",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(246,195,67,0.1)" }}
                  >
                    <Flower2 size={36} style={{ color: "#E8B923" }} />
                  </div>
                  <p
                    className="text-sm uppercase tracking-[0.35em]"
                    style={{ color: "#6F8A6D" }}
                  >
                    Waiting to bloom
                  </p>
                  <h2
                    className="mt-6 text-3xl font-semibold sm:text-4xl"
                    style={{ color: "#2a2a2a" }}
                  >
                    A garden in stillness
                  </h2>
                  <p
                    className="mx-auto mt-4 max-w-xl text-base leading-8"
                    style={{ color: "#888" }}
                  >
                    No photographs are here yet. When a memory finds its way into
                    this garden, it will bloom softly for you to see.
                  </p>
                </motion.div>
              ) : (
                images.slice(0, visibleCount).map((item, index) => (
                  <motion.article
                    key={item.id || item.public_id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="group overflow-hidden rounded-[2rem] border bg-white/50 shadow-[0_20px_70px_-40px_rgba(111,138,109,0.12)]"
                    style={{ borderColor: "rgba(111,138,109,0.12)" }}
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(item)}
                      className="relative block h-full w-full overflow-hidden"
                    >
                      <img
                        src={item.secure_url}
                        alt={item.original_filename || item.filename || item.public_id}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(42,42,42,0.5), transparent)",
                        }}
                      />
                      <div
                        className="absolute bottom-4 left-4 rounded-full border px-4 py-2 text-sm opacity-0 transition duration-500 group-hover:opacity-100"
                        style={{
                          borderColor: "rgba(255,255,255,0.2)",
                          backgroundColor: "rgba(248,248,245,0.9)",
                          color: "#2a2a2a",
                        }}
                      >
                        View softly
                      </div>
                    </button>
                  </motion.article>
                ))
              )}
            </div>

            {visibleCount < images.length && (
              <div className="mt-10 flex justify-center text-sm text-slate-500">
                Scroll down to reveal more photos.
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(42,42,42,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              onClick={closeLightbox}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.5)]"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "#F8F8F5",
              }}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
                style={{
                  borderColor: "rgba(111,138,109,0.2)",
                  backgroundColor: "rgba(248,248,245,0.9)",
                  color: "#2a2a2a",
                }}
              >
                <X size={18} />
              </button>
              <img
                src={selectedImage.secure_url}
                alt={selectedImage.original_filename || selectedImage.filename || selectedImage.public_id}
                className="h-[calc(100vh-6rem)] w-full object-contain"
                style={{ backgroundColor: "#f0f0ed" }}
              />
              <div
                className="border-t px-6 py-5 backdrop-blur-xl"
                style={{
                  borderColor: "rgba(111,138,109,0.12)",
                  backgroundColor: "rgba(248,248,245,0.95)",
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.35em]"
                  style={{ color: "#6F8A6D" }}
                >
                  Quiet reflection
                </p>
                <p
                  className="mt-2 text-lg font-medium"
                  style={{ color: "#2a2a2a" }}
                >
                  {selectedImage.original_filename || selectedImage.filename || selectedImage.public_id}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
