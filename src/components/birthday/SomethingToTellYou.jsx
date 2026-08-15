import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Star,
  Lock,
  ChevronDown,
} from "lucide-react";

const hearts = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 67) % 100}%`,
  delay: (i % 6) * 0.9,
  duration: 9 + (i % 5) * 1.4,
  size: 8 + (i % 4) * 5,
  sway: (i % 2 === 0 ? 1 : -1) * (18 + (i % 5) * 10),
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
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
      {kicker}
    </p>
    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-sm leading-relaxed text-slate-400">{subtitle}</p>
    )}
  </motion.div>
);

const promises = [
  {
    icon: ShieldCheck,
    title: "Honesty",
    body: "No filters, no pretending. Whatever this page holds is the truest version of me — the one I kept hidden for too long.",
  },
  {
    icon: MessageCircle,
    title: "Trust",
    body: "You gave me something rare — a place to open up without fear. This space is mine to return that gift to you.",
  },
  {
    icon: Star,
    title: "Feelings",
    body: "Somewhere between the stage lights and the late-night calls, my feelings stopped being a secret. This page is the confession.",
  },
];

function SomethingToTellYou({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[130px]" />

      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute top-[-5%] rounded-full"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            backgroundColor: h.color,
          }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", x: [0, h.sway, -h.sway, 0], opacity: [0, 0.6, 0.6, 0], rotate: 360 }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeIn" }}
        />
      ))}

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 text-center md:px-12">
        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 shadow-[0_0_40px_-8px_rgba(236,72,153,0.5)]"
          >
            <Sparkles size={32} className="text-pink-500" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-400"
          >
            A message from your caring person
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            I have something to tell you
            <span className="text-pink-500">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
          >
            <p>
              For months I've carried words I couldn't say out loud — building
              gates and gardens to tell them to you. You made it past the lock,
              so now you deserve the rest.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Scroll slowly, read with your heart — this page was made for you
              and no one else.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-pink-400"
          >
            <span className="h-px w-14 bg-pink-500/40" />
            <Heart size={20} className="animate-pulse" />
            <span className="h-px w-14 bg-pink-500/40" />
          </motion.div>

          <motion.button
            type="button"
            onClick={() =>
              document.getElementById("confession")?.scrollIntoView({ behavior: "smooth" })
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mx-auto flex flex-col items-center gap-1 text-slate-500 transition hover:text-pink-400"
            aria-label="Scroll down"
          >
            <ChevronDown size={22} />
          </motion.button>
        </div>
      </section>

      {/* Confession */}
      <section id="confession" className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <SectionHeading
          kicker="The Confession"
          title="The Words I Kept Locked Away"
          subtitle="You cracked the code, so here it is — everything I couldn't say to your face."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5 rounded-3xl border border-pink-500/20 bg-white/5 p-8 text-base leading-[1.9] text-slate-300/90 backdrop-blur-xl sm:p-10"
        >
          <p>
            If you're reading this, you cracked the code — and that alone means
            more to me than I can put into words. I've been carrying this in my
            chest since that night under the stage lights of CodeFest 2025.
          </p>
          <p>
            The small talk was never the point. The late-night calls, the
            stories we traded, the way you made an introvert forget he was one —
            they all led me here. I never knew how to say it out loud, so I
            built this gate instead.
          </p>
          <p>
            Thank you for being the reason I finally felt safe to open up.
            Whatever happens next, I just wanted you to know — of all the people
            I could have chosen to share this space with, it was always going to
            be you.
          </p>
          <div className="flex items-center gap-3 pt-2 text-pink-400">
            <Lock size={16} />
            <p className="text-sm font-semibold">
              — Your Caring Person · Tech Lead 🌻
            </p>
          </div>
        </motion.div>
      </section>

      {/* Promises */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <SectionHeading
          kicker="What You'll Find Here"
          title="Three promises I made to you"
          subtitle="The things this little realm stands for — now that you're inside."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl border border-pink-500/20 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-pink-400/40"
            >
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-400">
                <item.icon size={24} />
              </span>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
            One last thing
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Thank you for listening 🌸
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            You didn't just unlock a website — you unlocked something I've been
            holding onto for a very long time. Whatever comes next, I'm glad it
            started here, with you.
          </p>
          <div className="mx-auto mt-10 flex items-center justify-center gap-3 text-pink-400">
            <span className="h-px w-12 bg-pink-500/40" />
            <Heart size={20} className="animate-pulse" />
            <span className="h-px w-12 bg-pink-500/40" />
          </div>
        </motion.div>
      </section>

      {children}
    </div>
  );
}

export default SomethingToTellYou;
