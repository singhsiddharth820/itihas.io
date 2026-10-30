export interface IndianHistoryEvent {
    id: string;
    title: string;
    description: string;
    year: number;          // negative for BCE, positive for CE
    displayYear: string;   // e.g. "1975 CE"
    eraLabel: string;      // e.g. "Post-Independence & Modern"
    region: string;        // e.g. "Mumbai, Maharashtra"
    difficulty: 'easy' | 'hard';
    category: 'history' | 'cinema' | 'sports' | 'literature' | 'pop-culture' | 'science' | 'milestone';
    funFact: string;
    worldContemporary: {
      displayYear: string;
      description: string;
    };
  }
  
  export const INDIAN_EVENTS: IndianHistoryEvent[] = [
    // =========================================================================
    // EASY MODE: CORE HISTORY (Major Revolutions, Landmarks & Battles)
    // =========================================================================
    {
      id: 'dandi-march',
      title: 'The Dandi Salt March',
      description: 'Mahatma Gandhi leads a 240-mile march from Sabarmati Ashram to the coastal village of Dandi to produce salt from seawater in defiance of the British salt tax monopoly.',
      year: 1930,
      displayYear: '1930 CE',
      eraLabel: 'Freedom Struggle',
      region: 'Gujarat',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Over 60,000 Indians were arrested following the march, including Gandhi himself.',
      worldContemporary: {
        displayYear: '1930 CE',
        description: 'The first FIFA World Cup is hosted and won by Uruguay in Montevideo.'
      }
    },
    {
      id: 'quit-india-movement',
      title: 'Launch of the Quit India Movement',
      description: 'At the Gowalia Tank Maidan in Bombay, Mahatma Gandhi delivers his famous "Do or Die" speech demanding an orderly British withdrawal from India.',
      year: 1942,
      displayYear: '1942 CE',
      eraLabel: 'Freedom Struggle',
      region: 'Mumbai, Maharashtra',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Aruna Asaf Ali hoisted the Indian tricolour at Gowalia Tank despite heavy police presence and tear gas.',
      worldContemporary: {
        displayYear: '1942 CE',
        description: 'The Battle of Stalingrad begins, marking the turning point on World War II\'s Eastern Front.'
      }
    },
    {
      id: 'constitution-adoption',
      title: 'Adoption of the Constitution of India',
      description: 'The Constituent Assembly of India formally drafts and adopts the Constitution after nearly three years of debates under the drafting chairmanship of Dr. B.R. Ambedkar.',
      year: 1949,
      displayYear: '1949 CE',
      eraLabel: 'Republic of India',
      region: 'New Delhi',
      difficulty: 'easy',
      category: 'history',
      funFact: 'The original copies were not printed; they were handwritten in English and Hindi and illuminated by artists from Shantiniketan.',
      worldContemporary: {
        displayYear: '1949 CE',
        description: 'The North Atlantic Treaty is signed in Washington, creating NATO.'
      }
    },
    {
      id: 'first-railway-journey',
      title: 'India\'s First Commercial Passenger Train',
      description: 'A 14-carriage train hauled by three steam locomotives (Sultan, Sindh, and Sahib) covers the 34 km distance between Bori Bunder and Thane.',
      year: 1853,
      displayYear: '1853 CE',
      eraLabel: 'Colonial Era',
      region: 'Mumbai, Maharashtra',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Around 400 passengers were aboard the 57-minute historic maiden ride.',
      worldContemporary: {
        displayYear: '1853 CE',
        description: 'Commodore Matthew Perry arrives in Tokyo Bay with US steam warships to open Japanese trade.'
      }
    },
    {
      id: 'battle-of-plassey',
      title: 'The Battle of Plassey',
      description: 'Robert Clive leads British East India Company forces to victory over Siraj-ud-Daulah, the Nawab of Bengal, establishing Company rule in Bengal.',
      year: 1757,
      displayYear: '1757 CE',
      eraLabel: 'Late Medieval & Colonial',
      region: 'Palashi, West Bengal',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Mir Jafar\'s defection with two-thirds of the Nawab\'s army decided the outcome before full combat ensued.',
      worldContemporary: {
        displayYear: '1757 CE',
        description: 'The Seven Years\' War intensifies across Europe between Britain, Prussia, France, and Austria.'
      }
    },
    {
      id: 'first-war-independence',
      title: 'The Revolt of 1857 (Sepoy Mutiny)',
      description: 'Sepoys at Meerut break into open rebellion, marching to Delhi and declaring Mughal Emperor Bahadur Shah Zafar as the Emperor of Hindustan.',
      year: 1857,
      displayYear: '1857 CE',
      eraLabel: 'Colonial Era',
      region: 'Meerut / Delhi',
      difficulty: 'easy',
      category: 'history',
      funFact: 'The uprising led directly to the liquidation of the East India Company and the establishment of direct British Crown rule.',
      worldContemporary: {
        displayYear: '1857 CE',
        description: 'The Panic of 1857 triggers a severe global economic downturn across American and European banks.'
      }
    },
    {
      id: 'jallianwala-bagh',
      title: 'The Jallianwala Bagh Massacre',
      description: 'Acting Brigadier-General Reginald Dyer orders troops to fire on a peaceful gathering of unarmed civilians celebrating Baisakhi in Amritsar.',
      year: 1919,
      displayYear: '1919 CE',
      eraLabel: 'Colonial Era',
      region: 'Amritsar, Punjab',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Rabindranath Tagore renounced his British knighthood in protest of the brutality.',
      worldContemporary: {
        displayYear: '1919 CE',
        description: 'The Treaty of Versailles is signed at the Paris Peace Conference, formally ending World War I.'
      }
    },
    {
      id: 'first-battle-of-panipat',
      title: 'First Battle of Panipat',
      description: 'Babur defeats the Lodi Empire ruler Ibrahim Lodi using field artillery and tulughma flanking tactics, laying the foundation of the Mughal Empire.',
      year: 1526,
      displayYear: '1526 CE',
      eraLabel: 'Mughal & Maratha Era',
      region: 'Panipat, Haryana',
      difficulty: 'easy',
      category: 'history',
      funFact: 'It was one of the earliest military engagements in the Indian subcontinent involving gunpowder firearms and field cannon.',
      worldContemporary: {
        displayYear: '1526 CE',
        description: 'The Ottoman Empire under Suleiman the Magnificent defeats the Kingdom of Hungary at the Battle of Mohács.'
      }
    },
    {
      id: 'ashoka-kalinga-war',
      title: 'Emperor Ashoka\'s Kalinga War',
      description: 'The Maurya Emperor Ashoka conquers the state of Kalinga in a catastrophic conflict that spurs his deep remorse and conversion to Buddhism and Ahimsa.',
      year: -261,
      displayYear: '261 BCE',
      eraLabel: 'Mauryan Empire',
      region: 'Odisha',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Ashoka inscribed his profound remorse directly onto Rock Edict XIII across his subcontinent-wide empire.',
      worldContemporary: {
        displayYear: '261 BCE',
        description: 'The First Punic War rages between Rome and Carthage over control of the Mediterranean island of Sicily.'
      }
    },
    {
      id: 'non-cooperation-movement',
      title: 'Launch of the Non-Cooperation Movement',
      description: 'Mahatma Gandhi and the Indian National Congress call on Indians to boycott British goods, government educational institutions, courts, and honors.',
      year: 1920,
      displayYear: '1920 CE',
      eraLabel: 'Freedom Struggle',
      region: 'Nagpur / Nationwide',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Gandhi called off the movement in 1922 following violence at Chauri Chaura, insisting on absolute non-violence.',
      worldContemporary: {
        displayYear: '1920 CE',
        description: 'The League of Nations holds its inaugural executive council meeting in Paris.'
      }
    },
    {
      id: 'first-general-elections',
      title: 'India\'s First General Elections',
      description: 'Independent India conducts the world\'s largest democratic election using universal adult suffrage, establishing the first elected Lok Sabha.',
      year: 1951,
      displayYear: '1951 CE',
      eraLabel: 'Republic of India',
      region: 'Nationwide',
      difficulty: 'easy',
      category: 'history',
      funFact: 'Over 173 million citizens were eligible to vote, many of whom were illiterate and cast paper ballots identified by symbols.',
      worldContemporary: {
        displayYear: '1951 CE',
        description: 'The Treaty of Paris establishes the European Coal and Steel Community, the forerunner to the EU.'
      }
    },
    {
      id: 'simla-agreement-1972',
      title: 'Signing of the Simla Agreement',
      description: 'Prime Minister Indira Gandhi and President Zulfikar Ali Bhutto sign an accord in Himachal Pradesh establishing the Line of Control following the 1971 war.',
      year: 1972,
      displayYear: '1972 CE',
      eraLabel: 'Modern India',
      region: 'Shimla, Himachal Pradesh',
      difficulty: 'easy',
      category: 'history',
      funFact: 'The agreement converted the 1949 ceasefire line of Jammu & Kashmir into the Line of Control (LoC).',
      worldContemporary: {
        displayYear: '1972 CE',
        description: 'Richard Nixon makes his historic eight-day official visit to the People\'s Republic of China.'
      }
    },
  
    // =========================================================================
    // EASY MODE: CULTURAL, CINEMA, SPORTS, LITERATURE & SCIENCE
    // =========================================================================
    {
      id: 'sholay-release',
      title: 'Release of "Sholay" in Theatres',
      description: 'Ramesh Sippy\'s iconic curry-western starring Amitabh Bachchan, Dharmendra, and Amjad Khan as Gabbar Singh releases on Independence Day weekend at Minerva Theatre.',
      year: 1975,
      displayYear: '1975 CE',
      eraLabel: 'Modern India',
      region: 'Mumbai, Maharashtra',
      difficulty: 'easy',
      category: 'cinema',
      funFact: 'It initially opened to lukewarm reviews before word-of-mouth dialogue cassettes turned it into a multi-year theatrical phenomenon.',
      worldContemporary: {
        displayYear: '1975 CE',
        description: 'Steven Spielberg\'s "Jaws" releases in the US, inaugurating the modern summer blockbuster era.'
      }
    },
    {
      id: 'ddlj-release',
      title: 'Premiere of "Dilwale Dulhania Le Jayenge"',
      description: 'Aditya Chopra directs Shah Rukh Khan and Kajol in a genre-defining romance that redefines NRI identity and runs for over 1,000 weeks at Maratha Mandir.',
      year: 1995,
      displayYear: '1995 CE',
      eraLabel: 'Liberalization & Global India',
      region: 'Mumbai / Punjab',
      difficulty: 'easy',
      category: 'cinema',
      funFact: 'Maratha Mandir theatre in Mumbai screened the film uninterrupted every single morning for over 25 years.',
      worldContemporary: {
        displayYear: '1995 CE',
        description: 'Pixar releases "Toy Story", the world\'s first fully computer-animated feature film.'
      }
    },
    {
      id: 'lagaan-oscars',
      title: '"Lagaan" Secures Academy Award Nomination',
      description: 'Ashutosh Gowariker and Aamir Khan\'s Victorian-era cricket epic earns India a Best Foreign Language Film nomination at the 74th Academy Awards.',
      year: 2001,
      displayYear: '2001 CE',
      eraLabel: 'Millennium India',
      region: 'Bhuj, Gujarat',
      difficulty: 'easy',
      category: 'cinema',
      funFact: 'It was only the third Indian film in history to secure an Oscar nod in the category, following Mother India and Salaam Bombay!.',
      worldContemporary: {
        displayYear: '2001 CE',
        description: 'Wikipedia is launched online, and Apple introduces the very first generation iPod.'
      }
    },
    {
      id: 'prutential-world-cup-1983',
      title: 'Kapil Dev\'s Underdogs Lift the Cricket World Cup',
      description: 'India stuns the mighty two-time defending champion West Indies at Lord\'s, defending a modest total of 183 to win their first Cricket World Cup.',
      year: 1983,
      displayYear: '1983 CE',
      eraLabel: 'Modern India',
      region: 'London / Nationwide',
      difficulty: 'easy',
      category: 'sports',
      funFact: 'India started the tournament with bookmakers quoting 66-1 odds against them lifting the trophy.',
      worldContemporary: {
        displayYear: '1983 CE',
        description: 'The official transition to TCP/IP occurs, marking the technical birth of the global Internet.'
      }
    },
    {
      id: 't20-world-cup-2007',
      title: 'MS Dhoni\'s Young India Wins Inaugural T20 World Cup',
      description: 'Misbah-ul-Haq scoops Joginder Sharma to Sreesanth in Johannesburg, clinching a thriller against Pakistan and triggering the franchise cricket era.',
      year: 2007,
      displayYear: '2007 CE',
      eraLabel: 'Millennium India',
      region: 'Johannesburg / Nationwide',
      difficulty: 'easy',
      category: 'sports',
      funFact: 'Senior players including Sachin Tendulkar, Sourav Ganguly, and Rahul Dravid opted out of the tournament to give youngsters experience.',
      worldContemporary: {
        displayYear: '2007 CE',
        description: 'Steve Jobs takes the stage at Macworld to unveil the original iPhone.'
      }
    },
    {
      id: 'world-cup-2011',
      title: 'India Wins Cricket World Cup on Home Soil',
      description: 'MS Dhoni hits Nuwan Kulasekara for a match-winning six over long-on at Wankhede Stadium to bring the World Cup trophy back to India after 28 years.',
      year: 2011,
      displayYear: '2011 CE',
      eraLabel: 'Millennium India',
      region: 'Mumbai, Maharashtra',
      difficulty: 'easy',
      category: 'sports',
      funFact: 'India became the first team in history to win the ICC Men\'s Cricket World Cup on home soil.',
      worldContemporary: {
        displayYear: '2011 CE',
        description: 'NASA launches the Curiosity Mars rover aboard an Atlas V rocket from Cape Canaveral.'
      }
    },
    {
      id: 'god-of-small-things-booker',
      title: 'Arundhati Roy Wins the Booker Prize',
      description: '"The God of Small Things", set against the backwaters of Ayemenem, Kerala, wins the Booker Prize, marking an explosive international literary breakthrough.',
      year: 1997,
      displayYear: '1997 CE',
      eraLabel: 'Liberalization & Global India',
      region: 'Kottayam, Kerala',
      difficulty: 'easy',
      category: 'literature',
      funFact: 'It was Roy\'s debut novel and sold over 6 million copies worldwide within a few years.',
      worldContemporary: {
        displayYear: '1997 CE',
        description: 'J.K. Rowling publishes "Harry Potter and the Philosopher\'s Stone" in the UK.'
      }
    },
    {
      id: 'midnights-children-rushdie',
      title: 'Publication of Salman Rushdie\'s "Midnight\'s Children"',
      description: 'A seminal magic-realist novel tracing India\'s independence through children born at the stroke of midnight on August 15, 1947, winning the Booker Prize.',
      year: 1981,
      displayYear: '1981 CE',
      eraLabel: 'Modern India',
      region: 'Mumbai, Maharashtra',
      difficulty: 'easy',
      category: 'literature',
      funFact: 'It won both the "Booker of Bookers" (1993) and the all-time best Booker award on its 40th anniversary.',
      worldContemporary: {
        displayYear: '1981 CE',
        description: 'MTV officially launches on American television with "Video Killed the Radio Star".'
      }
    },
    {
      id: 'roja-rahman-debut',
      title: 'Mani Ratnam & A.R. Rahman Revolutionize Film Music with "Roja"',
      description: 'A 25-year-old studio composer transforms Indian film orchestration with synthesized basslines, reggae pulses, and traditional ragas in "Chinna Chinna Aasai" / "Dil Hai Chhota Sa".',
      year: 1992,
      displayYear: '1992 CE',
      eraLabel: 'Liberalization & Global India',
      region: 'Chennai, Tamil Nadu',
      difficulty: 'easy',
      category: 'pop-culture',
      funFact: 'TIME Magazine named the Roja soundtrack among the "10 Best Soundtracks" of all time in global cinema.',
      worldContemporary: {
        displayYear: '1992 CE',
        description: 'The Maastricht Treaty is signed, leading to the creation of the European Union.'
      }
    },
    {
      id: 'ramayan-doordarshan',
      title: 'Ramanand Sagar\'s "Ramayan" Debuts on Doordarshan',
      description: 'Streets across India empty out completely on Sunday mornings as millions gather around communal television sets to watch Arun Govil and Deepika Chikhlia.',
      year: 1987,
      displayYear: '1987 CE',
      eraLabel: 'Modern India',
      region: 'National Broadcast',
      difficulty: 'easy',
      category: 'pop-culture',
      funFact: 'During broadcast hours, public buses stopped running and train passengers crowded railway platform waiting rooms with working TVs.',
      worldContemporary: {
        displayYear: '1987 CE',
        description: 'The Simpsons makes its first television appearance as animated shorts on The Tracey Ullman Show.'
      }
    },
    {
      id: 'mangalyaan-mars-orbit',
      title: 'ISRO Enters Mars Orbit on First Attempt (Mangalyaan)',
      description: 'India becomes the first Asian nation to reach Martian orbit and the first in the world to do so on its maiden attempt, achieved on a budget of just $74 million.',
      year: 2014,
      displayYear: '2014 CE',
      eraLabel: 'Millennium India',
      region: 'Sriharikota, Andhra Pradesh',
      difficulty: 'easy',
      category: 'science',
      funFact: 'The mission cost less per kilometer than auto-rickshaw fares and was cheaper than the Hollywood movie "Gravity".',
      worldContemporary: {
        displayYear: '2014 CE',
        description: 'The European Space Agency\'s Rosetta mission achieves the first soft landing of a probe on a comet (Philae).'
      }
    },
    {
      id: 'chandrayaan-1-water',
      title: 'ISRO Launches Chandrayaan-1 to the Moon',
      description: 'India\'s first lunar probe launches from Satish Dhawan Space Centre aboard a PSLV-XL, carrying NASA\'s Moon Mineralogy Mapper which confirms water molecules on the lunar surface.',
      year: 2008,
      displayYear: '2008 CE',
      eraLabel: 'Millennium India',
      region: 'Sriharikota, Andhra Pradesh',
      difficulty: 'easy',
      category: 'science',
      funFact: 'Data gathered by Chandrayaan-1 provided definitive proof of hydroxyl (OH) and water (H2O) molecules locked in polar lunar soil.',
      worldContemporary: {
        displayYear: '2008 CE',
        description: 'The Large Hadron Collider (LHC) at CERN in Switzerland is powered on for the first time.'
      }
    },
    {
      id: 'first-mobile-phone-call-india',
      title: 'The First Mobile Phone Call in India',
      description: 'West Bengal Chief Minister Jyoti Basu in Kolkata places India\'s first cellular phone call to Union Communications Minister Sukh Ram in Delhi over the Modi Telstra network.',
      year: 1995,
      displayYear: '1995 CE',
      eraLabel: 'Liberalization & Global India',
      region: 'Kolkata, West Bengal',
      difficulty: 'easy',
      category: 'milestone',
      funFact: 'Outgoing cellular calls originally cost ₹16.80 per minute, and users also had to pay ₹8.40 per minute just to receive calls.',
      worldContemporary: {
        displayYear: '1995 CE',
        description: 'Microsoft officially releases Windows 95, introducing the Start menu and desktop taskbar.'
      }
    },
  
    // =========================================================================
    // HARD MODE: SCHOLAR & HISTORIAN MILESTONES (Ancient, Medieval, Treaties & Naval)
    // =========================================================================
    {
      id: 'battle-of-ten-kings',
      title: 'The Battle of the Ten Kings (Dāśarājñá)',
      description: 'King Sudas of the Bharata Trtsu dynasty defeats a coalition of ten opposing confederacies on the banks of the Parushni (Ravi) River, celebrated in Mandala 7 of the Rigveda.',
      year: -1400,
      displayYear: '1400 BCE',
      eraLabel: 'Early Vedic Period',
      region: 'Punjab',
      difficulty: 'hard',
      category: 'history',
      funFact: 'This victory laid the geopolitical foundation for the emergence of the Kuru kingdom.',
      worldContemporary: {
        displayYear: '1400 BCE',
        description: 'The Mycenaean civilization flourishes in Greece and rebuilds Knossos on Crete.'
      }
    },
    {
      id: 'battle-of-colachel',
      title: 'The Battle of Colachel',
      description: 'King Anizham Thirunal Marthanda Varma of Travancore inflicts a decisive defeat on the Dutch East India Company, extinguishing Dutch colonial ambitions in India.',
      year: 1741,
      displayYear: '1741 CE',
      eraLabel: 'Late Medieval & Colonial',
      region: 'Kanyakumari, Tamil Nadu',
      difficulty: 'hard',
      category: 'history',
      funFact: 'It remains the first instance of an Asian naval and land force completely defeating an armed European colonial power.',
      worldContemporary: {
        displayYear: '1741 CE',
        description: 'The War of the Austrian Succession spreads across central Europe.'
      }
    },
    {
      id: 'battle-of-takkolam',
      title: 'The Battle of Takkolam',
      description: 'Rashtrakuta Emperor Krishna III and his Western Ganga ally Butuga II defeat the Chola crown prince Rajaditya, killing him atop his war elephant.',
      year: 949,
      displayYear: '949 CE',
      eraLabel: 'Classical & Early Medieval',
      region: 'Arakkonam, Tamil Nadu',
      difficulty: 'hard',
      category: 'history',
      funFact: 'The battlefield death of Rajaditya halted Chola expansion northward for more than thirty years until Rajaraja I took the throne.',
      worldContemporary: {
        displayYear: '949 CE',
        description: 'The Byzantine Empire launches major naval expeditions to recapture Crete from the Emirate of Crete.'
      }
    },
    {
      id: 'battle-of-saraighat',
      title: 'The Battle of Saraighat',
      description: 'Ahom general Lachit Borphukan uses guerrilla naval tactics on the Brahmaputra River to defeat the superior Mughal invasion force led by Ram Singh I.',
      year: 1671,
      displayYear: '1671 CE',
      eraLabel: 'Mughal & Maratha Era',
      region: 'Guwahati, Assam',
      difficulty: 'hard',
      category: 'history',
      funFact: 'Lachit had an earthen rampart built overnight and famously executed his own uncle for neglecting guard duty, saying "My uncle is not greater than my motherland."',
      worldContemporary: {
        displayYear: '1671 CE',
        description: 'Giovanni Domenico Cassini discovers Iapetus, the third-largest moon of Saturn, at the Paris Observatory.'
      }
    },
    {
      id: 'coronation-of-shivaji',
      title: 'Coronation of Chhatrapati Shivaji Maharaj',
      description: 'Shivaji Maharaj is coronated as the sovereign Chhatrapati of the Maratha Empire in a grand ceremony conducted by Gaga Bhatt at Raigad Fort.',
      year: 1674,
      displayYear: '1674 CE',
      eraLabel: 'Mughal & Maratha Era',
      region: 'Raigad, Maharashtra',
      difficulty: 'hard',
      category: 'history',
      funFact: 'The coronation introduced the Rajyabhisheka Shaka calendar and gold coins inscribed in Devanagari (Hon).',
      worldContemporary: {
        displayYear: '1674 CE',
        description: 'The Treaty of Westminster ends the Third Anglo-Dutch War, transferring New Amsterdam (New York) to the British.'
      }
    },
    {
      id: 'brihadisvara-consecration',
      title: 'Consecration of Brihadisvara Temple',
      description: 'Rajaraja Chola I completes the magnificent granite temple dedicated to Shiva in Thanjavur, crowned by an 80-tonne single granite block vimana.',
      year: 1010,
      displayYear: '1010 CE',
      eraLabel: 'Chola Dynasty',
      region: 'Thanjavur, Tamil Nadu',
      difficulty: 'hard',
      category: 'history',
      funFact: 'It was built entirely from granite transported from quarries more than 60 km away, without any granite sources in the local delta.',
      worldContemporary: {
        displayYear: '1010 CE',
        description: 'The Persian poet Ferdowsi completes the monumental epic Shahnameh (The Book of Kings).'
      }
    },
    {
      id: 'battle-of-talikota',
      title: 'The Battle of Talikota',
      description: 'A combined alliance of Deccan Sultanates defeats the army of Rama Raya, leading to the sacking and abandonment of the imperial capital of Vijayanagara (Hampi).',
      year: 1565,
      displayYear: '1565 CE',
      eraLabel: 'Late Medieval Period',
      region: 'Rakkasagi-Tangadagi, Karnataka',
      difficulty: 'hard',
      category: 'history',
      funFact: 'The sudden defection of two mercenary commanders commanding thousands of troops under Rama Raya shifted the battle within hours.',
      worldContemporary: {
        displayYear: '1565 CE',
        description: 'The Ottoman Empire fails to capture the island fortress of Malta in the celebrated Great Siege of Malta.'
      }
    },
    {
      id: 'iron-pillar-delhi',
      title: 'Erection of the Iron Pillar of Delhi',
      description: 'Chandragupta II (Vikramaditya) erects a 7-meter rust-resistant wrought iron pillar at Vishnupadagiri (Udayagiri) before its later relocation to Qutb Complex.',
      year: 402,
      displayYear: '402 CE',
      eraLabel: 'Gupta Golden Age',
      region: 'Delhi / Vidisha',
      difficulty: 'hard',
      category: 'history',
      funFact: 'High phosphorus content and passive iron oxide film have prevented it from rusting for over 1,600 years of open-air monsoons.',
      worldContemporary: {
        displayYear: '402 CE',
        description: 'The Western Roman Empire shifts its imperial capital from Milan to the more defensible marsh city of Ravenna.'
      }
    },
    {
      id: 'pulakeshin-harsha-battle',
      title: 'Pulakeshin II Halts Harsha at the Narmada',
      description: 'Chalukya ruler Pulakeshin II stops the southward conquest of Emperor Harsha of Kannauj on the banks of the Narmada River, recorded in the Aihole Inscription.',
      year: 618,
      displayYear: '618 CE',
      eraLabel: 'Classical Subcontinent',
      region: 'Narmada Valley, Madhya Pradesh',
      difficulty: 'hard',
      category: 'history',
      funFact: 'Following the confrontation, Harsha conceded all territories south of the Narmada, and Pulakeshin assumed the title Parameshvara.',
      worldContemporary: {
        displayYear: '618 CE',
        description: 'The Tang Dynasty is founded in China by Emperor Gaozu, replacing the Sui Dynasty.'
      }
    },
    {
      id: 'treaty-of-yandabo',
      title: 'Signing of the Treaty of Yandabo',
      description: 'The First Anglo-Burmese War concludes with the Burmese kingdom ceding Assam, Manipur, Arakan, and Tenasserim to the British East India Company.',
      year: 1826,
      displayYear: '1826 CE',
      eraLabel: 'Colonial Expansion',
      region: 'Yandabo / Assam',
      difficulty: 'hard',
      category: 'history',
      funFact: 'This marked the formal onset of British territorial expansion and tea plantation administration in Northeast India.',
      worldContemporary: {
        displayYear: '1826 CE',
        description: 'French inventor Nicéphore Niépce creates the world\'s oldest surviving permanent photograph from his estate window in Saint-Loup-de-Varennes.'
      }
    }
  ];