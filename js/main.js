// main.js - Fichier principal qui initialise tout le site
import { renderHero } from './sections/hero.js';
import { renderProjects, initProjects } from './sections/projects.js';
import {
  renderTestimonials,
  initTestimonials,
} from './sections/testimonials.js';
import { renderAbout } from './sections/about.js';
import { renderSkills, initSkills } from './sections/skills.js';
import { renderContact } from './sections/contact.js';
import { renderFooter } from './sections/footer.js';
import { initNavigation } from './sections/navigation.js';

// État global de l'application
let appState = {
  isLoading: true,
  data: null,
  currentPage: 1,
};

// Afficher un message d'erreur
function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-error';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(errorDiv);

  setTimeout(() => {
    if (errorDiv.parentNode) errorDiv.remove();
  }, 5000);
}

// Initialiser le compteur de statistiques
function initStatsCounter(data) {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length || !data) return;

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count') || '0');
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      current += increment;
      step++;
      if (step >= steps) {
        counter.textContent = target + '+';
        clearInterval(interval);
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, duration / steps);
  });
}

// Initialiser les animations au défilement
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');

          // Animer les compteurs dans les stats
          if (entry.target.classList.contains('stat')) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.dataset.animated) {
              const target = parseInt(
                counter.getAttribute('data-count') || '0',
              );
              counter.dataset.animated = 'true';
            }
          }
        }
      });
    },
    { threshold: 0.1 },
  );

  // Observer les sections et éléments
  const elementsToAnimate = document.querySelectorAll(
    '.section, .skill, .stat, .project-card',
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

// Initialisation principale
async function init() {
  console.log('🚀 Initialisation du portfolio...');

  try {
    // 1. INJECTER LES SECTIONS (maintenant que le DOM est chargé)
    console.log('📝 Injection des sections...');
    document.getElementById('hero-section').innerHTML = renderHero();
    document.getElementById('projects-section').innerHTML = renderProjects();
    document.getElementById('testimonials-section').innerHTML =
      renderTestimonials();
    document.getElementById('about-section').innerHTML = renderAbout();
    document.getElementById('skills-section').innerHTML = renderSkills();
    document.getElementById('contact-section').innerHTML = renderContact();
    document.getElementById('footer-section').innerHTML = renderFooter();

    // 2. Initialiser la navigation
    console.log('🔗 Initialisation navigation...');
    initNavigation();

    // 3. Initialiser les fonctionnalités des sections
    console.log('⚙️ Initialisation des fonctionnalités...');
    initProjects();
    initTestimonials();
    initSkills();

    // 4. Initialiser les animations
    console.log('✨ Initialisation animations...');
    initStatsCounter(null);
    initScrollAnimations();

    // 5. Cacher les états de chargement
    const loadingElements = document.querySelectorAll(
      '.loading-projects, .loading-testimonials',
    );
    loadingElements.forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });

    appState.isLoading = false;
    console.log('✅ Portfolio initialisé avec succès!');
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
    showErrorMessage('Erreur lors du chargement du site: ' + error.message);
    appState.isLoading = false;
  }
}

// Démarrer l'application QUAND le DOM est prêt
document.addEventListener('DOMContentLoaded', init);

// Exporter pour le debugging
window.appState = appState;
