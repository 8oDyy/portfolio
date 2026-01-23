'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="perspective-1000 h-[420px]"
      style={{ willChange: 'transform' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full cursor-pointer transition-transform duration-500"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="w-16 h-16 text-white/30" />
            </div>
            
            {/* Category badge */}
            <div 
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: `${project.color}80` }}
            >
              {project.category}
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.7)',
                opacity: isFlipped ? 1 : 0
              }}
            >
              <Eye className="w-8 h-8 text-white" />
              <span className="text-white font-medium">Voir détails</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">
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
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: `${project.color}40` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: `${project.color}30`, border: `1px solid ${project.color}50` }}
            >
              <Github size={18} />
              <span>Code</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-black font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: project.color }}
            >
              <ExternalLink size={18} />
              <span>Demo</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-black relative overflow-hidden">
      {/* Background - statique pour performance */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)' }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Code2 className="w-4 h-4" style={{ color: '#00f0ff' }} />
            <span className="text-sm text-gray-400">Travaux récents</span>
          </div>
          
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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'text-black'
                  : 'glass text-gray-300 hover:text-white'
              }`}
              style={selectedCategory === category ? { background: 'linear-gradient(135deg, #00f0ff, #00ff88)' } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
