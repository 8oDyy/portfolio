'use client';

import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function InProgressPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Animated background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[var(--gradient-glow-blue)] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--gradient-glow-purple)] blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--gradient-glow-green)] blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md"
        >
          <Construction className="h-12 w-12 text-[var(--neon-blue)]" />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          <span className="text-gradient">En construction</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-md text-lg text-[var(--text-muted)]">
          Mon portfolio est en cours de développement.
          <br />
          Revenez bientôt pour découvrir mes projets !
        </p>

        {/* Animated progress bar */}
        <div className="mt-4 h-1 w-64 overflow-hidden rounded-full bg-[var(--glass-border)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-green)]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '50%' }}
          />
        </div>

        {/* Decorative dots */}
        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-[var(--neon-blue)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
