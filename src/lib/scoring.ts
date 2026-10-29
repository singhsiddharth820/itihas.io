export interface ScoreResult {
    score: number;
    difference: number;
    title: 'Sarvajna' | 'Itihāskar' | 'Yatri' | 'Vismrit';
  }
  
  export function calculateIndianScore(guessedYear: number, actualYear: number): ScoreResult {
    const difference = Math.abs(guessedYear - actualYear);
    
    if (difference === 0) {
      return { score: 100, difference: 0, title: 'Sarvajna' };
    }
  
    // Current anchor point (2026)
    const currentYear = 2026;
    const yearsAgo = Math.max(1, currentYear - actualYear);
    
    // Proportional decay
    const relativeDiff = difference / yearsAgo;
    const score = Math.max(0, Math.round(100 * Math.exp(-relativeDiff * 6.5)));
  
    let title: ScoreResult['title'] = 'Vismrit';
    if (score >= 95) title = 'Sarvajna';
    else if (score >= 75) title = 'Itihāskar';
    else if (score >= 40) title = 'Yatri';
  
    return { score, difference, title };
  }
  