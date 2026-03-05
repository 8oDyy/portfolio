'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Zap } from 'lucide-react';

const technologies = [
  { 
    category: 'Frontend', 
    icon: Code,
    items: ['React', 'Next.js','Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'HTML/CSS', 'C/C++', 'Dart', 'Flutter' ],
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

function TechCard({ tech, index, scrollYProgress }: { tech: typeof technologies[0]; index: number; scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const Icon = tech.icon;
  const color = `var(${tech.colorVar})`;

  const total = technologies.length;
  // Each card animates within its own slice of the scroll progress
  const start = index / total;
  const end = (index + 0.8) / total;

  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [start, start + 0.1], [80, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.85, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative glass p-6 rounded-2xl overflow-hidden group"
    >
      {/* Glow background on hover */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at center, color-mix(in srgb, ${color} 20%, transparent) 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div 
        className="relative w-16 h-16 rounded-xl p-4 mb-4"
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
            className="flex items-center gap-2"
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
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
        style={{ border: `1px solid ${color}` }}
      />
    </motion.div>
  );
}

export default function Stack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

  const bottomOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const bottomY = useTransform(scrollYProgress, [0.85, 0.95], [30, 0]);

  return (
    // The outer wrapper is tall to create scroll room — the sticky inner section stays locked in view
    <section id="stack" ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10 w-full px-6">
          {/* Title */}
          <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Ma Stack Technique
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Technologies et outils que j&apos;utilise au quotidien
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
              <TechCard key={tech.category} tech={tech} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Bottom text */}
          <motion.div style={{ opacity: bottomOpacity, y: bottomY }} className="mt-16 text-center">
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
      </div>
    </section>
  );
}
