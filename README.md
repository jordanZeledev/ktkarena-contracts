# @ktk/contracts

Package partagé d'enums et types entre `ktkarena-api` et tous les clients KTKArena (mobile, admin, web).

**Source de vérité :** `ktkarena-api/prisma/schema.prisma` → généré via `npm run generate:contracts` dans le repo API.

## Pourquoi ce package

Avant, `contracts.ts` était copié manuellement de l'API vers admin et mobile à chaque release. Avec un 4e consommateur (ktkarena-web), la copie manuelle devient un risque de désynchronisation. Ce package centralise le fichier.

## Consommation

### En local (développement) — via `file:`

Dans le `package.json` du client :

```json
"dependencies": {
  "@ktk/contracts": "file:../ktkarena-contracts"
}
```

`ktkarena-web` utilise déjà ce mode.

### En CI / production — via dépendance git (recommandé)

1. Initialiser un repo git ici et le pousser (privé) :
   ```bash
   git init && git add . && git commit -m "v1.0.0" && git tag v1.0.0
   ```
2. Dans les clients :
   ```json
   "@ktk/contracts": "github:<org>/ktkarena-contracts#v1.0.0"
   ```
3. Le `prepare` script compile automatiquement `dist/` à l'installation.

## Flux de mise à jour

1. Modifier `schema.prisma` dans `ktkarena-api`.
2. `npm run generate:contracts` dans l'API.
3. Copier `ktkarena-api/src/shared/contracts.ts` → `ktkarena-contracts/src/index.ts` (conserver l'en-tête de ce fichier).
4. Bump `version` dans `package.json`, commit + tag.
5. Mettre à jour la ref de version dans les clients.

**TODO (recommandé) :** ajouter un script `sync:contracts` côté API qui fait l'étape 3 automatiquement.

## Migration des clients existants

- `ktkarena-web` : consomme déjà ce package (jour 1).
- `ktkarena-admin` et `ktkarena-mobile` : migration progressive — remplacer la copie locale de `contracts.ts` par un import `@ktk/contracts` lors d'une prochaine release. Non urgent, non bloquant.
