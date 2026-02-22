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
import { initAlertModal } from './utils.js';

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

    // 6. Initialiser le modal d'alerte (pour les projets à venir)
    initAlertModal();
}

// slide-up section animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Retire les classes d'opacité et translation
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            
            // Optionnel : arrêter d'observer après l'animation
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2, // Déclenche quand 20% de la section est visible
    rootMargin: '0px' // Pas de marge
});

// Sélectionner et observer toutes les sections SAUF hero-section
document.querySelectorAll('section:not(#hero-section)').forEach(section => {
    observer.observe(section);
});

// Optionnel : vérifier les sections déjà visibles au chargement
window.addEventListener('load', () => {
    document.querySelectorAll('section:not(#hero-section)').forEach(section => {
        const rect = section.getBoundingClientRect();
        // Si la section est déjà visible dans la fenêtre
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.remove('opacity-0', 'translate-y-10');
            section.classList.add('opacity-100', 'translate-y-0');
        }
    });
});

// Version finale avec throttling pour les performances
const backToTop = document.getElementById('backToTop');
let timeoutId;

function throttleScroll() {
  if (timeoutId) return;
  
  timeoutId = setTimeout(() => {
    if (window.scrollY > 2000) {
      backToTop.classList.remove('hidden');
      requestAnimationFrame(() => {
        backToTop.classList.add('show');
      });
    } else {
      backToTop.classList.remove('show');
      setTimeout(() => {
        if (!backToTop.classList.contains('show')) {
          backToTop.classList.add('hidden');
        }
      }, 400);
    }
    timeoutId = null;
  }, 10);
}

window.addEventListener('scroll', throttleScroll, { passive: true });

backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Smooth scroll moderne
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Petit effet supplémentaire
  backToTop.style.transform = 'scale(0.9)';
  setTimeout(() => {
    backToTop.style.transform = '';
  }, 200);
});

// Montrer le bouton si on charge la page déjà en bas
if (window.scrollY > 2000) {
  backToTop.classList.remove('hidden');
  backToTop.classList.add('show');
}

// Effet typing sur les h2 - Version corrigée
(function() {
    console.log('🚀 Initialisation typing effect...');
    
    // Éviter les doubles initialisations
    if (window.typingEffectInitialized) return;
    window.typingEffectInitialized = true;
    
    // Ajouter les styles nécessaires (une seule fois)
    if (!document.getElementById('typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            .typing-container {
                display: inline-block;
                position: relative;
            }
            
            .typing-cursor {
                display: inline-block;
                width: 2px;
                height: 1.2em;
                background-color: currentColor;
                margin-left: 4px;
                animation: blink 0.7s infinite;
                vertical-align: middle;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .typing-text {
                display: inline;
                vertical-align: middle;
            }
            
            /* Éviter les sauts de layout */
            h2 {
                min-height: 1.5em;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Fonction pour appliquer l'effet typing à un h2
    function applyTypingEffect(h2) {
        // Vérifications de sécurité
        if (!h2 || h2.classList.contains('typing-done') || h2.hasAttribute('data-typing-processing')) {
            return;
        }
        
        // Marquer comme en cours de traitement
        h2.setAttribute('data-typing-processing', 'true');
        
        const originalText = h2.textContent.trim();
        
        // Ne pas traiter les textes vides
        if (!originalText) {
            h2.removeAttribute('data-typing-processing');
            return;
        }
        
        console.log(`🎯 Typing: "${originalText.substring(0, 30)}..."`);
        
        // Sauvegarder le texte original
        h2.setAttribute('data-original-text', originalText);
        
        // Sauvegarder les classes existantes
        const existingClasses = h2.className;
        
        // Sauvegarder les attributs data importants
        const dataAttributes = {};
        Array.from(h2.attributes).forEach(attr => {
            if (attr.name.startsWith('data-') && attr.name !== 'data-original-text') {
                dataAttributes[attr.name] = attr.value;
            }
        });
        
        // Vider le contenu mais garder les classes
        h2.innerHTML = '';
        h2.className = existingClasses;
        
        // Restaurer les attributs data
        Object.entries(dataAttributes).forEach(([key, value]) => {
            h2.setAttribute(key, value);
        });
        
        // Créer la structure
        const container = document.createElement('span');
        container.className = 'typing-container';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'typing-text';
        
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        
        container.appendChild(textSpan);
        container.appendChild(cursorSpan);
        h2.appendChild(container);
        
        // Animation typing
        let i = 0;
        let timeoutId = null;
        
        function typeNext() {
            if (i < originalText.length) {
                textSpan.textContent += originalText.charAt(i);
                i++;
                timeoutId = setTimeout(typeNext, 50); // Vitesse légèrement plus rapide
            } else {
                console.log(`✅ Terminé: "${originalText.substring(0, 30)}..."`);
                h2.classList.add('typing-done');
                h2.removeAttribute('data-typing-processing');
                // Garder le curseur qui clignote
                cursorSpan.style.animation = 'blink 0.7s infinite';
            }
        }
        
        // Commencer l'animation après un petit délai
        timeoutId = setTimeout(typeNext, 150);
        
        // Nettoyer en cas de problème
        h2._typingTimeout = timeoutId;
    }
    
    // Nettoyer les timeouts si le composant est démonté
    function cleanupTyping(h2) {
        if (h2._typingTimeout) {
            clearTimeout(h2._typingTimeout);
            delete h2._typingTimeout;
        }
    }
    
    // Observer pour déclencher au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target;
                
                // Petit délai pour éviter les problèmes de rafale
                setTimeout(() => {
                    if (!h2.classList.contains('typing-done') && !h2.hasAttribute('data-typing-processing')) {
                        applyTypingEffect(h2);
                    }
                }, 100);
                
                observer.unobserve(h2);
            }
        });
    }, {
        threshold: 0.1, // Seuil plus bas pour déclencher plus tôt
        rootMargin: '50px' // Marge réduite
    });
    
    // Fonction principale
    function initTyping() {
        // Attendre que le DOM soit vraiment prêt
        setTimeout(() => {
            const allH2 = document.querySelectorAll('h2');
            console.log(`📊 ${allH2.length} h2 trouvés pour typing`);
            
            if (allH2.length === 0) {
                console.warn('⚠️ Aucun h2 trouvé, nouvelle tentative dans 500ms');
                setTimeout(initTyping, 500);
                return;
            }
            
            // Filtrer les h2 à ne pas traiter (ex: dans hero)
            const h2ToProcess = Array.from(allH2).filter(h2 => {
                // Ignorer les h2 dans hero-section
                return !h2.closest('#hero-section');
            });
            
            console.log(`📊 ${h2ToProcess.length} h2 à traiter (hors hero)`);
            
            // Désobserver tous les h2 déjà observés
            h2ToProcess.forEach(h2 => {
                // Nettoyer les anciens timeouts
                cleanupTyping(h2);
                
                // Retirer les marqueurs de traitement
                h2.removeAttribute('data-typing-processing');
                
                // Observer
                observer.observe(h2);
            });
            
            // Vérifier les h2 déjà visibles
            requestAnimationFrame(() => {
                h2ToProcess.forEach(h2 => {
                    const rect = h2.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
                    
                    if (isVisible && !h2.classList.contains('typing-done')) {
                        console.log(`⚠️ h2 déjà visible: "${h2.textContent.substring(0, 30)}..."`);
                        
                        // Arrêter l'observation
                        observer.unobserve(h2);
                        
                        // Appliquer l'effet après un petit délai
                        setTimeout(() => {
                            if (!h2.classList.contains('typing-done')) {
                                applyTypingEffect(h2);
                            }
                        }, 200);
                    }
                });
            });
            
        }, 300); // Délai pour laisser le DOM se stabiliser
    }
    
    // Démarrer au bon moment
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTyping);
    } else {
        // DOM déjà chargé, mais attendre un peu pour les frameworks
        setTimeout(initTyping, 200);
    }
    
    // Nettoyage si la page est déchargée
    window.addEventListener('beforeunload', () => {
        document.querySelectorAll('h2').forEach(cleanupTyping);
    });
    
})();

// Démarrer l'application QUAND le DOM est prêt
document.addEventListener('DOMContentLoaded', init);

// Exporter pour le debugging
window.appState = appState;
