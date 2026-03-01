export function renderAbout() {
  return `
<div class="section about py-16 md:py-24" id="apropos">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl lg:text-4xl font-bold text-orange-600 text-center mb-4">
      ...À propos de moi
    </h2>
    
    <div class="max-w-4xl mx-auto">
      <!-- Contenu texte (en haut) -->
      <div class="text-center mb-12 md:mb-16 space-y-5">
        <p class="text-gray-600 text-sm md:text-lg leading-relaxed">
          Je suis <span class="font-semibold text-primary">Peterley Auguste</span>, un Graphic Designer basé en Haïti avec une passion pour créer des designs qui non seulement plaisent à l'œil mais qui racontent aussi une histoire. Mon approche combine créativité, stratégie et attention aux détails.
        </p>
        
        <p class="text-gray-600 text-sm md:text-lg leading-relaxed">
          Au cours de ma carrière, j'ai eu l'opportunité de travailler avec des particuliers, des startups innovantes et des entreprises établies, développant des identités visuelles qui renforcent leur présence sur le marché.
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
        <!-- Badge 1 -->
        <div class="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-all duration-300 hover:scale-110">
          <img src="./../../assets/images/logos/badgexperience.png" alt="5+ années d'expérience"
          class="w-full h-full object-contain" style="filter: drop-shadow(0 0 35px rgba(255, 255, 254, 0.98));">
        </div>

        <!-- Badge 2 -->
        <div class="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
          <img src="./../../assets/images/logos/badgeprojets.png" alt="120+ projets réalisés"
          class="w-full h-full object-contain" style="filter: drop-shadow(0 0 35px rgba(255, 255, 254, 0.98));">
        </div>

        <!-- Badge 3 -->
        <div class="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
          <img src="./../../assets/images/logos/badgeclients.png" alt="25+ clients satisfaits"
          class="w-full h-full object-contain" style="filter: drop-shadow(0 0 35px rgba(255, 255, 254, 0.98));">
        </div>
      </div>

    </div>
  </div>
</div>
  `;
}
