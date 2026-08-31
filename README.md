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

1. Le dépôt est initialisé et poussé sur
   `github.com/jordanZeledev/ktkarena-contracts`.

   > ⚠️ **Ce dépôt est PUBLIC, et c'est un choix assumé (2026-08-31).** Cette ligne disait
   > « le pousser (privé) » jusqu'à cette date, alors que le dépôt était public depuis l'origine :
   > la doc affirmait le contraire de la réalité, ce qui est précisément la situation où l'on
   > finit par committer un secret « puisque c'est privé ».
   >
   > Décision : **rester public**, pour trois raisons mesurées. Le contenu est non sensible
   > (des enums — aucune clé, aucune URL à credentials ; l'historique complet, 5 commits, a été
   > scanné le 2026-08-31 : zéro secret). Passer en privé casserait `npm ci` de `ktkarena-web`
   > (son lockfile résout en `git+ssh://`) et ses builds Vercel tant qu'une deploy key ou un PAT
   > ne serait pas configuré. Et les minutes GitHub Actions sont gratuites sur un dépôt public,
   > facturées sur un privé — c'est ce qui rend une CI possible ici.
   >
   > ⚠️ `"private": true` dans `package.json` ne dit **rien** de la visibilité GitHub : il empêche
   > seulement une publication npm accidentelle. Ne pas le lire comme une garantie de
   > confidentialité.
   >
   > **Conséquence à tenir :** ne jamais committer ici quoi que ce soit qu'on ne publierait pas.
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

> ⚠️ **État réellement mesuré le 2026-08-31** — cette section décrivait une intention, pas la
> réalité. Un seul consommateur sur trois est branché.

- `ktkarena-web` : **consomme réellement le paquet**, via une dépendance **git**, pas `file:` —
  `package.json` épingle `github:jordanZeledev/ktkarena-contracts#v1.3.0` (57 sites d'import dans
  `src/`). ⚠️ **Toujours sur `v1.3.0` :** un bump vers `v1.4.0` reste à faire de son côté.
- `ktkarena-admin` : **ne déclare pas le paquet** (zéro occurrence de `@ktk` dans son lockfile). Il a
  retapé les enums à la main, dans la forme exacte de ce paquet — `src/services/wallApi.ts`,
  `src/services/transactionsApi.ts`.
- `ktkarena-mobile` : ⚠️ **NE PAS utiliser `file:../`** — les builds EAS cloud n'uploadent que le repo, une dépendance vers un dossier frère casse le build (vérifié juin 2026, fix/wallet-types-pagination). Deux options : dépendance **git** (`github:<org>/ktkarena-contracts#vX.Y.Z`, fonctionne sur EAS car npm la résout au install), ou conserver une copie vendorée locale synchronisée par script avec commentaire pointant vers la source de vérité (état actuel de `types/wallet.ts`).
