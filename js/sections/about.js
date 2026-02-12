export function renderAbout() {
  return `
    <section class="section about" id="apropos">
      <div class="container">
        <h2 class="section-title">À propos <span>de moi</span></h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Contenu texte -->
          <div class="space-y-6">
            <p class="text-gray-700 text-lg leading-relaxed">
              Je suis <span class="font-semibold text-primary">Peterley Auguste</span>, un Graphic Designer basé en Haïti avec une passion pour créer des designs qui non seulement plaisent à l'œil mais qui racontent aussi une histoire. Mon approche combine créativité, stratégie et attention aux détails.
            </p>
            
            <p class="text-gray-700 text-lg leading-relaxed">
              Au cours de ma carrière, j'ai eu l'opportunité de travailler avec des particuliers, des startups innovantes et des entreprises établies, développant des identités visuelles qui renforcent leur présence sur le marché.
            </p>

            <!-- Stats moderne -->
            <div class="grid grid-cols-3 gap-6 mt-12">
              <div class="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary hover:shadow-lg transition-shadow duration-300">
                <div class="counter text-3xl lg:text-4xl font-bold text-primary mb-2" data-count="5">5</div>
                <p class="text-gray-600 text-sm font-medium">Années<br>d'expérience</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-cyan-500 hover:shadow-lg transition-shadow duration-300">
                <div class="counter text-3xl lg:text-4xl font-bold text-cyan-500 mb-2" data-count="120">120</div>
                <p class="text-gray-600 text-sm font-medium">Projets<br>réalisés</p>
              </div>
              
              <div class="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                <div class="counter text-3xl lg:text-4xl font-bold text-green-500 mb-2" data-count="25">25</div>
                <p class="text-gray-600 text-sm font-medium">Clients<br>satisfaits</p>
              </div>
            </div>
          </div>
          
          <!-- Image -->
          <div class="flex items-center justify-center">
            <div class="relative w-full max-w-md">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-2xl"></div>
              <div class="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img src="assets/certificate.jpg" alt="Certificat de formation en graphic design" loading="lazy" class="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
