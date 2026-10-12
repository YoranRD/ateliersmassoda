import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicImages = path.join(root, 'public/images');
const archivedImages = path.join(root, 'design-assets/originals');
const outputRoot = path.join(root, 'src/assets/images');

const cropGroups = [
  {
    paths: ['about/masoda-cest-quoi.png', 'home/hero-atelier-masoda.png', 'collaborators/bmk_collaborator.png'],
    crop: { left: 0, top: 360, width: 1078, height: 1765 },
  },
  {
    paths: ['about/fondatrice-masoda.png', 'home/bien-etre-lifestyle.png'],
    crop: { left: 0, top: 125, width: 1078, height: 1990 },
  },
  {
    paths: ['home/atelier-baya.png', 'shop/boutique-baya.png'],
    crop: { left: 4, top: 201, width: 1071, height: 1837 },
  },
  {
    paths: ['collaborators/collaborateur-3.png', 'shop/boutique-plantes.png'],
    crop: { left: 1, top: 442, width: 1077, height: 1355 },
  },
];

async function exists(file) {
  try { await access(file); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

async function listImages(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await listImages(path.join(directory, entry.name), relative));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) files.push(relative);
  }
  return files.sort();
}

// Les originaux archivés permettent de reproduire les masters après leur déplacement.
const inputRoot = await exists(publicImages) ? publicImages : archivedImages;
const files = await listImages(inputRoot);
if (!files.length) throw new Error(`Aucune photo trouvée dans ${inputRoot}`);

const groups = new Map();
const hashes = new Map();
for (const file of files) {
  const digest = createHash('sha256').update(await readFile(path.join(inputRoot, file))).digest('hex');
  hashes.set(file, digest);
  const group = groups.get(digest) ?? [];
  group.push(file);
  groups.set(digest, group);
}

for (const group of cropGroups) {
  const firstHash = hashes.get(group.paths[0]);
  if (!firstHash || group.paths.some(file => hashes.get(file) !== firstHash)) {
    throw new Error(`Groupe de recadrage absent ou non identique : ${group.paths.join(', ')}`);
  }
}

const outputs = new Set();
const manifest = [];
for (const [digest, duplicates] of groups) {
  const prescribed = cropGroups.find(group => hashes.get(group.paths[0]) === digest);
  const canonical = prescribed?.paths[0] ?? duplicates[0];
  const key = canonical.replace(/\.[^.]+$/, '');
  const target = path.join(outputRoot, `${key}.jpg`);
  if (outputs.has(target)) throw new Error(`Collision de masters : ${key}`);
  outputs.add(target);

  const source = path.join(inputRoot, canonical);
  const metadata = await sharp(source).metadata();
  if (!Number.isInteger(metadata.width) || !Number.isInteger(metadata.height) || metadata.width < 1 || metadata.height < 1) {
    throw new Error(`Dimensions invalides : ${canonical}`);
  }
  const crop = prescribed?.crop;
  if (crop && (Object.values(crop).some(value => !Number.isInteger(value) || value < 0) ||
      crop.width < 1 || crop.height < 1 || crop.left + crop.width > metadata.width || crop.top + crop.height > metadata.height)) {
    throw new Error(`Recadrage hors des dimensions en pixels : ${canonical}`);
  }

  await mkdir(path.dirname(target), { recursive: true });
  let pipeline = sharp(source);
  if (crop) pipeline = pipeline.extract(crop);
  await pipeline.toColourspace('srgb').withIccProfile('srgb').jpeg({ quality: 90 }).toFile(target);

  // Aucun redimensionnement : les dimensions de sortie doivent égaler le recadrage ou la source.
  const output = await sharp(target).metadata();
  if (output.width !== (crop?.width ?? metadata.width) || output.height !== (crop?.height ?? metadata.height) ||
      output.space !== 'srgb' || output.format !== 'jpeg' || !output.hasProfile) {
    throw new Error(`Master incohérent : ${key}`);
  }
  manifest.push({ key, originals: duplicates, crop: crop ?? null, width: output.width, height: output.height });
}

console.log(JSON.stringify({ originals: files.length, masters: manifest.length, images: manifest }, null, 2));
