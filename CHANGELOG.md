# Changelog — `@ktk/contracts`

Toutes les versions sont des **ajouts**. Rien n'a jamais été retiré ni renommé.

> ⚠️ **Un ajout de valeur d'enum est silencieux chez un consommateur qui ne bumpe pas.** Ni erreur
> de compilation, ni avertissement : la nouvelle valeur n'est simplement pas là, et une comparaison
> contre une chaîne serveur inconnue tombe dans le repli. C'est pourquoi ce fichier existe.
>
> ⚠️ **Ce fichier n'est PAS embarqué dans le paquet installé** (`files: ["dist", "src"]`, mesuré au
> 2026-08-31 : un `npm pack` ne contient que `README.md`, `package.json`, `dist/` et `src/`). Pour
> savoir ce qui a changé, il faut ouvrir ce dépôt.

---

## v1.5.0 — 2026-09-12

Ajout de `WALLBET_SHARE` à trois enums — `StatusType`, `DirectMessageType`, `GroupMessageType` —
pour le partage d'une carte klash (api #472, en ligne). Drapeau serveur `wall_share` **fermé** : la
valeur est publiée ici mais rien ne l'émet encore en production. Rien n'est retiré ni renommé.

> ⚠️ **Silencieux chez un consommateur qui ne bumpe pas** — ni erreur ni avertissement à la
> compilation ou à l'exécution : `WALLBET_SHARE` est simplement absente, et une comparaison contre
> cette chaîne serveur tombe dans le repli (voir l'avertissement en tête de ce fichier).
>
> **Consommateurs à bumper :**
>
> - `ktkarena-web` — dépendance git réelle, épinglée sur `v1.4.0` (PR web #150) : bumper vers
>   `v1.5.0`.
> - `ktkarena-api` — repasser `scripts/contracts-ledger.json` de `unpublished` à `published` une
>   fois le tag `v1.5.0` posé sur ce dépôt.
> - `ktkarena-admin` — ne déclare pas le paquet, recopie ses enums à la main dans
>   `src/services/wallApi.ts` et `src/services/transactionsApi.ts` : mise à jour manuelle.

## v1.4.0 — 2026-08-31

**La plus grosse version depuis l'origine, et elle porte 57 jours de dette.** Le paquet était figé
au 2026-07-04 (`v1.3.0`) pendant que l'API livrait les sept phases du mur puis la couche sémantique.
**+17 symboles, +23 valeurs**, en trois lots distincts. Après cette version, la dérive est nulle :
74 symboles de part et d'autre.

### Lot 1 — Klash / The Wall

Deux enums neufs :

| symbole | valeurs |
| --- | --- |
| `WallBetStatus` | `OPEN` · `COMPLETED` · `CANCELLED` · `RELEASED` |
| `WallBetProposalStatus` | `PENDING` · `ACCEPTED` · `DECLINED` · `EXPIRED` |

> ⚠️ **`WallBetProposalStatus` a QUATRE états et aucun `WITHDRAWN`.** C'est une décision, pas un
> oubli : il n'y a pas de retrait de proposition en V1, précisément parce qu'ajouter une valeur
> d'enum PostgreSQL est irréversible (pas de `DROP VALUE`). Un client qui en déclare un cinquième
> ment.
>
> ⚠️ **`RELEASED` n'est pas `CANCELLED`.** `CANCELLED` = quelqu'un a cliqué. `RELEASED` = le système
> a libéré seul (reliquat sous le minimum, ou borne `closesAt` atteinte). Deux enquêtes
> différentes.

Valeurs ajoutées :

- `MatchSource` — `WALL` (4 → 5).
- `TransactionType` — `WALL_LOCKED`, `WALL_RELEASED`, `WALL_PROPOSAL_LOCKED`,
  `WALL_PROPOSAL_RELEASED`, `BET_CANCEL_PENALTY` (10 → 15).
- `NotificationType` — `WALL_BET_DORMANT`, `WALL_PROPOSAL_RECEIVED`, `WALL_PROPOSAL_DECLINED`,
  `WALL_BET_MATCHED`, `WALL_BET_COMPLETED`, `WALL_BET_RELEASED`.

### Lot 2 — la couche sémantique

**Ce que trois dépôts clients recopiaient chacun à la main.** Ce sont des propriétés du **code
serveur**, non dérivables du schéma : aucun client ne pouvait les déduire.

| symbole | contenu |
| --- | --- |
| `BetOrigin` | `COMMUNITY` · `GROUP` · `CHALLENGE` · `WALL` |
| `WALL_NOTIFICATION_TYPES_EMITTED` | les 4 réellement écrits par un chemin serveur |
| `WALL_NOTIFICATION_TYPES_DECLARED_ONLY` | `WALL_BET_COMPLETED`, `WALL_BET_RELEASED` |
| `INFORMATIVE_TRANSACTION_TYPES` | `COMMISSION`, `BET_CANCEL_PENALTY` |
| `movesWallet(type)` | `false` pour les types informatifs, `true` sinon |

> 🔴 **`WALL_BET_COMPLETED` et `WALL_BET_RELEASED` sont DÉCLARÉS SANS ÉMETTEUR.** Rien côté serveur
> ne les écrit. Un `case` pour l'un des deux est du code mort qui donne l'illusion d'une couverture,
> et aucun outil ne le signalera. C'est exactement ce que `WALL_NOTIFICATION_TYPES_DECLARED_ONLY`
> existe pour dire.
>
> 🔴 **`COMMISSION` et `BET_CANCEL_PENALTY` portent un montant réel mais ne déplacent AUCUN
> portefeuille.** Tout code qui somme des transactions pour dériver un solde doit les exclure —
> utiliser `movesWallet`. L'oubli d'exclure `COMMISSION` a produit 48 fausses alertes `fatal` sur 50
> en une journée (2026-06-27) côté backend.
>
> ⚠️ **`movesWallet` est la PREMIÈRE FONCTION que ce paquet exporte.** Il cesse d'être de la donnée
> purement effaçable et se met à porter du **comportement**. Conséquence à tenir : un comportement
> figé dans un tag peut diverger du serveur d'une manière qu'une constante ne peut pas — un type
> informatif ajouté côté serveur *après* le tag que vous épinglez sera compté comme déplaçant un
> solde. Propriété à surveiller, pas victoire acquise.

### Lot 3 — les 57 jours de dette

Sans rapport avec le Klash, mais publié dans le même tag parce que le paquet n'avait pas bougé.

- **Statuts (stories)** — `StatusType`, `StatusPrivacy`, `StatusLifecycle`, `StatusMuteMode` ;
  `NotificationType.STATUS_RESHARED`.
- **Sous-catégories** — `SUBCATEGORIES`, `SUBCATEGORY_SLUGS`, `SubcategoryEntry`.
- **Divers** — `ConversationFolder`, `EmailVerificationPurpose`, `PricingMode`.
- **`WsEvent` — 10 canaux** : `BET_PLACED`, `CHALLENGE_ACCEPTED`, `CHALLENGE_DECLINED`,
  `DM_REQUEST_COUNT`, `STATUS_NEW`, `STATUS_DELETED`, `STATUS_VIEWED`, `STATUS_REACTION`,
  `STATUS_POLL_VOTE`, `STATUS_REVEALED` (68 → 78).

> ⚠️ Ces 10 canaux manquaient alors que `src/index.ts` porte la règle « les clients DOIVENT
> référencer ces constantes — jamais de littéraux ». La règle était intenable pour eux ; elle
> redevient tenable.

### Chaîne de distribution

- `npm run verify:receivable` — garde de réception : compile le contrat entrant sous le `tsconfig`
  de ce dépôt **et** vérifie l'empreinte du corps contre celle acquittée par
  `ktkarena-api/scripts/contracts-ledger.json`.
- Côté API, deux gardes locales (`verify:contracts`, `verify:contracts-sync`) bloquent désormais un
  push qui laisserait le contrat dériver sans qu'un tag le publie.
- Ce dépôt est **public** — décision actée, voir `README.md`.

---

## v1.3.0 — 2026-07-04

Sync API main : `SonicStickerPackStatus` (4 états de packs), `OAuthProvider`, enums `Season`
(battle-pass), `CHALLENGE`.

## v1.2.0 — 2026-06-12

`WsClientEvent.ODDS_LOBBY_JOIN` / `ODDS_LOBBY_LEAVE` (room lobby des cotes).

## v1.1.0 — 2026-06-12

Section WebSocket (`WsEvent` / `WsClientEvent`) + alias déprécié `WS_LEGACY_ODDS_UPDATE`.

## v1.0.0 — 2026-06-09

Paquet initial — les enums Prisma partagés, extraits de `ktkarena-api/src/shared/contracts.ts`.
