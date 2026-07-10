// src/pages/About.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import SpotlightText from "../components/SpotlightText";
import Aiyesa_Reusme from "../assets/Aiyesa_Reusme.pdf";

const About = () => {
  const sectionRef = useRef(null);

  return (
    <>
      <SpotlightText className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <section
          id="about"
          ref={sectionRef}
          className="py-24 cursor-none overflow-hidden bg-gray-50"
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
                Butwal Kalika Campus.
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
            <br />
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
