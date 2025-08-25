import { useEffect, useState } from "react";
import { Github, Instagram, Linkedin, Book, Mail, Play, Pause, Send, Moon, Sun, Volume2, ArrowUp } from "lucide-react";
import Guestbook from "@/components/Guestbook";

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

    // Enhanced scroll-based animations with progress tracking
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 500);
      
      // Smooth parallax effects
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = scrolled * speed;
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      // Advanced scroll effects for sections
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach((section, index) => {
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

    return () => {
      clearInterval(hobbyInterval);
      window.removeEventListener('scroll', optimizedHandleScroll);
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
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        data-testid="scroll-progress"
      />
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full sketch-border hover:scale-110 transition-all duration-300 animate-bounce-subtle shadow-lg"
          data-testid="scroll-to-top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-sketch z-40 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90" data-testid="navigation">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-handwritten text-xl font-bold sketch-underline text-gray-900 dark:text-gray-100" data-testid="logo">SP</div>
            
            {/* Mobile Dark Mode Toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full sketch-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 creative-theme-toggle"
                data-testid="mobile-dark-mode-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-home">Home</a>
              <a href="#about" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-about">About</a>
              <a href="#achievements" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-achievements">Achievements</a>
              <a href="#projects" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-projects">Projects</a>
              <a href="#contact" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-contact">Contact</a>
              <a href="#guestbook" className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors" data-testid="nav-guestbook">Guestbook</a>
              
              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/4zurit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-clean text-sm hover:text-gray-600 dark:hover:text-gray-300 sketch-underline transition-colors flex items-center space-x-1"
                data-testid="nav-instagram"
                title="Follow me on Instagram"
              >
                <span>📸</span>
                <span>@4zurit</span>
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full sketch-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 creative-theme-toggle"
                data-testid="dark-mode-toggle"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
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
      <section id="about" className="py-32 about-section-enhanced bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300" data-testid="about-section">
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
      <section id="achievements" className="py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300" data-testid="achievements-section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="achievements-title">
            Achievements
            <div className="absolute -top-4 -right-12 text-4xl animate-doodle-bounce">🏆</div>
          </h2>
          
          <div className="relative" data-testid="timeline">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 timeline-line"></div>
            
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} data-testid={`achievement-${index}`}>
                <div className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} max-w-md`}>
                  <div className="sketch-card p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4 achievement-icon">{achievement.icon}</div>
                      <h3 className="font-handwritten text-2xl font-bold">{achievement.title}</h3>
                    </div>
                    <p className="font-clean text-gray-600">{achievement.detail}</p>
                  </div>
                </div>
              </div>
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
          <div className="mb-16" data-testid="cycling-hobbies">
            <div className="sketch-card p-8 inline-block">
              <p className="font-sketch text-3xl transition-all duration-500 hobby-cycling">
                {hobbies[currentHobby]}
              </p>
            </div>
          </div>
          
          {/* Enhanced Music Player */}
          <div className="creative-music-player mx-auto" data-testid="music-section">
            <div className="music-player-container">
              <div className="music-player-header">
                <h3 className="font-artistic text-3xl font-bold text-center mb-2 music-title">
                  Now Playing
                  <div className="musical-notes">♪ ♫ ♪</div>
                </h3>
              </div>
              
              <div className="music-player-card">
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
                    className="sketch-border"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 fade-in-section scroll-reveal bg-white dark:bg-gray-900 transition-colors duration-300" data-testid="projects-section">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="projects-title">
            Projects
            <div className="absolute -top-6 -right-16 text-3xl animate-float">🚀</div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8" data-testid="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" data-testid={`project-${index}`}>
                <div className="sketch-card p-8 h-full hover:scale-105 transition-all duration-300">
                  <h3 className="font-handwritten text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="font-clean text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  <div className="mt-auto">
                    <p className="font-sketch text-sm text-gray-500">{project.tech}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 bg-gray-50 dark:bg-gray-800/50 fade-in-section scroll-reveal transition-colors duration-300" data-testid="contact-section">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-handwritten text-6xl font-bold mb-16 text-center relative" data-testid="contact-title">
            Let's Connect
            <div className="absolute -top-4 -right-16 text-3xl animate-float">📮</div>
          </h2>
          
          <form onSubmit={handleFormSubmit} className="sketch-card p-12" data-testid="contact-form">
            <div className="space-y-8">
              <div>
                <label className="font-handwritten text-xl block mb-3">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                  className="w-full p-4 sketch-border bg-white font-clean text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  data-testid="contact-name"
                />
              </div>
              
              <div>
                <label className="font-handwritten text-xl block mb-3">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                  className="w-full p-4 sketch-border bg-white font-clean text-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  data-testid="contact-email"
                />
              </div>
              
              <div>
                <label className="font-handwritten text-xl block mb-3">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                  rows={5}
                  className="w-full p-4 sketch-border bg-white font-clean text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                  data-testid="contact-message"
                />
              </div>
              
              <button
                type="submit"
                className="w-full sketch-border p-4 bg-gray-900 text-white font-handwritten text-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-3"
                data-testid="contact-submit"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-8 mt-12" data-testid="social-links">
            <a href="#" className="social-icon" data-testid="link-github">
              <div className="sketch-border w-16 h-16 flex items-center justify-center">
                <Github className="w-6 h-6" />
              </div>
            </a>
            <a href="#" className="social-icon" data-testid="link-linkedin">
              <div className="sketch-border w-16 h-16 flex items-center justify-center">
                <Linkedin className="w-6 h-6" />
              </div>
            </a>
            <a href="#" className="social-icon" data-testid="link-instagram">
              <div className="sketch-border w-16 h-16 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <div className="scroll-reveal transition-colors duration-300">
        <Guestbook />
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-clean text-sm text-gray-600">
            © 2024 Satyajit Patil. Handcrafted with passion and endless sketches.
          </p>
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