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
`data-massoda-placeholder="<ID>"`. Un même attribut peut regrouper **plusieurs IDs
séparés par des espaces**, par exemple les quatre champs pratiques manquants
sur leur ligne commune. Un ID disparaît dès que son contenu est fourni ; les
autres restent sur cette ligne tant qu’ils manquent.

Les photos sont des masters dans `src/assets/images/`, référencés par une **clé
sans extension** dans les données ou les tableaux de page. `img(key)` refuse une
clé absente au build ; `<Picture>` génère les variantes AVIF/WebP. Les originaux
restent conservés dans `design-assets/originals/`, hors déploiement. Les vidéos
et leurs posters restent dans `public/media/`.

### Replis affichés

- Une photo d’atelier manquante affiche une tuile unie « Photo à venir » ; les
  catégories boutique sans photo utilisent « Sélection à venir ».
- Les champs pratiques connus ont chacun leur ligne. Tous les champs manquants
  sont réunis en une ligne : « Infos pratiques à venir » si les quatre manquent,
  sinon leurs noms dans l’ordre date, horaire, lieu, prix, par exemple
  « Horaire et prix à venir ». La billetterie en attente reste une ligne d’état.
- Sans réservation globale, le header propose « Prochains ateliers » vers
  `/ateliers/#prochains-ateliers`, et le hero un seul bouton
  « Découvrir les ateliers » vers `/ateliers/`.
- Le bloc final ateliers suit la chaîne réservation → inscription réelle à
  La Lettre → Instagram, centralisée dans `src/data/site.ts`. Sans inscription,
  il affiche le texte d’attente de programmation et
  « Suivre les annonces sur Instagram » ; la note « Écrivez-nous » reste.
- L’accueil et `/la-lettre/` partagent une action indépendante de la réservation :
  « Recevoir La Lettre » si l’URL existe, sinon « Les inscriptions ouvrent très
  bientôt. » puis « Suivre les annonces sur Instagram ». La navigation
  « La Lettre » mène à `/la-lettre/` ; l’ancienne ancre `#la-lettre` est conservée
  sur l’accueil.

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
| `HERO_VIDEO` | PLACEHOLDER | Vidéo « mains qui créent », plans resserrés | Fichier MP4 | `public/media/home/hero-massoda.mp4`, puis `HERO_MEDIA.videoSrc = 'media/home/hero-massoda.mp4'` dans `src/data/site.ts` | Photo réelle `src/assets/images/about/masoda-cest-quoi.jpg`, clé `HERO_MEDIA.fallbackImage = 'about/masoda-cest-quoi'` | Accueil → `HeroSection.astro` | Déposer le MP4, renseigner `videoSrc` ; le `<Picture>` de repli devient une vidéo muted/loop/playsinline avec bouton pause/lecture ; lecture automatique seulement sans préférence de mouvement réduit | Vidéo réelle et commande visibles ; pause/lecture fonctionnelles ; poster sans autoplay en mouvement réduit ; placeholder HERO_VIDEO disparu |
| `HERO_VIDEO_POSTER` | PLACEHOLDER | Image affichée avant lecture de la vidéo | Fichier JPEG | `public/media/home/hero-massoda-poster.jpg`, puis `HERO_MEDIA.posterSrc` | AVIF généré depuis la clé `about/masoda-cest-quoi` si la vidéo existe sans poster réel | Accueil → `HeroSection.astro` | Déposer le fichier et renseigner `posterSrc` ; à fournir en même temps que `HERO_VIDEO` | Poster réel présent sur la vidéo ; placeholder HERO_VIDEO_POSTER disparu ; image affichée avant lecture et en mouvement réduit |
| `NOS_ATELIERS_MEDIA` | PLACEHOLDER | Photo dédiée montrant les intervenant·es et les gestes | Fichier JPEG | `src/assets/images/home/nos-ateliers.jpg`, puis `NOS_ATELIERS_MEDIA.finalImage = 'home/nos-ateliers'` dans `src/data/site.ts` | Photo réelle `src/assets/images/home/atelier-paint-jam.jpg`, clé `home/atelier-paint-jam`, rendue via `<Picture>` | Accueil → `NosAteliersSection.astro` | Déposer le master JPEG, renseigner la clé sans extension, **et réécrire `alt`** pour décrire la nouvelle photo | La section affiche la nouvelle image avec un `alt` factuel et exact |
| `LETTER_SIGNUP_URL` | PLACEHOLDER | URL d'inscription à La Lettre | URL https | `LETTER.signupUrl` dans `src/data/site.ts` | Texte « Les inscriptions ouvrent très bientôt. » et bouton « Suivre les annonces sur Instagram » sur l’accueil et `/la-lettre/` ; repli Instagram au bas de `/ateliers/` | Accueil → `LetterSection.astro` (`#la-lettre`) + `/la-lettre/` → `LetterAction.astro` + bas de `/ateliers/` | Renseigner `LETTER.signupUrl` ; accueil et page dédiée affichent uniquement « Recevoir La Lettre », indépendamment de la réservation ; le bloc ateliers suit la chaîne de repli de `getAnnouncementCta()` | Le CTA mène à l’inscription réelle ; le texte d’attente et les placeholders LETTER_SIGNUP_URL ont disparu |
| `GLOBAL_RESERVATION_URL` | PLACEHOLDER | Billetterie générale valable pour la nouvelle programmation | URL https | `RESERVATION_URL` dans `src/data/site.ts` (vaut `null`) | Header desktop/mobile : « Prochains ateliers » → `/ateliers/#prochains-ateliers` ; hero : un seul « Découvrir les ateliers » → `/ateliers/` ; À propos : découverte des ateliers ; bas ateliers : inscription réelle à La Lettre, sinon Instagram | Header (desktop + mobile), accueil, `/a-propos/`, bas de `/ateliers/` | Renseigner `RESERVATION_URL` ; `getReservationCta()` reste le point de décision unique ; header/hero/À propos et bloc final ateliers retrouvent « Réserver un atelier » ; le hero ajoute le CTA outline « Découvrir les ateliers » | Les CTA affichent « Réserver un atelier » et pointent vers la vraie billetterie |
| `WORKSHOP_COOKIES_DATE` | PLACEHOLDER | Date — Cookies au moringa | Texte | `workshops[cookies].date` dans `src/data/workshops.ts` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Écrire la date en toutes lettres, ex. « samedi 14 mars 2026 » | La date s'affiche sur les deux pages, sans italique grisé |
| `WORKSHOP_COOKIES_TIME` | PLACEHOLDER | Horaire — Cookies au moringa | Texte | `workshops[cookies].time` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_PLACE` | PLACEHOLDER | Lieu — Cookies au moringa | Texte | `workshops[cookies].place` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Lieu communicable publiquement (l'adresse exacte reste sur la billetterie) | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_PRICE` | PLACEHOLDER | Prix — Cookies au moringa | Texte | `workshops[cookies].price` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 55 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_COOKIES_IMAGE` | PLACEHOLDER | Photo — Cookies au moringa | Fichier JPEG, ratio 4:3, ≥ 1200 px | `src/assets/images/workshops/cookies-moringa.jpg`, puis `workshops[cookies].image = { src: 'workshops/cookies-moringa', alt }` dans `src/data/workshops.ts` | Tuile unie « Photo à venir » de `MediaPlaceholder.astro`, teinte cyclée selon l’index de la carte | Accueil + `/ateliers/` | Déposer le master JPEG, renseigner la clé `src` sans extension et un `alt` factuel ; le composant génère AVIF/WebP sans agrandissement | La photo rendue via `<Picture>` remplace la tuile sur les deux pages ; le placeholder image a disparu |
| `WORKSHOP_COOKIES_TICKETING_URL` | PLACEHOLDER | Billetterie — Cookies au moringa | URL https | `workshops[cookies].ticketing.url` **et** `status: 'open'` | Ligne d’état avec point accent de 8 px et « Billetterie bientôt disponible » ou « Ouverture de la billetterie le … », sans faux bouton | Accueil + `/ateliers/` | Coller l'URL propre à cet atelier et passer le statut à `open`. **Ne jamais réutiliser l'ancienne URL Paint & Jam** | Un vrai bouton « Réserve ta place » apparaît sur les deux pages |
| `WORKSHOP_COOKIES_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — Cookies | Texte (facultatif) | `workshops[cookies].ticketing.opensOn` | Ligne d’état « Billetterie bientôt disponible », point accent de 8 px ; même attribut que TICKETING_URL tant que les deux manquent | Accueil + `/ateliers/` | Utile seulement si l'on veut annoncer une date avant l'ouverture ; sinon fournir directement l'URL ci-dessus | La carte affiche « Ouverture de la billetterie le … », ou l'entrée est close si la billetterie ouvre directement |
| `WORKSHOP_BAYA_DATE` | PLACEHOLDER | Date — Confection de baya | Texte | `workshops[baya].date` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Date en toutes lettres | La date s'affiche sur les deux pages |
| `WORKSHOP_BAYA_TIME` | PLACEHOLDER | Horaire — Confection de baya | Texte | `workshops[baya].time` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_BAYA_PLACE` | PLACEHOLDER | Lieu — Confection de baya | Texte | `workshops[baya].place` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Lieu communicable publiquement | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_BAYA_PRICE` | PLACEHOLDER | Prix — Confection de baya | Texte | `workshops[baya].price` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 65 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_BAYA_TICKETING_URL` | PLACEHOLDER | Billetterie — Confection de baya | URL https | `workshops[baya].ticketing.url` **et** `status: 'open'` | Ligne d’état avec point accent de 8 px et « Billetterie bientôt disponible » ou « Ouverture de la billetterie le … », sans faux bouton | Accueil + `/ateliers/` | URL propre à cet atelier, jamais l'URL Paint & Jam | Un vrai bouton « Réserve ta place » apparaît |
| `WORKSHOP_BAYA_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — baya | Texte (facultatif) | `workshops[baya].ticketing.opensOn` | Ligne d’état « Billetterie bientôt disponible », point accent de 8 px ; même attribut que TICKETING_URL tant que les deux manquent | Accueil + `/ateliers/` | Idem cookies : annonce anticipée uniquement | La carte affiche « Ouverture de la billetterie le … » |
| `WORKSHOP_CERAMIQUE_DATE` | PLACEHOLDER | Date — Céramique | Texte | `workshops[ceramique].date` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Date en toutes lettres | La date s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_TIME` | PLACEHOLDER | Horaire — Céramique | Texte | `workshops[ceramique].time` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 14h – 17h » | L'horaire s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_PLACE` | PLACEHOLDER | Lieu — Céramique | Texte | `workshops[ceramique].place` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Lieu communicable publiquement | Le lieu s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_PRICE` | PLACEHOLDER | Prix — Céramique | Texte | `workshops[ceramique].price` | Une seule ligne commune « Infos pratiques à venir » tant que les quatre champs manquent ; sinon seuls les libellés manquants sont regroupés | Accueil + `/ateliers/` | Ex. « 75 € » | Le prix s'affiche sur les deux pages |
| `WORKSHOP_CERAMIQUE_IMAGE` | PLACEHOLDER | Photo — Céramique | Fichier JPEG, ratio 4:3, ≥ 1200 px | `src/assets/images/workshops/ceramique.jpg`, puis `workshops[ceramique].image = { src: 'workshops/ceramique', alt }` dans `src/data/workshops.ts` | Tuile unie « Photo à venir » de `MediaPlaceholder.astro`, teinte cyclée selon l’index de la carte | Accueil + `/ateliers/` | Déposer le master JPEG, renseigner la clé `src` sans extension et un `alt` factuel ; le composant génère AVIF/WebP sans agrandissement | La photo rendue via `<Picture>` remplace la tuile sur les deux pages ; le placeholder image a disparu |
| `WORKSHOP_CERAMIQUE_TICKETING_URL` | PLACEHOLDER | Billetterie — Céramique | URL https | `workshops[ceramique].ticketing.url` **et** `status: 'open'` | Ligne d’état avec point accent de 8 px et « Billetterie bientôt disponible » ou « Ouverture de la billetterie le … », sans faux bouton | Accueil + `/ateliers/` | URL propre à cet atelier, jamais l'URL Paint & Jam | Un vrai bouton « Réserve ta place » apparaît |
| `WORKSHOP_CERAMIQUE_TICKETING_OPENS_ON` | PLACEHOLDER | Date d'ouverture de la billetterie — Céramique | Texte (facultatif) | `workshops[ceramique].ticketing.opensOn` | Ligne d’état « Billetterie bientôt disponible », point accent de 8 px ; même attribut que TICKETING_URL tant que les deux manquent | Accueil + `/ateliers/` | Idem cookies | La carte affiche « Ouverture de la billetterie le … » |

## Tableau de suivi — entrées terminées

| ID | Statut | Élément fourni | Type | Emplacement réel | Fallback actuel | Pages & composants affectés | Procédure d'intégration | Critère de passage à `DONE` |
|---|---|---|---|---|---|---|---|---|
| `BRAND_LOGO` | DONE | Mot-symbole officiel « Les ateliers massoda » | PNG transparent | `public/brand/nouveau_logo_crop.png` (source intacte : `public/brand/nouveau_logo.png`) | — | Header, Footer, JSON-LD de `BaseLayout.astro` | Recadré sur ses pixels opaques, ratio 355×154 conservé | Intégré et vérifié à 320/390/768/1440 px |
| `FOUNDER_PHOTO` | DONE | Portrait de la fondatrice | JPEG 720×960 | `src/assets/images/about/photo-fondatrice.jpg`, clé `about/photo-fondatrice` dans `/a-propos/` via `img()` | — | `/a-propos/` | Master JPEG sRGB, ratio 3:4 natif, `object-position: center 28%`, rendu `<Picture>` AVIF/WebP | Intégré, visage non coupé à toutes les largeurs |
| `WORKSHOP_DESCRIPTIONS` | DONE | Descriptions éditoriales des trois ateliers | Textes | `workshops[*].description` dans `src/data/workshops.ts` | — | Accueil + `/ateliers/` via `WorkshopCard.astro` | Textes du brief repris mot pour mot | Affichées à l'identique sur les deux pages depuis la source unique |
| `WORKSHOP_BAYA_IMAGE` | DONE | Photo de baya | JPEG, master existant | `src/assets/images/home/atelier-baya.jpg`, clé `home/atelier-baya` dans `workshops[baya].image` | — | Accueil + `/ateliers/` via `WorkshopCard.astro` | photo d’un atelier baya précédent, validée par le client | Photo et alt fournis intégrés ; placeholder WORKSHOP_BAYA_IMAGE disparu |

## Décompte

Calcul reproductible : **5 entrées globales + 7 champs × 3 ateliers − 1 photo intégrée = 25 ouvertes**,
plus 4 entrées terminées, soit 29 au total.

| Statut | Nombre |
|---|---|
| `MISSING` | 0 |
| `PLACEHOLDER` | 25 |
| `READY_TO_INTEGRATE` | 0 |
| **Total ouvertes** | **25** |
| `DONE` | 4 |
| **Total général** | **29** |

Détail des 25 ouvertes :

- 5 globales : `HERO_VIDEO`, `HERO_VIDEO_POSTER`, `NOS_ATELIERS_MEDIA`,
  `LETTER_SIGNUP_URL`, `GLOBAL_RESERVATION_URL` ;
- 20 ateliers : 7 champs (`DATE`, `TIME`, `PLACE`, `PRICE`, `IMAGE`,
  `TICKETING_URL`, `TICKETING_OPENS_ON`) pour chacun des 3 ateliers
  (`COOKIES`, `BAYA`, `CERAMIQUE`), sauf `WORKSHOP_BAYA_IMAGE`, intégré.

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
- [ ] une **photo** pour Cookies au moringa et Céramique — format paysage 4:3, au moins 1200 px de large,
      avec une phrase décrivant ce qu'on y voit (pour l'accessibilité) ;
- [ ] le **lien de billetterie** propre à cet atelier ;
- [ ] *(facultatif)* la **date d'ouverture** de la billetterie, si l'on veut
      l'annoncer avant qu'elle n'ouvre.

La photo baya est intégrée. Les cartes gardent une seule ligne
« Infos pratiques à venir », une tuile « Photo à venir » pour les deux photos manquantes et une ligne d’état
« Billetterie bientôt disponible ». Les champs fournis retrouvent chacun leur
ligne ; les champs encore manquants restent regroupés.

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

En attendant, l’accueil et la page `/la-lettre/` affichent « Les inscriptions
ouvrent très bientôt. » et « Suivre les annonces sur Instagram ». Le menu
« La Lettre » mène à la page dédiée ; l’accueil conserve un extrait de deux
paragraphes et le lien « Lire la lettre en entier ».

### 4. Réservation / URLs

- [ ] le **lien de billetterie générale** valable pour la nouvelle programmation.

L'ancienne billetterie « Paint & Jam » a été entièrement retirée du site : rien ne
confirmait qu’elle correspondait aux trois nouveaux ateliers. En attendant,
le header affiche « Prochains ateliers » et le hero « Découvrir les ateliers ».
Le bas de `/ateliers/` propose « Recevoir La Lettre » si l’inscription est ouverte,
sinon « Suivre les annonces sur Instagram ». Les liens internes passent par
`getNavHref` pour respecter la base `/ateliersmassoda`.

### 5. Autres éléments éventuels

Rien d'autre n'est requis pour que le site soit complet et cohérent. Les points
suivants sont facultatifs, à traiter seulement si tu le souhaites :

- [ ] *(facultatif)* remplacer l'adresse e-mail de contact `yoranrd@gmail.com` de
      la page Collaborer par une adresse dédiée à la marque ;
- [ ] *(facultatif)* fournir un visuel de partage social dédié — le site en génère
      déjà un correct à partir du logo (`public/brand/og-masoda-v2.png`).
