// sections/testimonials.js - Génération HTML + Slider de témoignages

export function renderTestimonials() {
  return `
    <div class="testimonials" id="temoignages">
      <div class="container">
        <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-12">Ce que disent mes clients...</h2>
        
        <!-- Ajout de py-4 pour donner de l'espace vertical -->
        <div class="overflow-hidden py-4">
          <div class="testimonials-slider flex gap-6 transition-transform" id="testimonialsSlider" style="will-change: transform;">
            <div class="loading-testimonials flex items-center justify-center w-full py-12">
              <i class="fas fa-spinner fa-spin text-4xl text-primary mb-4 mr-4"></i>
              <p>Chargement des témoignages...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
export function initTestimonials() {
  console.log('💬 Initialisation des témoignages...');

  // Variables d'état
  let testimonials = [];
  let currentIndex = 0;
  let autoScrollInterval;
  let isScrolling = false;
  let gap = 24; // gap-6 = 24px
  
  const scrollDuration = 4000;
  const transitionDuration = 600;

  // Éléments DOM
  const slider = document.getElementById('testimonialsSlider');
  const section = document.querySelector('.testimonials');

  // Fonction pour obtenir le nombre de cartes par vue selon la largeur
  function getCardsPerView() {
    const width = window.innerWidth;
    if (width < 640) return 1;      // mobile
    if (width < 1024) return 2;     // tablette
    return 3;                        // desktop
  }

  // Calculer la largeur de chaque carte
  function calculateCardWidth() {
    if (!slider) return 0;
    
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return 0;
    
    const containerWidth = slider.parentElement?.offsetWidth || 0;
    const cardsPerView = getCardsPerView();
    
    // Largeur d'une carte = (largeur du conteneur - (gap * (cardsPerView - 1))) / cardsPerView
    return (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
  }

  // Scroller vers un index spécifique
  function scrollToIndex(index) {
    if (!slider) return;
    
    const cardWidth = calculateCardWidth();
    if (cardWidth === 0) return;
    
    const translateX = -(index * (cardWidth + gap));
    
    slider.style.transition = `transform ${transitionDuration}ms ease-out`;
    slider.style.transform = `translateX(${translateX}px)`;
    currentIndex = index;
  }

  // Auto-scroll automatique
  function autoScroll() {
    if (isScrolling || !slider) return;
    
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, testimonials.length - cardsPerView);
    
    if (currentIndex >= maxIndex) {
      // Retour au début
      isScrolling = true;
      
      slider.style.transition = 'none';
      slider.style.transform = 'translateX(0)';
      
      // Forcer un reflow
      void slider.offsetHeight;
      
      setTimeout(() => {
        slider.style.transition = `transform ${transitionDuration}ms ease-out`;
        scrollToIndex(1);
        
        setTimeout(() => {
          isScrolling = false;
        }, transitionDuration);
      }, 50);
      
      currentIndex = 0;
    } else {
      isScrolling = true;
      scrollToIndex(currentIndex + 1);
      
      setTimeout(() => {
        isScrolling = false;
      }, transitionDuration);
    }
  }

  // Gérer le redimensionnement
  function handleResize() {
    stopAutoScroll();
    
    if (slider) {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, testimonials.length - cardsPerView);
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      
      const cardWidth = calculateCardWidth();
      if (cardWidth > 0) {
        slider.style.transition = 'none';
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
      }
    }
    
    setTimeout(() => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          startAutoScroll();
        }
      }
    }, 500);
  }

  // Charger les témoignages
  async function loadTestimonials() {
    try {
      const response = await fetch('data/testimonials.json');
      if (!response.ok) throw new Error('Erreur de chargement');

      testimonials = await response.json();

      if (testimonials.length === 0) {
        showNoTestimonialsMessage();
        return;
      }

      generateTestimonials();
      
      setTimeout(() => {
        updateCardsPerView();
        setupIntersectionObserver();
        
        const loadingElement = document.querySelector('.loading-testimonials');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        
        console.log(`✅ ${testimonials.length} témoignages chargés`);
      }, 100);
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      showNoTestimonialsMessage();
    }
  }


// Générer les témoignages
function generateTestimonials() {
  if (!slider) return;

  slider.innerHTML = '';

  testimonials.forEach((testimonial) => {
    const testimonialCard = document.createElement('div');
    
    // SEULEMENT les classes pour le défilement responsive
    testimonialCard.className = 'testimonial-card flex-shrink-0 w-full sm:w-1/2 lg:w-1/3';
    
    let avatarContent = '';
    if (testimonial.avatar) {
      avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover" onerror="this.style.display='none';">`;
    } else {
      avatarContent = `<span class="text-xl font-bold">${testimonial.initials || testimonial.name.charAt(0)}</span>`;
    }

    // Fonction interne pour générer les étoiles
    function generateStars(rating) {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          stars += `<i class="ph ph-star-fill text-yellow-400"></i>`;
        } else {
          stars += `<i class="ph ph-star text-yellow-400"></i>`;
        }
      }
      return stars;
    }
    
    const avatarColor = getAvatarColor(testimonial.name);

    // Structure CORRIGÉE - plus de double conteneur
    testimonialCard.innerHTML = `
      <!-- UNIQUEMENT le contenu de la carte, pas de conteneur slider supplémentaire -->
      <div class="flex flex-col min-h-full bg-white/50 backdrop-blur-lg rounded-lg p-6 border-l-4 border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-[box-shadow] duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        
        <!-- Étoiles -->
        <div class="flex gap-1 mb-3">
          ${generateStars(testimonial.rating || 5)}
        </div>
        
        <!-- Contenu -->
        <p class="text-gray-700 text-sm mb-auto leading-relaxed italic">
          "${testimonial.content}"
        </p>
        
        <!-- Pied de carte avec avatar -->
        <div class="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
          <!-- Avatar avec dégradé -->
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0" 
               style="background: linear-gradient(135deg, ${avatarColor}, ${lightenColor(avatarColor, 20)});">
            ${avatarContent}
          </div>
          
          <!-- Informations utilisateur -->
          <div class="min-w-0">
            <h4 class="font-semibold text-gray-900 text-sm truncate">${testimonial.name}</h4>
            <p class="text-gray-600 text-xs truncate">${testimonial.position || ''}</p>
            <p class="text-primary text-xs font-medium truncate">${testimonial.company || ''}</p>
          </div>
        </div>
      </div>
    `;

    slider.appendChild(testimonialCard);
  });

  if (slider.parentElement) {
    slider.parentElement.addEventListener('mouseenter', pauseAutoScroll);
    slider.parentElement.addEventListener('mouseleave', resumeAutoScroll);
  }
}

  // Mettre à jour le nombre de cartes visibles
  function updateCardsPerView() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, testimonials.length - cardsPerView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    const cardWidth = calculateCardWidth();
    if (cardWidth > 0 && slider) {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }
  }

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoScroll();
          } else {
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

  function startAutoScroll() {
    if (autoScrollInterval) return;
    
    const cardsPerView = getCardsPerView();
    if (testimonials.length <= cardsPerView) return;
    
    autoScrollInterval = setInterval(autoScroll, scrollDuration);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }

  function pauseAutoScroll() {
    stopAutoScroll();
  }

  function resumeAutoScroll() {
    if (section) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        startAutoScroll();
      }
    }
  }

  function getAvatarColor(name) {
    const colors = [
      '#6C63FF', '#FF6584', '#36B37E', '#FFAB00', '#6554C0', '#00BBD9', '#FF5630'
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  }

  function lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  window.addEventListener('resize', handleResize);
  loadTestimonials();
}