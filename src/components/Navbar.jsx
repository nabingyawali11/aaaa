// components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "about", label: "01 – About" },
  { id: "education", label: "02 – Education" },
  { id: "skills", label: "03 – Skills" },
  { id: "projects", label: "04 – Projects" },
  { id: "contact", label: "05 – Contact" },
];

const NAVBAR_HEIGHT = 72; // px — adjust to match your navbar's actual height

const Navbar = ({ activeSection: externalActiveSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lockedSection, setLockedSection] = useState(null);
  const lockTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Release lock once observer catches up to the target
  useEffect(() => {
    if (lockedSection && externalActiveSection === lockedSection) {
      setLockedSection(null);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    }
  }, [externalActiveSection, lockedSection]);

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    // Calculate distance to estimate scroll duration
    const targetY = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    const distance = Math.abs(targetY - window.scrollY);
    // ~1px per ms at typical smooth scroll speed, min 600ms, max 2000ms
    const estimatedDuration = Math.min(2000, Math.max(600, distance * 0.5));

    // Lock navbar highlight to clicked section immediately
    setLockedSection(id);
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => setLockedSection(null), estimatedDuration + 300);

    // Tell observer to pause
    window.setProgrammaticScroll?.(true, estimatedDuration + 300);

    // Scroll with navbar offset
    window.scrollTo({ top: targetY, behavior: "smooth" });

    // Update URL silently
    history.pushState(null, "", id === "hero" ? window.location.pathname : `#${id}`);
  };

  const activeSection = lockedSection ?? externalActiveSection;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="text-gray-800 font-semibold tracking-tight text-lg flex items-center gap-2">
          <motion.span
            animate={{ y: [0, -4, 0], rotate: [0, 8, -4, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-xl select-none"
            style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.4))" }}
          >
            🌻
          </motion.span>
          <span className="border-l-4 border-gray-900 pl-2">
            Aayusa Nyaupane
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-3"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-left text-base py-2 font-medium transition ${
                  activeSection === item.id
                    ? "text-gray-900 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;