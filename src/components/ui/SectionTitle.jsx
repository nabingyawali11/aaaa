// src/components/ui/SectionTitle.jsx
import { motion } from 'framer-motion';

const SectionTitle = ({ number, title }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="text-gray-500 font-mono text-xl">{number}</span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">
        {title}
      </h2>
      <div className="h-px grow bg-gray-800 ml-4" />
    </motion.div>
  );
};

export default SectionTitle;