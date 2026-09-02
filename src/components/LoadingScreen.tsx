import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2700; // 2700ms

  useEffect(() => {
    let animationFrameId: number;

    const animateCounter = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing for count progression
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCounter);
      } else {
        setCount(100);
        const timeout = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timeout);
      }
    };

    animationFrameId = requestAnimationFrame(animateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, onComplete]);

  // Rotate words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-14 lg:p-16 select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full">
        <motion.span
          id="loading-portfolio-label"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Portfolio
        </motion.span>
        <span className="text-xs text-muted tracking-widest font-mono">
          2026 EDITION
        </span>
      </div>

      {/* Center: Rotating Words */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <div className="h-20 md:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={ROTATING_WORDS[wordIndex]}
              initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar & Counter */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#89AACC] animate-pulse" />
            <span className="text-xs text-muted uppercase tracking-wider font-mono">
              Loading Experience
            </span>
          </div>
          
          {/* Large Tabular Counter */}
          <div
            id="loading-counter"
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter leading-none"
          >
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden relative">
          <div
            className="h-full accent-gradient origin-left transition-transform duration-75 ease-out rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.45)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
