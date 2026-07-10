// src/components/About.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import SpotlightText from "../components/SpotlightText";
import Aiyesa_Reusme from "../assets/Aiyesa_Reusme.pdf";

const About = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the spotlight tracker
  const springX = useSpring(mouseX, { stiffness: 300, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 40 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = springX.on("change", (v) =>
      setPos((prev) => ({ ...prev, x: v })),
    );
    const unsubY = springY.on("change", (v) =>
      setPos((prev) => ({ ...prev, y: v })),
    );
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Track mouse position relative to this specific section
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <>
      <SpotlightText
        mousePos={pos}
        className="space-y-6 text-gray-700 text-lg leading-relaxed"
      >
        <section
          id="about"
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          className="py-24 md:cursor-none overflow-hidden"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-16 text-center">
            [About Me]
          </h2>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p>
              Hi, I'm{" "}
              <span className="font-bold text-gray-900">Aayusa Nyaupane</span>,
              a passionate{" "}
              <span className="font-bold text-gray-900">
                FullStack Developer
              </span>{" "}
              and a BCA student at{" "}
              <span className="font-bold text-gray-900">
                Butwal Kalika Campus .
              </span>{" "}
              I enjoy building{" "}
              <span className="font-bold text-gray-900">
                responsive, interactive, and user-friendly web applications
              </span>{" "}
              using{" "}
              <span className="font-bold text-gray-900">
                HTML, CSS, JavaScript, and React
              </span>
              .
            </p>
            <br></br>
            <p>
              Along with technical skills, I have strong{" "}
              <span className="font-bold text-gray-900">
                communication and public speaking abilities
              </span>
              , which help me collaborate effectively and share ideas clearly. I
              am always eager to learn new technologies and grow as a developer,
              aiming to create impactful and meaningful digital experiences.
            </p>

            {/* Button inside the text flow, aligned with above text */}
            <div className="flex justify-center mt-8">
              <motion.a
                href={Aiyesa_Reusme}
                target="_blank"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white rounded-lg shadow-lg transition-colors relative z-10"
                style={{ cursor: "pointer" }}
              >
                <FileText size={20} />
                <span className="font-medium">Download Resume</span>
              </motion.a>
            </div>
          </div>
        </section>
      </SpotlightText>
    </>
  );
};

export default About;
