import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const playHoverSound = () => {
    // Optional subtle click sound logic could go here
    // const audio = new Audio('/hover.mp3');
    // audio.volume = 0.1;
    // audio.play().catch(() => {}); 
  };

  const baseStyles = "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl border border-transparent",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent",
    outline: "bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-900",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.95, y: 0 }}
      onMouseEnter={playHoverSound}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;