// sections/navigation.js - Gestion du menu, navigation active, scroll
export function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.querySelectorAll('.nav-link');

  // SVG icons for menu toggle
  const openSvg = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>';
  const closeSvg = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6"></path>';

  // ============================================
  // 1. MAPPING ENTRE LIENS ET SECTIONS
  // ============================================
  const sectionMapping = {
    'accueil': 'hero-section',
    'projets': 'projects-section',
    'apropos': 'about-section',
    'competences': 'skills-section',
    'contact': 'contact-section'
  };

  // ============================================
  // 2. GESTION DU MENU MOBILE
  // ============================================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Toggle le menu mobile
      navMenu.classList.toggle('hidden');
      navMenu.classList.toggle('flex');
      navMenu.classList.toggle('flex-col');
      navMenu.classList.toggle('absolute');
      navMenu.classList.toggle('top-full');
      navMenu.classList.toggle('left-0');
      navMenu.classList.toggle('w-full');
      navMenu.classList.toggle('bg-white/90');
      navMenu.classList.toggle('backdrop-blur-lg');
      navMenu.classList.toggle('backdrop-brightness-150');
      navMenu.classList.toggle('shadow-lg');
      navMenu.classList.toggle('p-4');
      navMenu.classList.toggle('mt-0');
      navMenu.classList.toggle('border-t');
      navMenu.classList.toggle('border-gray-200');
      navMenu.classList.toggle('z-40');
      
      const expanded = navMenu.classList.contains('flex');
      menuToggle.setAttribute('aria-expanded', expanded.toString());
      
      // Changer l'icône
      menuIcon.innerHTML = expanded ? closeSvg : openSvg;
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          navMenu.classList.add('hidden');
          navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'p-4', 'mt-2', 'border-t', 'border-gray-200', 'z-40');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuIcon.innerHTML = openSvg;
        }
      });
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (event) => {
      if (window.innerWidth < 1024) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('flex')) {
          navMenu.classList.add('hidden');
          navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'p-4', 'mt-2', 'border-t', 'border-gray-200', 'z-40');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuIcon.innerHTML = openSvg;
        }
      }
    });
  }

  // ============================================
  // 3. GESTION DU SCROLL POUR ACTIVER LES LIENS
  // ============================================
  if (navLinks.length > 0) {
    const sectionsToObserve = Object.values(sectionMapping)
      .map(sectionId => document.getElementById(sectionId))
      .filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          let activeLinkId = null;
          for (const [linkId, mappedSectionId] of Object.entries(sectionMapping)) {
            if (mappedSectionId === sectionId) {
              activeLinkId = linkId;
              break;
            }
          }
          
          if (activeLinkId) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${activeLinkId}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        }
      });
    }, observerOptions);

    sectionsToObserve.forEach(section => {
      if (section) observer.observe(section);
    });

    const defaultActiveLink = document.querySelector('.nav-link[href="#accueil"]');
    if (defaultActiveLink) {
      navLinks.forEach(link => link.classList.remove('active'));
      defaultActiveLink.classList.add('active');
    }

    // ============================================
    // 4. GESTION DES CLICS SUR LES LIENS
    // ============================================
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const linkId = href.substring(1);
        const targetSectionId = sectionMapping[linkId];
        const targetSection = document.getElementById(targetSectionId);
        
        if (targetSection) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          const navbar = document.getElementById('navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          
          const rect = targetSection.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const scrollPosition = absoluteTop - navbarHeight - 20;

          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // 5. GESTION DU REDIMENSIONNEMENT
  // ============================================
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      // Mode desktop : menu toujours visible, retirer les classes mobiles
      if (navMenu) {
        navMenu.classList.remove('hidden', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'p-4', 'mt-2', 'border-t', 'border-gray-200', 'z-40');
        navMenu.classList.add('flex');
      }
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuIcon.innerHTML = openSvg;
      }
    } else {
      // Mode mobile : menu caché par défaut
      if (navMenu) {
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-white/90', 'backdrop-blur-lg', 'shadow-lg', 'p-4', 'mt-2', 'border-t', 'border-gray-200', 'z-40');
      }
    }
  });

  // ============================================
  // 6. GESTION DU HASH DANS L'URL
  // ============================================
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const linkId = hash.substring(1);
      const targetSectionId = sectionMapping[linkId];
      if (targetSectionId) {
        const section = document.getElementById(targetSectionId);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  });

  if (window.location.hash) {
    const linkId = window.location.hash.substring(1);
    const targetSectionId = sectionMapping[linkId];
    if (targetSectionId) {
      const section = document.getElementById(targetSectionId);
      if (section) {
        setTimeout(() => {
          const navbar = document.getElementById('navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const rect = section.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          window.scrollTo({
            top: absoluteTop - navbarHeight - 20,
            behavior: 'smooth'
          });
        }, 200);
      }
    }
  }

  // 7. SYNCHRONISATION MENU/ICONE AU SCROLL
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    // Ne pas fermer le menu, juste synchroniser l'icône
    if (window.innerWidth < 1024 && menuToggle && menuIcon && navMenu) {
      // Utiliser un timeout pour éviter trop de calculs
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const isMenuVisible = navMenu.classList.contains('flex');
        menuToggle.setAttribute('aria-expanded', isMenuVisible ? 'true' : 'false');
        menuIcon.innerHTML = isMenuVisible ? closeSvg : openSvg;
      }, 100);
    }
  });

  console.log('Navigation initialized');
}