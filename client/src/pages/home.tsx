import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Book, Mail, Play, Pause, Send, Moon, Sun, Volume2, ArrowUp } from "lucide-react";
import Guestbook from "@/components/Guestbook";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { RetroTerminal } from "@/components/ui/retro-terminal";
import { SkillsInventory } from "@/components/ui/skills-inventory";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { JapanDream } from "@/components/ui/japan-dream";
import { ConfettiEffect } from "@/components/ui/confetti-effect";

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
  const [currentSection, setCurrentSection] = useState('home');

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
          
          if (isVisible) {
            setCurrentSection(id);
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





      {/* Retro Terminal */}
      <RetroTerminal
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
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
              className={`navbar-link ${currentSection === 'home' ? 'active' : ''}`}
              data-testid="nav-home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.a>
            
            <motion.a 
              href="#about" 
              className={`navbar-link ${currentSection === 'about' ? 'active' : ''}`}
              data-testid="nav-about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.a>
            
            <motion.a 
              href="#achievements" 
              className={`navbar-link ${currentSection === 'achievements' ? 'active' : ''}`}
              data-testid="nav-achievements"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Achievements
            </motion.a>
            
            <motion.a 
              href="#projects" 
              className={`navbar-link ${currentSection === 'projects' ? 'active' : ''}`}
              data-testid="nav-projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.a>
            
            <motion.a 
              href="#contact" 
              className={`navbar-link ${currentSection === 'contact' ? 'active' : ''}`}
              data-testid="nav-contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
            
            <motion.a 
              href="#skills" 
              className={`navbar-link ${currentSection === 'skills' ? 'active' : ''}`}
              data-testid="nav-skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.a>
            
            <motion.a 
              href="#japan-dream" 
              className={`navbar-link ${currentSection === 'japan-dream' ? 'active' : ''}`}
              data-testid="nav-japan-dream"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Japan Dream
            </motion.a>
            
            <motion.a 
              href="#guestbook" 
              className={`navbar-link ${currentSection === 'guestbook' ? 'active' : ''}`}
              data-testid="nav-guestbook"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guestbook
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

      {/* Desktop Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-8"
        data-testid="hero-section"
      >
        <div className="w-full max-w-6xl">
          {/* Desktop Window */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-300 dark:border-gray-600 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Window Header */}
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                Portfolio.exe
              </div>
              <div className="w-16"></div>
            </div>

            {/* Window Content */}
            <div className="p-12">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-mono text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                  welcome to my
                </h1>
                <h1 className="font-mono text-4xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white transition-colors duration-300">
                  portfolio.
                </h1>
                <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono mb-8">
                  <span className="inline-block min-h-[2rem]">
                    {typewriterText}
                    <span className="animate-pulse">|</span>
                  </span>
                </div>
              </motion.div>

              {/* Desktop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* About Card */}
                <motion.div
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-mono text-lg font-bold mb-3 text-gray-900 dark:text-white">About Me</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    AI Innovator & Developer passionate about building the future. Currently pursuing dreams in Japan 🇯🇵
                  </p>
                  <a href="#about" className="text-blue-500 hover:text-blue-600 font-mono text-sm">
                    Read More →
                  </a>
                </motion.div>

                {/* Projects Card */}
                <motion.div
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-green-400 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-mono text-lg font-bold mb-3 text-gray-900 dark:text-white">Projects</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>• LensAI - AI Platform</div>
                    <div>• Inforvi - Data Viz</div>
                    <div>• ORLON.OG - OSINT</div>
                  </div>
                  <a href="#projects" className="text-green-500 hover:text-green-600 font-mono text-sm">
                    View All →
                  </a>
                </motion.div>

                {/* Resume Card */}
                <motion.div
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-mono text-lg font-bold mb-3 text-gray-900 dark:text-white">Resume</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Download my latest resume
                  </p>
                  <a href="#" className="text-purple-500 hover:text-purple-600 font-mono text-sm">
                    Resume.pdf ↓
                  </a>
                </motion.div>
              </div>

              {/* To Do List */}
              <motion.div
                className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="font-mono text-lg font-bold mb-4 text-gray-900 dark:text-white">To do:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• Land my dream AI job</div>
                  <div>• Master Japanese language</div>
                  <div>• Move to Japan</div>
                  <div>• Build revolutionary AI tools</div>
                  <div>• Contribute to open source</div>
                  <div>• Travel the world</div>
                  <div>• Master OSINT techniques</div>
                  <div>• Create amazing projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section 
        id="about" 
        className="py-32 about-section-enhanced bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300"
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
        className="py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300"
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

      {/* Projects - Desktop Style */}
      <section 
        id="projects" 
        className="py-32 fade-in-section scroll-reveal bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
        data-testid="projects-section"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-300 dark:border-gray-600 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Window Header */}
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                Projects.exe
              </div>
              <div className="w-16"></div>
            </div>

            {/* Window Content */}
            <div className="p-8">
              <h2 className="font-mono text-3xl font-bold mb-8 text-gray-900 dark:text-white" data-testid="projects-title">
                My Projects
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="projects-grid">
                {projects.map((project, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors duration-300"
                    data-testid={`project-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-mono text-lg font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-3">{project.tech}</div>
                    <a href="#" className="text-blue-500 hover:text-blue-600 font-mono text-sm">
                      View Project →
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form - Desktop Style */}
      <section 
        id="contact" 
        className="py-32 bg-gray-100 dark:bg-gray-900 fade-in-section scroll-reveal transition-colors duration-300"
        data-testid="contact-section"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-300 dark:border-gray-600 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Window Header */}
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                Contact.exe
              </div>
              <div className="w-16"></div>
            </div>

            {/* Window Content */}
            <div className="p-8">
              <h2 className="font-mono text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center" data-testid="contact-title">
                Let's Connect
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
          </motion.div>
        </div>
      </section>

      {/* Skills Inventory Section */}
      <section 
        id="skills" 
        className="py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300"
        data-testid="skills-section"
      >
        <SkillsInventory />
      </section>

      {/* Japan Dream Section */}
      <section 
        id="japan-dream" 
        className="py-32 fade-in-section scroll-reveal transition-colors duration-300"
        data-testid="japan-dream-section"
      >
        <JapanDream />
      </section>

      {/* Guestbook Section */}
      <div 
        className="scroll-reveal transition-colors duration-300"
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