// components/Education.jsx
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "Bachelor in Computer Application (BCA)",
    institution: "Butwal Kalika Campus (TU Affiliated)",
    year: "2080 BS - Present",
    details:
      "Focusing on computer science fundamentals, software development, and database management.",
  },
  {
    degree: "Higher Secondary Education (Management)",
    institution: "Jagannath Secondary School",
    year: "Passed in 2080 BS",
    details: "Focusing on Finance, Account, and Economics.",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-gray-900 uppercase">
            [ Education ]
          </h2>
        </div>

        <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="mb-10 ml-8 relative"
            >
              {/* The Dot on the vertical bar */}
              <div className="absolute -left-10.25 mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-cyan-600 shadow-sm" />

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {edu.degree}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700">
                    <Calendar size={12} />
                    {edu.year}
                  </span>
                </div>

                <p className="text-cyan-600 font-medium text-sm mb-2">
                  {edu.institution}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
