'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Compass, Zap, HelpCircle, Eye, Globe, 
  Target, Award, Calendar, CheckCircle2 
} from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructionsModal({ isOpen, onClose }: InstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg max-h-[90vh] bg-[#161822] border border-stone-800 rounded-3xl p-6 shadow-2xl overflow-y-auto text-stone-200 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 text-stone-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Guidebook
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-100">How to Play</h2>
            <p className="text-stone-400 text-xs">
              Test your knowledge of Indian historical timelines in 5 daily milestones.
            </p>
          </div>

          {/* Section 1: Core Objective */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> 1. The Core Objective
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80 text-xs text-stone-300 space-y-2 leading-relaxed">
              <p>
                Each day presents <strong>5 historical Indian events</strong>. Read the event description and inscribe the year you believe it occurred.
              </p>
              <div className="flex gap-2 items-center text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Toggle <strong>BCE</strong> (Before Common Era) or <strong>CE</strong> (Common Era) next to your year input.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Dual-Wheel Time Horizon */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> 2. Dual-Wheel Reveal
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80 text-xs text-stone-300 space-y-2.5">
              <p>While you guess, the wheel stays neutral at the center so no era is leaked.</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1">☸️ Sun Wheel</span>
                  <p className="text-stone-400">Glides to the actual year the event occurred in history.</p>
                </div>
                <div className="p-2 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <span className="font-bold text-sky-400 flex items-center gap-1">🧭 Compass</span>
                  <p className="text-stone-400">Glides to your inscribed guess to show the exact historical distance.</p>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 italic">
                *Guessing the exact year fuses both wheels into a glowing Bullseye with celebratory fireworks!
              </p>
            </div>
          </div>

          {/* Section 3: Scoring & Speed Bonus */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 3. Scoring & Speed Multipliers
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80 text-xs text-stone-300 space-y-2.5">
              <p>Points scale based on proximity to the real year, with extra weight given to older eras:</p>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                <span className="text-amber-400 font-bold">🎯 Bullseye: ~95–100 pts</span>
                <span className="text-emerald-400 font-bold">🟢 Very Close: ~75–94 pts</span>
                <span className="text-sky-400 font-bold">🔵 Decent Guess: ~40–74 pts</span>
                <span className="text-stone-500 font-bold">⚪ Off the Mark: &lt;40 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Speed Multiplier (Up to 1.25x)
                </p>
                <p className="text-stone-300 leading-relaxed">
                  Submit quickly to earn up to <strong>+25% bonus points</strong> per question. High accuracy + lightning speed lets you score up to 125 points per event!
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Lifelines */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> 4. Tactical Lifelines (2 per Round)
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80 text-xs text-stone-300 space-y-2">
              <p>You have two strategic lifelines across the entire 5-question round. Use them wisely:</p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-start gap-2">
                  <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200">50-Year Window:</strong> Shrinks the timeline into a narrow 50-year range containing the exact date.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200">World Signal:</strong> Reveals what monumental event was unfolding simultaneously in Europe, the Americas, or Asia.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Daily Challenge & Streaks */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs space-y-1 text-stone-300">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Daily Midnight Reset
            </p>
            <p className="text-[11px] leading-relaxed">
              Everyone in India receives the same 5 questions each day. Come back daily to protect and advance your active streak!
            </p>
          </div>

          {/* Acknowledge Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 font-bold rounded-2xl transition shadow-lg shadow-amber-950/40 text-sm"
          >
            I'm Ready to Play
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}