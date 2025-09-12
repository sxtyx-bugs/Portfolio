import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const JapanDream: React.FC = () => {
  const [cherryBlossoms, setCherryBlossoms] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate cherry blossom particles
    const blossoms = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 0.5 + 0.3
    }));
    setCherryBlossoms(blossoms);
  }, []);

  const trainStations = [
    { name: 'Tokyo', progress: 100, status: 'visited' },
    { name: 'Kyoto', progress: 80, status: 'planned' },
    { name: 'Osaka', progress: 60, status: 'planned' },
    { name: 'Hiroshima', progress: 40, status: 'planned' },
    { name: 'Sapporo', progress: 20, status: 'dream' }
  ];

  return (
    <div className="japan-dream-section">
      {/* Background Elements */}
      <div className="japan-background">
        {/* Mount Fuji Silhouette */}
        <div className="mount-fuji">
          <svg viewBox="0 0 400 200" className="fuji-svg">
            <path
              d="M0,200 L50,180 L100,160 L150,140 L200,120 L250,100 L300,80 L350,60 L400,40 L400,200 Z"
              fill="url(#fujiGradient)"
            />
            <defs>
              <linearGradient id="fujiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#4ecdc4" />
                <stop offset="100%" stopColor="#96ceb4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Cherry Blossom Particles */}
        <div className="cherry-blossoms">
          {cherryBlossoms.map((blossom) => (
            <motion.div
              key={blossom.id}
              className="cherry-blossom"
              style={{
                left: `${blossom.x}%`,
                top: `${blossom.y}%`,
                fontSize: `${blossom.size}rem`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: blossom.delay,
                ease: "easeInOut"
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>

        {/* Floating Lanterns */}
        <div className="floating-lanterns">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="lantern"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 10}%`
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              🏮
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="japan-content">
        <motion.div
          className="japan-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>🇯🇵 Japan Dream Journey</h2>
          <p className="japan-subtitle">The Land of Rising Sun Awaits</p>
        </motion.div>

        {/* JRPG Style Map */}
        <div className="japan-map">
          <div className="map-container">
            {/* Train Route */}
            <div className="train-route">
              <svg viewBox="0 0 800 200" className="route-svg">
                <path
                  d="M50,100 Q200,50 400,100 T750,100"
                  stroke="#ff6b6b"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                />
                <motion.circle
                  cx="50"
                  cy="100"
                  r="8"
                  fill="#4ecdc4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Train Stations */}
            <div className="train-stations">
              {trainStations.map((station, index) => (
                <motion.div
                  key={station.name}
                  className={`station ${station.status}`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: '50%'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.3 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="station-icon">
                    {station.status === 'visited' ? '✅' : 
                     station.status === 'planned' ? '🎯' : '💭'}
                  </div>
                  <div className="station-name">{station.name}</div>
                  <div className="station-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${station.progress}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Moving Train */}
            <motion.div
              className="moving-train"
              animate={{
                x: [0, 700]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              🚄
            </motion.div>
          </div>
        </div>

        {/* Dream Goals */}
        <div className="dream-goals">
          <h3>Dream Goals</h3>
          <div className="goals-grid">
            <motion.div
              className="goal-card"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="goal-icon">🎓</div>
              <h4>Study in Japan</h4>
              <p>Pursue advanced AI/ML studies at top Japanese universities</p>
            </motion.div>

            <motion.div
              className="goal-card"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="goal-icon">🏢</div>
              <h4>Work in Tech</h4>
              <p>Join innovative Japanese tech companies and startups</p>
            </motion.div>

            <motion.div
              className="goal-card"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="goal-icon">🗾</div>
              <h4>Cultural Immersion</h4>
              <p>Experience Japanese culture, language, and traditions</p>
            </motion.div>

            <motion.div
              className="goal-card"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="goal-icon">🚀</div>
              <h4>Innovation Hub</h4>
              <p>Contribute to Japan's cutting-edge technology ecosystem</p>
            </motion.div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="japan-stats">
          <div className="stat-item">
            <div className="stat-number">日本語</div>
            <div className="stat-label">Language Learning</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '40%' }} />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2025</div>
            <div className="stat-label">Target Year</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Dream Level</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
