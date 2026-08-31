// Garde de RÉCEPTION du contrat partagé.
//
// Ce dépôt est le bout de chaîne : il reçoit `ktkarena-api/src/shared/contracts.ts`
// et le republie en `src/index.ts`. Côté API, deux gardes locales protègent déjà
// l'amont (`verify:contracts` = fraîcheur schéma → contrat ; `verify:contracts-sync`
// = le contrat a-t-il bougé sans qu'un tag le publie). Aucune des deux ne peut
// vérifier ce qui se passe ICI.
//
// ⚠️ POURQUOI CE SCRIPT EXISTE. Une PR de sync qui atterrit ici n'est relue par
// RIEN : ce dépôt n'a ni test, ni hook, ni CI (audit 2026-08-30, F-03/D-1). Le
// seul contrôle réel était une compilation lancée à la main. Un contrôle qui
// dépend de la discipline d'un relecteur est un contrôle qu'on saute.
//
// Il répond à deux questions, et il faut LES DEUX :
//   1. le contrat entrant compile-t-il sous MA configuration ? (`strict`, ES2022,
//      `declaration`) — l'API compile sous la sienne, qui n'est pas la mienne ;
//   2. est-ce bien le contenu que l'API atteste ? — l'empreinte du CORPS, selon la
//      convention publiée dans `ktkarena-api/scripts/contracts-ledger.json`.
//
// Sans (2), on vérifie qu'un fichier compile sans savoir lequel. Sans (1), on
// vérifie une identité sans savoir si elle est consommable.
//
// Usage :
//   npm run verify:receivable                       # vérifie src/index.ts
//   npm run verify:receivable -- <chemin>           # vérifie un candidat avant sync
//   npm run verify:receivable -- <chemin> --expect <sha256>
//   npm run verify:receivable -- <chemin> --ledger <contracts-ledger.json>
//
// En node brut (`.mjs`) et sans dépendance : ce script doit tourner sur un clone
// frais, avant tout build, y compris quand `dist/` n'existe pas encore.

import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Empreinte du CORPS du contrat — en-tête de génération exclu.
 *
 * ⚠️ CONVENTION IMPOSÉE PAR L'AMONT, PAS CHOISIE ICI. Elle est décrite dans le
 * champ `fingerprint` de `ktkarena-api/scripts/contracts-ledger.json`. Toute
 * divergence d'implémentation rendrait la comparaison faussement rouge.
 *
 * ⚠️ L'EN-TÊTE EST EXCLU PARCE QU'IL DIFFÈRE PAR CONSTRUCTION. `contracts.ts`
 * pointe ses sources en chemins relatifs à l'API ; `src/index.ts` conserve le
 * sien (README « conserver l'en-tête de ce fichier »). Les deux fichiers ne
 * peuvent donc JAMAIS être identiques octet pour octet — hasher le fichier
 * entier rendrait l'attestation de l'API invérifiable depuis ici, ce qui était
 * exactement le trou signalé le 2026-08-31.
 *
 * ⚠️ NORMALISATION LF OBLIGATOIRE : sans elle l'empreinte dépendrait du système
 * du développeur (CRLF sous Windows) et la garde crierait au faux positif.
 */
function empreinteDuCorps(source) {
  const lignes = source.replace(/\r\n/g, '\n').split('\n');
  let i = 0;
  while (i < lignes.length && (lignes[i].trim() === '' || lignes[i].trimStart().startsWith('//'))) {
    i += 1;
  }
  return createHash('sha256').update(lignes.slice(i).join('\n').trimEnd()).digest('hex');
}

function lireArgs(argv) {
  const positionnels = [];
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--expect' || argv[i] === '--ledger') {
      options[argv[i].slice(2)] = argv[i + 1];
      i += 1;
    } else {
      positionnels.push(argv[i]);
    }
  }
  return { candidat: positionnels[0] ?? join(ROOT, 'src', 'index.ts'), ...options };
}

/**
 * Compile le candidat sous le tsconfig RÉEL du dépôt, dans un répertoire jetable.
 *
 * ⚠️ On copie le tsconfig plutôt que de le réécrire : le but est de reproduire le
 * build de publication à l'identique (`strict`, ES2022, `declaration`, `rootDir:
 * ./src`). Un tsconfig approximatif validerait un contrat qui casserait à la
 * publication — la panne exacte que ce script existe pour empêcher.
 *
 * ⚠️ `tsc` est invoqué via son entrée JS, pas via `node_modules/.bin` : le
 * lanceur `.bin` est un `.cmd` sous Windows, que `spawnSync` sans shell ne sait
 * pas exécuter.
 */
function compiler(sourceCandidat) {
  const bac = mkdtempSync(join(tmpdir(), 'ktk-receivable-'));
  try {
    mkdirSync(join(bac, 'src'));
    writeFileSync(join(bac, 'src', 'index.ts'), sourceCandidat, 'utf8');
    cpSync(join(ROOT, 'tsconfig.json'), join(bac, 'tsconfig.json'));

    const tsc = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
    const res = spawnSync(process.execPath, [tsc, '-p', join(bac, 'tsconfig.json')], {
      encoding: 'utf8',
    });

    if (res.status !== 0) {
      return { ok: false, sortie: `${res.stdout ?? ''}${res.stderr ?? ''}`.trim() };
    }

    // Un `tsc` vert qui n'émet pas de `.d.ts` publierait un paquet dont `types`
    // pointe dans le vide : `main`/`types` du package.json désignent `dist/`.
    const dts = readFileSync(join(bac, 'dist', 'index.d.ts'), 'utf8');
    const declarations = (dts.match(/^export (declare const|type) /gm) ?? []).length;
    return { ok: true, declarations };
  } finally {
    rmSync(bac, { recursive: true, force: true });
  }
}

function main() {
  const { candidat, expect, ledger } = lireArgs(process.argv.slice(2));

  let source;
  try {
    source = readFileSync(candidat, 'utf8');
  } catch {
    console.error(`✗ candidat introuvable : ${candidat}`);
    process.exit(1);
  }

  console.log(`Réception — candidat : ${candidat}`);

  // 1. Consommable ?
  const build = compiler(source);
  if (!build.ok) {
    console.error('✗ le contrat entrant NE COMPILE PAS sous le tsconfig de ce dépôt.');
    console.error(build.sortie);
    console.error("\n  Ne pas synchroniser : la publication casserait à l'installation.");
    process.exit(1);
  }
  console.log(`✓ compile sous tsconfig.json (strict, ES2022, declaration)`);
  console.log(`✓ .d.ts émis — ${build.declarations} déclarations exportées`);

  // 2. Est-ce le contenu attesté ?
  const empreinte = empreinteDuCorps(source);
  console.log(`  empreinte du corps : ${empreinte}`);

  let attendu = expect;
  if (!attendu && ledger) {
    try {
      attendu = JSON.parse(readFileSync(ledger, 'utf8')).acknowledgedSha256;
    } catch {
      console.error(`✗ registre illisible : ${ledger}`);
      process.exit(1);
    }
  }

  if (!attendu) {
    console.log(
      "\n⚠️  Aucune empreinte attendue fournie — l'identité du contenu N'EST PAS vérifiée.\n" +
        '    Passe --expect <sha256>, ou --ledger <chemin vers contracts-ledger.json>\n' +
        "    (côté API : scripts/contracts-ledger.json, champ acknowledgedSha256).",
    );
    process.exit(0);
  }

  if (empreinte !== attendu) {
    console.error(
      `\n✗ EMPREINTE DIVERGENTE — ce n'est pas le contenu attesté par l'API.\n` +
        `    attendu : ${attendu}\n` +
        `    obtenu  : ${empreinte}\n\n` +
        "    Soit le candidat n'est pas celui que le registre acquitte, soit le\n" +
        "    registre est périmé. Ne pas synchroniser avant d'avoir tranché lequel.",
    );
    process.exit(1);
  }

  console.log('✓ empreinte conforme au contenu attesté par l’API.');
  process.exit(0);
}

main();
