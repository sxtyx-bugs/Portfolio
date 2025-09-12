import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger, onComplete }) => {
  const [show, setShow] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    shape: string;
    size: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      
      // Generate confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe'][Math.floor(Math.random() * 6)],
        shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360
      }));
      
      setParticles(newParticles);
      
      // Hide after animation
      setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
    }
  }, [trigger, onComplete]);

  const getShapeStyle = (shape: string) => {
    switch (shape) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'triangle':
        return { 
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: 0
        };
      default:
        return { borderRadius: '2px' };
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="confetti-container">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="confetti-particle"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                ...getShapeStyle(particle.shape)
              }}
              initial={{
                x: 0,
                y: 0,
                rotate: particle.rotation,
                scale: 0
              }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: window.innerHeight + 100,
                rotate: particle.rotation + 720,
                scale: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
