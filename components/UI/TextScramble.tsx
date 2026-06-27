"use client";

import React, { useState, useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  fontClass?: string;
}

const GLYPHS = "XX/\\+=*?!@#$%^&0123456789_[]{}<>:;";

export function TextScramble({
  text,
  className = "",
  triggerOnHover = true,
  fontClass = "font-mono",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const trigger = () => {
    if (isRunningRef.current) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    isRunningRef.current = true;
    let count = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // If we've completed the cycle for this index, show original char
            if (index < count) return text[index];
            
            // Randomly select a glyph
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      if (count >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isRunningRef.current = false;
      }
      
      count += 1 / 3; // Speeds up or slows down reveal
    }, 25);
  };

  useEffect(() => {
    trigger();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? trigger : undefined}
      className={`inline-block ${fontClass} ${className}`}
    >
      {displayText}
    </span>
  );
}
