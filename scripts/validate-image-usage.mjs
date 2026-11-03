import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('src/data/image-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const byId = new Map();
const byFilename = new Map();
const byContent = new Map();

for (const entry of manifest) {
  const seenPages = byId.get(entry.id) ?? new Set();
  seenPages.add(entry.page);
  byId.set(entry.id, seenPages);

  const seenEntries = byFilename.get(entry.filename) ?? new Set();
  seenEntries.add(entry.page);
  byFilename.set(entry.filename, seenEntries);

  const assetPath = path.resolve('public', `.${entry.filename}`);
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Image file does not exist: ${entry.filename}`);
  }

  const hash = crypto.createHash('sha256').update(fs.readFileSync(assetPath)).digest('hex');
  const seenContent = byContent.get(hash) ?? [];
  seenContent.push(entry.filename);
  byContent.set(hash, seenContent);
}

const duplicateIds = [...byId.entries()].filter(([, pages]) => pages.size > 1);
const duplicateFiles = [...byFilename.entries()].filter(([, pages]) => pages.size > 1);
const duplicateContent = [...byContent.values()].filter((files) => files.length > 1);

if (duplicateIds.length > 0 || duplicateFiles.length > 0 || duplicateContent.length > 0) {
  const details = [
    ...duplicateIds.map(([id, pages]) => `duplicate id '${id}' used on ${[...pages].join(', ')}`),
    ...duplicateFiles.map(([file, pages]) => `duplicate file '${file}' used on ${[...pages].join(', ')}`),
    ...duplicateContent.map((files) => `duplicate image content used by ${files.join(', ')}`),
  ];

  throw new Error(`Image duplication detected:\n${details.join('\n')}`);
}

const homeHero = manifest.find((entry) => entry.page === 'home' && entry.section === 'hero');
if (!homeHero || homeHero.filename !== '/assets/hero/dawn-upstream-pumpjack.jpg') {
  throw new Error('Homepage hero must remain the client-directed Dawn upstream pumpjack image.');
}

const uniquePages = new Set(manifest.map((entry) => entry.page));
console.log(`Validated ${manifest.length} image placements across ${uniquePages.size} sections without missing or repeated image files.`);
