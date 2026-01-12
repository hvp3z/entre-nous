'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface SearchLoadingOverlayProps {
  isVisible: boolean;
}

// Geometric network structure - abstract metro map feel
const NETWORK_POINTS = [
  { id: 'n', x: 50, y: 15 },   // North
  { id: 'ne', x: 75, y: 25 },  // North-East
  { id: 'e', x: 85, y: 50 },   // East
  { id: 'se', x: 75, y: 75 },  // South-East
  { id: 's', x: 50, y: 85 },   // South
  { id: 'sw', x: 25, y: 75 },  // South-West
  { id: 'w', x: 15, y: 50 },   // West
  { id: 'nw', x: 25, y: 25 },  // North-West
  { id: 'c', x: 50, y: 50 },   // Center
];

// Lines connecting the network
const NETWORK_LINES = [
  // Outer ring
  { from: 'n', to: 'ne' },
  { from: 'ne', to: 'e' },
  { from: 'e', to: 'se' },
  { from: 'se', to: 's' },
  { from: 's', to: 'sw' },
  { from: 'sw', to: 'w' },
  { from: 'w', to: 'nw' },
  { from: 'nw', to: 'n' },
  // Spokes to center
  { from: 'n', to: 'c' },
  { from: 'ne', to: 'c' },
  { from: 'e', to: 'c' },
  { from: 'se', to: 'c' },
  { from: 's', to: 'c' },
  { from: 'sw', to: 'c' },
  { from: 'w', to: 'c' },
  { from: 'nw', to: 'c' },
  // Cross diagonals
  { from: 'n', to: 's' },
  { from: 'e', to: 'w' },
];

// Editorial palette - cream/terracotta tones
const PALETTE = {
  line: 'rgba(180, 140, 100, 0.4)',     // Warm brown
  lineHighlight: 'rgba(180, 140, 100, 0.8)',
  point: '#b87333',                      // Cognac
  pointGlow: 'rgba(184, 115, 51, 0.4)',
  center: '#fafafa',
  centerRing: 'rgba(184, 115, 51, 0.6)',
};

export function SearchLoadingOverlay({ isVisible }: SearchLoadingOverlayProps) {
  const t = useTranslations();

  const getPoint = (id: string) => NETWORK_POINTS.find(p => p.id === id)!;

  // Prevent body scroll when overlay is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label={t('search.searching')}
        >
          {/* Dark overlay with grain texture effect */}
          <div className="absolute inset-0 bg-[#1a1a1a]/92 backdrop-blur-sm" />
          
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(184, 115, 51, 0.15) 0%, transparent 60%)',
            }}
          />

          {/* Animation container */}
          <div className="relative w-full h-full max-w-lg max-h-lg mx-auto flex flex-col items-center justify-center">
            {/* SVG Animation */}
            <svg
              viewBox="0 0 100 100"
              className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              <defs>
                {/* Glow filter */}
                <filter id="cartGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Line gradient */}
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={PALETTE.point} stopOpacity="0.2" />
                  <stop offset="50%" stopColor={PALETTE.point} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={PALETTE.point} stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Phase 1: Network lines drawing in */}
              {NETWORK_LINES.map((line, i) => {
                const from = getPoint(line.from);
                const to = getPoint(line.to);
                const length = Math.sqrt(
                  Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
                );
                const isCenterLine = line.from === 'c' || line.to === 'c';
                
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isCenterLine ? PALETTE.lineHighlight : PALETTE.line}
                    strokeWidth={isCenterLine ? '1' : '0.6'}
                    strokeLinecap="round"
                    strokeDasharray={length}
                    initial={{ strokeDashoffset: length, opacity: 0 }}
                    animate={{ 
                      strokeDashoffset: [length, 0, 0, length],
                      opacity: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.08,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: 'easeInOut',
                      times: [0, 0.3, 0.7, 1],
                    }}
                  />
                );
              })}

              {/* Decorative diamond shapes at intersections */}
              {[
                { x: 50, y: 32.5 },  // N-C midpoint
                { x: 50, y: 67.5 },  // S-C midpoint
                { x: 32.5, y: 50 },  // W-C midpoint
                { x: 67.5, y: 50 },  // E-C midpoint
              ].map((diamond, i) => (
                <motion.polygon
                  key={`diamond-${i}`}
                  points={`${diamond.x},${diamond.y - 3} ${diamond.x + 3},${diamond.y} ${diamond.x},${diamond.y + 3} ${diamond.x - 3},${diamond.y}`}
                  fill="none"
                  stroke={PALETTE.point}
                  strokeWidth="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                    opacity: [0, 0.6, 0.6, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: 0.8 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    times: [0, 0.2, 0.8, 1],
                  }}
                  style={{ transformOrigin: `${diamond.x}px ${diamond.y}px` }}
                />
              ))}

              {/* Phase 2: Points lighting up */}
              {NETWORK_POINTS.map((point, i) => {
                const isCenter = point.id === 'c';
                return (
                  <g key={`point-${point.id}`}>
                    {/* Glow circle */}
                    {!isCenter && (
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={PALETTE.pointGlow}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 1.5, 0],
                          opacity: [0, 0.5, 0.5, 0],
                        }}
                        transition={{
                          duration: 4,
                          delay: 0.5 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          times: [0, 0.25, 0.75, 1],
                        }}
                      />
                    )}
                    
                    {/* Main point */}
                    {!isCenter && (
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill={PALETTE.point}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1, 0],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 4,
                          delay: 0.5 + i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          times: [0, 0.2, 0.8, 1],
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Central element - sophisticated multi-ring design */}
              <g>
                {/* Outer rotating ring */}
                <motion.circle
                  cx={50}
                  cy={50}
                  r="12"
                  fill="none"
                  stroke={PALETTE.centerRing}
                  strokeWidth="0.5"
                  strokeDasharray="3 6"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{ transformOrigin: '50px 50px' }}
                />

                {/* Middle pulsing ring */}
                <motion.circle
                  cx={50}
                  cy={50}
                  r="8"
                  fill="none"
                  stroke={PALETTE.point}
                  strokeWidth="0.8"
                  initial={{ scale: 0.8, opacity: 0.4 }}
                  animate={{ 
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Inner solid ring */}
                <motion.circle
                  cx={50}
                  cy={50}
                  r="5"
                  fill="none"
                  stroke={PALETTE.center}
                  strokeWidth="1"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Center point */}
                <motion.circle
                  cx={50}
                  cy={50}
                  r="3"
                  fill={PALETTE.center}
                  filter="url(#cartGlow)"
                  initial={{ scale: 0.9 }}
                  animate={{ 
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Inner detail */}
                <circle
                  cx={50}
                  cy={50}
                  r="1"
                  fill="#1a1a1a"
                />
              </g>

              {/* Subtle corner decorations */}
              {[
                { x: 10, y: 10, rotate: 0 },
                { x: 90, y: 10, rotate: 90 },
                { x: 90, y: 90, rotate: 180 },
                { x: 10, y: 90, rotate: 270 },
              ].map((corner, i) => (
                <motion.g
                  key={`corner-${i}`}
                  transform={`translate(${corner.x}, ${corner.y}) rotate(${corner.rotate})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0.3, 0] }}
                  transition={{
                    duration: 4,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    times: [0, 0.2, 0.8, 1],
                  }}
                >
                  <line x1="0" y1="0" x2="5" y2="0" stroke={PALETTE.line} strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="0" y2="5" stroke={PALETTE.line} strokeWidth="0.5" />
                </motion.g>
              ))}
            </svg>

            {/* Loading text with editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-lg sm:text-xl font-light tracking-wide text-white/85">
                {t('search.searching')}
              </p>
            </motion.div>

            {/* Minimal animated indicator */}
            <motion.div 
              className="mt-4 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full w-8 bg-white/60 rounded-full"
                animate={{ x: [-32, 64] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
