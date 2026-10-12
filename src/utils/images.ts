import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/**/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

/** Clé relative aux masters, sans extension ; une clé absente arrête le build. */
export function img(key: string): ImageMetadata {
  const matches = Object.entries(images).filter(([file]) =>
    file.replace('../assets/images/', '').replace(/\.[^.]+$/, '') === key,
  );
  if (matches.length !== 1) {
    throw new Error(`Image introuvable ou ambiguë : ${key}`);
  }
  const metadata = matches[0][1].default;
  if (!Number.isInteger(metadata.width) || !Number.isInteger(metadata.height) || metadata.width < 1 || metadata.height < 1) {
    throw new Error(`Dimensions invalides pour l’image : ${key}`);
  }
  return metadata;
}
