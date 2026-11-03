import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('src/data/image-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const byId = new Map();
const byFilename = new Map();

for (const entry of manifest) {
  const seenPages = byId.get(entry.id) ?? new Set();
  seenPages.add(entry.page);
  byId.set(entry.id, seenPages);

  const seenEntries = byFilename.get(entry.filename) ?? new Set();
  seenEntries.add(entry.page);
  byFilename.set(entry.filename, seenEntries);
}

const duplicateIds = [...byId.entries()].filter(([, pages]) => pages.size > 1);
const duplicateFiles = [...byFilename.entries()].filter(([, pages]) => pages.size > 1);

if (duplicateIds.length > 0 || duplicateFiles.length > 0) {
  const details = [
    ...duplicateIds.map(([id, pages]) => `duplicate id '${id}' used on ${[...pages].join(', ')}`),
    ...duplicateFiles.map(([file, pages]) => `duplicate file '${file}' used on ${[...pages].join(', ')}`),
  ];

  throw new Error(`Image duplication detected:\n${details.join('\n')}`);
}

const homeHero = manifest.find((entry) => entry.page === 'home' && entry.section === 'hero');
if (!homeHero || homeHero.filename !== '/assets/hero/dawn-upstream-pumpjack.jpg') {
  throw new Error('Homepage hero must remain the client-directed Dawn upstream pumpjack image.');
}

const uniquePages = new Set(manifest.map((entry) => entry.page));
console.log(`Validated ${manifest.length} image placements across ${uniquePages.size} sections without duplicate asset reuse.`);
