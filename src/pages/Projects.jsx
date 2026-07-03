// src/pages/Projects.jsx
import React from "react";
import { motion } from "framer-motion";
import { Github, Rocket } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
            [ Projects ]
          </h2>
        </div>

        {/* Empty state hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center mb-7"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 mb-5"
          >
            <Rocket size={26} className="text-gray-500" />
          </motion.div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Projects launching soon
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-7">
            I'm currently building my first projects as a frontend developer.
            They'll be live here once ready — thank you for your patience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="https://github.com/moon366"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm tracking-wide hover:bg-gray-700 transition-colors"
            >
              <Github size={15} />
              Follow on GitHub
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 font-medium text-sm tracking-wide hover:border-gray-500 hover:text-gray-900 transition-colors"
            >
              Let's collaborate
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
