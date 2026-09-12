/* ============================================================
   MASSODA — Les trois prochains ateliers
   Source unique consommée par l'accueil ET par /ateliers/.

   Pour finaliser un atelier : renseigner ici les champs encore
   à `null`. Les cartes des deux pages se mettent à jour seules,
   les libellés temporaires et les attributs
   `data-massoda-placeholder` disparaissent automatiquement.
   Voir MASSODA_CONTENT_TODO.md pour le détail de chaque manque.
   ============================================================ */

import { PLACEHOLDER_LABELS, resolveField, type ResolvedField } from './site';

/** Une billetterie est ouverte, ou pas encore ouverte. */
export type TicketingStatus = 'open' | 'coming-soon';

export interface WorkshopImage {
  /** Chemin relatif à public/, sans le base path. */
  src: string;
  alt: string;
}

export interface WorkshopTicketing {
  status: TicketingStatus;
  /**
   * URL de billetterie propre à CET atelier. Ne jamais y mettre
   * l'URL Paint & Jam par défaut : un lien n'est affiché que si
   * cette valeur est renseignée et que le statut est `open`.
   */
  url: string | null;
  /** Date d'ouverture annoncée, si connue. */
  opensOn: string | null;
}

export interface Workshop {
  /** Identifiant stable, sert aussi à composer les identifiants de placeholder. */
  id: string;
  title: string;
  tag: string;
  /** Description éditoriale (fournie et intégrée). */
  description: string | null;
  date: string | null;
  time: string | null;
  place: string | null;
  price: string | null;
  image: WorkshopImage | null;
  ticketing: WorkshopTicketing;
}

/**
 * Identifiant de placeholder stable, ex. WORKSHOP_COOKIES_DATE.
 * Il fait le lien entre le DOM, le code et le registre.
 */
export function workshopPlaceholderId(workshopId: string, field: string): string {
  return `WORKSHOP_${workshopId.toUpperCase()}_${field.toUpperCase()}`;
}

/* ---------- Données brutes ----------
   Aucune date, heure, lieu, prix ni URL n'est connu à ce jour :
   tous ces champs restent volontairement à `null`.            */

export const workshops: Workshop[] = [
  {
    id: 'cookies',
    title: 'Cookies au moringa',
    tag: 'Pâtisserie',
    description:
      'On se réapproprie nos gourmandises préférées avec le moringa. Un atelier de pâtisserie sans gluten animé par une cake designer.',
    date: null,        // MASSODA_MISSING:WORKSHOP_COOKIES_DATE
    time: null,        // MASSODA_MISSING:WORKSHOP_COOKIES_TIME
    place: null,       // MASSODA_MISSING:WORKSHOP_COOKIES_PLACE
    price: null,       // MASSODA_MISSING:WORKSHOP_COOKIES_PRICE
    image: null,       // MASSODA_MISSING:WORKSHOP_COOKIES_IMAGE
    ticketing: {
      status: 'coming-soon',
      url: null,       // MASSODA_MISSING:WORKSHOP_COOKIES_TICKETING_URL
      opensOn: null,   // MASSODA_MISSING:WORKSHOP_COOKIES_TICKETING_OPENS_ON
    },
  },
  {
    id: 'baya',
    title: 'Confection de baya',
    tag: 'Artisanat',
    description:
      'On sublime son corps avec Maeva, créatrice de bijoux holistiques, autour de la confection de baya.',
    date: null,        // MASSODA_MISSING:WORKSHOP_BAYA_DATE
    time: null,        // MASSODA_MISSING:WORKSHOP_BAYA_TIME
    place: null,       // MASSODA_MISSING:WORKSHOP_BAYA_PLACE
    price: null,       // MASSODA_MISSING:WORKSHOP_BAYA_PRICE
    image: null,       // MASSODA_MISSING:WORKSHOP_BAYA_IMAGE
    ticketing: {
      status: 'coming-soon',
      url: null,       // MASSODA_MISSING:WORKSHOP_BAYA_TICKETING_URL
      opensOn: null,   // MASSODA_MISSING:WORKSHOP_BAYA_TICKETING_OPENS_ON
    },
  },
  {
    id: 'ceramique',
    title: 'Céramique',
    tag: 'Artisanat',
    description:
      'On façonne un intérieur qui nous ressemble pour se sentir vraiment chez soi.',
    date: null,        // MASSODA_MISSING:WORKSHOP_CERAMIQUE_DATE
    time: null,        // MASSODA_MISSING:WORKSHOP_CERAMIQUE_TIME
    place: null,       // MASSODA_MISSING:WORKSHOP_CERAMIQUE_PLACE
    price: null,       // MASSODA_MISSING:WORKSHOP_CERAMIQUE_PRICE
    image: null,       // MASSODA_MISSING:WORKSHOP_CERAMIQUE_IMAGE
    ticketing: {
      status: 'coming-soon',
      url: null,       // MASSODA_MISSING:WORKSHOP_CERAMIQUE_TICKETING_URL
      opensOn: null,   // MASSODA_MISSING:WORKSHOP_CERAMIQUE_TICKETING_OPENS_ON
    },
  },
];

/* ---------- Vue prête à afficher ---------- */

export type WorkshopAction =
  | { kind: 'book'; label: string; url: string }
  | { kind: 'pending'; label: string; placeholderId?: string };

export interface WorkshopView {
  id: string;
  title: string;
  tag: string;
  description: string | null;
  /** Informations pratiques, dans l'ordre d'affichage. */
  practical: Array<{ key: string; label: string } & ResolvedField>;
  image: { kind: 'image'; src: string; alt: string } | { kind: 'placeholder'; label: string; placeholderId: string };
  action: WorkshopAction;
  /** Vrai si au moins un champ de la carte est encore temporaire. */
  hasPlaceholder: boolean;
}

/**
 * Traduit les données brutes en vue d'affichage. Les deux pages
 * qui listent les ateliers passent par ici : la logique de repli
 * n'est donc écrite qu'une seule fois.
 */
export function getWorkshopViews(): WorkshopView[] {
  return workshops.map((w) => {
    const practical = [
      { key: 'date', label: 'Date', ...resolveField(w.date, workshopPlaceholderId(w.id, 'date'), PLACEHOLDER_LABELS.date) },
      { key: 'time', label: 'Horaire', ...resolveField(w.time, workshopPlaceholderId(w.id, 'time'), PLACEHOLDER_LABELS.time) },
      { key: 'place', label: 'Lieu', ...resolveField(w.place, workshopPlaceholderId(w.id, 'place'), PLACEHOLDER_LABELS.place) },
      { key: 'price', label: 'Prix', ...resolveField(w.price, workshopPlaceholderId(w.id, 'price'), PLACEHOLDER_LABELS.price) },
    ];

    const image: WorkshopView['image'] = w.image
      ? { kind: 'image', src: w.image.src, alt: w.image.alt }
      : { kind: 'placeholder', label: PLACEHOLDER_LABELS.image, placeholderId: workshopPlaceholderId(w.id, 'image') };

    // Un vrai lien n'apparaît que si la billetterie est ouverte ET
    // possède sa propre URL. Sinon : texte non cliquable.
    let action: WorkshopAction;
    if (w.ticketing.status === 'open' && w.ticketing.url) {
      action = { kind: 'book', label: 'Réserve ta place', url: w.ticketing.url };
    } else if (w.ticketing.opensOn) {
      action = { kind: 'pending', label: `Ouverture de la billetterie le ${w.ticketing.opensOn}` };
    } else {
      action = {
        kind: 'pending',
        label: PLACEHOLDER_LABELS.ticketing,
        placeholderId: workshopPlaceholderId(w.id, 'ticketing_url'),
      };
    }

    return {
      id: w.id,
      title: w.title,
      tag: w.tag,
      description: w.description,
      practical,
      image,
      action,
      hasPlaceholder:
        practical.some((p) => p.status === 'placeholder') ||
        image.kind === 'placeholder' ||
        action.kind === 'pending',
    };
  });
}
