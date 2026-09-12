# Registre de finalisation — Les Ateliers Massoda

Checklist unique des contenus réels encore à fournir pour finaliser le site.

Ce fichier est un document de suivi éditorial et technique : **il n'est jamais lu
par le site à l'exécution**. Le site se construit et se teste entièrement en
l'état ; chaque contenu manquant est simplement remplacé à l'écran par un
placeholder explicitement temporaire, jamais par une donnée inventée.

> **Pressé ?** Aller directement à la section
> [« Ce que Yoran doit encore fournir »](#ce-que-yoran-doit-encore-fournir) :
> elle se lit comme une liste de courses, sans connaître Astro.

## Comment fonctionne le remplacement

1. Repérer l'entrée par son identifiant (colonne « ID »).
2. Déposer le fichier au chemin indiqué **et/ou** renseigner la valeur dans le
   fichier de données indiqué.
3. Le rendu se met à jour tout seul : le libellé temporaire disparaît, l'attribut
   `data-massoda-placeholder` correspondant disparaît, et le vrai contenu
   s'affiche partout où il est utilisé.
4. Relancer `npm run build`, vérifier le critère de clôture de l'entrée, puis la
   passer à `DONE`.

Traçabilité : chaque identifiant se retrouve dans le code via
`MASSODA_MISSING:<ID>` et dans le HTML produit via
`data-massoda-placeholder="<ID>"`.

## Statuts

| Statut | Signification |
|---|---|
| `MISSING` | Aucune donnée réelle fournie, aucun placeholder affiché. |
| `PLACEHOLDER` | Aucune donnée réelle fournie ; un repli temporaire tient la place à l'écran. |
| `READY_TO_INTEGRATE` | Contenu réel fourni, pas encore intégré au site. |
| `DONE` | Contenu réel fourni **et** intégré. |

## Tableau de suivi — entrées ouvertes

| ID | Statut | Élément attendu | Type | Chemin / champ à renseigner | Fallback actuel | Pages & composants affectés | Procédure d'intégration | Critère de passage à `DONE` |
|---|---|---|---|---|---|---|---|---|
| `HERO_VIDEO` | PLACEHOLDER | Vidéo « mains qui créent », plans resserrés | Fichier MP4 | `public/media/home/hero-massoda.mp4`, puis `HERO_MEDIA.videoSrc = 'media/home/hero-massoda.mp4'` dans `src/data/site.ts` | Image réelle `public/images/home/hero-atelier-masoda.png` | Accueil → `HeroSection.astro` | Déposer le fichier, renseigner `videoSrc` ; le composant bascule seul de `<img>` vers `<video autoplay muted loop playsinline>` | La vidéo se lit en boucle sans son dans le hero et l'attribut `data-massoda-placeholder="HERO_VIDEO"` a disparu |
| `HERO_VIDEO_POSTER` | PLACEHOLDER | Image affichée avant lecture de la vidéo | Fichier JPEG | `public/media/home/hero-massoda-poster.jpg`, puis `HERO_MEDIA.posterSrc` | Aucun poster (l'image de repli tient lieu de visuel) | Accueil → `HeroSection.astro` | Déposer le fichier et renseigner `posterSrc` ; à fournir en même temps que `HERO_VIDEO` | L'attribut `poster` est présent sur la balise `<video>` |
| `NOS_ATELIERS_MEDIA` | PLACEHOLDER | Photo dédiée montrant les intervenant·es et les gestes | Fichier JPEG | `public/images/home/nos-ateliers.jpg`, puis `NOS_ATELIERS_MEDIA.finalImage` dans `src/data/site.ts` | Image locale réelle `public/images/home/atelier-paint-jam.png` | Accueil → `NosAteliersSection.astro` | Déposer le fichier, renseigner `finalImage`, **et réécrire `alt`** pour décrire la nouvelle photo | La section affiche la nouvelle image avec un `alt` factuel et exact |
| `LETTER_SIGNUP_URL` | PLACEHOLDER | URL d'inscription à La Lettre | URL https | `LETTER.signupUrl` dans `src/data/site.ts` | Mention non cliquable « Inscriptions bientôt disponibles » | Accueil → `LetterSection.astro` (section `#la-lettre`) | Coller l'URL du service d'emailing ; le CTA « Recevoir La Lettre » devient cliquable automatiquement | Le CTA est un vrai lien et plus aucune mention « Inscriptions bientôt disponibles » n'apparaît |
| `GLOBAL_RESERVATION_URL` | PLACEHOLDER | Billetterie générale valable pour la nouvelle programmation | URL https | `RESERVATION_URL` dans `src/data/site.ts` (vaut `null`) | CTA « Découvrir les prochains ateliers » vers `/ateliers/` ou `#prochains-ateliers` | Header (desktop + mobile), accueil, `/a-propos/`, bas de `/ateliers/` | Renseigner la seule constante `RESERVATION_URL` : les 4 emplacements repassent d'un coup à « Réserver un atelier » en lien externe | Les CTA affichent « Réserver un atelier » et pointent vers la vraie billetterie |
| `WORKSHOP_COOKIES_DATE` | PLACEHOLDER | Date — Cookies au moringa | Texte | `workshops[cookies].date` dans `src/data/workshops.ts` | « Date à venir » | Accueil + `/ateliers/` | Écrire la date en toutes lettres, ex. « samedi 14 mars 2026 » | La date s'affiche sur les deux pages, sans italique grisé |
| `WORKSHOP_COOKIES_TIME` | PLACEHOLDER | Horaire — Cookies au moringa | Texte | `workshops[cookies].time` | « Horaire à venir » | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_PLACE` | PLACEHOLDER | Lieu — Cookies au moringa | Texte | `workshops[cookies].place` | « Lieu à venir » | Accueil + `/ateliers/` | Lieu communicable publiquement (l'adresse exacte reste sur la billetterie) | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_PRICE` | PLACEHOLDER | Prix — Cookies au moringa | Texte | `workshops[cookies].price` | « Prix à venir » | Accueil + `/ateliers/` | Ex. « 55 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_IMAGE` | PLACEHOLDER | Photo — Cookies au moringa | Fichier JPEG, ratio 4:3, ≥ 1200 px | `public/images/workshops/cookies-moringa.jpg`, puis `workshops[cookies].image = { src, alt }` | Bloc de marque rayé « Visuel à venir » | Accueil + `/ateliers/` | Déposer la photo et renseigner `src` **et** `alt` factuel | La photo remplace le bloc rayé sur les deux pages |
| `WORKSHOP_COOKIES_TICKETING_URL` | PLACEHOLDER | Billetterie — Cookies au moringa | URL https | `workshops[cookies].ticketing.url` **et** `status: 'open'` | « Billetterie bientôt disponible », non cliquable | Accueil + `/ateliers/` | Coller l'URL propre à cet atelier et passer le statut à `open`. **Ne jamais réutiliser l'ancienne URL Paint & Jam** | Un vrai bouton « Réserve ta place » apparaît sur les deux pages |
| `WORKSHOP_COOKIES_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — Cookies | Texte (facultatif) | `workshops[cookies].ticketing.opensOn` | « Billetterie bientôt disponible » | Accueil + `/ateliers/` | Utile seulement si l'on veut annoncer une date avant l'ouverture ; sinon fournir directement l'URL ci-dessus | La carte affiche « Ouverture de la billetterie le … », ou l'entrée est close si la billetterie ouvre directement |
| `WORKSHOP_BAYA_DATE` | PLACEHOLDER | Date — Confection de baya | Texte | `workshops[baya].date` | « Date à venir » | Accueil + `/ateliers/` | Date en toutes lettres | La date s'affiche sur les deux pages |
| `WORKSHOP_BAYA_TIME` | PLACEHOLDER | Horaire — Confection de baya | Texte | `workshops[baya].time` | « Horaire à venir » | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_BAYA_PLACE` | PLACEHOLDER | Lieu — Confection de baya | Texte | `workshops[baya].place` | « Lieu à venir » | Accueil + `/ateliers/` | Lieu communicable publiquement | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_BAYA_PRICE` | PLACEHOLDER | Prix — Confection de baya | Texte | `workshops[baya].price` | « Prix à venir » | Accueil + `/ateliers/` | Ex. « 65 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_BAYA_IMAGE` | PLACEHOLDER | Photo — Confection de baya | Fichier JPEG, ratio 4:3, ≥ 1200 px | `public/images/workshops/confection-baya.jpg`, puis `workshops[baya].image` | Bloc de marque rayé « Visuel à venir » | Accueil + `/ateliers/` | Déposer la photo et renseigner `src` + `alt`. Ne pas réutiliser l'ancienne `atelier-baya.png` sans validation | La photo remplace le bloc rayé sur les deux pages |
| `WORKSHOP_BAYA_TICKETING_URL` | PLACEHOLDER | Billetterie — Confection de baya | URL https | `workshops[baya].ticketing.url` **et** `status: 'open'` | « Billetterie bientôt disponible », non cliquable | Accueil + `/ateliers/` | URL propre à cet atelier, jamais l'URL Paint & Jam | Un vrai bouton « Réserve ta place » apparaît |
| `WORKSHOP_BAYA_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — baya | Texte (facultatif) | `workshops[baya].ticketing.opensOn` | « Billetterie bientôt disponible » | Accueil + `/ateliers/` | Idem cookies : annonce anticipée uniquement | La carte affiche « Ouverture de la billetterie le … » |
| `WORKSHOP_CERAMIQUE_DATE` | PLACEHOLDER | Date — Céramique | Texte | `workshops[ceramique].date` | « Date à venir » | Accueil + `/ateliers/` | Date en toutes lettres | La date s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_TIME` | PLACEHOLDER | Horaire — Céramique | Texte | `workshops[ceramique].time` | « Horaire à venir » | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_PLACE` | PLACEHOLDER | Lieu — Céramique | Texte | `workshops[ceramique].place` | « Lieu à venir » | Accueil + `/ateliers/` | Lieu communicable publiquement | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_PRICE` | PLACEHOLDER | Prix — Céramique | Texte | `workshops[ceramique].price` | « Prix à venir » | Accueil + `/ateliers/` | Ex. « 75 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_IMAGE` | PLACEHOLDER | Photo — Céramique | Fichier JPEG, ratio 4:3, ≥ 1200 px | `public/images/workshops/ceramique.jpg`, puis `workshops[ceramique].image` | Bloc de marque rayé « Visuel à venir » | Accueil + `/ateliers/` | Déposer la photo et renseigner `src` + `alt` | La photo remplace le bloc rayé sur les deux pages |
| `WORKSHOP_CERAMIQUE_TICKETING_URL` | PLACEHOLDER | Billetterie — Céramique | URL https | `workshops[ceramique].ticketing.url` **et** `status: 'open'` | « Billetterie bientôt disponible », non cliquable | Accueil + `/ateliers/` | URL propre à cet atelier, jamais l'URL Paint & Jam | Un vrai bouton « Réserve ta place » apparaît |
| `WORKSHOP_CERAMIQUE_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — Céramique | Texte (facultatif) | `workshops[ceramique].ticketing.opensOn` | « Billetterie bientôt disponible » | Accueil + `/ateliers/` | Idem cookies | La carte affiche « Ouverture de la billetterie le … » |

## Tableau de suivi — entrées terminées

| ID | Statut | Élément fourni | Type | Emplacement réel | Fallback actuel | Pages & composants affectés | Procédure d'intégration | Critère de passage à `DONE` |
|---|---|---|---|---|---|---|---|---|
| `BRAND_LOGO` | DONE | Mot-symbole officiel « Les ateliers massoda » | PNG transparent | `public/brand/nouveau_logo_crop.png` (source intacte : `public/brand/nouveau_logo.png`) | — | Header, Footer, JSON-LD de `BaseLayout.astro` | Recadré sur ses pixels opaques, ratio 355×154 conservé | Intégré et vérifié à 320/390/768/1440 px |
| `FOUNDER_PHOTO` | DONE | Portrait de la fondatrice | JPEG 720×960 | `public/images/about/photo-fondatrice.jpg` | — | `/a-propos/` | Ratio 3:4 natif, `object-position: center 28%` | Intégré, visage non coupé à toutes les largeurs |
| `WORKSHOP_DESCRIPTIONS` | DONE | Descriptions éditoriales des trois ateliers | Textes | `workshops[*].description` dans `src/data/workshops.ts` | — | Accueil + `/ateliers/` via `WorkshopCard.astro` | Textes du brief repris mot pour mot | Affichées à l'identique sur les deux pages depuis la source unique |

## Décompte

Calcul reproductible : **5 entrées globales + 7 champs × 3 ateliers = 26 ouvertes**,
plus 3 entrées terminées, soit 29 au total.

| Statut | Nombre |
|---|---|
| `MISSING` | 0 |
| `PLACEHOLDER` | 26 |
| `READY_TO_INTEGRATE` | 0 |
| **Total ouvertes** | **26** |
| `DONE` | 3 |
| **Total général** | **29** |

Détail des 26 ouvertes :

- 5 globales : `HERO_VIDEO`, `HERO_VIDEO_POSTER`, `NOS_ATELIERS_MEDIA`,
  `LETTER_SIGNUP_URL`, `GLOBAL_RESERVATION_URL` ;
- 21 ateliers : 7 champs (`DATE`, `TIME`, `PLACE`, `PRICE`, `IMAGE`,
  `TICKETING_URL`, `TICKETING_OPENS_ON`) pour chacun des 3 ateliers
  (`COOKIES`, `BAYA`, `CERAMIQUE`).

Une seule entrée ouverte n'a pas de balise `data-massoda-placeholder` dans le
HTML : `HERO_VIDEO_POSTER`, qui n'a pas d'emplacement propre tant qu'aucune vidéo
n'existe. Elle reste traçable par `MASSODA_MISSING:HERO_VIDEO_POSTER` dans
`src/data/site.ts`. Toutes les autres sont visibles dans le HTML produit.

---

## Ce que Yoran doit encore fournir

Liste pratique, sans jargon technique. Chaque ligne dit quoi envoyer ; l'intégration
se fait ensuite dans les fichiers indiqués plus haut.

### 1. Ateliers

Pour **chacun** des trois ateliers — Cookies au moringa, Confection de baya,
Céramique :

- [ ] la **date** (ex. « samedi 14 mars 2026 ») ;
- [ ] l'**horaire** (ex. « 14h – 17h ») ;
- [ ] le **lieu** communicable publiquement ;
- [ ] le **prix** (ex. « 55 € ») ;
- [ ] une **photo** de l'atelier — format paysage 4:3, au moins 1200 px de large,
      avec une phrase décrivant ce qu'on y voit (pour l'accessibilité) ;
- [ ] le **lien de billetterie** propre à cet atelier ;
- [ ] *(facultatif)* la **date d'ouverture** de la billetterie, si l'on veut
      l'annoncer avant qu'elle n'ouvre.

En attendant, les trois cartes restent affichées avec « Date à venir »,
« Prix à venir », un visuel « Visuel à venir » et une mention non cliquable
« Billetterie bientôt disponible ».

### 2. Médias

- [ ] la **vidéo du hero** : plans resserrés sur des mains qui créent, muette,
      environ 8 à 15 secondes en boucle, format portrait 4:5, moins de 3 Mo ;
- [ ] son **image de poster** (même cadrage que la première image de la vidéo) ;
- [ ] une **photo pour la section « Nos ateliers »** montrant les intervenant·es
      et les gestes, format paysage 4:3.

En attendant, le hero affiche une photo existante et la section « Nos ateliers »
réutilise une photo d'atelier déjà présente sur le site.

### 3. La Lettre

- [ ] l'**adresse du formulaire d'inscription** (le lien fourni par le service
      d'emailing utilisé).

En attendant, la section « La Lettre de Massoda » de l'accueil affiche
« Inscriptions bientôt disponibles », sans formulaire et sans lien. Le menu
« La Lettre » pointe vers cette section.

### 4. Réservation / URLs

- [ ] le **lien de billetterie générale** valable pour la nouvelle programmation.

L'ancienne billetterie « Paint & Jam » a été entièrement retirée du site : rien ne
confirmait qu'elle correspondait aux trois nouveaux ateliers. En attendant, tous
les boutons de réservation affichent « Découvrir les prochains ateliers » et
mènent à la liste des ateliers — aucun bouton ne promet une réservation qui
n'existe pas encore.

### 5. Autres éléments éventuels

Rien d'autre n'est requis pour que le site soit complet et cohérent. Les points
suivants sont facultatifs, à traiter seulement si tu le souhaites :

- [ ] *(facultatif)* remplacer l'adresse e-mail de contact `yoranrd@gmail.com` de
      la page Collaborer par une adresse dédiée à la marque ;
- [ ] *(facultatif)* fournir un visuel de partage social dédié — le site en génère
      déjà un correct à partir du logo (`public/brand/og-masoda-v2.png`).
