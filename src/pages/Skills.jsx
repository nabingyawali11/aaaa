import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { skillCategories } from "../data/info";

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tighter text-gray-900">
            [ Skills ]
          </h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-24">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-12"
            >
              <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight md:text-right md:pt-1">
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 min-h-[44px] rounded-lg px-3 py-2 transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  >
                    <Icon
                      icon={skill.icon}
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                    <span className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
