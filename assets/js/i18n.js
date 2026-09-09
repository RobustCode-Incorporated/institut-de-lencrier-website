/* Bilingual FR/EN content switch, same pattern as robust-code.com's
   i18n.js: data-i18n / data-i18n-attr on elements, a lang-switch dropdown
   (data-lang-toggle buttons) wired up in nav-menu.js's initLangSwitcher.
   Applied SYNCHRONOUSLY at top level (not on DOMContentLoaded) so it runs
   before intro-timeline.js splits #intro-title into word-mask spans —
   translating after that split would wipe the per-word reveal markup. */
(function () {
  var STORAGE_KEY = "ide-lang";
  var SUPPORTED_LANGS = ["fr", "en"];
  var DEFAULT_LANG = "fr";

  var translations = {
    fr: {
      nav: { services: "Services", gallery: "Galerie", about: "À propos", contact: "Contact" },
      menu: { home: "Accueil", footerLocation: "Institut de l'Encrier — Kinshasa, RDC" },
      intro: { eyebrow: "Institut de l'Encrier", title: "L'encre a une histoire" },
      hero: {
        eyebrow: "Institut de l'Encrier",
        title: "L'encre a une histoire.",
        lede: "Un institut de beauté permanente et de tatouage à Kinshasa — sourcils, lèvres, et l'attention portée à chaque détail.",
        ctaPrimary: "Prendre rendez-vous",
        ctaSecondary: "Voir la galerie",
      },
      services: {
        eyebrow: "Ce que nous proposons",
        title: "Trois soins confirmés — d'autres à préciser avec l'atelier.",
        c1Title: "Lips Neutralisation",
        c1Body: "Neutraliser la pigmentation naturelle des lèvres avant une mise en couleur.",
        c2Title: "Transformation Sourcils",
        c2Body: "Redessiner et densifier le sourcil, résultat visible avant/après.",
        c3Title: "Tatouage",
        c3Body: "Une équipe bien formée, pour des projets de tatouage sur rendez-vous.",
      },
      galleryPreview: {
        eyebrow: "Galerie",
        title: "Un aperçu du travail et de l'espace.",
        tile1: "Lips neutralisation",
        tile2: "Sourcils",
        tile3: "L'espace",
        cta: "Voir la galerie complète →",
      },
      about: {
        eyebrow: "À propos",
        title: "L'histoire de l'Institut de l'Encrier.",
        p1: "Fondé en 2025 à Kinshasa par Jessica Bossekota, l'Institut de l'Encrier se présente comme un « community club » plutôt qu'un simple salon — un lieu pensé pour l'attention portée à chaque détail.",
        p2: "Aux soins de beauté permanente s'ajoute le tatouage, assuré par une équipe bien formée.",
        imgAlt: "Inauguration de l'Institut de l'Encrier",
      },
      ctaBand: {
        eyebrow: "Rendez-vous",
        title: "Prêt·e à en discuter ?",
        body: "Un premier échange pour parler de votre projet, avant toute séance.",
        button: "Nous contacter",
      },
      footer: {
        navHeading: "Navigation",
        followHeading: "Suivez-nous",
        city: "Kinshasa, RDC",
        statusNote: "Site en construction — contenu à finaliser avec le client.",
      },
      galleryPage: {
        eyebrow: "Galerie",
        title: "Le travail et l'espace.",
        intro: "Photos tirées du compte Instagram et de vidéos de l'ouverture de l'Institut.",
        filterAll: "Tout",
        filterAvantApres: "Avant / Après",
        filterEspace: "L'espace",
        filterMarque: "La marque",
        tLips: "Lips neutralisation",
        tSourcils: "Sourcils",
        tTreatmentRoom: "Salle de soin",
        tLounge: "Lounge",
        tHygiene: "Hygiène",
        tChess: "Coin lounge",
        tFacade: "Façade",
        tMonogram: "Monogramme",
        tIdentity: "Identité",
        tEditorial: "Éditorial",
        tInspiration: "Inspiration",
      },
      contactPage: {
        eyebrow: "Contact",
        title: "Parlons de votre projet.",
        lede: "Un premier échange pour parler de votre projet — sans engagement.",
        labelName: "Nom",
        labelEmail: "E-mail",
        labelSoin: "Soin souhaité",
        soinPlaceholder: "À préciser",
        soinLips: "Lips neutralisation",
        soinSourcils: "Transformation sourcils",
        soinTattoo: "Tatouage",
        soinAutre: "Autre",
        labelMessage: "Message",
        submit: "Envoyer",
        statusSending: "Envoi...",
        statusSuccess: "Message envoyé. Nous revenons vers vous rapidement.",
      },
      aria: { toggleMenu: "Menu", changeLanguage: "Changer de langue", instagram: "Instagram" },
    },
    en: {
      nav: { services: "Services", gallery: "Gallery", about: "About", contact: "Contact" },
      menu: { home: "Home", footerLocation: "Institut de l'Encrier — Kinshasa, DRC" },
      intro: { eyebrow: "Institut de l'Encrier", title: "Ink has a history" },
      hero: {
        eyebrow: "Institut de l'Encrier",
        title: "Ink has a history.",
        lede: "A permanent-makeup and tattoo studio in Kinshasa — brows, lips, and attention to every detail.",
        ctaPrimary: "Book an appointment",
        ctaSecondary: "View the gallery",
      },
      services: {
        eyebrow: "What we offer",
        title: "Three confirmed treatments — more to confirm with the studio.",
        c1Title: "Lips Neutralisation",
        c1Body: "Neutralising the lips' natural pigmentation before a color treatment.",
        c2Title: "Brow Transformation",
        c2Body: "Redesigning and filling in the brow, with a visible before/after result.",
        c3Title: "Tattoo",
        c3Body: "A well-trained team, for tattoo projects by appointment.",
      },
      galleryPreview: {
        eyebrow: "Gallery",
        title: "A look at the work and the space.",
        tile1: "Lips neutralisation",
        tile2: "Brows",
        tile3: "The space",
        cta: "View the full gallery →",
      },
      about: {
        eyebrow: "About",
        title: "The story of Institut de l'Encrier.",
        p1: "Founded in 2025 in Kinshasa by Jessica Bossekota, Institut de l'Encrier presents itself as a “community club” rather than a simple studio — a place built around attention to every detail.",
        p2: "Alongside permanent makeup, the studio also offers tattooing, carried out by a well-trained team.",
        imgAlt: "Institut de l'Encrier's opening",
      },
      ctaBand: {
        eyebrow: "Book",
        title: "Ready to talk about it?",
        body: "A first conversation about your project, before any session.",
        button: "Get in touch",
      },
      footer: {
        navHeading: "Navigation",
        followHeading: "Follow us",
        city: "Kinshasa, DRC",
        statusNote: "Site under construction — content to be finalised with the client.",
      },
      galleryPage: {
        eyebrow: "Gallery",
        title: "The work and the space.",
        intro: "Photos taken from the Instagram account and from videos of the Institute's opening.",
        filterAll: "All",
        filterAvantApres: "Before / After",
        filterEspace: "The space",
        filterMarque: "The brand",
        tLips: "Lips neutralisation",
        tSourcils: "Brows",
        tTreatmentRoom: "Treatment room",
        tLounge: "Lounge",
        tHygiene: "Hygiene",
        tChess: "Lounge corner",
        tFacade: "Storefront",
        tMonogram: "Monogram",
        tIdentity: "Identity",
        tEditorial: "Editorial",
        tInspiration: "Inspiration",
      },
      contactPage: {
        eyebrow: "Contact",
        title: "Let's talk about your project.",
        lede: "A first conversation about your project — no commitment.",
        labelName: "Name",
        labelEmail: "Email",
        labelSoin: "Treatment",
        soinPlaceholder: "To specify",
        soinLips: "Lips neutralisation",
        soinSourcils: "Brow transformation",
        soinTattoo: "Tattoo",
        soinAutre: "Other",
        labelMessage: "Message",
        submit: "Send",
        statusSending: "Sending...",
        statusSuccess: "Message sent. We'll get back to you shortly.",
      },
      aria: { toggleMenu: "Menu", changeLanguage: "Change language", instagram: "Instagram" },
    },
  };

  function getNested(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function detectLang() {
    var stored = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;

    var browserLang = ((navigator.language || "").slice(0, 2) || "").toLowerCase();
    if (SUPPORTED_LANGS.indexOf(browserLang) !== -1) return browserLang;

    return DEFAULT_LANG;
  }

  var currentLang = DEFAULT_LANG;

  function applyTranslations(lang) {
    currentLang = lang;
    var dict = translations[lang] || translations[DEFAULT_LANG];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = getNested(dict, el.getAttribute("data-i18n"));
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach(function (pair) {
          var parts = pair.split(":");
          var attr = parts[0] && parts[0].trim();
          var key = parts[1] && parts[1].trim();
          var value = getNested(dict, key);
          if (attr && typeof value === "string") el.setAttribute(attr, value);
        });
    });

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll(".lang-current").forEach(function (el) {
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-toggle") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    if (window.localStorage) window.localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  function initLanguageButtons() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-toggle"));
      });
    });
  }

  // Small API for other modules (e.g. contact.html's submit handler) that
  // need a translated string outside of the declarative data-i18n pass.
  window.ideI18n = {
    t: function (key) {
      var dict = translations[currentLang] || translations[DEFAULT_LANG];
      var value = getNested(dict, key);
      return typeof value === "string" ? value : key;
    },
    getLang: function () {
      return currentLang;
    },
  };

  // Runs synchronously as soon as this deferred script executes (the DOM
  // is already fully parsed by then) — deliberately not deferred to
  // DOMContentLoaded, so translated text is in place before
  // intro-timeline.js reads #intro-title and splits it into word-masks.
  applyTranslations(detectLang());
  initLanguageButtons();
})();
