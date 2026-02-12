// js/sections/hero.js
export function renderHero() {
  return `
    <section id="accueil" class="relative bg-gradient-to-r from-primary/90 to-secondary/80 h-screen text-light overflow-hidden">
      <!-- Background Image Layer -->
      <div class="absolute inset-0">
        <img 
          src="https://picsum.photos/id/1/1920/1080" 
          alt="Background créatif" 
          class="object-cover object-center w-full h-full"
          loading="lazy"
        />
        <!-- Overlay noir pour meilleur contraste -->
        <div class="absolute inset-0 bg-black/70"></div>
      </div>
      
      <!-- Content Layer -->
      <div class="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 md:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in">
            <span class="block">Bienvenue dans</span>
            <span class="inline-block bg-gradient-to-r from-yellow-300 via-primary to-pink-500 bg-clip-text text-transparent">mon univers visuel</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed animate-fade-in-delayed">
            Je suis <span class="font-semibold text-yellow-300">Peterley Auguste</span>, 
            <span class="block sm:inline">graphic designer freelance et fondateur de <span class="font-bold text-primary">Grade</span></span>
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-10">
            <a 
              href="#projets" 
              class="bg-primary hover:bg-secondary text-light font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="fas fa-eye"></i>
              <span>Voir mes projets</span>
            </a>
            <a 
              href="#contact" 
              class="bg-white/10 hover:bg-white/20 border-2 border-light text-light font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:border-primary shadow-lg backdrop-blur-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <i class="fas fa-envelope"></i>
              <span>Me contacter</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg class="w-6 h-6 text-white/70 hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  `;
}
