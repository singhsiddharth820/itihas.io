'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
  const embers = [
    { id: 1, x: '6%', size: 3, duration: 14, delay: 0 },
    { id: 2, x: '18%', size: 2, duration: 18, delay: 4 },
    { id: 3, x: '34%', size: 3.5, duration: 12, delay: 1 },
    { id: 4, x: '52%', size: 2.5, duration: 16, delay: 5 },
    { id: 5, x: '68%', size: 3, duration: 13, delay: 2 },
    { id: 6, x: '84%', size: 2, duration: 17, delay: 3 },
    { id: 7, x: '94%', size: 3.5, duration: 15, delay: 6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Indic Twilight Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-[#101420] to-[#181116]" />

      {/* 2. Soft Ambient Vignettes */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-gradient-to-b from-amber-500/18 via-orange-600/10 to-transparent rounded-full blur-[140px]" />
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] bg-indigo-500/12 rounded-full blur-[130px]" />
      <div className="absolute bottom-24 -right-20 w-[460px] h-[400px] bg-amber-600/12 rounded-full blur-[130px]" />

      {/* 3. The Grand Kālachakra / Astrolabe Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-20 pointer-events-none">
        {/* Outer Ring: Rotating Celestial Orbit */}
        <motion.svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="200" cy="200" r="190" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="175" fill="none" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />

          {/* 12 Astrolabe Cardinal Ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = Number((200 + 175 * Math.cos(angle)).toFixed(2));
            const y1 = Number((200 + 175 * Math.sin(angle)).toFixed(2));
            const x2 = Number((200 + 190 * Math.cos(angle)).toFixed(2));
            const y2 = Number((200 + 190 * Math.sin(angle)).toFixed(2));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f59e0b"
                strokeWidth={i % 3 === 0 ? '2' : '1'}
              />
            );
          })}
        </motion.svg>

        {/* Inner Counter-Rotating Yantra Wheel (24 Spokes of Ashoka Chakra) */}
        <motion.svg
          viewBox="0 0 300 300"
          className="absolute inset-12 w-[calc(100%-6rem)] h-[calc(100%-6rem)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="150" cy="150" r="120" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="150" cy="150" r="85" fill="none" stroke="#b45309" strokeWidth="1" opacity="0.8" />

          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x = Number((150 + 120 * Math.cos(angle)).toFixed(2));
            const y = Number((150 + 120 * Math.sin(angle)).toFixed(2));
            return (
              <line
                key={i}
                x1={150}
                y1={150}
                x2={x}
                y2={y}
                stroke="#f59e0b"
                strokeWidth="0.8"
                opacity="0.7"
              />
            );
          })}
        </motion.svg>
      </div>

      {/* 4. Architectural Indic Skyline */}
      <div className="absolute bottom-0 inset-x-0 h-44 opacity-30">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,110 Q 180,80 380,105 T 780,95 T 1200,105 L 1200,200 L 0,200 Z"
            fill="#1e1824"
            opacity="0.7"
          />
          <path
            d={`
              M 0,150 
              L 60,150 L 60,120 L 75,105 L 90,120 L 90,150 
              L 160,150 L 160,135 L 175,135 L 175,150 
              L 230,150 L 250,90 L 260,70 L 270,90 L 290,150 
              L 370,150 L 370,130 L 390,130 L 390,150 
              L 470,150 L 485,115 L 500,95 L 515,115 L 530,150 
              L 610,150 L 630,110 L 650,150 
              L 720,150 L 720,120 L 735,100 L 750,120 L 750,150 
              L 830,150 L 850,75 L 860,60 L 870,75 L 890,150 
              L 970,150 L 980,130 L 1000,130 L 1010,150 
              L 1090,150 L 1105,110 L 1120,90 L 1135,110 L 1150,150 
              L 1200,150 L 1200,200 L 0,200 Z
            `}
            fill="#121017"
          />
          <circle cx="260" cy="70" r="2" fill="#fbbf24" className="animate-pulse" />
          <circle cx="500" cy="95" r="2" fill="#f59e0b" className="animate-pulse" />
          <circle cx="860" cy="60" r="2.5" fill="#f59e0b" className="animate-pulse" />
          <circle cx="1120" cy="90" r="2" fill="#fbbf24" className="animate-pulse" />
        </svg>
      </div>

      {/* 5. Floating Amber Embers */}
      {embers.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
          style={{
            left: p.x,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            opacity: [0, 0.8, 0.45, 0],
            x: ['0px', '28px', '-22px', '14px'],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 6. Subtle Jali Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}