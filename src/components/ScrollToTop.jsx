import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const getNavbarHeight = () => {
    const navbar = document.querySelector("header");
    if (navbar) {
      return navbar.offsetHeight;
    }
    return 80; // fallback height
  };

  const scrollToHero = () => {
    try {
      const heroElement = document.getElementById("hero");

      if (heroElement) {
        // Set programmatic scroll flag
        if (window.setProgrammaticScroll) {
          window.setProgrammaticScroll(true);
        }

        const navbarHeight = getNavbarHeight();
        const elementPosition =
          heroElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        // Scroll to hero position
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Clear the URL hash
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );

        // Reset programmatic scroll flag after scroll completes
        setTimeout(() => {
          if (window.setProgrammaticScroll) {
            window.setProgrammaticScroll(false);
          }
        }, 1000); // Give enough time for smooth scroll to complete
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );

        setTimeout(() => {
          if (window.setProgrammaticScroll) {
            window.setProgrammaticScroll(false);
          }
        }, 1000);
      }
    } catch (error) {
      window.scrollTo(0, 0);
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      if (window.setProgrammaticScroll) {
        window.setProgrammaticScroll(false);
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToHero}
            className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToTop;
