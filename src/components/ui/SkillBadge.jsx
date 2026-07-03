// src/components/ui/SkillBadge.jsx
import { motion } from "framer-motion";

const SkillBadge = ({ name, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-6 bg-[#111] border border-gray-900 rounded-lg hover:border-gray-700 transition-colors group"
    >
      {Icon && <Icon className="w-8 h-8 mb-3 text-gray-500 group-hover:text-white transition-colors" />}
      <span className="text-sm font-mono text-gray-400 group-hover:text-white">
        {name}
      </span>
    </motion.div>
  );
};

export default SkillBadge;