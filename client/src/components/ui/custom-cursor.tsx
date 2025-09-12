import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  variant?: 'default' | 'glow' | 'sword' | 'joystick';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ variant = 'glow' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, input, textarea, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const cursorVariants = {
    default: {
      scale: isHovering ? 1.5 : 1,
      backgroundColor: isHovering ? '#ff6b6b' : '#4ecdc4',
      borderColor: isHovering ? '#ff6b6b' : '#4ecdc4',
    },
    glow: {
      scale: isHovering ? 1.8 : 1.2,
      backgroundColor: isHovering ? '#ff6b6b' : '#4ecdc4',
      boxShadow: isHovering 
        ? '0 0 20px #ff6b6b, 0 0 40px #ff6b6b, 0 0 60px #ff6b6b'
        : '0 0 10px #4ecdc4, 0 0 20px #4ecdc4',
    },
    sword: {
      scale: isHovering ? 1.3 : 1,
      backgroundColor: isHovering ? '#ff6b6b' : '#4ecdc4',
      transform: isHovering ? 'rotate(45deg)' : 'rotate(0deg)',
    },
    joystick: {
      scale: isHovering ? 1.4 : 1,
      backgroundColor: isHovering ? '#ff6b6b' : '#4ecdc4',
    }
  };

  const renderCursor = () => {
    switch (variant) {
      case 'glow':
        return (
          <motion.div
            className="custom-cursor-glow"
            animate={cursorVariants.glow}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        );
      case 'sword':
        return (
          <motion.div
            className="custom-cursor-sword"
            animate={cursorVariants.sword}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <div className="sword-blade" />
            <div className="sword-handle" />
          </motion.div>
        );
      case 'joystick':
        return (
          <motion.div
            className="custom-cursor-joystick"
            animate={cursorVariants.joystick}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <div className="joystick-base" />
            <div className="joystick-stick" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            className="custom-cursor-default"
            animate={cursorVariants.default}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        );
    }
  };

  return (
    <motion.div
      className="custom-cursor-container"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {renderCursor()}
    </motion.div>
  );
};
