import React from "react";
import { motion } from "framer-motion";

const CustomCursor = ({ mousePosition }) => {
  return (
    <>
      {/* Spotlight circle - follows with tight spring */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 700, damping: 20, mass: 0.2 }}
        className="fixed w-64 h-64 bg-blue-400/30 rounded-full pointer-events-none z-40"
        style={{
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)",
        }}
      />

      {/* Cursor pointer ring - follows with smoother spring */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 150, damping: 35, mass: 0.8 }}
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50"
        style={{
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          boxShadow: "inset 0 0 8px rgba(34, 211, 238, 0.4)",
        }}
      />
    </>
  );
};

export default CustomCursor;