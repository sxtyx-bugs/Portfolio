import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Book, Mail, Play, Pause, Send, Moon, Sun, Volume2, ArrowUp } from "lucide-react";
import Guestbook from "@/components/Guestbook";
import { LoadingScreen } from "@/components/ui/loading-screen";

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
  const [currentSection, setCurrentSection] = useState('home');
  const [sectionTransition, setSectionTransition] = useState(false);
  const [dynamicQuote, setDynamicQuote] = useState('');
  const [completedGoals, setCompletedGoals] = useState(new Set());


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

  // Dynamic quotes for motivation
  const quotes = [
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Technology is nothing. What's important is that you have faith in people. - Steve Jobs",
    "The computer was born to solve problems that did not exist before. - Bill Gates",
    "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "Dream big and dare to fail. - Norman Vaughan",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
  ];

  // Interactive goals data
  const goals = [
    { id: 'japan', text: 'Visit Japan and experience the culture', completed: false },
    { id: 'ai', text: 'Build an AI-powered application', completed: true },
    { id: 'osint', text: 'Master advanced OSINT techniques', completed: false },
    { id: 'startup', text: 'Launch my own tech startup', completed: false },
    { id: 'mentor', text: 'Mentor aspiring developers', completed: true },
    { id: 'speak', text: 'Speak at a tech conference', completed: false }
  ];

  const toggleGoal = (goalId: string) => {
    setCompletedGoals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(goalId)) {
        newSet.delete(goalId);
      } else {
        newSet.add(goalId);
      }
      return newSet;
    });
  };

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
      
      // Section unlocking based on scroll position with transitions
      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'achievements', element: document.getElementById('achievements') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'skills', element: document.getElementById('skills') },
        { id: 'japan-dream', element: document.getElementById('japan-dream') },
        { id: 'guestbook', element: document.getElementById('guestbook') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isVisible && currentSection !== id) {
            // Trigger section transition
            setSectionTransition(true);
            setTimeout(() => {
              setCurrentSection(id);
              setSectionTransition(false);
            }, 300);
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
      // Skip loading screen with Enter key
      if (e.key === 'Enter' && showLoading) {
        e.preventDefault();
        setShowLoading(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(hobbyInterval);
      clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', optimizedHandleScroll);
      window.removeEventListener('keydown', handleKeyPress);
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
    <div className="paper-texture text-gray-900 dark:text-gray-100 font-clean overflow-x-hidden transition-colors duration-300 relative">
      {/* Background Doodles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="doodle text-4xl" style={{ top: '10%', left: '5%', color: 'var(--cyan)' }}>⭐</div>
        <div className="doodle text-3xl" style={{ top: '20%', right: '10%', color: 'var(--magenta)', animationDelay: '1s' }}>✨</div>
        <div className="doodle text-2xl" style={{ top: '60%', left: '8%', color: 'var(--yellow)', animationDelay: '2s' }}>→</div>
        <div className="doodle text-3xl" style={{ top: '80%', right: '15%', color: 'var(--red)', animationDelay: '3s' }}>💫</div>
        <div className="doodle text-2xl" style={{ top: '40%', left: '3%', color: 'var(--aqua-green)', animationDelay: '4s' }}>←</div>
        <div className="doodle text-4xl" style={{ top: '70%', right: '5%', color: 'var(--deep-blue)', animationDelay: '5s' }}>🌟</div>
      </div>

      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onFinish={() => setShowLoading(false)} />
      )}







      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />

      {/* Section Transition Overlay */}
      <AnimatePresence>
        {sectionTransition && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 z-40 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          data-testid="scroll-to-top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
      
      {/* Sketchy Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 paper-texture border-b-4 border-black transition-all duration-300"
        data-testid="navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Sketchy Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 border-4 border-black bg-yellow-400 flex items-center justify-center transform rotate-3">
                <span className="text-black font-bold text-lg sketch-heading">SP</span>
              </div>
              <span className="sketch-heading text-2xl">Satyajit Patil</span>
            </motion.div>
          
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: '#home', label: 'Home', id: 'home' },
                { href: '#about', label: 'About', id: 'about' },
                { href: '#achievements', label: 'Achievements', id: 'achievements' },
                { href: '#projects', label: 'Projects', id: 'projects' },
                { href: '#skills', label: 'Skills', id: 'skills' },
                { href: '#japan-dream', label: 'Japan Dream', id: 'japan-dream' },
                { href: '#guestbook', label: 'Guestbook', id: 'guestbook' },
                { href: '#contact', label: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href} 
                  className={`sketch-button text-sm ${
                    currentSection === link.id 
                      ? 'bg-cyan-400 border-cyan-600' 
                      : ''
                  }`}
                  data-testid={`nav-${link.id}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="scribble-underline">{link.label}</span>
                </motion.a>
              ))}
            </div>
            
            {/* Sketchy Theme Toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="sketch-button p-2"
              data-testid="theme-toggle"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            </div>
          </div>
      </motion.nav>

      {/* Sketchy Hero Section */}
      <section 
        id="home" 
        className="min-h-screen paper-texture transition-colors duration-300 relative overflow-hidden"
        data-testid="hero-section"
      >
        {/* Desktop Icons */}
        <div className="absolute inset-0 p-8">
          {/* Left Side Icons */}
          <div className="absolute left-8 top-32 space-y-8">
            {/* Resume Icon */}
            <motion.div
              className="desktop-icon group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="sketch-card w-16 h-16 flex items-center justify-center">
                <Book className="w-8 h-8 text-black" />
              </div>
              <p className="text-xs text-center mt-2 text-black font-medium sketch-text">Resume.pdf</p>
            </motion.div>

            {/* About Me Icon */}
            <motion.div
              className="desktop-icon group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="sketch-card w-16 h-16 flex items-center justify-center bg-cyan-400">
                <div className="w-8 h-8 bg-black"></div>
              </div>
              <p className="text-xs text-center mt-2 text-black font-medium sketch-text">About Me</p>
            </motion.div>
          </div>

          {/* Right Side Project Icons */}
          <div className="absolute right-8 top-32 space-y-6">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={index}
                className="desktop-icon group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className={`sketch-card w-16 h-16 flex items-center justify-center ${
                  index % 3 === 0 ? 'bg-magenta-400' : 
                  index % 3 === 1 ? 'bg-yellow-400' : 'bg-aqua-green'
                }`}>
                  <div className="w-8 h-8 bg-black"></div>
                </div>
                <p className="text-xs text-center mt-2 text-black font-medium sketch-text max-w-20">
                  Project {String(index + 1).padStart(2, '0')} ({project.title})
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Sketchy Sticky Note */}
          <motion.div
            className="absolute top-8 left-8 w-48 h-48 bg-yellow-400 border-4 border-black p-4"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ rotate: -2, scale: 1.02 }}
          >
            <div className="sketch-heading text-sm mb-3">To do:</div>
            <div className="space-y-1 text-xs text-black">
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

        {/* Central Sketchy Title */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <motion.div
              className="sketch-text text-4xl md:text-6xl mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              welcome to my
            </motion.div>
            <motion.div
              className="sketch-heading text-6xl md:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              portfolio.
            </motion.div>
        </div>
        </div>

        {/* Sketchy Dock */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 paper-texture border-4 border-black px-4 py-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center space-x-3">
            {/* Sketchy Dock Icons */}
            <motion.div
              className="sketch-card w-12 h-12 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <div className="w-6 h-6 bg-black"></div>
            </motion.div>
            <motion.div
              className="sketch-card w-12 h-12 flex items-center justify-center cursor-pointer bg-cyan-400"
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              <div className="w-6 h-6 bg-black"></div>
            </motion.div>
            <motion.div
              className="sketch-card w-12 h-12 flex items-center justify-center cursor-pointer bg-magenta-400"
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <div className="w-6 h-6 bg-black"></div>
            </motion.div>
            <motion.div
              className="sketch-card w-12 h-12 flex items-center justify-center cursor-pointer bg-yellow-400"
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              <div className="w-6 h-6 bg-black"></div>
            </motion.div>
            <motion.div
              className="sketch-card w-12 h-12 flex items-center justify-center cursor-pointer bg-aqua-green"
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              <div className="w-6 h-6 bg-black"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrollbar */}
        <motion.div
          className="absolute right-2 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="w-full bg-gray-600 dark:bg-gray-400 rounded-full"
            style={{ height: '30%' }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Sketchy About Section */}
      <section 
        id="about" 
        className="py-32 paper-texture transition-colors duration-300 relative overflow-hidden"
        data-testid="about-section"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="sketch-heading text-4xl md:text-5xl mb-4" data-testid="about-title">
              About Me
            </h2>
            <p className="sketch-text text-lg">
              Passionate about AI, OSINT, and building the future
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="sketch-subheading text-2xl mb-4">My Story</h3>
                <p className="sketch-text leading-relaxed">
                  I'm a passionate dreamer and builder who thrives on creating innovative solutions at the intersection of AI and technology. My journey spans across multiple domains - from developing AI-powered applications to exploring the fascinating world of OSINT and geolocation technologies.
              </p>
            </div>
            
              <div>
                <h3 className="sketch-subheading text-2xl mb-4">My Goals</h3>
                <p className="sketch-text leading-relaxed mb-6">
                  My goals are ambitious but crystal clear. Click on any goal to mark it as completed!
                </p>
                
                {/* Interactive Goals Checklist */}
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      className={`sketch-card p-3 transition-all duration-300 ${
                        completedGoals.has(goal.id) 
                          ? 'border-green-500 bg-green-50' 
                          : 'hover:border-cyan-400'
                      }`}
                      onClick={() => toggleGoal(goal.id)}
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            completedGoals.has(goal.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          animate={completedGoals.has(goal.id) ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {completedGoals.has(goal.id) && (
                            <motion.span
                              className="text-white text-xs"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.div>
                        <span className={`sketch-text text-sm font-medium transition-colors duration-300 ${
                          completedGoals.has(goal.id)
                            ? 'text-green-600 line-through'
                            : 'text-black'
                        }`}>
                          {goal.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            
              <div>
                <h3 className="sketch-subheading text-2xl mb-4">My Interests</h3>
                <p className="sketch-text leading-relaxed">
                  When I'm not coding, you'll find me exploring the depths of OSINT research, learning about geolocation techniques, or diving into the latest AI papers. I believe that the future belongs to those who can bridge the gap between human creativity and machine intelligence.
              </p>
            </div>
            </motion.div>
            
            <motion.div
              className="sketch-card p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="sketch-subheading text-xl mb-6">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="skill-tag">AI & Machine Learning</div>
                  <div className="skill-tag">Web Development</div>
                  <div className="skill-tag">OSINT Research</div>
                  <div className="skill-tag">Data Visualization</div>
            </div>
                <div className="space-y-3">
                  <div className="skill-tag">Python</div>
                  <div className="skill-tag">JavaScript/TypeScript</div>
                  <div className="skill-tag">React</div>
                  <div className="skill-tag">Node.js</div>
                </div>
            </div>
            </motion.div>
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

      {/* Sketchy Projects Section */}
      <section 
        id="projects" 
        className="py-32 paper-texture transition-colors duration-300 relative overflow-hidden"
        data-testid="projects-section"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-10 right-20 w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, 50, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="sketch-heading text-4xl md:text-5xl mb-4">
              My Projects
          </h2>
            <p className="sketch-text text-lg">
              A collection of my work and creative projects
            </p>
          </motion.div>
          
          {/* Projects Grid with 3D Card Flip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="group cursor-pointer perspective-1000"
                data-testid={`project-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative w-full h-80 preserve-3d group-hover:rotate-y-180 transition-transform duration-700">
                  {/* Front of Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden sketch-card p-8">
                    <div className="mb-6">
                      <h3 className="sketch-subheading text-2xl mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="sketch-text leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="skill-tag text-sm">
                        {project.tech}
                      </div>
                      <motion.div
                        className="sketch-text font-medium"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        Hover to flip →
                      </motion.div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 sketch-card p-8 bg-gradient-to-br from-cyan-400 to-magenta-400 text-black">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="sketch-heading text-2xl mb-4">{project.title}</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="sketch-subheading font-semibold mb-2">Tech Stack:</h4>
                            <p className="sketch-text text-sm">{project.tech}</p>
                          </div>
                          <div>
                            <h4 className="sketch-subheading font-semibold mb-2">Features:</h4>
                            <ul className="sketch-text text-sm space-y-1">
                              <li>• Modern UI/UX Design</li>
                              <li>• Responsive Layout</li>
                              <li>• Performance Optimized</li>
                              <li>• Cross-browser Compatible</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <motion.button
                          className="sketch-button text-sm"
                          whileHover={{ scale: 1.05, rotate: 1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Demo
                        </motion.button>
                        <motion.button
                          className="sketch-button text-sm"
                          whileHover={{ scale: 1.05, rotate: -1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          GitHub
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with Scroll Animations */}
      <section 
        id="contact" 
        className="py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden"
        data-testid="contact-section"
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-20 left-1/4 w-24 h-24 bg-blue-500 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-500 rounded-full"
            animate={{ 
              y: [0, 20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-20 h-20 bg-pink-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -180, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="contact-title">
            Let's Connect
          </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Ready to work together? Let's make something amazing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get in touch</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you want to discuss AI, OSINT, or just say hello, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:satyajit@example.com"
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Email</div>
                    <div className="text-gray-600 dark:text-gray-400">satyajit@example.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/satyajit"
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">LinkedIn</div>
                    <div className="text-gray-600 dark:text-gray-400">linkedin.com/in/satyajit</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/satyajit"
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Github className="w-6 h-6 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">GitHub</div>
                    <div className="text-gray-600 dark:text-gray-400">github.com/satyajit</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
          
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a message</h3>
              
              <motion.form 
                onSubmit={handleFormSubmit} 
                className="space-y-6" 
                data-testid="contact-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <motion.input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  data-testid="contact-name"
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Your name"
                />
              </div>
              
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <motion.input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                  data-testid="contact-email"
                    whileFocus={{ scale: 1.02 }}
                    placeholder="your@email.com"
                />
              </div>
              
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <motion.textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                    rows={6}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none"
                  data-testid="contact-message"
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Tell me about your project..."
                />
              </div>
              
                <motion.button
                type="submit"
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                data-testid="contact-submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Japan Dream Map Section */}
      <section 
        id="japan-dream" 
        className="py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors duration-300 relative overflow-hidden"
        data-testid="japan-dream-section"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-16 h-16 bg-pink-500 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-12 h-12 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              🇯🇵 Japan Dream Map
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              My journey to Japan - hover over the landmarks to explore my dreams
            </p>
          </motion.div>
          
          {/* Interactive Map */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl overflow-hidden">
              {/* Mount Fuji */}
              <motion.div
                className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-t from-gray-400 to-white dark:from-gray-600 dark:to-gray-300 rounded-t-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl">🗻</div>
              </motion.div>
              
              {/* Tokyo Skyline */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-600 to-gray-400 dark:from-gray-700 dark:to-gray-500">
                <div className="flex justify-between items-end h-full px-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-gray-500 dark:bg-gray-400 rounded-t"
                      style={{ 
                        width: '12px', 
                        height: `${60 + Math.random() * 40}px` 
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Cherry Blossoms */}
              <motion.div
                className="absolute top-10 left-1/3 w-8 h-8 text-pink-400"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🌸
              </motion.div>
              
              {/* Bullet Train */}
              <motion.div
                className="absolute top-1/2 left-0 w-16 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                animate={{ x: [0, 400, 0] }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                🚄
              </motion.div>
              
              {/* Interactive Tooltips */}
              <motion.div
                className="absolute top-20 left-1/4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Mount Fuji:</strong> Climb Japan's iconic mountain
                </p>
              </motion.div>
              
              <motion.div
                className="absolute top-32 right-1/4 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Tokyo:</strong> Experience cutting-edge technology
                </p>
              </motion.div>
            </div>
            
            {/* Goals List */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <motion.div
                className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl mb-2">🎓</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Study in Japan</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Master AI at top universities</p>
              </motion.div>
              
              <motion.div
                className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Work in Tech</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join innovative companies</p>
              </motion.div>
              
              <motion.div
                className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl mb-2">🌏</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Cultural Immersion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Experience Japanese culture</p>
              </motion.div>
            </div>
          </div>
        </div>
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
          
          <p className="font-clean text-sm text-gray-600">
            © 2024 Satyajit Patil. Handcrafted with passion and endless sketches.
          </p>
          
          {/* Dynamic Quote */}
          {dynamicQuote && (
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                "{dynamicQuote}"
              </p>
            </motion.div>
          )}
          
          
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