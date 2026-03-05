'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Code2, Layers, X, Info } from 'lucide-react';

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
    colorVar: '--neon-blue',
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
    colorVar: '--neon-green',
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
    colorVar: '--neon-purple',
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
    colorVar: '--neon-orange',
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
    colorVar: '--neon-blue',
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
    colorVar: '--neon-green',
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

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const color = `var(${project.colorVar})`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
        style={{
          border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
          background: 'var(--background-secondary)',
        }}
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${color} 12%, transparent) 0%, transparent 50%)` }}
        />

        {/* Sticky header */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 backdrop-blur-xl"
          style={{
            background: 'color-mix(in srgb, var(--background-secondary) 85%, transparent)',
            borderBottom: '1px solid var(--glass-border)',
          }}
        >
          <div className="flex items-center gap-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: `color-mix(in srgb, ${color} 80%, transparent)`, color: 'var(--background)' }}
            >
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass transition-transform hover:scale-110"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* Hero banner */}
          <div
            className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${color} 25%, transparent), color-mix(in srgb, ${color} 8%, transparent))` }}
          >
            <Layers className="w-20 h-20" style={{ color: `color-mix(in srgb, ${color} 60%, transparent)` }} />
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>À propos du projet</h4>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Technologies utilisées</h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
                    color: 'var(--text-primary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Placeholder sections for future content */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Fonctionnalités clés</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Contenu à venir...
            </p>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
          >
            <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Captures d&apos;écran</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Contenu à venir...
            </p>
          </div>
        </div>

        {/* Sticky footer with links */}
        <div
          className="sticky bottom-0 z-20 flex gap-4 px-8 py-5 backdrop-blur-xl"
          style={{
            background: 'color-mix(in srgb, var(--background-secondary) 85%, transparent)',
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`,
              border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`,
              color: 'var(--text-primary)',
            }}
          >
            <Github size={20} />
            <span>Voir le code</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: color, color: 'var(--background)' }}
          >
            <ExternalLink size={20} />
            <span>Voir la demo</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, onOpenModal }: { project: typeof projects[0]; onOpenModal: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const color = `var(${project.colorVar})`;

  return (
    <motion.div
      variants={cardVariants}
      className="perspective-1000 h-[420px]"
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
            style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${color} 30%, transparent), color-mix(in srgb, ${color} 10%, transparent))` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Layers className="w-16 h-16" style={{ color: 'var(--text-subtle)' }} />
            </div>
            
            {/* Category badge */}
            <div 
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: `color-mix(in srgb, ${color} 80%, transparent)`, color: 'var(--background)' }}
            >
              {project.category}
            </div>

          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, 
                    border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                    color: 'var(--text-secondary)'
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs px-2 py-1" style={{ color: 'var(--text-subtle)' }}>+{project.tech.length - 3}</span>
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
            background: `linear-gradient(135deg, color-mix(in srgb, ${color} 15%, transparent), transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`
          }}
        >
          <h3 className="text-xl font-bold mb-3" style={{ color }}>
            {project.title}
          </h3>
          
          <p className="text-sm mb-4 flex-grow" style={{ color: 'var(--text-secondary)' }}>
            {project.longDescription}
          </p>

          <div className="mb-4">
            <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                    color: 'var(--text-primary)'
                  }}
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
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-transform hover:scale-105"
              style={{ 
                backgroundColor: `color-mix(in srgb, ${color} 30%, transparent)`, 
                border: `1px solid color-mix(in srgb, ${color} 50%, transparent)`,
                color: 'var(--text-primary)'
              }}
            >
              <Github size={18} />
              <span>Code</span>
            </a>
            <button
              onClick={(e) => { e.stopPropagation(); onOpenModal(); }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: color, color: 'var(--background)' }}
            >
              <Info size={18} />
              <span>Plus d&apos;infos</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="min-h-screen py-20 px-6 relative overflow-hidden bg-primary">
      {/* Background */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--gradient-glow-blue)' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--gradient-glow-green)' }}
      />
      
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={headerVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Code2 className="w-4 h-4" style={{ color: 'var(--neon-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Travaux récents</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            Mes Projets
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
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
                  ? ''
                  : 'glass'
              }`}
              style={selectedCategory === category 
                ? { background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-green))', color: 'var(--background)' } 
                : { color: 'var(--text-secondary)' }
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenModal={() => setSelectedProject(project)} />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
