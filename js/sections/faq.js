// sections/faq.js - Section FAQ en accordéon
export const faqContent = {
  title: "Mes réponses à vos questions",
  subtitle: "Tout ce que vous devez savoir pour une meilleure collaboration",
  questions: [
    {
      q: "Dois-je me déplacer pour collaborer avec vous ?  ",
      a: "Non, et c'est tout l'intérêt ! Grâce à mon approche 100 % à distance, vous gagnez du temps et restez flexible : suivi du projet, retours et livrables se font en ligne, sans contrainte. Et si une rencontre physique est préférable et que nous sommes dans la même région, je peux l'organiser avec plaisir."
    },
    {
      q: "Quels sont vos délais de réalisation ?",
      a: "Selon la complexité du projet, un visuel simple(flyer, étiquette...) peut être livré en 2 à 3 jours, tandis qu'un projet plus complexe (logo, identité visuelle, etc.) demande généralement entre 4 et 7 jours. Je m'efforce toujours de respecter les délais convenus et de vous tenir informé de l'avancement."
    },
    {
      q: "Comment sont gérées les révisions ?",
      a: "Mes offres incluent généralement 2 à 3 cycles de retouches, afin de perfectionner le rendu sans stress. Des ajustements supplémentaires peuvent être convenus si nécessaire. L'objectif est de garantir que le rendu final corresponde parfaitement à vos attentes."
    },
    {
      q: "Quels formats de fichiers recevrai-je ?",
      a: "Je livre toujours les créations dans des formats adaptés à vos besoins : PNG/JPEG pour le web, PDF pour l'impression, svg pour le vectoriel et fichiers sources (AI, PSD, Figma) si nécessaire."
    },
    {
      q: "Puis-je utiliser les créations pour tout support ?",
      a: "Absolument ! Une fois le projet terminé et payé, vous disposez de tous les droits d'utilisation pour vos supports (print, web, réseaux sociaux, goodies, etc.). Seule la paternité créative me revient pour mon portfolio."
    }
  ]
};

export function renderFaq() {
  const { title, subtitle, questions } = faqContent;
  
  return `
    <div class="faq py-6 bg-gray-50" id="faq">
      <div class="container mx-auto px-4 sm:px-6 max-w-3xl lg:max-w-4xl">
        <!-- En-tête de section -->
        <div class="text-center mb-10 lg:mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
            ${title}
          </h2>
          <div class="flex justify-center">
          </div>
          <p class="text-gray-600 text-center max-w-4xl mx-auto mb-8 text-sm md:text-lg">
            ${subtitle}
          </p>
        </div>

        <!-- Conteneur FAQ en accordéon -->
        <div class="border border-purple-200 rounded-xl overflow-hidden" id="faqAccordion">
          ${questions.map((item, index) => `
            <div class="faq-item ${index !== 0 ? 'border-t border-purple-200' : ''}" data-index="${index}">
              <!-- Question (cliquable) -->
              <button class="faq-question w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-gray-50/50 transition-colors" aria-expanded="false">
                <span class="text-base sm:text-lg font-medium text-gray-600 pr-8">${item.q}</span>
                <span class="flex-shrink-0 ml-2 transition-transform duration-300 ease-in-out">
                  <i class="ph ph-caret-down text-xl text-orange-500"></i>
                </span>
              </button>
              
              <!-- Réponse -->
              <div class="faq-answer overflow-hidden transition-all duration-300 ease-in-out max-h-0" style="transition-property: max-height;">
                <div class="p-5 pt-0 text-sm md:text-base text-gray-600">
                  ${item.a}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Message de contact -->
        <div class="text-center mt-10">
          <p class="text-sm text-gray-500">
            Vous avez d'autres questions ? 
            <a href="#contact" class="text-orange-500 hover:text-purple-600 font-medium transition-colors">
              Contactez-moi
            </a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export function initFaq() {
  console.log('❓ Initialisation de la section FAQ...');
  
  const section = document.getElementById('faq-section');
  if (!section) return;
  
  // Éléments DOM
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Fonction pour fermer tous les items sauf un
  function closeAllExcept(indexToKeep) {
    faqItems.forEach((item, index) => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const caret = questionBtn.querySelector('i').parentElement; // Le span qui contient l'icône
      
      if (index === indexToKeep) {
        // Ouvrir celui-ci
        answer.style.maxHeight = answer.scrollHeight + 'px';
        questionBtn.setAttribute('aria-expanded', 'true');
        caret.classList.add('rotate-180');
      } else {
        // Fermer les autres
        answer.style.maxHeight = '0';
        questionBtn.setAttribute('aria-expanded', 'false');
        caret.classList.remove('rotate-180');
      }
    });
  }
  
  // Ajouter les événements de clic
  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const caret = questionBtn.querySelector('i').parentElement; // Le span qui contient l'icône
    
    questionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isOpen = questionBtn.getAttribute('aria-expanded') === 'true';
      
      if (isOpen) {
        // Fermer cette question
        answer.style.maxHeight = '0';
        questionBtn.setAttribute('aria-expanded', 'false');
        caret.classList.remove('rotate-180');
      } else {
        // Fermer toutes les autres et ouvrir celle-ci
        closeAllExcept(index);
      }
    });
  });
  
  // Gérer le redimensionnement
  window.addEventListener('resize', () => {
    const openItem = document.querySelector('.faq-item .faq-question[aria-expanded="true"]')?.closest('.faq-item');
    if (openItem) {
      const answer = openItem.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
  
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
  
  console.log('✅ Section FAQ initialisée');
}