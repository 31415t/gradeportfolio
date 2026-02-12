// sections/testimonials.js - Génération HTML + Slider de témoignages

export function renderTestimonials() {
  return `
    <section class="section testimonials" id="temoignages">
      <div class="container">
        <h2 class="section-title">Témoignages <span>Clients</span></h2>
        <p class="section-subtitle">Ce que disent mes clients après avoir travaillé avec moi</p>
        
        <div class="overflow-hidden">
          <div class="testimonials-slider flex gap-6 transition-transform" id="testimonialsSlider" style="will-change: transform;">
            <div class="loading-testimonials flex items-center justify-center w-full py-12">
              <i class="fas fa-spinner fa-spin text-4xl text-primary mb-4 mr-4"></i>
              <p>Chargement des témoignages...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initTestimonials() {
  console.log('💬 Initialisation des témoignages...');

  // Variables d'état
  let testimonials = [];
  let currentIndex = 0;
  let autoScrollInterval;
  let isScrolling = false;
  let cardWidth = 0;
  let cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };
  let currentCardsPerView = cardsPerView.desktop;
  const scrollDuration = 4000; // 4 secondes avant prochain scroll
  const transitionDuration = 600; // 600ms pour la transition

  // Éléments DOM
  const slider = document.getElementById('testimonialsSlider');
  const section = document.querySelector('.testimonials');

  // Charger les témoignages
  async function loadTestimonials() {
    try {
      const response = await fetch('data/testimonials.json');
      if (!response.ok) throw new Error('Erreur de chargement des témoignages');

      testimonials = await response.json();

      if (testimonials.length === 0) {
        showNoTestimonialsMessage();
        return;
      }

      // Générer les témoignages
      generateTestimonials();
      updateCardsPerView();
      setupIntersectionObserver();

      // Cacher l'état de chargement
      const loadingElement = document.querySelector('.loading-testimonials');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }

      console.log(`✅ ${testimonials.length} témoignages chargés`);
    } catch (error) {
      console.error('❌ Erreur:', error);
      showNoTestimonialsMessage();
    }
  }

  // Afficher un message si pas de témoignages
  function showNoTestimonialsMessage() {
    if (slider) {
      slider.innerHTML = `
        <div class="flex items-center justify-center w-full py-12">
          <i class="fas fa-comment-slash text-4xl text-gray-300 mr-4"></i>
          <p class="text-gray-500">Aucun témoignage disponible pour le moment.</p>
        </div>
      `;
    }
  }

  // Générer les témoignages
  function generateTestimonials() {
    if (!slider) return;

    slider.innerHTML = '';

    testimonials.forEach((testimonial) => {
      const testimonialCard = document.createElement('div');
      testimonialCard.className =
        'testimonial-card flex-shrink-0 w-full sm:w-1/2 md:w-1/3';

      // Contenu de l'avatar
      let avatarContent = '';
      if (testimonial.avatar) {
        avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover" onerror="this.style.display='none';">`;
      } else {
        avatarContent = `<span class="text-xl font-bold">${testimonial.initials || testimonial.name.charAt(0)}</span>`;
      }

      // Étoiles de notation
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += `<i class="fas fa-star text-yellow-400"></i>`;
      }

      // Couleur d'avatar basée sur le nom
      const avatarColor = getAvatarColor(testimonial.name);

      // HTML de la carte
      testimonialCard.innerHTML = `
        <!-- Rating -->
        <div class="flex gap-1 mb-4">
          ${stars}
        </div>
        
        <!-- Contenu du témoignage -->
        <p class="text-gray-700 text-sm mb-auto leading-relaxed italic">
          "${testimonial.content}"
        </p>
        
        <!-- Auteur -->
        <div class="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0" style="background: linear-gradient(135deg, ${avatarColor}, ${lightenColor(avatarColor, 20)});">
            ${avatarContent}
          </div>
          <div class="min-w-0">
            <h4 class="font-semibold text-gray-900 text-sm truncate">${testimonial.name}</h4>
            <p class="text-gray-600 text-xs truncate">${testimonial.position}</p>
            <p class="text-primary text-xs font-medium truncate">${testimonial.company}</p>
          </div>
        </div>
      `;

      slider.appendChild(testimonialCard);
    });

    // Ajouter des écouteurs d'événements au slider
    if (slider.parentElement) {
      slider.parentElement.addEventListener('mouseenter', pauseAutoScroll);
      slider.parentElement.addEventListener('mouseleave', resumeAutoScroll);
    }
  }

  // Setup Intersection Observer
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La section est visible
            startAutoScroll();
          } else {
            // La section est sortie de l'écran
            stopAutoScroll();
          }
        });
      },
      { threshold: 0.1 },
    );

    if (section) {
      observer.observe(section);
    }
  }

  // Mettre à jour le nombre de cartes visibles selon la largeur
  function updateCardsPerView() {
    const width = window.innerWidth;

    if (width < 640) {
      currentCardsPerView = cardsPerView.mobile;
    } else if (width < 1024) {
      currentCardsPerView = cardsPerView.tablet;
    } else {
      currentCardsPerView = cardsPerView.desktop;
    }

    // Calculer la largeur des cartes
    calculateCardWidth();
  }

  // Calculer la largeur de chaque carte
  function calculateCardWidth() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    // Utiliser offsetWidth pour obtenir la largeur réelle avec media queries appliquées
    cardWidth = cards[0].offsetWidth;

    // Reset du slider au prochain scroll
    scrollToIndex(0);
  }

  // Scroller vers un index spécifique
  function scrollToIndex(index) {
    if (!slider) return;

    const gap = 24;
    const translateX = -(index * (cardWidth + gap));
    slider.style.transition = `transform ${transitionDuration}ms ease-out`;
    slider.style.transform = `translateX(${translateX}px)`;
    currentIndex = index;
  }

  // Auto-scroll automatique
  function autoScroll() {
    if (isScrolling) return;

    const maxIndex = testimonials.length - currentCardsPerView;

    if (currentIndex >= maxIndex) {
      // Retour au début
      currentIndex = 0;
      slider.style.transition = 'none';
      slider.style.transform = 'translateX(0)';

      // Forcer un reflow pour appliquer le changement
      slider.offsetHeight;

      // Puis animer vers le prochain
      setTimeout(() => {
        isScrolling = true;
        scrollToIndex(currentIndex + 1);
        setTimeout(() => {
          isScrolling = false;
        }, transitionDuration);
      }, 100);
    } else {
      isScrolling = true;
      scrollToIndex(currentIndex + 1);
      setTimeout(() => {
        isScrolling = false;
      }, transitionDuration);
    }
  }

  // Démarrer l'auto-scroll
  function startAutoScroll() {
    if (autoScrollInterval) return; // Déjà en cours

    autoScrollInterval = setInterval(autoScroll, scrollDuration);
  }

  // Arrêter l'auto-scroll
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }

  // Mettre en pause (survol)
  function pauseAutoScroll() {
    stopAutoScroll();
  }

  // Reprendre (fin survol)
  function resumeAutoScroll() {
    if (section) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        startAutoScroll();
      }
    }
  }

  // Gérer le redimensionnement
  window.addEventListener('resize', () => {
    stopAutoScroll();
    updateCardsPerView();
    setTimeout(startAutoScroll, 500);
  });

  // Générer une couleur basée sur le nom
  function getAvatarColor(name) {
    const colors = [
      '#6C63FF', // Violet
      '#FF6584', // Rose
      '#36B37E', // Vert
      '#FFAB00', // Jaune
      '#6554C0', // Violet foncé
      '#00BBD9', // Cyan
      '#FF5630', // Orange
    ];

    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }

    return colors[sum % colors.length];
  }

  // Éclaircir une couleur
  function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  // Démarrer le chargement des témoignages
  loadTestimonials();
}
