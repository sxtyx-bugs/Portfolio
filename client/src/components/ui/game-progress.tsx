import React from 'react';
import { motion } from 'framer-motion';

interface GameProgressProps {
  progress: number;
  level: number;
  xp: number;
  maxXp: number;
  className?: string;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  progress,
  level,
  xp,
  maxXp,
  className = ""
}) => {
  return (
    <div className={`game-progress-container ${className}`}>
      {/* Level Badge */}
      <motion.div 
        className="level-badge"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <span className="level-text">LVL {level}</span>
      </motion.div>

      {/* XP Bar */}
      <div className="xp-bar-container">
        <div className="xp-bar-background">
          <motion.div 
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="xp-bar-pixels" />
        </div>
        <div className="xp-text">
          {xp} / {maxXp} XP
        </div>
      </div>

      {/* Progress Percentage */}
      <motion.div 
        className="progress-percentage"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
};
