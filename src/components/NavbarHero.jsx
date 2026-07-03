// components/NavbarHero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";

const NavbarHero = () => {
  const navItems = [
    "01 – About",
    "05 – Education",
    "02 – Experience",
    "03 – Skills",
    "04 – Projects",
    "06 – Contact",
  ];

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 pb-20 md:pt-24 md:pb-28 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left side - Navigation and Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Navigation Menu */}
            <nav className="hidden md:block">
              <ul className="space-y-2">
                {navItems.map((item, index) => {
                  const [number, title] = item.split(" – ");
                  const sectionId = title.toLowerCase();
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={`#${sectionId}`}
                        className="group flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-all duration-300 text-sm tracking-wider font-mono"
                      >
                        <span className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                          {number}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform">
                          {title}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Hero Text */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
              >
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-300 to-cyan-200">
                  Aayusa Nyaupane
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-100">
                  FullStack Developer
                </h2>
                <p className="text-gray-300 text-base md:text-lg max-w-2xl border-l-4 border-cyan-400 pl-5">
                  I just pull things off the internet and put it into my code.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Circular Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated rotating gradient border */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-300 animate-spin-slow opacity-75"></div>

              {/* Main gradient border container */}
              <div className="absolute inset-0.75 rounded-full bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-300">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-300 animate-pulse opacity-50"></div>
              </div>

              {/* Image container - Circular with border */}
              <div className="absolute inset-1.5 rounded-full overflow-hidden shadow-2xl">
                <div className="relative w-full h-full">
                  <img
                    src={heroImage}
                    alt="Aayusa Nyaupane"
                    className="w-full h-full object-cover"
                  />
                  {/* Inner gradient overlay for depth */}
                  <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 via-transparent to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Optional: Outer glow effect */}
              <div className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-cyan-400/20 p-3 z-50">
        <ul className="flex flex-wrap justify-center gap-3">
          {navItems.map((item, index) => {
            const [number] = item.split(" – ");
            const sectionId = item.split(" – ")[1].toLowerCase();
            return (
              <li key={index}>
                <a
                  href={`#${sectionId}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs tracking-wider font-mono px-2 py-1"
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default NavbarHero;
