# Prompts d’implémentation — nouvelle version des Ateliers Massoda

## Dépôt à modifier

- Dossier local : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude`
- Dépôt Git attendu : `git@github.com:YoranRD/ateliersmassoda.git`
- Site de production : `https://yoranrd.github.io/ateliersmassoda/`
- Stack : Astro 5, site statique, GitHub Pages
- Commande de validation principale : `npm run build`
- Instructions globales à lire : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/AGENTS.md`
- Instructions Masoda à lire : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/AGENTS.md`
- Brain Masoda : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/brain/`

Ne jamais travailler dans `/Users/ranyoalpha/Documents/Programmation/Masoda_site` : il s’agit de l’ancienne version obsolète.

## Informations déjà confirmées

- Police unique des titres et des textes : `Raleway`.
- Augmentation typographique : `+2px` sur chaque taille existante, soit `+0.125rem` avec une base navigateur de 16px. Cette augmentation s’applique aux titres comme au texte courant, sans sauter deux paliers complets de l’échelle typographique.
- Nouveau logo source : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude/dist/images/about/nouveau_logo.png`.
- Nouvelle photo source de la fondatrice : `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude/dist/images/about/Photo de la fondatrice.jpg`.
- Les deux fichiers sont actuellement dans `dist/`, un dossier généré. Ils doivent être copiés vers `public/` avant le premier build et ne doivent jamais être référencés directement depuis `dist/`.
- Palette candidate : `#ECE9D9`, `#FF6F12`, `#FF9E5A`, `#FF6750`, `#F9D09D`, `#1612D3`. L’agent doit tester plusieurs attributions sémantiques de cette palette dans le rendu réel, puis retenir le meilleur compromis entre esthétique, ergonomie, lisibilité, accessibilité et identité de marque.

## Informations restant à compléter avant l’exécution

Les champs suivants ne figurent pas dans le brief initial. Les renseigner dans les prompts lorsqu’ils sont disponibles :

- `[MEDIA_HERO]` : vidéo réelle montrant des mains en train de créer, avec son poster. Sans fichier fourni, conserver l’image existante ; ne pas générer de fausse vidéo ni ajouter un chemin cassé.
- Pour chacun des trois ateliers : date, heure, lieu, prix, image réelle, URL de billetterie et date d’ouverture si la billetterie n’est pas encore ouverte.
- `[URL_INSCRIPTION_LETTRE]` : URL réelle du formulaire ou de la plateforme d’inscription à La Lettre.

Les prompts ci-dessous sont conçus pour être exécutés dans l’ordre, de préférence dans la même tâche d’agent afin que le contexte et les modifications restent cohérents.

Règle commune de validation visuelle : si un navigateur automatisé, Playwright ou un outil équivalent est disponible, effectuer réellement les contrôles demandés aux largeurs indiquées et consigner les observations ou captures produites. Si aucun outil de rendu n’est disponible, signaler explicitement que la validation visuelle n’a pas pu être automatisée, effectuer uniquement les vérifications statiques possibles et ne jamais déclarer la validation visuelle réussie.


## Règle transversale — placeholders contrôlés et registre de finalisation

À partir du Prompt 2 et jusqu’à la fin du Prompt 4, toute donnée, information, URL, image, vidéo, poster ou autre asset nécessaire mais non encore fourni doit être traité de façon à permettre un rendu complet et testable **sans jamais inventer une information réelle**.

Le terme « simuler » signifie ici : créer une représentation temporaire, clairement identifiable comme placeholder, qui occupe correctement la place prévue dans l’interface et permet de valider le design. Il ne signifie jamais inventer une vraie date, un vrai prix, une vraie adresse, une vraie URL, une vraie ouverture de billetterie ou un faux média présenté comme authentique.

Règles de placeholder :
- donnée factuelle manquante : utiliser un libellé générique non trompeur adapté au contexte, par exemple « Date à venir », « Horaire à venir », « Lieu à venir », « Prix à venir » ou « Informations pratiques à venir » ;
- URL manquante : ne jamais fabriquer de lien. Afficher un état non cliquable ou désactivé comme « Billetterie bientôt disponible » / « Inscriptions bientôt disponibles » ;
- image manquante : ne jamais ajouter de chemin cassé et ne jamais télécharger ou générer une fausse photographie humaine. Réutiliser un asset local réellement disponible lorsque le brief l’autorise ; sinon afficher un placeholder graphique neutre et cohérent avec l’identité visuelle, par exemple un bloc de marque « Visuel à venir » ;
- vidéo manquante : conserver le fallback image prévu ou un placeholder graphique neutre. Ne jamais générer une fausse vidéo. Préparer néanmoins le slot, le poster attendu et les chemins cibles afin que le remplacement ultérieur soit trivial ;
- toute simulation doit être suffisamment propre pour valider responsive, hiérarchie, espacements et composants, mais ne doit pas pouvoir être confondue avec une information commerciale finale.

Balisage obligatoire des placeholders :
- attribue à chaque élément manquant un identifiant stable et explicite, par exemple `WORKSHOP_COOKIES_DATE`, `WORKSHOP_BAYA_IMAGE`, `HERO_VIDEO` ou `LETTER_SIGNUP_URL` ;
- lorsqu’un placeholder apparaît dans le DOM, ajoute si cela reste sémantiquement propre un attribut du type `data-massoda-placeholder="WORKSHOP_COOKIES_DATE"` ;
- dans les données TypeScript, préfère un état explicite tel que `contentStatus: "placeholder"` ou un champ optionnel plutôt qu’une fausse valeur ;
- lorsqu’un commentaire source facilite réellement le remplacement, utilise la convention `MASSODA_MISSING:<IDENTIFIANT>` à proximité du fallback. N’ajoute pas de commentaires redondants partout ;
- lorsqu’un élément final est fourni plus tard, remplace le fallback, retire le balisage de placeholder correspondant et passe son entrée de suivi à `DONE`.

Registre unique de finalisation :
- au début du Prompt 2, crée à la racine du dépôt `/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude/MASSODA_CONTENT_TODO.md` s’il n’existe pas ;
- ce fichier est un registre éditorial/technique de finalisation et **ne doit pas être utilisé comme source runtime du site** ;
- les Prompts 2, 3 et 4 doivent le lire au début de leur phase puis le mettre à jour avant leur compte rendu ;
- n’efface jamais une entrée manquante simplement parce qu’un placeholder visuel existe. Une entrée ne passe à `DONE` que lorsqu’une vraie donnée ou un vrai asset a été fourni et intégré ;
- toute nouvelle absence découverte pendant l’implémentation doit être ajoutée immédiatement au registre.

Pour chaque entrée du registre, indique au minimum :
1. un identifiant stable ;
2. le statut (`MISSING`, `PLACEHOLDER`, `READY_TO_INTEGRATE` ou `DONE`) ;
3. l’élément final attendu ;
4. le fallback actuellement affiché ;
5. le chemin ou emplacement recommandé pour la vraie donnée ou le vrai fichier ;
6. le fichier/code qui consommera cet élément ;
7. l’action exacte à effectuer lorsque l’élément réel sera disponible ;
8. toute contrainte utile : format, ratio, dimensions, URL attendue, statut de billetterie, etc.

Chemins recommandés à privilégier si l’architecture existante ne suggère pas une convention meilleure :
- vidéo hero : `public/media/home/hero-massoda.mp4` ;
- poster hero : `public/media/home/hero-massoda-poster.jpg` ;
- média de la section « Nos ateliers » : `public/images/home/nos-ateliers.jpg` ou `public/media/home/nos-ateliers.mp4` selon le média final ;
- image Cookies au moringa : `public/images/workshops/cookies-moringa.jpg` ;
- image Confection de baya : `public/images/workshops/confection-baya.jpg` ;
- image Céramique : `public/images/workshops/ceramique.jpg` ;
- données des ateliers : `src/data/workshops.ts` ;
- URL et données globales de La Lettre / réservation : `src/data/site.ts`.

Si les conventions déjà présentes dans le dépôt imposent un chemin plus cohérent, utilise ce chemin plutôt que ceux proposés ci-dessus et consigne le chemin réellement retenu dans `MASSODA_CONTENT_TODO.md`.

Le but est qu’après le Prompt 4, une personne puisse ouvrir **un seul fichier**, `MASSODA_CONTENT_TODO.md`, voir immédiatement tout ce qui manque encore, savoir quel fichier fournir ou quelle valeur récupérer, où la placer, et quelle ligne de données/composant sera automatiquement ou directement mise à jour.

---

## Prompt 1 — Identité visuelle, logo et navigation

```text
Travaille directement dans le dépôt Astro suivant :
/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude

Le site concerné est https://yoranrd.github.io/ateliersmassoda/. Ne modifie jamais l’ancien projet /Users/ranyoalpha/Documents/Programmation/Masoda_site.

Objectif : mettre à jour l’identité visuelle globale et la navigation des Ateliers Massoda sans refondre inutilement l’architecture existante.

Avant toute modification :
- confirme que le remote Git contient YoranRD/ateliersmassoda ;
- lis entièrement /Users/ranyoalpha/Documents/Programmation/Site_Creator/AGENTS.md et /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/AGENTS.md ;
- pour cette phase design, lis aussi les fichiers brain/index.md, brain/brand.md, brain/design.md, brain/colors.md, brain/typography.md et brain/refs-sites.md sous /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/ ;
- considère le nouveau brief de cette tâche comme prioritaire lorsqu’il modifie explicitement une ancienne couleur, une navigation ou un contenu. Le fichier nouveau_logo.png fourni et confirmé dans cette tâche remplace désormais le logo officiel avec halo ;
- inspecte git status et préserve toute modification locale existante ;
- inspecte les composants et tokens existants avant de choisir les changements les plus petits et cohérents.

Protection immédiate des deux nouveaux assets :
- avant `npm run build` ou toute autre commande susceptible de nettoyer ou reconstruire `dist/`, effectue les deux copies depuis `dist/images/about/` vers les destinations `public/` indiquées plus bas ;
- vérifie ensuite que les deux fichiers copiés existent, ne sont pas vides, ont le type attendu et peuvent être ouverts ;
- si l’un des deux fichiers source a disparu avant sa copie, arrête-toi avant tout build et signale précisément le fichier manquant. Ne remplace jamais cet asset par une approximation.

Palette candidate à tester puis à intégrer dans src/styles/tokens.css :
- fond jaune clair : #ECE9D9 ;
- orange principal : #FF6F12 ;
- orange abricot : #FF9E5A ;
- rouge/rose vif : #FF6750 ;
- orange pastel : #F9D09D ;
- bleu de marque : #1612D3.

Ne choisis pas le mapping des couleurs uniquement en théorie. Produis et compare au moins deux variantes temporaires d’attribution des rôles, sans les conserver toutes dans le code final. Observe au minimum le header, le hero, les CTA, une carte, une section claire et une section accentuée aux largeurs d’environ 390px et 1440px. Compare les variantes selon ces critères, dans cet ordre :
1. lisibilité et contraste WCAG du texte et des actions ;
2. clarté de la hiérarchie des CTA ;
3. cohérence chaleureuse, joyeuse et premium ;
4. confort visuel sur une page longue ;
5. fidélité au nouveau logo bleu.

Retire les variantes rejetées et conserve une seule palette sémantique dans src/styles/tokens.css. Ne disperse pas les valeurs hexadécimales dans les composants. Les six couleurs proposées ne doivent pas nécessairement occuper la même surface ni servir de couleur de texte. Conserve ou ajoute uniquement les neutres indispensables au texte, aux bordures et aux surfaces. Les oranges vifs ne doivent pas recevoir automatiquement du petit texte blanc si le contraste est insuffisant. Le bleu peut servir aux CTA principaux lorsque ce choix donne le meilleur contraste. Prévois des états hover, focus et disabled cohérents. Documente brièvement dans le compte rendu les variantes comparées et la raison du choix final.

Typographie :
- utilise `Raleway` pour les titres et pour le texte courant ;
- mets à jour l’import de police dans src/styles/global.css et les variables --font-heading et --font-body dans src/styles/tokens.css ;
- charge uniquement les graisses Raleway réellement utilisées ;
- prends comme référence les valeurs présentes dans src/styles/tokens.css avant modification et ajoute exactement `2px`, soit `0.125rem`, à chaque token de taille `--text-*` ;
- conserve une progression typographique cohérente et les fonctions clamp des titres. L’objectif est une hausse mesurée de 2px, pas un saut de deux niveaux complets ;
- après cette hausse, ajuste si nécessaire les max-width, espacements, line-height et règles de retour à la ligne, sans annuler l’augmentation demandée ;
- vérifie particulièrement le logo/header, le h1 du hero, les titres de cartes, les boutons, les FAQ et les paragraphes longs à 320px, 390px, 768px et 1440px ;
- aucun texte ne doit être coupé, se superposer, déborder horizontalement ou créer une ligne isolée manifestement disgracieuse.

Logo :
- fichier source confirmé : /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude/dist/images/about/nouveau_logo.png ;
- copie ce fichier avant tout build vers public/brand/nouveau_logo.png, car dist/ est un dossier de sortie susceptible d’être supprimé puis recréé ;
- inspecte ses marges transparentes. Si elles nuisent à la lisibilité dans le header, crée une copie optimisée en retirant uniquement les pixels totalement transparents, sans modifier le dessin, la couleur, les proportions ni la typographie du logo. Conserve le fichier source copié ;
- remplace l’ancien logo dans src/components/Header.astro, src/components/Footer.astro et le logo JSON-LD de src/layouts/BaseLayout.astro ;
- le nouveau logo contient déjà les mots « Les ateliers massoda » : retire le texte « Massoda » adjacent dans le header et le footer s’il devient redondant ;
- adapte la largeur visuelle du logo et la hauteur du header pour qu’il reste clairement lisible sans repousser ni comprimer la navigation ;
- respecte son ratio, définis des dimensions explicites et un alt pertinent ;
- ne recrée pas ou ne redessine pas le logo de mémoire ;
- ne laisse aucune référence active à logo_halo.png dans les composants ou les métadonnées concernés ;
- ne modifie favicon.svg et og-masoda.png que si des variantes lisibles peuvent être dérivées proprement du fichier officiel sans déformer la marque. Un mot-symbole illisible en 32px ne doit pas devenir un favicon.

Photo de la fondatrice :
- fichier source confirmé : /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude/dist/images/about/Photo de la fondatrice.jpg ;
- copie-le avant tout build vers public/images/about/photo-fondatrice.jpg ;
- mets à jour src/pages/a-propos.astro pour remplacer l’image actuelle public/images/about/fondatrice-masoda.png par cette nouvelle photo ;
- utilise l’alt « Portrait de la fondatrice des Ateliers Massoda », sauf si le texte adjacent permet une description plus précise et factuelle ;
- conserve le ratio naturel 3:4 du fichier 720x960, évite toute déformation et choisis un object-position qui ne coupe ni le visage ni la coiffure aux différentes largeurs ;
- ne supprime pas les anciens fichiers source : le remplacement porte sur les références du site.

Navigation desktop et mobile à afficher exactement dans cet ordre :
1. Accueil -> route d’accueil ;
2. Ateliers & expériences -> /ateliers/ ;
3. La Lettre -> pour l’instant, pointe ce lien vers l’accueil suivi de l’ancre #la-lettre, en construisant l’URL avec src/utils/nav.ts afin d’obtenir un lien compatible avec le base path, par exemple `/ateliersmassoda/#la-lettre` en production. N’utilise pas une ancre `#la-lettre` seule, car le header est aussi affiché sur les autres pages. Le Prompt 4 remplacera ce lien par /la-lettre/ uniquement si la page dédiée est effectivement créée ;
4. À propos -> /a-propos/ ;
5. Collaborer -> /contact/ ;
6. CTA distinct « Réserver un atelier » -> URL de réservation centralisée.

Supprime de la navigation principale Boutique, Journal et Contact, mais ne supprime pas leurs pages. Le libellé Collaborer doit réutiliser la page contact existante. Synchronise le menu mobile et le footer. Préserve la gestion correcte du base path /ateliersmassoda avec src/utils/nav.ts. Ferme le menu mobile après activation d’un lien et conserve des attributs ARIA cohérents.

Ne crée aucune donnée commerciale et ne modifie pas encore le contenu des pages d’accueil ou Ateliers. Ne committe pas et ne pousse pas.

Validation avant de terminer :
- npm run build ;
- git diff --check ;
- vérification des liens de navigation avec le base path GitHub Pages ;
- si un navigateur automatisé, Playwright ou un outil équivalent est disponible, contrôle réellement le header, le nouveau logo, la page À propos et la nouvelle photo à environ 320px, 390px, 768px et 1440px, puis consigne les observations ou captures. Sinon, signale que ce contrôle visuel n’a pas pu être automatisé et ne le déclare pas réussi ;
- confirmation dans les styles calculés que Raleway est appliquée et que chaque token `--text-*` a augmenté de 2px par rapport à sa valeur initiale ;
- confirmation que le build utilise les copies placées dans public/ et non les fichiers de dist/ ;
- vérification clavier du menu mobile et des focus visibles.

Compte rendu attendu : fichiers modifiés, variantes de palette comparées, mapping final retenu et justification, preuve de l’augmentation typographique de 2px, contrôles du logo et de la photo, validations exécutées, puis liste courte des informations encore manquantes.
```

---

## Prompt 2 — Données partagées et nouvelle page d’accueil

```text
Continue dans le dépôt :
/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude

Objectif : reconstruire la page d’accueil des Ateliers Massoda selon le brief ci-dessous, en réutilisant les composants Astro existants quand cela reste propre et en centralisant toutes les données variables.

Commence par inspecter les changements présents et préserve-les. Ne travaille pas dans l’ancien dossier Masoda_site. Ne committe pas et ne pousse pas.

Avant d’éditer, lis les instructions de /Users/ranyoalpha/Documents/Programmation/Site_Creator/AGENTS.md et /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/AGENTS.md, puis les fichiers brain/index.md, brain/brand.md, brain/pages.md, brain/copywriting.md et brain/seo.md sous /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/. Le nouveau brief ci-dessous prime sur les anciens textes de page lorsqu’il les remplace explicitement.

1. Centralisation des données

Crée une petite couche de données typée, par exemple src/data/site.ts et src/data/workshops.ts, puis fais-en la source unique pour :
- les liens de réservation ;
- l’URL de La Lettre ;
- les trois prochains ateliers ;
- leurs dates, heures, lieux, prix, images, textes, statuts et CTA.

Modèle au minimum deux statuts de billetterie : ouverte et bientôt disponible. Une carte ouverte affiche un vrai lien « Réserve ta place » uniquement si une URL de billetterie propre à cet atelier existe. Une carte à venir affiche « Ouverture de la billetterie le [date] » sous forme de texte non cliquable. N’utilise pas l’ancienne URL Paint & Jam pour un nouvel atelier sans preuve qu’elle est correcte.

Données à renseigner :
- Cookies au moringa : [DATE], [HEURE], [LIEU], [PRIX], [URL_BILLETTERIE], [IMAGE] ;
- Confection de baya : [DATE], [HEURE], [LIEU], [PRIX], [DATE_OUVERTURE], [URL_BILLETTERIE], [IMAGE] ;
- Céramique : [DATE], [HEURE], [LIEU], [PRIX], [DATE_OUVERTURE], [URL_BILLETTERIE], [IMAGE] ;
- La Lettre : [URL_INSCRIPTION_LETTRE].

Les chaînes entre crochets sont des placeholders de brief, pas du contenu à écrire dans le site. Toute valeur encore présentée entre crochets doit être considérée comme absente. Ne copie jamais littéralement `[DATE]`, `[IMAGE]`, `[URL_BILLETTERIE]` ou un autre placeholder dans le code, le HTML ou les métadonnées.

Si une valeur manque, ne l’invente pas. Omet le champ concerné ou affiche un libellé sobre comme « Informations pratiques à venir ». Ne laisse pas de lien vide, de bouton factice ou de chemin d’image cassé.


Cette règle n’interdit pas de simuler la **présence visuelle** de l’information : lorsqu’une donnée manque, conserve une carte ou une zone de mise en page complète avec un placeholder générique et explicitement temporaire conformément à la règle transversale. Par exemple, un prix absent peut être rendu comme « Prix à venir », mais jamais comme un montant inventé.

Avant de poursuivre la composition :
- crée ou mets à jour `MASSODA_CONTENT_TODO.md` ;
- initialise toutes les absences déjà connues : `[MEDIA_HERO]`, son poster si nécessaire, média réel de la section « Nos ateliers » si absent, date/heure/lieu/prix/image/URL de billetterie de chacun des trois ateliers, dates d’ouverture nécessaires, `[URL_INSCRIPTION_LETTRE]`, ainsi que toute autre information réellement manquante découverte dans le dépôt ;
- pour chaque image ou vidéo manquante, consigne le chemin final recommandé et le fallback utilisé actuellement ;
- pour chaque donnée atelier manquante, consigne qu’elle devra être intégrée dans `src/data/workshops.ts` ;
- pour l’URL de La Lettre et les liens globaux, consigne qu’ils devront être intégrés dans `src/data/site.ts` ;
- si une valeur réelle est déjà présente et vérifiable dans le dépôt, ne la marque pas manquante ; indique-la comme `DONE` seulement si elle correspond bien au nouveau brief.

Pour faciliter le remplacement ultérieur, structure les données de manière à ce qu’ajouter une vraie valeur dans `src/data/workshops.ts` ou `src/data/site.ts` suffise autant que possible à mettre automatiquement à jour toutes les occurrences du site. Évite les fallbacks codés en dur dans plusieurs composants.

2. Composition de l’accueil

Mets à jour src/pages/index.astro et les composants de src/components/home/. La page doit suivre cet ordre et rester concise :

A. Hero / présentation
- Sur-ligne : « CULTURE · CRÉATIVITÉ · BIEN-ÊTRE ».
- Titre principal : « Les Ateliers Massoda ».
- Promesse : « Explorer les cultures afro-caribéennes pour réinventer son art de vivre. »
- Média souhaité : [MEDIA_HERO], une vidéo réelle avec des plans resserrés sur des mains qui créent. Si elle est fournie, implémente une balise video légère avec autoplay, muted, loop, playsinline, poster et solution de repli. Si elle n’est pas fournie, conserve public/images/home/hero-atelier-masoda.png comme image temporaire. Ne télécharge pas d’image humaine générique et ne génère pas de faux contenu humain.
- Si `[MEDIA_HERO]` est absent, balise ce fallback comme temporaire avec l’identifiant `HERO_VIDEO`, inscris dans `MASSODA_CONTENT_TODO.md` les chemins finaux recommandés `public/media/home/hero-massoda.mp4` et `public/media/home/hero-massoda-poster.jpg`, et prépare la structure du composant pour que leur intégration future demande le moins de modifications possible.
- CTA principal : « Réserver un atelier ».
- CTA secondaire : « Découvrir les ateliers » vers /ateliers/.

B. Section « Nos ateliers »
Texte :
« Chaque expérience Massoda est imaginée avec des artistes, artisan·es et expert·es choisi·es pour leur savoir-faire et leur capacité à transmettre. Ces rencontres invitent à découvrir leurs pratiques, à les expérimenter et à se les réapproprier à sa manière. »
Prévois une image ou vidéo réelle mettant les intervenant·es et les gestes en valeur. Sans nouveau média, réutilise une image locale cohérente avec un alt exact ; ne référence aucun fichier absent.

C. Section « L’art de vivre »
Introduction :
« Chez Massoda, le bien-être ne se limite pas à une pratique. Il se nourrit aussi de notre façon de vivre au quotidien. À travers les cultures afro-caribéennes, nos ateliers invitent à découvrir de nouveaux savoirs, gestes et pratiques pour réinventer son art de vivre et nourrir trois dimensions essentielles de notre bien-être. »

Trois piliers :
- 🌀 « L’équilibre intérieur » — « Se reconnecter à soi, ralentir, créer, échanger et s’accorder des espaces de respiration. »
- 🌱 « Le bien-être du corps » — « Explorer l’alimentation, le mouvement, les soins et les pratiques qui nous aident à prendre soin de notre corps. »
- ☀️ « L’estime de soi » — « Cultiver la confiance, l’expression de soi, la fierté et un rapport plus conscient à son identité. »

Les emoji peuvent être visuels et masqués aux technologies d’assistance si les titres transmettent déjà leur sens.

D. Section « Nos trois prochains ateliers »
Affiche les trois entrées issues de src/data/workshops.ts dans des cartes réutilisables, mobiles d’abord, avec hiérarchie claire entre titre, informations pratiques, statut et action.

Même lorsque des données ou images sont absentes, conserve les trois cartes visibles pour pouvoir valider le design. Utilise uniquement les placeholders génériques décrits plus haut, avec des identifiants stables `data-massoda-placeholder`, et enregistre chaque manque dans `MASSODA_CONTENT_TODO.md`. Une image absente doit produire un fallback graphique/local propre, jamais une image cassée.

E. Section « La Lettre de Massoda » avec id="la-lettre"
Texte : « Les abonné·es à La Lettre de Massoda accèdent aux billetteries avant leur ouverture au public. »
CTA : « Recevoir La Lettre ».
Utilise [URL_INSCRIPTION_LETTRE] si elle est fournie. Sinon, transforme le CTA en lien vers la future route /la-lettre/ uniquement si cette route est créée au Prompt 4 ; à défaut, affiche « Inscriptions bientôt disponibles » sans faux formulaire.
Si l’URL manque, marque cet état avec l’identifiant `LETTER_SIGNUP_URL` et documente dans `MASSODA_CONTENT_TODO.md` que la valeur finale devra être ajoutée à `src/data/site.ts`. Le rendu temporaire doit rester visuellement abouti mais non cliquable tant qu’aucune URL réelle n’est fournie.

Retire de l’accueil les anciennes sections qui dupliquent ou contredisent ce nouveau parcours. Le footer peut conserver les réseaux sociaux. Garde une première vue lisible sur mobile, un CTA de réservation immédiatement identifiable et un rythme éditorial aéré. Mets à jour le title et la meta description de la page sans promesse thérapeutique ou donnée inventée.

Respecte la typographie Raleway et l’augmentation globale de 2px appliquées au Prompt 1. Ajuste la composition, les largeurs de texte, les espacements et les retours à la ligne pour absorber cette nouvelle échelle sans réduire localement les tailles afin de masquer un problème de mise en page.

Validation avant de terminer :
- npm run build ;
- git diff --check ;
- aucun chemin d’image ou lien vide dans le HTML construit ;
- si un navigateur automatisé, Playwright ou un outil équivalent est disponible, effectue réellement l’inspection visuelle à environ 390px, 768px et 1440px et consigne les observations ou captures. Sinon, signale explicitement que cette validation visuelle n’a pas pu être automatisée et ne la déclare pas réussie ;
- titres dans l’ordre h1 puis h2/h3 ;
- CTA et cartes utilisables au clavier ;
- aucun débordement horizontal ni texte tronqué.
- vérifie que chaque `data-massoda-placeholder` ou marqueur `MASSODA_MISSING:` correspond à une entrée de `MASSODA_CONTENT_TODO.md` ;
- vérifie qu’aucune entrée `MISSING` ou `PLACEHOLDER` du registre n’est présentée comme une donnée réelle ;
- vérifie que `MASSODA_CONTENT_TODO.md` contient pour chaque manque le chemin cible et l’action d’intégration future.

Complément au compte rendu : résume également le nombre d’entrées encore ouvertes dans `MASSODA_CONTENT_TODO.md`, sans recopier inutilement tout le registre.

Compte rendu attendu : fichiers créés/modifiés, données laissées en attente, validations et résultat visuel.
```

---

## Prompt 3 — Page « Ateliers & expériences » et FAQ

```text
Continue dans :
/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude

Objectif : remplacer le contenu actuel de src/pages/ateliers.astro par la nouvelle page « Ateliers & expériences », en réutilisant les données centralisées et les composants créés pour l’accueil.

Préserve les changements locaux existants, le base path /ateliersmassoda et l’identité visuelle mise en place. Ne modifie pas l’ancien projet Masoda_site. Ne committe pas et ne pousse pas.

Avant d’éditer, lis les instructions de /Users/ranyoalpha/Documents/Programmation/Site_Creator/AGENTS.md et /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/AGENTS.md, puis les fichiers brain/index.md, brain/brand.md, brain/pages.md, brain/copywriting.md et brain/seo.md sous /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/. Le contenu fourni dans ce prompt remplace les anciens textes correspondants.


Avant d’éditer, lis également `MASSODA_CONTENT_TODO.md` créé au Prompt 2. Considère-le comme la liste de suivi de référence des contenus manquants. Mets-le à jour au fil de cette phase : conserve les entrées non résolues, ajoute tout nouveau manque découvert et passe à `DONE` uniquement les éléments réellement fournis et intégrés.

1. Introduction de page

Titre h1 : « Ateliers & expériences ».

Texte :
« Les Ateliers Massoda créent des espaces de partage où les cultures afro-caribéennes se vivent à travers la créativité, le bien-être et l’art de vivre.

Ouverts à toutes et à tous, nos ateliers invitent à rencontrer des artistes, artisan·es et expert·es, à découvrir leurs savoirs et leurs pratiques, puis à les expérimenter à sa manière.

Chaque expérience est pensée en petit comité, avec un nombre de places limité et tout le matériel fourni, afin de profiter pleinement du moment.

Que l’on vienne seul·e ou accompagné·e, Massoda est avant tout un espace de rencontre, de transmission et de convivialité. »

2. Les trois prochains ateliers

Utilise exactement la même source de données que sur l’accueil. Ne duplique pas les dates, prix ou liens dans la page.

Descriptions éditoriales :
- Cookies au moringa : « On se réapproprie nos gourmandises préférées avec le moringa. Un atelier de pâtisserie sans gluten animé par une cake designer. »
- Confection de baya : « On sublime son corps avec Maeva, créatrice de bijoux holistiques, autour de la confection de baya. »
- Céramique : « On façonne un intérieur qui nous ressemble pour se sentir vraiment chez soi. »

Affiche date, heure, lieu et prix uniquement lorsqu’ils sont renseignés. Respecte le statut de chaque billetterie : vrai lien de réservation pour une billetterie ouverte ; message non cliquable avec la date d’ouverture pour une billetterie future. Aucun faux bouton, aucune URL Paint & Jam recyclée, aucune donnée inventée.


Si l’une de ces informations ou une image reste absente, conserve malgré tout la carte afin de valider la page complète : affiche un placeholder générique comme « Date à venir », « Prix à venir » ou « Visuel à venir », balisé avec l’identifiant correspondant, sans inventer de valeur. Réutilise exactement la même logique de placeholder et le même composant que sur l’accueil afin qu’un remplacement dans `src/data/workshops.ts` mette à jour les deux pages. Mets à jour `MASSODA_CONTENT_TODO.md` en conséquence.

3. Questions & réponses

Crée un composant FAQ réutilisable si cela simplifie la page. Utilise des éléments details/summary accessibles et conserve un focus visible.

Question : « Puis-je venir seul·e à un atelier ? »
Réponse : « Bien sûr. Beaucoup de participant·es viennent seul·es. Nos expériences sont pensées comme des espaces de partage et de rencontre, et nous veillons à créer une ambiance chaleureuse afin que chacun·e puisse se sentir à l’aise dès son arrivée. »

Question : « Puis-je venir accompagné·e ? »
Réponse : « Avec plaisir. Selon les ateliers, nous proposons ponctuellement des tarifs préférentiels pour venir à deux. Certaines expériences sont mixtes et d’autres peuvent être pensées pour un public particulier : toutes les informations sont précisées sur la page de l’atelier. »

Question : « Faut-il déjà savoir pratiquer l’activité ? »
Réponse : « Non. Nos ateliers sont conçus pour permettre à chacun·e de découvrir, d’expérimenter et d’apprendre à son rythme. Les artistes, artisan·es et expert·es accompagnent le groupe tout au long de l’expérience. »

Question : « Faut-il être issu·e de la communauté afrodescendante pour participer ? »
Réponse : « Non. Les Ateliers Massoda sont ouverts à toutes et à tous. Nos expériences mettent à l’honneur les cultures afro-caribéennes, leurs savoirs, leurs pratiques et leurs créateur·rices dans une démarche de découverte, de transmission et de partage. Il n’est donc pas nécessaire d’être afrodescendant·e pour participer : nous demandons simplement de venir avec curiosité, respect et envie d’apprendre. »

Question : « Le matériel est-il fourni ? »
Réponse : « Oui. Sauf indication contraire, tout le matériel nécessaire est inclus dans la réservation. Il ne reste plus qu’à venir profiter de l’expérience. »

Question : « Pourquoi le nombre de places est-il limité ? »
Réponse : « Nous privilégions les petits groupes afin de préserver une expérience intimiste, de faciliter les échanges avec l’intervenant·e et de permettre à chacun·e d’être accompagné·e dans de bonnes conditions. »

Question : « Où ont lieu les ateliers ? »
Réponse : « Les expériences Massoda sont organisées dans différents lieux sélectionnés en fonction de l’univers de chaque atelier. L’adresse exacte est indiquée sur la page de réservation et dans la confirmation. »

Question : « Comment être informé·e des prochains ateliers ? »
Réponse : « En rejoignant La Lettre de Massoda, il est possible de découvrir la prochaine programmation et de bénéficier d’un accès prioritaire aux billetteries avant leur ouverture au public. »

Question : « Les ateliers sont-ils uniquement créatifs ? »
Réponse : « Non. Massoda explore la culture afro-caribéenne à travers différents aspects de l’art de vivre et du bien-être : créativité, alimentation, soin de soi, estime de soi, décoration, artisanat et bien d’autres pratiques. Chaque expérience est une nouvelle manière de découvrir, d’expérimenter et de se réapproprier ces savoirs. »

4. CTA final

Ajoute un CTA final « Réserve ton atelier ». Il doit mener à une URL valide de billetterie si une offre réservable existe. Sinon, fais-le pointer vers la section des prochains ateliers ou remplace-le par un CTA « Découvrir les prochaines ouvertures » ; ne crée jamais de lien trompeur.

Retire les anciens ateliers et les anciennes réponses qui contredisent ce brief. La section de privatisation peut être déplacée vers /contact/ si elle surcharge cette page, mais ne supprime pas une fonctionnalité de contact utile.

Mets à jour le title, la description SEO et les textes alternatifs. Garde une composition mobile-first, une largeur de lecture confortable et une hiérarchie h1/h2/h3 correcte.

Respecte Raleway et l’augmentation globale de 2px définies au Prompt 1. Corrige la composition des cartes et de la FAQ si les textes plus grands provoquent des retours disgracieux, sans annuler silencieusement l’augmentation demandée.

Validation avant de terminer :
- npm run build ;
- git diff --check ;
- comparaison de la liste d’ateliers entre l’accueil et /ateliers/ ;
- test des états ouverte/bientôt disponible ;
- test clavier de chaque FAQ ;
- si un navigateur automatisé, Playwright ou un outil équivalent est disponible, effectue réellement l’inspection visuelle à environ 390px et 1440px et consigne les observations ou captures. Sinon, signale explicitement que cette validation visuelle n’a pas pu être automatisée et ne la déclare pas réussie ;
- absence de lien, image ou donnée factice.
- conserve des placeholders propres pour les éléments encore absents afin que la page reste entièrement testable visuellement, sans jamais les présenter comme réels ;
- vérifie la cohérence entre les placeholders de l’accueil et ceux de /ateliers/ ;
- mets à jour `MASSODA_CONTENT_TODO.md`, avec un chemin cible et une action de remplacement pour chaque entrée encore ouverte ;
- vérifie la correspondance entre chaque balise `data-massoda-placeholder` / `MASSODA_MISSING:` et une entrée du registre.

Complément au compte rendu : donne aussi le nombre d’entrées `MISSING`/`PLACEHOLDER` restant dans `MASSODA_CONTENT_TODO.md`.

Compte rendu attendu : fichiers modifiés, contenu retiré ou déplacé, validations et informations encore manquantes.
```

---

## Prompt 4 — La Lettre, cohérence des parcours et finition

```text
Termine la refonte dans :
/Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda-Claude

Objectif : finaliser le parcours « La Lettre », la navigation vers « Collaborer » et la cohérence globale du site après les trois phases précédentes.

Préserve les changements en cours. Ne travaille jamais dans /Users/ranyoalpha/Documents/Programmation/Masoda_site. Ne committe pas, ne pousse pas et ne déploie pas.

Lis d’abord les instructions de /Users/ranyoalpha/Documents/Programmation/Site_Creator/AGENTS.md et /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/AGENTS.md, puis les fichiers brain/index.md, brain/brand.md, brain/pages.md, brain/copywriting.md et brain/seo.md sous /Users/ranyoalpha/Documents/Programmation/Site_Creator/Masoda/.


Lis aussi `MASSODA_CONTENT_TODO.md` avant toute modification. Ce Prompt 4 constitue la dernière passe de consolidation du registre : vérifie chaque entrée, mets à jour les chemins effectivement retenus dans le projet, fusionne les doublons éventuels sans perdre d’information et ne ferme aucune entrée non réellement résolue.

La Lettre :
- URL d’inscription réelle : [URL_INSCRIPTION_LETTRE] ;
- si cette URL est fournie, crée src/pages/la-lettre.astro avec une page courte et premium qui explique l’accès anticipé aux billetteries, puis propose le CTA « Recevoir La Lettre » vers cette URL ;
- si le service fournit un formulaire intégrable et que son code officiel est fourni, intègre-le de manière accessible et respectueuse de la vie privée ;
- sans URL ou code officiel, ne fabrique pas de formulaire fonctionnel, ne collecte aucune adresse e-mail et ne prétends pas qu’une inscription a réussi. Dans ce cas, conserve seulement la section #la-lettre de l’accueil avec la mention « Inscriptions bientôt disponibles » et fais pointer le menu vers cette ancre.
- dans ce cas, conserve également `LETTER_SIGNUP_URL` comme entrée ouverte dans `MASSODA_CONTENT_TODO.md`, indique `src/data/site.ts` comme emplacement d’intégration de l’URL finale et balise l’état temporaire de la section sans créer de faux `href`.

Collaborer :
- le lien visible « Collaborer » doit pointer vers la page existante /contact/ ;
- vérifie que cette page présente clairement les collaborations, les ateliers privés et les demandes de lieux ou de marques ;
- ne réécris pas toute la page si son contenu actuel remplit déjà ce rôle ; fais uniquement les ajustements nécessaires pour que le titre, le premier paragraphe et l’action principale correspondent au libellé Collaborer ;
- préserve le fonctionnement du formulaire Web3Forms et ses mentions de confidentialité. Ne modifie aucune clé ou destination sans donnée fournie.

Cohérence globale :
- synchronise Header.astro et Footer.astro ;
- vérifie que Boutique et Journal restent accessibles depuis le footer ou d’autres liens secondaires, même s’ils ne sont plus dans la navigation principale ;
- vérifie que toutes les URLs internes passent par src/utils/nav.ts ou un mécanisme compatible avec le base path /ateliersmassoda ;
- centralise tous les liens externes répétés ;
- mets à jour les métadonnées de la page La Lettre si elle existe ;
- ne change ni astro.config.mjs ni le workflow GitHub Pages sauf si un problème réel et démontré l’exige.
- consolide tous les contenus manquants dans `MASSODA_CONTENT_TODO.md` : aucun manque connu ne doit rester uniquement dans un commentaire, un compte rendu ou la mémoire de la session ;
- pour chaque asset manquant, confirme le chemin final recommandé ; pour chaque donnée manquante, confirme la source de données à modifier ; pour chaque URL manquante, confirme le champ exact à renseigner ;
- le site doit rester buildable et visuellement cohérent avec les placeholders, mais le registre doit permettre de distinguer immédiatement ce qui est réellement final de ce qui ne l’est pas.

Contrôle final obligatoire :
- npm run build ;
- git diff --check ;
- démarrage local et inspection des routes /ateliersmassoda/, /ateliersmassoda/ateliers/, /ateliersmassoda/a-propos/, /ateliersmassoda/contact/ et, si créée, /ateliersmassoda/la-lettre/ ;
- aucune erreur console importante ;
- aucun lien interne cassé, aucune image absente, aucun CTA vide ;
- si un navigateur automatisé, Playwright ou un outil équivalent est disponible, contrôle réellement l’affichage à environ 320px, 390px, 768px et 1440px et consigne les observations ou captures. Sinon, signale explicitement que la validation visuelle n’a pas pu être automatisée, ne la déclare pas réussie et liste les contrôles manuels restant à effectuer ;
- Raleway est effectivement appliquée aux titres et au texte courant, avec les graisses attendues et sans chargement inutile de l’ancienne paire de polices ;
- les tokens typographiques ont chacun augmenté de 2px par rapport à l’état initial et le rendu ne présente ni chevauchement, ni débordement, ni coupure, ni retour à la ligne manifestement déséquilibré ;
- le logo affiché provient de public/brand/nouveau_logo.png ou de sa copie optimisée sans marges transparentes, et aucune référence active ne pointe vers dist/images/about/nouveau_logo.png ;
- la page À propos affiche public/images/about/photo-fondatrice.jpg avec un cadrage correct à toutes les largeurs, et aucune référence active ne pointe vers dist/images/about/Photo de la fondatrice.jpg ;
- la palette finale est la seule variante conservée dans le code et respecte les contrastes requis ;
- navigation clavier, focus visible, menu mobile, contrastes, textes alternatifs et ordre des titres ;
- premier écran clair, CTA principal visible et absence de débordement horizontal ;
- contenu français cohérent, sans donnée inventée ni promesse thérapeutique.
- audite tous les attributs `data-massoda-placeholder`, commentaires `MASSODA_MISSING:` et états `contentStatus: "placeholder"` : chacun doit correspondre à une entrée encore ouverte de `MASSODA_CONTENT_TODO.md` ;
- vérifie qu’aucune entrée ouverte du registre n’est oubliée du rendu ou du plan d’intégration ;
- chaque ligne encore ouverte du registre doit indiquer un chemin/emplacement final concret et une procédure de remplacement suffisamment précise pour être exécutée ultérieurement sans nouvelle analyse globale du projet.

Corrige directement tout problème local détecté pendant ces contrôles, puis relance les validations concernées. Ne considère le travail terminé que lorsque le build réussit.

Compte rendu final attendu :
1. résumé du résultat visible ;
2. liste des fichiers modifiés ;
3. commandes et contrôles exécutés avec leurs résultats ;
4. données ou assets encore nécessaires ;
5. confirmation explicite qu’aucun commit, push ou déploiement n’a été effectué.


Complément au compte rendu final :
- donne l’état de `MASSODA_CONTENT_TODO.md` : nombre total d’entrées, nombre `DONE`, nombre encore ouvertes ;
- confirme que chaque entrée ouverte possède un chemin cible et une instruction d’intégration ;
- confirme que `MASSODA_CONTENT_TODO.md` est exploitable comme checklist autonome de finalisation : une personne qui ne relit pas les quatre prompts doit pouvoir comprendre exactement quoi fournir et où l’intégrer.
```

## Ordre recommandé

1. Compléter les informations connues dans les crochets.
2. Exécuter le Prompt 1.
3. Contrôler rapidement le rendu de l’identité avant de poursuivre.
4. Exécuter les Prompts 2 et 3.
5. Exécuter le Prompt 4 comme passe finale de cohérence et de validation.
6. Ouvrir `MASSODA_CONTENT_TODO.md` après le Prompt 4 et utiliser cette checklist comme source unique pour réunir puis intégrer les derniers contenus réels.
