export type IndianEra =
  | 'sindhu_vedic'
  | 'mahajanapada_empire'
  | 'classical_medieval'
  | 'sultanate_regional'
  | 'mughal_maratha'
  | 'swatantrata_modern';

export type IndianRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Pan-India';

export interface WorldContemporaryEvent {
  year: number;
  displayYear: string;
  description: string;
}

export interface IndianHistoryEvent {
  id: string;
  title: string;
  description: string;
  year: number; // Negative for BCE, positive for CE
  displayYear: string;
  difficulty: 'easy' | 'hard';
  era: IndianEra;
  eraLabel: string;
  region: IndianRegion;
  rulerOrEntity?: string;
  funFact: string;
  worldContemporary: WorldContemporaryEvent;
}

export const INDIAN_EVENTS: IndianHistoryEvent[] = [
  // ==========================================
  // EASY MODE (Popular & Iconic Milestones)
  // ==========================================
  {
    id: 'easy_01',
    title: 'The Dandi Salt March',
    description: 'Mahatma Gandhi marches 240 miles to the coastal village of Dandi to produce salt in defiance of British monopoly laws.',
    year: 1930,
    displayYear: '1930 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'West',
    rulerOrEntity: 'Mahatma Gandhi',
    funFact: 'Over 60,000 Indians were imprisoned across the country within months following the march.',
    worldContemporary: {
      year: 1929,
      displayYear: '1929 CE (1 yr earlier)',
      description: 'The Wall Street stock market collapsed in New York, sparking the Great Depression worldwide.'
    }
  },
  {
    id: 'easy_02',
    title: 'Indian Independence & Partition',
    description: 'India achieves freedom from British colonial rule at midnight, marked by Jawaharlal Nehru\'s "Tryst with Destiny" address.',
    year: 1947,
    displayYear: '1947 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'Pan-India',
    rulerOrEntity: 'Jawaharlal Nehru & Sardar Patel',
    funFact: 'The official border demarcation known as the Radcliffe Line was published two days after Independence on August 17.',
    worldContemporary: {
      year: 1945,
      displayYear: '1945 CE (2 yrs earlier)',
      description: 'World War II concluded with the surrender of Axis powers and the founding of the United Nations.'
    }
  },
  {
    id: 'easy_03',
    title: 'First Battle of Panipat',
    description: 'Babur defeats the forces of Ibrahim Lodi using matchlocks, field artillery, and wagon barricades to found the Mughal Empire.',
    year: 1526,
    displayYear: '1526 CE',
    difficulty: 'easy',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'North',
    rulerOrEntity: 'Babur vs Ibrahim Lodi',
    funFact: 'Babur\'s army was outnumbered nearly four to one, but Ottoman-style tulughma tactics won the day.',
    worldContemporary: {
      year: 1522,
      displayYear: '1522 CE (4 yrs earlier)',
      description: 'The vessel Victoria completed Ferdinand Magellan\'s expedition, the first circumnavigation of the globe.'
    }
  },
  {
    id: 'easy_04',
    title: 'Coronation of Chhatrapati Shivaji Maharaj',
    description: 'Shivaji Maharaj is crowned Chhatrapati of the Maratha Empire at Raigad Fort, establishing Hindavi Swarajya.',
    year: 1674,
    displayYear: '1674 CE',
    difficulty: 'easy',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'West',
    rulerOrEntity: 'Chhatrapati Shivaji Maharaj',
    funFact: 'Gaga Bhatt, a renowned pandit from Varanasi, presided over the Vedic coronation rituals.',
    worldContemporary: {
      year: 1672,
      displayYear: '1672 CE (2 yrs earlier)',
      description: 'Isaac Newton published his groundbreaking experiments on light refraction and optics in England.'
    }
  },
  {
    id: 'easy_05',
    title: 'Adoption of the Indian Constitution',
    description: 'The Constitution of India comes into full legal effect, formally establishing India as a sovereign democratic republic.',
    year: 1950,
    displayYear: '1950 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'North',
    rulerOrEntity: 'Dr. B.R. Ambedkar & Constituent Assembly',
    funFact: 'The original Constitution was handwritten by calligrapher Prem Behari Narain Raizada in flowing italic style.',
    worldContemporary: {
      year: 1949,
      displayYear: '1949 CE (1 yr earlier)',
      description: 'Mao Zedong proclaimed the establishment of the People\'s Republic of China in Beijing.'
    }
  },
  {
    id: 'easy_06',
    title: 'The Great Revolt of 1857',
    description: 'Indian sepoys and regional rulers launch an armed uprising against British East India Company rule across northern and central India.',
    year: 1857,
    displayYear: '1857 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'North',
    rulerOrEntity: 'Mangal Pandey, Rani Lakshmibai, Bahadur Shah Zafar',
    funFact: 'The revolt led directly to the Government of India Act 1858, dissolving the East India Company and placing India under the British Crown.',
    worldContemporary: {
      year: 1859,
      displayYear: '1859 CE (2 yrs later)',
      description: 'Charles Darwin published "On the Origin of Species", introducing the theory of evolution by natural selection.'
    }
  },
  {
    id: 'easy_07',
    title: 'Battle of Plassey',
    description: 'Robert Clive defeats Nawab Siraj-ud-Daulah of Bengal through a secret pact with Mir Jafar, establishing British territorial hegemony.',
    year: 1757,
    displayYear: '1757 CE',
    difficulty: 'easy',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'East',
    rulerOrEntity: 'British East India Company vs Siraj-ud-Daulah',
    funFact: 'A sudden monsoon downpour drenched the Nawab\'s gunpowder, which Clive had kept covered under tarpaulins.',
    worldContemporary: {
      year: 1756,
      displayYear: '1756 CE (1 yr earlier)',
      description: 'The Seven Years\' War erupted across Europe between Great Britain and France.'
    }
  },
  {
    id: 'easy_08',
    title: 'Quit India Movement Launch',
    description: 'Mahatma Gandhi delivers his "Do or Die" speech at Gowalia Tank Maidan in Bombay, demanding immediate British withdrawal.',
    year: 1942,
    displayYear: '1942 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'West',
    rulerOrEntity: 'Mahatma Gandhi & Congress Working Committee',
    funFact: 'Aruna Asaf Ali famously hoisted the Indian National Congress tricolor at Gowalia Tank despite heavy police cordons.',
    worldContemporary: {
      year: 1942,
      displayYear: '1942 CE (same year)',
      description: 'The decisive Battle of Stalingrad began on the Eastern Front of World War II.'
    }
  },
  {
    id: 'easy_09',
    title: 'Consecration of the Brihadisvara Temple',
    description: 'Chola Emperor Rajaraja I completes the grand Brihadisvara Temple at Thanjavur, an architectural masterpiece of granite.',
    year: 1010,
    displayYear: '1010 CE',
    difficulty: 'easy',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'South',
    rulerOrEntity: 'Rajaraja Chola I',
    funFact: 'The apex dome (Kumbam) was carved from a single piece of granite weighing around 80 tonnes, rolled up a 6 km ramp.',
    worldContemporary: {
      year: 1014,
      displayYear: '1014 CE (4 yrs later)',
      description: 'Brian Boru, High King of Ireland, defeated Viking armies at the Battle of Clontarf.'
    }
  },
  {
    id: 'easy_10',
    title: 'Jallianwala Bagh Massacre',
    description: 'Acting Brigadier-General Reginald Dyer orders troops to fire on an unarmed peaceful gathering at Amritsar.',
    year: 1919,
    displayYear: '1919 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'North',
    rulerOrEntity: 'Colonel Reginald Dyer',
    funFact: 'In direct protest of the massacre, Rabindranath Tagore renounced his British Knighthood.',
    worldContemporary: {
      year: 1919,
      displayYear: '1919 CE (same year)',
      description: 'The Treaty of Versailles was signed in France, officially ending World War I.'
    }
  },
  {
    id: 'easy_11',
    title: 'Completion of the Taj Mahal',
    description: 'Mughal Emperor Shah Jahan completes the white marble mausoleum in Agra in memory of his favorite wife, Mumtaz Mahal.',
    year: 1648,
    displayYear: '1648 CE',
    difficulty: 'easy',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'North',
    rulerOrEntity: 'Shah Jahan',
    funFact: 'The marble was brought from Makrana in Rajasthan, transported by a fleet of over 1,000 elephants.',
    worldContemporary: {
      year: 1648,
      displayYear: '1648 CE (same year)',
      description: 'The Peace of Westphalia treaties were signed, ending the Thirty Years\' War in Central Europe.'
    }
  },
  {
    id: 'easy_12',
    title: 'Aryabhata Calculates Pi and Earth\'s Rotation',
    description: 'Astronomer Aryabhata completes his seminal treatise "Aryabhatiya" in Pataliputra, positing that the Earth rotates on its own axis.',
    year: 499,
    displayYear: '499 CE',
    difficulty: 'easy',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'East',
    rulerOrEntity: 'Aryabhata',
    funFact: 'Aryabhata calculated pi to 3.1416 and accurately approximated the solar year as 365.358 days.',
    worldContemporary: {
      year: 493,
      displayYear: '493 CE (6 yrs earlier)',
      description: 'Theodoric the Great established the Ostrogothic Kingdom across the Italian peninsula.'
    }
  },
  {
    id: 'easy_13',
    title: 'Foundation of the Indian National Congress',
    description: 'Seventy-two delegates meet at Gokuldas Tejpal Sanskrit College in Bombay to establish the Indian National Congress.',
    year: 1885,
    displayYear: '1885 CE',
    difficulty: 'easy',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'West',
    rulerOrEntity: 'Allan Octavian Hume & W.C. Bonnerjee',
    funFact: 'Womesh Chandra Bonnerjee of Calcutta served as the very first president of the session.',
    worldContemporary: {
      year: 1886,
      displayYear: '1886 CE (1 yr later)',
      description: 'The Statue of Liberty was officially dedicated in New York Harbor as a gift from France.'
    }
  },
  {
    id: 'easy_14',
    title: 'Third Battle of Panipat',
    description: 'Ahmad Shah Durrani of Afghanistan clashes with the Maratha Confederacy in one of the largest 18th-century land battles.',
    year: 1761,
    displayYear: '1761 CE',
    difficulty: 'easy',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'North',
    rulerOrEntity: 'Sadashivrao Bhau vs Ahmad Shah Abdali',
    funFact: 'Over 100,000 soldiers and camp followers perished in a single day, halting the northward Maratha expansion.',
    worldContemporary: {
      year: 1762,
      displayYear: '1762 CE (1 yr later)',
      description: 'Catherine the Great took power as Empress of Russia following a palace coup.'
    }
  },
  {
    id: 'easy_15',
    title: 'Ashoka Converts to Buddhism after Kalinga',
    description: 'Deeply remorseful over the bloodshed of the Kalinga conquest, Mauryan Emperor Ashoka embraces the teachings of Buddha.',
    year: -261,
    displayYear: '261 BCE',
    difficulty: 'easy',
    era: 'mahajanapada_empire',
    eraLabel: 'Mahajanapada & Empire (600 BCE – 300 CE)',
    region: 'East',
    rulerOrEntity: 'Ashoka Maurya',
    funFact: 'Ashoka recorded his grief in Major Rock Edict XIII, noting over 100,000 deaths and 150,000 displaced.',
    worldContemporary: {
      year: -264,
      displayYear: '264 BCE (3 yrs earlier)',
      description: 'The First Punic War broke out between Rome and Carthage over the island of Sicily.'
    }
  },

  // ==========================================
  // HARD MODE (Scholarly & Regional Milestones)
  // ==========================================
  {
    id: 'hard_01',
    title: 'The Battle of Saraighat',
    description: 'Ahom general Lachit Borphukan repels a massive Mughal naval invasion on the Brahmaputra River through tactical river ambush.',
    year: 1671,
    displayYear: '1671 CE',
    difficulty: 'hard',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'East',
    rulerOrEntity: 'Lachit Borphukan (Ahom Kingdom)',
    funFact: 'Lachit oversaw construction of earthen ramparts overnight and famously executed his uncle for failing to meet the work deadline.',
    worldContemporary: {
      year: 1666,
      displayYear: '1666 CE (5 yrs earlier)',
      description: 'The Great Fire of London ravaged through the City of London, destroying more than 13,000 homes.'
    }
  },
  {
    id: 'hard_02',
    title: 'The Battle of Talikota',
    description: 'A coalition of Deccan Sultanates crushes the army of the Vijayanagara Empire, leading to the sacking and abandonment of Hampi.',
    year: 1565,
    displayYear: '1565 CE',
    difficulty: 'hard',
    era: 'sultanate_regional',
    eraLabel: 'Sultanate & Regional Kingdoms (1200 CE – 1526 CE)',
    region: 'South',
    rulerOrEntity: 'Aliya Rama Raya vs Deccan Sultans',
    funFact: 'The victorious armies took six full months to plunder, smash, and burn the stone palaces and temples of Vijayanagara.',
    worldContemporary: {
      year: 1564,
      displayYear: '1564 CE (1 yr earlier)',
      description: 'William Shakespeare was born in Stratford-upon-Avon and sculptor Michelangelo died in Rome.'
    }
  },
  {
    id: 'hard_03',
    title: 'The Battle of Colachel',
    description: 'King Marthanda Varma of Travancore inflicts a crushing defeat on the Dutch East India Company navy, ending Dutch colonial ambitions in India.',
    year: 1741,
    displayYear: '1741 CE',
    difficulty: 'hard',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'South',
    rulerOrEntity: 'Anizham Thirunal Marthanda Varma',
    funFact: 'The captured Dutch commander Eustachius De Lannoy surrendered and was hired to train Travancore\'s royal army.',
    worldContemporary: {
      year: 1740,
      displayYear: '1740 CE (1 yr earlier)',
      description: 'Frederick the Great ascended the Prussian throne and invaded Silesia, sparking the War of the Austrian Succession.'
    }
  },
  {
    id: 'hard_04',
    title: 'The Poona Pact',
    description: 'Dr. B.R. Ambedkar and Mahatma Gandhi sign an agreement in Yerwada Central Jail guaranteeing reserved seats for Depressed Classes.',
    year: 1932,
    displayYear: '1932 CE',
    difficulty: 'hard',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'West',
    rulerOrEntity: 'Dr. B.R. Ambedkar & Mahatma Gandhi',
    funFact: 'Gandhi was on a fast unto death protesting British Prime Minister Ramsay MacDonald\'s Communal Award.',
    worldContemporary: {
      year: 1933,
      displayYear: '1933 CE (1 yr later)',
      description: 'Adolf Hitler was appointed Chancellor of Germany, leading to the collapse of the Weimar Republic.'
    }
  },
  {
    id: 'hard_05',
    title: 'Carving of the Kailasa Temple at Ellora',
    description: 'Rashtrakuta King Krishna I commissions the monolithic rock-cut Kailasa Temple (Cave 16) at Ellora, excavated top-down from living cliff rock.',
    year: 757,
    displayYear: '757 CE',
    difficulty: 'hard',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'West',
    rulerOrEntity: 'Krishna I (Rashtrakuta Dynasty)',
    funFact: 'Stone carvers excavated an estimated 200,000 tonnes of basalt rock starting from the peak down to the courtyard floor.',
    worldContemporary: {
      year: 751,
      displayYear: '751 CE (6 yrs earlier)',
      description: 'The Abbasid Caliphate and the Tang Empire clashed at the historic Battle of Talas in Central Asia.'
    }
  },
  {
    id: 'hard_06',
    title: 'Founding of the Vijayanagara Empire',
    description: 'Brothers Harihara I and Bukka Raya I establish the Vijayanagara Empire along the banks of the Tungabhadra River.',
    year: 1336,
    displayYear: '1336 CE',
    difficulty: 'hard',
    era: 'sultanate_regional',
    eraLabel: 'Sultanate & Regional Kingdoms (1200 CE – 1526 CE)',
    region: 'South',
    rulerOrEntity: 'Harihara I and Bukka Raya I',
    funFact: 'The brothers were inspired to establish the empire by the sage Vidyaranya of the Sringeri Sharada Peetham.',
    worldContemporary: {
      year: 1337,
      displayYear: '1337 CE (1 yr later)',
      description: 'The Hundred Years\' War commenced between the Kingdom of England and the Kingdom of France.'
    }
  },
  {
    id: 'hard_07',
    title: 'Treaty of Amritsar (Kashmir Sale)',
    description: 'The British East India Company sells the Kashmir Valley to Raja Gulab Singh of Jammu for 75 lakh Nanakshahi rupees.',
    year: 1846,
    displayYear: '1846 CE',
    difficulty: 'hard',
    era: 'swatantrata_modern',
    eraLabel: 'Swatantrata Sangram (1857 CE – Present)',
    region: 'North',
    rulerOrEntity: 'Gulab Singh & British East India Company',
    funFact: 'The treaty formally created the princely state of Jammu and Kashmir under Dogra dynasty rule.',
    worldContemporary: {
      year: 1846,
      displayYear: '1846 CE (same year)',
      description: 'The Mexican-American War began over disputed territory following the US annexation of Texas.'
    }
  },
  {
    id: 'hard_08',
    title: 'Second Battle of Tarain',
    description: 'Mu\'izz al-Din Muhammad of Ghor defeats the Rajput confederacy led by Prithviraj Chauhan, paving the way for the Delhi Sultanate.',
    year: 1192,
    displayYear: '1192 CE',
    difficulty: 'hard',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'North',
    rulerOrEntity: 'Prithviraj Chauhan vs Muhammad of Ghor',
    funFact: 'Prithviraj had defeated Muhammad of Ghor at the exact same battlefield just one year earlier in 1191.',
    worldContemporary: {
      year: 1192,
      displayYear: '1192 CE (same year)',
      description: 'King Richard the Lionheart and Saladin concluded the Treaty of Jaffa, ending the Third Crusade.'
    }
  },
  {
    id: 'hard_09',
    title: 'Founding of the Khalsa by Guru Gobind Singh',
    description: 'Tenth Sikh Guru Gobind Singh creates the Khalsa order of initiated warrior-saints at Anandpur Sahib on Vaisakhi.',
    year: 1699,
    displayYear: '1699 CE',
    difficulty: 'hard',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'North',
    rulerOrEntity: 'Guru Gobind Singh Ji',
    funFact: 'The Guru instituted the Five Ks (Kesh, Kangha, Kara, Kachera, and Kirpan) for every initiated member.',
    worldContemporary: {
      year: 1697,
      displayYear: '1697 CE (2 yrs earlier)',
      description: 'Peter the Great of Russia embarked on his Grand Embassy tour across Western Europe incognito.'
    }
  },
  {
    id: 'hard_10',
    title: 'Sacking of the Somnath Temple by Mahmud of Ghazni',
    description: 'Mahmud of Ghazni raids and destroys the sacred Shiva temple at Somnath along the coastal Kathiawar peninsula.',
    year: 1026,
    displayYear: '1026 CE',
    difficulty: 'hard',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'West',
    rulerOrEntity: 'Mahmud of Ghazni',
    funFact: 'The temple was rebuilt in 1951 spearheaded by Deputy Prime Minister Sardar Vallabhbhai Patel.',
    worldContemporary: {
      year: 1025,
      displayYear: '1025 CE (1 yr earlier)',
      description: 'Boleslaw I the Brave was crowned as the very first King of Poland in Gniezno Cathedral.'
    }
  },
  {
    id: 'hard_11',
    title: 'Treaty of Bassein (Baji Rao II)',
    description: 'Peshwa Baji Rao II signs a subsidiary alliance with the British East India Company, sparking the Second Anglo-Maratha War.',
    year: 1802,
    displayYear: '1802 CE',
    difficulty: 'hard',
    era: 'mughal_maratha',
    eraLabel: 'Mughal & Maratha Era (1526 CE – 1857 CE)',
    region: 'West',
    rulerOrEntity: 'Peshwa Baji Rao II vs British East India Company',
    funFact: 'Maratha chieftains like Daulat Rao Sindhia and Raghuji Bhonsle rejected the treaty, leading to immediate military confrontation.',
    worldContemporary: {
      year: 1804,
      displayYear: '1804 CE (2 yrs later)',
      description: 'Napoleon Bonaparte was crowned Emperor of the French at Notre-Dame Cathedral in Paris.'
    }
  },
  {
    id: 'hard_12',
    title: 'Panini Composes the Ashtadhyayi',
    description: 'Ancient Sanskrit grammarian Panini formulates the Ashtadhyayi, introducing 3,959 formal rules of generative linguistics.',
    year: -450,
    displayYear: '450 BCE',
    difficulty: 'hard',
    era: 'mahajanapada_empire',
    eraLabel: 'Mahajanapada & Empire (600 BCE – 300 CE)',
    region: 'North',
    rulerOrEntity: 'Panini',
    funFact: 'Computer scientists compare Panini\'s generative grammar rules to Backus-Naur form in modern programming syntax.',
    worldContemporary: {
      year: -449,
      displayYear: '449 BCE (1 yr earlier)',
      description: 'The Peace of Callias ended the Greco-Persian Wars between the Delian League and the Achaemenid Empire.'
    }
  },
  {
    id: 'hard_13',
    title: 'The Kakatiya Dynasty Sacking of Warangal',
    description: 'Malik Kafur, general of Delhi Sultan Alauddin Khalji, invades Warangal and forces King Prataparudra II to surrender the Koh-i-Noor diamond.',
    year: 1310,
    displayYear: '1310 CE',
    difficulty: 'hard',
    era: 'sultanate_regional',
    eraLabel: 'Sultanate & Regional Kingdoms (1200 CE – 1526 CE)',
    region: 'South',
    rulerOrEntity: 'Malik Kafur vs Prataparudra II',
    funFact: 'Prataparudra sent an envoy with a solid gold statue of himself draped in chains as a token of submission.',
    worldContemporary: {
      year: 1314,
      displayYear: '1314 CE (4 yrs later)',
      description: 'Robert the Bruce defeated the English army at the Battle of Bannockburn, securing Scottish independence.'
    }
  },
  {
    id: 'hard_14',
    title: 'Chandragupta Maurya Defeats Seleucus I Nicator',
    description: 'Mauryan founder Chandragupta Maurya defeats Alexander the Great\'s successor Seleucus I, acquiring Arachosia and Gedrosia.',
    year: -303,
    displayYear: '303 BCE',
    difficulty: 'hard',
    era: 'mahajanapada_empire',
    eraLabel: 'Mahajanapada & Empire (600 BCE – 300 CE)',
    region: 'North',
    rulerOrEntity: 'Chandragupta Maurya vs Seleucus I Nicator',
    funFact: 'The peace treaty was sealed by an alliance gift of 500 war elephants sent by Chandragupta to the Hellenistic forces.',
    worldContemporary: {
      year: -301,
      displayYear: '301 BCE (2 yrs later)',
      description: 'The Battle of Ipsus concluded between Alexander\'s successors, partitioning the Hellenistic kingdoms.'
    }
  },
  {
    id: 'hard_15',
    title: 'Pulakeshin II Defeats Harsha on the Narmada',
    description: 'Chalukya King Pulakeshin II halts the southward imperial expansion of Emperor Harsha of Kannauj on the banks of the Narmada River.',
    year: 618,
    displayYear: '618 CE',
    difficulty: 'hard',
    era: 'classical_medieval',
    eraLabel: 'Classical & Medieval Era (300 CE – 1200 CE)',
    region: 'Central',
    rulerOrEntity: 'Pulakeshin II (Chalukya) vs Harshavardhana',
    funFact: 'The victory was immortalized in stone by court poet Ravikirti in the famous Aihole Prashasti inscription.',
    worldContemporary: {
      year: 618,
      displayYear: '618 CE (same year)',
      description: 'The Tang Dynasty was established in Chang\'an, beginning China\'s classical golden age of poetry and trade.'
    }
  }
];