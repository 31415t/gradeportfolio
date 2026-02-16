export function renderHero() {
  return `
    <section id="accueil" class="relative h-screen text-gray-100 overflow-hidden">
      <!-- Background Image Layer -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src="./../../assets/images/logos/heroBG.png" 
          alt="Background créatif" 
          class="block object-cover object-center w-full h-full z-0"
          loading="lazy"
        />
        <!-- Overlay noir pour meilleur contraste -->
        <div class="absolute inset-0 bg-black/90 z-10"></div>
      </div>
      
      <!-- Content Layer -->
      <div class="relative z-20 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 md:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-gray-100 font-bold leading-tight mb-4 sm:mb-6">
            <span class="block animate-bounce">Bienvenue dans ma gallerie de création</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Je suis <span class="font-semibold">Peterley Auguste</span>, 
            <span class="block sm:inline">graphic designer freelance et fondateur de <span class="font-bold">Grade</span>, avec 5 ans d'expérience dans la création de supports visuels percutants.</span></br><span class="text-orange-600 font-bold">120+ projets réalisés</span>
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col max-w-2xl mx-auto sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-10">
            <a 
              href="#projets" 
              class="btn-primary rounded-md font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="fas fa-eye"></i>
              <span>Voir mes projets</span>
            </a>
            <a 
              href="#contact" 
              class="btn-secondary rounded-md font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:border-orange-600 shadow-lg backdrop-blur-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="fas fa-envelope"></i>
              <span>Me contacter</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <a href="#projets" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg class="w-6 h-6 text-white/70 hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </section>
  `;
}
