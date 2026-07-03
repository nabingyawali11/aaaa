// Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "../components/Footer";

function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const isScrollingProgrammatically = useRef(false);
  const scrollLockTimer = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingProgrammatically.current) return;

        // Pick the entry with the largest intersection ratio if multiple fire
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const id = visible[0].target.id;
        setActiveSection(id);

        // Use pushState — never assignment — so no native jump
        if (id === "hero") {
          history.replaceState(null, "", window.location.pathname);
        } else {
          history.replaceState(null, "", `#${id}`);
        }
      },
      {
        // Trigger when section crosses the middle band of the viewport
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  // Expose programmatic scroll control to Navbar
  useEffect(() => {
    window.setProgrammaticScroll = (value, duration = 1200) => {
      isScrollingProgrammatically.current = value;
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
      if (value) {
        // Auto-release after estimated scroll duration as a safety net
        scrollLockTimer.current = setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, duration);
      }
    };
    return () => {
      delete window.setProgrammaticScroll;
      if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
    };
  }, []);

  return (
    <>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default Home;