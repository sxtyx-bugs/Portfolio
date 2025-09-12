import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Linkedin, Book, Mail, Play, Pause, Send, Moon, Sun, Volume2, ArrowUp, Check } from "lucide-react";
import Guestbook from "@/components/Guestbook";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  const [currentHobby, setCurrentHobby] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [showLoading, setShowLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const [dynamicQuote, setDynamicQuote] = useState('');
  const [completedGoals, setCompletedGoals] = useState(new Set());

  const hobbies = [
    "Coding 💻",
    "OSINT Enthusiast 🕵️",
    "AI Explorer 🤖",
    "Music Lover 🎵",
    "Coffee Addict ☕",
    "Anime Watcher 🎌"
  ];

  const goals = [
    { id: 1, text: "Master AI and Machine Learning" },
    { id: 2, text: "Study in Japan" },
    { id: 3, text: "Build revolutionary AI tools" },
    { id: 4, text: "Contribute to open source" },
    { id: 5, text: "Travel the world" },
    { id: 6, text: "Master OSINT techniques" }
  ];

  const projects = [
    {
      title: "LensAI",
      description: "AI-powered image recognition and analysis platform",
      tech: "Python, TensorFlow, React",
      link: "#"
    },
    {
      title: "Inforvi",
      description: "Information visualization dashboard for data insights",
      tech: "D3.js, Node.js, MongoDB",
      link: "#"
    },
    {
      title: "ORLON.OG",
      description: "Creative portfolio and project showcase platform",
      tech: "Next.js, TypeScript, Tailwind",
      link: "#"
    }
  ];

  const achievements = [
    { icon: "🎓", title: "Computer Science Student", detail: "Pursuing my passion for technology" },
    { icon: "💻", title: "Full-Stack Developer", detail: "Building amazing web applications" },
    { icon: "🤖", title: "AI Enthusiast", detail: "Exploring the future of artificial intelligence" },
    { icon: "🔍", title: "OSINT Researcher", detail: "Digital investigation and analysis" },
    { icon: "🌐", title: "Open Source Contributor", detail: "Giving back to the developer community" },
    { icon: "🎯", title: "Problem Solver", detail: "Turning complex challenges into solutions" }
  ];

  const quotes = [
    "The best way to predict the future is to create it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "The only way to do great work is to love what you do."
  ];

  // Hobby cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHobby((prev) => (prev + 1) % hobbies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hobbies.length]);

  // Dynamic quotes
  useEffect(() => {
    setDynamicQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Scroll progress and section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 500);
      
      // Section detection
      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'achievements', element: document.getElementById('achievements') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'contact', element: document.getElementById('contact') }
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleGoal = (goalId: number) => {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    // Handle form submission here
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-gray-900 font-inter overflow-x-hidden transition-colors duration-300 relative">
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onFinish={() => setShowLoading(false)} />
      )}

      {/* Background Doodles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-5 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-20 right-10 text-xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-60 left-8 text-lg opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute top-80 right-5 text-xl opacity-20 animate-bounce" style={{ animationDelay: '3s' }}>🌟</div>
        <div className="absolute bottom-40 left-10 text-lg opacity-20 animate-bounce" style={{ animationDelay: '4s' }}>🎨</div>
        <div className="absolute bottom-20 right-8 text-xl opacity-20 animate-bounce" style={{ animationDelay: '5s' }}>🚀</div>
      </div>

      {/* Sketchy Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-[#fdfdfd]/95 backdrop-blur-sm border-b-2 border-black"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 border-2 border-black bg-[#FFD600] flex items-center justify-center transform rotate-3">
                <span className="text-black font-bold text-lg font-patrick">SP</span>
              </div>
              <span className="font-patrick text-xl">satyajit</span>
            </motion.div>
          
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { href: '#home', label: 'home', id: 'home' },
                { href: '#about', label: 'about', id: 'about' },
                { href: '#achievements', label: 'journey', id: 'achievements' },
                { href: '#projects', label: 'projects', id: 'projects' },
                { href: '#contact', label: 'contact', id: 'contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href} 
                  className={`px-4 py-2 border-2 border-black font-patrick text-sm transition-all duration-300 ${
                    currentSection === link.id 
                      ? 'bg-[#70D6FF] text-black' 
                      : 'bg-transparent hover:bg-[#FFD600]'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 border-2 border-black bg-transparent hover:bg-[#FF4900] transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#70D6FF] via-[#FFD600] to-[#FF4900] z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 border-2 border-black bg-[#00D6A3] text-black rounded-full shadow-lg hover:bg-[#FFD600] transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="font-shadows text-6xl md:text-8xl mb-6 text-black"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              hey, i'm satyajit 👋
            </motion.h1>
            
            <motion.p 
              className="font-inter text-xl md:text-2xl mb-8 text-gray-700"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              let's vibe through my{' '}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.1 }}
              >
                projects
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 100 20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <path
                    d="M5,15 Q25,5 45,12 T85,8 T100,10"
                    stroke="#FF4900"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.span>
            </motion.p>

            <motion.div
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <span className="inline-block">
                currently: <span className="font-patrick font-semibold text-[#2D00FF]">{hobbies[currentHobby]}</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-[#fdfdfd]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="sketchy-card p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-shadows text-3xl mb-6 text-center">my goals ✨</h2>
            <div className="space-y-4">
              {goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  className="flex items-center space-x-4 p-3 hover:bg-[#70D6FF]/20 transition-all duration-300 cursor-pointer"
                  onClick={() => toggleGoal(goal.id)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-6 h-6 border-2 border-black flex items-center justify-center ${
                      completedGoals.has(goal.id) ? 'bg-[#00D6A3]' : 'bg-transparent'
                    }`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {completedGoals.has(goal.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Check className="w-4 h-4 text-black" />
                      </motion.div>
                    )}
                  </motion.div>
                  <span className={`font-inter text-lg transition-all duration-300 ${
                    completedGoals.has(goal.id) ? 'line-through text-gray-500' : 'text-black'
                  }`}>
                    {goal.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-shadows text-4xl md:text-5xl mb-4">about me</h2>
            <p className="font-inter text-lg text-gray-600">
              passionate about AI, OSINT, and building the future
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-patrick text-2xl mb-4">my story</h3>
                <p className="font-inter leading-relaxed text-gray-700">
                  I'm a passionate dreamer and builder who thrives on creating innovative solutions at the intersection of AI and technology. My journey spans across multiple domains - from developing AI-powered applications to exploring the fascinating world of OSINT and geolocation technologies.
                </p>
              </div>
              
              <div>
                <h3 className="font-patrick text-2xl mb-4">my interests</h3>
                <p className="font-inter leading-relaxed text-gray-700">
                  When I'm not coding, you'll find me exploring the depths of OSINT research, learning about geolocation techniques, or diving into the latest AI papers. I believe that the future belongs to those who can bridge the gap between human creativity and machine intelligence.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="sketchy-card p-8 text-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-32 h-32 border-4 border-black bg-[#FFD600] rounded-full mx-auto mb-6 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-4xl">👨‍💻</span>
              </motion.div>
              <h3 className="font-patrick text-xl mb-4">skills & technologies</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="sketchy-tag">AI & ML</div>
                <div className="sketchy-tag">Web Dev</div>
                <div className="sketchy-tag">OSINT</div>
                <div className="sketchy-tag">Python</div>
                <div className="sketchy-tag">React</div>
                <div className="sketchy-tag">Node.js</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-shadows text-4xl md:text-5xl mb-4">my journey</h2>
            <p className="font-inter text-lg text-gray-600">
              key milestones and achievements in my development journey
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="sketchy-card p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {achievement.icon}
                </motion.div>
                <h3 className="font-patrick text-xl mb-3">{achievement.title}</h3>
                <p className="font-inter text-sm text-gray-600">{achievement.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-shadows text-4xl md:text-5xl mb-4">my projects</h2>
            <p className="font-inter text-lg text-gray-600">
              a collection of my work and creative projects
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="sketchy-card p-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <h3 className="font-patrick text-2xl mb-3 group-hover:text-[#70D6FF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-inter leading-relaxed text-gray-700 mb-4">
                  {project.description}
                </p>
                <div className="sketchy-tag mb-4">{project.tech}</div>
                <motion.button
                  className="w-full py-2 border-2 border-black bg-transparent hover:bg-[#FFD600] transition-all duration-300 font-patrick"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  view project
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-shadows text-4xl md:text-5xl mb-4">let's connect</h2>
            <p className="font-inter text-lg text-gray-600">
              ready to work together? let's make something amazing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-patrick text-2xl mb-4">get in touch</h3>
                <p className="font-inter leading-relaxed text-gray-700">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you want to discuss AI, OSINT, or just say hello, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:satyajit@example.com"
                  className="sketchy-card flex items-center space-x-4 p-4"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                >
                  <div className="w-12 h-12 bg-[#70D6FF] flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-patrick font-semibold">Email</div>
                    <div className="font-inter text-sm text-gray-600">satyajit@example.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/satyajit"
                  className="sketchy-card flex items-center space-x-4 p-4"
                  whileHover={{ scale: 1.02, rotate: -1 }}
                >
                  <div className="w-12 h-12 bg-[#FF00FF] flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-patrick font-semibold">LinkedIn</div>
                    <div className="font-inter text-sm text-gray-600">linkedin.com/in/satyajit</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/satyajit"
                  className="sketchy-card flex items-center space-x-4 p-4"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                >
                  <div className="w-12 h-12 bg-[#FFD600] flex items-center justify-center">
                    <Github className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="font-patrick font-semibold">GitHub</div>
                    <div className="font-inter text-sm text-gray-600">github.com/satyajit</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="sketchy-card p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-patrick text-xl mb-6">send a message</h3>
              
              <motion.form 
                onSubmit={handleFormSubmit} 
                className="space-y-6"
              >
                <div>
                  <input
                    type="text"
                    placeholder="your name"
                    className="w-full p-3 border-2 border-black bg-transparent font-inter placeholder-gray-500 focus:outline-none focus:bg-[#70D6FF]/20 transition-all duration-300"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="your email"
                    className="w-full p-3 border-2 border-black bg-transparent font-inter placeholder-gray-500 focus:outline-none focus:bg-[#FFD600]/20 transition-all duration-300"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="your message"
                    rows={4}
                    className="w-full p-3 border-2 border-black bg-transparent font-inter placeholder-gray-500 focus:outline-none focus:bg-[#FF4900]/20 transition-all duration-300 resize-none"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-3 border-2 border-black bg-transparent hover:bg-[#00D6A3] transition-all duration-300 font-patrick"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  send message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <div className="scroll-reveal transition-colors duration-300" id="guestbook">
        <Guestbook />
      </div>

      {/* Footer */}
      <footer className="py-8 border-t-2 border-black bg-[#fdfdfd]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-inter text-sm text-gray-600 mb-4">
            © 2024 Satyajit Patil. Handcrafted with passion and endless sketches.
          </p>
          
          {/* Dynamic Quote */}
          {dynamicQuote && (
            <motion.div 
              className="mt-6 p-4 sketchy-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="font-inter text-sm italic text-gray-700">
                "{dynamicQuote}"
              </p>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-6 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="font-patrick text-sm">built with</span>
            <motion.span 
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span className="font-patrick text-sm">+ late-night chai</span>
            <motion.span 
              className="text-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ☕
            </motion.span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}