import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  name: string;
  description: string;
  action: () => void;
}

export const RetroTerminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      name: 'help',
      description: 'Show available commands',
      action: () => {
        setOutput(prev => [...prev, 
          'Available commands:',
          '  help - Show this help message',
          '  about - Show about information',
          '  projects - List all projects',
          '  skills - Show coding skills',
          '  play zaalima - Play music',
          '  clear - Clear terminal',
          '  easter-egg - Find the secret!',
          '  exit - Close terminal'
        ]);
      }
    },
    {
      name: 'about',
      description: 'Show about information',
      action: () => {
        setOutput(prev => [...prev, 
          'Satyajit Patil - AI Innovator & Developer',
          'Passionate about AI, OSINT, and building the future.',
          'Currently pursuing dreams in Japan 🇯🇵',
          'Level: Expert | XP: 9999+ | Status: Building'
        ]);
      }
    },
    {
      name: 'projects',
      description: 'List all projects',
      action: () => {
        setOutput(prev => [...prev, 
          '🚀 PROJECTS:',
          '  • LensAI - AI-powered image analysis platform',
          '  • Inforvi - Information visualization tool',
          '  • ORLON.OG - Geolocation & OSINT platform',
          '  • Portfolio v2.0 - This gamified experience!'
        ]);
      }
    },
    {
      name: 'skills',
      description: 'Show coding skills',
      action: () => {
        setOutput(prev => [...prev, 
          '💻 SKILLS (RPG Style):',
          '  C++: ████████░░ Level 80',
          '  React: ██████░░░░ Level 60',
          '  AI/ML: ███████░░░ Level 70',
          '  Python: ████████░░ Level 80',
          '  JavaScript: ██████░░░░ Level 60',
          '  OSINT: ████████░░ Level 80'
        ]);
      }
    },
    {
      name: 'play zaalima',
      description: 'Play music',
      action: () => {
        setOutput(prev => [...prev, 
          '🎵 Playing: Zaalima (sped up)',
          '♪ ♫ ♪ Music is now playing in the background ♪ ♫ ♪',
          'Type "stop music" to pause'
        ]);
        // Trigger music play
        const musicEvent = new CustomEvent('playMusic');
        window.dispatchEvent(musicEvent);
      }
    },
    {
      name: 'easter-egg',
      description: 'Find the secret!',
      action: () => {
        setOutput(prev => [...prev, 
          '🎉 EASTER EGG FOUND! 🎉',
          'You discovered the secret terminal!',
          'Congratulations, you are a true explorer!',
          'Unlocking special achievement...',
          '🏆 Terminal Master Achievement Unlocked!',
          'You have proven your worth as a developer!'
        ]);
        // Trigger confetti
        const confettiEvent = new CustomEvent('showConfetti');
        window.dispatchEvent(confettiEvent);
      }
    },
    {
      name: 'clear',
      description: 'Clear terminal',
      action: () => {
        setOutput([]);
      }
    },
    {
      name: 'exit',
      description: 'Close terminal',
      action: () => {
        onClose();
      }
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setHistory(prev => [...prev, `> ${input}`]);
    
    const command = commands.find(cmd => 
      cmd.name.toLowerCase() === input.toLowerCase().trim()
    );

    if (command) {
      command.action();
    } else {
      setOutput(prev => [...prev, `Command not found: ${input}`]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="terminal-container"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-title">
                <span className="terminal-icon">⚡</span>
                Retro Terminal v2.0
              </div>
              <div className="terminal-controls">
                <button className="terminal-btn minimize">−</button>
                <button className="terminal-btn maximize">□</button>
                <button className="terminal-btn close" onClick={onClose}>×</button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              <div className="terminal-welcome">
                <div className="terminal-ascii">
                  {`
  ██████╗ ███████╗████████╗██████╗ ██╗███╗   ██╗ █████╗ ██╗     
  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║████╗  ██║██╔══██╗██║     
  ██████╔╝█████╗     ██║   ██████╔╝██║██╔██╗ ██║███████║██║     
  ██╔══██╗██╔══╝     ██║   ██╔══██╗██║██║╚██╗██║██╔══██║██║     
  ██║  ██║███████╗   ██║   ██║  ██║██║██║ ╚████║██║  ██║███████╗
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                  `}
                </div>
                <p>Welcome to the Retro Terminal! Type 'help' to get started.</p>
              </div>

              {/* Output */}
              <div className="terminal-output">
                {history.map((line, index) => (
                  <div key={index} className="terminal-line">
                    <span className="terminal-prompt">user@portfolio:~$</span>
                    <span className="terminal-command">{line}</span>
                  </div>
                ))}
                {output.map((line, index) => (
                  <div key={index} className="terminal-line output">
                    {line}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="terminal-input-form">
                <span className="terminal-prompt">user@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder="Enter command..."
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
