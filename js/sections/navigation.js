// sections/navigation.js - Gestion du menu, navigation active, scroll
export function initNavigation() {
  console.log('🔗 Initialisation de la navigation...');

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  // SVG icons used for the toggle (open / close)
  const openSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>\n                </svg>';
  const closeSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6"></path>\n                </svg>';

  // Menu mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // Toggle visibility on small screens by toggling the Tailwind 'hidden' class
      navMenu.classList.toggle('hidden');
      const expanded = !navMenu.classList.contains('hidden');
      menuToggle.setAttribute('aria-expanded', expanded.toString());
      menuToggle.innerHTML = expanded ? closeSvg : openSvg;
    });

    // Fermer le menu en cliquant sur un lien
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = openSvg;
      });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (event) => {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = openSvg;
      }
    });
  }

  // Navigation active au scroll
  if (navLinks.length > 0) {
    // Marquer le premier lien comme actif au départ
    if (navLinks.length > 0) navLinks[0].classList.add('active');

    // Observer les sections pour mettre à jour la navigation
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          // Retirer la classe active de tous les liens
          navLinks.forEach((link) => {
            link.classList.remove('active');
          });

          // Ajouter la classe active au lien correspondant
          const correspondingLink = document.querySelector(
            `.nav-link[href="#${sectionId}"]`,
          );
          if (correspondingLink) {
            correspondingLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    // Observer chaque section
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Gérer le clic sur les liens
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Mettre à jour la navigation active
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');

          // Défiler vers la section
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth',
          });

          // Fermer le menu mobile si ouvert
          if (navMenu && !navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
            if (menuToggle) {
              menuToggle.setAttribute('aria-expanded', 'false');
              menuToggle.innerHTML = openSvg;
            }
          }
        }
      });
    });
  }

  // Prévenir les problèmes de hachage d'URL
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  });

  console.log('✅ Navigation initialisée');
}
