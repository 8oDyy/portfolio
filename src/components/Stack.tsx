'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Zap } from 'lucide-react';

const technologies = [
  { 
    category: 'Frontend', 
    icon: Code,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
    color: '#00f0ff',
    gradient: 'from-cyan-500 to-blue-500'
  },
  { 
    category: 'Backend', 
    icon: Database,
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
    color: '#00ff88',
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    category: 'DevOps', 
    icon: Cloud,
    items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Nginx', 'CI/CD'],
    color: '#b000ff',
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    category: 'Tools', 
    icon: Wrench,
    items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'ESLint'],
    color: '#ff6b00',
    gradient: 'from-orange-500 to-red-500'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    }
  }
};

function TechCard({ tech }: { tech: typeof technologies[0] }) {
  const Icon = tech.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="relative glass p-6 rounded-2xl cursor-pointer overflow-hidden group transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
      style={{ willChange: 'transform' }}
    >
      {/* Glow background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div 
        className="relative w-16 h-16 rounded-xl p-4 mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${tech.color}, ${tech.color}80)` }}
      >
        <Icon className="w-full h-full text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{tech.category}</h3>
      
      {/* Items */}
      <div className="space-y-2 relative z-10">
        {tech.items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-gray-300 transition-all duration-200 hover:translate-x-2"
            style={{ ['--hover-color' as string]: tech.color }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{ border: `1px solid ${tech.color}` }}
      />
    </motion.div>
  );
}

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stack" className="min-h-screen py-20 px-6 bg-black relative overflow-hidden">
      {/* Background effects - statique pour performance */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #00ff88, #b000ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ma Stack Technique
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Technologies et outils que j&apos;utilise au quotidien
          </motion.p>
        </motion.div>

        {/* Grid staggered avec radial layout effect */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {technologies.map((tech) => (
            <TechCard key={tech.category} tech={tech} />
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.p 
            className="text-gray-400 text-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-5 h-5 text-neon-blue" />
            Toujours en apprentissage continu pour rester à jour avec les dernières technologies
            <Zap className="w-5 h-5 text-neon-green" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
