"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the lag ring follow effect
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 20 });

  useEffect(() => {
    // Detect touch device or mobile pointers to hide custom cursor
    const touchCheck = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchCheck.matches);

    if (touchCheck.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Monitor hover elements globally
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Hide on mobile or touchscreens
  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Outer Spring Ring Follower */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "var(--accent)" : "rgba(161, 161, 170, 0.4)",
          backgroundColor: isHovered ? "var(--accent-muted)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "tween", duration: 0.15 }}
        className="fixed top-0 left-0 size-7 border border-solid rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
      />

      {/* 2. Inner Precise Pointer Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 0.8 : 1,
        }}
        className="fixed top-0 left-0 size-1.5 bg-accent rounded-full pointer-events-none z-50 hidden md:block"
      />
    </>
  );
}
