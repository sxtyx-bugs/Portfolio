import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showStartButton, setShowStartButton] = useState(false);

  const loadingSteps = [
    { text: 'Loading assets...', progress: 20 },
    { text: 'Initializing 3D engine...', progress: 40 },
    { text: 'Setting up gamification...', progress: 60 },
    { text: 'Preparing neo-brutalist UI...', progress: 80 },
    { text: 'Almost ready...', progress: 95 },
    { text: 'Ready!', progress: 100 }
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text);
        setProgress(loadingSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setShowStartButton(true);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    onComplete();
  };

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <div className="loading-background">
        <div className="loading-grid" />
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="loading-particle"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="loading-content">
        {/* ASCII Art Logo */}
        <motion.div
          className="loading-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <pre className="ascii-art">
{`
  ███████╗ █████╗ ████████╗██╗   ██╗ █████╗ ██╗  ██╗ █████╗ ██╗  ██╗██╗████████╗
  ██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝██╔══██╗██║  ██║██╔══██╗██║  ██║██║╚══██╔══╝
  ███████╗███████║   ██║     ╚████╔╝ ███████║███████║███████║███████║██║   ██║   
  ╚════██║██╔══██║   ██║      ╚██╔╝  ██╔══██║██╔══██║██╔══██║██╔══██║██║   ██║   
  ███████║██║  ██║   ██║       ██║   ██║  ██║██║  ██║██║  ██║██║  ██║██║   ██║   
  ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   
`}
          </pre>
        </motion.div>

        {/* Loading Bar */}
        <div className="loading-bar-container">
          <div className="loading-bar">
            <motion.div
              className="loading-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="loading-bar-text">
            {progress}%
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="loading-text"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.div>

        {/* Start Button */}
        <AnimatePresence>
          {showStartButton && (
            <motion.button
              className="start-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleStart}
            >
              <span className="start-button-text">Press Start to Continue</span>
              <span className="start-button-icon">▶</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading Dots */}
        <div className="loading-dots">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="loading-dot"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Glitch Effect */}
      <div className="loading-glitch" />
    </motion.div>
  );
};
