import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Flower2, Trash2 } from "lucide-react";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "../utils/cloudinary";

const STORAGE_KEY = "aayusa-portfolio-gallery";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    return () => {
      if (progressRef.current) {
        window.clearInterval(progressRef.current);
      }
    };
  }, []);

  const updatePreview = (selected) => {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setStatus(null);
    setProgress(0);
  };

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    updatePreview(selected);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const selected = event.dataTransfer.files?.[0];
    if (!selected) return;
    updatePreview(selected);
  };

  const startProgress = () => {
    setProgress(12);
    progressRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) {
          window.clearInterval(progressRef.current);
          return 96;
        }
        return prev + Math.random() * 8;
      });
    }, 180);
  };

  const finishProgress = () => {
    if (progressRef.current) {
      window.clearInterval(progressRef.current);
    }
    setProgress(100);
    window.setTimeout(() => setProgress(0), 900);
  };

  const uploadImage = async () => {
    if (!file) return;
    setStatus(null);
    setUploading(true);
    startProgress();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed.");
      }

      const stored = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || "[]",
      );
      const next = [data, ...stored];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStatus({
        success: true,
        message: "A new memory has bloomed in the garden.",
      });
      setFile(null);
      setPreviewUrl(null);
      finishProgress();
    } catch (error) {
      setStatus({
        success: false,
        message: error?.message || "Upload failed.",
      });
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setStatus(null);
    setProgress(0);
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          background:
            "radial-gradient(circle, #F6C343 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, #6F8A6D 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border bg-white/60 p-8 shadow-[0_40px_120px_-80px_rgba(111,138,109,0.15)] backdrop-blur-xl sm:p-12"
          style={{ borderColor: "rgba(111,138,109,0.15)" }}
        >
          <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.35em]"
                style={{
                  borderColor: "rgba(111,138,109,0.15)",
                  backgroundColor: "rgba(246,195,67,0.08)",
                  color: "#6F8A6D",
                }}
              >
                <Flower2 size={18} />
                The Garden
              </div>
              <div className="space-y-4">
                <h1
                  className="text-4xl font-semibold tracking-tight sm:text-5xl"
                  style={{ color: "#2a2a2a" }}
                >
                  A place where beautiful memories quietly bloom.
                </h1>
                <p
                  className="max-w-2xl text-base leading-8"
                  style={{ color: "#5a5a5a" }}
                >
                  Every photograph you add becomes a petal in this garden.
                  Memories are kept softly here, just for you.
                </p>
                <p
                  className="text-sm uppercase tracking-[0.35em]"
                  style={{ color: "#6F8A6D" }}
                >
                  {formattedDate}
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
                  How it works
                </span>
              </div>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "#5a5a5a" }}
              >
                Choose a photograph and it will be sent gently to the garden.
                Each bloom is stored with care so you can revisit it anytime.
              </p>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="relative mt-12 overflow-hidden rounded-[2rem] border-2 px-1 py-1 transition"
            style={{
              borderColor: dragActive
                ? "rgba(232,185,35,0.5)"
                : "rgba(111,138,109,0.15)",
              backgroundColor: dragActive
                ? "rgba(246,195,67,0.05)"
                : "rgba(111,138,109,0.03)",
            }}
          >
            <label
              htmlFor="file-upload"
              className="relative flex min-h-[360px] cursor-pointer flex-col items-center justify-center gap-6 rounded-[2rem] px-8 py-12 text-center transition duration-300"
              style={{
                backgroundColor: "rgba(248,248,245,0.9)",
              }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(246,195,67,0.1)",
                }}
              >
                <UploadCloud size={32} style={{ color: "#E8B923" }} />
              </div>
              <div>
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#2a2a2a" }}
                >
                  Drag your memories here
                </p>
                <p className="mt-2 text-sm" style={{ color: "#888" }}>
                  or click to browse
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 overflow-hidden rounded-[2rem] border p-5 shadow-lg"
              style={{
                borderColor: "rgba(111,138,109,0.12)",
                backgroundColor: "rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(111,138,109,0.08)",
              }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p
                    className="text-sm uppercase tracking-[0.35em]"
                    style={{ color: "#6F8A6D" }}
                  >
                    Preview ready
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold"
                    style={{ color: "#2a2a2a" }}
                  >
                    {file?.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition"
                  style={{
                    borderColor: "rgba(111,138,109,0.2)",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    color: "#5a5a5a",
                  }}
                >
                  <Trash2 size={16} />
                  Reset
                </button>
              </div>
              <div
                className="mt-6 overflow-hidden rounded-[1.75rem] border"
                style={{
                  borderColor: "rgba(111,138,109,0.12)",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="h-96 w-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-[1.75rem] border px-5 py-4 text-sm font-medium"
              style={{
                borderColor: status.success
                  ? "rgba(111,138,109,0.2)"
                  : "rgba(220,80,80,0.2)",
                backgroundColor: status.success
                  ? "rgba(111,138,109,0.08)"
                  : "rgba(220,80,80,0.08)",
                color: status.success ? "#4a7a4a" : "#c05050",
              }}
            >
              {status.message}
            </motion.div>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div
              className="rounded-[1.75rem] border p-6 shadow-lg"
              style={{
                borderColor: "rgba(111,138,109,0.12)",
                backgroundColor: "rgba(255,255,255,0.5)",
                boxShadow: "0 8px 32px rgba(111,138,109,0.06)",
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.35em]"
                style={{ color: "#6F8A6D" }}
              >
                About uploads
              </p>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: "#5a5a5a" }}
              >
                Your photographs are sent to Cloudinary and stored with care.
                Only those who visit the gallery can see the blooms.
              </p>
            </div>
            <div
              className="rounded-[1.75rem] border p-6 shadow-lg"
              style={{
                borderColor: "rgba(111,138,109,0.12)",
                backgroundColor: "rgba(255,255,255,0.5)",
                boxShadow: "0 8px 32px rgba(111,138,109,0.06)",
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.35em]"
                style={{ color: "#6F8A6D" }}
              >
                Bloom status
              </p>
              <div
                className="mt-4 rounded-full border p-3"
                style={{
                  borderColor: "rgba(111,138,109,0.12)",
                  backgroundColor: "rgba(248,248,245,0.8)",
                }}
              >
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span style={{ color: "#888" }}>
                    {file ? "Ready to bloom" : "Waiting for a new memory"}
                  </span>
                  <span style={{ color: "#6F8A6D" }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full"
                  style={{ backgroundColor: "rgba(111,138,109,0.1)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(to right, #E8B923, #F6C343)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={uploadImage}
              disabled={!file || uploading}
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold text-white transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #6F8A6D, #5a7a5a)",
                boxShadow: "0 0 30px -8px rgba(111,138,109,0.5)",
              }}
            >
              Bloom Gallery
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
