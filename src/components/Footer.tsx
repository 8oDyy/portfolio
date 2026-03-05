'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const next = window.scrollY > 500;
      setShowButton((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(update);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sticky bottom-0 z-0 border-t py-12 px-4 bg-primary" style={{ borderColor: 'var(--glass-border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Portfolio</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Développeur passionné créant des expériences web modernes et performantes.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Navigation</h4>
            <ul className="space-y-2">
              {['Accueil', 'À propos', 'Projets', 'Stack', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace('à propos', 'about').replace('accueil', 'hero')}`}
                    className="transition-colors hover:opacity-80"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Liens</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/votre-username" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--glass-border)' }}>
          <p className="text-sm mb-4 md:mb-0 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Portfolio. Fait avec <Heart size={16} className="text-red-500 fill-red-500" /> et Next.js
          </p>
          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
            Propulsé par Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>

      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all z-50"
          style={{ background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-green))' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} style={{ color: 'var(--background)' }} />
        </motion.button>
      )}
    </footer>
  );
}
