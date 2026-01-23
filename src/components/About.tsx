'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Database, Palette, Rocket, ChevronRight } from 'lucide-react';

const skills = [
  { name: 'Frontend', icon: Code, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'], color: '#00f0ff', description: 'Interfaces modernes et réactives' },
  { name: 'Backend', icon: Database, items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'], color: '#00ff88', description: 'APIs robustes et scalables' },
  { name: 'Design', icon: Palette, items: ['Figma', 'UI/UX', 'Animations', 'Motion'], color: '#b000ff', description: 'Expériences visuelles immersives' },
  { name: 'DevOps', icon: Rocket, items: ['Docker', 'CI/CD', 'AWS', 'Vercel'], color: '#ff6b00', description: 'Déploiement et automatisation' },
];

const timeline = [
  { year: '2024', title: 'Développeur Fullstack Senior', company: 'Tech Company', description: 'Lead technique sur projets web innovants' },
  { year: '2022', title: 'Développeur Frontend', company: 'Startup Inc', description: 'Création d\'interfaces modernes et performantes' },
  { year: '2020', title: 'Développeur Junior', company: 'Digital Agency', description: 'Apprentissage et développement web' },
  { year: '2019', title: 'Formation Développement Web', company: 'École/Bootcamp', description: 'Diplôme en développement web fullstack' },
];

function FlipCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = skill.icon;

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
              style={{ backgroundColor: `${skill.color}20`, border: `1px solid ${skill.color}40` }}
            >
              <Icon className="w-7 h-7" style={{ color: skill.color }} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{skill.name}</h4>
            <p className="text-sm text-gray-400 mb-4">{skill.description}</p>
            <div className="mt-auto flex items-center gap-1 text-xs text-gray-500">
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
            background: `linear-gradient(135deg, ${skill.color}10, transparent)`,
            border: `1px solid ${skill.color}30`
          }}
        >
          <h4 className="text-lg font-bold mb-4" style={{ color: skill.color }}>{skill.name}</h4>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span
                key={item}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: `${skill.color}30`, border: `1px solid ${skill.color}50` }}
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
        style={{ background: 'linear-gradient(to bottom, #00f0ff, #00ff88, transparent)' }}
      />
      
      {/* Dot */}
      <div 
        className="absolute left-[-6px] top-2 w-3 h-3 rounded-full transition-transform hover:scale-150"
        style={{ backgroundColor: '#00f0ff' }}
      />
      
      <div className="glass p-5 rounded-xl mb-6 transition-all duration-300 hover:translate-x-2 hover:bg-white/10">
        <div className="flex items-center gap-3 mb-2">
          <span 
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'rgba(0, 255, 136, 0.2)', color: '#00ff88' }}
          >
            {item.year}
          </span>
          <span style={{ color: '#00f0ff' }} className="text-sm">{item.company}</span>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-gray-400 text-sm">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 bg-black relative overflow-hidden">
      {/* Background elements statiques */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)' }}
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
          <h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            À propos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionné par le développement web et les technologies innovantes, 
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
              style={{ color: '#00f0ff' }}
            >
              <span className="w-10 h-1 rounded-full" style={{ backgroundColor: '#00f0ff' }} />
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
              style={{ color: '#00ff88' }}
            >
              <span className="w-10 h-1 rounded-full" style={{ backgroundColor: '#00ff88' }} />
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
            style={{ background: 'linear-gradient(to right, #00f0ff, #00ff88, #b000ff)' }}
          />
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
            Fort de plusieurs années d&apos;expérience dans le développement web, je me spécialise dans la création d&apos;applications modernes et performantes. 
            Mon approche combine <span style={{ color: '#00f0ff' }} className="font-semibold">expertise technique</span>, <span style={{ color: '#00ff88' }} className="font-semibold">créativité</span> et <span style={{ color: '#b000ff' }} className="font-semibold">attention aux détails</span> pour livrer des solutions qui dépassent les attentes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
