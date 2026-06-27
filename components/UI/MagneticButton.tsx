"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  download,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // Magnetic pull dampening factor (0.25 draws it partially)
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonInner = (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.1 }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {href ? (
        <a 
          href={href} 
          download={download} 
          target={download ? undefined : "_blank"}
          rel={download ? undefined : "noopener noreferrer"}
          className="block w-full h-full select-none"
        >
          {buttonInner}
        </a>
      ) : (
        <button type="button" className="w-full h-full block focus:outline-none select-none">
          {buttonInner}
        </button>
      )}
    </div>
  );
}
