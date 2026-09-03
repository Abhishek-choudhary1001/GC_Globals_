'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 500, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, textarea, select')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const handleLeave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: hidden ? 0 : 1,
      }}
      animate={{
        width: hovering ? 44 : 28,
        height: hovering ? 44 : 28,
        backgroundColor: hovering ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.08)',
        borderColor: hovering ? 'rgba(56, 189, 248, 0.9)' : 'rgba(56, 189, 248, 0.5)',
        borderWidth: hovering ? 2 : 1.5,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 350 }}
    >
      <motion.div
        className="rounded-full bg-sky-400"
        animate={{
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      />
    </motion.div>
  );
}
