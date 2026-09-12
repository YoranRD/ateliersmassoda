/* ============================================================
   MASSODA — Données globales du site
   Source unique des liens et des contenus transverses.

   Règle : on ne met JAMAIS ici une valeur inventée. Un contenu
   non fourni reste `null` ; l'interface affiche alors un
   placeholder explicitement temporaire, recensé dans
   MASSODA_CONTENT_TODO.md à la racine du dépôt.
   ============================================================ */

/** Statut d'un contenu : réel et vérifié, ou temporaire. */
export type ContentStatus = 'ready' | 'placeholder';

/**
 * Résultat prêt à afficher pour un champ pouvant manquer.
 * `text` contient soit la vraie valeur, soit un libellé
 * générique non trompeur. `placeholderId` n'est renseigné que
 * pour un contenu temporaire et sert à baliser le DOM via
 * `data-massoda-placeholder`.
 */
export interface ResolvedField {
  status: ContentStatus;
  text: string;
  placeholderId?: string;
}

/**
 * Renvoie la vraie valeur si elle existe, sinon le libellé
 * temporaire. Renseigner la valeur dans le fichier de données
 * suffit à mettre à jour toutes les occurrences du site.
 */
export function resolveField(
  value: string | null | undefined,
  placeholderId: string,
  fallbackLabel: string,
): ResolvedField {
  const clean = value?.trim();
  if (clean) return { status: 'ready', text: clean };
  return { status: 'placeholder', text: fallbackLabel, placeholderId };
}

/** Libellés temporaires génériques, jamais confondables avec une donnée finale. */
export const PLACEHOLDER_LABELS = {
  date: 'Date à venir',
  time: 'Horaire à venir',
  place: 'Lieu à venir',
  price: 'Prix à venir',
  practical: 'Informations pratiques à venir',
  image: 'Visuel à venir',
  ticketing: 'Billetterie bientôt disponible',
  letterSignup: 'Inscriptions bientôt disponibles',
} as const;

/* ---------- Réservation ---------- */

/**
 * URL de réservation globale **confirmée** pour la nouvelle version
 * du site. Tant qu'elle vaut `null`, aucun CTA ne promet une
 * réservation immédiate.
 * MASSODA_MISSING:GLOBAL_RESERVATION_URL
 */
export const RESERVATION_URL: string | null = null;

export interface ReservationCtaView {
  label: string;
  href: string;
  /** Vrai si le lien sort du site (billetterie externe). */
  external: boolean;
  /** Vrai tant qu'aucune URL de réservation confirmée n'existe. */
  isPlaceholder: boolean;
  placeholderId?: string;
}

/**
 * CTA de réservation, unique point de décision du site.
 *
 * - `RESERVATION_URL` renseignée → « Réserver un atelier » vers la
 *   billetterie réelle, dans tous les composants d'un coup ;
 * - sinon → CTA de découverte non trompeur vers `fallbackHref`
 *   (page ou section des prochains ateliers).
 *
 * Aucun composant ne doit refaire ce test localement.
 */
export function getReservationCta(fallbackHref: string): ReservationCtaView {
  if (RESERVATION_URL) {
    return {
      label: 'Réserver un atelier',
      href: RESERVATION_URL,
      external: true,
      isPlaceholder: false,
    };
  }
  return {
    label: 'Découvrir les prochains ateliers',
    href: fallbackHref,
    external: false,
    isPlaceholder: true,
    placeholderId: 'GLOBAL_RESERVATION_URL',
  };
}

/* ---------- La Lettre de Massoda ---------- */

export interface LetterConfig {
  /** URL réelle d'inscription. MASSODA_MISSING:LETTER_SIGNUP_URL */
  signupUrl: string | null;
  ctaLabel: string;
  /** Ancre de la section présente sur l'accueil. */
  anchorId: string;
}

export const LETTER: LetterConfig = {
  // Renseigner ici l'URL réelle : le CTA de l'accueil devient
  // automatiquement cliquable, sans toucher aux composants.
  signupUrl: null,
  ctaLabel: 'Recevoir La Lettre',
  anchorId: 'la-lettre',
};

/* ---------- Réseaux sociaux ---------- */

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/lesateliersmassoda/', handle: '@lesateliersmassoda' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@lesateliersmassoda1', handle: '@lesateliersmassoda1' },
  { name: 'Pinterest', url: 'https://fr.pinterest.com/barbandchill/', handle: 'barbandchill' },
] as const;

/* ---------- Média du hero ---------- */

export interface HeroMedia {
  /** Vidéo réelle « mains qui créent ». MASSODA_MISSING:HERO_VIDEO */
  videoSrc: string | null;
  /** Poster de la vidéo. */
  posterSrc: string | null;
  /** Image de repli, réellement présente dans public/. */
  fallbackImage: string;
  fallbackAlt: string;
}

export const HERO_MEDIA: HeroMedia = {
  // Déposer le fichier dans public/media/home/hero-massoda.mp4 puis
  // renseigner les deux chemins ci-dessous : le composant bascule
  // automatiquement de l'image vers la balise <video>.
  videoSrc: null,
  posterSrc: null,
  fallbackImage: 'images/home/hero-atelier-masoda.png',
  fallbackAlt: "Ambiance d'un atelier Massoda — créativité, partage et bien-être",
};

/* ---------- Média de la section « Nos ateliers » ---------- */

export interface SectionMedia {
  /** Média final dédié. MASSODA_MISSING:NOS_ATELIERS_MEDIA */
  finalImage: string | null;
  /** Image locale réellement disponible, utilisée en attendant. */
  fallbackImage: string;
  alt: string;
}

export const NOS_ATELIERS_MEDIA: SectionMedia = {
  finalImage: null,
  fallbackImage: 'images/home/atelier-paint-jam.png',
  alt: 'Participantes et intervenante réunies autour d’une création pendant un atelier Massoda',
};
