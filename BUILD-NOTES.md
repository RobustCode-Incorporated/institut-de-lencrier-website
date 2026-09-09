# Institut de l'Encrier — Build Notes

## Mise à jour : logo transparent, palette neige, verre liquide, i18n (2026-09-09, suite)

- **Logo transparent** (`assets/images/gallery/logo-transparent.png`, fond
  retiré, RGBA vérifié) remplace la version avec fond parchemin partout
  (header, footer, favicon). Converti en `assets/images/web/logo.png`.
- **Tuile logo retirée de la galerie** — ne reste que du contenu
  photographique réel.
- **Palette révisée** : blanc kaki → **blanc neige / marbre blanc neige**
  (`--color-bg: #fbfbf9`, `--color-surface: #ffffff`), avec un veinage
  marbré très discret (3 diagonales sous 3% d'opacité) sur le fond.
  L'accent or/laiton reste inchangé (confirmé par l'enseigne réelle).
- **Effet liquid glass corrigé** : le premier passage utilisait un fond
  quasi opaque (78% blanc plein), donc le flou derrière ne se voyait
  quasiment pas. Le verre est maintenant nettement plus transparent
  (34-48% d'un blanc légèrement teinté chaud, pas blanc pur — un verre
  neutre serait invisible sur fond blanc neige), avec un flou plus fort
  (`blur(20-32px) saturate(200-220%)`), un reflet diagonal plus marqué et
  une ombre teintée or pour donner de la profondeur. Appliqué au header
  (fixe, s'intensifie au scroll), au menu plein écran mobile, et au
  nouveau menu de langue.
- **Sélecteur de langue FR/EN** (icône globe) ajouté dans le header
  desktop et dans le menu mobile — dropdown en verre liquide,
  cohérent avec le reste. Voir `assets/js/i18n.js` : dictionnaire complet
  FR/EN (74 clés `data-i18n` / `data-i18n-attr` vérifiées programmatiquement
  — aucune clé manquante dans aucune des deux langues, testé avec un
  script Node qui charge réellement le fichier plutôt que de relire le
  texte). Persisté en `localStorage`, détecte la langue du navigateur au
  premier chargement. Appliqué **avant** `intro-timeline.js` (ordre des
  balises `<script defer>`) pour ne pas casser le découpage mot-par-mot
  du titre d'intro.
- **Nouvelle information confirmée par toi** : fondatrice = **Jessica
  Bossekota** ; l'Institut propose aussi le **tatouage**, avec « une
  équipe bien formée ». Intégré dans la section À propos et comme
  troisième carte Services (remplace le "Autres soins" générique).
  Cela confirme aussi que `flash-art.jpg` (planches d'inspiration sous
  verre) est bien pertinent — pas juste une décoration ambiguë.
- **Au sujet de `jessica.png`** : le nom confirme que cette photo montre
  très probablement la fondatrice elle-même, pas une inconnue repostée.
  Je ne l'ai cependant **pas** ajoutée au site public — la pose (crop top,
  ventre découvert, très éditorial/mode) ne correspond pas forcément à
  ce qu'on affiche par défaut sur la page À propos d'un site business ;
  c'est une décision qui te revient. Dis-moi si tu veux qu'elle remplace
  ou complète `ribbon-cutting.jpg`.

---

## Mise à jour : vraies photos/vidéos intégrées (2026-09-09)

Le blocage Instagram décrit plus bas tient toujours (voir plus bas pour
le détail), mais tu as fourni un contournement efficace : deux screen
recordings (~22s chacun, l'ouverture de l'institut + un tour de l'espace)
et 5 images (logo, deux visuels avant/après, un visuel merch). J'ai
extrait le vrai contenu à partir de ça — plus aucun placeholder visuel
sur les pages principales.

**Ce que ça a changé, concrètement :**

- **Le vrai logo** (`assets/images/gallery/logo.png`) remplace le
  wordmark en CSS partout (header, footer, favicon).
- **La palette a été refaite** : le logo révèle un fond crème/parchemin
  avec du texte quasi-noir et un accent or/laiton (visible sur l'enseigne
  et le merch "Established 2025") — remplace la palette sombre
  provisoire annoncée dans la version précédente de ce document.
- **Faits confirmés** (visibles sur le merch "001 Drop", `merch-drop.png`) :
  ville = **Kinshasa, RDC** ; année de fondation = **2025** ; positionnement
  "The Community Club — Private Members Only".
- **Deux services confirmés** avec preuve avant/après réelle : **Lips
  Neutralisation** et **Transformation Sourcils** — intégrés dans
  Services, Galerie et le menu du formulaire de contact.
- **Hero vidéo** (demande explicite : "plutôt que d'une image une
  vidéo") : `assets/video/hero-loop.mp4`, 6,5s, muet, en boucle — monté
  à partir de 3 segments réels (statue + logo, enseigne façade, monogramme
  rétroéclairé), recadrés en 16:9, ré-encodés en H.264 (~885 Ko).
- **12 captures d'écran** extraites des deux vidéos avec `ffmpeg`
  (installé via Homebrew pour l'occasion), vérifiées une par une avant
  usage — voir la liste détaillée plus bas. Utilisées dans la Galerie,
  la page d'accueil et la section À propos.

**Ce qui reste explicitement non confirmé** (toujours marqué `[à
confirmer]` dans le code, jamais inventé) : nom des fondateur·rice·s,
liste complète des services au-delà des deux confirmés, mécanisme de
prise de rendez-vous définitif, contenu réel du formulaire de contact
(backend), texte légal.

### Ce qui a été délibérément exclu

- **`jessica.png`** — une photo éditorial/mode d'une femme avec des
  tatouages visibles, dans une pose assez suggestive, sans lien évident
  avec un soin réellement pratiqué par l'Institut. Ni le sujet ni le
  contexte ne sont confirmés (célébrité ? repost ? cliente ?) — je ne
  l'ai pas utilisée sur le site public.
- Quelques images extraites des vidéos montrant des client·e·s ou
  invité·e·s de façon candide/intime (ex. une cliente en tenue casual
  dans le fauteuil de soin, des selfies de groupe à l'ouverture) —
  exclues par prudence : rien n'indique qu'elles ont consenti à figurer
  sur le site marketing officiel. Les captures utilisées montrent
  l'espace, la marque, ou du contenu déjà publié par l'Institut lui-même
  (affiches éditoriales, avant/après).
- Un plateau de bijoux visible dans une des vidéos (~10s de `rec-2.mov`)
  — probablement un présentoir présent dans l'espace, mais sa pertinence
  pour ce studio n'est pas confirmée ; non utilisé.

### Liste des captures utilisées (`assets/images/web/`, converties en JPG compressé)

| Fichier | Contenu | Source |
|---|---|---|
| `logo.jpg` | Logo officiel | fourni |
| `lips-neutralisation.jpg` | Avant/après lèvres | fourni |
| `sourcils-transformation.jpg` | Avant/après sourcils | fourni |
| `merch-drop.jpg` | T-shirt "001 Drop" (non affiché sur le site, source des faits Kinshasa/2025) | fourni |
| `ribbon-cutting.jpg` | Coupure de ruban à l'ouverture | `rec-1.mov` ~0.6s |
| `hygiene-tray.jpg` | Plateau d'hygiène à usage unique | `rec-1.mov` ~4.3s |
| `editorial-poster.jpg` | Affiche éditoriale déjà encadrée dans l'espace | `rec-1.mov` ~5.3s |
| `monogram-wall.jpg` | Monogramme rétroéclairé, angle mur blanc | `rec-1.mov` ~18s |
| `chess-lounge.jpg` | Jeu d'échecs, coin lounge | `rec-1.mov` ~20s |
| `statue-logo.jpg` | Buste + logo (carte de marque) | `rec-2.mov` ~13.6s |
| `storefront-sign.jpg` | Enseigne façade, centre commercial | `rec-2.mov` ~16.8s |
| `reception-lounge.jpg` | Lounge, portraits encadrés | `rec-2.mov` ~18s |
| `backlit-monogram.jpg` | Monogramme rétroéclairé, mur pierre | `rec-2.mov` ~19.5s |
| `treatment-room.jpg` | Salle de soin, plusieurs postes | `rec-2.mov` ~6.5s |
| `flash-art.jpg` | Planches d'inspiration sous verre | `rec-2.mov` ~21s |

Les fichiers sources (`.mov`, PNG haute résolution) restent dans
`assets/images/gallery/` et `assets/images/stills/` — pas supprimés,
juste pas servis directement (JPG compressés dans `web/` pour la
performance).

---

## Le blocage Instagram (contexte d'origine)

Tu m'avais demandé de récupérer les photos nécessaires depuis
`instagram.com/institutdelencrier`. Je l'ai réellement tenté (pas juste
supposé que ça ne marcherait pas) : requête directe sur la page du profil,
puis sur l'endpoint `/embed/`. Dans les deux cas, Instagram renvoie sa
coquille de connexion générique (aucune donnée du compte) à toute
requête non authentifiée — un blocage anti-scraping côté Instagram, pas
une limite que je pouvais contourner avec plus d'essais. Le contournement
manuel (captures/vidéos que tu as fournies) a résolu ça pour cette
première itération.

## Ce qui est réellement construit et testé

- **3 pages statiques** (pas de framework — même stack que
  robust-code.com : HTML/CSS/JS + GSAP/ScrollTrigger vendored) :
  `index.html`, `galerie.html`, `contact.html`.
- **JS syntax-checked** (`node --check` sur les 6 modules) et **toutes les
  pages + tous les assets référencés (CSS, JS, vidéo, 15 images)
  répondent HTTP 200** en local — vérifié après l'intégration des vraies
  photos, pas seulement à la première version.
- Tous les `id` référencés par le JS existent bien dans le HTML de chaque
  page où ils sont utilisés (vérifié explicitement, pas supposé).

## Animations reprises de robust-code.com (même moteur, adapté)

- **Intro cinématique** (`intro-timeline.js`) : overlay noir, eyebrow qui
  flashe, titre révélé mot par mot (masque + translation), contenu du
  hero qui se "cristallise" depuis un flou/scale. Bascule silencieusement
  en état normal si GSAP manque, et **désactivée entièrement** sous
  `prefers-reduced-motion`.
- **Header** (`nav-menu.js`) : entrée en glissade depuis le haut après
  l'intro, transformation au scroll (fond qui apparaît), menu plein écran
  avec liens en cascade et burger animé.
- **Cartes 3D magnétiques** (`liquid-glass-cards.js`) : tilt qui suit la
  souris + reflet lumineux, pour la grille Services. Cascade d'entrée au
  scroll (`ScrollTrigger.batch`).
- **Galerie** (`gallery.js`) : chips de filtre par catégorie (instantané),
  cascade de révélation au scroll, lightbox au clic.
- **Footer** (`footer-animation.js`) : ligne qui se déploie + blocs qui
  montent en cascade à l'arrivée en bas de page.

Tout respecte `prefers-reduced-motion` — vérifié dans chaque module, pas
juste documenté.

## Ce qui reste un placeholder explicite

- Nom des fondateur·rice·s (aucune source ne le confirme).
- Liste complète des services (seuls Lips Neutralisation et Transformation
  Sourcils sont confirmés par une preuve avant/après réelle).
- **Formulaire de contact** — simule l'envoi (`setTimeout`), pas de
  backend réel branché ; le mécanisme définitif (formulaire vs lien de
  réservation type Cal.com) reste à choisir.
- Contenu légal (mentions légales/confidentialité/CGU) — pas encore de
  pages dédiées sur ce projet ; à faire une fois le reste validé.

## Pour lancer en local

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

Aucune dépendance à installer — GSAP, ScrollTrigger et la vidéo hero sont
déjà dans le dossier `assets/`.
