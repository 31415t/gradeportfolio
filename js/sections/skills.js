export function renderSkills() {
  return `
    <section id="competences" class="py-12 md:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
            Mes Services
          </h2>
          <p class="text-gray-600 text-center text-sm md:text-lg mb-12 max-w-2xl mx-auto">
            Des solutions créatives et professionnelles pour donner vie à vos projets
          </p>
        </div>
        
        <!-- Services Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
          <!-- Graphic Design -->
          <div class="group cursor-pointer border-1 border-dashed border-indigo-500/70 bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-orange-600/10 to-orange-600/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-orange-600/20 transition-all duration-300">
                <i class="ph ph-paint-brush-broad text-3xl text-orange-600"></i>
              </div>
              <h3 class="font-bold text-orange-600 text-lg md:text-xl mb-2">Graphic Design</h3>
              <p class="text-gray-600 text-sm md:text-lg pt-2 border-t border-gray-100 leading-relaxed">
                Création de visuels impactants qui allient esthétique et stratégie.
              </p>
            </div>
          </div>
          
          <!-- Logo Design -->
          <div class="group cursor-pointer border-1 border-dashed border-indigo-500/70 bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-600/10 to-purple-600/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-purple-600/20 transition-all duration-300">
                <i class="ph ph-pen-nib text-3xl text-purple-600"></i>
              </div>
              <h3 class="font-bold text-orange-600 text-lg md:text-xl mb-2">Logo Design</h3>
              <p class="text-gray-600 text-sm md:text-base pt-2 border-t border-gray-100 leading-relaxed">
                Logos uniques et mémorables, pensés pour durer.
              </p>
            </div>
          </div>
          
          <!-- Branding -->
          <div class="group cursor-pointer border-1 border-dashed border-indigo-500/70 bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-orange-600/10 to-orange-600/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-orange-600/20 transition-all duration-300">
                <i class="ph ph-cube text-3xl text-orange-600"></i>
              </div>
              <h3 class="font-bold text-orange-600 text-lg md:text-xl mb-2">Branding</h3>
              <p class="text-gray-600 text-sm md:text-base pt-2 border-t border-gray-100 leading-relaxed">
                Identités visuelles cohérentes qui donnent une personnalité forte à votre marque.
              </p>
            </div>
          </div>
          
          <!-- Formation -->
          <div class="group cursor-pointer border-1 border-dashed border-indigo-500/70 bg-white rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex flex-col items-center text-center">
              <div class="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-600/10 to-purple-600/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-purple-600/20 transition-all duration-300">
                <i class="ph ph-graduation-cap text-3xl text-purple-600"></i>
              </div>
              <h3 class="font-bold text-orange-600 text-lg md:text-xl mb-2">Formation</h3>
              <p class="text-gray-600 text-sm md:text-base pt-2 border-t border-gray-100 leading-relaxed">
                Ateliers pratiques pour apprendre et maîtriser les outils du design.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Tools Section -->
        <div class="mt-16">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">Outils & Logiciels</h2>
            <p class="text-gray-600 text-sm md:text-base">
              Les outils que j'utilise au quotidien pour donner vie à mes créations
            </p>
          </div>
          
          <!-- Tools Grid - Simple grid on all devices -->
          <div id="toolsGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-4xl mx-auto">
            <!-- Tools will be generated by JavaScript -->
          </div>
        </div>
      </div>
    </section>

    <style>
      /* Animations subtiles */
      .group:hover .ph {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
      
      .tool-card {
        transition: all 0.3s ease;
      }
      
      .tool-card:hover {
        transform: translateY(-4px) scale(1.02);
      }
    </style>
  `;
}

export function initSkills() {
  const tools = [
    {
      name: 'Inkscape',
      icon: 'assets/images/logos/inkscape.svg',
    },
    {
      name: 'Photopea',
      icon: 'assets/images/logos/photopea.svg',
    },
    {
      name: 'Canva',
      icon: 'assets/images/logos/canva.svg',
    },
    {
      name: 'Snapseed',
      icon: 'assets/images/logos/snapseed.svg',
    },
    {
      name: 'Figma',
      icon: 'assets/images/logos/figma.svg',
    },
    {
      name: 'Picsart',
      icon: 'assets/images/logos/picsart.svg',
    },
    {
      name: 'Capcut',
      icon: 'assets/images/logos/capcut.svg',
    },
    { 
      name: 'Jitter', 
      icon: 'assets/images/logos/jitter.svg' 
    },
  ];

  const toolsGrid = document.getElementById('toolsGrid');
  
  if (!toolsGrid) {
    console.warn('⚠️ toolsGrid non trouvé');
    return;
  }

  // Vider la grid
  toolsGrid.innerHTML = '';

  // Créer et ajouter chaque outil
  tools.forEach((tool) => {
    const toolCard = document.createElement('div');
    toolCard.className = 'tool-card bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer';
    
    // Gérer les erreurs d'images
    const img = new Image();
    img.src = tool.icon;
    img.alt = tool.name;
    img.className = 'h-12 w-12 md:h-14 md:w-14 object-contain mb-3';
    img.loading = 'lazy';
    img.onerror = function() {
      console.warn(`⚠️ Image non chargée pour ${tool.name}`);
      this.style.opacity = '0.5';
      this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'%23f97316\'%3E%3Cpath d=\'M4 4h16v16H4z\'/%3E%3C/svg%3E';
    };
    
    toolCard.appendChild(img);
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-medium text-gray-800 text-sm md:text-base';
    nameSpan.textContent = tool.name;
    toolCard.appendChild(nameSpan);
    
    toolsGrid.appendChild(toolCard);
  });

  // Animation d'apparition au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '50px' 
  });

  // Appliquer les styles initiaux et observer
  document.querySelectorAll('.tool-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
  });

  console.log('✅ Tools grid initialized avec', tools.length, 'outils');
}