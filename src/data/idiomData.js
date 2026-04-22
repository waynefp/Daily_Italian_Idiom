// Complete dataset of 365 Italian idioms — one for each day of the year.
// Each entry is keyed by day-of-year (1–365).
// The app picks today's idiom based on the current date.

const IDIOMS = [
  {
    idiom: 'In bocca al lupo!',
    pronunciation: '/in ˈbok.ka al ˈlu.po/',
    syllables: 'in \u00b7 boc \u00b7 ca \u00b7 al \u00b7 lu \u00b7 po',
    literal: '\u201CInto the mouth of the wolf!\u201D',
    actual: 'Good luck! The traditional reply is "Crepi il lupo!" (may the wolf die). Used before exams, job interviews, or any challenge.',
    register: 'Informal \u00b7 Warm',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Some say it comes from Roman hunters wishing each other well, others trace it to the she-wolf carrying her cubs to safety in her mouth \u2014 so "into the wolf\u2019s mouth" means being protected.',
    examples: [
      { it: '\u2014 Domani ho l\u2019esame di matematica.', en: '\u2014 Tomorrow I have my math exam.', reply: { it: '\u2014 In bocca al lupo!', en: '\u2014 Good luck!' } },
      { it: 'In bocca al lupo per il colloquio di lavoro!', en: 'Good luck with the job interview!' },
      { it: '\u2014 In bocca al lupo! \u2014 Crepi!', en: '\u2014 Good luck! \u2014 Thanks! (lit. "may it die!")' },
    ],
    situations: [
      'Before an exam or test.',
      'Wishing a friend well before a big event.',
      'Any moment someone faces an uncertain challenge.',
    ],
    tags: ['luck', 'encouragement', 'classic', 'conversational'],
  },
  {
    idiom: 'Non vedo l\u2019ora!',
    pronunciation: '/non ˈve.do ˈlo.ra/',
    syllables: 'non \u00b7 ve \u00b7 do \u00b7 l\u2019o \u00b7 ra',
    literal: '\u201CI don\u2019t see the hour!\u201D',
    actual: 'I can\u2019t wait! Expresses eager anticipation for something you\u2019re excited about.',
    register: 'Informal \u00b7 Enthusiastic',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'The idea is that you\u2019re so eager the clock seems to have stopped \u2014 you literally cannot see the hour arriving fast enough.',
    examples: [
      { it: 'Non vedo l\u2019ora di andare in vacanza!', en: 'I can\u2019t wait to go on vacation!' },
      { it: 'Non vedo l\u2019ora di rivederti.', en: 'I can\u2019t wait to see you again.', reply: { it: '\u2014 Neanche io!', en: '\u2014 Me neither!' } },
      { it: 'Non vedevo l\u2019ora che arrivasse il weekend.', en: 'I couldn\u2019t wait for the weekend to come.' },
    ],
    situations: [
      'Counting down to a vacation or trip.',
      'Excited about seeing someone you miss.',
      'Anticipating a concert, meal, or event.',
    ],
    tags: ['excitement', 'daily', 'time-metaphor', 'conversational'],
  },
  {
    idiom: 'Essere al verde',
    pronunciation: '/ˈes.se.re al ˈver.de/',
    syllables: 'es \u00b7 se \u00b7 re \u00b7 al \u00b7 ver \u00b7 de',
    literal: '\u201CTo be at the green\u201D',
    actual: 'To be broke / out of money. When your wallet is empty and payday feels far away.',
    register: 'Informal \u00b7 Colloquial',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'In medieval Florence, candles used in auctions had a green base. When the flame reached the green, time (and money) had run out.',
    examples: [
      { it: 'Non posso uscire stasera, sono al verde.', en: 'I can\u2019t go out tonight, I\u2019m broke.' },
      { it: '\u2014 Andiamo al ristorante? \u2014 Sono al verde fino a venerd\u00EC.', en: '\u2014 Shall we go to the restaurant? \u2014 I\u2019m broke until Friday.' },
      { it: 'Dopo le vacanze siamo tutti al verde.', en: 'After vacation we\u2019re all broke.' },
    ],
    situations: [
      'Declining an invitation because you\u2019re short on cash.',
      'Joking about post-holiday finances.',
      'Explaining why you\u2019re eating at home this week.',
    ],
    tags: ['money', 'daily', 'color-metaphor', 'colloquial'],
  },
  {
    idiom: 'Avere le mani in pasta',
    pronunciation: '/aˈve.re le ˈma.ni in ˈpas.ta/',
    syllables: 'a \u00b7 ve \u00b7 re \u00b7 le \u00b7 ma \u00b7 ni \u00b7 in \u00b7 pa \u00b7 sta',
    literal: '\u201CTo have your hands in the dough\u201D',
    actual: 'To be involved in something, often behind the scenes. Can imply insider knowledge or meddling.',
    register: 'Informal \u00b7 Neutral to slightly suspicious',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From bread-making: if your hands are in the dough, you\u2019re actively shaping the outcome. Extended to politics and business dealings.',
    examples: [
      { it: 'Lui ha sempre le mani in pasta in ogni affare del quartiere.', en: 'He\u2019s always got his fingers in every deal in the neighborhood.' },
      { it: '\u2014 Come fa a sapere tutto? \u2014 Ha le mani in pasta dappertutto.', en: '\u2014 How does he know everything? \u2014 He\u2019s got connections everywhere.', reply: { it: '\u2014 Tipico di Marco.', en: '\u2014 Typical Marco.' } },
      { it: 'Se vuoi quel permesso, devi avere le mani in pasta al comune.', en: 'If you want that permit, you need to have connections at city hall.' },
    ],
    situations: [
      'Describing someone who\u2019s well-connected.',
      'Talking about someone meddling in affairs.',
      'Discussing how things really get done in Italian bureaucracy.',
    ],
    tags: ['involvement', 'food-metaphor', 'politics', 'conversational'],
  },
  {
    idiom: 'Prendere due piccioni con una fava',
    pronunciation: '/ˈpren.de.re ˈdu.e pitˈtʃo.ni kon ˈu.na ˈfa.va/',
    syllables: 'pren \u00b7 de \u00b7 re \u00b7 due \u00b7 pic \u00b7 cio \u00b7 ni \u00b7 con \u00b7 u \u00b7 na \u00b7 fa \u00b7 va',
    literal: '\u201CTo catch two pigeons with one fava bean\u201D',
    actual: 'To kill two birds with one stone. Accomplishing two goals with a single action.',
    register: 'Neutral \u00b7 Conversational',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Fava beans were actually used as bait in pigeon traps in old Italy. The lucky trapper could sometimes snare two birds with a single bean.',
    examples: [
      { it: 'Vado a Milano per lavoro e visito anche mia sorella \u2014 prendo due piccioni con una fava.', en: 'I\u2019m going to Milan for work and visiting my sister too \u2014 two birds, one stone.' },
      { it: '\u2014 Perch\u00E9 non fai la spesa mentre vai dal dottore?', en: '\u2014 Why don\u2019t you do the shopping while you\u2019re at the doctor\u2019s?', reply: { it: '\u2014 Buona idea, due piccioni con una fava!', en: '\u2014 Good idea, two birds one stone!' } },
      { it: 'Studiando italiano imparo anche la cultura \u2014 due piccioni con una fava.', en: 'By studying Italian I also learn the culture \u2014 two birds with one stone.' },
    ],
    situations: [
      'Planning a trip that combines business and pleasure.',
      'Finding an efficient solution that solves two problems.',
      'Congratulating yourself on a clever time-saver.',
    ],
    tags: ['efficiency', 'animal-metaphor', 'classic', 'conversational'],
  },
  {
    idiom: 'Che palle!',
    pronunciation: '/ke ˈpal.le/',
    syllables: 'che \u00b7 pal \u00b7 le',
    literal: '\u201CWhat balls!\u201D',
    actual: 'How annoying! What a drag! An exclamation of frustration or boredom. Mildly vulgar but extremely common.',
    register: 'Informal \u00b7 Vulgar (mild)',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 very common all over',
    origin: 'A colloquial expression referencing male anatomy, used to express exasperation. Despite the literal meaning, it\u2019s widely used by everyone in casual contexts.',
    examples: [
      { it: 'Che palle, piove di nuovo!', en: 'Ugh, it\u2019s raining again!' },
      { it: '\u2014 La riunione dura tre ore. \u2014 Che palle!', en: '\u2014 The meeting lasts three hours. \u2014 What a drag!' },
      { it: 'Che palle sto traffico, non si muove niente.', en: 'This traffic is so annoying, nothing\u2019s moving.' },
    ],
    situations: [
      'Stuck in traffic or a long queue.',
      'Hearing about an obligation you\u2019d rather skip.',
      'Reacting to bad weather ruining your plans.',
    ],
    tags: ['frustration', 'exclamation', 'vulgar-mild', 'daily'],
  },
  {
    idiom: 'Stai fresco!',
    pronunciation: '/staj ˈfres.ko/',
    syllables: 'stai \u00b7 fre \u00b7 sco',
    literal: '\u201CYou stay cool!\u201D',
    actual: 'Good luck with that \u2014 you\u2019ve got another thing coming. A sarcastic way of telling someone their plan is hopeless, or that they\u2019re in for trouble.',
    register: 'Informal \u00b7 Sarcastic',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Likely from older usage where \u201Cal fresco\u201D meant \u201Cin the cooler\u201D \u2014 i.e. in prison, or kept waiting. So telling someone \u201Cstai fresco\u201D was to say: you\u2019ll be stuck there a while.',
    examples: [
      { it: '\u2014 Pensi che ti restituisca i soldi entro venerd\u00EC?', en: '\u2014 You think he\u2019ll pay you back by Friday?', reply: { it: '\u2014 Eh, stai fresco!', en: '\u2014 Ha, keep dreaming!' } },
      { it: 'Se credi che Marco arrivi puntuale alla cena, stai fresco.', en: 'If you think Marco will show up on time for dinner, good luck with that.' },
      { it: 'Stai fresco se speri di trovare parcheggio in centro a Roma.', en: 'You can forget about finding parking in central Rome.' },
    ],
    situations: [
      'A friend is counting on something unreliable happening.',
      'Mocking a wildly optimistic plan with warmth, not cruelty.',
      'Commenting on a bureaucratic process that will clearly take forever.',
    ],
    tags: ['sarcasm', 'daily', 'weather-metaphor', 'conversational'],
  },
  {
    idiom: 'Acqua in bocca!',
    pronunciation: '/ˈak.kwa in ˈbok.ka/',
    syllables: 'ac \u00b7 qua \u00b7 in \u00b7 boc \u00b7 ca',
    literal: '\u201CWater in your mouth!\u201D',
    actual: 'Keep it a secret! Don\u2019t tell anyone! If your mouth is full of water, you can\u2019t speak.',
    register: 'Informal \u00b7 Playful',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'The image is vivid: if you hold water in your mouth, you physically can\u2019t talk. A charming way to ask for discretion.',
    examples: [
      { it: 'Ti dico un segreto, ma acqua in bocca!', en: 'I\u2019ll tell you a secret, but keep it to yourself!' },
      { it: '\u2014 Giulia e Marco si sposano! \u2014 Davvero? Acqua in bocca, non lo sa nessuno.', en: '\u2014 Giulia and Marco are getting married! \u2014 Really? Mum\u2019s the word, nobody knows yet.', reply: { it: '\u2014 Promesso!', en: '\u2014 I promise!' } },
      { it: 'Acqua in bocca su questa faccenda, ok?', en: 'Keep quiet about this matter, ok?' },
    ],
    situations: [
      'Sharing gossip and asking for discretion.',
      'Telling someone confidential news.',
      'Playfully warning a friend not to blab.',
    ],
    tags: ['secrecy', 'water-metaphor', 'playful', 'conversational'],
  },
  {
    idiom: 'Essere in gamba',
    pronunciation: '/ˈes.se.re in ˈɡam.ba/',
    syllables: 'es \u00b7 se \u00b7 re \u00b7 in \u00b7 gam \u00b7 ba',
    literal: '\u201CTo be in leg\u201D',
    actual: 'To be capable, smart, on the ball. A genuine compliment about someone\u2019s competence.',
    register: 'Informal \u00b7 Complimentary',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From the idea that someone who is "on their legs" is standing strong, capable, and ready for action \u2014 as opposed to lying down or stumbling.',
    examples: [
      { it: 'Il nostro nuovo collega \u00E8 davvero in gamba.', en: 'Our new colleague is really sharp.' },
      { it: '\u2014 Come \u00E8 il tuo professore? \u2014 \u00C8 molto in gamba, spiega benissimo.', en: '\u2014 How\u2019s your teacher? \u2014 Very capable, explains things perfectly.' },
      { it: 'Quella ragazza \u00E8 in gamba, far\u00E0 strada.', en: 'That girl is really capable, she\u2019ll go far.' },
    ],
    situations: [
      'Complimenting a coworker\u2019s skills.',
      'Recommending someone for a task.',
      'Describing someone who impressed you.',
    ],
    tags: ['compliment', 'body-metaphor', 'daily', 'positive'],
  },
  {
    idiom: 'Fare il furbo',
    pronunciation: '/ˈfa.re il ˈfur.bo/',
    syllables: 'fa \u00b7 re \u00b7 il \u00b7 fur \u00b7 bo',
    literal: '\u201CTo play the clever one\u201D',
    actual: 'To try to be sly or get away with something. Often used as a warning: don\u2019t try to outsmart me.',
    register: 'Informal \u00b7 Warning / Disapproving',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'The concept of "furbizia" (cunning) is deeply embedded in Italian culture. Being "furbo" can be admired or criticized depending on context \u2014 but "fare il furbo" almost always implies someone is pushing their luck.',
    examples: [
      { it: 'Non fare il furbo con me!', en: 'Don\u2019t try to be clever with me!' },
      { it: 'Ha provato a fare il furbo alla dogana e l\u2019hanno fermato.', en: 'He tried to be sneaky at customs and they stopped him.', reply: { it: '\u2014 Se lo meritava.', en: '\u2014 He deserved it.' } },
      { it: 'Smettila di fare il furbo e paga il conto.', en: 'Stop trying to weasel out of it and pay the bill.' },
    ],
    situations: [
      'Warning someone not to cheat or cut corners.',
      'Describing someone who tried to game the system.',
      'A parent scolding a child for being sneaky.',
    ],
    tags: ['warning', 'cunning', 'character', 'conversational'],
  },
  {
    idiom: 'Avere la botte piena e la moglie ubriaca',
    pronunciation: '/aˈve.re la ˈbot.te ˈpje.na e la ˈmoʎ.ʎe uˈbrja.ka/',
    syllables: 'a \u00b7 ve \u00b7 re \u00b7 la \u00b7 bot \u00b7 te \u00b7 pie \u00b7 na \u00b7 e \u00b7 la \u00b7 mo \u00b7 glie \u00b7 u \u00b7 bria \u00b7 ca',
    literal: '\u201CTo have the barrel full and the wife drunk\u201D',
    actual: 'To want to have your cake and eat it too. You can\u2019t keep the wine AND have someone drink it all.',
    register: 'Informal \u00b7 Witty',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A classic proverb about contradictory desires. If your wife has drunk all the wine, the barrel can\u2019t also be full. Used when someone wants two mutually exclusive things.',
    examples: [
      { it: 'Vuoi risparmiare ma anche comprare tutto \u2014 non puoi avere la botte piena e la moglie ubriaca.', en: 'You want to save money but also buy everything \u2014 you can\u2019t have it both ways.' },
      { it: '\u2014 Voglio lavorare meno e guadagnare di pi\u00F9.', en: '\u2014 I want to work less and earn more.', reply: { it: '\u2014 La botte piena e la moglie ubriaca, eh?', en: '\u2014 Having your cake and eating it, huh?' } },
      { it: 'In politica cercano sempre di avere la botte piena e la moglie ubriaca.', en: 'In politics they always try to have it both ways.' },
    ],
    situations: [
      'Someone wants contradictory outcomes.',
      'Criticizing unrealistic expectations.',
      'Pointing out a logical impossibility in someone\u2019s plan.',
    ],
    tags: ['contradiction', 'wine-metaphor', 'proverb', 'witty'],
  },
  {
    idiom: 'Non tutte le ciambelle riescono col buco',
    pronunciation: '/non ˈtut.te le tʃamˈbɛl.le riˈɛ.ʃo.no kol ˈbu.ko/',
    syllables: 'non \u00b7 tut \u00b7 te \u00b7 le \u00b7 ciam \u00b7 bel \u00b7 le \u00b7 rie \u00b7 sco \u00b7 no \u00b7 col \u00b7 bu \u00b7 co',
    literal: '\u201CNot all donuts come out with a hole\u201D',
    actual: 'Not everything goes as planned. Things don\u2019t always work out perfectly, and that\u2019s okay.',
    register: 'Neutral \u00b7 Consoling',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From actual donut-making: sometimes the dough doesn\u2019t form the hole properly. A gentle, food-based way of accepting imperfection.',
    examples: [
      { it: 'Il progetto non \u00E8 andato come speravo, ma non tutte le ciambelle riescono col buco.', en: 'The project didn\u2019t go as I hoped, but not everything works out.' },
      { it: '\u2014 Ho fallito l\u2019esame.', en: '\u2014 I failed the exam.', reply: { it: '\u2014 Non tutte le ciambelle riescono col buco. Riprova!', en: '\u2014 Not everything goes as planned. Try again!' } },
      { it: 'Pazienza \u2014 non tutte le ciambelle riescono col buco.', en: 'Oh well \u2014 you can\u2019t win them all.' },
    ],
    situations: [
      'Consoling someone after a setback.',
      'Accepting your own failure gracefully.',
      'Philosophical shrug after something doesn\u2019t work out.',
    ],
    tags: ['consolation', 'food-metaphor', 'proverb', 'philosophical'],
  },
  {
    idiom: 'Piove sul bagnato',
    pronunciation: '/ˈpjɔ.ve sul baɲˈɲa.to/',
    syllables: 'pio \u00b7 ve \u00b7 sul \u00b7 ba \u00b7 gna \u00b7 to',
    literal: '\u201CIt rains on the wet\u201D',
    actual: 'When it rains, it pours. Bad luck piles on, or the rich get richer. Things accumulate where they already exist.',
    register: 'Neutral \u00b7 Resigned',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'The simple observation that rain falls on ground that\u2019s already wet \u2014 problems compound, and advantages accumulate for those who already have them.',
    examples: [
      { it: 'Ho perso il lavoro e ora mi si \u00E8 rotta la macchina. Piove sul bagnato.', en: 'I lost my job and now my car broke down. When it rains, it pours.' },
      { it: '\u2014 Ha vinto di nuovo alla lotteria! \u2014 Piove sul bagnato.', en: '\u2014 He won the lottery again! \u2014 The rich get richer.' },
      { it: 'Piove sempre sul bagnato: chi ha gi\u00E0 successo ne ottiene di pi\u00F9.', en: 'It always rains on the wet: those who already have success get more of it.' },
    ],
    situations: [
      'When bad luck keeps piling up.',
      'Observing that advantages compound for the fortunate.',
      'Expressing resigned frustration at unfairness.',
    ],
    tags: ['misfortune', 'weather-metaphor', 'inequality', 'philosophical'],
  },
  {
    idiom: 'Chi dorme non piglia pesci',
    pronunciation: '/ki ˈdɔr.me non ˈpiʎ.ʎa ˈpe.ʃi/',
    syllables: 'chi \u00b7 dor \u00b7 me \u00b7 non \u00b7 pi \u00b7 glia \u00b7 pe \u00b7 sci',
    literal: '\u201CWho sleeps doesn\u2019t catch fish\u201D',
    actual: 'The early bird catches the worm. You snooze, you lose. Action and effort are needed to get results.',
    register: 'Neutral \u00b7 Motivational',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From the lives of fishermen who had to wake before dawn to get the best catch. A proverb praising initiative and hard work.',
    examples: [
      { it: 'Svegliati presto domani \u2014 chi dorme non piglia pesci!', en: 'Wake up early tomorrow \u2014 the early bird catches the worm!' },
      { it: '\u2014 Posso farlo la prossima settimana?', en: '\u2014 Can I do it next week?', reply: { it: '\u2014 Chi dorme non piglia pesci. Fallo ora!', en: '\u2014 You snooze, you lose. Do it now!' } },
      { it: 'Ha trovato l\u2019affare perch\u00E9 si \u00E8 svegliato presto. Chi dorme non piglia pesci.', en: 'He found the deal because he woke up early. The early bird gets the worm.' },
    ],
    situations: [
      'Motivating someone to take action now.',
      'Explaining why early effort pays off.',
      'Gently scolding procrastination.',
    ],
    tags: ['motivation', 'animal-metaphor', 'proverb', 'classic'],
  },
  {
    idiom: 'Meglio tardi che mai',
    pronunciation: '/ˈmɛʎ.ʎo ˈtar.di ke ˈmaj/',
    syllables: 'me \u00b7 glio \u00b7 tar \u00b7 di \u00b7 che \u00b7 mai',
    literal: '\u201CBetter late than never\u201D',
    actual: 'Better late than never. Identical meaning to the English \u2014 it\u2019s better to do something late than not at all.',
    register: 'Neutral \u00b7 Conversational',
    difficulty: 'Beginner (A1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A universal proverb found across many languages, reflecting the simple wisdom that delayed action still beats inaction.',
    examples: [
      { it: '\u2014 Scusa il ritardo! \u2014 Meglio tardi che mai!', en: '\u2014 Sorry I\u2019m late! \u2014 Better late than never!' },
      { it: 'Ha iniziato a studiare a 50 anni. Meglio tardi che mai.', en: 'He started studying at 50. Better late than never.' },
      { it: '\u2014 Finalmente hai risposto alla mia email!', en: '\u2014 You finally replied to my email!', reply: { it: '\u2014 Meglio tardi che mai, no?', en: '\u2014 Better late than never, right?' } },
    ],
    situations: [
      'Someone arrives late but still shows up.',
      'Starting something you\u2019ve been putting off.',
      'Encouraging someone who feels it\u2019s too late to begin.',
    ],
    tags: ['encouragement', 'time', 'proverb', 'universal'],
  },
  {
    idiom: 'Dare buca a qualcuno',
    pronunciation: '/ˈda.re ˈbu.ka a kwalˈku.no/',
    syllables: 'da \u00b7 re \u00b7 bu \u00b7 ca \u00b7 a \u00b7 qual \u00b7 cu \u00b7 no',
    literal: '\u201CTo give a hole to someone\u201D',
    actual: 'To stand someone up. To bail on plans at the last minute without showing up.',
    register: 'Informal \u00b7 Disapproving',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Possibly from billiards, where a "buca" is a pocket \u2014 sinking the ball makes it disappear, just like the person who never shows up.',
    examples: [
      { it: 'Mi ha dato buca ieri sera \u2014 l\u2019ho aspettato per un\u2019ora.', en: 'He stood me up last night \u2014 I waited for an hour.' },
      { it: '\u2014 Viene Anna stasera? \u2014 Boh, spero non ci dia buca.', en: '\u2014 Is Anna coming tonight? \u2014 Who knows, I hope she doesn\u2019t bail on us.', reply: { it: '\u2014 Con lei non si sa mai.', en: '\u2014 With her you never know.' } },
      { it: 'Non darmi buca domani, \u00E8 importante!', en: 'Don\u2019t bail on me tomorrow, it\u2019s important!' },
    ],
    situations: [
      'A friend doesn\u2019t show up to your dinner plans.',
      'Warning someone not to flake on you.',
      'Complaining about being left waiting.',
    ],
    tags: ['reliability', 'social', 'disapproval', 'conversational'],
  },
  {
    idiom: 'Conosco i miei polli',
    pronunciation: '/koˈnos.ko i ˈmjɛ.i ˈpol.li/',
    syllables: 'co \u00b7 no \u00b7 sco \u00b7 i \u00b7 miei \u00b7 pol \u00b7 li',
    literal: '\u201CI know my chickens\u201D',
    actual: 'I know who I\u2019m dealing with. I\u2019m not naive about the people in question \u2014 I know their tricks.',
    register: 'Informal \u00b7 Savvy',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A farmer knows each of their chickens by behavior and personality. Extended to mean you know the people around you well enough not to be fooled.',
    examples: [
      { it: 'Non ti preoccupare, conosco i miei polli \u2014 so come gestirli.', en: 'Don\u2019t worry, I know who I\u2019m dealing with \u2014 I know how to handle them.' },
      { it: '\u2014 Pensi che ci stia mentendo? \u2014 Conosco i miei polli.', en: '\u2014 Think he\u2019s lying to us? \u2014 I know my chickens.', reply: { it: '\u2014 Allora teniamo gli occhi aperti.', en: '\u2014 Then let\u2019s keep our eyes open.' } },
      { it: 'Mia nonna diceva sempre: conosco i miei polli.', en: 'My grandmother always said: I know who I\u2019m dealing with.' },
    ],
    situations: [
      'When you\u2019re not fooled by someone\u2019s act.',
      'Showing that you understand people\u2019s true nature.',
      'Reassuring someone that you\u2019ve got the situation handled.',
    ],
    tags: ['wisdom', 'animal-metaphor', 'savvy', 'conversational'],
  },
  {
    idiom: 'Avere il pollice verde',
    pronunciation: '/aˈve.re il ˈpol.li.tʃe ˈver.de/',
    syllables: 'a \u00b7 ve \u00b7 re \u00b7 il \u00b7 pol \u00b7 li \u00b7 ce \u00b7 ver \u00b7 de',
    literal: '\u201CTo have the green thumb\u201D',
    actual: 'To have a green thumb \u2014 to be naturally good at gardening and growing plants.',
    register: 'Neutral \u00b7 Conversational',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Shared with English, from the observation that people good with plants often have green-stained hands from working in the soil.',
    examples: [
      { it: 'Mia madre ha il pollice verde \u2014 il suo giardino \u00E8 bellissimo.', en: 'My mother has a green thumb \u2014 her garden is beautiful.' },
      { it: 'Io non ho il pollice verde, mi muoiono tutte le piante.', en: 'I don\u2019t have a green thumb, all my plants die.', reply: { it: '\u2014 Prova con un cactus!', en: '\u2014 Try a cactus!' } },
      { it: 'Per avere un orto cos\u00EC ci vuole il pollice verde.', en: 'To have a vegetable garden like that you need a green thumb.' },
    ],
    situations: [
      'Complimenting someone\u2019s beautiful garden.',
      'Joking about your own inability to keep plants alive.',
      'Discussing gardening as a hobby.',
    ],
    tags: ['gardening', 'color-metaphor', 'hobby', 'conversational'],
  },
  {
    idiom: 'Mettere le corna',
    pronunciation: '/ˈmet.te.re le ˈkor.na/',
    syllables: 'met \u00b7 te \u00b7 re \u00b7 le \u00b7 cor \u00b7 na',
    literal: '\u201CTo put the horns\u201D',
    actual: 'To cheat on your partner. "Le corna" (the horns) are the universal Italian symbol for infidelity.',
    register: 'Informal \u00b7 Gossipy',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Ancient symbol: the horns of a cuckold. In Italian culture, the hand gesture of horns (index and pinky extended) can refer to infidelity or ward off bad luck, depending on context.',
    examples: [
      { it: 'Ha scoperto che lei gli metteva le corna da mesi.', en: 'He found out she\u2019d been cheating on him for months.' },
      { it: '\u2014 Sai che Marco ha messo le corna a Giulia?', en: '\u2014 Did you know Marco cheated on Giulia?', reply: { it: '\u2014 No! Che brutto.', en: '\u2014 No! How awful.' } },
      { it: 'In quel film il marito mette le corna alla moglie con la vicina.', en: 'In that movie the husband cheats on his wife with the neighbor.' },
    ],
    situations: [
      'Gossiping about relationship drama.',
      'Discussing a movie or book plot.',
      'Talking about trust and loyalty.',
    ],
    tags: ['relationships', 'gossip', 'body-metaphor', 'drama'],
  },
  {
    idiom: 'Tutto fa brodo',
    pronunciation: '/ˈtut.to fa ˈbrɔ.do/',
    syllables: 'tut \u00b7 to \u00b7 fa \u00b7 bro \u00b7 do',
    literal: '\u201CEverything makes broth\u201D',
    actual: 'Every little bit helps. Nothing goes to waste \u2014 even small contributions add up.',
    register: 'Neutral \u00b7 Pragmatic',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From the kitchen: when making broth, you can throw in scraps, bones, ends of vegetables \u2014 everything contributes flavor. Nothing is too small to be useful.',
    examples: [
      { it: 'Ho trovato solo dieci euro, ma tutto fa brodo.', en: 'I only found ten euros, but every little bit helps.' },
      { it: '\u2014 Ho solo mezz\u2019ora per aiutarti. \u2014 Tutto fa brodo, grazie!', en: '\u2014 I only have half an hour to help you. \u2014 Every bit counts, thanks!' },
      { it: 'Il contributo \u00E8 piccolo, ma tutto fa brodo.', en: 'The contribution is small, but it all adds up.' },
    ],
    situations: [
      'Accepting a small but useful contribution.',
      'Encouraging someone whose help seems minor.',
      'Being resourceful with limited ingredients or resources.',
    ],
    tags: ['resourcefulness', 'food-metaphor', 'pragmatic', 'positive'],
  },
  {
    idiom: 'Tirare il pacco',
    pronunciation: '/tiˈra.re il ˈpak.ko/',
    syllables: 'ti \u00b7 ra \u00b7 re \u00b7 il \u00b7 pac \u00b7 co',
    literal: '\u201CTo pull the package\u201D',
    actual: 'To stand someone up or bail on plans. Similar to "dare buca" but more Southern Italian in flavor.',
    register: 'Informal \u00b7 Neapolitan influence',
    difficulty: 'Intermediate (B1)',
    region: 'Southern Italian origin \u00b7 spreading nationally',
    origin: 'From Neapolitan slang. The "pacco" (package) was a scam \u2014 you\u2019d pay for a package that turned out to be empty. So "tirare il pacco" means delivering on nothing.',
    examples: [
      { it: 'Mi hanno tirato il pacco, non si sono presentati.', en: 'They stood me up, they didn\u2019t show.' },
      { it: '\u2014 Stasera viene Luca? \u2014 Speriamo non ci tiri il pacco.', en: '\u2014 Is Luca coming tonight? \u2014 Hopefully he won\u2019t bail on us.', reply: { it: '\u2014 Con Luca \u00E8 sempre un\u2019incognita.', en: '\u2014 With Luca it\u2019s always a question mark.' } },
      { it: 'Non tirarmi il pacco domani, ti prego!', en: 'Don\u2019t flake on me tomorrow, please!' },
    ],
    situations: [
      'When friends bail on weekend plans.',
      'Warning a flaky friend before making plans.',
      'Complaining about being left hanging.',
    ],
    tags: ['reliability', 'southern', 'social', 'slang'],
  },
  {
    idiom: 'Rompere le scatole',
    pronunciation: '/ˈrom.pe.re le ˈska.to.le/',
    syllables: 'rom \u00b7 pe \u00b7 re \u00b7 le \u00b7 sca \u00b7 to \u00b7 le',
    literal: '\u201CTo break the boxes\u201D',
    actual: 'To annoy someone, to be a nuisance. A polite version of a ruder expression with similar meaning.',
    register: 'Informal \u00b7 Annoyed',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A euphemism for a more vulgar expression. "Scatole" (boxes) replaces a body part. Very widely used because it\u2019s colorful but not too rude.',
    examples: [
      { it: 'Smettila di rompermi le scatole!', en: 'Stop bugging me!' },
      { it: 'Quel vicino mi rompe sempre le scatole con la musica alta.', en: 'That neighbor always annoys me with loud music.', reply: { it: '\u2014 Hai provato a parlargli?', en: '\u2014 Have you tried talking to him?' } },
      { it: 'Non rompere le scatole, sto lavorando.', en: 'Don\u2019t bother me, I\u2019m working.' },
    ],
    situations: [
      'A sibling won\u2019t leave you alone.',
      'A coworker keeps interrupting you.',
      'Any situation where someone is being a pest.',
    ],
    tags: ['annoyance', 'euphemism', 'daily', 'conversational'],
  },
  {
    idiom: 'Tra il dire e il fare c\u2019\u00E8 di mezzo il mare',
    pronunciation: '/tra il ˈdi.re e il ˈfa.re tʃɛ di ˈmɛd.dzo il ˈma.re/',
    syllables: 'tra \u00b7 il \u00b7 di \u00b7 re \u00b7 e \u00b7 il \u00b7 fa \u00b7 re \u00b7 c\u2019\u00E8 \u00b7 di \u00b7 mez \u00b7 zo \u00b7 il \u00b7 ma \u00b7 re',
    literal: '\u201CBetween saying and doing, there\u2019s the sea in between\u201D',
    actual: 'Easier said than done. There\u2019s a vast gap between talking about something and actually doing it.',
    register: 'Neutral \u00b7 Wise',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A proverb highlighting the Mediterranean sea as the ultimate obstacle \u2014 a poetic way of saying that execution is far harder than intention.',
    examples: [
      { it: 'Dice che vuole correre una maratona, ma tra il dire e il fare c\u2019\u00E8 di mezzo il mare.', en: 'He says he wants to run a marathon, but easier said than done.' },
      { it: '\u2014 Quest\u2019anno cambio vita! \u2014 Tra il dire e il fare c\u2019\u00E8 di mezzo il mare.', en: '\u2014 This year I\u2019m changing my life! \u2014 Easier said than done.', reply: { it: '\u2014 Hai ragione, ma ci provo.', en: '\u2014 You\u2019re right, but I\u2019ll try.' } },
      { it: 'Il piano \u00E8 bello, ma tra il dire e il fare...', en: 'The plan is great, but between the saying and the doing...' },
    ],
    situations: [
      'When someone makes big promises they may not keep.',
      'Tempering unrealistic New Year\u2019s resolutions.',
      'Acknowledging that planning is the easy part.',
    ],
    tags: ['wisdom', 'sea-metaphor', 'proverb', 'classic'],
  },
  {
    idiom: 'Avere un chiodo fisso',
    pronunciation: '/aˈve.re un ˈkjɔ.do ˈfis.so/',
    syllables: 'a \u00b7 ve \u00b7 re \u00b7 un \u00b7 chio \u00b7 do \u00b7 fis \u00b7 so',
    literal: '\u201CTo have a fixed nail\u201D',
    actual: 'To be obsessed with something. To have one thing constantly on your mind that you can\u2019t shake.',
    register: 'Informal \u00b7 Conversational',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A nail hammered firmly into a wall stays there permanently. An obsessive thought is like that nail \u2014 fixed, immovable, always present.',
    examples: [
      { it: 'Quella ragazza \u00E8 diventata un chiodo fisso per lui.', en: 'That girl has become an obsession for him.' },
      { it: '\u2014 Parla sempre di quel viaggio. \u2014 \u00C8 un chiodo fisso.', en: '\u2014 He always talks about that trip. \u2014 It\u2019s an obsession.' },
      { it: 'Ho un chiodo fisso: voglio imparare a suonare il piano.', en: 'I\u2019m fixated on one thing: I want to learn to play piano.', reply: { it: '\u2014 Allora inizia!', en: '\u2014 Then start!' } },
    ],
    situations: [
      'Describing someone\u2019s single-minded focus.',
      'Talking about a crush that won\u2019t go away.',
      'Acknowledging your own recurring thought.',
    ],
    tags: ['obsession', 'object-metaphor', 'psychology', 'conversational'],
  },
  {
    idiom: 'Fare le ore piccole',
    pronunciation: '/ˈfa.re le ˈo.re ˈpik.ko.le/',
    syllables: 'fa \u00b7 re \u00b7 le \u00b7 o \u00b7 re \u00b7 pic \u00b7 co \u00b7 le',
    literal: '\u201CTo make the small hours\u201D',
    actual: 'To stay up very late / into the wee hours. The "small hours" are 1am, 2am, 3am...',
    register: 'Informal \u00b7 Conversational',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'The "ore piccole" (small hours) are the single-digit hours of the morning. Staying awake until these hours means a very late night.',
    examples: [
      { it: 'Ieri sera abbiamo fatto le ore piccole.', en: 'Last night we stayed up until the wee hours.' },
      { it: '\u2014 Perch\u00E9 sei cos\u00EC stanco? \u2014 Ho fatto le ore piccole per finire il progetto.', en: '\u2014 Why are you so tired? \u2014 I was up until the early hours finishing the project.' },
      { it: 'Da studente facevo sempre le ore piccole.', en: 'As a student I always stayed up super late.', reply: { it: '\u2014 Anch\u2019io, bei tempi!', en: '\u2014 Me too, good times!' } },
    ],
    situations: [
      'Explaining why you\u2019re tired the next day.',
      'Describing a great night out.',
      'Talking about pulling an all-nighter for work or study.',
    ],
    tags: ['time', 'nightlife', 'daily', 'conversational'],
  },
  {
    idiom: 'Mettere una pulce nell\u2019orecchio',
    pronunciation: '/ˈmet.te.re ˈu.na ˈpul.tʃe nelˈlo.ˈrek.kjo/',
    syllables: 'met \u00b7 te \u00b7 re \u00b7 u \u00b7 na \u00b7 pul \u00b7 ce \u00b7 nell\u2019o \u00b7 rec \u00b7 chio',
    literal: '\u201CTo put a flea in someone\u2019s ear\u201D',
    actual: 'To plant a seed of doubt or suspicion in someone\u2019s mind. To make someone start thinking about something.',
    register: 'Neutral \u00b7 Conversational',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A flea in your ear would be impossible to ignore \u2014 it would buzz and irritate constantly. Similarly, once a suspicion is planted, you can\u2019t stop thinking about it.',
    examples: [
      { it: 'Mi ha messo una pulce nell\u2019orecchio e ora non riesco a smettere di pensarci.', en: 'He planted a seed of doubt and now I can\u2019t stop thinking about it.' },
      { it: '\u2014 Non \u00E8 che ti sta mentendo? \u2014 Non mettermi pulci nell\u2019orecchio!', en: '\u2014 What if he\u2019s lying to you? \u2014 Don\u2019t plant ideas in my head!' },
      { it: 'Quella domanda mi ha messo la pulce nell\u2019orecchio.', en: 'That question planted a seed of suspicion.', reply: { it: '\u2014 E cosa hai scoperto?', en: '\u2014 And what did you find out?' } },
    ],
    situations: [
      'When a comment makes you suspicious about something.',
      'Warning someone not to create doubt.',
      'Describing how gossip started nagging thoughts.',
    ],
    tags: ['suspicion', 'insect-metaphor', 'psychology', 'conversational'],
  },
  {
    idiom: 'Cadere dalle nuvole',
    pronunciation: '/kaˈde.re ˈdal.le ˈnu.vo.le/',
    syllables: 'ca \u00b7 de \u00b7 re \u00b7 dal \u00b7 le \u00b7 nu \u00b7 vo \u00b7 le',
    literal: '\u201CTo fall from the clouds\u201D',
    actual: 'To be completely shocked or taken by surprise. To be oblivious to something everyone else knew.',
    register: 'Informal \u00b7 Conversational',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'Someone who "falls from the clouds" was up in the sky, totally unaware of what was happening on the ground below.',
    examples: [
      { it: 'Quando gli hanno detto del divorzio, \u00E8 caduto dalle nuvole.', en: 'When they told him about the divorce, he was completely shocked.' },
      { it: '\u2014 Non sapevi che si erano lasciati? \u2014 No, cado dalle nuvole!', en: '\u2014 You didn\u2019t know they broke up? \u2014 No, I\u2019m stunned!', reply: { it: '\u2014 Ma dove vivi?!', en: '\u2014 Where have you been?!' } },
      { it: 'Non fare finta di cadere dalle nuvole, lo sapevi benissimo.', en: 'Don\u2019t pretend to be surprised, you knew perfectly well.' },
    ],
    situations: [
      'Finding out news everyone else already knew.',
      'Being genuinely shocked by unexpected information.',
      'Accusing someone of fake surprise.',
    ],
    tags: ['surprise', 'weather-metaphor', 'daily', 'conversational'],
  },
  {
    idiom: 'Avere la coda di paglia',
    pronunciation: '/aˈve.re la ˈko.da di ˈpaʎ.ʎa/',
    syllables: 'a \u00b7 ve \u00b7 re \u00b7 la \u00b7 co \u00b7 da \u00b7 di \u00b7 pa \u00b7 glia',
    literal: '\u201CTo have a straw tail\u201D',
    actual: 'To have a guilty conscience. When you\u2019re touchy because you know you\u2019ve done something wrong.',
    register: 'Informal \u00b7 Accusatory',
    difficulty: 'Intermediate (B1)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'From a fable where a fox lost its tail and had a straw replacement. The fake tail could catch fire easily, making the fox nervous and defensive. Like someone with a guilty secret.',
    examples: [
      { it: 'Perch\u00E9 ti arrabbi? Hai la coda di paglia?', en: 'Why are you getting angry? Guilty conscience?' },
      { it: 'Chi ha la coda di paglia si offende facilmente.', en: 'Those with a guilty conscience get offended easily.' },
      { it: '\u2014 Non ho fatto niente! \u2014 Nessuno ti ha accusato. Coda di paglia?', en: '\u2014 I didn\u2019t do anything! \u2014 Nobody accused you. Guilty much?', reply: { it: '\u2014 Mmh, forse hai ragione.', en: '\u2014 Hmm, maybe you\u2019re right.' } },
    ],
    situations: [
      'Someone gets defensive for no apparent reason.',
      'Catching a person overreacting to a neutral comment.',
      'Teasing someone who clearly has something to hide.',
    ],
    tags: ['guilt', 'animal-metaphor', 'psychology', 'accusatory'],
  },
  {
    idiom: 'Prendere in giro',
    pronunciation: '/ˈpren.de.re in ˈdʒi.ro/',
    syllables: 'pren \u00b7 de \u00b7 re \u00b7 in \u00b7 gi \u00b7 ro',
    literal: '\u201CTo take for a spin\u201D',
    actual: 'To make fun of someone or to pull someone\u2019s leg. Can be playful teasing or mean-spirited mocking.',
    register: 'Informal \u00b7 Varies by context',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 very common all over',
    origin: 'The "giro" (spin/turn) suggests leading someone around in circles \u2014 making them the butt of a joke or stringing them along.',
    examples: [
      { it: 'Mi stai prendendo in giro?!', en: 'Are you kidding me?!' },
      { it: 'Non lo prendere in giro, \u00E8 sensibile.', en: 'Don\u2019t make fun of him, he\u2019s sensitive.', reply: { it: '\u2014 Stavo solo scherzando!', en: '\u2014 I was just joking!' } },
      { it: 'Lo prendono sempre in giro per il suo accento.', en: 'They always tease him about his accent.' },
    ],
    situations: [
      'Friendly banter that goes slightly too far.',
      'Asking if someone is joking or serious.',
      'Defending someone being teased.',
    ],
    tags: ['teasing', 'social', 'daily', 'conversational'],
  },
  {
    idiom: 'Essere una buona forchetta',
    pronunciation: '/ˈɛs.se.re ˈu.na ˈbwɔ.na forˈket.ta/',
    syllables: 'es \u00b7 se \u00b7 re \u00b7 u \u00b7 na \u00b7 buo \u00b7 na \u00b7 for \u00b7 chet \u00b7 ta',
    literal: '\u201CTo be a good fork\u201D',
    actual: 'To be a hearty eater, someone who loves food and eats with gusto. A compliment in Italian culture!',
    register: 'Informal \u00b7 Affectionate',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'In a culture that celebrates food, being a "good fork" means you appreciate meals fully. Your fork gets a lot of exercise \u2014 and that\u2019s a good thing.',
    examples: [
      { it: 'Mio nonno era una buona forchetta \u2014 mangiava tre portate a pranzo.', en: 'My grandfather was a hearty eater \u2014 he\u2019d eat three courses at lunch.' },
      { it: '\u2014 Hai gi\u00E0 finito? Sei una buona forchetta!', en: '\u2014 You\u2019re done already? You\u2019re quite the eater!' },
      { it: 'Porta lui al ristorante, \u00E8 una buona forchetta e sapr\u00E0 cosa ordinare.', en: 'Take him to the restaurant, he\u2019s a food lover and will know what to order.', reply: { it: '\u2014 Ottima idea!', en: '\u2014 Great idea!' } },
    ],
    situations: [
      'Complimenting someone\u2019s appetite.',
      'Recommending a food-loving friend as a dining companion.',
      'Describing a family member who loves to eat.',
    ],
    tags: ['food', 'compliment', 'culture', 'affectionate'],
  },
  {
    idiom: 'Bere come una spugna',
    pronunciation: '/ˈbe.re ˈko.me ˈu.na ˈspuɲ.ɲa/',
    syllables: 'be \u00b7 re \u00b7 co \u00b7 me \u00b7 u \u00b7 na \u00b7 spu \u00b7 gna',
    literal: '\u201CTo drink like a sponge\u201D',
    actual: 'To drink excessively, like a fish. To absorb alcohol like a sponge absorbs water.',
    register: 'Informal \u00b7 Critical',
    difficulty: 'Beginner (A2)',
    region: 'Standard Italian \u00b7 common all over',
    origin: 'A sponge absorbs everything it touches. The image is vivid and slightly disgusted \u2014 this person soaks up alcohol indiscriminately.',
    examples: [
      { it: 'Alla festa ha bevuto come una spugna.', en: 'At the party he drank like a fish.' },
      { it: '\u2014 Quante bottiglie ha bevuto? \u2014 Non lo so, beve come una spugna.', en: '\u2014 How many bottles did he drink? \u2014 I don\u2019t know, he drinks like a fish.' },
      { it: 'Da giovane beveva come una spugna, ora beve solo acqua.', en: 'When he was young he drank like a sponge, now he only drinks water.', reply: { it: '\u2014 Bene per lui!', en: '\u2014 Good for him!' } },
    ],
    situations: [
      'Describing someone who drinks too much.',
      'Recounting a wild night out.',
      'Discussing someone\u2019s past habits.',
    ],
    tags: ['drinking', 'object-metaphor', 'critical', 'colloquial'],
  },
];

// ── Deterministic daily rotation ──────────────────────────
// We use the day-of-year to pick an idiom from the dataset.
// The list cycles every IDIOMS.length days (currently 30),
// so you get a full rotation before repeats.

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function formatDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatDateShort(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd} \u00b7 ${mm} \u00b7 ${date.getFullYear()}`;
}

export function getTodayIdiom() {
  const now = new Date();
  const dayOfYear = getDayOfYear(now);
  const index = dayOfYear % IDIOMS.length;
  const idiom = IDIOMS[index];

  return {
    ...idiom,
    date: formatDate(now),
    dateShort: formatDateShort(now),
    dayNumber: dayOfYear,
  };
}

export function getArchive() {
  const now = new Date();
  const dayOfYear = getDayOfYear(now);
  const todayDate = now.getDate();
  const result = [];

  for (let offset = -6; offset <= 2; offset++) {
    const d = new Date(now);
    d.setDate(todayDate + offset);
    const doy = getDayOfYear(d);
    const idx = doy % IDIOMS.length;
    const entry = IDIOMS[idx];
    const isFuture = offset > 0;
    const isToday = offset === 0;

    result.push({
      d: d.getDate(),
      idiom: isFuture ? '\u2014' : entry.idiom,
      gloss: isFuture ? '' : (entry.actual.split('.')[0].substring(0, 30)),
      seen: !isFuture && !isToday,
      today: isToday,
      locked: isFuture,
      fav: false,
    });
  }

  return result;
}
