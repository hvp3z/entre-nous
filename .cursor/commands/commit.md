# Commit automatique avec message descriptif

Tu dois effectuer un commit Git complet en suivant ces étapes :

## Étape 1 : Analyser les changements

Exécute `git status` pour voir les fichiers modifiés, ajoutés ou supprimés.

## Étape 2 : Analyser le contenu des changements

Exécute `git diff --staged` et `git diff` pour comprendre les modifications apportées.

## Étape 3 : Générer un message de commit

Génère un message de commit en suivant le format Conventional Commits :

```
<type>(<scope>): <description courte>

<corps détaillé expliquant les changements>
```

### Types disponibles :
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `docs` : documentation
- `style` : formatage, points-virgules manquants, etc.
- `refactor` : refactorisation du code
- `test` : ajout ou modification de tests
- `chore` : maintenance, dépendances, config

### Règles pour le message :
- La description courte doit être en anglais, concise (max 50 caractères)
- Le corps peut être en français ou anglais selon le contexte
- Liste les fichiers modifiés avec un résumé de chaque changement
- Mentionne l'impact fonctionnel des modifications

## Étape 4 : Exécuter les commandes Git

Exécute les commandes suivantes dans l'ordre :

1. `git add -A` - Ajouter tous les fichiers
2. `git commit -m "<message>"` - Commiter avec le message généré
3. `git push` - Pousser vers le remote

## Étape 5 : Confirmer le succès

Affiche un résumé du commit effectué avec :
- Le hash du commit
- Le nombre de fichiers modifiés
- La branche concernée

