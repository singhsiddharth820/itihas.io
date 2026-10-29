export interface HistoryEvent {
    id: string;
    title: string;
    description: string;
    year: number;
    era: 'ancient' | 'medieval' | 'renaissance' | 'industrial' | 'modern' | 'digital';
    funFact: string;
  }
  
  export const SAMPLE_EVENTS: HistoryEvent[] = [
    {
      id: '1',
      title: 'Fall of Constantinople',
      description: 'The capital of the Byzantine Empire falls to the Ottoman Army.',
      year: 1453,
      era: 'medieval',
      funFact: 'This marked the end of the Middle Ages and the Roman Empire.'
    },
    {
      id: '2',
      title: 'Moon Landing (Apollo 11)',
      description: 'Neil Armstrong and Buzz Aldrin become the first humans to land on the Moon.',
      year: 1969,
      era: 'modern',
      funFact: 'Around 650 million people watched the broadcast worldwide.'
    },
    {
      id: '3',
      title: 'Invention of the Printing Press',
      description: 'Johannes Gutenberg develops movable type printing in Europe.',
      year: 1440,
      era: 'medieval',
      funFact: 'The Gutenberg Bible revolutionized information sharing in the West.'
    },
    {
      id: '4',
      title: 'Launch of Wikipedia',
      description: 'Jimmy Wales and Larry Sanger launch the online collaborative encyclopedia.',
      year: 2001,
      era: 'digital',
      funFact: 'It began as a feeder project for Nupedia, an expert-written encyclopedia.'
    },
    {
      id: '5',
      title: 'Fall of the Berlin Wall',
      description: 'Crowds gather and dismantle the barrier separating East and West Berlin.',
      year: 1989,
      era: 'modern',
      funFact: 'An accidental remark at an East German press briefing triggered the sudden opening.'
    }
  ];
  