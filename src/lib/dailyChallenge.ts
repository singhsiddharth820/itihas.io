import { INDIAN_EVENTS, IndianHistoryEvent } from '../data/indianHistoryEvents';

export interface UserStats {
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string | null;
  totalGames: number;
  totalScore: number;
}

const STATS_KEY = 'kalaciti_user_stats';
const DAILY_SAVE_KEY = 'kalaciti_today_result';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 32-bit Mulberry PRNG
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// String hash to 32-bit int
function hashDateString(str: string, salt: string): number {
  let hash = 0;
  const combined = str + salt;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Get deterministic 5 questions for today's date
export function getDailyEvents(dateStr: string, difficulty: 'easy' | 'hard', count = 5): IndianHistoryEvent[] {
  const pool = INDIAN_EVENTS.filter((e) => e.difficulty === difficulty);
  if (pool.length <= count) return pool;

  const seed = hashDateString(dateStr, difficulty);
  const random = mulberry32(seed);

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, maxStreak: 0, lastPlayedDate: null, totalGames: 0, totalScore: 0 };
  }
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { currentStreak: 0, maxStreak: 0, lastPlayedDate: null, totalGames: 0, totalScore: 0 };
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 0, maxStreak: 0, lastPlayedDate: null, totalGames: 0, totalScore: 0 };
  }
}

export function recordDailyCompletion(todayDateStr: string, sessionScore: number): UserStats {
  const stats = loadUserStats();

  if (stats.lastPlayedDate === todayDateStr) {
    return stats; // Already logged today
  }

  const prevDate = stats.lastPlayedDate ? new Date(stats.lastPlayedDate) : null;
  const today = new Date(todayDateStr);

  let newStreak = 1;
  if (prevDate) {
    const diffTime = today.getTime() - prevDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak = stats.currentStreak + 1;
    } else if (diffDays === 0) {
      newStreak = stats.currentStreak;
    }
  }

  const updated: UserStats = {
    currentStreak: newStreak,
    maxStreak: Math.max(stats.maxStreak, newStreak),
    lastPlayedDate: todayDateStr,
    totalGames: stats.totalGames + 1,
    totalScore: stats.totalScore + sessionScore,
  };

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save stats', e);
  }

  return updated;
}