import type { Station } from '@/stores/sessionStore';

// Metro line colors
export const METRO_LINE_COLORS: Record<string, string> = {
  '1': '#FFCD00',
  '2': '#003CA6',
  '3': '#837902',
  '3bis': '#6EC4E8',
  '4': '#CF009E',
  '5': '#FF7E2E',
  '6': '#6ECA97',
  '7': '#FA9ABA',
  '7bis': '#6ECA97',
  '8': '#E19BDF',
  '9': '#B6BD00',
  '10': '#C9910D',
  '11': '#704B1C',
  '12': '#007852',
  '13': '#6EC4E8',
  '14': '#62259D',
  'RER A': '#F7403A',
  'RER B': '#4B92DB',
  'RER C': '#F3D311',
  'RER D': '#5E9B41',
  'RER E': '#DE81D3'
};

// Paris Metro and RER stations
export const stations: Station[] = [
  // Line 1
  { id: 'la-defense', name: 'La Défense', coordinates: { lat: 48.8920, lng: 2.2380 }, lines: ['1', 'RER A'], walkingTimeMinutes: 3 },
  { id: 'esplanade-defense', name: 'Esplanade de La Défense', coordinates: { lat: 48.8880, lng: 2.2500 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'pont-neuilly', name: 'Pont de Neuilly', coordinates: { lat: 48.8850, lng: 2.2590 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'les-sablons', name: 'Les Sablons', coordinates: { lat: 48.8810, lng: 2.2720 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'porte-maillot', name: 'Porte Maillot', coordinates: { lat: 48.8780, lng: 2.2820 }, lines: ['1', 'RER C'], walkingTimeMinutes: 3 },
  { id: 'argentine', name: 'Argentine', coordinates: { lat: 48.8760, lng: 2.2890 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'charles-de-gaulle-etoile', name: 'Charles de Gaulle - Étoile', coordinates: { lat: 48.8740, lng: 2.2950 }, lines: ['1', '2', '6', 'RER A'], walkingTimeMinutes: 4 },
  { id: 'george-v', name: 'George V', coordinates: { lat: 48.8720, lng: 2.3010 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'franklin-roosevelt', name: 'Franklin D. Roosevelt', coordinates: { lat: 48.8690, lng: 2.3100 }, lines: ['1', '9'], walkingTimeMinutes: 3 },
  { id: 'champs-elysees-clemenceau', name: 'Champs-Élysées - Clemenceau', coordinates: { lat: 48.8680, lng: 2.3140 }, lines: ['1', '13'], walkingTimeMinutes: 2 },
  { id: 'concorde', name: 'Concorde', coordinates: { lat: 48.8660, lng: 2.3210 }, lines: ['1', '8', '12'], walkingTimeMinutes: 3 },
  { id: 'tuileries', name: 'Tuileries', coordinates: { lat: 48.8640, lng: 2.3290 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'palais-royal', name: 'Palais Royal - Musée du Louvre', coordinates: { lat: 48.8620, lng: 2.3370 }, lines: ['1', '7'], walkingTimeMinutes: 3 },
  { id: 'louvre-rivoli', name: 'Louvre - Rivoli', coordinates: { lat: 48.8610, lng: 2.3410 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'chatelet', name: 'Châtelet', coordinates: { lat: 48.8590, lng: 2.3470 }, lines: ['1', '4', '7', '11', '14', 'RER A', 'RER B', 'RER D'], walkingTimeMinutes: 5 },
  { id: 'hotel-de-ville', name: 'Hôtel de Ville', coordinates: { lat: 48.8570, lng: 2.3520 }, lines: ['1', '11'], walkingTimeMinutes: 2 },
  { id: 'saint-paul', name: 'Saint-Paul', coordinates: { lat: 48.8550, lng: 2.3610 }, lines: ['1'], walkingTimeMinutes: 2 },
  { id: 'bastille', name: 'Bastille', coordinates: { lat: 48.8530, lng: 2.3690 }, lines: ['1', '5', '8'], walkingTimeMinutes: 3 },
  { id: 'gare-de-lyon', name: 'Gare de Lyon', coordinates: { lat: 48.8450, lng: 2.3740 }, lines: ['1', '14', 'RER A', 'RER D'], walkingTimeMinutes: 4 },
  { id: 'reuilly-diderot', name: 'Reuilly - Diderot', coordinates: { lat: 48.8470, lng: 2.3870 }, lines: ['1', '8'], walkingTimeMinutes: 2 },
  { id: 'nation', name: 'Nation', coordinates: { lat: 48.8480, lng: 2.3960 }, lines: ['1', '2', '6', '9', 'RER A'], walkingTimeMinutes: 4 },
  
  // Line 2
  { id: 'porte-dauphine', name: 'Porte Dauphine', coordinates: { lat: 48.8720, lng: 2.2770 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'victor-hugo', name: 'Victor Hugo', coordinates: { lat: 48.8700, lng: 2.2850 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'ternes', name: 'Ternes', coordinates: { lat: 48.8780, lng: 2.2980 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'courcelles', name: 'Courcelles', coordinates: { lat: 48.8790, lng: 2.3040 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'monceau', name: 'Monceau', coordinates: { lat: 48.8800, lng: 2.3090 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'villiers', name: 'Villiers', coordinates: { lat: 48.8810, lng: 2.3150 }, lines: ['2', '3'], walkingTimeMinutes: 2 },
  { id: 'rome', name: 'Rome', coordinates: { lat: 48.8820, lng: 2.3210 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'place-de-clichy', name: 'Place de Clichy', coordinates: { lat: 48.8840, lng: 2.3270 }, lines: ['2', '13'], walkingTimeMinutes: 3 },
  { id: 'blanche', name: 'Blanche', coordinates: { lat: 48.8840, lng: 2.3330 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'pigalle', name: 'Pigalle', coordinates: { lat: 48.8820, lng: 2.3370 }, lines: ['2', '12'], walkingTimeMinutes: 2 },
  { id: 'anvers', name: 'Anvers', coordinates: { lat: 48.8830, lng: 2.3440 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'barbes-rochechouart', name: 'Barbès - Rochechouart', coordinates: { lat: 48.8840, lng: 2.3500 }, lines: ['2', '4'], walkingTimeMinutes: 3 },
  { id: 'la-chapelle', name: 'La Chapelle', coordinates: { lat: 48.8850, lng: 2.3600 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'stalingrad', name: 'Stalingrad', coordinates: { lat: 48.8840, lng: 2.3680 }, lines: ['2', '5', '7'], walkingTimeMinutes: 3 },
  { id: 'jaures', name: 'Jaurès', coordinates: { lat: 48.8820, lng: 2.3720 }, lines: ['2', '5', '7bis'], walkingTimeMinutes: 3 },
  
  // Line 7bis
  { id: 'louis-blanc', name: 'Louis Blanc', coordinates: { lat: 48.8810, lng: 2.3650 }, lines: ['7', '7bis'], walkingTimeMinutes: 2 },
  { id: 'bolivar', name: 'Bolivar', coordinates: { lat: 48.8805, lng: 2.3740 }, lines: ['7bis'], walkingTimeMinutes: 2 },
  { id: 'buttes-chaumont', name: 'Buttes Chaumont', coordinates: { lat: 48.8785, lng: 2.3820 }, lines: ['7bis'], walkingTimeMinutes: 2 },
  { id: 'botzaris', name: 'Botzaris', coordinates: { lat: 48.8795, lng: 2.3890 }, lines: ['7bis'], walkingTimeMinutes: 2 },
  { id: 'place-des-fetes', name: 'Place des Fêtes', coordinates: { lat: 48.8770, lng: 2.3930 }, lines: ['7bis', '11'], walkingTimeMinutes: 2 },
  { id: 'pre-saint-gervais', name: 'Pré Saint-Gervais', coordinates: { lat: 48.8800, lng: 2.3985 }, lines: ['7bis'], walkingTimeMinutes: 2 },
  
  { id: 'colonel-fabien', name: 'Colonel Fabien', coordinates: { lat: 48.8780, lng: 2.3700 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'belleville', name: 'Belleville', coordinates: { lat: 48.8720, lng: 2.3770 }, lines: ['2', '11'], walkingTimeMinutes: 2 },
  { id: 'menilmontant', name: 'Ménilmontant', coordinates: { lat: 48.8670, lng: 2.3840 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'pere-lachaise', name: 'Père Lachaise', coordinates: { lat: 48.8630, lng: 2.3880 }, lines: ['2', '3'], walkingTimeMinutes: 2 },
  { id: 'philippe-auguste', name: 'Philippe Auguste', coordinates: { lat: 48.8580, lng: 2.3920 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'alexandre-dumas', name: 'Alexandre Dumas', coordinates: { lat: 48.8560, lng: 2.3950 }, lines: ['2'], walkingTimeMinutes: 2 },
  { id: 'avron', name: 'Avron', coordinates: { lat: 48.8520, lng: 2.3980 }, lines: ['2'], walkingTimeMinutes: 2 },
  
  // Line 3
  { id: 'pont-levallois', name: 'Pont de Levallois - Bécon', coordinates: { lat: 48.8970, lng: 2.2800 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'anatole-france', name: 'Anatole France', coordinates: { lat: 48.8920, lng: 2.2850 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'louise-michel', name: 'Louise Michel', coordinates: { lat: 48.8890, lng: 2.2880 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'porte-champerret', name: 'Porte de Champerret', coordinates: { lat: 48.8860, lng: 2.2920 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'pereire', name: 'Pereire', coordinates: { lat: 48.8850, lng: 2.2980 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'wagram', name: 'Wagram', coordinates: { lat: 48.8830, lng: 2.3040 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'malesherbes', name: 'Malesherbes', coordinates: { lat: 48.8820, lng: 2.3100 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'europe', name: 'Europe', coordinates: { lat: 48.8790, lng: 2.3220 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'saint-lazare', name: 'Saint-Lazare', coordinates: { lat: 48.8760, lng: 2.3260 }, lines: ['3', '9', '12', '13', '14'], walkingTimeMinutes: 4 },
  { id: 'havre-caumartin', name: 'Havre - Caumartin', coordinates: { lat: 48.8740, lng: 2.3290 }, lines: ['3', '9'], walkingTimeMinutes: 3 },
  { id: 'opera', name: 'Opéra', coordinates: { lat: 48.8720, lng: 2.3320 }, lines: ['3', '7', '8'], walkingTimeMinutes: 3 },
  { id: 'quatre-septembre', name: 'Quatre Septembre', coordinates: { lat: 48.8700, lng: 2.3360 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'bourse', name: 'Bourse', coordinates: { lat: 48.8690, lng: 2.3410 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'sentier', name: 'Sentier', coordinates: { lat: 48.8680, lng: 2.3460 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'reaumur-sebastopol', name: 'Réaumur - Sébastopol', coordinates: { lat: 48.8660, lng: 2.3520 }, lines: ['3', '4'], walkingTimeMinutes: 2 },
  { id: 'arts-et-metiers', name: 'Arts et Métiers', coordinates: { lat: 48.8650, lng: 2.3560 }, lines: ['3', '11'], walkingTimeMinutes: 2 },
  { id: 'temple', name: 'Temple', coordinates: { lat: 48.8660, lng: 2.3620 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'republique', name: 'République', coordinates: { lat: 48.8670, lng: 2.3640 }, lines: ['3', '5', '8', '9', '11'], walkingTimeMinutes: 4 },
  { id: 'parmentier', name: 'Parmentier', coordinates: { lat: 48.8660, lng: 2.3750 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'rue-saint-maur', name: 'Rue Saint-Maur', coordinates: { lat: 48.8640, lng: 2.3800 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'gambetta', name: 'Gambetta', coordinates: { lat: 48.8650, lng: 2.3980 }, lines: ['3', '3bis'], walkingTimeMinutes: 2 },
  { id: 'porte-de-bagnolet', name: 'Porte de Bagnolet', coordinates: { lat: 48.8635, lng: 2.4097 }, lines: ['3'], walkingTimeMinutes: 2 },
  { id: 'pelleport', name: 'Pelleport', coordinates: { lat: 48.8680, lng: 2.4010 }, lines: ['3bis'], walkingTimeMinutes: 2 },
  { id: 'saint-fargeau', name: 'Saint-Fargeau', coordinates: { lat: 48.8720, lng: 2.4040 }, lines: ['3bis'], walkingTimeMinutes: 2 },
  { id: 'porte-des-lilas', name: 'Porte des Lilas', coordinates: { lat: 48.8770, lng: 2.4065 }, lines: ['3bis', '11'], walkingTimeMinutes: 2 },
  { id: 'gallieni', name: 'Gallieni', coordinates: { lat: 48.8650, lng: 2.4150 }, lines: ['3'], walkingTimeMinutes: 2 },
  
  // Line 4
  { id: 'porte-clignancourt', name: 'Porte de Clignancourt', coordinates: { lat: 48.8970, lng: 2.3440 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'simplon', name: 'Simplon', coordinates: { lat: 48.8940, lng: 2.3480 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'marcadet-poissonniers', name: 'Marcadet - Poissonniers', coordinates: { lat: 48.8910, lng: 2.3500 }, lines: ['4', '12'], walkingTimeMinutes: 2 },
  { id: 'chateau-rouge', name: 'Château Rouge', coordinates: { lat: 48.8880, lng: 2.3520 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'gare-du-nord', name: 'Gare du Nord', coordinates: { lat: 48.8800, lng: 2.3550 }, lines: ['4', '5', 'RER B', 'RER D', 'RER E'], walkingTimeMinutes: 4 },
  { id: 'gare-de-lest', name: 'Gare de l\'Est', coordinates: { lat: 48.8770, lng: 2.3590 }, lines: ['4', '5', '7'], walkingTimeMinutes: 3 },
  { id: 'chateau-deau', name: 'Château d\'Eau', coordinates: { lat: 48.8730, lng: 2.3570 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'strasbourg-saint-denis', name: 'Strasbourg - Saint-Denis', coordinates: { lat: 48.8690, lng: 2.3540 }, lines: ['4', '8', '9'], walkingTimeMinutes: 3 },
  { id: 'etienne-marcel', name: 'Étienne Marcel', coordinates: { lat: 48.8640, lng: 2.3490 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'les-halles', name: 'Les Halles', coordinates: { lat: 48.8620, lng: 2.3450 }, lines: ['4', 'RER A', 'RER B', 'RER D'], walkingTimeMinutes: 4 },
  { id: 'cite', name: 'Cité', coordinates: { lat: 48.8550, lng: 2.3470 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'saint-michel', name: 'Saint-Michel', coordinates: { lat: 48.8530, lng: 2.3440 }, lines: ['4', 'RER B', 'RER C'], walkingTimeMinutes: 3 },
  { id: 'odeon', name: 'Odéon', coordinates: { lat: 48.8520, lng: 2.3390 }, lines: ['4', '10'], walkingTimeMinutes: 2 },
  { id: 'saint-germain-des-pres', name: 'Saint-Germain-des-Prés', coordinates: { lat: 48.8530, lng: 2.3340 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'saint-sulpice', name: 'Saint-Sulpice', coordinates: { lat: 48.8510, lng: 2.3310 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'saint-placide', name: 'Saint-Placide', coordinates: { lat: 48.8470, lng: 2.3270 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'montparnasse', name: 'Montparnasse - Bienvenüe', coordinates: { lat: 48.8420, lng: 2.3210 }, lines: ['4', '6', '12', '13'], walkingTimeMinutes: 4 },
  { id: 'vavin', name: 'Vavin', coordinates: { lat: 48.8430, lng: 2.3280 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'raspail', name: 'Raspail', coordinates: { lat: 48.8400, lng: 2.3310 }, lines: ['4', '6'], walkingTimeMinutes: 2 },
  { id: 'denfert-rochereau', name: 'Denfert-Rochereau', coordinates: { lat: 48.8340, lng: 2.3330 }, lines: ['4', '6', 'RER B'], walkingTimeMinutes: 3 },
  { id: 'mouton-duvernet', name: 'Mouton-Duvernet', coordinates: { lat: 48.8310, lng: 2.3300 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'alesia', name: 'Alésia', coordinates: { lat: 48.8280, lng: 2.3270 }, lines: ['4'], walkingTimeMinutes: 2 },
  { id: 'porte-orleans', name: 'Porte d\'Orléans', coordinates: { lat: 48.8230, lng: 2.3250 }, lines: ['4'], walkingTimeMinutes: 2 },
  
  // Line 5
  { id: 'bobigny-pablo-picasso', name: 'Bobigny - Pablo Picasso', coordinates: { lat: 48.9070, lng: 2.4500 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'bobigny-pantin', name: 'Bobigny - Pantin - Raymond Queneau', coordinates: { lat: 48.8960, lng: 2.4250 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'eglise-pantin', name: 'Église de Pantin', coordinates: { lat: 48.8930, lng: 2.4120 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'hoche', name: 'Hoche', coordinates: { lat: 48.8910, lng: 2.4030 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'porte-pantin', name: 'Porte de Pantin', coordinates: { lat: 48.8890, lng: 2.3920 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'ourcq', name: 'Ourcq', coordinates: { lat: 48.8870, lng: 2.3860 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'laumiere', name: 'Laumière', coordinates: { lat: 48.8850, lng: 2.3800 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'jacques-bonsergent', name: 'Jacques Bonsergent', coordinates: { lat: 48.8710, lng: 2.3610 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'oberkampf', name: 'Oberkampf', coordinates: { lat: 48.8650, lng: 2.3680 }, lines: ['5', '9'], walkingTimeMinutes: 2 },
  { id: 'richard-lenoir', name: 'Richard-Lenoir', coordinates: { lat: 48.8610, lng: 2.3710 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'breguet-sabin', name: 'Bréguet - Sabin', coordinates: { lat: 48.8570, lng: 2.3700 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'quai-rapee', name: 'Quai de la Rapée', coordinates: { lat: 48.8460, lng: 2.3660 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'austerlitz', name: 'Gare d\'Austerlitz', coordinates: { lat: 48.8430, lng: 2.3650 }, lines: ['5', '10', 'RER C'], walkingTimeMinutes: 3 },
  { id: 'saint-marcel', name: 'Saint-Marcel', coordinates: { lat: 48.8380, lng: 2.3600 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'campo-formio', name: 'Campo-Formio', coordinates: { lat: 48.8350, lng: 2.3580 }, lines: ['5'], walkingTimeMinutes: 2 },
  { id: 'place-ditalie', name: 'Place d\'Italie', coordinates: { lat: 48.8310, lng: 2.3550 }, lines: ['5', '6', '7'], walkingTimeMinutes: 3 },
  
  // Line 6
  { id: 'kleber', name: 'Kléber', coordinates: { lat: 48.8710, lng: 2.2930 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'boissiere', name: 'Boissière', coordinates: { lat: 48.8670, lng: 2.2900 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'trocadero', name: 'Trocadéro', coordinates: { lat: 48.8630, lng: 2.2870 }, lines: ['6', '9'], walkingTimeMinutes: 2 },
  { id: 'passy', name: 'Passy', coordinates: { lat: 48.8580, lng: 2.2860 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'bir-hakeim', name: 'Bir-Hakeim', coordinates: { lat: 48.8540, lng: 2.2890 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'dupleix', name: 'Dupleix', coordinates: { lat: 48.8505, lng: 2.2935 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'cambronne', name: 'Cambronne', coordinates: { lat: 48.8475, lng: 2.3020 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'sevres-lecourbe', name: 'Sèvres - Lecourbe', coordinates: { lat: 48.8455, lng: 2.3100 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'edgar-quinet', name: 'Edgar Quinet', coordinates: { lat: 48.8405, lng: 2.3255 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'glaciere', name: 'Glacière', coordinates: { lat: 48.8310, lng: 2.3430 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'corvisart', name: 'Corvisart', coordinates: { lat: 48.8290, lng: 2.3505 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'nationale', name: 'Nationale', coordinates: { lat: 48.8330, lng: 2.3620 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'chevaleret', name: 'Chevaleret', coordinates: { lat: 48.8350, lng: 2.3680 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'quai-de-la-gare', name: 'Quai de la Gare', coordinates: { lat: 48.8370, lng: 2.3730 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'dugommier', name: 'Dugommier', coordinates: { lat: 48.8390, lng: 2.3890 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'daumesnil', name: 'Daumesnil', coordinates: { lat: 48.8395, lng: 2.3960 }, lines: ['6', '8'], walkingTimeMinutes: 2 },
  { id: 'bel-air', name: 'Bel-Air', coordinates: { lat: 48.8410, lng: 2.4010 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'picpus', name: 'Picpus', coordinates: { lat: 48.8450, lng: 2.4010 }, lines: ['6'], walkingTimeMinutes: 2 },
  { id: 'champ-de-mars', name: 'Champ de Mars - Tour Eiffel', coordinates: { lat: 48.8560, lng: 2.2900 }, lines: ['RER C'], walkingTimeMinutes: 3 },
  { id: 'invalides', name: 'Invalides', coordinates: { lat: 48.8630, lng: 2.3150 }, lines: ['8', '13', 'RER C'], walkingTimeMinutes: 3 },
  { id: 'assemblee-nationale', name: 'Assemblée Nationale', coordinates: { lat: 48.8610, lng: 2.3200 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'solferino', name: 'Solférino', coordinates: { lat: 48.8590, lng: 2.3240 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'musee-dorsay', name: 'Musée d\'Orsay', coordinates: { lat: 48.8610, lng: 2.3260 }, lines: ['RER C'], walkingTimeMinutes: 2 },
  { id: 'pyramides', name: 'Pyramides', coordinates: { lat: 48.8660, lng: 2.3340 }, lines: ['7', '14'], walkingTimeMinutes: 2 },
  { id: 'madeleine', name: 'Madeleine', coordinates: { lat: 48.8700, lng: 2.3250 }, lines: ['8', '12', '14'], walkingTimeMinutes: 3 },
  { id: 'miromesnil', name: 'Miromesnil', coordinates: { lat: 48.8740, lng: 2.3150 }, lines: ['9', '13'], walkingTimeMinutes: 2 },
  
  // Line 9
  { id: 'pont-de-sevres', name: 'Pont de Sèvres', coordinates: { lat: 48.8295, lng: 2.2310 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'billancourt', name: 'Billancourt', coordinates: { lat: 48.8325, lng: 2.2380 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'marcel-sembat', name: 'Marcel Sembat', coordinates: { lat: 48.8335, lng: 2.2435 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'porte-saint-cloud', name: 'Porte de Saint-Cloud', coordinates: { lat: 48.8380, lng: 2.2565 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'exelmans', name: 'Exelmans', coordinates: { lat: 48.8420, lng: 2.2605 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'michel-ange-molitor', name: 'Michel-Ange - Molitor', coordinates: { lat: 48.8455, lng: 2.2620 }, lines: ['9', '10'], walkingTimeMinutes: 2 },
  { id: 'michel-ange-auteuil', name: 'Michel-Ange - Auteuil', coordinates: { lat: 48.8480, lng: 2.2645 }, lines: ['9', '10'], walkingTimeMinutes: 2 },
  { id: 'jasmin', name: 'Jasmin', coordinates: { lat: 48.8525, lng: 2.2685 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'ranelagh', name: 'Ranelagh', coordinates: { lat: 48.8555, lng: 2.2705 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'la-muette', name: 'La Muette', coordinates: { lat: 48.8580, lng: 2.2740 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'rue-de-la-pompe', name: 'Rue de la Pompe', coordinates: { lat: 48.8640, lng: 2.2780 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'iena', name: 'Iéna', coordinates: { lat: 48.8640, lng: 2.2930 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'alma-marceau', name: 'Alma - Marceau', coordinates: { lat: 48.8640, lng: 2.3010 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'saint-philippe-du-roule', name: 'Saint-Philippe du Roule', coordinates: { lat: 48.8720, lng: 2.3100 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'saint-ambroise', name: 'Saint-Ambroise', coordinates: { lat: 48.8610, lng: 2.3745 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'voltaire', name: 'Voltaire', coordinates: { lat: 48.8575, lng: 2.3795 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'charonne', name: 'Charonne', coordinates: { lat: 48.8550, lng: 2.3850 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'rue-des-boulets', name: 'Rue des Boulets', coordinates: { lat: 48.8520, lng: 2.3895 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'buzenval', name: 'Buzenval', coordinates: { lat: 48.8520, lng: 2.4010 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'maraichers', name: 'Maraîchers', coordinates: { lat: 48.8530, lng: 2.4075 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'porte-montreuil', name: 'Porte de Montreuil', coordinates: { lat: 48.8535, lng: 2.4110 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'robespierre', name: 'Robespierre', coordinates: { lat: 48.8560, lng: 2.4230 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'croix-chavaux', name: 'Croix de Chavaux', coordinates: { lat: 48.8580, lng: 2.4360 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'mairie-montreuil', name: 'Mairie de Montreuil', coordinates: { lat: 48.8620, lng: 2.4420 }, lines: ['9'], walkingTimeMinutes: 2 },
  { id: 'richelieu-drouot', name: 'Richelieu - Drouot', coordinates: { lat: 48.8720, lng: 2.3390 }, lines: ['8', '9'], walkingTimeMinutes: 2 },
  { id: 'grands-boulevards', name: 'Grands Boulevards', coordinates: { lat: 48.8720, lng: 2.3430 }, lines: ['8', '9'], walkingTimeMinutes: 2 },
  { id: 'bonne-nouvelle', name: 'Bonne Nouvelle', coordinates: { lat: 48.8700, lng: 2.3490 }, lines: ['8', '9'], walkingTimeMinutes: 2 },
  
  // Line 13
  { id: 'saint-denis', name: 'Saint-Denis - Université', coordinates: { lat: 48.9460, lng: 2.3640 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'basilique-saint-denis', name: 'Basilique de Saint-Denis', coordinates: { lat: 48.9370, lng: 2.3590 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'saint-denis-porte-paris', name: 'Saint-Denis - Porte de Paris', coordinates: { lat: 48.9300, lng: 2.3555 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'carrefour-pleyel', name: 'Carrefour Pleyel', coordinates: { lat: 48.9200, lng: 2.3440 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'mairie-de-saint-ouen', name: 'Mairie de Saint-Ouen', coordinates: { lat: 48.9120, lng: 2.3340 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'garibaldi', name: 'Garibaldi', coordinates: { lat: 48.9060, lng: 2.3320 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'porte-saint-ouen', name: 'Porte de Saint-Ouen', coordinates: { lat: 48.8970, lng: 2.3290 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'asnieres-gennevilliers', name: 'Asnières - Gennevilliers - Les Courtilles', coordinates: { lat: 48.9305, lng: 2.2840 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'les-agnettes', name: 'Les Agnettes', coordinates: { lat: 48.9230, lng: 2.2870 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'gabriel-peri', name: 'Gabriel Péri', coordinates: { lat: 48.9170, lng: 2.2930 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'mairie-de-clichy', name: 'Mairie de Clichy', coordinates: { lat: 48.9035, lng: 2.3050 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'porte-de-clichy', name: 'Porte de Clichy', coordinates: { lat: 48.8945, lng: 2.3135 }, lines: ['13', 'RER C'], walkingTimeMinutes: 2 },
  { id: 'brochant', name: 'Brochant', coordinates: { lat: 48.8905, lng: 2.3200 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'guy-moquet', name: 'Guy Môquet', coordinates: { lat: 48.8930, lng: 2.3270 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'la-fourche', name: 'La Fourche', coordinates: { lat: 48.8870, lng: 2.3260 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'liege', name: 'Liège', coordinates: { lat: 48.8800, lng: 2.3270 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'varenne', name: 'Varenne', coordinates: { lat: 48.8570, lng: 2.3150 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'saint-francois-xavier', name: 'Saint-François-Xavier', coordinates: { lat: 48.8510, lng: 2.3140 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'gaite', name: 'Gaîté', coordinates: { lat: 48.8385, lng: 2.3230 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'pernety', name: 'Pernety', coordinates: { lat: 48.8340, lng: 2.3185 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'plaisance', name: 'Plaisance', coordinates: { lat: 48.8315, lng: 2.3140 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'porte-de-vanves', name: 'Porte de Vanves', coordinates: { lat: 48.8270, lng: 2.3055 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'malakoff-plateau-vanves', name: 'Malakoff - Plateau de Vanves', coordinates: { lat: 48.8225, lng: 2.2985 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'malakoff-rue-etienne-dolet', name: 'Malakoff - Rue Étienne Dolet', coordinates: { lat: 48.8155, lng: 2.2975 }, lines: ['13'], walkingTimeMinutes: 2 },
  { id: 'chatillon-montrouge', name: 'Châtillon - Montrouge', coordinates: { lat: 48.8100, lng: 2.3015 }, lines: ['13'], walkingTimeMinutes: 2 },
  
  // Line 10
  { id: 'boulogne-pont-saint-cloud', name: 'Boulogne - Pont de Saint-Cloud', coordinates: { lat: 48.8410, lng: 2.2285 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'boulogne-jean-jaures', name: 'Boulogne - Jean Jaurès', coordinates: { lat: 48.8420, lng: 2.2385 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'porte-auteuil', name: 'Porte d\'Auteuil', coordinates: { lat: 48.8480, lng: 2.2575 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'eglise-auteuil', name: 'Église d\'Auteuil', coordinates: { lat: 48.8470, lng: 2.2705 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'chardon-lagache', name: 'Chardon Lagache', coordinates: { lat: 48.8450, lng: 2.2765 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'mirabeau', name: 'Mirabeau', coordinates: { lat: 48.8470, lng: 2.2840 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'javel-andre-citroen', name: 'Javel - André Citroën', coordinates: { lat: 48.8465, lng: 2.2780 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'charles-michels', name: 'Charles Michels', coordinates: { lat: 48.8465, lng: 2.2855 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'avenue-emile-zola', name: 'Avenue Émile Zola', coordinates: { lat: 48.8470, lng: 2.2950 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'segur', name: 'Ségur', coordinates: { lat: 48.8470, lng: 2.3070 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'duroc', name: 'Duroc', coordinates: { lat: 48.8470, lng: 2.3170 }, lines: ['10', '13'], walkingTimeMinutes: 2 },
  { id: 'vaneau', name: 'Vaneau', coordinates: { lat: 48.8490, lng: 2.3210 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'sevres-babylone', name: 'Sèvres - Babylone', coordinates: { lat: 48.8510, lng: 2.3260 }, lines: ['10', '12'], walkingTimeMinutes: 2 },
  { id: 'mabillon', name: 'Mabillon', coordinates: { lat: 48.8530, lng: 2.3350 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'cluny-la-sorbonne', name: 'Cluny - La Sorbonne', coordinates: { lat: 48.8510, lng: 2.3440 }, lines: ['10', 'RER B'], walkingTimeMinutes: 2 },
  { id: 'cardinal-lemoine', name: 'Cardinal Lemoine', coordinates: { lat: 48.8480, lng: 2.3510 }, lines: ['10'], walkingTimeMinutes: 2 },
  { id: 'jussieu', name: 'Jussieu', coordinates: { lat: 48.8460, lng: 2.3550 }, lines: ['7', '10'], walkingTimeMinutes: 2 },
  
  // Line 7
  { id: 'la-courneuve', name: 'La Courneuve - 8 Mai 1945', coordinates: { lat: 48.9200, lng: 2.4100 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'fort-daubervilliers', name: 'Fort d\'Aubervilliers', coordinates: { lat: 48.9140, lng: 2.4030 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'aubervilliers-pantin', name: 'Aubervilliers - Pantin - Quatre Chemins', coordinates: { lat: 48.9050, lng: 2.3920 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'porte-villette', name: 'Porte de la Villette', coordinates: { lat: 48.8970, lng: 2.3860 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'corentin-cariou', name: 'Corentin Cariou', coordinates: { lat: 48.8940, lng: 2.3820 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'crimee', name: 'Crimée', coordinates: { lat: 48.8900, lng: 2.3770 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'riquet', name: 'Riquet', coordinates: { lat: 48.8870, lng: 2.3740 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'chateau-landon', name: 'Château-Landon', coordinates: { lat: 48.8785, lng: 2.3625 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'poissonniere', name: 'Poissonnière', coordinates: { lat: 48.8770, lng: 2.3485 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'cadet', name: 'Cadet', coordinates: { lat: 48.8760, lng: 2.3430 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'le-peletier', name: 'Le Peletier', coordinates: { lat: 48.8750, lng: 2.3390 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'chaussee-antin', name: 'Chaussée d\'Antin - La Fayette', coordinates: { lat: 48.8735, lng: 2.3330 }, lines: ['7', '9'], walkingTimeMinutes: 2 },
  { id: 'pont-neuf', name: 'Pont Neuf', coordinates: { lat: 48.8585, lng: 2.3425 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'pont-marie', name: 'Pont Marie', coordinates: { lat: 48.8540, lng: 2.3570 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'sully-morland', name: 'Sully - Morland', coordinates: { lat: 48.8510, lng: 2.3610 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'place-monge', name: 'Place Monge', coordinates: { lat: 48.8430, lng: 2.3525 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'censier-daubenton', name: 'Censier - Daubenton', coordinates: { lat: 48.8400, lng: 2.3520 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'gobelins', name: 'Les Gobelins', coordinates: { lat: 48.8360, lng: 2.3520 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'tolbiac', name: 'Tolbiac', coordinates: { lat: 48.8265, lng: 2.3575 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'maison-blanche', name: 'Maison Blanche', coordinates: { lat: 48.8220, lng: 2.3585 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'porte-italie', name: 'Porte d\'Italie', coordinates: { lat: 48.8190, lng: 2.3595 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'porte-choisy', name: 'Porte de Choisy', coordinates: { lat: 48.8195, lng: 2.3650 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'porte-divry', name: 'Porte d\'Ivry', coordinates: { lat: 48.8210, lng: 2.3690 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'pierre-curie', name: 'Pierre et Marie Curie', coordinates: { lat: 48.8150, lng: 2.3700 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'mairie-divry', name: 'Mairie d\'Ivry', coordinates: { lat: 48.8110, lng: 2.3835 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'kremlin-bicetre', name: 'Le Kremlin-Bicêtre', coordinates: { lat: 48.8100, lng: 2.3620 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'villejuif-leo-lagrange', name: 'Villejuif - Léo Lagrange', coordinates: { lat: 48.8040, lng: 2.3640 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'villejuif-paul-vaillant', name: 'Villejuif - Paul Vaillant-Couturier', coordinates: { lat: 48.7960, lng: 2.3680 }, lines: ['7'], walkingTimeMinutes: 2 },
  { id: 'villejuif-louis-aragon', name: 'Villejuif - Louis Aragon', coordinates: { lat: 48.7870, lng: 2.3680 }, lines: ['7'], walkingTimeMinutes: 2 },
  
  // Line 11
  { id: 'rambuteau', name: 'Rambuteau', coordinates: { lat: 48.8610, lng: 2.3540 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'goncourt', name: 'Goncourt', coordinates: { lat: 48.8700, lng: 2.3705 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'pyrenees', name: 'Pyrénées', coordinates: { lat: 48.8735, lng: 2.3850 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'jourdain', name: 'Jourdain', coordinates: { lat: 48.8755, lng: 2.3895 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'telegraphe', name: 'Télégraphe', coordinates: { lat: 48.8760, lng: 2.3985 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'mairie-des-lilas', name: 'Mairie des Lilas', coordinates: { lat: 48.8795, lng: 2.4165 }, lines: ['11'], walkingTimeMinutes: 2 },
  { id: 'saint-sebastien-froissart', name: 'Saint-Sébastien - Froissart', coordinates: { lat: 48.8610, lng: 2.3670 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'chemin-vert', name: 'Chemin Vert', coordinates: { lat: 48.8570, lng: 2.3680 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'ledru-rollin', name: 'Ledru-Rollin', coordinates: { lat: 48.8520, lng: 2.3780 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'faidherbe-chaligny', name: 'Faidherbe - Chaligny', coordinates: { lat: 48.8500, lng: 2.3850 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'montgallet', name: 'Montgallet', coordinates: { lat: 48.8440, lng: 2.3900 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'michel-bizot', name: 'Michel Bizot', coordinates: { lat: 48.8370, lng: 2.4020 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'porte-doree', name: 'Porte Dorée', coordinates: { lat: 48.8350, lng: 2.4060 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'porte-charenton', name: 'Porte de Charenton', coordinates: { lat: 48.8330, lng: 2.4010 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'liberte', name: 'Liberté', coordinates: { lat: 48.8260, lng: 2.4070 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'charenton-ecoles', name: 'Charenton - Écoles', coordinates: { lat: 48.8210, lng: 2.4140 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'ecole-veterinaire', name: 'École Vétérinaire de Maisons-Alfort', coordinates: { lat: 48.8150, lng: 2.4220 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'maisons-alfort-stade', name: 'Maisons-Alfort - Stade', coordinates: { lat: 48.8080, lng: 2.4350 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'maisons-alfort-juilliottes', name: 'Maisons-Alfort - Les Juilliottes', coordinates: { lat: 48.8030, lng: 2.4450 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'creteil-universite', name: 'Créteil - Université', coordinates: { lat: 48.7900, lng: 2.4500 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'creteil-prefecture', name: 'Créteil - Préfecture', coordinates: { lat: 48.7800, lng: 2.4590 }, lines: ['8'], walkingTimeMinutes: 2 },
  
  // Line 14
  { id: 'saint-denis-pleyel', name: 'Saint-Denis - Pleyel', coordinates: { lat: 48.9190, lng: 2.3450 }, lines: ['14'], walkingTimeMinutes: 2 },
  { id: 'mairie-de-saint-ouen-14', name: 'Mairie de Saint-Ouen', coordinates: { lat: 48.9120, lng: 2.3340 }, lines: ['13', '14'], walkingTimeMinutes: 2 },
  { id: 'porte-clichy', name: 'Porte de Clichy', coordinates: { lat: 48.8940, lng: 2.3170 }, lines: ['13', '14'], walkingTimeMinutes: 2 },
  { id: 'pont-cardinet', name: 'Pont Cardinet', coordinates: { lat: 48.8880, lng: 2.3170 }, lines: ['14'], walkingTimeMinutes: 2 },
  { id: 'bercy', name: 'Bercy', coordinates: { lat: 48.8400, lng: 2.3800 }, lines: ['6', '14'], walkingTimeMinutes: 2 },
  { id: 'cour-saint-emilion', name: 'Cour Saint-Émilion', coordinates: { lat: 48.8330, lng: 2.3870 }, lines: ['14'], walkingTimeMinutes: 2 },
  { id: 'bibliotheque', name: 'Bibliothèque François Mitterrand', coordinates: { lat: 48.8300, lng: 2.3760 }, lines: ['14', 'RER C'], walkingTimeMinutes: 2 },
  { id: 'olympiades', name: 'Olympiades', coordinates: { lat: 48.8270, lng: 2.3670 }, lines: ['14'], walkingTimeMinutes: 2 },
  
  // Line 12
  { id: 'falguiere', name: 'Falguière', coordinates: { lat: 48.8440, lng: 2.3180 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'pasteur', name: 'Pasteur', coordinates: { lat: 48.8420, lng: 2.3130 }, lines: ['6', '12'], walkingTimeMinutes: 2 },
  { id: 'volontaires', name: 'Volontaires', coordinates: { lat: 48.8410, lng: 2.3080 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'vaugirard', name: 'Vaugirard', coordinates: { lat: 48.8395, lng: 2.3010 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'convention', name: 'Convention', coordinates: { lat: 48.8370, lng: 2.2970 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'porte-de-versailles', name: 'Porte de Versailles', coordinates: { lat: 48.8320, lng: 2.2880 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'corentin-celton', name: 'Corentin Celton', coordinates: { lat: 48.8270, lng: 2.2790 }, lines: ['12'], walkingTimeMinutes: 2 },
  { id: 'mairie-dissy', name: 'Mairie d\'Issy', coordinates: { lat: 48.8240, lng: 2.2730 }, lines: ['12'], walkingTimeMinutes: 2 },
  
  // Line 8
  { id: 'la-tour-maubourg', name: 'La Tour-Maubourg', coordinates: { lat: 48.8570, lng: 2.3100 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'ecole-militaire', name: 'École Militaire', coordinates: { lat: 48.8550, lng: 2.3060 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'la-motte-picquet-grenelle', name: 'La Motte-Picquet - Grenelle', coordinates: { lat: 48.8490, lng: 2.2980 }, lines: ['6', '8', '10'], walkingTimeMinutes: 3 },
  { id: 'commerce', name: 'Commerce', coordinates: { lat: 48.8450, lng: 2.2940 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'felix-faure', name: 'Félix Faure', coordinates: { lat: 48.8420, lng: 2.2920 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'boucicaut', name: 'Boucicaut', coordinates: { lat: 48.8410, lng: 2.2880 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'lourmel', name: 'Lourmel', coordinates: { lat: 48.8390, lng: 2.2820 }, lines: ['8'], walkingTimeMinutes: 2 },
  { id: 'balard', name: 'Balard', coordinates: { lat: 48.8360, lng: 2.2780 }, lines: ['8'], walkingTimeMinutes: 2 },

  // Key RER stations
  { id: 'marne-la-vallee', name: 'Marne-la-Vallée - Chessy', coordinates: { lat: 48.8680, lng: 2.7820 }, lines: ['RER A'], walkingTimeMinutes: 3 },
  { id: 'vincennes', name: 'Vincennes', coordinates: { lat: 48.8470, lng: 2.4330 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'val-de-fontenay', name: 'Val de Fontenay', coordinates: { lat: 48.8550, lng: 2.4820 }, lines: ['RER A', 'RER E'], walkingTimeMinutes: 3 },
  { id: 'noisy-le-grand', name: 'Noisy-le-Grand - Mont d\'Est', coordinates: { lat: 48.8420, lng: 2.5520 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'boissy-saint-leger', name: 'Boissy-Saint-Léger', coordinates: { lat: 48.7530, lng: 2.5070 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'nanterre-prefecture', name: 'Nanterre Préfecture', coordinates: { lat: 48.8920, lng: 2.2200 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'rueil-malmaison', name: 'Rueil - Malmaison', coordinates: { lat: 48.8790, lng: 2.1870 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'saint-germain-en-laye', name: 'Saint-Germain-en-Laye', coordinates: { lat: 48.8980, lng: 2.0940 }, lines: ['RER A'], walkingTimeMinutes: 2 },
  { id: 'cdg-airport', name: 'Aéroport Charles de Gaulle', coordinates: { lat: 49.0100, lng: 2.5500 }, lines: ['RER B'], walkingTimeMinutes: 5 },
  { id: 'parc-expositions', name: 'Parc des Expositions', coordinates: { lat: 48.9730, lng: 2.5140 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'aulnay-sous-bois', name: 'Aulnay-sous-Bois', coordinates: { lat: 48.9320, lng: 2.4970 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'le-bourget', name: 'Le Bourget', coordinates: { lat: 48.9310, lng: 2.4260 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'stade-de-france', name: 'La Plaine - Stade de France', coordinates: { lat: 48.9180, lng: 2.3620 }, lines: ['RER B', 'RER D'], walkingTimeMinutes: 3 },
  { id: 'luxembourg', name: 'Luxembourg', coordinates: { lat: 48.8460, lng: 2.3400 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'port-royal', name: 'Port-Royal', coordinates: { lat: 48.8400, lng: 2.3370 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'cite-universitaire', name: 'Cité Universitaire', coordinates: { lat: 48.8220, lng: 2.3390 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'bourg-la-reine', name: 'Bourg-la-Reine', coordinates: { lat: 48.7800, lng: 2.3150 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'antony', name: 'Antony', coordinates: { lat: 48.7540, lng: 2.2970 }, lines: ['RER B'], walkingTimeMinutes: 2 },
  { id: 'massy-palaiseau', name: 'Massy - Palaiseau', coordinates: { lat: 48.7250, lng: 2.2590 }, lines: ['RER B', 'RER C'], walkingTimeMinutes: 3 },
  { id: 'orly-airport', name: 'Aéroport d\'Orly', coordinates: { lat: 48.7270, lng: 2.3650 }, lines: ['RER B'], walkingTimeMinutes: 5 },
  { id: 'versailles-rive-gauche', name: 'Versailles - Château Rive Gauche', coordinates: { lat: 48.7980, lng: 2.1290 }, lines: ['RER C'], walkingTimeMinutes: 3 },
  { id: 'versailles-chantiers', name: 'Versailles - Chantiers', coordinates: { lat: 48.7950, lng: 2.1350 }, lines: ['RER C'], walkingTimeMinutes: 3 }
];

// Normalize string for search (remove accents, lowercase)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['-]/g, ' ');
}

// Common words to ignore for partial matching (to avoid false positives)
const COMMON_STREET_WORDS = new Set(['rue', 'avenue', 'boulevard', 'place', 'avenue', 'chemin', 'route', 'impasse', 'passage']);

// Check if query contains a street number (starts with digits)
function hasStreetNumber(query: string): boolean {
  return /^\d+/.test(query.trim());
}

// Search stations by name
export function searchStations(query: string, limit: number = 5): Station[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = normalizeString(query);
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
  const hasNumber = hasStreetNumber(query);
  
  // Score each station
  const scored = stations.map(station => {
    const normalizedName = normalizeString(station.name);
    let score = 0;
    
    // Exact match gets highest score (always passes, even with numbers)
    if (normalizedName === normalizedQuery) {
      score = 100;
    }
    // Starts with query (always passes, even with numbers)
    else if (normalizedName.startsWith(normalizedQuery)) {
      score = 80;
    }
    // All query words found (excluding common street words)
    else if (queryWords.every(word => normalizedName.includes(word))) {
      const significantWords = queryWords.filter(w => !COMMON_STREET_WORDS.has(w) && w.length >= 4);
      if (significantWords.length > 0 && significantWords.every(word => normalizedName.includes(word))) {
        score = 60;
      } else if (queryWords.length === 1 && COMMON_STREET_WORDS.has(queryWords[0])) {
        // Don't score if query is just a common word (unless it's an exact match)
        score = 0;
      } else {
        score = 30; // Lower score if only matching common words
      }
    }
    // Any word starts with query (only if query is long enough)
    else if (normalizedQuery.length >= 4 && normalizedName.split(/\s+/).some(word => word.startsWith(normalizedQuery))) {
      score = 40;
    }
    // Contains query (only if query is long enough and not a common word)
    else if (normalizedQuery.length >= 4 && !COMMON_STREET_WORDS.has(normalizedQuery) && normalizedName.includes(normalizedQuery)) {
      score = 20;
    }
    // Partial match on any word (exclude common words and require minimum length)
    else if (queryWords.some(word => {
      const isCommon = COMMON_STREET_WORDS.has(word);
      const isLongEnough = word.length >= 4;
      return !isCommon && isLongEnough && normalizedName.includes(word);
    })) {
      score = 10;
    }
    
    // If query contains a street number, only show exact or very strong matches (score >= 60)
    // But exact matches (100) and starts-with matches (80) always pass (they're already >= 60)
    if (hasNumber && score < 60) {
      score = 0;
    }
    
    return { station, score };
  });
  
  // Filter and sort by score
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ station }) => station);
}

// Get station by ID
export function getStationById(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

// Get line color
export function getLineColor(line: string): string {
  return METRO_LINE_COLORS[line] || '#666666';
}
