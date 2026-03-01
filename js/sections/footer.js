export function renderFooter() {
  return `
    <footer class="footer relative w-full bg-purple-950 text-gray-100 pt-[40px] lg:pt-[80px] pb-[30px]">
      <div class="container px-8 mx-auto max-w-7xl">
        <!-- 4 colonnes sur desktop, 1 colonne sur mobile -->
        <div class="grid grid-cols-1 gap-[60px] -space-y-[10px] md:grid-cols-4 md:text-left text-center mb-[30px] lg:mb-[60px]">
          
          <!-- Colonne 1 : Brand -->
          <div class="footer-brand flex flex-col gap-[20px]">
            <a href="#" class="mr-4 flex justify-center md:justify-start items-center cursor-pointer text-lg text-white font-semibold ">
              <img src="assets/images/logos/Gradeofficiallogo.svg" alt="Grade3.0 Logo" class="h-8 w-auto mr-2 logo-animate" />
              <span class="hover:text-orange-600 ml-2 transition-all duration-300 ease-in-out">Grade3.0</span>
            </a>
            <p class="text-gray-100/70 text-sm leading-relaxed">Conception de supports visuels et d'identités visuelles impactants</p>
          </div>

          <!-- Colonne 2 : Navigation (allégée) -->
          <div class="footer-links pt-4 border-t border-white/10 w-full lg:pt-0 lg:border-t-0">
            <h4 class="block mb-4 text-[1.2rem] font-semibold text-white hover:pl-[5px] hover:text-orange-600 transition-all duration-300 ease-in-out">Navigation</h4>
            <ul class="space-y-[5px] text-sm">
              <li><a href="#accueil" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out inline-block hover:pl-[5px]">Accueil</a></li>
              <li><a href="#projets" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out inline-block hover:pl-[5px]">Portfolio</a></li>
              <li><a href="#apropos" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out inline-block hover:pl-[5px]">À propos</a></li>
              <li><a href="#competences" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out inline-block hover:pl-[5px]">Services</a></li>
              <li><a href="#contact" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out inline-block hover:pl-[5px]">Contact</a></li>
            </ul>
          </div>

          <!-- Colonne 3 : Ressources professionnelles -->
          <div class="footer-resources pt-4 border-t border-white/10 w-full lg:pt-0 lg:border-t-0">
            <h4 class="block mb-4 text-[1.2rem] font-semibold text-white hover:pl-[5px] hover:text-orange-600 transition-all duration-300 ease-in-out">Ressources</h4>
            <ul class="space-y-[5px] text-sm">
              <li><a href="/assets/images/logos/cv_peterleyauguste_graphicdesigner.pdf" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]" download>Mon CV</a></li>
              <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]">Demande de devis</a></li>
              <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]">Modèle de contrat</a></li>
              <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]">Kit média</a></li>
              <li><a href="assets/certificate.jpg" class="text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]">Certifications</a></li>
              <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out flex items-center md:justify-start justify-center gap-[10px] hover:pl-[5px]">Articles</a></li>
            </ul>
          </div>

          <!-- Colonne 4 : Contact -->
          <div class="footer-contact pt-4 border-t border-white/10 w-full lg:pt-0 lg:border-t-0">
            <h4 class="block mb-4 text-[1.2rem] font-semibold text-white hover:pl-[5px] hover:text-orange-600 transition-all duration-300 ease-in-out">Contact</h4>
            <div class="space-y-[10px] text-sm text-gray-100/70 flex flex-col items-center md:items-start">
              <ul class="space-y-[10px] text-sm text-gray-100/70">
                <li class="flex items-center justify-center md:justify-start gap-[10px] transition-all duration-300 ease-in-out hover:pl-[5px]"><i class="fa-regular fa-envelope text-orange-600 w-4"></i>peterleyauguste99@gmail.com</li>
                <li class="flex items-center justify-center md:justify-start gap-[10px] transition-all duration-300 ease-in-out hover:pl-[5px]"><i class="fa-brands fa-whatsapp text-orange-600 w-4"></i>+509 41 97 53 92</li>
                <li class="flex items-center justify-center md:justify-start gap-[10px] transition-all duration-300 ease-in-out hover:pl-[5px]"><i class="ph ph-map-pin text-orange-600 w-4"></i>Port-de-Paix, Haïti</li>
              </ul>  
              <!-- Mentions légales (regroupées) -->
              <div class="mt-4 pt-4 border-t border-white/10 w-full">
                <ul class="space-y-[10px]">
                  <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out text-xs flex items-center justify-center md:justify-start gap-[10px] hover:pl-[5px]"><i class="ph ph-shield text-orange-600"></i>Mentions légales & CGV</a></li>
                  <li><a href="#" class="inactive text-gray-100/70 hover:text-white transition-all duration-300 ease-in-out text-xs flex items-center justify-center md:justify-start gap-[10px] hover:pl-[5px]"><i class="ph ph-lock text-orange-600"></i>Confidentialité</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer bottom -->
        <div class="footer-bottom flex flex-col items-center justify-center w-full pt-[30px] border-t border-white/10 md:flex-row md:justify-between gap-4 text-sm text-gray-100/70">
          <p class="mb-[5px] text-gray-100/70 text-xs sm:text-sm">&copy; 2026 Grade3.0 - Tous droits réservés.</p>
          <p class="mb-[5px] text-gray-100/70 text-xs sm:text-sm">Développé avec <i class="fas fa-heart text-orange-600 animate-pulse hover:animate-none"></i> par Peterley Auguste</p>
          <div class="flex gap-4 text-orange-600 justify-center">
            <a href="https://www.facebook.com/grade2.0" target="_blank" class="hover:text-white transition-colors" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/grade2.0_graphicdesign" target="_blank" class="hover:text-white transition-colors" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@grade3.0" target="_blank" class="hover:text-white transition-colors" aria-label="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://youtu.be/OOqDK_4VOOk?si=G69SWdsdGKwNubwR" target="_blank" class="hover:text-white transition-colors" aria-label="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.254-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.254 2 12 2 12s0-3.254.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.254 0 7.814.418ZM15.194 12 9.684 15.128V8.872L15.194 12Z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}