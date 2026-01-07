# Guide de Déploiement - Entre Nous

Ce guide explique comment déployer Entre Nous en production.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel        │────▶│   Railway       │────▶│   Upstash       │
│   (Frontend)    │     │   (Backend)     │     │   (Redis)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   Google APIs   │
                    │   Navitia API   │
                    └─────────────────┘
```

## Prérequis

1. Compte GitHub avec le repo du projet
2. Clés API :
   - Google Places API
   - Google Maps API  
   - Navitia API (optionnel)

---

## Étape 1 : Déployer le Backend sur Railway

### 1.1 Créer un compte Railway

1. Aller sur [railway.app](https://railway.app)
2. Se connecter avec GitHub

### 1.2 Créer le projet

1. Cliquer "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Choisir le repo `entre-nous`
4. Dans les settings, configurer :
   - **Root Directory** : `/` (racine)
   - Railway utilisera Nixpacks pour builder automatiquement

### 1.3 Configurer les variables d'environnement

Dans l'onglet "Variables" du service, ajouter :

```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://votre-domaine.vercel.app
GOOGLE_PLACES_API_KEY=votre_cle
GOOGLE_MAPS_API_KEY=votre_cle
NAVITIA_API_KEY=votre_cle
```

### 1.4 Ajouter Redis (Upstash)

1. Dans le projet Railway, cliquer "New"
2. Sélectionner "Database" → "Redis" (Upstash)
3. Railway ajoutera automatiquement `REDIS_URL`

### 1.5 Configurer le domaine

1. Aller dans "Settings" du service backend
2. Dans "Networking", générer un domaine public
3. Noter l'URL (ex: `entre-nous-api.up.railway.app`)

---

## Étape 2 : Déployer le Frontend sur Vercel

### 2.1 Créer un compte Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub

### 2.2 Importer le projet

1. Cliquer "Add New" → "Project"
2. Importer le repo `entre-nous`
3. Configurer :
   - **Root Directory** : `frontend`
   - **Framework Preset** : Next.js

### 2.3 Variables d'environnement

Ajouter dans les settings Vercel :

```
NEXT_PUBLIC_API_URL=https://entre-nous-api.up.railway.app
```

Optionnel (analytics) :
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=votre-domaine.com
```

### 2.4 Déployer

1. Cliquer "Deploy"
2. Vercel build et déploie automatiquement

---

## Étape 3 : Configurer le Domaine Personnalisé

### Sur Vercel (Frontend)

1. Aller dans Project Settings → Domains
2. Ajouter votre domaine (ex: `entrenous.paris`)
3. Configurer les DNS chez votre registrar :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Sur Railway (Backend) - Optionnel

1. Aller dans Settings → Networking
2. Ajouter un domaine personnalisé (ex: `api.entrenous.paris`)

### Mettre à jour les variables

Après avoir configuré les domaines, mettre à jour :

**Railway (backend)** :
```
FRONTEND_URL=https://entrenous.paris
```

**Vercel (frontend)** :
```
NEXT_PUBLIC_API_URL=https://api.entrenous.paris
```

---

## Étape 4 : Vérification

1. Tester l'API : `curl https://api.entrenous.paris/health`
2. Ouvrir le frontend : `https://entrenous.paris`
3. Faire une recherche de test

---

## Coûts Estimés

| Service | Plan | Coût/mois |
|---------|------|-----------|
| Vercel | Hobby | Gratuit |
| Railway | Starter | ~$5 |
| Upstash Redis | Free | Gratuit |
| Domaine .fr | - | ~€12/an |

**Total** : ~$5/mois + domaine

---

## Monitoring & Logs

### Railway
- Dashboard : logs en temps réel
- Métriques : CPU, RAM, réseau

### Vercel
- Analytics intégrés (optionnel, payant)
- Logs de déploiement

### Plausible (si configuré)
- Visiteurs, pages vues
- Événements personnalisés (recherches, etc.)

---

## Troubleshooting

### Le backend ne démarre pas
- Vérifier les variables d'environnement
- Consulter les logs Railway

### CORS errors
- Vérifier que `FRONTEND_URL` est correct dans Railway
- S'assurer que le domaine inclut `https://`

### Les recherches ne fonctionnent pas
- Vérifier les clés API Google
- Tester l'endpoint `/health` du backend

