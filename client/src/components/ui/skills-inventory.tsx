import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: 'language' | 'framework' | 'tool' | 'concept';
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const skills: Skill[] = [
  {
    id: 'cpp',
    name: 'C++',
    level: 80,
    maxLevel: 100,
    category: 'language',
    description: 'High-performance systems programming and competitive coding',
    icon: '⚡',
    rarity: 'epic'
  },
  {
    id: 'python',
    name: 'Python',
    level: 85,
    maxLevel: 100,
    category: 'language',
    description: 'AI/ML, data science, and automation scripting',
    icon: '🐍',
    rarity: 'legendary'
  },
  {
    id: 'react',
    name: 'React',
    level: 70,
    maxLevel: 100,
    category: 'framework',
    description: 'Modern web development with hooks and context',
    icon: '⚛️',
    rarity: 'rare'
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    level: 75,
    maxLevel: 100,
    category: 'concept',
    description: 'Machine learning, deep learning, and neural networks',
    icon: '🤖',
    rarity: 'legendary'
  },
  {
    id: 'osint',
    name: 'OSINT',
    level: 80,
    maxLevel: 100,
    category: 'concept',
    description: 'Open source intelligence and geolocation techniques',
    icon: '🕵️',
    rarity: 'epic'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    level: 65,
    maxLevel: 100,
    category: 'language',
    description: 'Dynamic web development and Node.js backend',
    icon: '🟨',
    rarity: 'rare'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    level: 70,
    maxLevel: 100,
    category: 'framework',
    description: 'Deep learning framework for AI applications',
    icon: '🧠',
    rarity: 'epic'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    level: 75,
    maxLevel: 100,
    category: 'tool',
    description: 'Computer vision and image processing library',
    icon: '👁️',
    rarity: 'rare'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    level: 40,
    maxLevel: 100,
    category: 'language',
    description: 'Learning Japanese for future studies in Japan',
    icon: '🇯🇵',
    rarity: 'common'
  }
];

const rarityColors = {
  common: '#96ceb4',
  rare: '#4ecdc4',
  epic: '#ff6b6b',
  legendary: '#ffeaa7'
};

const categoryIcons = {
  language: '💬',
  framework: '⚙️',
  tool: '🔧',
  concept: '💡'
};

export const SkillsInventory: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<'all' | 'language' | 'framework' | 'tool' | 'concept'>('all');

  const filteredSkills = skills.filter(skill => 
    filter === 'all' || skill.category === filter
  );

  const getLevelBar = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    return (
      <div className="skill-level-bar">
        <div 
          className="skill-level-fill"
          style={{ width: `${percentage}%` }}
        />
        <span className="skill-level-text">{level}/{maxLevel}</span>
      </div>
    );
  };

  return (
    <div className="skills-inventory">
      <div className="skills-header">
        <h2 className="skills-title">
          <span className="skills-icon">🎒</span>
          Skills Inventory
        </h2>
        <div className="skills-filters">
          {(['all', 'language', 'framework', 'tool', 'concept'] as const).map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All' : categoryIcons[category]} {category}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className={`skill-card ${skill.rarity}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="skill-card-header">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-rarity-badge">{skill.rarity}</div>
            </div>
            
            <div className="skill-card-body">
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-category">
                {categoryIcons[skill.category]} {skill.category}
              </div>
              {getLevelBar(skill.level, skill.maxLevel)}
            </div>

            <div className="skill-card-footer">
              <div className="skill-level-indicator">
                Level {skill.level}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <motion.div
          className="skill-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedSkill(null)}
        >
          <motion.div
            className="skill-detail-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="skill-detail-header">
              <div className="skill-detail-icon">{selectedSkill.icon}</div>
              <div className="skill-detail-info">
                <h3 className="skill-detail-name">{selectedSkill.name}</h3>
                <div className="skill-detail-category">
                  {categoryIcons[selectedSkill.category]} {selectedSkill.category}
                </div>
              </div>
              <button
                className="skill-detail-close"
                onClick={() => setSelectedSkill(null)}
              >
                ×
              </button>
            </div>

            <div className="skill-detail-body">
              <p className="skill-detail-description">{selectedSkill.description}</p>
              {getLevelBar(selectedSkill.level, selectedSkill.maxLevel)}
              <div className="skill-detail-stats">
                <div className="stat">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{selectedSkill.level}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Rarity:</span>
                  <span className="stat-value">{selectedSkill.rarity}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Progress:</span>
                  <span className="stat-value">
                    {Math.round((selectedSkill.level / selectedSkill.maxLevel) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
