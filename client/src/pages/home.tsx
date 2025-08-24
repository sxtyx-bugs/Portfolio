import { useEffect } from "react";
import { Github, Instagram, Linkedin, Book, Mail } from "lucide-react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute('href')!);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleNavClick);
    });

    // Add random floating animation delays
    const floatingElements = document.querySelectorAll('.animate-float');
    floatingElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.5}s`;
    });

    // Parallax effect for hero doodles
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('#home .absolute');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        (element as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animation triggers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sketch cards for fade-in animation
    document.querySelectorAll('.sketch-card').forEach(card => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(20px)';
      (card as HTMLElement).style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleNavClick);
      });
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 font-clean">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-sketch z-50 border-b border-gray-200" data-testid="navigation">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-handwritten text-xl font-bold sketch-underline" data-testid="logo">SP</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="font-clean text-sm hover:text-gray-600 sketch-underline" data-testid="nav-home">Home</a>
              <a href="#about" className="font-clean text-sm hover:text-gray-600 sketch-underline" data-testid="nav-about">About</a>
              <a href="#achievements" className="font-clean text-sm hover:text-gray-600 sketch-underline" data-testid="nav-achievements">Achievements</a>
              <a href="#projects" className="font-clean text-sm hover:text-gray-600 sketch-underline" data-testid="nav-projects">Projects</a>
              <a href="#contact" className="font-clean text-sm hover:text-gray-600 sketch-underline" data-testid="nav-contact">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-testid="hero-section">
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          {/* Floating doodle elements */}
          <div className="absolute top-10 left-10 text-4xl opacity-30 animate-float" data-testid="doodle-star">⭐</div>
          <div className="absolute top-20 right-20 text-3xl opacity-40 animate-doodle-bounce" data-testid="doodle-arrow">→</div>
          <div className="absolute bottom-32 left-20 text-2xl opacity-35 animate-float" style={{animationDelay: '1s'}} data-testid="doodle-sparkle">✨</div>
          
          {/* Main headline */}
          <h1 className="font-handwritten text-6xl md:text-8xl font-bold mb-8 relative" data-testid="main-headline">
            Hi, I'm 
            <span className="relative inline-block">
              Satyajit
              <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 300 20" data-testid="headline-underline">
                <path d="M10,15 Q50,5 100,12 T200,10 T290,15" stroke="#333" strokeWidth="3" fill="none" 
                      strokeDasharray="5,5" className="animate-sketch-draw"/>
              </svg>
            </span>
            <div className="absolute -top-8 -right-8 text-3xl animate-doodle-bounce" data-testid="wave-emoji">✌️</div>
          </h1>
          
          {/* Portrait placeholder with sketch border */}
          <div className="sketch-border w-48 h-48 mx-auto mb-8 flex items-center justify-center bg-gray-50" data-testid="portrait-placeholder">
            {/* Simple sketch-style portrait outline */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-60" data-testid="portrait-svg">
              <circle cx="60" cy="40" r="25" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M30,80 Q40,70 60,75 T90,80 Q90,100 60,105 Q30,100 30,80" stroke="#333" strokeWidth="2" fill="none"/>
              <circle cx="52" cy="38" r="2" fill="#333"/>
              <circle cx="68" cy="38" r="2" fill="#333"/>
              <path d="M55,48 Q60,52 65,48" stroke="#333" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          {/* Tagline */}
          <p className="font-sketch text-2xl md:text-3xl text-gray-700 mb-12" data-testid="tagline">
            Dreamer. Builder. Achiever.
          </p>
          
          {/* Animated arrow pointing down */}
          <div className="animate-bounce" data-testid="scroll-indicator">
            <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto opacity-60">
              <path d="M20,5 Q18,15 20,25 Q22,15 20,5" stroke="#333" strokeWidth="2" fill="none"/>
              <path d="M15,20 Q20,28 25,20" stroke="#333" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50" data-testid="about-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-5xl font-bold mb-4 relative inline-block" data-testid="about-title">
              About Me
              <div className="absolute -top-6 -right-12 text-2xl animate-float" data-testid="about-icon">📝</div>
            </h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto transform rotate-1"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Description */}
            <div className="sketch-card p-8" data-testid="about-description">
              <p className="font-clean text-lg leading-relaxed mb-6">
                I'm a passionate dreamer and builder who thrives on creating innovative solutions at the intersection of AI and technology. My journey spans across multiple domains - from developing AI-powered applications to exploring the fascinating world of OSINT and geolocation technologies.
              </p>
              <p className="font-clean text-lg leading-relaxed">
                When I'm not coding or experimenting with new AI models, you'll find me diving deep into unique projects, learning Japanese, or crafting faceless brands. I believe in the power of continuous learning and the magic that happens when curiosity meets dedication.
              </p>
            </div>
            
            {/* Timeline */}
            <div className="sketch-card p-8" data-testid="timeline">
              <h3 className="font-handwritten text-2xl font-bold mb-6">My Journey</h3>
              <div className="space-y-6">
                <div className="timeline-item" data-testid="timeline-academic">
                  <h4 className="font-clean font-semibold">Academic Excellence</h4>
                  <p className="font-clean text-sm text-gray-600">Top scores in Computer Science</p>
                </div>
                <div className="timeline-item" data-testid="timeline-ai">
                  <h4 className="font-clean font-semibold">AI Exploration</h4>
                  <p className="font-clean text-sm text-gray-600">Built LensAI and Inforvi</p>
                </div>
                <div className="timeline-item" data-testid="timeline-osint">
                  <h4 className="font-clean font-semibold">OSINT Mastery</h4>
                  <p className="font-clean text-sm text-gray-600">Created ORLON.OG</p>
                </div>
                <div className="timeline-item" data-testid="timeline-entrepreneur">
                  <h4 className="font-clean font-semibold">Entrepreneurial Spirit</h4>
                  <p className="font-clean text-sm text-gray-600">Launched Badlapur Bites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20" data-testid="achievements-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-5xl font-bold mb-4 relative inline-block" data-testid="achievements-title">
              Achievements
              <div className="absolute -top-4 -right-8 text-3xl animate-doodle-bounce" data-testid="trophy-icon">🏆</div>
            </h2>
          </div>
          
          <div className="notebook-bg p-8 sketch-border" data-testid="achievements-content">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Academic Achievements */}
              <div data-testid="academic-achievements">
                <h3 className="font-sketch text-2xl font-bold mb-4 flex items-center">
                  Academic Excellence
                  <span className="ml-2 text-xl">📚</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3" data-testid="achievement-awards">
                    <span className="text-xl">⭐</span>
                    <span className="font-clean">Won multiple academic awards</span>
                  </li>
                  <li className="flex items-start space-x-3" data-testid="achievement-scores">
                    <span className="text-xl">📊</span>
                    <span className="font-clean">Top scores in Computer Science</span>
                  </li>
                  <li className="flex items-start space-x-3" data-testid="achievement-jee">
                    <span className="text-xl">🎯</span>
                    <span className="font-clean">JEE preparation dedication</span>
                  </li>
                </ul>
              </div>
              
              {/* Technical Achievements */}
              <div data-testid="technical-achievements">
                <h3 className="font-sketch text-2xl font-bold mb-4 flex items-center">
                  Technical Mastery
                  <span className="ml-2 text-xl">💻</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3" data-testid="achievement-ai-apps">
                    <span className="text-xl">🤖</span>
                    <span className="font-clean">Built AI-powered apps: LensAI, Inforvi</span>
                  </li>
                  <li className="flex items-start space-x-3" data-testid="achievement-orlon">
                    <span className="text-xl">🌍</span>
                    <span className="font-clean">Created ORLON.OG (geolocation-based)</span>
                  </li>
                  <li className="flex items-start space-x-3" data-testid="achievement-python">
                    <span className="text-xl">🐍</span>
                    <span className="font-clean">Fluent in Python & web development</span>
                  </li>
                  <li className="flex items-start space-x-3" data-testid="achievement-experiments">
                    <span className="text-xl">🔬</span>
                    <span className="font-clean">AI experiments and research</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies & Interests Section */}
      <section id="hobbies" className="py-20 bg-gray-50" data-testid="hobbies-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-5xl font-bold mb-4" data-testid="hobbies-title">
              Hobbies & Interests
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="hobbies-grid">
            {/* Hobby items with doodle icons */}
            <div className="sketch-card p-6 text-center" data-testid="hobby-coding">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="font-sketch text-lg font-bold">Coding</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-ai">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-sketch text-lg font-bold">AI Research</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-osint">
              <div className="text-4xl mb-3">🕵️</div>
              <h3 className="font-sketch text-lg font-bold">OSINT</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-geolocation">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-sketch text-lg font-bold">Geolocation</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-writing">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-sketch text-lg font-bold">Creative Writing</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-japanese">
              <div className="text-4xl mb-3">🇯🇵</div>
              <h3 className="font-sketch text-lg font-bold">Learning Japanese</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-travel">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="font-sketch text-lg font-bold">Traveling</h3>
            </div>
            
            <div className="sketch-card p-6 text-center" data-testid="hobby-brands">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-sketch text-lg font-bold">Building Brands</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="projects" className="py-20" data-testid="projects-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-handwritten text-5xl font-bold mb-4 relative inline-block" data-testid="projects-title">
              Project Showcase
              <div className="absolute -top-6 -right-16 text-2xl animate-float" data-testid="rocket-icon">🚀</div>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="projects-grid">
            {/* Project Cards */}
            <div className="sketch-card p-6" data-testid="project-lensai">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">LensAI Screenshot</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">LensAI</h3>
              <p className="font-clean text-sm text-gray-600">AI-powered image analysis and recognition platform with advanced machine learning capabilities.</p>
            </div>
            
            <div className="sketch-card p-6" data-testid="project-inforvi">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">Inforvi Preview</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">Inforvi</h3>
              <p className="font-clean text-sm text-gray-600">Information visualization tool that transforms complex data into beautiful, interactive insights.</p>
            </div>
            
            <div className="sketch-card p-6" data-testid="project-orlon">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">ORLON.OG Demo</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">ORLON.OG</h3>
              <p className="font-clean text-sm text-gray-600">Geolocation-based platform combining OSINT techniques with interactive mapping technologies.</p>
            </div>
            
            <div className="sketch-card p-6" data-testid="project-badlapur">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">Badlapur Bites</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">Badlapur Bites</h3>
              <p className="font-clean text-sm text-gray-600">Local food discovery platform connecting food lovers with authentic regional cuisines.</p>
            </div>
            
            <div className="sketch-card p-6" data-testid="project-experiments">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">AI Experiments</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">AI Experiments</h3>
              <p className="font-clean text-sm text-gray-600">Collection of experimental AI projects exploring cutting-edge machine learning techniques.</p>
            </div>
            
            <div className="sketch-card p-6" data-testid="project-coming-soon">
              <div className="sketch-border h-40 mb-4 bg-gray-100 flex items-center justify-center">
                <span className="font-sketch text-lg text-gray-500">Coming Soon</span>
              </div>
              <h3 className="font-handwritten text-2xl font-bold mb-2">Next Project</h3>
              <p className="font-clean text-sm text-gray-600">Always working on something new and exciting. Stay tuned for the next innovation!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-20 bg-gray-50" data-testid="quotes-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-handwritten text-5xl font-bold mb-16" data-testid="quotes-title">Personal Mottos</h2>
          
          <div className="space-y-12">
            <div className="sketch-card p-8 transform -rotate-1" data-testid="quote-1">
              <blockquote className="font-sketch text-2xl md:text-3xl text-gray-700 italic">
                "Willing to do anything to become the best in AI programming."
              </blockquote>
              <div className="mt-4 flex justify-center">
                <svg width="100" height="20" viewBox="0 0 100 20">
                  <path d="M10,15 Q30,5 50,12 T90,10" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="3,3"/>
                </svg>
              </div>
            </div>
            
            <div className="sketch-card p-8 transform rotate-1" data-testid="quote-2">
              <blockquote className="font-sketch text-2xl md:text-3xl text-gray-700 italic">
                "Together and forever with my goals."
              </blockquote>
              <div className="mt-4 flex justify-center">
                <svg width="100" height="20" viewBox="0 0 100 20">
                  <path d="M10,10 Q30,18 50,8 T90,15" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="3,3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-handwritten text-5xl font-bold mb-4 relative inline-block" data-testid="contact-title">
            Let's Connect
            <div className="absolute -top-4 -right-12 text-3xl animate-float" data-testid="mail-icon">📮</div>
          </h2>
          <p className="font-clean text-lg text-gray-600 mb-12" data-testid="contact-description">
            Always excited to connect with fellow dreamers, builders, and achievers!
          </p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-8 mb-12" data-testid="social-links">
            <a href="#" className="social-icon" data-testid="link-instagram">
              <div className="sketch-border w-16 h-16 flex items-center justify-center">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
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
            <a href="#" className="social-icon" data-testid="link-notion">
              <div className="sketch-border w-16 h-16 flex items-center justify-center">
                <Book className="w-6 h-6" />
              </div>
            </a>
          </div>
          
          {/* Email */}
          <div className="sketch-card p-6 inline-block" data-testid="email-contact">
            <div className="flex items-center space-x-4">
              <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-60">
                <rect x="5" y="12" width="30" height="20" stroke="#333" strokeWidth="2" fill="none" rx="2"/>
                <path d="M8,15 Q20,25 32,15" stroke="#333" strokeWidth="2" fill="none"/>
              </svg>
              <span className="font-clean text-lg">satyajit@example.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-clean text-sm text-gray-600">
            © 2024 Satyajit Patil. Handcrafted with passion and a lot of sketches.
          </p>
          <div className="mt-4">
            <svg width="100" height="20" viewBox="0 0 100 20" className="mx-auto opacity-30">
              <path d="M10,10 Q25,5 40,12 T70,8 T90,15" stroke="#666" strokeWidth="2" fill="none" strokeDasharray="2,3"/>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}
