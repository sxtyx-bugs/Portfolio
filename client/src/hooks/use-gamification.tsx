import { useState, useEffect, useCallback } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlocked: boolean;
}

interface GameState {
  level: number;
  xp: number;
  maxXp: number;
  progress: number;
  unlockedSections: string[];
  achievements: Achievement[];
  currentAchievement: Achievement | null;
  showLevelUp: boolean;
  currentSection: string;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first_visit',
    title: 'Welcome Explorer!',
    description: 'You discovered the portfolio!',
    icon: '👋',
    xp: 50,
    unlocked: false
  },
  {
    id: 'about_unlocked',
    title: 'About Me Discovered',
    description: 'You unlocked the About section!',
    icon: '📝',
    xp: 100,
    unlocked: false
  },
  {
    id: 'achievements_unlocked',
    title: 'Achievement Hunter',
    description: 'You found the Achievements section!',
    icon: '🏆',
    xp: 150,
    unlocked: false
  },
  {
    id: 'projects_unlocked',
    title: 'Project Explorer',
    description: 'You discovered the Projects section!',
    icon: '💡',
    xp: 200,
    unlocked: false
  },
  {
    id: 'contact_unlocked',
    title: 'Social Connector',
    description: 'You found the Contact section!',
    icon: '📧',
    xp: 100,
    unlocked: false
  },
  {
    id: 'guestbook_unlocked',
    title: 'Guestbook Guest',
    description: 'You discovered the Guestbook!',
    icon: '📝',
    xp: 75,
    unlocked: false
  },
  {
    id: 'full_exploration',
    title: 'Portfolio Master',
    description: 'You explored the entire portfolio!',
    icon: '🎉',
    xp: 500,
    unlocked: false
  }
];

export const useGamification = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    xp: 0,
    maxXp: 100,
    progress: 0,
    unlockedSections: ['home'],
    achievements: initialAchievements,
    currentAchievement: null,
    showLevelUp: false,
    currentSection: 'home'
  });

  const calculateLevel = useCallback((xp: number) => {
    return Math.floor(xp / 100) + 1;
  }, []);

  const calculateMaxXp = useCallback((level: number) => {
    return level * 100;
  }, []);

  const calculateProgress = useCallback((xp: number, maxXp: number) => {
    return (xp % 100) / 100 * 100;
  }, []);

  const unlockSection = useCallback((sectionId: string) => {
    setGameState(prev => {
      if (prev.unlockedSections.includes(sectionId)) {
        return prev;
      }

      const newUnlockedSections = [...prev.unlockedSections, sectionId];
      const achievement = prev.achievements.find(a => a.id === `${sectionId}_unlocked`);
      
      if (achievement && !achievement.unlocked) {
        const updatedAchievements = prev.achievements.map(a => 
          a.id === achievement.id ? { ...a, unlocked: true } : a
        );
        
        return {
          ...prev,
          unlockedSections: newUnlockedSections,
          achievements: updatedAchievements,
          currentAchievement: achievement
        };
      }

      return {
        ...prev,
        unlockedSections: newUnlockedSections
      };
    });
  }, []);

  const addXp = useCallback((amount: number) => {
    setGameState(prev => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      const newMaxXp = calculateMaxXp(newLevel);
      const newProgress = calculateProgress(newXp, newMaxXp);
      const showLevelUp = newLevel > prev.level;

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp,
        progress: newProgress,
        showLevelUp
      };
    });
  }, [calculateLevel, calculateMaxXp, calculateProgress]);

  const unlockAchievement = useCallback((achievementId: string) => {
    setGameState(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      
      if (achievement && !achievement.unlocked) {
        const updatedAchievements = prev.achievements.map(a => 
          a.id === achievementId ? { ...a, unlocked: true } : a
        );
        
        return {
          ...prev,
          achievements: updatedAchievements,
          currentAchievement: achievement
        };
      }

      return prev;
    });
  }, []);

  const setCurrentSection = useCallback((section: string) => {
    setGameState(prev => ({
      ...prev,
      currentSection: section
    }));
  }, []);

  const closeAchievement = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentAchievement: null
    }));
  }, []);

  const closeLevelUp = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showLevelUp: false
    }));
  }, []);

  // Check for full exploration achievement
  useEffect(() => {
    if (gameState.unlockedSections.length >= 6) {
      unlockAchievement('full_exploration');
    }
  }, [gameState.unlockedSections.length, unlockAchievement]);

  // Auto-unlock first achievement on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAchievement('first_visit');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  return {
    gameState,
    unlockSection,
    addXp,
    unlockAchievement,
    setCurrentSection,
    closeAchievement,
    closeLevelUp
  };
};
