# Institut de l'Encrier — Website

Site statique (HTML/CSS/JS + GSAP/ScrollTrigger), construit avec le même
moteur d'animation que robust-code.com : intro cinématique, header
scroll-morph, cartes 3D magnétiques, galerie filtrable avec lightbox,
footer en cascade.

**Lire `BUILD-NOTES.md` en premier.** Le scraping automatique
d'Instagram est bloqué côté Instagram (vérifié, pas supposé) — mais de
vraies photos et vidéos ont depuis été fournies manuellement et
intégrées : vrai logo, palette réelle (crème/encre/or), vidéo hero,
et 12 photos réelles dans la galerie (avant/après confirmés : Lips
Neutralisation, Transformation Sourcils). Ce qui reste `[à confirmer]`
(noms des fondateur·rice·s, liste complète des services, mécanisme de
rendez-vous) est détaillé dans `BUILD-NOTES.md`.

## Lancer en local

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Structure

```
index.html       Accueil (intro, hero, services, aperçu galerie, à propos, CTA)
galerie.html     Galerie complète (filtres + lightbox)
contact.html     Formulaire de contact (simulé, backend à brancher)
assets/css/      Design tokens + styles (palette crème/encre/or)
assets/js/       Modules d'animation (voir BUILD-NOTES.md)
assets/video/    Vidéo hero (hero-loop.mp4, montée à partir du matériel fourni)
assets/images/web/      Photos réelles utilisées sur le site (JPG compressés)
assets/images/gallery/  Fichiers sources fournis (.mov, PNG haute résolution)
assets/images/stills/   Captures extraites des vidéos, avant compression
```

Ce dossier est autonome — déplaçable hors de `jarvis-main` sans rien
casser (pas de dépendance npm, tout est vendored).
