"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hover" | "text" | "heading" | "card"
  >("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth responsive physics spring for cursor motion
  const springConfig = { damping: 28, stiffness: 420, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Interactive element with custom cursor text (cards, buttons, etc.)
      const cursorTarget = target.closest<HTMLElement>("[data-cursor-text]");
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor-text");
        if (text) {
          setCursorText(text);
          setCursorVariant("text");
          return;
        }
      }

      // 2. Only h1, h2, h3, h4 text gets circle hover effect
      const headingTarget = target.closest("h1, h2, h3, h4");
      if (headingTarget) {
        setCursorText("");
        setCursorVariant("heading");
        return;
      }

      // 3. Interactive clickable elements (buttons, links, inputs)
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea");
      if (isInteractive) {
        setCursorText("");
        setCursorVariant("hover");
        return;
      }

      // 4. Cards with data-cursor-card
      const isCard = target.closest("[data-cursor-card]");
      if (isCard) {
        setCursorText("");
        setCursorVariant("card");
        return;
      }

      // 5. Default state for regular text / background
      setCursorText("");
      setCursorVariant("default");
    };

    const handleMouseDown = () => {
      setCursorVariant((prev) => (prev === "text" ? "text" : "hover"));
    };

    const handleMouseUp = () => {
      setCursorVariant("default");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isExpanded =
    cursorVariant === "text" || cursorVariant === "heading" || cursorVariant === "hover";

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Circle with Center-Locked Dot:
          Because the dot is centered inside this flex parent, the dot and circle are permanently
          fixed together at the exact mathematical center of the circle at all times. */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorVariant === "text"
              ? 88
              : cursorVariant === "heading"
              ? 64
              : cursorVariant === "hover"
              ? 52
              : cursorVariant === "card"
              ? 44
              : 32,
          height:
            cursorVariant === "text"
              ? 88
              : cursorVariant === "heading"
              ? 64
              : cursorVariant === "hover"
              ? 52
              : cursorVariant === "card"
              ? 44
              : 32,
          // Cursor is solid black on hover
          backgroundColor: isExpanded
            ? "#000000"
            : cursorVariant === "card"
            ? "rgba(0, 0, 0, 0.45)"
            : "rgba(0, 0, 0, 0.15)",
          borderColor: isExpanded
            ? "rgba(255, 255, 255, 0.25)"
            : "rgba(56, 189, 248, 0.55)",
          boxShadow: isExpanded
            ? "0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 255, 255, 0.12)"
            : "0 0 10px rgba(56, 189, 248, 0.2)",
          scale: cursorVariant === "heading" ? 1.08 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 350, mass: 0.15 }}
        className="relative rounded-full border flex items-center justify-center backdrop-blur-[2px]"
      >
        {/* White Text on Hover when data-cursor-text is present */}
        {cursorVariant === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-bold text-white tracking-widest uppercase select-none font-sans"
          >
            {cursorText}
          </motion.span>
        )}

        {/* Center Dot: permanently fixed in the exact geometric center of the circle */}
        {cursorVariant !== "text" && (
          <motion.div
            animate={{
              width: isExpanded ? 6 : 5,
              height: isExpanded ? 6 : 5,
              backgroundColor: isExpanded ? "#ffffff" : "#38bdf8",
              boxShadow: isExpanded
                ? "0 0 8px rgba(255, 255, 255, 0.85)"
                : "0 0 8px rgba(56, 189, 248, 0.9)",
            }}
            transition={{ duration: 0.15 }}
            className="rounded-full pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  );
}
