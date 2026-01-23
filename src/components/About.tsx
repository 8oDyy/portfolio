'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="perspective-1000 h-64"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 glass p-6 rounded-xl backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            animate={{ scale: isFlipped ? 0.8 : 1 }}
            className="h-full flex flex-col"
          >
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
          </motion.div>
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
            {skill.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ scale: 0 }}
                animate={{ scale: isFlipped ? 1 : 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: `${skill.color}30`, border: `1px solid ${skill.color}50` }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative pl-8 group"
    >
      {/* Timeline line */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-green to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: index * 0.15, duration: 0.5 }}
        style={{ originY: 0 }}
      />
      
      {/* Dot */}
      <motion.div 
        className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-neon-blue"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
        whileHover={{ scale: 1.5, boxShadow: '0 0 20px #00f0ff' }}
      />
      
      <motion.div 
        className="glass p-5 rounded-xl mb-6 group-hover:bg-white/10 transition-all"
        whileHover={{ x: 10, boxShadow: '0 10px 40px rgba(0, 240, 255, 0.1)' }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-neon-green/20 text-neon-green">
            {item.year}
          </span>
          <span className="text-neon-blue text-sm">{item.company}</span>
        </div>
        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
        <p className="text-gray-400 text-sm">{item.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-4 bg-black relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-neon-blue/5 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl"
        style={{ y: y2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header avec parallax */}
        <motion.div
          ref={headerRef}
          style={{ opacity }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            À propos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Passionné par le développement web et les technologies innovantes, 
            je crée des expériences digitales uniques et performantes.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Timeline avec parallax */}
          <motion.div style={{ y: y2 }}>
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-neon-blue mb-8 flex items-center gap-3"
            >
              <span className="w-10 h-1 bg-neon-blue rounded-full" />
              Mon Parcours
            </motion.h3>
            <div className="space-y-2">
              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Skills avec flip cards */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-neon-green mb-8 flex items-center gap-3"
            >
              <span className="w-10 h-1 bg-neon-green rounded-full" />
              Compétences
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <FlipCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Bio avec effet parallax */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <motion.div 
            className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden"
            whileHover={{ boxShadow: '0 20px 60px rgba(0, 240, 255, 0.1)' }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple" />
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto text-center">
              Fort de plusieurs années d&apos;expérience dans le développement web, je me spécialise dans la création d&apos;applications modernes et performantes. 
              Mon approche combine <span className="text-neon-blue font-semibold">expertise technique</span>, <span className="text-neon-green font-semibold">créativité</span> et <span className="text-neon-purple font-semibold">attention aux détails</span> pour livrer des solutions qui dépassent les attentes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
