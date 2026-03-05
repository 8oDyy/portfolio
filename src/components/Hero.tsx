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
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, var(--gradient-glow-blue) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--gradient-glow-purple) 0%, transparent 50%)',
        }}
      />

      {/* Contenu principal */}
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
        >
          <Sparkles className="w-4 h-4 text-accent-blue" style={{ color: 'var(--neon-blue)' }} />
          <span className="text-sm text-muted" style={{ color: 'var(--text-muted)' }}>Disponible pour de nouveaux projets</span>
        </motion.div>

        {/* Nom */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient"
        >
          BOULICAUT--RAFFORT Hugo
        </motion.h1>
        
        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
          <p className="text-xl md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
            Développeur Fullstack
          </p>
          <p className="text-xl md:text-2xl mt-2" style={{ color: 'var(--neon-blue)' }}>
            Créateur d&apos;expériences modernes
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#projects"
            className="px-8 py-4 font-bold rounded-full transition-transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-green))',
              color: 'var(--background)'
            }}
          >
            Voir mes projets
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 font-bold rounded-full glass transition-transform hover:scale-105"
            style={{ 
              borderColor: 'var(--neon-blue)', 
              borderWidth: '2px', 
              color: 'var(--neon-blue)' 
            }}
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
            { number: "3+", label: "Années d'expérience" },
            { number: "10+", label: "Projets réalisés" },
            { number: "Alternance", label: "En recherche" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass p-4 rounded-xl"
            >
              <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--neon-blue)' }}>
                {stat.number}
              </div>
              <div className="text-xs md:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Scroll</span>
          <div 
            className="w-6 h-10 rounded-full flex justify-center"
            style={{ borderColor: 'var(--neon-blue)', borderWidth: '2px', opacity: 0.5 }}
          >
            <div 
              className="w-1 h-3 rounded-full mt-2 animate-bounce"
              style={{ backgroundColor: 'var(--neon-blue)' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
