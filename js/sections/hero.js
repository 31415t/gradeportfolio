export function renderHero() {
  return `
    <div id="accueil" class="relative h-screen text-gray-100 overflow-hidden">
      <!-- Background Image Layer -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src="./../../assets/images/logos/heroBG.png" 
          alt="Background créatif" 
          class="block object-cover object-[40%] lg:object-center w-full h-full z-0"
          loading="lazy"
        />
        <!-- Overlay noir pour meilleur contraste -->
        <div class="absolute inset-0 bg-purple-950/50 z-10"></div>
      </div>
      
      <!-- Content Layer -->
      <div class="relative z-20 flex flex-col pt-32 md:pt-40 lg:pt-48 items-center h-full text-center px-4 sm:px-6 md:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Main Title -->
          <h1 class="text-3xl sm:text-5xl md:text-6xl block animate-bounce text-gray-100 font-bold leading-tight mb-4 sm:mb-6">
            Bienvenue dans ma gallerie de création
          </h1>

          <!-- Subtitle -->
          <p class="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-4 leading-relaxed">
            Je suis <span class="font-semibold">Peterley Auguste</span>, 
            <span class="block sm:inline">graphic designer freelance et fondateur de <span class="font-bold">Grade</span>, avec 5 ans d'expérience dans la création de supports visuels percutants.</span>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col max-w-2xl mx-auto sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-10">
            <a 
              href="#projets" 
              class="bg-orange-600 hover:bg-transparent hover:border-2 hover:border-orange-600 hover:text-orange-600 rounded-md font-semibold gap-2 py-3 px-3 md:px-8 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="ph ph-folder-open-bold block group-hover:hidden text-xl"></i>
              <i class="ph ph-folder-open-fill hidden group-hover:block text-xl"></i>
              <span>Voir mes projets</span>
            </a>
            <a 
              href="#contact" 
              class="bg-transparent text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white rounded-md font-semibold py-3 px-3 md:px-8 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="ph ph-chat-circle-bold text-xl"></i>
              <span>Me contacter</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <a href="#projets" class="absolute bottom-32 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg class="w-6 h-6 text-white/70 hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>

    </div>
  `;
}
