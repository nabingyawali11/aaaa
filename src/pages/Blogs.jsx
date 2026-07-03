// components/Blogs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: 'Why React Server Components are the future',
    date: 'Feb 12, 2025',
    excerpt: 'Exploring the paradigm shift in rendering and performance benefits for modern apps.',
  },
  {
    title: 'Mastering Tailwind CSS: Composition patterns',
    date: 'Jan 28, 2025',
    excerpt: 'Write cleaner, reusable styles with Tailwind’s @apply and component abstraction.',
  },
  {
    title: 'Mobile first: Flutter vs React Native in 2025',
    date: 'Jan 10, 2025',
    excerpt: 'Performance, developer experience and real-world use cases.',
  },
];

const Blogs = () => {
  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-10"># BLOGS</h2>
          <div className="space-y-7">
            {blogs.map((blog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group border-b border-gray-200 pb-6 last:border-0 flex flex-col md:flex-row md:justify-between md:items-start gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <CalendarDays size={14} />
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mt-1 max-w-2xl">{blog.excerpt}</p>
                </div>
                <button className="flex items-center gap-1 text-gray-500 group-hover:text-gray-800 text-sm font-medium shrink-0">
                  Read <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;