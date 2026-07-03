// components/Footer.jsx
import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/moon366",
      label: "GitHub",
      color: "text-gray-700 hover:text-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aayusa-neupane-445a1a351/",
      label: "LinkedIn",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      icon: Twitter,
      href: "https://x.com/AayusaNeu", 
      label: "Twitter",
      color: "text-sky-500 hover:text-sky-600",
    },
    {
      icon: Mail,
      href: "mailto:aayusaneupane49@gmail.com",
      label: "Email",
      color: "text-red-500 hover:text-red-600",
    },
  ];

  return (
    <footer className="py-12 bg-linear-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Aayusa Neupane
              <motion.span
                animate={{ rotate: [0, 15, -10, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                className="inline-block origin-bottom text-xl select-none"
                title="🌻"
              >
                🌻
              </motion.span>
            </h3>
            <p className="text-sm text-gray-600">
              FullStack Developer &amp; Student
            </p>
            <p className="text-xs text-gray-500">
              Building interactive web experiences
            </p>
          </motion.div>

          {/* Middle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h4 className="font-semibold text-gray-900 text-sm">Contact</h4>
            <p className="text-sm text-gray-600">
              📧 aayusaneupane49@gmail.com
            </p>
            <p className="text-sm text-gray-600">📍 Butwal, Nepal</p>
            <p className="text-sm text-gray-600">🎓 Butwal Kalika Campus</p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-gray-900 text-sm">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`${social.color} transition-all duration-300 hover:scale-110`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0"
        >
          <p className="flex items-center gap-1.5">
            🌻 © {currentYear} Aayusa Neupane — FullStack Developer. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Sitemap
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;