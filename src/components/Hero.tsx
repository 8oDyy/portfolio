'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background gradient simple */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(0, 240, 255, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(176, 0, 255, 0.08) 0%, transparent 50%)',
        }}
      />

      {/* Contenu principal - centré avec pt pour la navbar */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass"
          style={{ borderColor: 'rgba(0, 240, 255, 0.3)', borderWidth: '1px' }}
        >
          <Sparkles className="w-4 h-4" style={{ color: '#00f0ff' }} />
          <span className="text-sm text-gray-300">Disponible pour de nouveaux projets</span>
        </motion.div>

        {/* Nom */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{
            background: 'linear-gradient(135deg, #00f0ff, #ffffff, #00ff88)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Votre Nom
        </motion.h1>
        
        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
          <p className="text-xl md:text-2xl text-gray-300">
            Développeur Fullstack JavaScript
          </p>
          <p className="text-xl md:text-2xl mt-2" style={{ color: '#00f0ff' }}>
            Créateur d&apos;expériences web modernes
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#projects"
            className="px-8 py-4 font-bold rounded-full text-black transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #00ff88)' }}
          >
            Voir mes projets
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 font-bold rounded-full glass transition-transform hover:scale-105"
            style={{ borderColor: '#00f0ff', borderWidth: '2px', color: '#00f0ff' }}
          >
            Me contacter
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "5+", label: "Années d'expérience" },
            { number: "50+", label: "Projets réalisés" },
            { number: "100%", label: "Clients satisfaits" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass p-4 rounded-xl"
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#00f0ff' }}>
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div 
            className="w-6 h-10 rounded-full flex justify-center"
            style={{ borderColor: 'rgba(0, 240, 255, 0.5)', borderWidth: '2px' }}
          >
            <div 
              className="w-1 h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: '#00f0ff' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
