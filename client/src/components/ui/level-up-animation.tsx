import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelUpAnimationProps {
  show: boolean;
  newLevel: number;
  onComplete: () => void;
}

export const LevelUpAnimation: React.FC<LevelUpAnimationProps> = ({
  show,
  newLevel,
  onComplete
}) => {
  const [phase, setPhase] = useState<'entering' | 'celebrating' | 'exiting'>('entering');

  useEffect(() => {
    if (show) {
      setPhase('entering');
      const timer1 = setTimeout(() => setPhase('celebrating'), 1000);
      const timer2 = setTimeout(() => {
        setPhase('exiting');
        setTimeout(onComplete, 1000);
      }, 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="level-up-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="level-up-container"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {/* Level Up Text */}
          <motion.div
            className="level-up-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1>LEVEL UP!</h1>
            <motion.div
              className="level-number"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: 2,
                delay: 0.5
              }}
            >
              {newLevel}
            </motion.div>
          </motion.div>

          {/* XP Gained */}
          <motion.div
            className="xp-gained"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>+100 XP</span>
          </motion.div>

          {/* Celebration Particles */}
          <div className="celebration-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5]
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  rotate: 0
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Glow Effect */}
          <motion.div
            className="level-up-glow"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
