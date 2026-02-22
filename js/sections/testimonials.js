// sections/testimonials.js - Version Card Stack avec hauteurs normalisées

export function renderTestimonials() {
  return `
    <div class="testimonials w-full py-12 bg-gray-100" id="temoignages">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">Ce que disent mes clients...</h2>
        <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Découvrez les retours de ceux qui m'ont fait confiance</p>
        
        <!-- Container du stack -->
        <div class="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] mx-auto transition-all duration-300" id="stackContainer">
          
          <!-- Loading state -->
          <div class="loading-testimonials absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-50">
            <i class="fas fa-spinner fa-spin text-4xl text-orange-600 mr-4"></i>
            <p class="text-gray-600">Chargement des témoignages...</p>
          </div>
          
          <!-- Les cartes seront injectées ici -->
          <div id="stackCards" class="relative w-full h-full"></div>
          
          <!-- Indicateurs de position -->
          <div class="absolute -bottom-20 left-0 right-0 flex flex-col items-center gap-3">
            <!-- Points de navigation -->
            <div class="flex items-center gap-2" id="stackDots"></div>
            
            <!-- Légende avec nombre total (message temporaire) -->
            <div class="text-sm mb-6 text-orange-400 font-medium" id="stackLegend">
              Chargement...
            </div>
          </div>
        </div>
        
        <!-- Boutons de navigation --> <!--
        <div class="flex items-center justify-center gap-4 mt-20">
          <button id="prevCard" class="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-orange-600 hover:text-purple-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Témoignage précédent">
            <i class="ph ph-caret-left text-2xl"></i>
          </button>
          <button id="nextCard" class="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-orange-600 hover:text-purple-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Témoignage suivant">
            <i class="ph ph-caret-right text-2xl"></i>
          </button>
        </div> -->
      </div>
    </div>
  `;
}

export function initTestimonials() {
  console.log('💬 Initialisation du stack de témoignages...');

  let testimonials = [];
  let currentIndex = 0;
  let autoScrollInterval;
  let isPaused = false;
  
  const autoScrollDelay = 5000;
  const transitionDuration = 500;

  const stackContainer = document.getElementById('stackContainer');
  const stackCards = document.getElementById('stackCards');
  const stackDots = document.getElementById('stackDots');
  const stackLegend = document.getElementById('stackLegend');
  const prevButton = document.getElementById('prevCard');
  const nextButton = document.getElementById('nextCard');
  const section = document.querySelector('.testimonials');

  // ============================================
  // 1. CSS MINIMAL (corrigé)
  // ============================================
  function injectStackStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .stack-card {
        position: absolute;
        width: 100%;
        transition: all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
        border-radius: 1rem;
        background: white;
        backface-visibility: hidden;
        transform-origin: top center;
        overflow: visible;
        opacity: 1;
      }
      
      .stack-card.active {
        transform: translateX(0) scale(1);
        z-index: 10;
        opacity: 1;
        filter: blur(0);
        box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
      }
      
      .stack-card.next-1 {
        transform: translateX(0) translateY(10px) scaleX(0.95);
        z-index: 9;
        opacity: 0.9;
        filter: blur(1px);
      }

      .stack-card.next-2 {
        transform: translateX(0) translateY(20px) scaleX(0.9);
        z-index: 8;
        opacity: 0.9;
        filter: blur(1.5px);
      }

      .stack-card.next-3 {
        transform: translateX(0) translateY(30px) scaleX(0.85);
        z-index: 7;
        opacity: 0;
        filter: blur(2px);
      }

      .stack-card.hidden-stack {
        transform: translateX(0px) translateY(40px) scaleY(0.8);
        z-index: 6;
        opacity:0;
        filter: blur(2.5px);
      }
      
      .stack-dot {
        width: 8px;
        height: 8px;
        border-radius: 20px;
        background-color: #d1d5db;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .stack-dot.active {
        width: 24px;
        background: linear-gradient(90deg, #f97316, #7a3eb1);
      }
      
      /* Ajustements pour mobile */
      @media (max-width: 640px) {
        .stack-card.next-1 {
          transform: translateX(0) translateY(8px) scaleX(0.97);
          filter: blur(0.5px);
          opacity: 0.8;
        }

        .stack-card.next-2 {
          transform: translateX(0) translateY(16px) scaleX(0.94);
          filter: blur(1px);
          opacity: 0;
        }

        .stack-card.next-3 {
          transform: translateX(0) translateY(24px) scaleX(0.91);
          filter: blur(1.5px);
          opacity: 0;
        }

        .stack-card.hidden-stack {
          transform: translateX(0px) translateY(32px) scaleY(0.88);
          filter: blur(2px);
          opacity: 0;
        }
        
        #stackContainer {
          max-width: 300px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // 2. NORMALISATION DES HAUTEURS
  // ============================================
  function normalizeCardHeights() {
    const cards = document.querySelectorAll('.stack-card');
    if (cards.length === 0) return;
    
    console.log('📏 Normalisation des hauteurs...');
    
    cards.forEach(card => {
      card.style.height = 'auto';
    });
    
    let maxHeight = 0;
    cards.forEach(card => {
      const height = card.offsetHeight;
      maxHeight = Math.max(maxHeight, height);
    });
    
    cards.forEach(card => {
      card.style.height = `${maxHeight}px`;
    });
    
    if (stackContainer) {
      stackContainer.style.height = `${maxHeight + 40}px`;
    }
    
    console.log(`✅ Hauteur normalisée: ${maxHeight}px`);
    
    cards.forEach(card => {
      card.style.overflow = 'visible';
    });
    
    updateStack();
  }

  // ============================================
  // 3. GÉNÉRATION DES CARTES (hover:border-orange retiré)
  // ============================================
  function generateCards() {
    if (!stackCards) return;

    stackCards.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
      const card = document.createElement('div');
      card.className = 'stack-card';
      card.dataset.index = index;
      
      let avatarContent = '';
      if (testimonial.avatar) {
        avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover rounded-full" onerror="this.style.display='none';">`;
      } else {
        avatarContent = `<span class="text-xl font-bold text-white">${testimonial.initials || testimonial.name.charAt(0)}</span>`;
      }

      function generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars += `<i class="ph ph-star-fill text-yellow-400 text-lg"></i>`;
          } else {
            stars += `<i class="ph ph-star text-yellow-400 text-lg"></i>`;
          }
        }
        return stars;
      }
      
      const avatarColor = getAvatarColor(testimonial.name);

      card.innerHTML = `
        <div class="stack-content flex flex-col bg-white rounded-xl p-6 sm:p-8 border-l-4 border-transparent h-full">
          
          <div class="flex gap-1 mb-4 flex-shrink-0">
            ${generateStars(testimonial.rating || 5)}
          </div>
          
          <div class="flex-grow flex flex-col min-h-0 mb-4">
            <p class="text-gray-700 text-sm sm:text-base leading-relaxed italic">
              "${testimonial.content}"
            </p>
          </div>
          
          <div class="flex items-center gap-4 pt-4 border-t border-gray-100 flex-shrink-0">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md" 
                style="background: linear-gradient(135deg, ${avatarColor}, ${lightenColor(avatarColor, 20)});">
              ${avatarContent}
            </div>
            
            <div class="min-w-0 flex-1">
              <h4 class="font-semibold text-gray-900 text-sm sm:text-base truncate">${testimonial.name}</h4>
              <p class="text-gray-500 text-xs truncate">${testimonial.position || ''}</p>
              <p class="text-orange-600 text-xs font-medium truncate">${testimonial.company || ''}</p>
            </div>
          </div>
        </div>
      `;

      // NOUVEAU : Clic sur la carte active seulement
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        // Vérifier si c'est la carte active
        if (card.classList.contains('active')) {
          nextCard(); // Passer à la carte suivante
        }
      });

      stackCards.appendChild(card);
    });

    setTimeout(() => {
      normalizeCardHeights();
    }, 200);
  }

  // ============================================
  // 4. GESTION DU STACK
  // ============================================
  function updateStack() {
    const cards = document.querySelectorAll('.stack-card');
    const totalCards = cards.length;
    
    cards.forEach((card, index) => {
      card.classList.remove('active', 'next-1', 'next-2', 'next-3', 'hidden-stack');
      
      let position = (index - currentIndex + totalCards) % totalCards;
      
      if (position === 0) {
        card.classList.add('active');
      } else if (position === 1) {
        card.classList.add('next-1');
      } else if (position === 2) {
        card.classList.add('next-2');
      } else if (position === 3) {
        card.classList.add('next-3');
      } else {
        card.classList.add('hidden-stack');
      }
    });
  }

// ============================================
// 5. INDICATEURS avec gradient mobile
// ============================================
function initIndicators() {
  if (!stackDots) return;
  
  const style = document.createElement('style');
  style.textContent = `
    .indicators-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .stack-dots {
      display: flex;
      gap: 8px;
      position: relative;
      padding: 10px 0;
    }
    
    .stack-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(90deg, #d1d5db, #9ca3af);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .stack-dot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: linear-gradient(90deg, #f97316, #fb923c);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    .stack-dot.active::before {
      opacity: 1;
    }
    
    .stack-dot:hover {
      transform: scale(1.2);
    }
    
    /* Effet de vague */
    .snake-wave {
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #f97316, #fb923c, #f97316, transparent);
      background-size: 200% 100%;
      border-radius: 3px;
      transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      filter: blur(1px);
      animation: waveFlow 2s linear infinite;
    }
    
    @keyframes waveFlow {
      0% { background-position: 0% 0%; }
      100% { background-position: 200% 0%; }
    }
  `;
  document.head.appendChild(style);
  
  // Créer l'effet de vague
  const wave = document.createElement('div');
  wave.className = 'snake-wave';
  stackDots.parentElement.style.position = 'relative';
  stackDots.parentElement.appendChild(wave);
}

function updateIndicators() {
  if (!stackDots || !stackLegend) return;
  
  const dots = Array.from(stackDots.children);
  const wave = document.querySelector('.snake-wave');
  
  if (dots.length !== testimonials.length) {
    stackDots.innerHTML = '';
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `stack-dot ${index === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Voir témoignage ${index + 1}`);
      dot.addEventListener('click', () => goToIndex(index));
      stackDots.appendChild(dot);
    });
  } else {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Animation de la vague
  if (wave && dots.length > 0) {
    const dotWidth = 12;
    const gap = 8;
    const left = currentIndex * (dotWidth + gap);
    const width = dotWidth;
    
    wave.style.left = `${left}px`;
    wave.style.width = `${width}px`;
  }
  
  // Légende avec animation
  if (testimonials.length > 0) {
    const newText = `${currentIndex + 1} / ${testimonials.length}`;
    if (stackLegend.textContent !== newText) {
      stackLegend.style.opacity = '0';
      stackLegend.style.transform = 'translateY(-5px)';
      
      setTimeout(() => {
        stackLegend.textContent = newText;
        stackLegend.style.opacity = '1';
        stackLegend.style.transform = 'translateY(0)';
      }, 150);
    }
  }
}

  // ============================================
  // 6. NAVIGATION
  // ============================================
  function goToIndex(index) {
    if (index < 0 || index >= testimonials.length || index === currentIndex) return;
    
    currentIndex = index;
    updateStack();
    updateIndicators();
    resetAutoScroll();
  }

  function nextCard() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    goToIndex(nextIndex);
  }

  function prevCard() {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToIndex(prevIndex);
  }

  // ============================================
  // 7. AUTO-DÉFILEMENT (avec gestion hover améliorée)
  // ============================================
  function startAutoScroll() {
    if (autoScrollInterval) stopAutoScroll();
    if (testimonials.length <= 1) return;
    
    autoScrollInterval = setInterval(() => {
      if (!isPaused) {
        nextCard();
      }
    }, autoScrollDelay);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }

  function resetAutoScroll() {
    if (!section) return;
    stopAutoScroll();
    
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && testimonials.length > 1 && !isPaused) {
      startAutoScroll();
    }
  }

  function pauseAutoScroll() {
    isPaused = true;
    stopAutoScroll();
  }

  function resumeAutoScroll() {
    isPaused = false;
    if (section) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && testimonials.length > 1) {
        startAutoScroll();
      }
    }
  }

  // ============================================
  // 8. OBSERVATEUR D'INTERSECTION
  // ============================================
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
      { threshold: 0.3 }
    );

    if (section) {
      observer.observe(section);
    }
  }

  // ============================================
  // 9. FONCTIONS UTILITAIRES
  // ============================================
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

  // ============================================
  // 10. GESTION DU RESIZE
  // ============================================
  function handleResize() {
    stopAutoScroll();
    
    setTimeout(() => {
      normalizeCardHeights();
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !isPaused) {
          startAutoScroll();
        }
      }
    }, 300);
  }

  // ============================================
  // 11. CHARGEMENT DES DONNÉES (amélioré)
  // ============================================
  async function loadTestimonials() {
    try {
      // Message temporaire plus explicite
      if (stackLegend) {
        stackLegend.textContent = 'Chargement des témoignages...';
      }

      const response = await fetch('data/testimonials.json');
      if (!response.ok) throw new Error('Erreur de chargement');

      testimonials = await response.json();
      console.log(`📦 ${testimonials.length} témoignages chargés`);

      if (testimonials.length === 0) {
        showNoTestimonialsMessage();
        return;
      }

      injectStackStyles();
      generateCards();
      
      setTimeout(() => {
        const loader = document.querySelector('.loading-testimonials');
        if (loader) loader.style.display = 'none';
        
        // Mettre à jour les indicateurs après chargement
        updateIndicators();
      }, 300);

      if (prevButton) prevButton.addEventListener('click', prevCard);
      if (nextButton) nextButton.addEventListener('click', nextCard);

      if (stackContainer) {
        stackContainer.addEventListener('mouseenter', pauseAutoScroll);
        stackContainer.addEventListener('mouseleave', resumeAutoScroll);
      }

      setupIntersectionObserver();
      
      window.addEventListener('resize', handleResize);
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      showNoTestimonialsMessage();
      
      if (stackLegend) {
        stackLegend.textContent = 'Erreur de chargement';
      }
    }
  }

  function showNoTestimonialsMessage() {
    if (stackCards) {
      stackCards.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center bg-white rounded-2xl">
          <div class="text-center p-8">
            <i class="ph ph-chat-circle text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Aucun témoignage disponible</p>
          </div>
        </div>
      `;
    }
    
    if (stackLegend) {
      stackLegend.textContent = '0 témoignage';
    }
  }

  loadTestimonials();
}