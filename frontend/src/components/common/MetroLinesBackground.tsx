'use client';

import { motion } from 'framer-motion';

/**
 * Composant d'arrière-plan avec des lignes de métro abstraites stylisées
 * Représente les lignes de métro parisiennes avec des courbes colorées
 */
export function MetroLinesBackground() {
  // Couleurs officielles des lignes de métro parisiennes
  const metroLines = [
    { color: '#FFCD00', path: 'M0,200 Q200,100 400,150 T800,120 T1200,140 L1440,130', delay: 0 },
    { color: '#003CA6', path: 'M0,300 Q300,200 600,250 T1200,220 L1440,210', delay: 0.2 },
    { color: '#CF009E', path: 'M0,400 Q150,350 350,380 T700,360 T1050,370 L1440,350', delay: 0.4 },
    { color: '#6ECA97', path: 'M0,500 Q250,450 500,480 T1000,460 L1440,450', delay: 0.1 },
    { color: '#B6BD00', path: 'M0,250 Q180,180 360,210 T720,190 T1080,200 L1440,190', delay: 0.3 },
    { color: '#007852', path: 'M0,450 Q220,400 440,430 T880,410 T1320,420 L1440,415', delay: 0.5 },
    { color: '#6EC4E8', path: 'M0,350 Q280,300 560,330 T1120,310 L1440,300', delay: 0.15 },
    { color: '#62259D', path: 'M0,550 Q200,500 400,530 T800,510 T1200,520 L1440,515', delay: 0.35 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Filtre de blur pour l'effet de profondeur */}
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>
        
        {metroLines.map((line, index) => (
          <motion.path
            key={index}
            d={line.path}
            stroke={line.color}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#blur)"
            opacity={0.6}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.6,
            }}
            transition={{
              pathLength: { duration: 2, delay: line.delay, ease: 'easeInOut' },
              opacity: { duration: 1.5, delay: line.delay },
            }}
            style={{
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </svg>
      
      {/* Overlay pour réduire l'intensité et créer de la profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
    </div>
  );
}
