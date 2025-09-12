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

  // Auto-finish after 6 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      onFinish();
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfdfd]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-20 right-10 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-60 left-8 text-xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute top-80 right-5 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '3s' }}>🌟</div>
        <div className="absolute bottom-40 left-10 text-xl opacity-20 animate-bounce" style={{ animationDelay: '4s' }}>🎨</div>
        <div className="absolute bottom-20 right-8 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '5s' }}>🚀</div>
        <div className="absolute top-1/2 left-1/4 text-lg opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>💻</div>
        <div className="absolute top-1/3 right-1/4 text-lg opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>🤖</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Sketchy name with doodle animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-shadows text-black"
            animate={{
              rotate: [0, 1, -1, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            hey, i'm satyajit 👋
          </motion.h1>
          
          {/* Doodle underline */}
          <motion.svg
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-8"
            viewBox="0 0 400 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <path
              d="M20,15 Q100,5 180,12 T360,8 T400,10"
              stroke="#FF4900"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>

        {/* Sketchy progress container */}
        <motion.div 
          className="w-80 mx-auto space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Progress bar with sketchy border */}
          <div className="relative h-4 border-3 border-black bg-[#fdfdfd] transform rotate-1">
            <motion.div
              className="h-full bg-gradient-to-r from-[#70D6FF] via-[#FFD600] to-[#FF4900]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Doodle progress indicator */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF00FF] border-2 border-black transform rotate-12"
              style={{ left: `${progress}%` }}
              animate={{ rotate: [12, 15, 12] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>

          {/* Progress percentage with sketchy styling */}
          <motion.div
            className="text-2xl font-patrick text-black"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {progress}%
          </motion.div>
        </motion.div>

        {/* Sketchy start button */}
        <motion.button
          className={`sketchy-button text-lg px-8 py-4 ${
            showStartButton ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={showStartButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ 
            scale: 1.05, 
            rotate: 2,
            backgroundColor: '#FFD600'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          let's start the journey! 🚀
        </motion.button>

        {/* Sketchy loading dots */}
        <motion.div 
          className="flex justify-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 border-2 border-black bg-[#00D6A3] transform rotate-12"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [12, 15, 12],
                backgroundColor: ['#00D6A3', '#70D6FF', '#00D6A3']
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Sketchy skip hint */}
        <motion.p
          className="font-inter text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          click anywhere to skip • or just wait a moment
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