'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/lib/parallax';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// Pre-defined particles to avoid Math.random() in render and setState in useEffect
const staticParticles: Particle[] = [
  { id: 0, x: 15, y: 25, size: 4, delay: 0.1, duration: 4 },
  { id: 1, x: 85, y: 15, size: 6, delay: 0.3, duration: 5 },
  { id: 2, x: 45, y: 80, size: 3, delay: 0.5, duration: 3.5 },
  { id: 3, x: 70, y: 45, size: 5, delay: 0.2, duration: 4.5 },
  { id: 4, x: 25, y: 60, size: 4, delay: 0.7, duration: 5.5 },
  { id: 5, x: 90, y: 70, size: 3, delay: 0.4, duration: 3 },
  { id: 6, x: 10, y: 85, size: 6, delay: 0.6, duration: 4 },
  { id: 7, x: 55, y: 20, size: 4, delay: 0.8, duration: 5 },
  { id: 8, x: 35, y: 40, size: 5, delay: 0.1, duration: 4.5 },
  { id: 9, x: 75, y: 90, size: 3, delay: 0.9, duration: 3.5 },
  { id: 10, x: 5, y: 50, size: 4, delay: 0.2, duration: 5 },
  { id: 11, x: 60, y: 65, size: 6, delay: 0.4, duration: 4 },
  { id: 12, x: 40, y: 10, size: 3, delay: 0.6, duration: 3 },
  { id: 13, x: 80, y: 35, size: 5, delay: 0.3, duration: 5.5 },
  { id: 14, x: 20, y: 75, size: 4, delay: 0.8, duration: 4.5 },
  { id: 15, x: 95, y: 55, size: 3, delay: 0.1, duration: 3.5 },
  { id: 16, x: 50, y: 95, size: 6, delay: 0.5, duration: 5 },
  { id: 17, x: 30, y: 30, size: 4, delay: 0.7, duration: 4 },
  { id: 18, x: 65, y: 5, size: 5, delay: 0.2, duration: 4.5 },
  { id: 19, x: 12, y: 42, size: 3, delay: 0.9, duration: 3 },
  { id: 20, x: 88, y: 78, size: 4, delay: 0.4, duration: 5.5 },
  { id: 21, x: 42, y: 58, size: 6, delay: 0.6, duration: 4 },
  { id: 22, x: 72, y: 22, size: 3, delay: 0.3, duration: 3.5 },
  { id: 23, x: 8, y: 68, size: 5, delay: 0.8, duration: 5 },
  { id: 24, x: 58, y: 88, size: 4, delay: 0.1, duration: 4.5 },
  { id: 25, x: 28, y: 12, size: 3, delay: 0.5, duration: 3 },
  { id: 26, x: 78, y: 52, size: 6, delay: 0.7, duration: 5.5 },
  { id: 27, x: 48, y: 32, size: 4, delay: 0.2, duration: 4 },
  { id: 28, x: 18, y: 92, size: 5, delay: 0.9, duration: 4.5 },
  { id: 29, x: 92, y: 8, size: 3, delay: 0.4, duration: 3.5 },
  { id: 30, x: 38, y: 72, size: 4, delay: 0.6, duration: 5 },
  { id: 31, x: 68, y: 38, size: 6, delay: 0.3, duration: 4 },
  { id: 32, x: 3, y: 18, size: 3, delay: 0.8, duration: 3 },
  { id: 33, x: 53, y: 48, size: 5, delay: 0.1, duration: 5.5 },
  { id: 34, x: 83, y: 82, size: 4, delay: 0.5, duration: 4.5 },
  { id: 35, x: 23, y: 2, size: 3, delay: 0.7, duration: 3.5 },
  { id: 36, x: 63, y: 62, size: 6, delay: 0.2, duration: 5 },
  { id: 37, x: 33, y: 98, size: 4, delay: 0.9, duration: 4 },
  { id: 38, x: 97, y: 28, size: 5, delay: 0.4, duration: 4.5 },
  { id: 39, x: 7, y: 58, size: 3, delay: 0.6, duration: 3 },
];

const textRevealVariants = {
  hidden: { 
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0 
  },
  visible: { 
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

function MouseRepulsiveParticle({ particle, mouseX, mouseY }: { 
  particle: Particle; 
  mouseX: number; 
  mouseY: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const particleCenterX = rect.left + rect.width / 2;
    const particleCenterY = rect.top + rect.height / 2;
    
    const dx = particleCenterX - mouseX;
    const dy = particleCenterY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const repulsionRadius = 150;
    
    if (distance < repulsionRadius && distance > 0) {
      const force = (repulsionRadius - distance) / repulsionRadius;
      setOffset({
        x: (dx / distance) * force * 60,
        y: (dy / distance) * force * 60,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full bg-gradient-to-r from-neon-blue to-neon-green"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
      }}
      animate={{
        x: offset.x,
        y: offset.y,
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        x: { type: 'spring', stiffness: 100, damping: 15 },
        y: { type: 'spring', stiffness: 100, damping: 15 },
        scale: { duration: particle.duration, repeat: Infinity, delay: particle.delay },
        opacity: { duration: particle.duration, repeat: Infinity, delay: particle.delay },
      }}
    />
  );
}

export default function Hero() {
  const mouse = useMousePosition();
  
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(useMotionValue(0), springConfig);
  const mouseYSpring = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    mouseXSpring.set(mouse.x);
    mouseYSpring.set(mouse.y);
  }, [mouse.x, mouse.y, mouseXSpring, mouseYSpring]);

  const bgRotate = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-5, 5]);
  const bgScale = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [1, 1.1]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* SVG Gradient Background animé */}
      <motion.div 
        className="absolute inset-0"
        style={{ rotate: bgRotate, scale: bgScale }}
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id="heroGradient1" cx="30%" cy="30%" r="60%">
              <motion.stop
                offset="0%"
                animate={{ stopColor: ['#00f0ff20', '#00ff8820', '#00f0ff20'] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="heroGradient2" cx="70%" cy="70%" r="50%">
              <motion.stop
                offset="0%"
                animate={{ stopColor: ['#b000ff15', '#00f0ff15', '#b000ff15'] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient1)" />
          <rect width="100%" height="100%" fill="url(#heroGradient2)" />
        </svg>
      </motion.div>

      {/* Cercles animés avec rotation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'conic-gradient(from 0deg, transparent, #00f0ff, transparent, #00ff88, transparent)',
          filter: 'blur(60px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'conic-gradient(from 180deg, transparent, #b000ff, transparent, #00f0ff, transparent)',
          filter: 'blur(80px)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Particules mouse-repulsives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {staticParticles.map((particle) => (
          <MouseRepulsiveParticle
            key={particle.id}
            particle={particle}
            mouseX={mouse.x}
            mouseY={mouse.y}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-neon-blue/30 mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-neon-blue" />
          </motion.div>
          <span className="text-sm text-gray-300">Disponible pour de nouveaux projets</span>
        </motion.div>

        {/* Nom avec clip-path reveal et glow */}
        <motion.div className="relative mb-6">
          <motion.h1
            variants={textRevealVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-green"
            style={{
              textShadow: '0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(0, 240, 255, 0.3)',
            }}
          >
            Votre Nom
          </motion.h1>
          {/* Glow layer */}
          <motion.h1
            variants={textRevealVariants}
            className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-green blur-xl opacity-50"
            aria-hidden
          >
            Votre Nom
          </motion.h1>
        </motion.div>
        
        {/* Tagline avec animation de typing */}
        <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300">
            Développeur Fullstack JavaScript
          </p>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-neon-blue mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Créateur d&apos;expériences web modernes
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(0, 240, 255, 0.6), 0 0 80px rgba(0, 240, 255, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-black font-bold rounded-full relative overflow-hidden group"
          >
            <span className="relative z-10">Voir mes projets</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass border-2 border-neon-blue text-neon-blue font-bold rounded-full relative overflow-hidden group"
          >
            <span className="relative z-10">Me contacter</span>
            <motion.div
              className="absolute inset-0 bg-neon-blue"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: '9999px' }}
            />
          </motion.a>
        </motion.div>

        {/* Stats avec hover effect */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "5+", label: "Années d'expérience" },
            { number: "50+", label: "Projets réalisés" },
            { number: "100%", label: "Clients satisfaits" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 10px 40px rgba(0, 240, 255, 0.2)" 
              }}
              className="glass p-4 rounded-xl cursor-default"
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-neon-blue"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.2, type: 'spring' }}
              >
                {stat.number}
              </motion.div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-neon-blue rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
