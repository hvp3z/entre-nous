# Commit automatique

Effectue un commit Git complet :

## Étape 1 : Analyser

Exécute `git status` et `git diff` pour comprendre les changements.

## Étape 2 : Commit message court

Format Conventional Commits sur **une seule ligne** :

```
<type>(<scope>): <description>
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Règles strictes :**
- MAX 72 caractères au total
- En anglais
- Pas de point final
- Pas de corps de message (une ligne uniquement)

Exemples :
- `feat(filters): add venue filtering system`
- `fix(api): handle null coordinates`
- `chore(deps): update next.js to 14.1`

## Étape 3 : Exécuter

```bash
git add -A
git commit -m "<message court>"
git push
```

## Étape 4 : Confirmer

Affiche : hash, nb fichiers, branche (format compact)

