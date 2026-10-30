import { DailyHistoryRecord } from './dailyChallenge';

// Map score accuracy to intuitive Wordle-style colored square emojis
function getScoreEmoji(score: number): string {
  if (score >= 90) return '🟩'; // Bullseye / Near perfect
  if (score >= 70) return '🟨'; // Very close
  if (score >= 40) return '🟧'; // Decent estimate
  return '⬛';                  // Way off
}

// Map categories to visual icon badges
function getCategoryIcon(category?: string): string {
  switch (category) {
    case 'cinema':
      return '🎬';
    case 'sports':
      return '🏆';
    case 'literature':
      return '📖';
    case 'science':
      return '🚀';
    case 'pop-culture':
      return '📻';
    default:
      return '🏛️';
  }
}

export function formatShareText(
  dateStr: string,
  totalScore: number,
  maxScore: number,
  streak: number,
  difficulty: 'easy' | 'hard',
  history: DailyHistoryRecord[]
): string {
  const diffLabel = difficulty === 'hard' ? 'Historian' : 'Daily';
  
  // Format each question into a compact row: Q1 🎬 🟩 96 pts
  const grid = history
    .map((h, i) => {
      const icon = getCategoryIcon(h.event.category);
      const emoji = getScoreEmoji(h.result.score);
      return `Q${i + 1} ${icon} ${emoji} ${h.result.score} pts`;
    })
    .join('\n');

  return (
`Itihas.io • ${diffLabel} Challenge 🧭
${dateStr}
Score: ${totalScore}/${maxScore} pts
Streak: ${streak} day${streak === 1 ? '' : 's'} 🔥

${grid}

Can you place Indian history on the timeline?
https://itihas-io.vercel.app`
  );
}

export async function shareResultsToWhatsApp(
  dateStr: string,
  totalScore: number,
  maxScore: number,
  streak: number,
  difficulty: 'easy' | 'hard',
  history: DailyHistoryRecord[]
): Promise<'native' | 'clipboard' | 'whatsapp'> {
  const text = formatShareText(dateStr, totalScore, maxScore, streak, difficulty, history);

  // 1. If mobile native navigator.share is available, use it
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: 'Itihas.io Daily Challenge Result',
        text: text,
      });
      return 'native';
    } catch {
      // User dismissed share sheet or denied permission, fall back
    }
  }

  // 2. Try copying directly to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return 'clipboard';
    }
  } catch {
    // Fall back to direct WhatsApp Web / App intent
  }

  // 3. Fallback: Launch WhatsApp directly via URL scheme
  const encoded = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  return 'whatsapp';
}