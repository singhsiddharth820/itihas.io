'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianHistoryEvent } from '../data/indianHistoryEvents';
import IndiaMap from '../components/IndiaMap';
import AmbientBackground from '../components/AmbientBackground';
import KalachakraTrack from '../components/KalachakraTrack';
import InstructionsModal from '../components/InstructionsModal';
import { 
  getTodayDateString, 
  getDailyEvents, 
  loadUserStats, 
  recordDailyCompletion, 
  getSavedDailyCompletion,
  UserStats,
  DailyHistoryRecord
} from '../lib/dailyChallenge';
import { 
  Timer, Compass, RotateCcw, ArrowRight, ArrowLeft, Trophy, MapPin, 
  Globe, Sparkles, Flame, BookOpen, Eye, HelpCircle, 
  Calendar, Zap, Clock, AlertCircle
} from 'lucide-react';

interface ScoreResult {
  score: number;
  baseScore: number;
  timeBonus: number;
  difference: number;
  title: string;
  color: string;
}

// Transparent 0 - 100 Scoring Model:
// Base Proximity: 0 - 80 pts | Speed Bonus: 0 - 20 pts | Total: Max 100 pts
function calculateIndianScore(
  guessedYear: number, 
  actualYear: number, 
  timeLeft: number, 
  totalTime = 25
): ScoreResult {
  const difference = Math.abs(guessedYear - actualYear);
  const currentYear = 2026;
  const yearsAgo = Math.max(1, currentYear - actualYear);
  const relativeDiff = difference / yearsAgo;

  // 1. Base Accuracy (Max 80 points)
  let baseScore = 0;
  if (difference === 0) {
    baseScore = 80;
  } else {
    baseScore = Math.max(0, Math.round(80 * Math.exp(-relativeDiff * 6.5)));
  }

  // 2. Speed Bonus (Max 20 points)
  // Only rewarded if the answer has reasonable accuracy (> 25 base points)
  const safeTimeLeft = Math.max(0, Math.min(totalTime, timeLeft));
  const timeBonus = baseScore > 25 ? Math.round((safeTimeLeft / totalTime) * 20) : 0;

  // Total score strictly capped between 0 and 100
  const totalScore = Math.min(100, baseScore + timeBonus);

  let title = 'Off the Mark';
  let color = 'text-stone-400';

  if (baseScore >= 75) {
    title = 'Bullseye!';
    color = 'text-amber-400';
  } else if (baseScore >= 55) {
    title = 'Very Close!';
    color = 'text-emerald-400';
  } else if (baseScore >= 25) {
    title = 'Decent Guess';
    color = 'text-sky-400';
  }

  return { 
    score: totalScore, 
    baseScore, 
    timeBonus, 
    difference, 
    title, 
    color 
  };
}

function getTimelinePercentage(year: number): number {
  const minYear = -1500;
  const maxYear = 2026;
  const clamped = Math.max(minYear, Math.min(maxYear, year));
  return ((clamped - minYear) / (maxYear - minYear)) * 100;
}

function formatYearLabel(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

function generate50YearWindow(actualYear: number): { startStr: string; endStr: string } {
  const offset = 15; 
  const start = actualYear - offset;
  const end = start + 50;
  return {
    startStr: formatYearLabel(start),
    endStr: formatYearLabel(end)
  };
}

export default function IndicGamePage() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [timeBonusNotice, setTimeBonusNotice] = useState(false);
  const [todayDateStr, setTodayDateStr] = useState('');
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [stats, setStats] = useState<UserStats>({ 
    currentStreak: 0, 
    maxStreak: 0, 
    lastPlayedDate: null, 
    totalGames: 0, 
    totalScore: 0 
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'hard' | null>(null);
  const [activeEvents, setActiveEvents] = useState<IndianHistoryEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yearInput, setYearInput] = useState('');
  const [eraType, setEraType] = useState<'CE' | 'BCE'>('CE');
  const [timeLeft, setTimeLeft] = useState(25);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState<DailyHistoryRecord[]>([]);

  const [used50YearLifeline, setUsed50YearLifeline] = useState(false);
  const [usedWorldClueLifeline, setUsedWorldClueLifeline] = useState(false);
  const [activeClues, setActiveClues] = useState<{
    window50Year: { startStr: string; endStr: string } | null;
    worldClue: string | null;
  }>({ window50Year: null, worldClue: null });

  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Native browser back button navigation handler
  useEffect(() => {
    const handlePopState = () => {
      if (selectedDifficulty !== null && !hasCompletedToday) {
        setSelectedDifficulty(null);
        setShowQuitConfirm(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedDifficulty, hasCompletedToday]);

  // Check today's completion on page load/refresh
  useEffect(() => {
    const today = getTodayDateString();
    setTodayDateStr(today);
    setStats(loadUserStats());

    const savedToday = getSavedDailyCompletion(today);
    if (savedToday) {
      setHasCompletedToday(true);
      setSelectedDifficulty(savedToday.difficulty);
      setTotalScore(savedToday.totalScore);
      setHistory(savedToday.history);
      setActiveEvents(savedToday.history.map(h => h.event));
      setCurrentIndex(savedToday.history.length); // triggers completion view
    }

    const updateMidnightTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ hours, minutes, seconds });
    };

    updateMidnightTimer();
    const timer = setInterval(updateMidnightTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartMode = (difficulty: 'easy' | 'hard') => {
    if (typeof window !== 'undefined') {
      window.history.pushState({ mode: difficulty }, '');
    }

    const dailyList = getDailyEvents(todayDateStr || getTodayDateString(), difficulty, 5);
    setActiveEvents(dailyList);
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0);
    setTimeLeft(25);
    setTotalScore(0);
    setHistory([]);
    setIsSubmitted(false);
    setUsed50YearLifeline(false);
    setUsedWorldClueLifeline(false);
    setActiveClues({ window50Year: null, worldClue: null });
  };

  const currentEvent = activeEvents[currentIndex];
  const isGameOver = selectedDifficulty !== null && currentIndex >= activeEvents.length;

  // Persist completion state upon finishing
  useEffect(() => {
    if (isGameOver && selectedDifficulty && !hasCompletedToday && history.length > 0) {
      const updated = recordDailyCompletion(todayDateStr, selectedDifficulty, totalScore, history);
      setStats(updated);
      setHasCompletedToday(true);
    }
  }, [isGameOver, selectedDifficulty, todayDateStr, totalScore, history, hasCompletedToday]);

  // Turn timer
  useEffect(() => {
    if (!selectedDifficulty || isSubmitted || isGameOver || showQuitConfirm) return;

    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isSubmitted, isGameOver, selectedDifficulty, showQuitConfirm]);

  const handleSubmit = (forcedTimeout: boolean = false) => {
    if (isSubmitted || !currentEvent) return;

    let computedGuess = 0;
    let displayStr = 'Timed Out';
    const submitTime = forcedTimeout ? 0 : timeLeft;

    if (!forcedTimeout && yearInput.trim() !== '') {
      const parsed = Math.abs(parseInt(yearInput, 10)) || 0;
      computedGuess = eraType === 'BCE' ? -parsed : parsed;
      displayStr = `${parsed} ${eraType}`;
    }

    const result = calculateIndianScore(computedGuess, currentEvent.year, submitTime, 25);
    setTotalScore((prev) => prev + result.score);
    setHistory((prev) => [
      ...prev, 
      { event: currentEvent, guessDisplay: displayStr, result }
    ]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setYearInput('');
    setEraType('CE');
    setTimeLeft(25);
    setActiveClues({ window50Year: null, worldClue: null });
    setCurrentIndex((prev) => prev + 1);
  };

  const handleQuitRound = () => {
    setShowQuitConfirm(false);
    setSelectedDifficulty(null);
  };

  // Lifelines: add +10s on activation
  const trigger50YearLifeline = () => {
    if (used50YearLifeline || isSubmitted || !currentEvent) return;
    const window = generate50YearWindow(currentEvent.year);
    setActiveClues((prev) => ({ ...prev, window50Year: window }));
    setUsed50YearLifeline(true);
    
    // Add extra 10 seconds
    setTimeLeft((prev) => Math.min(35, prev + 10));
    setTimeBonusNotice(true);
    setTimeout(() => setTimeBonusNotice(false), 2000);
  };

  const triggerWorldClueLifeline = () => {
    if (usedWorldClueLifeline || isSubmitted || !currentEvent) return;
    setActiveClues((prev) => ({ ...prev, worldClue: currentEvent.worldContemporary.description }));
    setUsedWorldClueLifeline(true);
    
    // Add extra 10 seconds
    setTimeLeft((prev) => Math.min(35, prev + 10));
    setTimeBonusNotice(true);
    setTimeout(() => setTimeBonusNotice(false), 2000);
  };

  const lastHistoryItem = history[history.length - 1];
  const actualPercent = currentEvent ? getTimelinePercentage(currentEvent.year) : 50;
  
  let guessedPercent = 50;
  let isExactMatch = false;
  if (isSubmitted && lastHistoryItem) {
    isExactMatch = lastHistoryItem.result.difference === 0;
    const guessedNumeric = currentEvent.year + (
      lastHistoryItem.guessDisplay.includes('BCE')
        ? -lastHistoryItem.result.difference
        : lastHistoryItem.result.difference
    );
    guessedPercent = getTimelinePercentage(guessedNumeric);
  }

  return (
    <main className="relative min-h-screen text-stone-100 flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden selection:bg-amber-900 selection:text-amber-100">
      <AmbientBackground />

      <div className="relative z-10 max-w-md w-full space-y-3 sm:space-y-4">

        {/* Screen 1: Mode Selection & Daily Streaks */}
        {!selectedDifficulty && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#181a24]/90 border border-stone-800/80 rounded-3xl p-6 sm:p-7 text-center space-y-6 shadow-2xl backdrop-blur-md"
          >
            <div className="flex justify-between items-center bg-[#0f1118]/80 px-3.5 py-2 rounded-2xl border border-stone-800/80">
              <span className="flex items-center gap-1.5 text-xs font-mono text-stone-300">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {todayDateStr || 'Today'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInstructions(true)}
                  className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition"
                  title="How to Play"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  {stats.currentStreak} Day Streak
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Daily Challenge</span>
              <h1 className="text-3xl font-serif font-bold text-stone-100">Today's Timeline</h1>
              <p className="text-stone-400 text-xs">5 shared historical milestones across India</p>
            </div>

            {hasCompletedToday ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
                <p className="text-sm font-bold text-amber-300">Today's Challenge Completed!</p>
                <p className="text-xs text-stone-400">You scored {totalScore}/500 today.</p>
                <button
                  onClick={() => setSelectedDifficulty(history[0]?.event.difficulty || 'easy')}
                  className="px-4 py-2 bg-amber-500 text-stone-950 rounded-xl text-xs font-bold"
                >
                  View Today's Summary
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5 pt-1">
                <button
                  onClick={() => handleStartMode('easy')}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/60 active:bg-amber-950/30 text-left transition space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Easy Mode
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
                      Daily 5
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Major revolutions, key battles, and epochal landmarks taught in school.
                  </p>
                </button>

                <button
                  onClick={() => handleStartMode('hard')}
                  className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-red-500/60 active:bg-red-950/30 text-left transition space-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-red-400 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-400" /> Hard Mode
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
                      Historian
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    BCE confrontations, regional naval battles, treaties, and temple groundbreakings.
                  </p>
                </button>
              </div>
            )}

            <button
              onClick={() => setShowInstructions(true)}
              className="text-xs text-stone-400 hover:text-amber-400 transition underline underline-offset-4 font-medium"
            >
              How are points calculated?
            </button>
          </motion.div>
        )}

        {/* Screen 2: Game Over / Stats Screen (Persistent on refresh) */}
        {selectedDifficulty && isGameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#181a24]/90 border border-stone-800/80 rounded-3xl p-6 text-center space-y-4 sm:space-y-5 shadow-2xl backdrop-blur-md"
          >
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Trophy className="w-9 h-9" />
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl font-serif font-bold text-amber-100">
                {hasCompletedToday ? "Today's Result" : "Daily Challenge Complete!"}
              </h1>
              <p className="text-stone-400 text-xs tracking-wider uppercase font-medium">
                Difficulty: <span className="text-amber-400 capitalize">{selectedDifficulty}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="py-2.5 px-3 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80">
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-0.5">Final Score</p>
                <p className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">
                  {totalScore} <span className="text-stone-600 text-xs font-normal">/ {activeEvents.length * 100}</span>
                </p>
              </div>

              <div className="py-2.5 px-3 rounded-2xl bg-[#0f1118]/80 border border-stone-800/80">
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-0.5">Active Streak</p>
                <p className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                  <Zap className="w-5 h-5 fill-emerald-400" />
                  {stats.currentStreak}
                </p>
              </div>
            </div>

            <div className="text-left space-y-2 max-h-52 overflow-y-auto pr-1">
              {history.map(({ event, guessDisplay, result }) => (
                <div key={event.id} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex justify-between items-center text-xs">
                  <div className="space-y-0.5 max-w-[200px]">
                    <p className="font-semibold text-stone-200 truncate">{event.title}</p>
                    <p className="text-stone-400 font-mono text-[10px]">
                      Actual: <span className="text-amber-300 font-medium">{event.displayYear}</span> | Guessed: {guessDisplay}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold block ${result.color}`}>+{result.score} pts</span>
                    <span className="text-[9px] text-stone-500 font-medium">
                      Base: {result.baseScore} | Speed: +{result.timeBonus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-2 px-3 bg-[#0f1118]/60 rounded-xl border border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Next Challenge in:
              </span>
              <span className="font-mono font-bold text-stone-200">
                {String(countdown.hours).padStart(2, '0')}:
                {String(countdown.minutes).padStart(2, '0')}:
                {String(countdown.seconds).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={handleQuitRound}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 active:from-amber-500 text-stone-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-950/40"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" /> Return to Menu
            </button>
          </motion.div>
        )}

        {/* Screen 3: Active Question Screen */}
        {selectedDifficulty && !isGameOver && currentEvent && (
          <div className="space-y-3 sm:space-y-4">
            
            {/* Header */}
            <header className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowQuitConfirm(true)}
                  className="p-1.5 rounded-xl bg-[#181a24]/90 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white active:scale-95 transition"
                  title="Quit to Menu"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Early
                  </span>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {currentIndex + 1} of {activeEvents.length} • <span className="capitalize text-amber-400/90">{selectedDifficulty}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInstructions(true)}
                  className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition"
                  title="Instructions"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                <div className="relative flex items-center gap-1.5 bg-[#181a24]/90 border border-stone-800 px-3 py-1 rounded-full shadow-inner">
                  <Timer className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
                  <span className={`font-mono text-xs font-semibold ${timeLeft <= 5 ? 'text-red-400' : 'text-stone-300'}`}>
                    {timeLeft}s
                  </span>

                  {timeBonusNotice && (
                    <motion.span 
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: -20 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40"
                    >
                      +10s
                    </motion.span>
                  )}
                </div>
              </div>
            </header>

            {/* Dual-Wheel Timeline Track */}
            <div className="bg-[#181a24]/75 p-3 rounded-2xl border border-stone-800/80 shadow-md pb-4">
              <KalachakraTrack 
                isSubmitted={isSubmitted}
                actualPercent={actualPercent}
                guessedPercent={guessedPercent}
                actualLabel={currentEvent.displayYear}
                guessedLabel={lastHistoryItem?.guessDisplay || ''}
                activeEraLabel={currentEvent.eraLabel}
                isExactMatch={isExactMatch}
              />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#181a24]/90 border border-stone-800/80 rounded-3xl p-5 sm:p-6 space-y-3.5 shadow-2xl relative"
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Compass className="w-3 h-3" /> {currentEvent.eraLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-900/80 text-stone-400 border border-stone-700/60">
                    <MapPin className="w-3 h-3" /> {currentEvent.region}
                  </span>
                </div>

                {/* Event Description */}
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 tracking-tight leading-snug">
                    {currentEvent.title}
                  </h2>
                  <p className="text-stone-300/90 text-xs sm:text-sm leading-relaxed">
                    {currentEvent.description}
                  </p>
                </div>

                {/* Lifelines Panel (+10s notice) */}
                {!isSubmitted && (
                  <div className="space-y-2 pt-1 border-t border-stone-800/60">
                    <div className="flex items-center justify-between text-[10px] font-medium text-stone-400 px-0.5">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Lifelines (+10s each):
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {(!used50YearLifeline ? 1 : 0) + (!usedWorldClueLifeline ? 1 : 0)}/2 remaining
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={trigger50YearLifeline}
                        disabled={used50YearLifeline}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                          used50YearLifeline
                            ? 'bg-stone-900/40 border-stone-800 text-stone-600 cursor-not-allowed'
                            : 'bg-amber-500/10 active:bg-amber-500/20 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>50-Yr Window</span>
                      </button>

                      <button
                        type="button"
                        onClick={triggerWorldClueLifeline}
                        disabled={usedWorldClueLifeline}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                          usedWorldClueLifeline
                            ? 'bg-stone-900/40 border-stone-800 text-stone-600 cursor-not-allowed'
                            : 'bg-amber-500/10 active:bg-amber-500/20 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>World Signal</span>
                      </button>
                    </div>

                    {activeClues.window50Year && (
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 text-center font-mono">
                        🎯 Between <strong className="text-white">{activeClues.window50Year.startStr}</strong> and <strong className="text-white">{activeClues.window50Year.endStr}</strong>
                      </div>
                    )}

                    {activeClues.worldClue && (
                      <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 text-left leading-relaxed">
                        <span className="font-semibold block text-[10px] uppercase tracking-wider text-sky-400 mb-0.5">Meanwhile across the world:</span>
                        {activeClues.worldClue}
                      </div>
                    )}
                  </div>
                )}

                {/* Form or Result View */}
                {!isSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }} className="space-y-3 pt-1">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Year (e.g. 1930)"
                        value={yearInput}
                        onChange={(e) => setYearInput(e.target.value)}
                        autoFocus
                        min="0"
                        className="flex-1 bg-[#0f1118]/90 border border-stone-800 focus:border-amber-500 text-center font-mono text-xl sm:text-2xl py-2.5 sm:py-3 rounded-2xl focus:outline-none text-stone-100 placeholder:text-stone-600 shadow-inner"
                      />

                      <div className="flex bg-[#0f1118]/90 p-1 rounded-2xl border border-stone-800">
                        <button
                          type="button"
                          onClick={() => setEraType('BCE')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                            eraType === 'BCE' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-500'
                          }`}
                        >
                          BCE
                        </button>
                        <button
                          type="button"
                          onClick={() => setEraType('CE')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                            eraType === 'CE' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-500'
                          }`}
                        >
                          CE
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!yearInput.trim()}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 active:from-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold rounded-2xl transition shadow-lg shadow-amber-950/40 text-sm"
                    >
                      Submit Guess
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3.5 pt-1">
                    <div className="bg-[#0f1118]/90 border border-stone-800/80 rounded-2xl p-3.5 text-center space-y-3 shadow-inner">
                      
                      {/* Comparison Row */}
                      <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5 gap-2">
                        <div className="flex-1 flex justify-around items-center">
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Actual Year</span>
                            <span className="font-mono text-base sm:text-lg font-bold text-amber-400">{currentEvent.displayYear}</span>
                          </div>
                          <div className="w-[1px] h-7 bg-stone-800" />
                          <div>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Your Guess</span>
                            <span className="font-mono text-base sm:text-lg font-medium text-stone-200">
                              {lastHistoryItem?.guessDisplay}
                            </span>
                          </div>
                        </div>

                        <div className="border-l border-stone-800/80 pl-3 flex items-center justify-center shrink-0">
                          <IndiaMap highlightRegion={currentEvent.region} className="w-20 h-24" />
                        </div>
                      </div>

                      {/* Transparent 0-100 Score Breakdown */}
                      {lastHistoryItem?.result && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-3xl font-mono font-extrabold ${lastHistoryItem.result.color}`}>
                              +{lastHistoryItem.result.score}
                            </span>
                            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-stone-400">
                              / 100 ({lastHistoryItem.result.title})
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-stone-400 bg-stone-900/60 py-1 px-3 rounded-lg border border-stone-800/80 w-fit mx-auto">
                            <span>Base: <strong className="text-stone-200">{lastHistoryItem.result.baseScore}</strong>/80</span>
                            <span className="text-stone-600">•</span>
                            <span className="text-emerald-400">Speed: +<strong>{lastHistoryItem.result.timeBonus}</strong>/20</span>
                          </div>
                        </div>
                      )}

                      {/* Fact */}
                      <div className="text-xs text-stone-300/90 leading-relaxed pt-2 border-t border-stone-800/60 flex items-start justify-center gap-2 text-left px-1">
                        <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{currentEvent.funFact}</span>
                      </div>

                      {/* World Event */}
                      <div className="p-2.5 rounded-xl bg-[#181a24]/80 border border-amber-900/30 text-left space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[10px] tracking-wide">
                          <Globe className="w-3.5 h-3.5" />
                          <span>Meanwhile across the world ({currentEvent.worldContemporary.displayYear}):</span>
                        </div>
                        <p className="text-stone-300 text-xs leading-relaxed">
                          {currentEvent.worldContemporary.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 bg-stone-100 active:bg-white text-stone-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-md text-sm"
                    >
                      Next Event <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Confirmation Modal to Quit */}
      <AnimatePresence>
        {showQuitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-[#161822] border border-stone-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-stone-100">Exit Current Challenge?</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Your current round's progress will be lost. You can restart the daily challenge whenever you're ready.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="py-2.5 rounded-xl bg-stone-800 text-stone-300 font-semibold text-xs hover:bg-stone-700 transition"
                >
                  Keep Playing
                </button>
                <button
                  onClick={handleQuitRound}
                  className="py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-500 transition"
                >
                  Quit to Menu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </main>
  );
}