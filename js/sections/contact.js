// Données personnalisables
const contactData = {
  // Partie 1 - Témoignage chiffré
  stats: {
    title: "25+ entreprises continuent de me faire confiance...",
    subtitle: "Rejoignez les entreprises qui ont choisi notre expertise pour leurs projets créatifs",
    clientCount: "25+",
    clientText: "clients satisfaits"
  },
  
  // Partie 2 - Call to action
  cta: {
    title: "...faites comme eux",
    subtitle: "Que vous ayez un projet précis ou simplement une idée à explorer, je suis là pour vous accompagner.",
    buttonText: "Démarrer un projet",
    buttonIcon: "ph ph-rocket-launch"
  },
  
  // Logos des partenaires/clients (ajoute/modifie les chemins selon tes besoins)
  logos: [
    {
      name: "Entreprise 1",
      url: "./../../assets/images/logos/natirelayitilogo.png",
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 2", 
      url: "./../../assets/images/logos/yolvanovalogo.jpg",
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 3",
      url: "./../../assets/images/projects/BelaStoreLogo.png", 
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 4",
      url: "./../../assets/images/projects/Brainhub.jpg",
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 5",
      url: "./../../assets/images/projects/gidhaiti.jpg",
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 6",
      url: "./../../assets/images/projects/baboo.jpg",
      width: 120,
      height: 120
    },
    {
      name: "Entreprise 7",
      url: "assets/images/projects/lektisovevimlogo.png",
      width: 120,
      height: 120
    }
  ]
};

export function renderContact() {
  // Dupliquer les logos pour l'effet infini
  const allLogos = [...contactData.logos, ...contactData.logos];
  
  return `
    <section id="contact" class="section contact py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Partie 1 - Clients & Partenaires -->
        <div class="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
            ${contactData.stats.title}
          </h2>
          <p class="text-gray-600 text-center text-sm md:text-lg mb-12 max-w-2xl mx-auto">
            ${contactData.stats.subtitle}
          </p>
        </div>
        
        <!-- Infinite Brand Scrolling -->
        <div class="brand-scroll-container w-full overflow-hidden mb-12 md:mb-16">
          <div class="brand-scroll-track flex gap-8 md:gap-12 items-center">
            ${allLogos.map(logo => `
              <div class="brand-item flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img src="${logo.url}" 
                     alt="${logo.name}"
                     class="h-16 md:h-20 lg:h-24 w-auto object-contain"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'40\' viewBox=\'0 0 120 40\'%3E%3Crect width=\'120\' height=\'40\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\' font-size=\'12\'%3E${logo.name}%3C/text%3E%3C/svg%3E'">
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Partie 2 - Call to Action -->
        <div class="max-w-3xl border-[1.5px] md:border-2 border-dashed border-orange-600 rounded-md p-6 md:p-12 bg-gray-50/50 shadow-md mx-auto text-center">
          <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
            ${contactData.cta.title}
          </h2>
          <p class="text-gray-600 text-center text-sm md:text-lg mb-12 max-w-2xl mx-auto">
            ${contactData.cta.subtitle}
          </p>
          
          <!-- Bouton CTA -->
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8wl4Zl6bieFkn8gL1iTzn13773kl178FOX5UQ-VStoxEt6Q/viewform" 
             class="cta-button inline-flex items-center justify-center gap-3 px-8 py-3 
                    bg-orange-600 hover:bg-orange-700
                    text-white font-medium 
                    rounded-md transition-all duration-300 
                    shadow-lg hover:shadow-xl hover:scale-105
                    group">
            <span>${contactData.cta.buttonText}</span>
            <i class="${contactData.cta.buttonIcon} text-lg group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
        
      </div>
    </section>

    <style>
      /* Animation du scroll infini */
      .brand-scroll-container {
        mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 10%,
          black 90%,
          transparent 100%
        );
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0%,
          black 10%,
          black 90%,
          transparent 100%
        );
      }
      
      .brand-scroll-track {
        animation: scroll 30s linear infinite;
        width: fit-content;
      }
      
      /* Pause au survol */
      .brand-scroll-container:hover .brand-scroll-track {
        animation-play-state: paused;
      }
      
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      /* Responsive : ralentir l'animation sur mobile */
      @media (max-width: 768px) {
        .brand-scroll-track {
          animation-duration: 20s;
        }
      }
      
      /* Style pour le bouton CTA */
      .cta-button {
        position: relative;
        overflow: hidden;
      }
      
      /*
      .cta-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      */

      .cta-button:active::after {
        width: 300px;
        height: 300px;
      }
      
      /* Style des logos */
      .brand-item {
        filter: grayscale(100%);
        transition: all 0.3s ease;
      }
      
      .brand-item:hover {
        filter: grayscale(0%);
        transform: scale(1.05);
      }
    </style>
  `;
}