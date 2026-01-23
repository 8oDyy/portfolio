'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 200 }
  }
};

function ConfettiParticle({ color, delay, offsetX, offsetY, rotation }: { color: string; delay: number; offsetX: number; offsetY: number; rotation: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ scale: 0, x: 0, y: 0 }}
      animate={{
        scale: [0, 1, 0],
        x: offsetX,
        y: offsetY,
        rotate: rotation,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

const confettiOffsets = [
  { x: -45, y: -30, r: 45 }, { x: 50, y: -25, r: 120 }, { x: -30, y: 45, r: 200 },
  { x: 40, y: 35, r: 280 }, { x: -50, y: 10, r: 60 }, { x: 25, y: -45, r: 150 },
  { x: -15, y: 50, r: 240 }, { x: 45, y: -10, r: 320 }, { x: -40, y: -40, r: 90 },
  { x: 30, y: 50, r: 180 }, { x: -25, y: 20, r: 270 }, { x: 50, y: 45, r: 350 },
];

function TechCard({ tech }: { tech: typeof technologies[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const Icon = tech.icon;

  const handleHover = () => {
    setIsHovered(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 600);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        boxShadow: `0 20px 60px ${tech.color}30`
      }}
      className="relative glass p-6 rounded-2xl cursor-pointer overflow-hidden group"
    >
      {/* Confetti burst */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {confettiOffsets.map((offset, i) => (
              <ConfettiParticle 
                key={i} 
                color={tech.color} 
                delay={i * 0.03}
                offsetX={offset.x}
                offsetY={offset.y}
                rotation={offset.r}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Glow background on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Icon avec scale-up */}
      <motion.div 
        className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${tech.gradient} p-4 mb-4`}
        animate={isHovered ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon className="w-full h-full text-white" />
        
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `2px solid ${tech.color}` }}
          animate={isHovered ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{tech.category}</h3>
      
      {/* Items avec stagger */}
      <motion.div 
        className="space-y-2 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tech.items.map((item, i) => (
          <motion.div
            key={item}
            variants={itemVariants}
            whileHover={{ x: 10, color: tech.color }}
            className="flex items-center gap-2 text-gray-300 transition-colors cursor-default"
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color }}
              animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            />
            <span className="text-sm">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ 
          border: `1px solid ${tech.color}`,
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Stack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stack" className="min-h-screen py-20 px-4 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
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
