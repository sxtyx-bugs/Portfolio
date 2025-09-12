import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    // Animate progress from 0 to 100%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowStartButton(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  const handleStart = () => {
    onFinish();
  };

  // Auto-finish after 8 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      onFinish();
    }, 8000);

    return () => clearTimeout(fallbackTimer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background with gradient and glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Subtle pink/blue glow effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 via-transparent to-pink-500/5" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Retro-style name with pulsing animation */}
        <motion.h1
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.1em',
          }}
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              '0 0 20px rgba(255, 255, 255, 0.5)',
              '0 0 30px rgba(255, 255, 255, 0.8)',
              '0 0 20px rgba(255, 255, 255, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          SATYAJIT
        </motion.h1>

        {/* Progress bar container */}
        <div className="w-80 mx-auto space-y-4">
          {/* Progress bar */}
          <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="text-2xl font-bold text-white"
            style={{ fontFamily: 'monospace' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Start button */}
        <motion.button
          className={`px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold text-xl rounded-lg shadow-2xl border-2 border-white/20 transition-all duration-300 hover:shadow-pink-500/25 hover:scale-105 active:scale-95 ${
            showStartButton ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ fontFamily: 'monospace' }}
          initial={{ opacity: 0, y: 20 }}
          animate={showStartButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          PRESS START TO CONTINUE ▶
        </motion.button>

        {/* Loading dots */}
        <motion.div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-pink-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Skip hint */}
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3 }}
        >
          Click anywhere or press Enter to continue
        </motion.p>
      </div>

      {/* Click handler for entire screen */}
      <div
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={handleStart}
        onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        tabIndex={0}
        role="button"
        aria-label="Skip loading screen"
      />
    </motion.div>
  );
};