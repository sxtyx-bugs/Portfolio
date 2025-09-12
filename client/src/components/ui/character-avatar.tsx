import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CharacterAvatarProps {
  currentSection: string;
  isVisible: boolean;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  currentSection,
  isVisible,
  className = ""
}) => {
  const [currentEmotion, setCurrentEmotion] = useState('idle');
  const [showReaction, setShowReaction] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowReaction(true);
      setTimeout(() => setShowReaction(false), 2000);
    }
  }, [currentSection, isVisible]);

  const getEmotionForSection = (section: string) => {
    switch (section) {
      case 'about': return 'wave';
      case 'achievements': return 'excited';
      case 'projects': return 'thinking';
      case 'contact': return 'happy';
      case 'guestbook': return 'cheerful';
      default: return 'idle';
    }
  };

  const emotion = getEmotionForSection(currentSection);

  const avatarVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      y: 0
    },
    wave: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      y: [0, -5, 0],
      transition: { duration: 0.6, repeat: 2 }
    },
    excited: {
      scale: [1, 1.2, 1],
      y: [0, -10, 0],
      transition: { duration: 0.4, repeat: 3 }
    },
    thinking: {
      scale: 1,
      rotate: [0, 5, -5, 0],
      y: [0, -3, 0],
      transition: { duration: 1, repeat: 1 }
    },
    happy: {
      scale: [1, 1.15, 1],
      y: [0, -8, 0],
      transition: { duration: 0.5, repeat: 2 }
    },
    cheerful: {
      scale: [1, 1.1, 1],
      rotate: [0, 15, -15, 0],
      y: [0, -6, 0],
      transition: { duration: 0.7, repeat: 2 }
    }
  };

  return (
    <div className={`character-avatar-container ${className}`}>
      <motion.div
        className="character-avatar"
        variants={avatarVariants}
        animate={emotion}
        initial="idle"
      >
        {/* Pixel Art Character */}
        <div className="pixel-character">
          {/* Head */}
          <div className="character-head">
            <div className="character-eyes">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
            </div>
            <div className="character-mouth"></div>
          </div>
          
          {/* Body */}
          <div className="character-body">
            <div className="character-arms">
              <div className="arm left-arm"></div>
              <div className="arm right-arm"></div>
            </div>
          </div>
          
          {/* Legs */}
          <div className="character-legs">
            <div className="leg left-leg"></div>
            <div className="leg right-leg"></div>
          </div>
        </div>

        {/* Reaction Bubble */}
        <AnimatePresence>
          {showReaction && (
            <motion.div
              className="reaction-bubble"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentSection === 'about' && '👋'}
              {currentSection === 'achievements' && '🏆'}
              {currentSection === 'projects' && '💡'}
              {currentSection === 'contact' && '📧'}
              {currentSection === 'guestbook' && '📝'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
