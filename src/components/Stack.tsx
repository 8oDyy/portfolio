'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Zap } from 'lucide-react';

const technologies = [
  { 
    category: 'Frontend', 
    icon: Code,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
    colorVar: '--neon-blue',
  },
  { 
    category: 'Backend', 
    icon: Database,
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
    colorVar: '--neon-green',
  },
  { 
    category: 'DevOps', 
    icon: Cloud,
    items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Nginx', 'CI/CD'],
    colorVar: '--neon-purple',
  },
  { 
    category: 'Tools', 
    icon: Wrench,
    items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'ESLint'],
    colorVar: '--neon-orange',
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
  const color = `var(${tech.colorVar})`;

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
          background: `radial-gradient(circle at center, color-mix(in srgb, ${color} 20%, transparent) 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div 
        className="relative w-16 h-16 rounded-xl p-4 mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 80%, transparent))` }}
      >
        <Icon className="w-full h-full" style={{ color: 'var(--background)' }} />
      </div>
      
      <h3 className="text-2xl font-bold mb-4 relative z-10" style={{ color: 'var(--text-primary)' }}>{tech.category}</h3>
      
      {/* Items */}
      <div className="space-y-2 relative z-10">
        {tech.items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 transition-all duration-200 hover:translate-x-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{ border: `1px solid ${color}` }}
      />
    </motion.div>
  );
}

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stack" className="min-h-screen py-20 px-6 relative overflow-hidden bg-primary">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--background), var(--background-secondary), var(--background))' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--gradient-glow-blue) 0%, transparent 70%)' }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            Ma Stack Technique
          </h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Technologies et outils que j&apos;utilise au quotidien
          </motion.p>
        </motion.div>

        {/* Grid */}
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
          <p 
            className="text-lg inline-flex items-center gap-2"
            style={{ color: 'var(--text-muted)' }}
          >
            <Zap className="w-5 h-5" style={{ color: 'var(--neon-blue)' }} />
            Toujours en apprentissage continu pour rester à jour avec les dernières technologies
            <Zap className="w-5 h-5" style={{ color: 'var(--neon-green)' }} />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
