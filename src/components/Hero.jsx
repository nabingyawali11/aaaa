import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import heroImage from "../assets/me/5.jpg";

const Hero = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/moon366",
      label: "GitHub",
      color: "hover:text-white hover:border-white/40",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aayusa-neupane-445a1a351/",
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-400/40",
    },
    {
      icon: Twitter,
      href: "https://x.com/AayusaNeu",
      label: "Twitter",
      color: "hover:text-sky-400 hover:border-sky-400/40",
    },
    {
      icon: Mail,
      href: "mailto:aayusaneupane49@gmail.com",
      label: "Email",
      color: "hover:text-red-400 hover:border-red-400/40",
    },
  ];

  const seamlessMorph = [
    "30% 70% 70% 30% / 30% 30% 70% 70%",
    "50% 20% 60% 40% / 50% 20% 60% 40%",
    "40% 30% 30% 70% / 40% 30% 30% 70%",
    "60% 40% 50% 50% / 50% 60% 40% 50%",
    "35% 65% 75% 25% / 25% 35% 65% 75%",
    "45% 55% 55% 45% / 55% 45% 45% 55%",
    "30% 70% 70% 30% / 30% 30% 70% 70%",
  ];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,211,238,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.9),transparent_60%)]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent orbs */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[8%] w-72 h-72 rounded-full bg-cyan-500 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0], opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-[6%] w-64 h-64 rounded-full bg-slate-400 blur-[100px] pointer-events-none"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-screen py-28">

        {/* LEFT — Text column */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center order-2 md:order-1"
        >
          {/* Role badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs tracking-[0.25em] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              FullStack Developer
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp} className="mb-4 overflow-hidden">
            <h1
              className="leading-[1.05] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="flex items-center gap-3 text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                Aayusa
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold italic bg-gradient-to-r from-cyan-300 via-cyan-200 to-white bg-clip-text text-transparent mt-1">
                Nyaupane
              </span>
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-cyan-500/60" />
            <div className="h-px flex-1 bg-slate-700/60" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-10 italic"
          >
            "Transforming ideas into interactive, responsive, and visually
            appealing web applications."
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(34,211,238,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full bg-cyan-500 text-slate-900 font-semibold text-sm tracking-wide transition-colors duration-200 hover:bg-cyan-400"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full border border-slate-600 text-slate-300 font-medium text-sm tracking-wide hover:border-cyan-500/50 hover:text-white transition-colors duration-200"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="text-slate-600 text-xs tracking-widest uppercase mr-1">Find me on</span>
            <div className="h-px w-6 bg-slate-700" />
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-10 h-10 rounded-full border border-slate-700/70 bg-slate-800/60 flex items-center justify-center text-slate-500 transition-all duration-200 ${color}`}
                >
                  <Icon size={17} strokeWidth={1.7} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Image column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center md:justify-end items-center order-1 md:order-2"
        >
          <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-dotted border-slate-600/20"
            />
            <motion.div
              animate={{ borderRadius: seamlessMorph, opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-cyan-500 blur-[80px]"
            />
            <div className="absolute -top-3 -right-3 z-20 px-2.5 py-1 rounded-md bg-slate-800 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono tracking-wider shadow-lg">
              &lt;dev /&gt;
            </div>
            <div className="absolute -bottom-3 -left-3 z-20 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-600/50 text-slate-400 text-[10px] font-mono tracking-wider shadow-lg">
              UI · UX
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, borderRadius: seamlessMorph }}
              transition={{
                opacity: { duration: 1 },
                scale: { duration: 1 },
                borderRadius: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-full h-full overflow-hidden border border-cyan-400/20 shadow-[0_0_60px_-10px_rgba(34,211,238,0.25),0_0_120px_-30px_rgba(34,211,238,0.12)] bg-slate-800"
            >
              <motion.img
                src={heroImage}
                alt="Aayusa Nyaupane"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Hint — absolute bottom center, prominent ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        {/* Label */}
        <span className="text-slate-400 text-sm md:text-base tracking-[0.35em] uppercase font-medium">
          Scroll
        </span>

        {/* Mouse outline */}
        <div className="w-8 h-14 rounded-full border-2 border-cyan-500/50 flex justify-center items-start pt-2.5">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 rounded-full bg-cyan-400"
          />
        </div>

        {/* Staggered chevrons */}
        <div className="flex flex-col items-center gap-1 -mt-1">
          {[0, 0.18, 0.36].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 6, 0], opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
              style={{ width: `${20 - i * 4}px`, height: `${20 - i * 4}px` }}
              className="border-r-2 border-b-2 border-cyan-400/80 rotate-45"
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;