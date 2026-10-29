'use client';

import React from 'react';

export default function AmbientBackground() {
  const embers = [
    { id: 1, left: '8%', delay: '0s', duration: '12s' },
    { id: 2, left: '26%', delay: '3s', duration: '15s' },
    { id: 3, left: '50%', delay: '1s', duration: '11s' },
    { id: 4, left: '74%', delay: '4s', duration: '14s' },
    { id: 5, left: '90%', delay: '2s', duration: '13s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Deep Indic Twilight Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-[#101420] to-[#181116]" />

      {/* 2. Fast GPU Ambient Glows (Using pure radial gradients instead of heavy CSS blur filters) */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[360px] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 75%)',
        }}
      />
      <div 
        className="absolute bottom-16 -right-20 w-[350px] h-[350px] opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(217, 119, 6, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* 3. The Grand Kālachakra Astrolabe (Hardware-Accelerated CSS rotation) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] opacity-15 pointer-events-none will-change-transform">
        {/* Outer Ring */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-[spin_180s_linear_infinite]"
        >
          <circle cx="200" cy="200" r="190" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="200" cy="200" r="175" fill="none" stroke="#d97706" strokeWidth="1.2" opacity="0.6" />

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
        </svg>

        {/* Inner Counter-Rotating Spokes */}
        <svg
          viewBox="0 0 300 300"
          className="absolute inset-14 w-[calc(100%-7rem)] h-[calc(100%-7rem)] animate-[spin_120s_linear_infinite_reverse]"
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
        </svg>
      </div>

      {/* 4. Fort Skyline Silhouette */}
      <div className="absolute bottom-0 inset-x-0 h-36 opacity-25">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
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
        </svg>
      </div>

      {/* 5. Pure CSS Floating Embers (Zero CPU drain on mobile) */}
      {embers.map((p) => (
        <span
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-amber-400 opacity-70 animate-pulse pointer-events-none"
          style={{
            left: p.left,
            bottom: '-10px',
            animation: `floatUp ${p.duration} infinite linear ${p.delay}`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0px) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-105vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}