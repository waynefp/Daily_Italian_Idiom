// High-utility sentence frames. Every sentence is generated from these
// definitions with the grammar helpers, then checked by
// scripts/check-sentences.mjs against a reviewed snapshot.
import { agree, def, di, enA, enThe, indef, noun, place, plural, prep, that, thisOne } from './grammar.js';

export const GROUPS = [
  { id: 'bisogni', it: 'Bisogni', en: 'Needs & wants' },
  { id: 'bar', it: 'Al bar', en: 'Café & restaurant' },
  { id: 'strada', it: 'Per strada', en: 'Getting around' },
  { id: 'negozio', it: 'Nei negozi', en: 'Shopping' },
  { id: 'viaggio', it: 'In viaggio', en: 'Travel' },
  { id: 'gusti', it: 'Gusti', en: 'Likes' },
  { id: 'chiave', it: 'Parole chiave', en: 'Key words' },
];

/** A ready-made slot: Italian, English, plus number for agreement. */
const w = (it, en, o = {}) => ({ it, en, pl: false, ...o });
/** Sentence parts: [before, slot, after] in each language. */
const S = (it, en) => ({ it, en });

// ———— Nouns used in several frames
const N = {
  caffe: noun('caffè', 'm', 'coffee'),
  birra: noun('birra', 'f', 'beer'),
  conto: noun('conto', 'm', 'bill'),
  menu: noun('menù', 'm', 'menu'),
  bagno: noun('bagno', 'm', 'toilet'),
  bagni: plural('bagni', 'm', 'toilets'),
  farmacia: noun('farmacia', 'f', 'pharmacy'),
  biglietto: noun('biglietto', 'm', 'ticket'),
  camera: noun('camera', 'f', 'room'),
  scarpe: plural('scarpe', 'f', 'shoes'),
  occhiali: plural('occhiali da sole', 'm', 'sunglasses'),
  pizza: noun('pizza', 'f', 'pizza', { mass: true }),
  spaghetti: plural('spaghetti', 'm', 'spaghetti'),
  posto: noun('questo posto', 'm', 'this place', { bare: true }),
};

const P = {
  stazione: noun('stazione', 'f', 'station', { to: 'to the station', at: 'at the station' }),
  centro: noun('centro', 'm', 'town centre', { loc: 'in', to: 'to the town centre', at: 'in the town centre' }),
  aeroporto: noun('aeroporto', 'm', 'airport', { to: 'to the airport' }),
  colosseo: noun('Colosseo', 'm', 'Colosseum', { to: 'to the Colosseum' }),
  uffizi: plural('Uffizi', 'm', 'Uffizi', { to: 'to the Uffizi' }),
  stadio: noun('stadio', 'm', 'stadium', { to: 'to the stadium' }),
  sanMarco: noun('Piazza San Marco', 'f', "St Mark's Square", { loc: 'in', to: "to St Mark's Square" }),
  trastevere: noun('Trastevere', 'm', 'Trastevere', { loc: 'a', to: 'to Trastevere' }),
  spiaggia: noun('spiaggia', 'f', 'beach', { loc: 'in', to: 'to the beach' }),
  mare: noun('mare', 'm', 'seaside', { to: 'to the seaside' }),
  montagna: noun('montagna', 'f', 'mountains', { loc: 'in', to: 'to the mountains' }),
  museo: noun('museo', 'm', 'museum', { to: 'to the museum' }),
  casa: noun('casa', 'f', 'home', { loc: 'a', to: 'home', at: 'at home' }),
  albergo: noun('albergo', 'm', 'hotel', { loc: 'in', at: 'at the hotel' }),
  lavoro: noun('lavoro', 'm', 'work', { at: 'at work' }),
  bar: noun('bar', 'm', 'café', { at: 'at the café' }),
  roma: noun('Roma', 'f', 'Rome', { loc: 'a', to: 'to Rome', at: 'in Rome' }),
  firenze: noun('Firenze', 'f', 'Florence', { loc: 'a', to: 'to Florence' }),
  italia: noun('Italia', 'f', 'Italy', { loc: 'in', at: 'in Italy' }),
  medico: noun('medico', 'm', 'doctor', { loc: 'da', at: "at the doctor's" }),
};

const theNoun = (n) => w(n.bare ? n.it : def(n), n.bare ? n.en : enThe(n), { pl: n.pl });
const aNoun = (n) => w(indef(n), enA(n), { pl: n.pl });

// Mi piace / mi piacciono: Italian uses the article where English is generic.
const liked = (n, en) => w(n.bare ? n.it : def(n), en ?? (n.bare ? n.en : n.en), { pl: n.pl });
const likedVerb = (it, en) => w(it, en);

const FRAME_LIST = [
  // ———————————————— Needs & wants
  {
    id: 'non',
    group: 'bisogni',
    pattern: { it: 'Non ___.', en: 'I don’t ___.' },
    tip: 'Non goes straight before the verb (and before lo, ne, ci).',
    items: [
      w('capisco', "I don't understand."),
      w('lo so', "I don't know."),
      w('ho capito', "I didn't catch that."),
      w("parlo bene l'italiano", "I don't speak Italian well."),
      w('ho tempo', "I don't have time."),
      w('posso', "I can't."),
      w('mangio carne', "I don't eat meat."),
      w("c'è problema", 'No problem.'),
    ],
    make: (x) => S(['Non ', x.it, '.'], ['', x.en, '']),
  },
  {
    id: 'puo',
    group: 'bisogni',
    pattern: { it: 'Può ___, per favore?', en: 'Could you ___, please?' },
    tip: 'Può is the polite form for strangers; with friends say Puoi.',
    items: [
      w('ripetere', 'repeat that'),
      w('parlare più piano', 'speak more slowly'),
      w('aiutarmi', 'help me'),
      w('scriverlo', 'write it down'),
      w('aspettare un momento', 'wait a moment'),
      w('chiamare un taxi', 'call a taxi'),
      w('farci una foto', 'take a photo of us'),
    ],
    make: (x) => S(['Può ', x.it, ', per favore?'], ['Could you ', x.en, ', please?']),
  },
  {
    id: 'posso',
    group: 'bisogni',
    pattern: { it: 'Posso ___?', en: 'Can I ___?' },
    items: [
      w('entrare', 'come in'),
      w('sedermi qui', 'sit here'),
      w('fare una foto', 'take a photo'),
      w('chiedere una cosa', 'ask something'),
      w('provarlo', 'try it on'),
      w('usare il bagno', 'use the toilet'),
      w('lasciare la valigia qui', 'leave my suitcase here'),
      w('aprire la finestra', 'open the window'),
    ],
    make: (x) => S(['Posso ', x.it, '?'], ['Can I ', x.en, '?']),
  },
  {
    id: 'bisogno',
    group: 'bisogni',
    pattern: { it: 'Ho bisogno di ___.', en: 'I need ___.' },
    tip: 'di + il becomes del: Ho bisogno del tuo aiuto.',
    items: [
      w('di aiuto', 'help'),
      w(`di ${indef(noun('medico', 'm'))}`, 'a doctor'),
      w(`di ${indef(noun('caffè', 'm'))}`, 'a coffee'),
      w(`di ${indef(noun('pausa', 'f'))}`, 'a break'),
      w('di più tempo', 'more time'),
      w(`di ${indef(noun('taxi', 'm'))}`, 'a taxi'),
      w('di dormire', 'to sleep'),
      w(di(noun('tuo aiuto', 'm')), 'your help'),
    ],
    make: (x) => S(['Ho bisogno ', x.it, '.'], ['I need ', x.en, '.']),
  },
  {
    id: 'voglio',
    group: 'bisogni',
    pattern: { it: 'Voglio ___.', en: 'I want ___.' },
    tip: 'Voglio is direct. Fine with friends; when asking for something in a shop or café, say Vorrei.',
    items: [
      w('andare a casa', 'to go home'),
      w('dormire', 'to sleep'),
      w('vedere il mare', 'to see the sea'),
      w('fare una foto', 'to take a photo'),
      w("imparare l'italiano", 'to learn Italian'),
      w('restare qui ancora un po\'', 'to stay here a bit longer'),
      w('tornare domani', 'to come back tomorrow'),
      w(indef(noun('gelato', 'm')), 'an ice cream'),
    ],
    make: (x) => S(['Voglio ', x.it, '.'], ['I want ', x.en, '.']),
  },
  {
    id: 'voglio-mangiare',
    group: 'bisogni',
    pattern: { it: 'Voglio mangiare ___.', en: 'I want to eat ___.' },
    items: [
      w(indef(noun('pizza', 'f')), 'a pizza'),
      w('qualcosa', 'something'),
      w('qualcosa di leggero', 'something light'),
      w(indef(noun('panino', 'm')), 'a sandwich'),
      w('pesce', 'fish'),
      w(indef(noun('gelato', 'm')), 'an ice cream'),
      w('qualcosa di dolce', 'something sweet'),
      w('fuori', 'out'),
    ],
    make: (x) => S(['Voglio mangiare ', x.it, '.'], ['I want to eat ', x.en, '.']),
  },
  {
    id: 'devo',
    group: 'bisogni',
    pattern: { it: 'Devo ___.', en: 'I have to ___.' },
    items: [
      w('andare', 'go'),
      w('andare in bagno', 'go to the toilet'),
      w('lavorare', 'work'),
      w('fare una telefonata', 'make a phone call'),
      w('comprare un biglietto', 'buy a ticket'),
      w('cambiare dei soldi', 'change some money'),
      w('partire domani', 'leave tomorrow'),
      w(`tornare ${place(P.albergo)}`, 'go back to the hotel'),
    ],
    make: (x) => S(['Devo ', x.it, '.'], ['I have to ', x.en, '.']),
  },

  // ———————————————— Café & restaurant
  {
    id: 'vorrei',
    group: 'bar',
    pattern: { it: 'Vorrei ___.', en: 'I’d like ___.' },
    tip: 'Vorrei (I would like) is the polite way to order. Add per favore.',
    items: [
      aNoun(N.caffe),
      aNoun(noun('cappuccino', 'm', 'cappuccino')),
      aNoun(noun('cornetto', 'm', 'croissant')),
      aNoun(noun("spremuta d'arancia", 'f', 'fresh orange juice')),
      aNoun(noun('acqua frizzante', 'f', 'sparkling water')),
      aNoun(N.birra),
      aNoun(noun('bicchiere di vino rosso', 'm', 'glass of red wine')),
      aNoun(noun('tavolo per due', 'm', 'table for two')),
      theNoun(N.conto),
    ],
    make: (x) => S(['Vorrei ', x.it, '.'], ["I'd like ", x.en, '.']),
  },
  {
    id: 'posso-avere',
    group: 'bar',
    pattern: { it: 'Posso avere ___?', en: 'Can I have ___?' },
    items: [
      theNoun(N.conto),
      theNoun(N.menu),
      theNoun(noun('scontrino', 'm', 'receipt')),
      aNoun(noun("bicchiere d'acqua", 'm', 'glass of water')),
      w(di(noun('pane', 'm')), 'some bread'),
      w(di(noun('olio', 'm')), 'some oil'),
      aNoun(noun('forchetta', 'f', 'fork')),
      aNoun(noun('cucchiaino', 'm', 'teaspoon')),
      theNoun(noun('sale', 'm', 'salt')),
    ],
    make: (x) => S(['Posso avere ', x.it, '?'], ['Can I have ', x.en, '?']),
  },
  {
    id: 'per-me',
    group: 'bar',
    pattern: { it: 'Per me ___, grazie.', en: 'I’ll have ___, thanks.' },
    tip: 'The easy way to order at the table. Per me lo stesso = the same for me.',
    items: [
      theNoun(noun('pesce', 'm', 'fish')),
      theNoun(noun('carbonara', 'f', 'carbonara')),
      theNoun(noun('insalata mista', 'f', 'mixed salad')),
      theNoun(plural('gnocchi', 'm', 'gnocchi')),
      theNoun(plural('lasagne', 'f', 'lasagne')),
      aNoun(N.caffe),
      aNoun(noun('birra piccola', 'f', 'small beer')),
      w(def(noun('stesso', 'm')), 'the same'),
    ],
    make: (x) => S(['Per me ', x.it, ', grazie.'], ["I'll have ", x.en, ', thanks.']),
  },
  {
    id: 'avete',
    group: 'bar',
    pattern: { it: 'Avete ___?', en: 'Do you have ___?' },
    tip: 'In questions Italian usually drops “some/any”: Avete piatti vegetariani?',
    items: [
      aNoun(noun('tavolo per due', 'm', 'table for two')),
      aNoun(noun('menù in inglese', 'm', 'menu in English')),
      w(def(noun('wi-fi', 'm')), 'Wi-Fi'),
      w('piatti vegetariani', 'vegetarian dishes'),
      w('qualcosa senza glutine', 'anything gluten-free'),
      w('birra alla spina', 'draught beer'),
      w('latte di soia', 'soy milk'),
      w('dolci fatti in casa', 'homemade desserts'),
    ],
    make: (x) => S(['Avete ', x.it, '?'], ['Do you have ', x.en, '?']),
  },
  {
    id: 'senza',
    group: 'bar',
    pattern: { it: 'Senza ___, per favore.', en: 'No ___, please.' },
    items: [
      w('zucchero', 'sugar'),
      w('ghiaccio', 'ice'),
      w('latte', 'milk'),
      w('cipolla', 'onion'),
      w('formaggio', 'cheese'),
      w('peperoncino', 'chilli'),
      w('sale', 'salt'),
    ],
    make: (x) => S(['Senza ', x.it, ', per favore.'], ['No ', x.en, ', please.']),
  },
  {
    id: 'un-altro',
    group: 'bar',
    pattern: { it: 'Un altro / Un’altra ___, per favore.', en: 'Another ___, please.' },
    tip: 'altro agrees with the noun: un altro caffè, un’altra birra.',
    items: [
      ['caffè', 'm', 'Another coffee'],
      ['birra', 'f', 'Another beer'],
      ['bicchiere di vino', 'm', 'Another glass of wine'],
      ["bottiglia d'acqua", 'f', 'Another bottle of water'],
      ['tovagliolo', 'm', 'Another napkin'],
      ['porzione di patatine', 'f', 'Another portion of fries'],
      ['minuto', 'm', 'One more minute'],
    ].map(([it, g, en]) => {
      const phrase = indef(noun(`${agree('altro', { g, pl: false })} ${it}`, g));
      return w(phrase.charAt(0).toUpperCase() + phrase.slice(1), en);
    }),
    make: (x) => S(['', x.it, ', per favore.'], ['', x.en, ', please.']),
  },

  // ———————————————— Getting around
  {
    id: 'dove',
    group: 'strada',
    pattern: { it: 'Dov’è ___? · Dove sono ___?', en: 'Where is ___? · Where are ___?' },
    tip: 'Dov’è for one thing, Dove sono for more than one.',
    items: [
      theNoun(N.bagno),
      theNoun(P.stazione),
      theNoun(noun('uscita', 'f', 'exit')),
      theNoun(noun("fermata dell'autobus", 'f', 'bus stop')),
      theNoun(noun('ascensore', 'm', 'lift')),
      theNoun(P.centro),
      theNoun(noun('mio zaino', 'm', 'backpack', { enThe: 'my backpack' })),
      theNoun(N.bagni),
      theNoun(plural('chiavi', 'f', 'keys')),
      theNoun(plural('altri', 'm', 'others')),
    ],
    make: (x) =>
      x.pl ? S(['Dove sono ', x.it, '?'], ['Where are ', x.en, '?']) : S(["Dov'è ", x.it, '?'], ['Where is ', x.en, '?']),
  },
  {
    id: 'c-e',
    group: 'strada',
    pattern: { it: 'C’è ___ qui vicino? · Ci sono ___ qui vicino?', en: 'Is there ___ near here?' },
    items: [
      aNoun(N.farmacia),
      aNoun(noun('bancomat', 'm', 'cash machine')),
      aNoun(noun('supermercato', 'm', 'supermarket')),
      aNoun(N.bagno),
      aNoun(noun('ristorante', 'm', 'restaurant')),
      aNoun(noun('fermata della metro', 'f', 'metro stop')),
      aNoun(noun('parcheggio', 'm', 'car park')),
      aNoun(noun('ospedale', 'm', 'hospital')),
      w('negozi', 'any shops', { pl: true }),
    ],
    make: (x) =>
      x.pl
        ? S(['Ci sono ', x.it, ' qui vicino?'], ['Are there ', x.en, ' near here?'])
        : S(["C'è ", x.it, ' qui vicino?'], ['Is there ', x.en, ' near here?']),
  },
  {
    id: 'come-arrivo',
    group: 'strada',
    pattern: { it: 'Come arrivo ___?', en: 'How do I get to ___?' },
    tip: 'a + il = al, a + la = alla, a + l’ = all’, a + gli = agli. Cities take a; in centro, in spiaggia.',
    items: [P.stazione, P.centro, P.aeroporto, P.colosseo, P.uffizi, P.stadio, P.sanMarco, P.trastevere, P.spiaggia].map((p) =>
      w(place(p), p.to.replace(/^to /, '')),
    ),
    make: (x) => S(['Come arrivo ', x.it, '?'], ['How do I get to ', x.en, '?']),
  },
  {
    id: 'sono',
    group: 'strada',
    pattern: { it: 'Sono ___.', en: 'I’m ___.' },
    tip: 'Where you are: a casa, al lavoro, in albergo, a Roma, in Italia, dal medico.',
    items: [P.casa, P.lavoro, P.albergo, P.centro, P.stazione, P.bar, P.roma, P.italia, P.medico].map((p) => w(place(p), p.at)),
    make: (x) => S(['Sono ', x.it, '.'], ["I'm ", x.en, '.']),
  },

  // ———————————————— Shopping
  {
    id: 'quanto-costa',
    group: 'negozio',
    pattern: { it: 'Quanto costa ___? · Quanto costano ___?', en: 'How much is ___? · How much are ___?' },
    tip: 'questo/questa/questi/queste and quel/quell’/quegli agree with the noun.',
    items: [
      w('questo', 'this'),
      w(thisOne(noun('borsa', 'f')), 'this bag'),
      w(that(noun('cappello', 'm')), 'that hat'),
      w(that(noun('ombrello', 'm')), 'that umbrella'),
      w(thisOne(N.scarpe), 'these shoes', { pl: true }),
      w(that(N.occhiali), 'those sunglasses', { pl: true }),
      theNoun(N.biglietto),
      theNoun(N.camera),
      w('un chilo di pomodori', 'a kilo of tomatoes'),
    ],
    make: (x) =>
      x.pl
        ? S(['Quanto costano ', x.it, '?'], ['How much are ', x.en, '?'])
        : S(['Quanto costa ', x.it, '?'], ['How much is ', x.en, '?']),
  },
  {
    id: 'prendo',
    group: 'negozio',
    pattern: { it: 'Prendo ___.', en: 'I’ll take ___.' },
    items: [
      w('questo', 'this one'),
      w('quello', 'that one'),
      w('quello rosso', 'the red one'),
      w('tutti e due', 'both'),
      w('due', 'two'),
      w(def(noun('taglia media', 'f')), 'the medium size'),
      w('un chilo', 'a kilo'),
      w('mezzo chilo', 'half a kilo'),
    ],
    make: (x) => S(['Prendo ', x.it, '.'], ["I'll take ", x.en, '.']),
  },
  {
    id: 'pagare',
    group: 'negozio',
    pattern: { it: 'Posso pagare ___?', en: 'Can I pay ___?' },
    items: [
      w(`con ${def(noun('carta', 'f'))}`, 'by card'),
      w('in contanti', 'in cash'),
      w(`con ${def(noun('bancomat', 'm'))}`, 'with my bank card'),
      w(`con ${def(noun('telefono', 'm'))}`, 'with my phone'),
      w('in euro', 'in euros'),
      w(prep('a', noun('cassa', 'f')), 'at the till'),
      w('dopo', 'later'),
    ],
    make: (x) => S(['Posso pagare ', x.it, '?'], ['Can I pay ', x.en, '?']),
  },
  {
    id: 'cerco',
    group: 'negozio',
    pattern: { it: 'Cerco ___.', en: 'I’m looking for ___.' },
    items: [
      aNoun(noun('regalo', 'm', 'gift')),
      aNoun(noun('borsa', 'f', 'bag')),
      aNoun(noun('ombrello', 'm', 'umbrella')),
      aNoun(noun('zaino', 'm', 'backpack')),
      aNoun(N.farmacia),
      aNoun(noun('caricabatterie', 'm', 'phone charger')),
      aNoun(plural('cartoline', 'f', 'some postcards')),
      aNoun(N.occhiali),
    ],
    make: (x) => S(['Cerco ', x.it, '.'], ["I'm looking for ", x.en, '.']),
  },
  {
    id: 'ce-l-avete',
    group: 'negozio',
    pattern: { it: 'Ce l’avete in ___?', en: 'Do you have it in ___?' },
    items: [
      w('nero', 'black'),
      w('bianco', 'white'),
      w('blu', 'blue'),
      w('rosso', 'red'),
      w('verde', 'green'),
      w(`${indef(noun('taglia più grande', 'f'))}`, 'a bigger size'),
      w(`${indef(noun('taglia più piccola', 'f'))}`, 'a smaller size'),
      w(`${indef(noun('altro colore', 'm'))}`, 'another colour'),
    ],
    make: (x) => S(["Ce l'avete in ", x.it, '?'], ['Do you have it in ', x.en, '?']),
  },
  {
    id: 'troppo-caro',
    group: 'negozio',
    pattern: { it: '___ è troppo caro.', en: '___ is too expensive.' },
    tip: 'caro agrees: caro, cara, cari, care. Plural nouns take sono.',
    items: [
      w('Questo', 'This', { g: 'm' }),
      w('Questa borsa', 'This bag', { g: 'f' }),
      ...[N.camera, N.biglietto, noun('taxi', 'm', 'taxi'), N.scarpe, N.occhiali].map((n) => {
        const it = def(n);
        return w(it.charAt(0).toUpperCase() + it.slice(1), `The ${n.en}`, { g: n.g, pl: n.pl });
      }),
    ],
    make: (x) =>
      S(['', x.it, ` ${x.pl ? 'sono' : 'è'} troppo ${agree('caro', x)}.`], ['', x.en, ` ${x.pl ? 'are' : 'is'} too expensive.`]),
  },

  // ———————————————— Travel
  {
    id: 'biglietto',
    group: 'viaggio',
    pattern: { it: 'Un biglietto per ___, per favore.', en: 'A ticket to ___, please.' },
    items: [
      ['Roma', 'Rome'],
      ['Firenze', 'Florence'],
      ['Venezia', 'Venice'],
      ['Napoli', 'Naples'],
      ['Milano', 'Milan'],
      ['Bologna', 'Bologna'],
      ['Pisa', 'Pisa'],
    ]
      .map(([it, en]) => w(it, en))
      .concat(w(def(P.aeroporto), 'the airport')),
    make: (x) => S(['Un biglietto per ', x.it, ', per favore.'], ['A ticket to ', x.en, ', please.']),
  },
  {
    id: 'a-che-ora',
    group: 'viaggio',
    pattern: { it: 'A che ora ___?', en: 'What time ___?' },
    tip: 'The verb comes before the subject and agrees with it: parte il treno, aprono i negozi.',
    items: [
      ['parte', 'partono', noun('treno', 'm'), 'does the train leave'],
      ['arriva', 'arrivano', noun('autobus', 'm'), 'does the bus arrive'],
      ['apre', 'aprono', noun('museo', 'm'), 'does the museum open'],
      ['chiude', 'chiudono', N.farmacia, 'does the pharmacy close'],
      ['apre', 'aprono', plural('negozi', 'm'), 'do the shops open'],
      ['è', 'sono', noun('colazione', 'f'), 'is breakfast'],
      ['parte', 'partono', noun('volo', 'm'), 'does the flight leave'],
    ].map(([sg, pl, n, en]) => w(`${n.pl ? pl : sg} ${def(n)}`, en)),
    make: (x) => S(['A che ora ', x.it, '?'], ['What time ', x.en, '?']),
  },
  {
    id: 'dove-posso',
    group: 'viaggio',
    pattern: { it: 'Dove posso ___?', en: 'Where can I ___?' },
    items: [
      w('comprare un biglietto', 'buy a ticket'),
      w(`prendere ${def(noun('autobus', 'm'))}`, 'catch the bus'),
      w('prendere un taxi', 'get a taxi'),
      w(`lasciare ${def(plural('bagagli', 'm'))}`, 'leave my luggage'),
      w('cambiare dei soldi', 'change some money'),
      w('noleggiare una bici', 'rent a bike'),
      w('parcheggiare', 'park'),
      w('comprare una SIM', 'buy a SIM card'),
    ],
    make: (x) => S(['Dove posso ', x.it, '?'], ['Where can I ', x.en, '?']),
  },
  {
    id: 'vorrei-andare',
    group: 'viaggio',
    pattern: { it: 'Vorrei andare ___.', en: 'I’d like to go ___.' },
    tip: 'Going and being use the same little words: vado al mare, sono al mare.',
    items: [P.roma, P.firenze, P.mare, P.montagna, P.casa, P.museo, P.spiaggia, P.uffizi].map((p) => w(place(p), p.to)),
    make: (x) => S(['Vorrei andare ', x.it, '.'], ["I'd like to go ", x.en, '.']),
  },
  {
    id: 'prenotazione',
    group: 'viaggio',
    pattern: { it: 'Ho una prenotazione per ___.', en: 'I have a booking for ___.' },
    items: [
      w('due persone', 'two people'),
      w('stasera', 'tonight'),
      w('domani', 'tomorrow'),
      w('tre notti', 'three nights'),
      w('le otto', 'eight o’clock'),
      w(indef(noun('camera doppia', 'f')), 'a double room'),
    ],
    make: (x) => S(['Ho una prenotazione per ', x.it, '.'], ['I have a booking for ', x.en, '.']),
  },

  // ———————————————— Likes
  {
    id: 'mi-piace',
    group: 'gusti',
    pattern: { it: 'Mi piace ___. · Mi piacciono ___.', en: 'I like ___.' },
    tip: 'Literally “___ pleases me”: piace for one thing or an activity, piacciono for plurals. Italian keeps the article (la pizza) where English drops it.',
    items: [
      liked(N.pizza, 'pizza'),
      liked(N.caffe, 'coffee'),
      liked(noun('Italia', 'f'), 'Italy'),
      liked(N.posto),
      likedVerb('cucinare', 'cooking'),
      likedVerb('viaggiare', 'travelling'),
      liked(plural('gatti', 'm'), 'cats'),
      liked(N.spaghetti, 'spaghetti'),
      liked(noun('mare', 'm'), 'the sea'),
    ],
    make: (x) => S([x.pl ? 'Mi piacciono ' : 'Mi piace ', x.it, '.'], ['I like ', x.en, '.']),
  },
  {
    id: 'non-mi-piace',
    group: 'gusti',
    pattern: { it: 'Non mi piace ___. · Non mi piacciono ___.', en: 'I don’t like ___.' },
    items: [
      liked(noun('pesce', 'm'), 'fish'),
      liked(N.birra, 'beer'),
      likedVerb('aspettare', 'waiting'),
      liked(noun('freddo', 'm'), 'the cold'),
      liked(plural('funghi', 'm'), 'mushrooms'),
      liked(plural('cipolle', 'f'), 'onions'),
      w('questa musica', 'this music'),
      likedVerb('alzarmi presto', 'getting up early'),
    ],
    make: (x) => S([x.pl ? 'Non mi piacciono ' : 'Non mi piace ', x.it, '.'], ["I don't like ", x.en, '.']),
  },
  {
    id: 'ti-piace',
    group: 'gusti',
    pattern: { it: 'Ti piace ___? · Ti piacciono ___?', en: 'Do you like ___?' },
    items: [
      liked(noun('calcio', 'm'), 'football'),
      liked(noun('musica italiana', 'f'), 'Italian music'),
      likedVerb('cucinare', 'cooking'),
      liked(noun('vino rosso', 'm'), 'red wine'),
      w('Roma', 'Rome'),
      liked(plural('cani', 'm'), 'dogs'),
      liked(plural('olive', 'f'), 'olives'),
      liked(N.posto),
    ],
    make: (x) => S([x.pl ? 'Ti piacciono ' : 'Ti piace ', x.it, '?'], ['Do you like ', x.en, '?']),
  },
  {
    id: 'buonissimo',
    group: 'gusti',
    pattern: { it: '___ è buonissimo!', en: '___ is delicious!' },
    tip: 'buonissimo agrees: buonissimo, buonissima, buonissimi, buonissime.',
    items: [
      [noun('caffè', 'm'), 'The coffee'],
      [noun('pizza', 'f'), 'The pizza'],
      [noun('gelato', 'm'), 'The ice cream'],
      [noun('pasta', 'f'), 'The pasta'],
      [plural('pomodori', 'm'), 'The tomatoes'],
      [plural('olive', 'f'), 'The olives'],
      [plural('cornetti', 'm'), 'The croissants'],
    ]
      .map(([n, en]) => {
        const it = def(n);
        return w(it.charAt(0).toUpperCase() + it.slice(1), en, { g: n.g, pl: n.pl });
      })
      .concat(w('Questo vino', 'This wine', { g: 'm' })),
    make: (x) =>
      S(['', x.it, ` ${x.pl ? 'sono' : 'è'} ${agree('buonissimo', x)}!`], ['', x.en, ` ${x.pl ? 'are' : 'is'} delicious!`]),
  },

  // ———————————————— Key words (from the top-200 “Key 8”)
  {
    id: 'anche',
    group: 'chiave',
    pattern: { it: 'Anche ___.', en: '___ too.' },
    tip: 'Anche a me answers mi piace: “I like it too.”',
    items: [
      w('io', 'Me'),
      w('tu', 'You'),
      w('lei', 'Her'),
      w('noi', 'Us'),
      w('a me', 'Me', { post: ' too (I like it too).' }),
      w('oggi', 'Today'),
      w('domani', 'Tomorrow'),
    ],
    make: (x) => S(['Anche ', x.it, '.'], ['', x.en, x.post ?? ' too.']),
  },
  {
    id: 'niente-di',
    group: 'chiave',
    pattern: { it: 'Niente di ___.', en: 'Nothing ___.' },
    items: [
      w('nuovo', 'new'),
      w('speciale', 'special'),
      w('grave', 'serious'),
      w('male', 'wrong with that'),
      w('strano', 'strange'),
      w('importante', 'important'),
    ],
    make: (x) => S(['Niente di ', x.it, '.'], ['Nothing ', x.en, '.']),
  },
  {
    id: 'ancora',
    group: 'chiave',
    pattern: { it: 'Ancora ___.', en: 'Still / more / again ___.' },
    tip: 'ancora = still, more or again, depending on what follows.',
    items: [
      w("un po'", 'A little more.', { end: '.' }),
      w('una volta', 'One more time.', { end: '.' }),
      w('cinque minuti', 'Five more minutes.', { end: '.' }),
      w('qui', 'Still here?', { end: '?' }),
      w('niente', 'Still nothing.', { end: '.' }),
      w(indef(N.caffe), 'Another coffee?', { end: '?' }),
    ],
    make: (x) => S(['Ancora ', x.it, x.end], ['', x.en, '']),
  },
  {
    id: 'ne-ho',
    group: 'chiave',
    pattern: { it: 'Ne ho ___.', en: 'I have ___ (of them).' },
    tip: 'ne means “of it / of them”. Italian needs it where English leaves it out.',
    items: [
      w('uno', 'I have one.'),
      w('due', 'I have two.'),
      w('tre', 'I have three.'),
      w('tanti', 'I have lots.'),
      w('abbastanza', 'I have enough.'),
      w('bisogno', 'I need it.'),
    ],
    make: (x) => S(['Ne ho ', x.it, '.'], ['', x.en, '']),
  },
  {
    id: 'allora',
    group: 'chiave',
    pattern: { it: 'Allora, ___.', en: 'So / well then, ___.' },
    items: [
      w('andiamo', "So, let's go.", { end: '.' }),
      w('va bene', 'OK then.', { end: '.' }),
      w('a domani', 'See you tomorrow, then.', { end: '.' }),
      w('ci vediamo dopo', 'See you later, then.', { end: '.' }),
      w('che facciamo', 'So, what shall we do?', { end: '?' }),
      w('come stai', 'So, how are you?', { end: '?' }),
    ],
    make: (x) => S(['Allora, ', x.it, x.end], ['', x.en, '']),
  },
  {
    id: 'cosi',
    group: 'chiave',
    pattern: { it: '___ così.', en: 'Like this / so ___.' },
    items: [
      w('Va bene', "That's fine as it is."),
      w('Basta', "That's enough."),
      w('Così', 'So-so.'),
      w('Proprio', 'Exactly.'),
      w('Meglio', 'Better that way.'),
      w('Non fare', "Don't be like that."),
    ],
    make: (x) => S(['', x.it, ' così.'], ['', x.en, '']),
  },
];

const pretty = (s) => s.replace(/'/g, '’');

/** All frames with every sentence precomputed. */
export const FRAMES = FRAME_LIST.map((f, index) => {
  const sentences = f.items.map((item, i) => {
    const { it, en } = f.make(item);
    return {
      id: `${f.id}.${i}`,
      frame: f.id,
      raw: { it: it.join(''), en: en.join('') },
      it: it.map(pretty),
      en: en.map(pretty),
      text: pretty(it.join('')),
      english: pretty(en.join('')),
    };
  });
  return { id: f.id, group: f.group, index, pattern: f.pattern, tip: f.tip, sentences };
});

export const FRAME_BY_ID = new Map(FRAMES.map((f) => [f.id, f]));
export const SENTENCE_COUNT = FRAMES.reduce((n, f) => n + f.sentences.length, 0);
