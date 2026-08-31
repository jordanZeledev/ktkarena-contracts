# AUDIT KLASH / THE WALL — dépôt `ktkarena-contracts` (`@ktk/contracts`)

**Date :** 2026-08-30 · **Nature :** lecture seule · **Aucun commit, aucun tag, aucune publication.**
**Auteur :** agent Claude Code, dépôt `ktkarena-contracts`, `master @ e89b90b`, working tree propre.

**Portée des mesures.** Les quatre dépôts sont présents sur ce disque
(`C:\Users\Jordan Zele\Projects\`). J'ai donc **mesuré** A3 au lieu de l'inférer, ainsi que la
dérive exacte vis-à-vis de la source de vérité. Toutes les mesures API portent sur
`ktkarena-api`, checkout local branche `feat/wall-three-debts` ; j'ai vérifié que
`src/shared/contracts.ts` y est **identique à `origin/main`** (`git diff --stat origin/main --
src/shared/contracts.ts` → aucun changement ; seul `prisma/schema.prisma` diffère de 2 lignes).
Les numéros de ligne `schema.prisma` de ce rapport sont ceux du checkout local et peuvent décaler
de quelques lignes vis-à-vis de `main`.

---

## ⛳ CLÔTURE — 2026-08-31

**Cet audit est clos, et son constat central n'est plus vrai — c'est le but.** Il décrivait un canal
rompu depuis 57 jours et une dérive de 17 symboles. Les deux sont réparés, et vérifiables :

```
v1.4.0 publiée — origin/master e89b90b → 0c52c8f, tag annoté sur 0c52c8f
dérive : 74 symboles de part et d'autre, comm vide dans les deux sens
empreinte du corps vérifiée contre le registre de l'API : 5f7e61ff…6607
install réelle du tag depuis GitHub : dist/ produit par prepare, imports OK
```

**Ce qui a réparé le canal**, dans l'ordre où c'est arrivé : les besoins 1-2-3 côté API (la couche
sémantique, `BetOrigin` en 3ᵉ source du générateur) ; deux gardes locales côté API (`verify:contracts`
= fraîcheur, `verify:contracts-sync` = registre d'empreinte) parce qu'Actions y est **structurellement**
mort ; `verify:receivable` ici (compilation sous mon `tsconfig` **et** empreinte) ; puis la sync.

### Sort de chaque finding

| # | sort au 2026-08-31 |
| --- | --- |
| **F-01** | ✅ **clos** — les valeurs du Klash sont dans `v1.4.0` |
| **F-02** | 🟡 **réduit, pas supprimé** — la copie API → paquet reste **humaine**. Ce qui a changé : elle ne peut plus être *silencieuse*. Le registre d'empreinte bloque un push qui laisserait le contrat dériver sans tag |
| **F-03** | ✅ **clos** — une garde franchit enfin la frontière, dans les deux sens |
| **F-03b** | 🔴 **ouvert, côté API et hors de ma portée** — Actions y est mort (dépôt privé, facturation). Contourné par les gardes locales, pas résolu |
| **F-04** | ✅ **clos** — dérive nulle, mesurée |
| **F-05** | 🔴 **ouvert** — `ktkarena-web` est toujours épinglé sur `#v1.3.0` ; `ktkarena-mobile` et `ktkarena-admin` ne déclarent toujours pas le paquet. **C'est désormais le finding le plus important qui reste** : le canal est réparé, mais deux clients sur trois n'y sont pas branchés |
| **F-06** | ✅ **clos** — `CONTRACTS_VERSION` (`@ktk/contracts/version`) rend le retard *assertable*, et `CHANGELOG.md` voyage dans le paquet |
| **F-07** | ✅ **clos** — le générateur lit `bet-origin.type.ts` en 3ᵉ source |
| **F-08** | ⚪ **inchangé, et c'est structurel** — élargir un objet `as const` reste silencieux. Aucun outil ne peut le rendre bruyant ; seule la discipline de version le peut |
| **F-09** | ⚪ **inchangé** — republier un tag reste possible. Le registre le rendrait au moins visible côté API |
| **F-10** | ✅ **levé par la mesure** — l'install réelle de `v1.4.0` depuis GitHub produit bien `dist/` via `prepare`. Le piège reste théorique pour un `npm publish` depuis un clone non buildé |
| **F-11** | ✅ **clos** — les 10 canaux `WsEvent` manquants sont livrés, la règle « jamais de littéraux » redevient tenable |
| **F-12** | ✅ **clos** — README corrigé (web consomme en `github:`, pas en `file:`) |
| **F-13** | 🔴 **ouvert, et désormais INFIXABLE ICI** — la référence pendante à `DEPRECATION.md` vit à `src/index.ts:779`, donc **dans le miroir**. Y toucher ferait diverger l'empreinte. Elle appartient à `ktkarena-api/src/modules/websocket/websocket.types.ts` |

### Trois findings NÉS de la clôture — 2026-08-31, après la migration de `ktkarena-web`

Le bump du premier client a fait tomber ce que 57 jours de gel cachaient. Aucun n'était visible
avant que quelqu'un emprunte le canal réparé.

| # | finding |
| --- | --- |
| **F-14** | 🔴 **`npm install` seul ne bumpe PAS une dépendance git.** Mesuré sur un banc neuf : ref changée `#v1.3.0` → `#v1.4.0`, `npm install` → version reçue **1.3.0**, SHA inchangé, `dist/version.*` absent. npm tient la contrainte pour satisfaite par le lockfile. **`npm update @ktk/contracts` fonctionne.** Documenté dans `README.md`. ⚠️ Ce piège mordra `ktkarena-mobile` et `ktkarena-admin` au premier branchement |
| **F-15** | 🔴 **Les 5 canaux WS du mur ne sont déclarés NULLE PART dans du code.** `origin/main:src/modules/websocket/websocket.types.ts` ne contient aucun `wall:*` (seule correspondance : `WALLET_BALANCE_UPDATE`), et aucun émetteur n'existe dans `src/`. Le générateur n'a donc rien raté : `wall:posted`, `wall:matched`, `wall:cancelled`, `wall:released`, `wall:proposal_received` **n'existent que dans le prompt markdown**. C'est un cran pire que `WALL_BET_COMPLETED` : celui-là est au moins déclaré, donc le paquet peut dire « déclaré, non émis ». Des canaux jamais déclarés, il ne peut rien dire. **F-15 est A5 qui n'est pas mort** — la surface WS du mur reste intégralement du markdown |
| **F-16** | 🟡 **`movesWallet` est fail-open — hasard DIVULGUÉ, pas défaut à corriger.** `movesWallet('TYPE_INCONNU') === true`, vérifié à l'exécution chez un consommateur. Conséquence exacte : un type informatif ajouté côté serveur *après* le tag épinglé serait compté comme déplaçant un solde — le bug des 48 fausses alertes, reproduit. **Inverser le défaut n'est pas la solution** (fail-closed omettrait un type réellement mouvant et sous-estimerait le solde) : aucun défaut n'est sûr. **Disposition : aucun changement de code.** Le `.d.ts` livré porte déjà l'avertissement au point d'appel (`dist/index.d.ts:870-876`), donc un développeur le voit au survol ; et un `isKnownTransactionType` serait un producteur sans consommateur — `ktkarena-web` a mesuré qu'il ne somme aucune transaction et a décliné `movesWallet` lui-même pour cette raison. À rouvrir le jour où un client somme réellement |

> **Ce que F-14 et F-15 disent ensemble.** Réparer un canal ne le fait pas emprunter, et un canal
> emprunté révèle ce qu'un canal gelé taisait. `ktkarena-web` a trouvé trois `Record` exhaustifs qui
> ne l'étaient plus — dont un qui faisait tomber l'app sur un objet de boutique jamais encore
> publié. Sa formulation vaut mieux que la mienne : **pendant 57 jours, l'enum gelé garantissait une
> exhaustivité fausse.** C'est F-08 vu depuis l'autre bord — j'avais décrit le silence chez qui ne
> bumpe pas ; le prix se paie au bump, en une fois.

> **La leçon que je retiens, et elle n'est pas dans les findings.** Presque chaque défaut de ce
> chantier était un **document ou une garde qui avait l'air d'autorité et ne l'était pas** : une
> étape de CI qui ne s'exécutait plus, un `CLAUDE.md` décrivant une pratique inexistante, un README
> prescrivant « privé » sur un dépôt public, une empreinte incalculable depuis l'autre bord, un
> comptage qui filtrait `^export const` et ratait un symbole. Aucun n'a été trouvé par un test.
> **Tous ont été trouvés en mesurant la chose elle-même.**

---

## 0. ⚠️ ADDENDUM DU 2026-08-31 — la garde CI que je citais NE S'EXÉCUTE PAS

Le dépôt API a répondu à cet audit le 2026-08-31 et a apporté un fait que je ne pouvais pas voir
depuis ici. **Je l'ai vérifié moi-même avant de l'intégrer**, via `gh` sur le dépôt API :

```
gh run view 33307935274 --json jobs   (CI/CD Pipeline, main, 2026-08-30)
  {"name":"Build & Lint",       "conclusion":"failure", "steps":0}   ⬅ contient la garde
  {"name":"Docker Image Build", "conclusion":"failure", "steps":0}
  {"name":"Unit Tests",         "conclusion":"skipped", "steps":0}
  {"name":"E2E Tests",          "conclusion":"skipped", "steps":0}
  … idem Integration Tests, Deploy to Production
gh run view 33363060401 --log-failed  (le plus récent, 2026-08-31) → "log not found"
```

**`steps: 0` sur tous les jobs, sur tous les runs consultés** (12 derniers, du 2026-08-30 au
2026-08-31, toutes branches, **100 % en échec**). Aucun log n'existe : les jobs n'ont jamais
démarré. Cause donnée par le dépôt API : **facturation GitHub Actions bloquée depuis ~2026-08-10**
— je ne peux pas vérifier la cause d'ici, seulement l'effet, et l'effet est net.

Or l'étape « Verify contracts.ts is up to date » (`main.yml:35`) vit dans le job `build` /
« Build & Lint » (`main.yml:19-20`). **Elle n'a donc exécuté aucune de ses lignes.**

> 🔴 **Ce que ça corrige dans ce rapport.** J'écrivais en **B4** que la garde manquante était « la
> copie conforme d'une garde qui existe déjà **et qui marche**, décalée d'un dépôt ». **La seconde
> moitié de cette phrase est fausse.** La garde existe dans le fichier, elle ne s'exécute pas.
>
> **Ce que ça change concrètement — mon besoin n°4 porte un préalable que je n'avais pas nommé.**
> « Prolonger `main.yml:35-39` d'un job qui ouvre une PR ici » suppose que ce workflow tourne.
> Il faut donc **d'abord** rétablir l'exécution d'Actions côté API, **ou** porter l'automatisation
> hors Actions (hook `prepush`, ou une étape du `prebuild` qui échoue si le tag contrats est en
> retard). Sans ce préalable, le besoin n°4 est un job qui ne démarrera jamais.
>
> **Ce que ça ne change pas.** F-02 et le reste de F-03 tiennent intégralement : le maillon
> API → paquet reste une copie humaine, et rien ne compare `contracts.ts` à `src/index.ts`.
> Ce qui a empêché `contracts.ts` de dériver de `schema.prisma` malgré une CI morte n'est pas la
> garde : c'est le `prebuild` (`ktkarena-api/package.json:50`), qui régénère à chaque build local,
> plus la relecture humaine.

*État de la facturation daté de fin août 2026 — à revérifier avant de s'y fier.*
Les corrections correspondantes sont appliquées en §1.5, §2 A1, §2 B4, F-03 et §5 besoin 4.

---

## 1. Synthèse exécutive

1. **Je ne porte AUCUNE valeur du Klash.** `src/index.ts` ne contient pas une occurrence de `WALL`
   hors `WALLET_BALANCE_UPDATE:589`. Zéro sur 2 enums neufs, zéro sur 6 valeurs ajoutées.
2. **Je ne suis pas le canal réel de cette livraison, et ce n'est pas une opinion :** les trois
   clients ont livré le Klash en me contournant, et deux d'entre eux l'écrivent au point de code en
   me nommant et en me datant (`ktkarena-web/src/types/wall.ts:6-20`).
3. **La chaîne casse à un maillon précis et unique : la copie API → paquet.** Le générateur écrit
   `ktkarena-api/src/shared/contracts.ts` et **s'arrête là** (`scripts/generate-contracts.ts:15,27`).
   Le reste est une copie humaine documentée comme telle (`README.md:41`).
4. **Ce maillon est rompu depuis 57 jours.** Dernier commit ici : `e89b90b`, 2026-07-04. Les sept
   phases du mur (W1→W6) ont toutes été fusionnées après.
5. **Aucun garde-fou ne franchit la frontière du dépôt API** — et ⚠️ **corrigé le 2026-08-31 (§0) :
   celui qui existe ne s'exécute même pas.** La CI API déclare bien une vérification de fraîcheur
   (`main.yml:35-39`), mais elle porte sur son seul fichier **et** ses jobs sortent à `steps: 0`.
   **Ce dépôt n'a aucune CI, aucun test.**
6. **Dérive mesurée : 11 symboles et 23 valeurs de retard**, dont 10 canaux WebSocket — alors que
   `src/index.ts:567` interdit aux clients d'utiliser des littéraux WS.
7. **Un consommateur déclaré sur trois** (web). Mobile et admin ne me déclarent pas et ont retapé
   mes enums à la main, dans ma forme exacte.
8. `dist/` **est** à jour vis-à-vis de `src/` (vérifié par rebuild + `diff`, exit 0) — mais il est
   gitignoré, donc absent des tags ; c'est `prepare` qui le fabrique chez le client, et ça marche.
9. **La distinction « déclaré vs émis » ne tient pas dans ma forme actuelle** — mais trois dépôts
   l'ont déjà écrite à la main, ce qui est la définition d'un contrat manquant.
10. **Réparer les enums sans réparer le canal ne sert à rien.** Le sujet n'est pas la liste, c'est
    le maillon.

---

## 2. Réponses par point

### A. La chaîne de distribution

#### A1 — Comment ce paquet est-il produit ?

**Par quoi.** `ktkarena-api/scripts/generate-contracts.ts`, qui appelle `generateContracts()`
(`ktkarena-api/src/shared/contracts/generator.ts`, 304 lignes).

**Lancé par qui, depuis où.** Deux déclencheurs, tous deux dans le dépôt **API** :
- manuel — `npm run generate:contracts` (`ktkarena-api/package.json:48`) ;
- automatique — `prebuild` (`ktkarena-api/package.json:50` :
  `prisma generate && npm run generate:contracts && npm run lint:raw-sql`).

**Ce qu'il lit** (`scripts/generate-contracts.ts:7-14`) : `prisma/schema.prisma` **et**
`src/modules/websocket/websocket.types.ts`.

**Ce qu'il écrit** (`scripts/generate-contracts.ts:15,27`) : **un seul fichier**,
`ktkarena-api/src/shared/contracts.ts`.

> 🔴 **Le script n'écrit JAMAIS dans ce dépôt.** Le `README.md:5` (« généré via
> `npm run generate:contracts` dans le repo API ») est exact mais s'arrête au bon endroit ; l'étape
> suivante est explicitement humaine : `README.md:41` — « Copier
> `ktkarena-api/src/shared/contracts.ts` → `ktkarena-contracts/src/index.ts` ». Le `README.md:45`
> porte encore le TODO d'automatisation, ouvert depuis le 2026-06-09.

**Le script vit-il ici ou dans l'API ?** Dans l'API, entièrement. Ce dépôt ne contient **aucun**
script : `package.json:19-22` ne déclare que `build` (`tsc`) et `prepare`.

**Y a-t-il une vérification que la génération est à jour ?** **Oui — mais du mauvais côté de la
frontière.** `ktkarena-api/.github/workflows/main.yml:35-39` :

```
- name: Verify contracts.ts is up to date
  run: |
    npm run generate:contracts
    git diff --exit-code src/shared/contracts.ts || {
      echo "::error::src/shared/contracts.ts is stale. ..."
```

Cette garde protège `schema.prisma` → `contracts.ts`. **Rien, nulle part, ne compare
`contracts.ts` → `ktkarena-contracts/src/index.ts`.** C'est le maillon faible, et il est unique et
identifié. Voir **F-03**.

> ⚠️ **Correction du 2026-08-31 (§0) — cette garde ne s'exécute pas.** Le job `build`
> (`main.yml:19-20`) qui la contient sort à `steps: 0` sur tous les runs consultés. Elle protège
> `schema.prisma` → `contracts.ts` **sur le papier seulement**. Ce qui tient réellement ce maillon
> aujourd'hui est le `prebuild` (`ktkarena-api/package.json:50`) plus la relecture humaine.

**Note utile pour la suite :** le générateur ne se contente pas de recopier Prisma. Il embarque une
table écrite à la main (`generator.ts:132` `SUBCATEGORIES_DATA`) qu'il émet en
`SUBCATEGORIES` / `SUBCATEGORY_SLUGS` (`contracts.ts:772,891`). **La chaîne sait donc déjà
transporter autre chose qu'un enum Prisma** — ce point décide E3.

#### A2 — Comment une nouvelle version arrive-t-elle chez un client ?

Procédure documentée, `README.md:39-43` : (1) modifier `schema.prisma` ; (2) `generate:contracts` ;
(3) **copier à la main** ; (4) bump `package.json:3` + commit + tag ; (5) **mettre à jour à la main
la ref chez chaque client**.

**Qui déclenche ce sync ?** Un humain, à un moment non spécifié, sans rappel, sans ticket, sans
tâche planifiée. **Qu'est-ce qui garantit qu'il a lieu ?** *Rien.*

Mesure :

| fait | valeur |
| --- | --- |
| dernier commit | `e89b90b`, **2026-07-04 18:24 +0100** |
| `master` == `origin/master` == `v1.3.0` | `e89b90b6e9b8896fc176b7093bcc11006df02e94` |
| jours de gel au 2026-08-30 | **57** |
| tags | `v1.0.0`, `v1.1.0`, `v1.2.0`, `v1.3.0` — aucun depuis |

Les sept phases du mur (W1 `92ebae08` → W6 `44ff5600`, plus `a07a3534`, `cedf6d0e`, `07b0a93d`) ont
**toutes** été fusionnées pendant ce gel. Le mécanisme n'a pas mal fonctionné : **il n'a pas
fonctionné du tout**.

#### A3 — LA QUESTION DÉCISIVE : combien de clients me consomment réellement ?

**Réponse mesurée : un sur trois — et il me contourne pour le Klash.**

**`ktkarena-web` — ✅ ta mesure est confirmée, et il me consomme pour de vrai.**
- `ktkarena-web/package.json:29` : `"@ktk/contracts": "github:jordanZeledev/ktkarena-contracts#v1.3.0"`.
- Consommation réelle : **57 sites d'import** dans `src/`, ~20 symboles distincts (`BetStatus`,
  `TransactionType`, `PredictionResult`, `WsEvent`, `WsClientEvent`, `CascadeMode`,
  `PoolAcceptance`, `EventThematic`, `EventStatus`, `UserRole`, `ShopItem*`, `XPReason`…).
- Install fonctionnelle : `ktkarena-web/node_modules/@ktk/contracts/dist/index.js` (15 995 o) et
  `index.d.ts` (24 097 o) sont présents ⇒ le `prepare` a bien tourné à l'install git.

**`ktkarena-mobile` — ✅ il ne me déclare pas ; ⚠️ mais ta mesure du 2026-08-16 est périmée.**
- Aucune dépendance `@ktk` dans `package.json` — confirmé.
- Ce ne sont **plus seulement des commentaires**. Il y a des **copies vendorées annotées** :
  - `src/types/socket.ts:496-497` — « Canonical WS event names (vendored from `@ktk/contracts`
    **v1.2.0**) » ⇒ **annotation périmée d'une version** (le tag courant est v1.3.0) ;
  - `src/types/wallet.ts:6` — union locale vendorée ;
  - `src/types/wall.ts:1-33` — **les types Klash entiers, recopiés à la main**, avec en tête :
    « ⚠️ VALEURS RECOPIÉES À LA MAIN depuis le contrat backend du 2026-08-16. Ce dépôt n'a AUCUNE
    dépendance `@ktk/contracts` […] le canal EST la recopie humaine, **et il a déjà cédé** ».
  - Il existe même un test qui protège cette recopie : `src/types/__tests__/wall.test.ts:4`.

**`ktkarena-admin` — ✅ il ne me déclare pas ; ⚠️ ta mesure est périmée dans l'autre sens.**
- 0 occurrence de `@ktk` dans `package-lock.json` — confirmé.
- Tu écrivais qu'admin « ne contient aucune occurrence de `ChallengeStatus` ou `MatchSource` ».
  C'était vrai. Depuis, admin a **retapé mes enums à la main, dans ma forme exacte** :
  - `ktkarena-admin/src/services/wallApi.ts:14-20` — `WallBetStatus`, `as const` + type dérivé,
    verbatim ma convention ;
  - `ktkarena-admin/src/services/transactionsApi.ts:5-36` — `TransactionType` **complet**, incluant
    `WALL_LOCKED:21`, `WALL_RELEASED:22`, `WALL_PROPOSAL_LOCKED:23`, `WALL_PROPOSAL_RELEASED:24` et
    `BET_CANCEL_PENALTY:34`.

**L'affirmation du `CLAUDE.md` de l'API — ⛔ RÉFUTÉE, et je confirme ta lecture.**
`ktkarena-api/CLAUDE.md:92` affirme : *« Shared enum/DTO contract: `src/shared/contracts.ts`
(auto-generated from `prisma/schema.prisma`; **manually copied into ktkarena-admin and
ktkarena-mobile during releases**) »*.

Il n'existe **aucune copie de `contracts.ts`** dans l'un ou l'autre. Ce qui existe est plus étroit
et plus fragile : des **extraits partiels retapés par domaine**, avec des annotations de version
divergentes. La phrase du `CLAUDE.md` décrit une pratique qui n'a pas lieu, et sa présence est
activement nuisible : elle rassure. Voir **F-05**.

**Conclusion A3 — et oui, c'est plus large que le Klash.** Un contrat partagé consommé par un tiers
de ses destinataires n'est pas un contrat, c'est une convention. Les deux dépôts non déclarés ne
sont pas passifs : ils ont recréé ma forme (`as const` + type dérivé) à l'identique, ce qui prouve
que **le besoin est réel et que seul le canal manque**.

#### A4 — L'épinglage sur un tag git

**Ce qui protège aujourd'hui, et c'est mieux que la question ne le suppose :** npm ne conserve pas
le tag, il résout en **SHA** dans le lockfile.

```
ktkarena-web/package-lock.json:1334-1337
    "node_modules/@ktk/contracts": {
      "version": "1.3.0",
      "resolved": "git+ssh://git@github.com/jordanZeledev/ktkarena-contracts.git#e89b90b6e9b8896fc176b7093bcc11006df02e94"
    },
```

Ce SHA est exactement `git rev-parse v1.3.0`. Donc **`npm ci` est reproductible même si je déplaçais
le tag.**

**Ce qui ne protège pas :**
- l'entrée **ne porte aucun `integrity`** (comparer avec la ligne 1341 du même fichier, où un paquet
  de registre en porte un). Rien ne détecte un contenu modifié à SHA constant — cas rare, mais la
  garantie n'existe pas ;
- **`npm install`** (sans lock, lock rafraîchi, ou nouvelle install) **re-résout le tag**. Republier
  `v1.3.0` livrerait alors du code différent sous le même nom, **sans un mot** ;
- **un client qui ne bump jamais : il ne se passe rien.** Pas d'alerte, pas de warning, `tsc` passe,
  les tests passent. C'est exactement ce qui s'est produit pendant 57 jours.

**Y a-t-il un mécanisme qui rende la dérive bruyante ? Non.** Pas de CI ici, pas de `CHANGELOG`, pas
de constante de version exportée (voir C3), aucune vérification côté client. La dérive a été rendue
bruyante **uniquement** parce que trois agents humains/IA sont allés lire ce dépôt à la main et ont
écrit ce qu'ils voyaient en commentaire. Ce n'est pas un mécanisme, c'est de la vigilance.

#### A5 — Le canal réel de la livraison

**Il faut d'abord corriger une prémisse du prompt.**

> Le prompt affirme que le document est « un **document markdown de ce dépôt-ci**
> (`docs/coordination/prompts-impl/actifs/PROMPT-IMPL-KLASH-MOBILE.md`) ».

**C'est faux, et vérifiable en une commande.** `ktkarena-contracts` ne contient **aucun** répertoire
`docs/` :
- working tree : `ls docs` → *No such file or directory* ;
- historique complet : `git log --all --name-only` ne fait apparaître aucun fichier hors
  `.gitignore`, `README.md`, `package.json`, `package-lock.json`, `src/index.ts`, `tsconfig.json`.
  Le seul commit préfixé `docs:` est `6ae5565`, qui touche `README.md` ;
- `git ls-files "*.md"` → `README.md`, seul.

Le document vit dans le **dépôt API** :
`ktkarena-api/docs/coordination/prompts-impl/actifs/PROMPT-IMPL-KLASH-MOBILE.md`.
(Le prompt que je traite y vit aussi :
`ktkarena-api/docs/coordination/prompts-audit/en-attente/PROMPT-AUDIT-KLASH-CONTRACTS.md`.)

**Cette correction ne diminue en rien le fait — elle le rend plus net.** Le fait est confirmé, au
point de code, `ktkarena-api/prisma/schema.prisma:1584-1586` :

```
  // Klash / The Wall (W6, Tâche 1) — négociation. Noms GELÉS par le contrat
  // client (PROMPT-IMPL-KLASH-MOBILE.md, section « Notifications ») : ne pas
  // renommer, ne pas re-préfixer.
```

et de nouveau `:1591-1592` (« Noms GELÉS par le MÊME contrat, qui en fige six au total »).
*(Le prompt cite `1549-1551` ; dans mon checkout c'est `1584-1586`. Contenu identique.)*

**Réponse franche à la question posée — « contournement acceptable, ou signe que je ne suis pas dans
la boucle ? »**

> **Je ne suis pas le canal réel. Ce n'est pas un contournement, c'est une substitution, et elle a
> fonctionné.**

Et je ne le déduis pas : un client l'a écrit, en me nommant, en me datant, et en se trompant de
zéro. `ktkarena-web/src/types/wall.ts:4-20` :

```
 * ══ MIROIR MANUEL, ET IL DIT QU'IL EN EST UN ══════════════════════════════
 * Ces valeurs sont un miroir de `ktkarena-api/src/shared/contracts.ts`.
 * `@ktk/contracts` **n'en porte AUCUNE** — mesuré le 2026-08-26 :
 *   · `package.json` épingle `#v1.3.0`, et `v1.3.0` est le **dernier tag** ;
 *   · `master` du dépôt contrats n'a pas été poussé depuis le **2026-07-04**,
 *     donc pas une seule fois pendant la livraison du mur (W1 → W6) ;
 *   · son `src/index.ts` ne contient aucune occurrence de `WALL` hors
 *     `WALLET_BALANCE_UPDATE`, et **aucun `BetOrigin`**.
 * Le canal de la livraison du Klash n'a donc PAS été le paquet partagé […]
 * MIGRATION : le jour où un tag les publie, re-exporter depuis
 * `@ktk/contracts` et **supprimer ce bloc**.
```

Je confirme chacun des quatre points depuis mon côté. Le dernier — « aucun `BetOrigin` » — est même
plus profond que le client ne le sait ; voir **F-07** et B3.

**Ce que ça veut dire, sans détour.** Le prompt markdown a réussi là où j'ai échoué, pour une raison
structurelle et pas accidentelle : **il porte ce qu'un enum ne porte pas** — la sémantique (« quatre
états, pas de `WITHDRAWN`, et c'est une décision »), l'état d'émission, les drapeaux, la forme des
payloads, les dates. Trois clients ont eu besoin de tout cela ; je n'en offrais qu'une couche, et
même celle-là avait 57 jours de retard. **Un contrat qu'on double systématiquement d'un document
n'est pas doublé par accident : il est incomplet.** C'est le finding le plus important de cet audit,
et il commande tous les autres.

---

### B. La forme du contrat

#### B1 — Inventaire des exports et convention de casse

**57 symboles exportés**, tous du même moule, sans exception (`src/index.ts:7-666`) :

```ts
export const X = { VALEUR: 'VALEUR', … } as const;
export type X = (typeof X)[keyof typeof X];
```

Répartition : **55 enums Prisma** (`UserRole:7` → `SeasonGrantVia:558`), **2 tables d'événements
WebSocket** (`WsEvent:571`, `WsClientEvent:643`), **1 constante dépréciée**
(`WS_LEGACY_ODDS_UPDATE:670`). **Rien d'autre** — voir B3.

Ce ne sont **pas** des `enum` TypeScript : ce sont des objets gelés plus un type dérivé. Le choix est
bon (pas de runtime `enum`, compatible `erasableSyntaxOnly`, valeurs = chaînes) et il a une
conséquence directe sur B2 et E1 : **la forme est plate**. Elle exprime une appartenance, jamais une
propriété.

**Convention de casse :** UPPERCASE brut de Prisma, **clé identique à la valeur** partout (vérifié
sur les 55 enums).

**Est-elle vérifiée ? Pas ici.** Ce dépôt n'a ni test ni lint. La règle est énoncée et verrouillée
**côté API** :
- `ktkarena-api/.claude/rules/database-patterns.md:20` — « Output casing = contract casing = the raw
  Prisma enum value (UPPERCASE) […] zero output-side transforms (verified R5 audit 2026-06-12) » ;
- verrou e2e : `ktkarena-api/test/e2e/social-challenges-dm.e2e-spec.ts:591` — « serializes status in
  UPPERCASE matching `@ktk/contracts` ChallengeStatus ».

À noter : la seule casse de cette convention connue dans le projet est **côté client**, et c'est un
client qui ne me consomme pas — `ktkarena-mobile/src/services/socialService.ts:198` et
`src/components/chat/hooks/useBubbleState.ts:11` portent tous deux le commentaire « Casse CONTRAT
`@ktk/contracts` (`ChallengeStatus` = UPPERCASE) ». Un `ChallengeStatus` en minuscules compilait
sans jamais matcher — bulle de défi morte en DM. **C'est exactement le mode de panne que je suis
censé empêcher, et il s'est produit chez le dépôt qui ne me déclare pas.**

#### B2 — Comportement d'un ajout de valeur chez un consommateur qui ne bump pas

> **Rien. Ni erreur de compilation, ni warning. Dégradation silencieuse.**

Élargir un objet `as const` n'invalide **aucune** affectation, aucun `if`, aucune comparaison
existante. Le consommateur en retard :
- ne voit pas la nouvelle valeur (elle n'est pas dans son objet) ;
- compare une chaîne serveur inconnue à un objet incomplet → tombe dans son repli ;
- compile, teste et déploie sans un mot.

TypeScript **ne peut pas** aider ici : l'exhaustivité n'est vérifiée que si le développeur l'a
explicitement demandée (`Record<X, …>`, ou un `switch` avec garde `never`). Aucune des deux formes
n'est imposée par mon contrat.

**Le précédent existe déjà, il est documenté, et il est instructif** —
`ktkarena-api/src/shared/bet-origin.type.ts:16-19` :

```
 * `'WALL'` a été ajouté à l'union ci-dessus le 2026-08-17 (W3). **Élargir une
 * union ne casse AUCUNE affectation existante** : les six ternaires qui
 * produisaient `origin` dans `bets.service.ts` continuaient de compiler sans
 * un mot de `tsc`, en rendant simplement `'COMMUNITY'` pour un pari mural.
```

Six sites de production, zéro diagnostic, mauvaise étiquette. La parade choisie côté API n'a pas été
un type : ç'a été **une fonction** (`resolveBetOrigin`, `:40-49`) qui concentre la décision en un
point. C'est la bonne leçon pour E3.

#### B3 — Le paquet contient-il autre chose que des enums ?

**Aujourd'hui : non.** Aucun DTO, aucun schéma de validation, aucune garde de type, aucun prédicat,
aucune constante sémantique.

**Mais la chaîne sait déjà faire, et c'est décisif.** Côté API, `contracts.ts` porte deux exports
qui **ne viennent pas de Prisma** :
- `SUBCATEGORIES` (`ktkarena-api/src/shared/contracts.ts:772`) — un objet de données
  `{ slug, labelFr, labelEn }` par thématique ;
- `SUBCATEGORY_SLUGS` (`:891`) — une **valeur dérivée**, `Object.values(SUBCATEGORIES).flat().map(…)`.

Ces deux-là sont écrits à la main **dans le générateur** (`generator.ts:132` `SUBCATEGORIES_DATA`,
émis par `generator.ts:257-281`). ⇒ **L'argument « je ne peux porter que ce que Prisma déclare » est
faux, et il l'était déjà avant le Klash.** Ce qui bloque n'est pas la forme, c'est la décision.
*(Ces deux symboles font d'ailleurs partie de mes 11 symboles de retard — voir la table de dérive.)*

**Les formes de payload du Klash : ta responsabilité ou celle de chaque client ?**
Aujourd'hui c'est **la responsabilité de personne**, et le résultat est mesurable : **trois
descriptions indépendantes de la même carte**.

| dépôt | fichier | ce qu'il décrit |
| --- | --- | --- |
| web | `ktkarena-web/src/types/wall.ts` | `WallBet` **20 clés**, dump réel de `GET /wall` sur staging |
| mobile | `ktkarena-mobile/src/types/wall.ts` | même domaine, forme déclarée « NON DÉFINITIVE » (`:14`) |
| admin | `ktkarena-admin/src/services/wallApi.ts` | `WallBetStatus` + `WallPoster` + interfaces |

Et le commentaire de web (`src/types/wall.ts:28-32`) donne la mesure du coût :

```
 * ⚠️ La carte portait **18** clés jusqu'au 2026-08-27 ; `eventImageUrl` et
 * `eventCategory` sont arrivés ensemble (api PR #452 […]). Six commentaires de
 * ce dépôt affirmaient « 18 clés, ni plus ni moins » et ont dû être corrigés
 * d'un bloc : une forme mesurée est vraie à une DATE, jamais dans l'absolu.
```

**Mon avis :** les payloads ne devraient pas être *dérivés à la main*, mais ils ne devraient pas non
plus rester chez chaque client. La bonne granularité est la même que pour les enums : **ce qui est
gelé par le backend m'appartient**. Une forme mesurée sur un dump *n'est pas* gelée — c'est une
observation, et web a raison de l'écrire comme telle. Voir §4, arbitrage 3.

#### B4 — Existe-t-il un test qui échoue si `schema.prisma` et ce paquet divergent ?

> **Non. Nulle part. Mesuré, pas supposé.**

| ce qui est vérifié | où | franchit ma frontière ? |
| --- | --- | --- |
| `schema.prisma` → `contracts.ts` — ⚠️ **déclaré mais INERTE**, voir §0 | `ktkarena-api/.github/workflows/main.yml:35-39` (job `build`, `steps: 0`) | ❌ non |
| `schema.prisma` → `contracts.ts` — ce qui tient **réellement** | `ktkarena-api/package.json:50` (`prebuild`) + relecture humaine | ❌ non |
| logique du générateur (unitaire) | `ktkarena-api/src/shared/contracts/generator.spec.ts` | ❌ non |
| `contracts.ts` → `ktkarena-contracts/src/index.ts` | **rien** | — |
| `src/index.ts` → `dist/` | **rien** (mais `prepare` le régénère) | — |
| `@ktk/contracts` → clients | **rien** | — |

**Ce dépôt n'a ni `.github/`, ni fichier de workflow, ni script `test`, ni dépendance de test.**
Le seul outillage est `tsc` (`package.json:20,24`).

C'est **F-03**, et c'est le finding réparable le plus rentable de tout ce chantier : la garde qui
manque est la copie conforme d'une garde qui existe déjà, décalée d'un dépôt.

> 🔴 **Correction du 2026-08-31 (§0).** J'écrivais ici « une garde qui existe déjà **et qui
> marche** ». **La seconde moitié était fausse** : le job qui la porte sort à `steps: 0`. La copie
> est toujours la bonne idée, mais elle a un préalable — rétablir l'exécution d'Actions, ou sortir
> l'automatisation d'Actions. Voir §5, besoin 4.

---

### Mesure de la dérive réelle — le fait central

`ktkarena-contracts/src/index.ts` (670 l.) **vs** `ktkarena-api/src/shared/contracts.ts` (893 l.),
comparaison symbole par symbole puis valeur par valeur.

**11 symboles présents côté API, absents chez moi. 0 symbole en trop.**

```
ConversationFolder        EmailVerificationPurpose   PricingMode
StatusLifecycle           StatusMuteMode             StatusPrivacy
StatusType                SUBCATEGORIES              SUBCATEGORY_SLUGS
WallBetStatus  ⬅ Klash    WallBetProposalStatus  ⬅ Klash
```

> ⚠️ **Recompté le 2026-08-31 — le chiffre est maintenant 17, et mon « 11 » était sous-estimé de 1.**
> Mon premier comptage filtrait `^export const` seulement : il manquait `SubcategoryEntry`, un
> `export type` sans const jumelle. Le vrai retard au 2026-08-30 était donc **12**, pas 11.
>
> Depuis, le dépôt API a livré les besoins 1-2-3 (2026-08-31), qui ajoutent **5 symboles** :
> `BetOrigin`, `WALL_NOTIFICATION_TYPES_EMITTED`, `WALL_NOTIFICATION_TYPES_DECLARED_ONLY`,
> `INFORMATIVE_TRANSACTION_TYPES`, `movesWallet` (`contracts.ts:899,911,922,931,942`).
>
> **Retard actualisé : 17 symboles, 0 en trop.** Livrer les besoins 1-2-3 sans 4b **creuse** l'écart
> plutôt qu'il ne le comble — c'est attendu et sain (la source doit avancer la première), mais ça
> confirme que 4b est désormais le seul verrou.
>
> ✅ **Vérifié côté réception** : le nouveau `contracts.ts` compile **sans erreur sous mon propre
> `tsconfig.json`** (`strict`, ES2022, `declaration`) — `tsc` exit 0 — et le `.d.ts` sort correct,
> `movesWallet` compris (`export declare const movesWallet: (type: string) => boolean`). Aucune
> collision de symbole. ⚠️ `movesWallet` est la **première fonction** que ce contrat exporte : le
> paquet cesse d'être purement effaçable et `dist/index.js` porte désormais du comportement. C'est
> conforme à ce que je recommandais en E3 et B3 — je le signale comme un changement de nature, pas
> comme un problème.

**23 valeurs manquantes dans des enums que je porte déjà :**

| enum | moi | API | manquantes |
| --- | --- | --- | --- |
| `TransactionType` (`src/index.ts:84`) | 10 | 15 | `BET_CANCEL_PENALTY`, `WALL_LOCKED`, `WALL_RELEASED`, `WALL_PROPOSAL_LOCKED`, `WALL_PROPOSAL_RELEASED` |
| `MatchSource` (`:299`) | 4 | 5 | `WALL` |
| `NotificationType` (`:173`) | 58 | 65 | `WALL_BET_DORMANT`, `WALL_PROPOSAL_RECEIVED`, `WALL_PROPOSAL_DECLINED`, `WALL_BET_MATCHED`, `WALL_BET_COMPLETED`, `WALL_BET_RELEASED`, **+ `STATUS_RESHARED`** |
| `WsEvent` (`:571`) | 68 | 78 | `BET_PLACED`, `CHALLENGE_ACCEPTED`, `CHALLENGE_DECLINED`, `DM_REQUEST_COUNT`, `STATUS_DELETED`, `STATUS_NEW`, `STATUS_POLL_VOTE`, `STATUS_REACTION`, `STATUS_REVEALED`, `STATUS_VIEWED` |
| `WsClientEvent` (`:643`) | 21 | 21 | — ✅ à jour |
| `ChallengeStatus`, `BetStatus` | 5 / 7 | 5 / 7 | — ✅ à jour |

**Confirmation des valeurs figées du prompt**, lues en base de code et non recopiées de ta note :
- `WallBetStatus` = `OPEN | COMPLETED | CANCELLED | RELEASED` — `schema.prisma:4727-4732`,
  `contracts.ts:636-642` ✅ ;
- `WallBetProposalStatus` = `PENDING | ACCEPTED | DECLINED | EXPIRED`, **quatre états, aucun
  `WITHDRAWN`** — `schema.prisma:4734-4739`, `contracts.ts:644-651` ✅ ;
- `MatchSource` gagne `WALL` (5 valeurs) — `schema.prisma:2022-2027` ✅ ;
- `TransactionType` gagne **cinq** valeurs, `BET_CANCEL_PENALTY` inclus —
  `schema.prisma:106,113-116` ✅ ;
- `NotificationType` gagne **six** valeurs murales — `schema.prisma:1583,1588-1589,1607-1609` ✅.

> ⚠️ **Deux écarts vis-à-vis de la note du prompt, à connaître avant de rédiger le second prompt :**
>
> 1. **`STATUS_RESHARED` est une septième valeur de `NotificationType`** absente de chez moi
>    (`schema.prisma:1580`). Elle n'appartient pas au Klash mais elle voyagera dans le même tag.
> 2. **10 canaux `WsEvent` manquent aussi.** Ce n'est pas cosmétique : `src/index.ts:567` porte la
>    règle *« Les clients DOIVENT référencer ces constantes — jamais de littéraux. »* Cette règle est
>    **intenable pour 10 canaux** — un client discipliné n'a d'autre choix que de la violer, ou de
>    ne pas écouter ces événements. Voir **F-11**.

**Et le cas à part — `BetOrigin` :**

> 🔴 **`BetOrigin` n'existe ni chez moi, ni dans `contracts.ts`, ni dans `schema.prisma`.**
> Ce n'est **pas un enum Prisma** — `grep "enum BetOrigin" prisma/schema.prisma` ne rend rien. C'est
> une union TypeScript écrite à la main dans le dépôt API :
> `ktkarena-api/src/shared/bet-origin.type.ts:10` —
> `export type BetOrigin = 'COMMUNITY' | 'GROUP' | 'CHALLENGE' | 'WALL';`
> calculée par `resolveBetOrigin()` (`:40-49`), et exposée en clair dans les DTO
> (`src/modules/cascade-engine/dto/cascade-bet-response.dto.ts:92` :
> `enum: ['COMMUNITY', 'GROUP', 'CHALLENGE', 'WALL']`).
>
> Le générateur ne lit que `schema.prisma` et `websocket.types.ts`
> (`scripts/generate-contracts.ts:7-14`). **`BetOrigin` est donc structurellement hors de ma portée
> aujourd'hui** — ce n'est pas un oubli de sync, c'est un trou dans la chaîne. Le formuler comme
> « `BetOrigin` gagne `'WALL'` » suppose que je le porte déjà ; je ne l'ai jamais porté. Voir
> **F-07** et §5, besoin 3.

---

### C. Versionnage et compatibilité

#### C1 — Discipline de version

SemVer **de façade, jamais formalisée** : aucun `CONTRIBUTING`, aucune règle écrite, `README.md:42`
dit seulement « Bump `version` […] commit + tag ».

Ce que l'historique révèle : `v1.1.0` (section WebSocket + alias déprécié) et `v1.2.0` (deux valeurs
de `WsClientEvent`) sont des **ajouts de valeurs publiés en mineur**. `v1.3.0` idem
(`SonicStickerPackStatus`, `OAuthProvider`, enums `Season`, `CHALLENGE`).

**Un ajout de valeur est-il mineur ou majeur ? La question est mal posée pour ce paquet, et je le dis
franchement.** Un ajout de valeur est cassant **uniquement** pour un consommateur qui a demandé
l'exhaustivité (`Record<X, …>` ou `switch`/`never`). Personne ne l'impose ici, et web l'interdit même
explicitement pour les notifications (`ktkarena-web/src/types/wall.ts:100-101` : « **NE JAMAIS
introduire un `Record<NotificationType, …>` exhaustif** »).

Le vrai problème n'est pas le numéro. **Tant qu'aucun consommateur ne bump automatiquement, la
discipline de version ne protège personne** : passer en `2.0.0` aurait produit exactement le même
résultat que les 57 jours écoulés, c'est-à-dire aucun. Réparer C1 avant A2 serait ranger la façade.

#### C2 — CHANGELOG

**Aucun.** `git ls-files "*.md"` → `README.md`, seul. Pas de `CHANGELOG.md`, pas de `DEPRECATION.md`
(alors que `src/index.ts:669` en cite un : *« Retrait suivi dans DEPRECATION.md »* — **ce fichier
n'existe pas dans ce dépôt** ; le seul `DEPRECATION.md` du projet est
`ktkarena-api/DEPRECATION.md`, qui parle bien de ce sujet en `:130`. Référence pendante).

L'historique git fait office, et il le fait plutôt bien : les messages de tag énumèrent ce qui
change (`de5b123`, `e89b90b`). **Mais il est invisible depuis un client** — rien de tout cela n'est
livré dans le paquet, et `files: ["dist","src"]` ne l'emporterait pas même s'il existait.

**Comment un client sait-il ce qui a changé ?** En clonant ce dépôt et en lisant `git log`. C'est
littéralement ce que web a fait, à la main, le 2026-08-26 (`src/types/wall.ts:7-12`).

#### C3 — Un client peut-il savoir qu'il est en retard ?

> **Non. Aucun moyen, ni au build, ni à l'exécution.**

- Je n'exporte **aucune constante de version** — pas de `CONTRACTS_VERSION`, rien.
  `package.json:3` porte `1.3.0` mais n'est pas ré-exporté par `src/index.ts` et n'est donc pas
  lisible depuis un import typé.
- Aucun en-tête, aucun endpoint, aucune négociation ne compare la version du client à celle du
  serveur.
- Les trois clients ont dû aller voir eux-mêmes, à des dates différentes, et leurs conclusions ont
  **déjà divergé** : `ktkarena-mobile/src/types/socket.ts:496` s'annonce vendoré de **v1.2.0** ;
  `ktkarena-web/src/types/wall.ts:8-10` a mesuré **v1.3.0 + gel au 2026-07-04**. Deux clients, deux
  vérités, aucune fausse — juste deux dates.

**Recommandation à coût quasi nul** (voir §5, besoin 4) : exporter
`export const CONTRACTS_VERSION = '1.3.0' as const;` et, mieux, une constante de date de
génération. Ça ne rend pas la dérive bruyante toute seule, mais ça la rend **assertable** : un client
peut alors écrire un test qui échoue.

---

### D. Ton dépôt

#### D-1 — Stack, build, tests, CI

| | |
| --- | --- |
| Langage | TypeScript `~5.9.2` en `devDependencies` (`package.json:24`), résolu `5.9.3` (`package-lock.json:15`) |
| Build | `tsc` seul (`package.json:20`). `target ES2022`, `module ESNext`, `moduleResolution bundler`, `strict: true`, `declaration: true` (`tsconfig.json:2-10`) |
| Entrées | `main`/`module` → `./dist/index.js`, `types` → `./dist/index.d.ts`, plus un `exports` moderne (`package.json:6-14`) |
| Hook | `prepare: npm run build` (`package.json:21`) — **c'est le pilier de tout le canal git** |
| Publication | `private: true` (`package.json:26`) ⇒ jamais de registre npm ; distribution 100 % git |
| Tests | **aucun** — pas de script `test`, pas de dépendance de test |
| Lint / format | **aucun** |
| CI | **aucune** — pas de `.github/`, aucun fichier de workflow |
| Dépendances runtime | **zéro** ✅ (bon point : rien à casser chez un consommateur) |

Le paquet est minimal et sain **dans ce qu'il fait**. Ce qui manque n'est pas de la complexité, c'est
une garde et un déclencheur.

#### D-2 — Le `dist/` versionné est-il à jour vis-à-vis de `src/` ?

**J'ai vérifié, je n'ai pas supposé — et la question mérite une réponse en trois étages, parce que sa
prémisse est inexacte.**

**Étage 1 — `dist/` n'est PAS versionné.**

```
.gitignore:2                         dist/
git ls-files dist/                   → (vide)
git check-ignore -v dist/index.js    → .gitignore:2:dist/	dist/index.js
```

`dist/` est **gitignoré et non tracké**. Il n'est dans **aucun** tag, `v1.3.0` compris. **Ce n'est
donc pas « le fichier que les consommateurs lisent réellement »** depuis une dépendance git — il
n'est pas dans ce qu'ils clonent.

**Étage 2 — ce que les consommateurs lisent est fabriqué à l'install, et ça marche.**
`npm` clone le dépôt puis exécute `prepare` (`package.json:21`), qui lance `tsc`. **Vérifié
empiriquement chez le seul consommateur réel** :

```
ktkarena-web/node_modules/@ktk/contracts/dist/index.d.ts   24 097 o
ktkarena-web/node_modules/@ktk/contracts/dist/index.js     15 995 o
ktkarena-web/node_modules/@ktk/contracts/package.json      "version": "1.3.0"
```

**Étage 3 — le `dist/` local est-il à jour vis-à-vis de `src/` ? OUI, à l'octet près.**
J'ai recompilé dans un répertoire temporaire (`tsc -p tsconfig.json --outDir <scratch>`, **sans
toucher à `dist/`**), puis comparé :

```
tsc exit=0
diff dist/index.js    <scratch>/index.js     → exit 0  (identique)
diff dist/index.d.ts  <scratch>/index.d.ts   → exit 0  (identique)
```

Et les tailles concordent exactement avec celles installées chez web (24 097 / 15 995) — le `dist/`
local, le build frais et l'artefact livré sont le même octet pour octet.

> ⚠️ **Une contradiction latente à corriger, sans urgence.** `package.json:15-18` déclare
> `"files": ["dist", "src"]` alors que `dist/` est gitignoré. Aujourd'hui c'est inoffensif :
> `prepare` couvre le cas de l'install git. Mais un `npm pack` ou `npm publish` lancé depuis un
> **clone frais sans build** produirait un tarball **sans `dist/`**, avec `main` et `types` pointant
> dans le vide — panne franche à l'import. Le jour où le paquet passe par un registre (ou par un
> cache d'artefact CI), il faut un `prepack`. Voir **F-10**.

---

### E. Déclaré vs émis

#### E1 — Ma forme peut-elle porter la distinction dans le type ?

> **Non. Un objet `as const` est plat : `NotificationType.WALL_BET_COMPLETED` est structurellement
> indistinguable de `NotificationType.WALL_BET_MATCHED`. Et un commentaire dans un `.d.ts` n'est pas
> un type — tu as raison de refuser cette réponse.**

Trois options, et je tranche :

**(a) Commentaire seul — insuffisant.** C'est ce que fait le schéma
(`ktkarena-api/prisma/schema.prisma:1601-1606`), et c'est excellent *là où c'est* : le mainteneur
backend le lit. Mais ça ne franchit pas la frontière du paquet, et ça n'est pas assertable.

**(b) Sous-ensembles exportés — ✅ ce que je recommande.**

```ts
export const WALL_NOTIFICATION_TYPES_EMITTED = [
  NotificationType.WALL_BET_DORMANT,
  NotificationType.WALL_PROPOSAL_RECEIVED,
  NotificationType.WALL_PROPOSAL_DECLINED,
  NotificationType.WALL_BET_MATCHED,
] as const;

/** Déclarés en base, AUCUN émetteur serveur au 2026-08-30. Ne pas router. */
export const WALL_NOTIFICATION_TYPES_DECLARED_ONLY = [
  NotificationType.WALL_BET_COMPLETED,
  NotificationType.WALL_BET_RELEASED,
] as const;
```

Ce n'est pas une invention de ma part : **trois dépôts l'ont déjà écrit à la main**, ce qui est la
définition même d'un contrat manquant.

| dépôt | fichier:ligne | forme |
| --- | --- | --- |
| web | `ktkarena-web/src/types/wall.ts:106-115` | `WALL_NOTIFICATION_TYPES` `as const`, les deux sans émetteur annotés individuellement (`:111`, `:113`) |
| mobile | `ktkarena-mobile/src/components/social/NotificationItem.tsx:82-92` | « ⚠️ SEULS LES TYPES RÉELLEMENT ÉMIS figurent ici » |
| mobile | `ktkarena-mobile/src/utils/notificationNav.ts:103-116` | « ⚠️ `WALL_BET_COMPLETED` ET `WALL_BET_RELEASED` NE SONT PAS CÂBLÉS, ET CE… », plus un test dédié `src/utils/__tests__/notificationNavWall.test.ts:53-54` |

**(c) Retirer les deux valeurs — impossible.** PostgreSQL n'a pas de `DROP VALUE`. Elles sont
gravées, comme tu l'écris.

**⚠️ Une précision qui change le diagnostic.** Le prompt dit : *« un client écrira un `switch`
exhaustif à six branches dont deux sont mortes »*. Dans ma forme actuelle, **ce risque-là est
faible** : rien ne rend un `switch` exhaustif obligatoire — TypeScript ne l'exige que si le
développeur l'a demandé. Web l'a compris et l'a **interdit** (`src/types/wall.ts:100-104`) :

```
 * ⇒ **NE JAMAIS introduire un `Record<NotificationType, …>` exhaustif** pour
 * router ces notifications. […] Le repli neutre de
 * `utils/notificationVisual.ts:101-103` est ce qui nous protège — c'est le
 * seul endroit de ce dépôt où l'absence de typage strict est un ACTIF.
```

**Le vrai risque est l'inverse, et il est plus insidieux : du code mort qu'aucun outil ne signale.**
Un développeur câble une icône, un libellé, une navigation et un test pour `WALL_BET_COMPLETED`,
tout passe au vert, et rien n'arrive jamais en production. C'est une journée perdue par client, et
c'est reproductible à chaque nouveau client. Le sous-ensemble exporté ne rend pas ça impossible —
il le rend **lisible au moment de l'import**, ce qui est le seul moment où quelqu'un regarde.

#### E2 — Est-ce que j'exporte des valeurs qu'aucun chemin serveur n'écrit ?

**Aujourd'hui je n'exporte aucune valeur murale du tout**, donc la question est théorique pour le
Klash. Mais la forme (b) me permettrait de l'exprimer, sans mesurer quoi que ce soit côté API.

**Coût pour les consommateurs : nul.** C'est une addition — aucun symbole existant ne change de
forme, aucun import ne casse, un client qui l'ignore n'est pas plus mal loti qu'aujourd'hui. C'est
donc publiable en **mineur** sans débat.

**Le coût réel est ailleurs, et il est côté backend.** Cette liste doit **rester vraie**, et elle
n'est **pas dérivable de `schema.prisma`** — c'est une propriété du code d'émission, pas du schéma.
Le générateur ne peut pas la produire. Elle ne peut venir que :
- d'une **source déclarative côté API** que le générateur lirait (comme il lit déjà
  `websocket.types.ts`), idéalement adossée à un test qui échoue quand un type déclaré-émis n'a
  aucun émetteur ; ou
- d'une **revue humaine à chaque release** — c'est-à-dire exactement le mécanisme qui vient
  d'échouer 57 jours durant.

**Je recommande la première, et c'est mon besoin n°1 du backend** (§5). Une liste figée à la main
chez moi serait une quatrième copie du même fait, et je serais mal placé pour la reprocher aux
clients.

#### E3 — `BET_CANCEL_PENALTY` et `COMMISSION` sont informatifs : à qui de l'exprimer ?

> **Mon avis, net : c'est ma responsabilité. Et l'argument n'est pas théorique — il a déjà été payé
> trois fois, dans trois dépôts, pour le même fait.**

Ce n'est pas une préférence d'affichage. « Cette ligne porte un montant mais ne déplace aucun
portefeuille » est une **propriété du modèle de données backend**, exactement au même titre que
« cette valeur existe dans l'enum ». Un client ne peut ni la déduire, ni la mesurer, ni la deviner :
rien dans une chaîne UPPERCASE ne la dit.

**Les trois paiements, mesurés :**

1. **L'API** — 48 fausses alertes `fatal` sur 50 le 2026-06-27, pour un `COMMISSION` oublié. Cité
   dans `ktkarena-admin/src/utils/transactionDisplay.ts:88-91`.
2. **Admin** a dû inventer sa parade — `src/utils/transactionDisplay.ts:96-98` :
   ```ts
   export const NON_WALLET_TYPES: readonly string[] = Object.entries(TYPE_CONFIG)
     .filter(([, cfg]) => !cfg.movesWallet)
     .map(([type]) => type);
   ```
   avec, juste au-dessus (`:91`), cette phrase : *« il a fallu tenir la liste à jour à DEUX endroits.
   **Tout lecteur ajouté ici en devient un troisième.** »*
3. **Web est ce troisième** — `src/components/wallet/txFilters.ts:28-33` et
   `src/types/wall.ts:87-88` (`/** ⚠️ INFORMATIF — aucun mouvement de solde. */`). Web s'en sort
   parce qu'il ne somme rien côté client (`src/types/wall.ts:74-77` : le signe vient de
   `tx.isCredit`, le solde de `tx.balanceAfter`) — **mais il a quand même dû écrire l'avertissement
   pour éviter qu'on l'introduise.**

Trois listes, trois dépôts, une seule vérité. C'est le motif exact que ce paquet existe pour
supprimer.

**Ce que je propose de porter :**

```ts
/** Montant réel, AUCUN mouvement de portefeuille. Exclure de tout Σ transactions. */
export const INFORMATIVE_TRANSACTION_TYPES = [
  TransactionType.COMMISSION,
  TransactionType.BET_CANCEL_PENALTY,
] as const;

/** `true` si la ligne déplace réellement un solde. Type inconnu ⇒ `true` (prudent). */
export const movesWallet = (type: string): boolean =>
  !(INFORMATIVE_TRANSACTION_TYPES as readonly string[]).includes(type);
```

La signature de `movesWallet` est **volontairement identique** à celle d'admin
(`transactionDisplay.ts:101`), pour que sa migration soit un remplacement d'import et rien d'autre.
Coût chez moi : ~10 lignes. Économie : trois listes divergentes supprimées, et un mode de panne
`fatal` déjà constaté fermé à la source.

**⚠️ La nuance que je ne veux pas perdre, parce qu'elle limite la portée de ma propre
recommandation.** Le prédicat d'admin renvoie `true` pour un type inconnu — « prudent »
(`transactionDisplay.ts:100`). Un prédicat exporté par moi hérite du **piège inverse** : un type
informatif **neuf**, ajouté côté serveur après le tag qu'un client a épinglé, serait compté comme
déplaçant un solde. **C'est le même problème de retard de version, déplacé d'un cran** — pas résolu.
Ça ne condamne pas la proposition : elle **concentre** trois erreurs possibles en une seule, à un
endroit qu'on peut surveiller. Mais elle ne se substitue pas à la réparation du canal (A2), et il
serait malhonnête de la vendre comme telle.

---

## 3. Registre des findings

| # | Sév. | Finding | Preuve |
| --- | --- | --- | --- |
| **F-01** | **P0** | **Je ne porte aucune valeur du Klash.** 0 sur 2 enums neufs, 0 sur 6 valeurs ajoutées, alors que les 7 phases sont fusionnées et que les 3 clients ont livré. | `src/index.ts` : aucune occurrence de `WALL` hors `WALLET_BALANCE_UPDATE:589` |
| **F-02** | **P0** | **Le maillon API → paquet est une copie humaine**, non scriptée, non planifiée, non vérifiée — et il est **rompu depuis 57 jours**. | `scripts/generate-contracts.ts:15,27` (écrit un seul fichier, côté API) ; `README.md:41,45` ; dernier commit `e89b90b` 2026-07-04 |
| **F-03** | **P0** | **Aucun garde-fou de dérive ne franchit la frontière du dépôt API.** La garde existe et s'arrête un dépôt trop tôt. Ce dépôt n'a ni CI, ni test. | `ktkarena-api/.github/workflows/main.yml:35-39` ; absence de `.github/` ici ; `package.json:19-22` |
| **F-03b** | **P0** | ⚠️ **Ajouté le 2026-08-31 : la garde CI de F-03 NE S'EXÉCUTE PAS.** Tous les jobs sortent à `steps: 0`, aucun log, 12/12 runs en échec. Le job `build` porte l'étape « Verify contracts.ts ». ⇒ **le besoin n°4 a un préalable non nommé dans la v1 de ce rapport.** | `gh run view 33307935274 --json jobs` → `Build & Lint: steps 0` ; `main.yml:19-20,35` ; §0 |
| **F-04** | **P1** | **Dérive mesurée : ~~11~~ → 12 symboles au 2026-08-30, `17` au 2026-08-31, + 23 valeurs de retard.** (Mon « 11 » filtrait `^export const` et ratait `SubcategoryEntry` ; +5 symboles livrés depuis par les besoins 1-2-3.) Dont `WallBetStatus`, `WallBetProposalStatus`, `BetOrigin`, `movesWallet`, 5 `TransactionType`, 1 `MatchSource`, 7 `NotificationType`, 10 `WsEvent`. | table §2, « Mesure de la dérive réelle » + son encadré du 2026-08-31 |
| **F-05** | **P1** | **2 consommateurs sur 3 ne me déclarent pas, et le 3ᵉ me contourne pour le Klash.** L'affirmation de copie manuelle du `CLAUDE.md` API est **fausse** — aucune copie de `contracts.ts` n'existe chez admin ou mobile. | `ktkarena-api/CLAUDE.md:92` ; `ktkarena-mobile/package.json` (0 `@ktk`) ; `ktkarena-admin/package-lock.json` (0 `@ktk`) ; `ktkarena-web/src/types/wall.ts:6-20` |
| **F-06** | **P1** | **Un client ne peut pas savoir qu'il est en retard.** Aucune version exportée, aucun CHANGELOG livré, aucune négociation. Les clients ont mesuré à la main, à des dates différentes, et divergent déjà. | `src/index.ts` (aucune constante de version) ; `ktkarena-mobile/src/types/socket.ts:496` (« v1.2.0 ») vs `ktkarena-web/src/types/wall.ts:8-10` (« v1.3.0 ») |
| **F-07** | **P1** | **`BetOrigin` est structurellement hors de portée du générateur** — ce n'est pas un enum Prisma mais une union manuscrite du dépôt API. Je ne l'ai **jamais** porté ; le formuler comme « gagne `WALL` » est trompeur. | `ktkarena-api/src/shared/bet-origin.type.ts:10,40-49` ; `scripts/generate-contracts.ts:7-14` ; aucun `enum BetOrigin` dans `schema.prisma` |
| **F-08** | **P2** | **Un ajout de valeur est totalement silencieux** chez un consommateur qui ne bump pas : pas d'erreur, pas de warning, repli muet. Précédent déjà payé côté API. | `ktkarena-api/src/shared/bet-origin.type.ts:16-19` (6 ternaires, 0 diagnostic) |
| **F-09** | **P2** | **Republier un tag est possible et silencieux.** Le lockfile résout en SHA (protège `npm ci`), mais sans `integrity`, et un `npm install` re-résout le tag. | `ktkarena-web/package-lock.json:1334-1337` (pas de champ `integrity`) |
| **F-10** | **P2** | **`files: ["dist","src"]` vs `dist/` gitignoré** : piège latent. Un `npm pack`/`publish` depuis un clone frais sans build produirait un tarball sans `dist/`, `main`/`types` dans le vide. | `package.json:15-18` vs `.gitignore:2` ; `git ls-files dist/` vide |
| **F-11** | **P2** | **La règle « jamais de littéraux WS » est intenable** : 10 canaux `WsEvent` sont absents. Un client discipliné doit la violer ou renoncer à ces événements. | `src/index.ts:567` vs les 10 manquants (§ dérive) |
| **F-12** | **P3** | **README périmé sur son propre exemple** : il affirme que web consomme en `file:` ; web est en `github:` depuis. | `README.md:23,49` vs `ktkarena-web/package.json:29` |
| **F-13** | **P3** | **Référence pendante** : `src/index.ts:669` renvoie à un `DEPRECATION.md` qui n'existe pas dans ce dépôt (il existe côté API). | `src/index.ts:669` ; `git ls-files "*.md"` → `README.md` seul ; `ktkarena-api/DEPRECATION.md:130` |

---

## 4. Arbitrages — ce que je ne peux pas décider seul

1. **🔴 Suis-je encore le canal, oui ou non ?**
   C'est l'arbitrage qui commande tous les autres, et il est binaire. Le Klash a été livré **de bout
   en bout, sur trois clients, sans moi**, via des prompts markdown qui portaient ce qu'un enum ne
   porte pas. Deux issues honnêtes :
   - **(A) Me réparer** — automatiser le sync, ajouter la garde, élargir la portée (§5). Le canal
     markdown reste pour la sémantique, moi pour les valeurs.
   - **(B) M'assumer comme mort** — retirer la dépendance de web, supprimer le paquet, et acter que
     le canal officiel est le prompt d'implémentation + la recopie annotée. C'est déjà l'état de
     fait pour 3 clients sur 3 sur le Klash.
   **La pire issue est la troisième : me livrer les enums du Klash sans réparer A2.** Je serais à
   jour un jour, et à nouveau muet à la livraison suivante — sauf que cette fois trois dépôts
   porteraient à la fois leur miroir manuel *et* mon import, avec un risque de divergence pire
   qu'aujourd'hui.
2. **Si (A) : où vit l'automatisation ?** Un job de la CI API qui ouvre une PR ici quand
   `contracts.ts` change (mon favori — la garde `main.yml:35-39` existe déjà, il suffit de la
   prolonger) ; ou un submodule git ; ou l'absorption de ce paquet dans un monorepo. Décision
   d'architecture, pas de contrat.
3. **Quelle portée ?** Trois paliers, chacun défendable :
   - **enums seuls** (statu quo) — mais alors les payloads Klash restent triplés (B3) ;
   - **enums + sous-ensembles sémantiques** (émis/déclaré-seul E1, informatif/portefeuille E3) —
     **c'est ce que je recommande**, coût faible, trois duplications supprimées ;
   - **+ formes de payload** — utile, mais une forme *mesurée sur un dump* n'est pas *gelée*
     (`ktkarena-web/src/types/wall.ts:28-32` : 18 clés → 20 en un jour). N'accepter que ce que le
     backend gèle explicitement.
4. **Discipline de version.** Majeur pour tout ajout de valeur, ou mineur ? Mon avis : la question
   est secondaire tant qu'aucun client ne bump automatiquement (C1). À trancher **après** 1 et 2.
5. **Mobile : dépendance git ou vendorage assumé ?** Le `README.md:51` documente que `file:../` casse
   les builds EAS (vérifié juin 2026), mais que `github:` **fonctionne** sur EAS. Mobile a pourtant
   choisi le vendorage. Est-ce une contrainte technique résiduelle ou une préférence ? Si c'est une
   préférence, le vendorage peut rester **à condition** d'un script de vérification qui échoue en CI
   mobile — sinon c'est F-05 pour toujours.
6. **Détails de gouvernance de ce dépôt** : sortir `dist/` du `.gitignore` **ou** ajouter un
   `prepack` (F-10) ; créer un `CHANGELOG.md` et le livrer dans `files` (C2) ; corriger `README.md`
   (F-12) et la référence pendante (F-13).

---

## 5. Ce dont j'ai besoin du backend pour livrer les enums du Klash proprement

Par ordre de dépendance. Les besoins 1 à 3 bloquent la **qualité** de la livraison ; le 4 bloque sa
**pérennité**.

1. **🔴 La liste « émis vs déclaré-seul », sous forme déclarative et vérifiable — pas en
   commentaire.** (E1/E2)
   Le commentaire de `schema.prisma:1595-1606` est excellent mais ne franchit pas la frontière et
   n'est pas assertable. Il me faut une source que le générateur puisse lire — comme il lit déjà
   `websocket.types.ts` — **et** idéalement un test API qui échoue si un `NotificationType` annoncé
   comme émis n'a aucun émetteur. Sans cela, ma liste sera une quatrième copie manuscrite du même
   fait, et je serai mal placé pour reprocher aux clients les leurs.

2. **🔴 La liste des `TransactionType` informatifs, même exigence.** (E3)
   Aujourd'hui `COMMISSION` et `BET_CANCEL_PENALTY`. La propriété « ne déplace aucun portefeuille »
   doit être portée **par la source**, pas redéduite. Elle a déjà coûté 48 fausses alertes `fatal`
   et vit en triple exemplaire (API, `ktkarena-admin/src/utils/transactionDisplay.ts:96-98`,
   `ktkarena-web/src/components/wallet/txFilters.ts:28-33`).

3. **🔴 Une décision sur `BetOrigin`.** (F-07)
   Il n'est **pas** dans `schema.prisma` — c'est une union manuscrite
   (`ktkarena-api/src/shared/bet-origin.type.ts:10`). Deux voies :
   - **l'ajouter comme enum Prisma** — propre, générable, mais **irréversible** (pas de
     `DROP VALUE`), et il faudrait décider s'il devient une colonne persistée ou reste dérivé ;
   - **étendre le générateur** pour lire `bet-origin.type.ts` comme troisième source — moins
     invasif, cohérent avec le précédent `websocket.types.ts`. **C'est ce que je recommande.**
   Tant que ce n'est pas tranché, je ne peux pas livrer `BetOrigin`, et le second prompt ne devrait
   pas me le demander.

4. **🟠 Un déclencheur de sync automatique — ⚠️ RÉVISÉ 2×, le 2026-08-31.** (F-02, F-03, **F-03b**)

   > **Renumérotation adoptée (2026-08-31, 2ᵉ révision).** Ma numérotation d'origine confondait deux
   > choses : le **mécanisme** (où la garde s'exécute) et le **contrôle** (quelle dérive elle
   > détecte). Découpage retenu, celui du dépôt API — il est meilleur :
   > **(i) = 4a, LOCAL** — `schema.prisma` → `contracts.ts` est-il périmé ? *(dépôt API)*
   > **(ii) = 4b, CROSS-DÉPÔT** — le tag `@ktk/contracts` est-il en retard sur `contracts.ts` ?
   > *(+ la PR de sync ; dépend de l'Arbitrage 2)*
   > ⚠️ **4a est du travail du dépôt API, pas d'ici.** Le contrôle régénère `contracts.ts`, donc
   > exige `prisma/schema.prisma`, `src/shared/contracts/generator.ts` et
   > `src/modules/websocket/websocket.types.ts` — **les trois vivent exclusivement dans
   > `ktkarena-api`**. Ce dépôt-ci suit 6 fichiers et n'a pas de `scripts/`.
   >
   > ✅ **4a est LIVRÉ (non commité) côté API au 2026-08-31, et je l'ai exécuté :**
   > `npm run verify:contracts` → `✓ src/shared/contracts.ts est à jour.`, exit 0.
   > Pièces : `scripts/verify-contracts.ts` (lecture seule — `readFileSync` seul, compare en
   > mémoire, normalise CRLF/LF `:66`, `exit 1` sur divergence `:77,86`) ; script npm
   > `verify:contracts` ; `.githooks/pre-push` ; installeur `scripts/setup-hooks.mjs:12`
   > (`git config core.hooksPath .githooks`) appelé par `prepare` (`package.json:52`).
   > **Husky n'est pas nécessaire** : `core.hooksPath` + `prepare` donne le partage entre clones
   > sans dépendance de dev. ⚠️ Et husky serait **risqué ici** : mon `prepare` (`package.json:21`)
   > est `npm run build`, porteur de l'install git (D-1/D-2) — husky v9 s'installe par ce même
   > script.
   >
   > **Reste donc 4b, et rien ne le couvre** : c'est là que vivent F-01 et F-04 (11 symboles,
   > 23 valeurs de retard). Aucune garde ici non plus — ni CI, ni test, ni hook.

   L'idée tient : un job qui, sur `main`, ouvre une PR ici dès que `src/shared/contracts.ts` change.
   **Mais le préalable que je n'avais pas nommé est bloquant : Actions ne s'exécute pas** côté API
   (§0 — `steps: 0` sur 12/12 runs). Prolonger `main.yml:35-39` produirait un job qui ne démarrerait
   jamais, et — pire — donnerait l'illusion d'une garde. Donc, dans cet ordre :
   **(4a)** rétablir l'exécution d'Actions côté API *(cause donnée : facturation ; je ne peux pas la
   vérifier d'ici, seulement son effet)* **ou** décider de sortir l'automatisation d'Actions — hook
   `prepush`, ou une étape du `prebuild` (`ktkarena-api/package.json:50`, qui **tourne** réellement)
   qui échoue si le tag contrats est en retard ;
   **(4b)** seulement ensuite, faire franchir la frontière à la garde.
   **Sans 4a, 4b est décoratif. Et sans les deux, livrer les enums du Klash ne fait que remettre le
   compteur à zéro.**

5. **🟡 Les formes de payload Klash — mais seulement celles qui sont GELÉES.** (B3)
   Si l'arbitrage 3 retient le palier « + payloads », il me faut la liste des champs **gelés par
   contrat**, distincte de ceux simplement *observés*. `WallBetCard` est passée de 18 à 20 clés en un
   jour (`ktkarena-web/src/types/wall.ts:28-32`) : je ne veux pas graver une observation.

6. **🟡 Une position sur le filtre fail-closed de capacités.**
   `ktkarena-api/src/common/middleware/api-version.middleware.ts:42-90` (version d'URI ≥ 2 **ou**
   en-tête `x-client-capabilities: multi-outcome`) est, comme tu l'écris, **invisible depuis un
   paquet de types** — et c'est lui, pas les drapeaux, qui protège les clients non migrés. Question
   ouverte : dois-je exporter le nom de l'en-tête et les noms de capacités comme constantes ? C'est
   du contrat client/serveur au sens strict, donc *a priori* oui — mais c'est hors périmètre Klash,
   et je préfère le poser que le décider.

7. **🟢 Pour information — deux passagers dans le même tag.** Si je livre le Klash, je livrerai
   mécaniquement aussi `STATUS_RESHARED`, les 10 `WsEvent` manquants et les 7 autres symboles de
   retard (§ dérive). Ce ne sont pas des ajouts que je décide : ce sont 57 jours de dette qui
   voyagent avec. Le second prompt devrait en tenir compte dans son intitulé de version et dans ce
   qu'il annonce aux clients.

---

## Annexe — méthode et limites

**Ce que j'ai mesuré moi-même** (les 4 dépôts sont sur ce disque) : contenu et forme de ce paquet ;
statut git, tags, SHA, dates ; fraîcheur de `dist/` par rebuild + `diff` ; présence/absence de
`@ktk/contracts` dans les 4 `package.json` et lockfiles ; usage réel chez web ; copies manuscrites
chez mobile et admin ; contenu du générateur API, de `contracts.ts`, de `schema.prisma`, de la CI
API ; diff symbole par symbole et valeur par valeur entre `contracts.ts` et `src/index.ts`.
**Ajouté le 2026-08-31 :** l'état d'exécution réel des workflows Actions du dépôt API, via
`gh run list` et `gh run view --json jobs` (12 derniers runs, `steps: 0` partout) — §0.

**Ce que je n'ai pas vérifié et n'ai pas cherché à vérifier** : les tables `feature_flags` de prod et
de staging, les agrégats d'événements, l'état de `WallService.announceWallMatch`, les six appelants
de `release-wall-escrow.helper.ts`, le comportement du filtre fail-closed à l'exécution. Ces mesures
sont les tiennes, datées du 2026-08-24 ; je n'ai aucun accès aux bases et je les reprends telles
quelles, sans les revendiquer. **Je ne peux pas voir ça d'ici.**

**Réserve de fraîcheur.** Les mesures des dépôts frères reflètent l'état des **checkouts locaux au
2026-08-30**, pas nécessairement leurs branches distantes. Pour `ktkarena-api` j'ai levé le doute
(`contracts.ts` identique à `origin/main`). Pour web, mobile et admin, je n'ai pas comparé aux
branches distantes : leurs numéros de ligne sont donc à re-vérifier avant d'être cités ailleurs.
Comme le dit très bien un commentaire de web : **une forme mesurée est vraie à une DATE, jamais dans
l'absolu.**

**Aucune écriture** hors ce fichier. Aucun commit, aucun tag, aucune publication, aucun `npm run
build` dans le dépôt (le rebuild de contrôle a été dirigé vers un répertoire temporaire hors projet).
