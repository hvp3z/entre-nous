# Résumé de l’application Le Middle — Contexte pour un agent de prompts d’amélioration

## 1. En une phrase

**Le Middle** est une webapp mobile-first qui aide des groupes (2 à 6 personnes) à trouver un **lieu de rendez-vous équidistant en transports en commun** (métro/train) en Île-de-France, pour trois types de sorties : **bars**, **restaurants/cafés**, et **sorties en famille (kids)**.

---

## 2. Proposition de valeur

- **Problème** : « Où on se retrouve ? » quand tout le monde vient de quartiers différents.
- **Solution** : l’app trouve des **lieux (établissements)** proches de **stations** pour lesquelles les temps de trajet en métro/train sont **quasi équivalents** pour tous (écart max ~10 min).
- **Cible** : utilisateurs en déplacement (mobile-first), francophones et anglophones (FR/EN).

---

## 3. Parcours utilisateur principal

1. **Accueil** : choix du type de sortie (bars, restaurants, cafés, kids) ou recherche via un champ « Où vous retrouver ? » qui ouvre la sélection de thème.
2. **Page thème** (ex. `/bars`) :  
   - Ajout de **2 à 6 adresses** (ou « Ma position ») via autocomplete (adresses + stations de métro).  
   - Optionnel : **filtres** (thème-dépendants).  
   - Clic sur **« Trouver des lieux »**.
3. **Recherche** : le backend calcule des stations « équidistantes » (algo type Dijkstra sur le réseau IDFM), puis cherche des **établissements** (Google Places) autour de ces stations, selon le thème et les filtres.
4. **Résultats** : liste + carte ; temps de trajet par participant, fiche lieu (détails, itinéraires). Possibilité de **partager** une recherche (lien `/share/[searchId]`).

---

## 4. Stack technique

| Couche | Technologies |
|--------|--------------|
| **Frontend** | Next.js 14, React, Tailwind CSS, Zustand, Leaflet, next-intl (i18n), Framer Motion |
| **Backend** | Node.js, Express, TypeScript |
| **Données / APIs** | Google Places (lieux, détails, photos), IDFM Open Data (réseau métro/RER), Navitia (secours itinéraires), Redis (cache) |
| **Shared** | Types TypeScript partagés (shared/) |

---

## 5. Fonctionnalités clés (pour guider les améliorations)

- **Thèmes** : bars, restaurants, cafés, kids — chacun avec couleurs, textes et filtres dédiés.
- **Locations** : autocomplete (adresses + stations), géolocalisation, 2–6 emplacements, affichage de la station la plus proche.
- **Algorithme équidistant** : stations les plus proches par adresse → calcul des temps (Dijkstra sur le graphe métro/RER) → sélection des stations dont l’écart de temps entre participants est ≤ 10 min (avec relâchement possible).
- **Lieux** : recherche Google Places autour des stations équidistantes, par type (bar, restaurant, café, établissements kids), avec filtres et tri (score, temps, etc.).
- **UX** : overlay de chargement, bottom sheet résultats, bascule liste/carte, fiches lieu avec itinéraires, partage de recherche, PWA (manifest, thème, offline basique).
- **i18n** : FR/EN (messages dans `messages/fr.json`, `en.json`).
- **Monétisation** : bannière support (ex. Ko-fi), liens affiliés possibles.

---

## 6. Contraintes et périmètre

- **Géographique** : Île-de-France, métro + RER/Transilien (données IDFM).
- **Nombre de participants** : 2 à 6.
- **Équidistance** : variance typique 10 min (avec message si relâchement pour avoir des résultats).
- **Mobile-first** : expérience optimisée petit écran, usage en déplacement.

---

## 7. Structure de code utile à connaître

- **Frontend** : `app/[locale]/` (pages), `components/` (common, location, map, results, filters, themes, monetization), `stores/sessionStore.ts`, `lib/api.ts`, `messages/`.
- **Backend** : `routes/` (locations, equidistant, venues, directions), `services/` (EquidistantFinder, TransitService, VenueService, CacheService), `data/stations.ts`.
- **Shared** : `shared/types/` pour les types communs.

---

## 8. Comment utiliser ce résumé pour un agent « amélioration »

Un **agent d’amélioration** doit proposer des **prompts concrets et actionnables** pour faire évoluer l’app. Chaque prompt d’amélioration devrait :

1. **Cibler** une zone précise : UX, perfs, accessibilité, SEO, i18n, algorithme, design, erreurs, partage, etc.
2. **Respecter** le périmètre (IDF, 2–6 personnes, équidistance, mobile-first).
3. **Être formulé** pour un dev ou un autre IA : objectif clair, contraintes techniques (stack ci-dessus), et si possible fichier(s) ou composant(s) concernés.

**Exemples de directions d’amélioration** (pour inspirer les prompts) :

- **UX** : clarté du statut de recherche, messages d’erreur, empty states, onboarding, feedback après partage.
- **Performance** : cache, réduction d’appels Google Places, chargement progressif des résultats/carte.
- **Accessibilité** : contraste, focus, annonces screen reader, labels, navigation clavier.
- **Algorithme** : paramétrage de la variance, prise en compte des correspondances ou du confort (nombre de changements).
- **Design** : cohérence des thèmes (bars/restaurants/cafés/kids), dark mode, lisibilité sur mobile.
- **i18n** : complétion des clés, format des dates/heures, pluriels.
- **Partage** : métadonnées (OG), préchargement des résultats sur `/share/[searchId]`.
- **Robustesse** : gestion d’échec d’APIs (Places, Navitia), fallbacks, retry.

---

## 9. Prompt type pour l’agent « amélioration »

Tu peux donner ce contexte à l’agent sous cette forme :

```
Tu es un agent qui propose des prompts d’amélioration pour l’application décrite dans le fichier RESUME_APP_POUR_AGENT_AMELIORATION.md.

Pour chaque demande (ex. « améliore l’UX de la recherche », « améliore les perfs », « améliore l’accessibilité ») :
1. Résume brièvement le contexte pertinent du résumé.
2. Propose 3 à 5 prompts d’amélioration concrets, actionnables et priorisés.
3. Chaque prompt doit : viser un objectif précis, mentionner la stack (Next.js, React, Tailwind, Express, Google Places, IDFM, etc.) et, si possible, les fichiers ou zones du repo concernés.

Format de sortie pour chaque prompt :
- **Titre** : court et descriptif.
- **Objectif** : une phrase.
- **Contexte** : 1–2 phrases (lien avec Le Middle).
- **Prompt** : texte prêt à être copié-collé pour un dev ou une IA.
- **Fichiers / zones suggérés** : (optionnel) chemins ou noms de composants.
```

---

*Document généré pour alimenter un agent chargé de proposer des prompts d’amélioration pour Le Middle.*
