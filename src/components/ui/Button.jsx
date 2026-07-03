// src/components/ui/Button.jsx
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn'; // Helper for tailwind-merge (optional)

const Button = ({ children, onClick, className, variant = 'primary', href }) => {
  const baseStyles = "px-8 py-3 font-medium transition-all duration-300 border inline-block text-center";
  const variants = {
    primary: "border-white text-white hover:bg-white hover:text-black",
    outline: "border-gray-700 text-gray-400 hover:border-white hover:text-white"
  };

  const content = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </motion.button>
  );

  if (href) return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
  return content;
};

export default Button;