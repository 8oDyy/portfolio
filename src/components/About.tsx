'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Database, Palette, Rocket, ChevronRight } from 'lucide-react';

const skills = [
  { name: 'Frontend', icon: Code, items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Flutter', 'C/C++'], colorVar: '--neon-blue', description: 'Interfaces modernes et réactives' },
  { name: 'Backend', icon: Database, items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Supabase'], colorVar: '--neon-green', description: 'APIs robustes et scalables' },
  { name: 'Design', icon: Palette, items: ['Figma', 'UI/UX', 'Animations', 'Motion'], colorVar: '--neon-purple', description: 'Expériences visuelles immersives' },
  { name: 'DevOps', icon: Rocket, items: ['Docker', 'CI/CD', 'AWS', 'Vercel', 'Azure'], colorVar: '--neon-orange', description: 'Déploiement et automatisation' },
];

const timeline = [
  { year: '2026', title: 'BTS CIEL', company: 'Saint Michel Annecy', description: 'Développement fullstack d\'applications web innovantes et sécurisées.' },
  { year: '2025', title: 'Creation Alp-Web', company: 'Agence Web', description: 'Conception d\'interfaces modernes et performantes avec stacks variées' },
  { year: '2023', title: 'Ecole 42', company: 'Lyon', description: 'Formation intensive en algorithmique et développement logiciel collaboratif."' },
  { year: '2022', title: 'Baccalauréat', company: 'Louis Armand Chambery', description: 'Fondations solides en sciences et résolution de problèmes techniques.' },
];

function FlipCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = skill.icon;
  const color = `var(${skill.colorVar})`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="perspective-1000 h-64"
      style={{ willChange: 'transform, opacity' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 glass p-6 rounded-xl backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full flex flex-col">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 40%, transparent)` }}
            >
              <Icon className="w-7 h-7" style={{ color }} />
            </div>
            <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{skill.name}</h4>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{skill.description}</p>
            <div className="mt-auto flex items-center gap-1 text-xs" style={{ color: 'var(--text-subtle)' }}>
              <span>Hover pour voir les skills</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 glass p-6 rounded-xl backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, color-mix(in srgb, ${color} 10%, transparent), transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`
          }}
        >
          <h4 className="text-lg font-bold mb-4" style={{ color }}>{skill.name}</h4>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span
                key={item}
                className="px-3 py-2 rounded-lg text-sm font-medium"
                style={{ 
                  backgroundColor: `color-mix(in srgb, ${color} 30%, transparent)`, 
                  border: `1px solid color-mix(in srgb, ${color} 50%, transparent)`,
                  color: 'var(--text-primary)'
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative pl-8 group"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Timeline line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ background: 'linear-gradient(to bottom, var(--neon-blue), var(--neon-green), transparent)' }}
      />
      
      {/* Dot */}
      <div 
        className="absolute left-[-6px] top-2 w-3 h-3 rounded-full transition-transform hover:scale-150"
        style={{ backgroundColor: 'var(--neon-blue)' }}
      />
      
      <div className="glass p-5 rounded-xl mb-6 transition-all duration-300 hover:translate-x-2">
        <div className="flex items-center gap-3 mb-2">
          <span 
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'color-mix(in srgb, var(--neon-green) 20%, transparent)', color: 'var(--neon-green)' }}
          >
            {item.year}
          </span>
          <span style={{ color: 'var(--neon-blue)' }} className="text-sm">{item.company}</span>
        </div>
        <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative overflow-hidden bg-primary">
      {/* Background elements */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--gradient-glow-blue)' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--gradient-glow-green)' }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            À propos
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Passionné par le développement et les technologies innovantes,
            je crée des expériences digitales uniques et performantes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Timeline */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-8 flex items-center gap-3"
              style={{ color: 'var(--neon-blue)' }}
            >
              <span className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--neon-blue)' }} />
              Mon Parcours
            </motion.h3>
            <div className="space-y-2">
              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Skills avec flip cards */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-8 flex items-center gap-3"
              style={{ color: 'var(--neon-green)' }}
            >
              <span className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--neon-green)' }} />
              Compétences
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <FlipCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{ background: 'linear-gradient(to right, var(--neon-blue), var(--neon-green), var(--neon-purple))' }}
          />
          
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-center" style={{ color: 'var(--text-secondary)' }}>
            Avec plusieurs projets concrets à mon actif en <span style={{ color: 'var(--neon-blue)' }} className="font-semibold">développement web</span>, je me spécialise dans la création d’<span style={{ color: 'var(--neon-green)' }} className="font-semibold">applications modernes, rapides et soignées</span>.
            J’aime construire “proprement”, avec une vraie attention à l’UX et aux détails, pour livrer des solutions <span style={{ color: 'var(--neon-purple)' }} className="font-semibold">fiables et efficaces</span>, adaptées aux besoins réels du client.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
