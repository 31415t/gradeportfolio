// sections/process.js - Section Processus interactif pour graphiste
export const processContent = {
  title: "Comment je travaille",
  subtitle: "Un processus créatif en 4 étapes",
  steps: [
    {
      icon: "ph-lightbulb",
      title: "Brief & Analyse",
      description: "On discute de votre projet, vos besoins, vos inspirations et vos objectifs pour bien comprendre votre vision."
    },
    {
      icon: "ph-magnifying-glass",
      title: "Recherche & Concepts",
      description: "Je fais des recherches, je croquis des idées et je vous propose plusieurs directions créatives."
    },
    {
      icon: "ph-pencil",
      title: "Création & Révisions",
      description: "Je développe la direction choisie et on ajuste ensemble jusqu'à votre entière satisfaction."
    },
    {
      icon: "ph-calendar-check",
      title: "Livraison finale",
      description: "Je vous livre les fichiers finaux, prêts à l'emploi, avec tous les formats nécessaires."
    }
  ]
};

export function renderProcess() {
  const { title, subtitle, steps } = processContent;
  
  return `
    <div class="process py-6 bg-gray-50" id="process">
      <div class="container mx-auto px-4 sm:px-6 max-w-xl lg:max-w-2xl">
        <!-- En-tête de section -->
        <div class="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
            ${title}
          </h2>
          <p class="text-gray-600 text-center max-w-4xl mx-auto mb-8 text-sm md:text-lg">
            ${subtitle}
          </p>
        </div>

        <!-- Barre de progression intégrée -->
        <div class="relative mb-10 sm:mb-12 mx-2 sm:mx-4">
          <!-- Ligne de progression (arrière-plan) -->
          <div class="absolute top-4 sm:top-5 left-[16px] sm:left-[18px] lg:left-[20px] right-[16px] sm:right-[18px] lg:right-[20px] h-0.5 bg-gray-200"></div>
          
          <!-- Ligne de progression (active) -->
          <div class="absolute top-4 sm:top-5 left-[16px] sm:left-[18px] lg:left-[20px] h-0.5 bg-orange-500 transition-all duration-500" id="progressLine" style="width: 0px"></div>
          
          <!-- Étapes -->
          <div class="relative flex justify-between">
            ${steps.map((_, index) => {
              const stepNum = index + 1;
              return `
                <div class="flex flex-col items-center">
                  <button class="step-dot w-5 h-5 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none touch-manipulation z-10
                                bg-white text-gray-500 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                          data-step="${stepNum}"
                          id="stepDot-${stepNum}">
                    ${stepNum}
                  </button>
                  <span class="text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-gray-500 text-center px-1" id="stepLabel-${stepNum}">
                    Étape
                  </span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Conteneur de l'étape active -->
        <div class="bg-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-100 mb-6 sm:mb-8 min-h-[180px] sm:min-h-[200px]" id="stepContent">
          ${renderStep(1)}
        </div>

        <!-- Boutons de navigation avec icônes -->
        <div class="flex justify-between items-center gap-3 sm:gap-4">
          <button class="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-orange-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation flex items-center gap-1" 
                  id="prevBtn" disabled>
            <i class="ph ph-caret-left text-sm sm:text-base"></i>
            <span>Précédent</span>
          </button>
          
          <button class="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation whitespace-nowrap flex items-center gap-1" 
                  id="nextBtn">
            <span>Suivant</span>
            <i class="ph ph-caret-right text-sm sm:text-base"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStep(stepNumber) {
  const step = processContent.steps[stepNumber - 1];
  
  return `
    <div class="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
      <div class="flex items-center gap-3 sm:gap-4 w-full xs:w-auto">
        <div class="text-3xl sm:text-4xl text-orange-500 flex-shrink-0">
          <i class="${step.icon}"></i>
        </div>
        <h3 class="text-lg sm:text-xl font-semibold text-orange-600">${step.title}</h3>
      </div>
      <div class="flex-1">
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">${step.description}</p>
      </div>
    </div>
  `;
}

export function initProcess() {
  console.log('⚙️ Initialisation de la section processus...');
  
  const section = document.getElementById('process-section');
  if (!section) return;
  
  let currentStep = 1;
  const totalSteps = processContent.steps.length;
  let isCompleted = false;
  
  // Éléments DOM
  const stepContent = document.getElementById('stepContent');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressLine = document.getElementById('progressLine');
  const stepDots = document.querySelectorAll('.step-dot');
  
  // Fonction pour calculer la largeur de la barre de progression
  function updateProgressLine() {
    if (!progressLine) return;
    
    if (isCompleted) {
      progressLine.style.width = `calc(100% - 32px)`;
      return;
    }
    
    const progress = (currentStep - 1) / (totalSteps - 1);
    const totalWidth = progressLine.parentElement.offsetWidth - 32;
    const newWidth = progress * totalWidth;
    
    progressLine.style.width = `${newWidth}px`;
  }
  
  // Mettre à jour l'affichage
  function updateStep(instant = false) {
    const duration = instant ? 0 : 200;
    
    if (!instant) {
      stepContent.style.opacity = '0.5';
      stepContent.style.transform = 'scale(0.98)';
    }
    
    setTimeout(() => {
      if (currentStep <= totalSteps) {
        stepContent.innerHTML = renderStep(currentStep);
      }
      
      stepContent.style.opacity = '1';
      stepContent.style.transform = 'scale(1)';
      
      // Mettre à jour la barre de progression
      updateProgressLine();
      
      // Mettre à jour les points
      updateDots();
      
      // Mettre à jour les boutons
      updateButtons();
      
    }, duration);
  }
  
  // Mettre à jour l'apparence des points d'étape
  function updateDots() {
    stepDots.forEach((dot, index) => {
      const stepNum = index + 1;
      const label = document.getElementById(`stepLabel-${stepNum}`);
      
      if (isCompleted) {
        // Si terminé, tous les cercles sont verts avec check
        dot.className = 'step-dot w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 z-10 bg-green-500 text-white border-0';
        dot.innerHTML = '<i class="ph ph-check"></i>';
        if (label) {
          label.className = 'text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-green-600 text-center px-1';
        }
      } else {
        // Pas terminé
        if (stepNum < currentStep) {
          // Étapes précédentes : vert avec check
          dot.className = 'step-dot w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 z-10 bg-green-500 text-white border-0';
          dot.innerHTML = '<i class="ph ph-check"></i>';
          if (label) {
            label.className = 'text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-green-600 text-center px-1';
          }
        } else if (stepNum === currentStep) {
          // Étape active : orange avec numéro
          dot.className = 'step-dot w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 z-10 bg-orange-500 text-white border-0';
          dot.innerHTML = stepNum;
          if (label) {
            label.className = 'text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-orange-600 text-center px-1';
          }
        } else {
          // Étapes futures : cercle vide
          dot.className = 'step-dot w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-300 z-10 bg-white text-gray-500 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600';
          dot.innerHTML = stepNum;
          if (label) {
            label.className = 'text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-gray-500 text-center px-1';
          }
        }
      }
    });
  }
  
  // Mettre à jour les boutons
  function updateButtons() {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;
    
    if (isCompleted) {
      prevBtn.disabled = false;
      prevBtn.innerHTML = '<i class="ph ph-arrow-counter-clockwise text-sm sm:text-base"></i><span>Recommencer</span>';
      nextBtn.disabled = true;
      nextBtn.innerHTML = '<span>Terminé</span><i class="ph ph-check text-sm sm:text-base"></i>';
    } else {
      prevBtn.disabled = isFirstStep;
      prevBtn.innerHTML = '<i class="ph ph-caret-left text-sm sm:text-base"></i><span>Précédent</span>';
      
      if (isLastStep) {
        nextBtn.innerHTML = '<span>Terminer</span><i class="ph ph-check text-sm sm:text-base"></i>';
      } else {
        nextBtn.innerHTML = '<span>Suivant</span><i class="ph ph-caret-right text-sm sm:text-base"></i>';
      }
      nextBtn.disabled = false;
    }
  }
  
  // Aller à une étape spécifique
  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    
    const wasCompleted = isCompleted;
    isCompleted = false;
    currentStep = step;
    
    // Mettre à jour l'affichage
    stepContent.style.opacity = '0.5';
    stepContent.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      stepContent.innerHTML = renderStep(currentStep);
      stepContent.style.opacity = '1';
      stepContent.style.transform = 'scale(1)';
      
      updateProgressLine();
      updateDots();
      updateButtons();
    }, 200);
  }
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (isCompleted) return;
      
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else if (currentStep === totalSteps) {
        // Terminer le processus
        isCompleted = true;
        updateDots();
        updateProgressLine();
        
        // Afficher le message de fin
        stepContent.style.opacity = '0.5';
        stepContent.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          stepContent.innerHTML = `
            <div class="text-center py-6 sm:py-8">
              <!-- Icône et titre sur la même ligne -->
              <div class="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <div class="text-2xl sm:text-3xl text-green-500">
                  <i class="ph ph-check-fat"></i>
                </div>
                <h3 class="text-lg sm:text-xl font-semibold text-orange-600">Prêt à collaborer ?</h3>
              </div>
              
              <!-- Description -->
              <p class="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Contactez-moi pour donner vie à votre projet !</p>
              
              <!-- Bouton avec balise <a> corrigée -->
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8wl4Zl6bieFkn8gL1iTzn13773kl178FOX5UQ-VStoxEt6Q/viewform" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 
                        bg-orange-600 hover:bg-orange-700
                        text-white font-medium text-sm sm:text-base
                        rounded-md transition-all duration-300 
                        shadow-md hover:shadow-lg hover:scale-105
                        group cursor-pointer">
                <span>Demarrer un projet</span>
                <i class="ph ph-rocket-launch text-white text-base sm:text-lg group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          `;
          
          stepContent.style.opacity = '1';
          stepContent.style.transform = 'scale(1)';
        }, 200);
        
        updateButtons();
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (isCompleted) {
        // Recommencer
        goToStep(1);
      } else if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  }
  
  // Indicateurs cliquables - VERSION CORRIGÉE : toutes les étapes sont cliquables
  stepDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.dataset.step);
      
      if (isCompleted) {
        // Si terminé, recommencer à l'étape cliquée
        goToStep(step);
      } else {
        // Sinon, aller directement à l'étape cliquée
        goToStep(step);
      }
    });
  });
  
  // Mettre à jour la barre au redimensionnement
  window.addEventListener('resize', () => {
    updateProgressLine();
  });
  
  // Support tactile
  let touchStartX = 0;
  let touchEndX = 0;
  
  section.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  section.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    if (isCompleted) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) < swipeThreshold) return;
    
    if (diff > 0 && currentStep < totalSteps) {
      goToStep(currentStep + 1);
    } else if (diff < 0 && currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }
  
  // Animation d'entrée
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  observer.observe(section);
  
  // Initialisation
  updateDots();
  updateProgressLine();
  
  console.log('✅ Section processus initialisée');
}