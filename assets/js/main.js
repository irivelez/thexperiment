// Main JavaScript for AI Portfolio
// Modern, performant implementation with smooth animations

class PortfolioApp {
  constructor() {
    this.projects = [];
    this.currentFilter = 'all';
    this.isLoading = true;
    this.observers = new Map();

    this.init();
  }

  async init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  async setup() {
    try {
      // Show loading spinner
      this.showLoadingSpinner();

      // Initialize components
      this.setupNavigation();
      this.setupSmoothScrolling();
      this.setupIntersectionObservers();
      // No filtering needed for simplified design

      // Load project data
      await this.loadProjects();

      // Initialize animations
      this.initializeAnimations();

      // Hide loading spinner
      setTimeout(() => {
        this.hideLoadingSpinner();
      }, 800);

    } catch (error) {
      console.error('Error initializing portfolio:', error);
      this.hideLoadingSpinner();
    }
  }

  // Loading spinner management
  showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.classList.remove('hidden');
    }
  }

  hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 300);
    }
  }

  // Navigation setup
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu && navToggle) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    });

    // Navbar scroll effect
    if (navbar) {
      let lastScrollY = window.scrollY;

      window.addEventListener('scroll', this.throttle(() => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
      }, 100));
    }

    // Active navigation link highlighting
    this.updateActiveNavLink();
  }

  // Smooth scrolling setup
  setupSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 80; // Account for fixed navbar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Intersection Observer setup for animations and active nav
  setupIntersectionObservers() {
    // Animation observer for elements entering viewport
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Special handling for project cards
            if (entry.target.classList.contains('project-card')) {
              // Stagger animation for project cards
              const cards = document.querySelectorAll('.project-card');
              const cardIndex = Array.from(cards).indexOf(entry.target);
              entry.target.style.animationDelay = `${cardIndex * 0.1}s`;
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Navigation observer for active link highlighting
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateActiveNavLink(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
      }
    );

    // Observe all sections for navigation
    document.querySelectorAll('section[id]').forEach(section => {
      navObserver.observe(section);
      animationObserver.observe(section);
    });

    this.observers.set('animation', animationObserver);
    this.observers.set('navigation', navObserver);
  }

  // Update active navigation link
  updateActiveNavLink(activeId = null) {
    if (!activeId) {
      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeId = section.id;
          break;
        }
      }
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Doodle system for project cards
  getDoodleForProject(project) {
    const doodles = {
      1: this.createChatDoodle(), // AI Chat Assistant
      2: this.createVisionDoodle(), // Computer Vision Classifier
      3: this.createDashboardDoodle(), // ML Prediction Dashboard
      4: this.createSummaryDoodle() // Text Summarization Tool
    };

    return doodles[project.id] || this.createDefaultDoodle();
  }

  createChatDoodle() {
    return `
      <svg viewBox="0 0 120 120" class="doodle-nlp">
        <circle cx="40" cy="45" r="30" fill="none" stroke="currentColor" stroke-width="3"/>
        <circle cx="80" cy="60" r="20" fill="none" stroke="currentColor" stroke-width="3"/>
        <path d="M25 65 L15 75 L25 75 Z" fill="currentColor"/>
        <path d="M65 75 L55 85 L65 85 Z" fill="currentColor"/>
        <circle cx="35" cy="40" r="3" fill="currentColor"/>
        <circle cx="45" cy="40" r="3" fill="currentColor"/>
        <circle cx="75" cy="55" r="2" fill="currentColor"/>
        <circle cx="85" cy="55" r="2" fill="currentColor"/>
        <path d="M30 50 Q40 55 50 50" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="70" y1="65" x2="90" y2="65" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }

  createVisionDoodle() {
    return `
      <svg viewBox="0 0 120 120" class="doodle-cv">
        <ellipse cx="60" cy="60" rx="35" ry="25" fill="none" stroke="currentColor" stroke-width="3"/>
        <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" stroke-width="3"/>
        <circle cx="60" cy="60" r="5" fill="currentColor"/>
        <path d="M25 60 L15 50 M25 60 L15 70" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M95 60 L105 50 M95 60 L105 70" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="20" y="25" width="15" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="85" y="25" width="15" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="20" y="85" width="15" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="85" y="85" width="15" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }

  createDashboardDoodle() {
    return `
      <svg viewBox="0 0 120 120" class="doodle-ml">
        <rect x="20" y="20" width="80" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
        <line x1="30" y1="90" x2="30" y2="50" stroke="currentColor" stroke-width="3"/>
        <line x1="45" y1="90" x2="45" y2="40" stroke="currentColor" stroke-width="3"/>
        <line x1="60" y1="90" x2="60" y2="35" stroke="currentColor" stroke-width="3"/>
        <line x1="75" y1="90" x2="75" y2="45" stroke="currentColor" stroke-width="3"/>
        <line x1="90" y1="90" x2="90" y2="30" stroke="currentColor" stroke-width="3"/>
        <polyline points="30,65 45,55 60,45 75,50 90,40" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="30" cy="65" r="3" fill="currentColor"/>
        <circle cx="45" cy="55" r="3" fill="currentColor"/>
        <circle cx="60" cy="45" r="3" fill="currentColor"/>
        <circle cx="75" cy="50" r="3" fill="currentColor"/>
        <circle cx="90" cy="40" r="3" fill="currentColor"/>
        <path d="M85 35 L95 30 L90 40" fill="currentColor"/>
      </svg>
    `;
  }

  createSummaryDoodle() {
    return `
      <svg viewBox="0 0 120 120" class="doodle-nlp">
        <rect x="25" y="20" width="35" height="45" rx="3" fill="none" stroke="currentColor" stroke-width="3"/>
        <rect x="60" y="35" width="35" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="3"/>
        <line x1="30" y1="30" x2="55" y2="30" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="37" x2="55" y2="37" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="44" x2="50" y2="44" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="51" x2="55" y2="51" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="58" x2="45" y2="58" stroke="currentColor" stroke-width="2"/>
        <line x1="65" y1="45" x2="85" y2="45" stroke="currentColor" stroke-width="2"/>
        <line x1="65" y1="52" x2="90" y2="52" stroke="currentColor" stroke-width="2"/>
        <line x1="65" y1="59" x2="80" y2="59" stroke="currentColor" stroke-width="2"/>
        <path d="M70 70 Q77 75 85 70" stroke="currentColor" stroke-width="3" fill="none"/>
        <path d="M75 77 L85 82 L80 87" fill="currentColor"/>
        <circle cx="77" cy="90" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M72 85 L82 95 M82 85 L72 95" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }

  createDefaultDoodle() {
    return `
      <svg viewBox="0 0 120 120" class="doodle-webapp">
        <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" stroke-width="3"/>
        <circle cx="60" cy="60" r="5" fill="currentColor"/>
        <line x1="60" y1="30" x2="60" y2="25" stroke="currentColor" stroke-width="2"/>
        <line x1="60" y1="90" x2="60" y2="95" stroke="currentColor" stroke-width="2"/>
        <line x1="30" y1="60" x2="25" y2="60" stroke="currentColor" stroke-width="2"/>
        <line x1="90" y1="60" x2="95" y2="60" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }

  // Load projects from JSON data
  async loadProjects() {
    try {
      // Get current language from i18n system
      const currentLang = window.i18n ? window.i18n.currentLanguage : 'en';
      const projectFile = currentLang === 'es' ? 'projects-es.json' : 'projects.json';

      const response = await fetch(`assets/data/${projectFile}?v=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }

      this.projects = await response.json();
      this.renderProjects(this.projects);
      this.updateProjectCount();

    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to sample projects
      this.projects = this.getSampleProjects();
      this.renderProjects(this.projects);
      this.updateProjectCount();
    }
  }

  // Get sample projects as fallback
  getSampleProjects() {
    return [
      {
        id: 1,
        title: "AI Chat Assistant",
        description: "An intelligent chatbot built with natural language processing capabilities and contextual understanding.",
        complexity: "Advanced",
        projectCategory: "AI/ML",
        category: "nlp",
        github: "https://github.com/yourusername/ai-chat-assistant",
        demo: "https://ai-chat-demo.vercel.app"
      },
      {
        id: 2,
        title: "Computer Vision Classifier",
        description: "Real-time image classification system using deep learning for object detection and recognition.",
        complexity: "Expert",
        projectCategory: "AI/ML",
        category: "computer-vision",
        github: "https://github.com/yourusername/cv-classifier",
        demo: ""
      },
      {
        id: 3,
        title: "ML Prediction Dashboard",
        description: "Interactive web dashboard for machine learning model predictions with real-time data visualization.",
        complexity: "Intermediate",
        projectCategory: "Web App",
        category: "machine-learning",
        github: "https://github.com/yourusername/ml-dashboard",
        demo: "https://ml-dashboard-demo.streamlit.app"
      },
      {
        id: 4,
        title: "Text Summarization Tool",
        description: "Automatic text summarization using transformer models for extracting key insights from documents.",
        complexity: "Advanced",
        projectCategory: "AI/ML",
        category: "nlp",
        github: "https://github.com/yourusername/text-summarizer",
        demo: "https://text-summary-tool.vercel.app"
      }
    ];
  }

  // Render projects in the grid
  renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
    });

    // Observe new project cards for animation
    if (this.observers.has('animation')) {
      const animationObserver = this.observers.get('animation');
      projectsGrid.querySelectorAll('.project-card').forEach(card => {
        animationObserver.observe(card);
      });
    }
  }

  // Create individual experiment card with doodle
  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'experiment-card';
    card.style.animationDelay = `${index * 0.15}s`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('aria-label', `Project: ${project.title}`);

    const doodle = this.getDoodleForProject(project);

    card.innerHTML = `
      <div class="card-doodle" aria-hidden="true">
        ${doodle}
      </div>
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description}</p>
        <div class="card-tags">
          <span class="complexity-tag complexity-${project.complexity.toLowerCase()}" aria-label="Complexity: ${project.complexity}">${project.complexity}</span>
          <span class="category-tag category-${project.projectCategory.toLowerCase().replace('/', '-').replace(' ', '-')}" aria-label="Category: ${project.projectCategory}">${project.projectCategory}</span>
        </div>
        <div class="card-actions">
          <a href="${project.github}" class="card-link primary" target="_blank" rel="noopener noreferrer" aria-label="View code for ${project.title} on GitHub">
            View Code
          </a>
          ${project.demo ? `
            <a href="${project.demo}" class="card-link" target="_blank" rel="noopener noreferrer" aria-label="View live demo of ${project.title}">
              Demo
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  }

  // No filtering needed for simplified design

  // Initialize animations
  initializeAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-actions');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200 + 500);
    });

    // Animate stats on scroll
    this.animateCounters();
  }

  // Animate counter numbers
  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent);
      const increment = target / 50;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 30);
    };

    // Observe counters for animation trigger
    if (counters.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
              animateCounter(entry.target);
              entry.target.dataset.animated = 'true';
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach(counter => {
        counterObserver.observe(counter);
      });
    }
  }

  // Update project count in about section
  updateProjectCount() {
    const countElement = document.getElementById('project-count');
    if (countElement) {
      countElement.textContent = this.projects.length;
    }
  }

  // Utility methods
  getStatusClass(status) {
    const statusClasses = {
      'completed': 'status-completed',
      'in-progress': 'status-progress',
      'archived': 'status-archived'
    };
    return statusClasses[status] || 'status-completed';
  }

  getStatusText(status) {
    if (window.i18n) {
      return window.i18n.t(`projects.status.${status.replace('-', '')}`) || status;
    }

    const statusTexts = {
      'completed': 'Completed',
      'in-progress': 'In Progress',
      'archived': 'Archived'
    };
    return statusTexts[status] || status;
  }


  // Throttle utility
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  // Cleanup observers on page unload
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Initialize the application
let app;

// Wait for DOM content to be loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new PortfolioApp();
  });
} else {
  app = new PortfolioApp();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (app) {
    app.cleanup();
  }
});

// Export for global access
window.portfolioApp = app;