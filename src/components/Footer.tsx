'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-neon-blue/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Portfolio</h3>
            <p className="text-gray-400">
              Développeur passionné créant des expériences web modernes et performantes.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Accueil', 'À propos', 'Projets', 'Stack', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace('à propos', 'about').replace('accueil', 'hero')}`}
                    className="text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4">Liens</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/votre-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center gap-2">
            © {new Date().getFullYear()} Portfolio. Fait avec <Heart size={16} className="text-red-500 fill-red-500" /> et Next.js
          </p>
          <p className="text-gray-500 text-xs">
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
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-neon-blue to-neon-green rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} className="text-black" />
        </motion.button>
      )}
    </footer>
  );
}
