// Multilingual Support System for AI Portfolio

class I18n {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || this.detectLanguage();
    this.translations = {};
    this.fallbackLanguage = 'es';
    this.init();
  }

  // Language detection and storage
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    return ['en', 'es'].includes(langCode) ? langCode : 'es';
  }

  getStoredLanguage() {
    return localStorage.getItem('ai-portfolio-language');
  }

  setStoredLanguage(language) {
    localStorage.setItem('ai-portfolio-language', language);
  }

  // Translation data
  getTranslations() {
    return {
      en: {
        // Meta tags
        meta: {
          title: "AI Projects Portfolio",
          description: "A showcase of AI applications and projects"
        },

        // Navigation
        nav: {
          logo: "AI Portfolio",
          home: "Home",
          about: "About",
          projects: "Projects"
        },

        // Hero section
        hero: {
          badge: "Builder • Experimenter • Top 10 Woman in Tech 🇨🇴",
          title: "thexperiment",
          subtitle: "You bring the AI idea. We build it live. Fast, messy, version 1 forever.",
          tagline: "No perfection. Fail fast. Just ship it.",
          cta_primary: "JOIN THE EXPERIMENT",
          cta_primary_time: "🇨🇴🇵🇪 6PM • 🇲🇽 5PM",
          cta_secondary: "SEE PAST BUILDS",
          github: "GitHub Profile"
        },

        // BuildLab section
        buildlab: {
          title: "Join the Next Build",
          subtitle: "Watch live AI MVP builds. Debug in real time. Get inspired to ship your own.",
          cta: "JOIN NEXT SESSION"
        },

        // About section
        about: {
          title: "The Builder's Mindset",
          subtitle: "Speed + resourcefulness over perfection",
          manifesto: "From PDFs to delivery routes to stock analysis — I build functional AI experiments fast. 18 total hours for 3 working applications. Each project proves I can take audience problems, debug real-world constraints, and ship solutions that work. Not tutorials. Not theory. Just working code that solves actual problems.",
          stats: {
            experiments: "Experiments",
            possibilities: "Possibilities",
            mission: "Mission"
          }
        },

        // Projects section
        projects: {
          title: "Built from Your Ideas",
          subtitle: "These were built from real audience ideas. Perhaps yours is next.",
          filter: {
            all: "All Projects",
            ml: "Machine Learning",
            nlp: "NLP",
            cv: "Computer Vision",
            webapp: "Web Apps"
          },
          status: {
            completed: "Completed",
            inProgress: "In Progress",
            archived: "Archived"
          },
          links: {
            code: "View Code",
            demo: "Live Demo",
            details: "Learn More"
          }
        },

        // Contact section
        contact: {
          title: "Let's Build Together",
          subtitle: "The AI era doesn't reward perfection. It rewards speed, experimentation, and the courage to fail publicly. Stop planning. Start building.",
          cta_button: "JOIN NEXT SESSION"
        },

        // Footer
        footer: {
          text: "thexperiment — Building AI solutions in public",
          rights: "All rights reserved."
        }
      },

      es: {
        // Meta tags
        meta: {
          title: "Portfolio de Proyectos de IA",
          description: "Una muestra de aplicaciones y proyectos de inteligencia artificial"
        },

        // Navigation
        nav: {
          logo: "Portfolio IA",
          home: "Inicio",
          about: "Acerca",
          projects: "Proyectos"
        },

        // Hero section
        hero: {
          badge: "Constructora • Experimentadora • Top 10 Mujer en Tech 🇨🇴",
          title: "thexperiment",
          subtitle: "Tú traes la idea de IA. La construimos en vivo. Rápido, imperfecto, versión 1 para siempre.",
          tagline: "Sin perfección. Sin miedo a fallar. Solo lánzalo.",
          cta_primary: "ÚNETE AL EXPERIMENTO",
          cta_primary_time: "🇨🇴🇵🇪 6PM • 🇲🇽 5PM",
          cta_secondary: "VER CONSTRUCCIONES ANTERIORES",
          github: "Perfil de GitHub"
        },

        // BuildLab section
        buildlab: {
          title: "Únete a la Próxima Construcción",
          subtitle: "Observa construcciones de MVP de IA en vivo. Debuggea en tiempo real. Inspírate para lanzar el tuyo.",
          cta: "ÚNETE A LA SIGUIENTE SESIÓN"
        },

        // About section
        about: {
          title: "Mentalidad de Constructora",
          subtitle: "Velocidad + ingenio sobre perfección",
          manifesto: "De PDFs a rutas de entrega a análisis de acciones — construyo experimentos de IA funcionales rápido. 18 horas totales para 3 aplicaciones funcionales. Cada proyecto demuestra que puedo tomar problemas de la audiencia, debuggear restricciones del mundo real, y lanzar soluciones que funcionan. No tutoriales. No teoría. Solo código funcional que resuelve problemas reales.",
          stats: {
            experiments: "Experimentos",
            possibilities: "Posibilidades",
            mission: "Misión"
          }
        },

        // Projects section
        projects: {
          title: "Construidas desde Tus Ideas",
          subtitle: "Estas fueron construidas desde ideas reales de la audiencia. Quizás la tuya sea la siguiente.",
          filter: {
            all: "Todos los Proyectos",
            ml: "Machine Learning",
            nlp: "PLN",
            cv: "Visión Computacional",
            webapp: "Apps Web"
          },
          status: {
            completed: "Completado",
            inProgress: "En Progreso",
            archived: "Archivado"
          },
          links: {
            code: "Ver Código",
            demo: "Demo en Vivo",
            details: "Más Información"
          }
        },

        // Contact section
        contact: {
          title: "Construyamos Juntos",
          subtitle: "La era de IA no recompensa la perfección. Recompensa la velocidad, la experimentación y el valor de fallar públicamente. Deja de planear. Empieza a construir.",
          cta_button: "ÚNETE A LA SIGUIENTE SESIÓN"
        },

        // Footer
        footer: {
          text: "thexperiment — Construyendo soluciones de IA en público",
          rights: "Todos los derechos reservados."
        }
      }
    };
  }

  // Initialize the i18n system
  async init() {
    this.translations = this.getTranslations();
    await this.loadLanguage(this.currentLanguage);
    this.setupEventListeners();
  }

  // Load and apply language
  async loadLanguage(language) {
    if (!this.translations[language]) {
      console.warn(`Language ${language} not found, falling back to ${this.fallbackLanguage}`);
      language = this.fallbackLanguage;
    }

    this.currentLanguage = language;
    this.setStoredLanguage(language);
    this.updateUI();
    this.translatePage();
    this.updateHTMLLang();
  }

  // Update UI elements
  updateUI() {
    // Update language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
    });
  }

  // Translate all elements with data-i18n attribute
  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);

      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else if (element.hasAttribute('placeholder')) {
          element.placeholder = translation;
        } else if (element.hasAttribute('content') && element.tagName === 'META') {
          element.content = translation;
        } else if (element.hasAttribute('title')) {
          element.title = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update document title
    const titleTranslation = this.getTranslation('meta.title');
    if (titleTranslation) {
      document.title = titleTranslation;
    }
  }

  // Get nested translation using dot notation
  getTranslation(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to default language
        translation = this.translations[this.fallbackLanguage];
        for (const fallbackKey of keys) {
          if (translation && typeof translation === 'object' && fallbackKey in translation) {
            translation = translation[fallbackKey];
          } else {
            return null;
          }
        }
        break;
      }
    }

    return typeof translation === 'string' ? translation : null;
  }

  // Update HTML lang attribute
  updateHTMLLang() {
    document.documentElement.lang = this.currentLanguage;
  }

  // Setup event listeners
  setupEventListeners() {
    // Language button listeners
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newLanguage = btn.dataset.lang;
        if (newLanguage !== this.currentLanguage) {
          // Update aria-pressed states
          langButtons.forEach(b => {
            b.setAttribute('aria-pressed', b.dataset.lang === newLanguage ? 'true' : 'false');
          });
          this.loadLanguage(newLanguage);
        }
      });
    });
  }

  // Public methods for external use
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  t(key) {
    return this.getTranslation(key) || key;
  }

  // Add new translations dynamically
  addTranslations(language, translations) {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }
    this.translations[language] = { ...this.translations[language], ...translations };
  }
}

// Initialize i18n system
let i18n;

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', () => {
  i18n = new I18n();
});

// Export for use in other scripts
window.i18n = i18n;