// Version du contrat partagé — point d'entrée séparé : `@ktk/contracts/version`.
//
// ⚠️ POURQUOI CE FICHIER EXISTE, ET POURQUOI IL N'EST PAS DANS `index.ts`.
//
// Le problème qu'il résout : jusqu'ici, **aucun consommateur ne pouvait savoir
// qu'il était en retard**. Le paquet est resté figé 57 jours (v1.3.0, 2026-07-04)
// pendant que l'API livrait sept phases de fonctionnalités, et les trois dépôts
// clients l'ont découvert un par un, à la main, à des dates différentes — l'un
// annotait ses copies « vendored v1.2.0 » quand le tag courant était v1.3.0.
// Rien dans le paquet ne permettait de l'asserter. Maintenant si :
//
//   import { CONTRACTS_VERSION } from '@ktk/contracts/version';
//   expect(CONTRACTS_VERSION).toBe('1.4.0');   // échoue quand tu prends du retard
//
// ⚠️ POURQUOI PAS DANS `index.ts` — ce n'est pas une préférence de rangement.
// Le CORPS de `src/index.ts` doit rester identique, octet pour octet, à celui de
// `ktkarena-api/src/shared/contracts.ts` : `npm run verify:receivable` compare son
// empreinte à celle acquittée par `ktkarena-api/scripts/contracts-ledger.json`.
// Un seul symbole propre au paquet ajouté là-bas ferait diverger l'empreinte et
// rendrait la vérification croisée impossible. La garde interdit donc littéralement
// à ce paquet d'ajouter quoi que ce soit à son miroir — d'où un second fichier.
//
// ⚠️ CETTE CONSTANTE PEUT DÉRIVER DE `package.json`, ET C'EST LE SEUL RISQUE QU'ELLE
// PORTE. Une version écrite à deux endroits finit toujours par diverger — c'est le
// motif exact que tout ce chantier a passé son temps à réparer. `verify:receivable`
// échoue donc si les deux ne concordent pas. Bumper l'un sans l'autre bloque.

/** Version de ce paquet. DOIT rester égale au champ `version` de `package.json`. */
export const CONTRACTS_VERSION = '1.4.0';
