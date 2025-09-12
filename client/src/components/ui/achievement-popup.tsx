import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlocked: boolean;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  achievement,
  onClose
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (achievement) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="achievement-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="achievement-popup"
            initial={{ 
              scale: 0, 
              rotate: -10,
              y: 100 
            }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: 0 
            }}
            exit={{ 
              scale: 0, 
              rotate: 10,
              y: -100 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
          >
            {/* Achievement Header */}
            <div className="achievement-header">
              <motion.div 
                className="achievement-icon"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: 2 
                }}
              >
                {achievement.icon}
              </motion.div>
              <div className="achievement-title">
                <h3>Achievement Unlocked!</h3>
                <p>{achievement.title}</p>
              </div>
            </div>

            {/* Achievement Description */}
            <div className="achievement-description">
              <p>{achievement.description}</p>
            </div>

            {/* XP Reward */}
            <motion.div 
              className="xp-reward"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="xp-amount">+{achievement.xp} XP</span>
            </motion.div>

            {/* Close Button */}
            <motion.button
              className="achievement-close"
              onClick={() => setShow(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {/* Confetti Effect */}
            <div className="confetti-container">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="confetti-piece"
                  style={{
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5]
                  }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    scale: 0 
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 200,
                    y: -100 - Math.random() * 100,
                    rotate: Math.random() * 360,
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
