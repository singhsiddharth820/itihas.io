'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Compass, Sparkles } from 'lucide-react';

interface KalachakraTrackProps {
  isSubmitted: boolean;
  actualPercent: number;    // 0 to 100
  guessedPercent: number;   // 0 to 100
  actualLabel: string;      // e.g. "1674 CE"
  guessedLabel: string;     // e.g. "1670 CE"
  activeEraLabel: string;
  isExactMatch: boolean;
}

export default function KalachakraTrack({
  isSubmitted,
  actualPercent,
  guessedPercent,
  actualLabel,
  guessedLabel,
  activeEraLabel,
  isExactMatch,
}: KalachakraTrackProps) {
  // Fire confetti burst on exact hit
  useEffect(() => {
    if (isSubmitted && isExactMatch) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.25 },
        colors: ['#f59e0b', '#10b981', '#fbbf24', '#ffffff'],
      });
    }
  }, [isSubmitted, isExactMatch]);

  // Constrain bounds to prevent edge clipping (3% - 94%)
  const clampPos = (val: number) => Math.min(94, Math.max(3, val));

  const actualPos = clampPos(actualPercent);
  const guessPos = clampPos(guessedPercent);
  const minPos = Math.min(actualPos, guessPos);
  const maxPos = Math.max(actualPos, guessPos);

  return (
    <div className="w-full space-y-2 select-none">
      {/* Era Milestone Labels */}
      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-stone-400 px-1">
        <span>Ancient BCE</span>
        <span className="text-amber-400 font-serif italic text-xs">
          {isSubmitted ? activeEraLabel : 'Timeline Horizon'}
        </span>
        <span>Modern CE</span>
      </div>

      {/* The Timeline Track */}
      <div className="relative w-full h-3 bg-[#0c0d11] border border-stone-800 rounded-full overflow-visible p-[2px] shadow-inner my-5">
        
        {/* Pre-submit: Soft pulsing center line */}
        {!isSubmitted && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-amber-500/40" />
        )}

        {/* Post-submit: Distance bridge connecting Guess and Actual */}
        {isSubmitted && !isExactMatch && (
          <motion.div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-500/50 via-amber-500/50 to-amber-400/50 rounded-full"
            initial={{ left: '50%', width: '0%' }}
            animate={{
              left: `${minPos}%`,
              width: `${Math.max(1, maxPos - minPos)}%`,
            }}
            transition={{ type: 'spring', stiffness: 55, damping: 15 }}
          />
        )}

        {/* Exact Match: Glowing radiant bar */}
        {isSubmitted && isExactMatch && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 rounded-full shadow-[0_0_14px_rgba(16,185,129,0.8)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* ========================================================= */}
        {/* STATE A: Pre-Submit (Single Neutral Wheel Sitting at 50%) */}
        {/* ========================================================= */}
        {!isSubmitted && (
          <motion.div
            className="absolute -top-2.5"
            initial={{ left: '50%' }}
            animate={{ left: '50%' }}
          >
            <div className="relative -translate-x-1/2 flex flex-col items-center group">
              <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-ping" />
              <div className="relative w-7 h-7 rounded-full bg-[#181a24] border-2 border-amber-400 flex items-center justify-center shadow-lg text-xs">
                ☸️
              </div>
              <span className="text-[9px] font-mono text-stone-400 mt-1 uppercase tracking-wider">
                Awaiting Guess
              </span>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STATE B: Post-Submit - EXACT MATCH (Merged Super Wheel)   */}
        {/* ========================================================= */}
        {isSubmitted && isExactMatch && (
          <motion.div
            className="absolute -top-3.5 z-30"
            initial={{ left: '50%' }}
            animate={{ left: `${actualPos}%` }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          >
            <div className="relative -translate-x-1/2 flex flex-col items-center">
              {/* Golden/Emerald Radiant Pulse */}
              <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
              
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 border-2 border-white flex items-center justify-center shadow-[0_0_16px_rgba(52,211,153,0.9)] text-sm">
                🎯
              </div>

              <div className="flex items-center gap-1 mt-1 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-widest whitespace-nowrap">
                  Exact Hit! ({actualLabel})
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STATE C: Post-Submit - TWO WHEELS (Actual vs Guessed)     */}
        {/* ========================================================= */}
        {isSubmitted && !isExactMatch && (
          <>
            {/* Wheel 1: The Actual Historic Year (Golden Sun Wheel) */}
            <motion.div
              className="absolute -top-3 z-20"
              initial={{ left: '50%' }}
              animate={{ left: `${actualPos}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 14, delay: 0.05 }}
            >
              <div className="relative -translate-x-1/2 flex flex-col items-center">
                <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-pulse" />
                <div className="relative w-8 h-8 rounded-full bg-[#181a24] border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-950/60 text-xs">
                  ☸️
                </div>
                <span className="text-[9px] font-mono font-bold text-amber-300 mt-1 bg-[#0f1118] px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
                  Actual ({actualLabel})
                </span>
              </div>
            </motion.div>

            {/* Wheel 2: The Player's Guess (Cyan Compass Needle) */}
            <motion.div
              className="absolute -top-3 z-20"
              initial={{ left: '50%' }}
              animate={{ left: `${guessPos}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            >
              <div className="relative -translate-x-1/2 flex flex-col items-center">
                <span className="absolute -inset-1 rounded-full bg-sky-400/30 animate-pulse" />
                <div className="relative w-8 h-8 rounded-full bg-[#181a24] border-2 border-sky-400 flex items-center justify-center shadow-lg shadow-sky-950/60 text-xs text-sky-300">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono font-bold text-sky-300 mt-1 bg-[#0f1118] px-1.5 py-0.5 rounded border border-sky-500/30 whitespace-nowrap">
                  Guess ({guessedLabel})
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}