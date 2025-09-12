import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Book, Mail, Play, Pause, Send, Moon, Sun, Volume2, ArrowUp } from "lucide-react";
import Guestbook from "@/components/Guestbook";
import { GameProgress } from "@/components/ui/game-progress";
import { CharacterAvatar } from "@/components/ui/character-avatar";
import { AchievementPopup } from "@/components/ui/achievement-popup";
import { LevelUpAnimation } from "@/components/ui/level-up-animation";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { RetroTerminal } from "@/components/ui/retro-terminal";
import { SkillsInventory } from "@/components/ui/skills-inventory";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { JapanDream } from "@/components/ui/japan-dream";
import { ConfettiEffect } from "@/components/ui/confetti-effect";
import { useGamification } from "@/hooks/use-gamification";

export default function Home() {
  const [currentHobby, setCurrentHobby] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // New state for enhanced features
  const [showLoading, setShowLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'glow' | 'sword' | 'joystick'>('glow');
  const [dynamicQuote, setDynamicQuote] = useState('');

  // Gamification hook
  const {
    gameState,
    unlockSection,
    addXp,
    setCurrentSection,
    closeAchievement,
    closeLevelUp
  } = useGamification();

  // Dynamic quotes
  const quotes = [
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Dream big and dare to fail. - Norman Vaughan",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
  ];

  const hobbies = [
    "Coding 💻",
    "OSINT Enthusiast 🕵️",
    "AI Innovator 🤖", 
    "Geolocation Expert 🌍",
    "Learning Japanese 🇯🇵",
    "Music Lover 🎵",
    "Building Apps 📱",
    "Cooking Expert 👨‍🍳"
  ];

  const typewriterTexts = [
    "Coder",
    "OSINT Enthusiast", 
    "AI Innovator",
    "Dream Chaser"
  ];

  useEffect(() => {
    // Set random quote on load
    setDynamicQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Fallback: hide loading screen after 10 seconds
    const fallbackTimer = setTimeout(() => {
      setShowLoading(false);
    }, 10000);

    // Typewriter animation
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentText = typewriterTexts[currentTextIndex];
      
      if (isDeleting) {
        setTypewriterText(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
      } else {
        setTypewriterText(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
      }

      setTimeout(typeWriter, isDeleting ? 50 : 100);
    };

    typeWriter();

    // Dark mode initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Cycling hobbies animation
    const hobbyInterval = setInterval(() => {
      setCurrentHobby((prev) => (prev + 1) % hobbies.length);
    }, 2500);

    // Enhanced scroll-based animations with progress tracking and section unlocking
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 500);
      
      // Section unlocking based on scroll position
      const sections = [
        { id: 'about', element: document.getElementById('about') },
        { id: 'achievements', element: document.getElementById('achievements') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'contact', element: document.getElementById('contact') },
        { id: 'skills', element: document.getElementById('skills') },
        { id: 'japan-dream', element: document.getElementById('japan-dream') },
        { id: 'guestbook', element: document.getElementById('guestbook') }
      ];

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isVisible && !gameState.unlockedSections.includes(id)) {
            unlockSection(id);
            setCurrentSection(id);
            addXp(50); // XP for discovering a section
          }
        }
      });
      
      // Smooth parallax effects
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = scrolled * speed;
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      // Advanced scroll effects for sections
      const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
      scrollRevealElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const visiblePercentage = Math.max(0, Math.min(1, 
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          ));
          (section as HTMLElement).style.transform = `translateY(${(1 - visiblePercentage) * 30}px)`;
          (section as HTMLElement).style.opacity = `${Math.max(0.3, visiblePercentage)}`;
        }
      });
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for About section
          if (entry.target.getAttribute('data-testid') === 'about-section') {
            const aboutCard = entry.target.querySelector('.about-card-enhanced');
            if (aboutCard) {
              setTimeout(() => {
                aboutCard.classList.add('animate-in');
              }, 500);
            }
          }
        }
      });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
    });

    // Smooth scroll behavior enhancement
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll listener with throttling for performance
    let ticking = false;
    const optimizedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => { ticking = false; }, 10);
      }
    };
    
    window.addEventListener('scroll', optimizedHandleScroll, { passive: true });

    // Keyboard event listeners
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '~' || e.key === '`') {
        e.preventDefault();
        setShowTerminal(true);
      }
      // Skip loading screen with Enter key
      if (e.key === 'Enter' && showLoading) {
        e.preventDefault();
        setShowLoading(false);
      }
    };

    // Event listeners for custom events
    const handlePlayMusic = () => {
      // Trigger music play
      console.log('Playing music...');
    };

    const handleShowConfetti = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('playMusic', handlePlayMusic);
    window.addEventListener('showConfetti', handleShowConfetti);

    return () => {
      clearInterval(hobbyInterval);
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', optimizedHandleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('playMusic', handlePlayMusic);
      window.removeEventListener('showConfetti', handleShowConfetti);
      observer.disconnect();
    };
  }, []);

  const achievements = [
    { title: "Academic Excellence", icon: "🏆", detail: "Top scores in Computer Science" },
    { title: "AI Innovation", icon: "🤖", detail: "Built LensAI & Inforvi platforms" },
    { title: "OSINT Mastery", icon: "🌍", detail: "Created ORLON.OG geolocation site" },
    { title: "Competitive Gaming", icon: "🎮", detail: "Team MGX - Apex Legends Mobile AU" },
    { title: "Chess Strategy", icon: "♟️", detail: "Intermediate Player - 1400 ELO" },
    { title: "Taekwondo Champion", icon: "🥋", detail: "Multiple gold medals" },
    { title: "Certifications", icon: "📜", detail: "Oracle AI & Microsoft Azure" }
  ];

  const projects = [
    {
      title: "LensAI",
      description: "AI-powered image analysis platform with advanced ML capabilities",
      tech: "Python • TensorFlow • OpenCV"
    },
    {
      title: "Inforvi", 
      description: "Information visualization tool transforming data into insights",
      tech: "React • D3.js • Node.js"
    },
    {
      title: "ORLON.OG",
      description: "Geolocation platform combining OSINT with interactive mapping",
      tech: "JavaScript • Leaflet • APIs"
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", contactForm);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-clean overflow-x-hidden transition-colors duration-300 relative">
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onFinish={() => setShowLoading(false)} />
      )}

      {/* Custom Cursor */}
      <CustomCursor variant={cursorVariant} />

      {/* Game Progress Bar */}
      <GameProgress
        progress={gameState.progress}
        level={gameState.level}
        xp={gameState.xp}
        maxXp={gameState.maxXp}
      />

      {/* Character Avatar */}
      <CharacterAvatar
        currentSection={gameState.currentSection}
        isVisible={gameState.unlockedSections.includes(gameState.currentSection)}
      />

      {/* Achievement Popup */}
      <AchievementPopup
        achievement={gameState.currentAchievement}
        onClose={closeAchievement}
      />

      {/* Level Up Animation */}
      <LevelUpAnimation
        show={gameState.showLevelUp}
        newLevel={gameState.level}
        onComplete={closeLevelUp}
      />

      {/* Retro Terminal */}
      <RetroTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
      />

      {/* Confetti Effect */}
      <ConfettiEffect
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 nb-button"
          data-testid="scroll-to-top"
          title="Back to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
      
      {/* Retro Game Navigation */}
      <nav className="retro-navbar" data-testid="navigation">
        <div className="navbar-container">
          <motion.div 
            className="navbar-logo" 
            data-testid="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            SP
          </motion.div>
          
          <div className="navbar-links">
            <motion.a 
              href="#home" 
              className={`navbar-link ${gameState.currentSection === 'home' ? 'active' : ''}`}
              data-testid="nav-home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
            
            <motion.a 
              href="#about" 
              className={`navbar-link ${gameState.currentSection === 'about' ? 'active' : ''} ${!gameState.unlockedSections.includes('about') ? 'opacity-50' : ''}`}
              data-testid="nav-about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About {!gameState.unlockedSections.includes('about') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#achievements" 
              className={`navbar-link ${gameState.currentSection === 'achievements' ? 'active' : ''} ${!gameState.unlockedSections.includes('achievements') ? 'opacity-50' : ''}`}
              data-testid="nav-achievements"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Achievements {!gameState.unlockedSections.includes('achievements') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#projects" 
              className={`navbar-link ${gameState.currentSection === 'projects' ? 'active' : ''} ${!gameState.unlockedSections.includes('projects') ? 'opacity-50' : ''}`}
              data-testid="nav-projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects {!gameState.unlockedSections.includes('projects') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className={`navbar-link ${gameState.currentSection === 'contact' ? 'active' : ''} ${!gameState.unlockedSections.includes('contact') ? 'opacity-50' : ''}`}
              data-testid="nav-contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact {!gameState.unlockedSections.includes('contact') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#skills" 
              className={`navbar-link ${gameState.currentSection === 'skills' ? 'active' : ''} ${!gameState.unlockedSections.includes('skills') ? 'opacity-50' : ''}`}
              data-testid="nav-skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills {!gameState.unlockedSections.includes('skills') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#japan-dream" 
              className={`navbar-link ${gameState.currentSection === 'japan-dream' ? 'active' : ''} ${!gameState.unlockedSections.includes('japan-dream') ? 'opacity-50' : ''}`}
              data-testid="nav-japan-dream"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Japan Dream {!gameState.unlockedSections.includes('japan-dream') && '🔒'}
            </motion.a>
            
            <motion.a 
              href="#guestbook" 
              className={`navbar-link ${gameState.currentSection === 'guestbook' ? 'active' : ''} ${!gameState.unlockedSections.includes('guestbook') ? 'opacity-50' : ''}`}
              data-testid="nav-guestbook"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guestbook {!gameState.unlockedSections.includes('guestbook') && '🔒'}
            </motion.a>
              
              {/* Instagram Link */}
            <motion.a 
                href="https://www.instagram.com/4zurit/" 
                target="_blank" 
                rel="noopener noreferrer"
              className="navbar-link flex items-center space-x-1"
                data-testid="nav-instagram"
                title="Follow me on Instagram"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
                <span>📸</span>
                <span>@4zurit</span>
            </motion.a>
              
              {/* Dark Mode Toggle */}
            <motion.button
                onClick={toggleDarkMode}
              className="navbar-link"
                data-testid="dark-mode-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? (
                <Sun className="w-5 h-5" />
                ) : (
                <Moon className="w-5 h-5" />
                )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative creative-background hero-section scroll-reveal" data-testid="hero-section">
        {/* Particle System */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          {/* Enhanced Floating doodle elements */}
          <div className="absolute top-10 left-10 text-4xl opacity-30 parallax interactive-doodle" data-testid="doodle-star">⭐</div>
          <div className="absolute top-20 right-20 text-3xl opacity-35 parallax interactive-doodle" data-testid="doodle-arrow">→</div>
          <div className="absolute bottom-32 left-20 text-2xl opacity-40 parallax interactive-doodle" data-testid="doodle-sparkle">✨</div>
          <div className="absolute top-40 right-10 text-2xl opacity-25 parallax interactive-doodle">🚀</div>
          <div className="absolute bottom-40 right-32 text-3xl opacity-30 parallax interactive-doodle">💡</div>
          
          {/* Main headline */}
          <h1 className="font-handwritten creative-title text-7xl md:text-9xl font-bold mb-8 relative" data-testid="main-headline">
            Hi, I'm <span className="interactive-doodle">👋</span>
            <span className="relative inline-block creative-text">
              Satyajit
              <svg className="absolute -bottom-6 left-0 w-full h-8" viewBox="0 0 400 20" data-testid="headline-underline">
                <path d="M10,15 Q100,5 200,12 T380,15" stroke="#333" strokeWidth="4" fill="none" 
                      strokeDasharray="8,4" className="animate-sketch-draw"/>
              </svg>
            </span>
          </h1>
          
          {/* Typewriter animation */}
          <div className="h-16 mb-12" data-testid="typewriter-container">
            <p className="font-sketch text-3xl md:text-4xl text-gray-700 dark:text-gray-300 creative-text">
              {typewriterText}
              <span className="animate-pulse creative-glow">|</span>
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce mt-16" data-testid="scroll-indicator">
            <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto opacity-60">
              <path d="M20,5 Q18,15 20,25 Q22,15 20,5" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M15,20 Q20,28 25,20" stroke="#333" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>

        {/* Hand-drawn divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg width="100%" height="40" viewBox="0 0 1200 40" className="opacity-30">
            <path d="M0,20 Q300,10 600,25 T1200,20" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
          </svg>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section 
        id="about" 
        className={`py-32 about-section-enhanced bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300 ${
          !gameState.unlockedSections.includes('about') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="about-section"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="about-title-enhanced text-center" data-testid="about-title">
              About Me
            </h2>
            <div className="absolute top-8 right-8 text-3xl animate-float opacity-30">📝</div>
          </div>
          
          <div className="about-card-enhanced p-12 md:p-16 text-left max-w-4xl mx-auto" data-testid="about-content">
            <div className="about-paragraph-delay">
              <p className="about-text-enhanced">
                I'm a passionate dreamer and builder who thrives on creating innovative solutions at the intersection of <span className="highlight-word">AI and technology</span>. My journey spans across multiple domains - from developing AI-powered applications to exploring the fascinating world of <span className="highlight-word">OSINT</span> and geolocation technologies.
              </p>
            </div>
            
            <div className="about-paragraph-delay">
              <p className="about-text-enhanced">
                My goals are ambitious but crystal clear: excel in academics, study in <span className="highlight-word">Japan</span> to immerse myself in cutting-edge technology culture, and become the absolute best in <span className="highlight-word">AI programming</span>. Every line of code I write, every algorithm I develop, brings me closer to these dreams.
              </p>
            </div>
            
            <div className="about-paragraph-delay">
              <p className="about-text-enhanced">
                When I'm not coding or experimenting with new AI models, you'll find me diving deep into unique projects, learning Japanese, or exploring the endless possibilities that technology offers. I believe in the power of continuous learning and the magic that happens when <span className="highlight-word">curiosity</span> meets <span className="highlight-word">dedication</span>.
              </p>
            </div>
            
            <div className="about-paragraph-delay">
              <p className="about-text-enhanced">
                Beyond the digital realm, I'm an <span className="highlight-word">intermediate chess player</span> with a 1400 ELO rating, where strategic thinking and pattern recognition sharpen my problem-solving skills. I also had the honor of competing for <span className="highlight-word">Team MGX</span> in Apex Legends Mobile Australian Competitive scene, combining tactical gameplay with team coordination under pressure.
              </p>
            </div>
            
            <div className="about-paragraph-delay">
              <p className="about-text-enhanced italic font-semibold text-gray-700 border-l-4 border-gray-300 pl-6 mt-8">
                "The future belongs to those who believe in the beauty of their dreams, and I'm building mine one algorithm at a time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section 
        id="achievements" 
        className={`py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300 ${
          !gameState.unlockedSections.includes('achievements') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="achievements-section"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="achievements-title">
            Achievements
            <div className="absolute -top-4 -right-12 text-4xl animate-doodle-bounce">🏆</div>
          </h2>
          
          <div className="relative" data-testid="timeline">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 timeline-line"></div>
            
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className={`flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} 
                data-testid={`achievement-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <div className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} max-w-md`}>
                  <motion.div 
                    className="nb-border p-6 bg-white dark:bg-gray-800"
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="text-3xl mr-4 achievement-icon"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <h3 className="font-handwritten text-2xl font-bold text-gray-900 dark:text-gray-100">{achievement.title}</h3>
                    </div>
                    <p className="font-clean text-gray-600 dark:text-gray-300">{achievement.detail}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies & Passions */}
      <section id="hobbies" className="py-32 bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300" data-testid="hobbies-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-handwritten text-6xl font-bold mb-16" data-testid="hobbies-title">
            Hobbies & Passions
          </h2>
          
          {/* Cycling hobbies animation */}
          <motion.div 
            className="mb-16" 
            data-testid="cycling-hobbies"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="nb-border p-8 inline-block bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="font-sketch text-3xl transition-all duration-500 hobby-cycling text-gray-900 dark:text-gray-100">
                {hobbies[currentHobby]}
              </p>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Music Player */}
          <motion.div 
            className="creative-music-player mx-auto" 
            data-testid="music-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="music-player-container">
              <div className="music-player-header">
                <h3 className="font-artistic text-3xl font-bold text-center mb-2 music-title text-gray-900 dark:text-gray-100">
                  Now Playing
                  <div className="musical-notes">♪ ♫ ♪</div>
                </h3>
              </div>
              
              <motion.div 
                className="music-player-card nb-border bg-white dark:bg-gray-800"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="music-info-section">
                  <div className="song-artwork">
                    <div className="vinyl-record">
                      <div className="vinyl-center"></div>
                      <div className="vinyl-grooves"></div>
                    </div>
                  </div>
                  
                  <div className="song-details">
                    <h4 className="font-sketch text-xl font-bold text-gray-900 dark:text-gray-100">Zaalima (sped up)</h4>
                    <p className="font-clean text-sm text-gray-600 dark:text-gray-400">Current favorite track</p>
                  </div>
                </div>
                
                {/* YouTube Player Embed */}
                <div className="youtube-player-container">
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/e1m0fuEXEDU?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0"
                    title="Zaalima (sped up)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="nb-border"
                  ></iframe>
                </div>
                
                <div className="music-controls">
                  <div className="equalizer-bars">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <div className="bar bar-3"></div>
                    <div className="bar bar-4"></div>
                    <div className="bar bar-5"></div>
                  </div>
                  <div className="volume-icon">
                    <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section 
        id="projects" 
        className={`py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300 ${
          !gameState.unlockedSections.includes('projects') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="projects-section"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="projects-title">
            Projects
            <div className="absolute -top-6 -right-16 text-3xl animate-float">🚀</div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8" data-testid="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="project-card" 
                data-testid={`project-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="nb-border p-8 h-full bg-white dark:bg-gray-800">
                  <h3 className="font-handwritten text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <p className="font-clean text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <div className="mt-auto">
                    <p className="font-sketch text-sm text-gray-500 dark:text-gray-400">{project.tech}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        id="contact" 
        className={`py-32 bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300 ${
          !gameState.unlockedSections.includes('contact') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="contact-section"
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="contact-title">
            Let's Connect
            <div className="absolute -top-4 -right-16 text-3xl animate-float">📮</div>
          </h2>
          
          <motion.form 
            onSubmit={handleFormSubmit} 
            className="nb-border p-12" 
            data-testid="contact-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div>
                <label className="font-handwritten text-xl block mb-3 text-gray-900 dark:text-gray-100">Name</label>
                <motion.input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                  className="w-full p-4 nb-border bg-white dark:bg-gray-800 font-clean text-lg text-gray-900 dark:text-gray-100 focus:outline-none"
                  data-testid="contact-name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="font-handwritten text-xl block mb-3 text-gray-900 dark:text-gray-100">Email</label>
                <motion.input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                  className="w-full p-4 nb-border bg-white dark:bg-gray-800 font-clean text-lg text-gray-900 dark:text-gray-100 focus:outline-none"
                  data-testid="contact-email"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <div>
                <label className="font-handwritten text-xl block mb-3 text-gray-900 dark:text-gray-100">Message</label>
                <motion.textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                  rows={5}
                  className="w-full p-4 nb-border bg-white dark:bg-gray-800 font-clean text-lg text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                  data-testid="contact-message"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full nb-button p-4 font-handwritten text-xl flex items-center justify-center space-x-3"
                data-testid="contact-submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.form>
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-8 mt-12" 
            data-testid="social-links"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a 
              href="#" 
              className="social-icon" 
              data-testid="link-github"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="nb-border w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800">
                <Github className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </div>
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon" 
              data-testid="link-linkedin"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="nb-border w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800">
                <Linkedin className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </div>
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon" 
              data-testid="link-instagram"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="nb-border w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800">
                <Instagram className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Skills Inventory Section */}
      <section 
        id="skills" 
        className={`py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300 ${
          !gameState.unlockedSections.includes('skills') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="skills-section"
      >
        <SkillsInventory />
      </section>

      {/* Japan Dream Section */}
      <section 
        id="japan-dream" 
        className={`py-32 fade-in-section scroll-reveal transition-colors duration-300 ${
          !gameState.unlockedSections.includes('japan-dream') ? 'section-locked' : 'section-unlocked'
        }`}
        data-testid="japan-dream-section"
      >
        <JapanDream />
      </section>

      {/* Guestbook Section */}
      <div 
        className={`scroll-reveal transition-colors duration-300 ${
          !gameState.unlockedSections.includes('guestbook') ? 'section-locked' : 'section-unlocked'
        }`}
        id="guestbook"
      >
        <Guestbook />
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Dynamic Quote */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <blockquote className="font-serif text-lg italic text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              "{dynamicQuote}"
            </blockquote>
          </motion.div>
          
          <p className="font-clean text-sm text-gray-600">
            © 2024 Satyajit Patil. Handcrafted with passion and endless sketches.
          </p>
          
          {/* Easter Egg Hint */}
          <motion.div 
            className="mt-4 text-xs text-gray-500 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
          >
            💡 Press ~ to open the terminal
          </motion.div>
          
          <div className="mt-4">
            <svg width="100" height="20" viewBox="0 0 100 20" className="mx-auto opacity-30">
              <path d="M10,10 Q30,18 50,8 T90,15" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="3,3"/>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}