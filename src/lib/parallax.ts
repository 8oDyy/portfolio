'use client';

import { useEffect, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX: (clientX / innerWidth - 0.5) * 2,
        normalizedY: (clientY / innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
