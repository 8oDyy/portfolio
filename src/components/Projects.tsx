'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Eye, Code2, Layers } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce complète avec panier, paiement et gestion admin. Interface moderne et responsive.',
    longDescription: 'Solution e-commerce full-stack avec gestion des stocks, système de paiement Stripe, tableau de bord admin et analytics en temps réel.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    github: 'https://github.com/votre-username/projet1',
    demo: 'https://demo-projet1.vercel.app',
    category: 'Fullstack',
    color: '#00f0ff',
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Dashboard de visualisation de données en temps réel avec graphiques interactifs et KPIs.',
    longDescription: 'Interface de data visualization avec graphiques D3.js, filtres dynamiques, export PDF et notifications en temps réel.',
    tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/votre-username/projet2',
    demo: 'https://demo-projet2.vercel.app',
    category: 'Frontend',
    color: '#00ff88',
  },
  {
    id: 3,
    title: 'Social Media App',
    description: 'Application sociale avec posts, likes, commentaires et messagerie en temps réel.',
    longDescription: 'Réseau social complet avec système de followers, feed personnalisé, messagerie instantanée et notifications push.',
    tech: ['Next.js', 'Socket.io', 'Redis', 'AWS'],
    github: 'https://github.com/votre-username/projet3',
    demo: 'https://demo-projet3.vercel.app',
    category: 'Fullstack',
    color: '#b000ff',
  },
  {
    id: 4,
    title: 'Portfolio Créatif',
    description: 'Portfolio interactif avec animations avancées et expériences immersives.',
    longDescription: 'Site portfolio avec animations Framer Motion, effets parallax, transitions fluides et design glassmorphism.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'TypeScript'],
    github: 'https://github.com/votre-username/projet4',
    demo: 'https://demo-projet4.vercel.app',
    category: 'Frontend',
    color: '#ff6b00',
  },
  {
    id: 5,
    title: 'API REST Microservices',
    description: 'Architecture microservices avec API REST, authentification JWT et documentation Swagger.',
    longDescription: 'Backend scalable avec architecture microservices, API Gateway, authentification OAuth2 et monitoring.',
    tech: ['Node.js', 'Express', 'Docker', 'MongoDB'],
    github: 'https://github.com/votre-username/projet5',
    demo: 'https://demo-projet5.vercel.app',
    category: 'Backend',
    color: '#00f0ff',
  },
  {
    id: 6,
    title: 'AI Chat Assistant',
    description: 'Assistant conversationnel IA avec interface moderne et intégration d\'APIs d\'intelligence artificielle.',
    longDescription: 'Chatbot intelligent avec intégration OpenAI, historique de conversations, et personnalisation du comportement.',
    tech: ['Next.js', 'OpenAI', 'Tailwind', 'Vercel'],
    github: 'https://github.com/votre-username/projet6',
    demo: 'https://demo-projet6.vercel.app',
    category: 'Fullstack',
    color: '#00ff88',
  },
];

const categories = ['Tous', 'Frontend', 'Backend', 'Fullstack'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      layout
      className="perspective-1000 h-[420px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 glass rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image placeholder avec gradient */}
          <div 
            className="relative h-48 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: isFlipped ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Layers className="w-16 h-16 text-white/30" />
            </motion.div>
            
            {/* Category badge */}
            <div 
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: `${project.color}80` }}
            >
              {project.category}
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            >
              <Eye className="w-8 h-8 text-white" />
              <span className="text-white font-medium">Voir détails</span>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 
              className="text-xl font-bold text-white mb-2 transition-colors"
              style={{ color: isFlipped ? project.color : 'white' }}
            >
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md text-white/80"
                  style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}30` }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500">+{project.tech.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 glass rounded-2xl p-6 flex flex-col"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${project.color}15, transparent)`,
            border: `1px solid ${project.color}30`
          }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color: project.color }}>
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm mb-4 flex-grow">
            {project.longDescription}
          </p>

          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: isFlipped ? 1 : 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-xs px-3 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: `${project.color}40` }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all"
              style={{ backgroundColor: `${project.color}30`, border: `1px solid ${project.color}50` }}
            >
              <Github size={18} />
              <span>Code</span>
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-black font-medium"
              style={{ backgroundColor: project.color }}
            >
              <ExternalLink size={18} />
              <span>Demo</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-4 bg-black relative overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-neon-blue/5 blur-3xl"
        style={{ y }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isHeaderInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
          >
            <Code2 className="w-4 h-4 text-neon-blue" />
            <span className="text-sm text-gray-400">Travaux récents</span>
          </motion.div>
          
          <h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mes Projets
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Une sélection de mes réalisations récentes
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all relative overflow-hidden ${
                selectedCategory === category
                  ? 'text-black'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-green"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
