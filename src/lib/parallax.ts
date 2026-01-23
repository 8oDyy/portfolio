'use client';

import { useEffect, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(throttleMs: number = 32) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let lastUpdate = 0;
    let rafId: number | null = null;
    let latestEvent: MouseEvent | null = null;

    const updatePosition = () => {
      if (!latestEvent) return;
      
      const now = Date.now();
      if (now - lastUpdate < throttleMs) {
        rafId = requestAnimationFrame(updatePosition);
        return;
      }
      
      lastUpdate = now;
      const { clientX, clientY } = latestEvent;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX: (clientX / innerWidth - 0.5) * 2,
        normalizedY: (clientY / innerHeight - 0.5) * 2,
      });
      
      latestEvent = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestEvent = e;
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [throttleMs]);

  return mousePosition;
}

export function useParallax(intensity: number = 20) {
  const mouse = useMousePosition();
  
  return {
    x: mouse.normalizedX * intensity,
    y: mouse.normalizedY * intensity,
  };
}

export function calculateRepulsion(
  particleX: number,
  particleY: number,
  mouseX: number,
  mouseY: number,
  repulsionRadius: number = 100,
  repulsionStrength: number = 50
) {
  const dx = particleX - mouseX;
  const dy = particleY - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < repulsionRadius && distance > 0) {
    const force = (repulsionRadius - distance) / repulsionRadius;
    return {
      x: (dx / distance) * force * repulsionStrength,
      y: (dy / distance) * force * repulsionStrength,
    };
  }
  
  return { x: 0, y: 0 };
}
