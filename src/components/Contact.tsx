'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // CONFIGURATION EMAILJS - Remplacez par vos IDs
      // 1. Créez un compte sur https://www.emailjs.com/
      // 2. Créez un service email
      // 3. Créez un template
      // 4. Remplacez les valeurs ci-dessous
      await emailjs.send(
        'YOUR_SERVICE_ID',      // Remplacez par votre Service ID
        'YOUR_TEMPLATE_ID',     // Remplacez par votre Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'       // Remplacez par votre Public Key
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/votre-username', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/votre-profil', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/votre-username', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, url: 'mailto:votre.email@example.com', color: 'hover:text-neon-green' },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-primary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">Contact</h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Une idée de projet ? Discutons-en !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Envoyez-moi un message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="votre.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg transition-colors resize-none focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Votre message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                  style={
                    status === 'sending'
                      ? { backgroundColor: '#4b5563', cursor: 'not-allowed', color: 'var(--text-primary)' }
                      : status === 'success'
                      ? { backgroundColor: '#16a34a', color: 'white' }
                      : status === 'error'
                      ? { backgroundColor: '#dc2626', color: 'white' }
                      : { background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-green))', color: 'var(--background)' }
                  }
                >
                  {status === 'sending' && 'Envoi en cours...'}
                  {status === 'success' && '✓ Message envoyé !'}
                  {status === 'error' && '✗ Erreur, réessayez'}
                  {status === 'idle' && (
                    <>
                      <Send size={20} />
                      Envoyer
                    </>
                  )}
                </motion.button>
              </form>

              {status === 'idle' && (
                <p className="mt-4 text-sm text-center" style={{ color: 'var(--text-subtle)' }}>
                  * Configurez EmailJS pour activer le formulaire (voir commentaires dans le code)
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Retrouvez-moi sur</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-4 p-4 rounded-lg transition-all"
                      style={{ 
                        backgroundColor: 'var(--card-bg)', 
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Icon size={24} />
                      <span className="font-semibold">{link.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--neon-green)' }}>Disponibilité</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Je suis actuellement <span style={{ color: 'var(--neon-green)' }} className="font-bold">disponible</span> pour des projets freelance 
                et des opportunités de collaboration. N&apos;hésitez pas à me contacter pour discuter de votre projet !
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
