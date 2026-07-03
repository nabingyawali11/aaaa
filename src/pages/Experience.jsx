// components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'TechFlow Solutions',
    period: '2023 – Present',
    description: 'Architecting scalable web apps with React, Node.js and leading frontend team.',
  },
  {
    title: 'Software Engineer (Mobile)',
    company: 'AppForge Labs',
    period: '2021 – 2023',
    description: 'Built cross-platform apps using Flutter & React Native, integrated REST APIs and push notifications.',
  },
  {
    title: 'Junior Web Developer',
    company: 'Creative Dev Studio',
    period: '2019 – 2021',
    description: 'Developed dynamic websites using JavaScript, Tailwind, and Spring Boot.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50/40">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-10">
            <Briefcase size={28} className="text-gray-700" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Experience</h2>
          </div>
          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-gray-300 pl-6 md:pl-8"
              >
                <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                <div className="flex flex-wrap gap-2 items-center mt-1 text-gray-600 text-sm font-medium">
                  <span>{exp.company}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-700 mt-3 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;