// src/pages/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Send, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-cyan-400/60" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              Contact
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Heading + Info */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 uppercase leading-none mb-6">
                Let's Work<br />Together
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
                Have a project in mind or just want to say hi? My inbox is always open.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-gray-300 group">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 group-hover:bg-cyan-400/20 transition">
                    <MapPin size={16} />
                  </span>
                  <span className="text-sm">Nepal · Rupandehi, Butwal</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 group">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 group-hover:bg-cyan-400/20 transition">
                    <Mail size={16} />
                  </span>
                  <a
                    href="mailto:aayusaneupane49@gmail.com"
                    className="text-sm hover:text-cyan-300 transition"
                  >
                    aayusaneupane49@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/moon366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/aayusa-neupane-445a1a351/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:aayusaneupane49@gmail.com"
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Right — CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 md:p-10"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/5 rounded-bl-[3rem] rounded-tr-2xl" />

              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Available for freelance &amp; full-time opportunities.
              </p>
              <p className="text-gray-500 text-xs mb-8">
                Response time: within 24 hours.
              </p>

              <div className="h-px bg-gradient-to-r from-cyan-400/30 to-transparent mb-8" />

              <div className="space-y-3 text-xs text-gray-400 mb-10">
                {["Web Development", "UI / UX Design", "Open Source Collaboration"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item}
                    </div>
                  )
                )}
              </div>

              <a
                href="mailto:aayusaneupane49@gmail.com"
                className="group inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-200"
              >
                <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;