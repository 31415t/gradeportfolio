export function renderContact() {
  return `
    <section class="section contact" id="contact">
      <div class="container">
        <h2 class="section-title">Travaillons <span>ensemble</span></h2>
        <p class="section-subtitle">Vous avez un projet en tête ? Contactez-moi pour en discuter !</p>
        
        <div class="contact-content">
          <div class="contact-form-wrapper">
            <div class="contact-form">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSd8wl4Zl6bieFkn8gL1iTzn13773kl178FOX5UQ-VStoxEt6Q/viewform?embedded=true"
                width="100%" 
                height="550" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0"
                title="Formulaire de contact"
                loading="lazy">
              </iframe>
            </div>
          </div>
          
          <div class="contact-info">
            <div class="info-item">
              <div class="info-icon">
                <a href="mailto:peterleyauguste@gmail.com" aria-label="Envoyer un email">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
              <div>
                <h3>Email</h3>
                <p>peterleyauguste@gmail.com</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <a href="https://wa.me/50941975392" target="_blank" aria-label="Contacter via WhatsApp">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </div>
              <div>
                <h3>Téléphone</h3>
                <p>+509 41 97 53 92</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h3>Localisation</h3>
                <p>Port-de-Paix, Haïti</p>
              </div>
            </div>
            
            <div class="social-links">
              <h3>Suivez-moi</h3>
              <div class="social-icons">
                <a href="https://www.facebook.com/grade2.0" target="_blank" aria-label="Page Facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/grade2.0_graphicdesign" target="_blank" aria-label="Compte Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@grade3.0" target="_blank" aria-label="Compte TikTok">
                  <i class="fab fa-tiktok"></i>
                </a>
                <a href="https://www.youtube.com/channel/Grade%20Learning" target="_blank" aria-label="Chaîne YouTube">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}