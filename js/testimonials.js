// testimonials.js - Slider de témoignages
export function initTestimonials() {
    console.log('💬 Initialisation des témoignages...');
    
    // Variables d'état
    let testimonials = [];
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 secondes
    
    // Éléments DOM
    const slider = document.getElementById('testimonialsSlider');
    const dotsContainer = document.getElementById('testimonialsDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    // Charger les témoignages
    async function loadTestimonials() {
        try {
            const response = await fetch('data/testimonials.json');
            if (!response.ok) throw new Error('Erreur de chargement des témoignages');
            
            testimonials = await response.json();
            
            if (testimonials.length === 0) {
                showNoTestimonialsMessage();
                return;
            }
            
            // Générer les témoignages
            generateTestimonials();
            initControls();
            startAutoSlide();
            
            // Cacher l'état de chargement
            const loadingElement = document.querySelector('.loading-testimonials');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            console.log(`✅ ${testimonials.length} témoignages chargés`);
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            showNoTestimonialsMessage();
        }
    }
    
    // Afficher un message si pas de témoignages
    function showNoTestimonialsMessage() {
        if (slider) {
            slider.innerHTML = `
                <div class="no-projects-message">
                    <i class="fas fa-comment-slash"></i>
                    <p>Aucun témoignage disponible pour le moment.</p>
                </div>
            `;
        }
        
        if (dotsContainer) dotsContainer.innerHTML = '';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
    
    // Générer les témoignages
    function generateTestimonials() {
        if (!slider || !dotsContainer) return;
        
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            // Créer la carte
            const testimonialCard = document.createElement('div');
            testimonialCard.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
            testimonialCard.setAttribute('data-index', index);
            
            // Contenu de l'avatar
            let avatarContent = '';
            if (testimonial.avatar) {
                avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${testimonial.initials}';">`;
            } else {
                avatarContent = testimonial.initials || testimonial.name.charAt(0);
            }
            
            // Étoiles de notation
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += `<i class="fas fa-star${i < testimonial.rating ? '' : '-half-alt'}"></i>`;
            }
            
            // Couleur d'avatar basée sur le nom
            const avatarColor = getAvatarColor(testimonial.name);
            
            // HTML de la carte
            testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <div class="testimonial-avatar" style="background: linear-gradient(135deg, ${avatarColor}, ${lightenColor(avatarColor, 20)});">
                        ${avatarContent}
                    </div>
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                        <p><strong>${testimonial.company}</strong></p>
                        <div class="testimonial-rating">
                            ${stars}
                        </div>
                    </div>
                </div>
            `;
            
            // Afficher/masquer selon l'index
            testimonialCard.style.display = index === 0 ? 'flex' : 'none';
            
            slider.appendChild(testimonialCard);
            
            // Créer le point de navigation
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initialiser les contrôles
    function initControls() {
        if (prevBtn) {
            prevBtn.addEventListener('click', showPrevTestimonial);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextTestimonial);
        }
        
        // Pause au survol
        if (slider) {
            slider.addEventListener('mouseenter', pauseAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Afficher le témoignage précédent
    function showPrevTestimonial() {
        const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        goToTestimonial(newIndex);
    }
    
    // Afficher le témoignage suivant
    function showNextTestimonial() {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        goToTestimonial(newIndex);
    }
    
    // Aller à un témoignage spécifique
    function goToTestimonial(index) {
        if (index < 0 || index >= testimonials.length) return;
        
        // Animation de transition
        animateTestimonialTransition(index);
        
        // Mettre à jour l'index
        currentIndex = index;
        
        // Réinitialiser l'auto-slide
        resetAutoSlide();
    }
    
    // Animer la transition entre témoignages
    function animateTestimonialTransition(newIndex) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const currentCard = testimonialCards[currentIndex];
        const nextCard = testimonialCards[newIndex];
        
        if (!currentCard || !nextCard) return;
        
        // Animation de sortie
        currentCard.style.opacity = '0';
        currentCard.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            // Masquer la carte actuelle
            currentCard.classList.remove('active');
            currentCard.style.display = 'none';
            currentCard.style.opacity = '1';
            
            // Afficher la nouvelle carte
            nextCard.style.display = 'flex';
            nextCard.style.opacity = '0';
            nextCard.classList.add('active');
            
            // Animation d'entrée
            setTimeout(() => {
                nextCard.style.transition = 'opacity 0.3s ease';
                nextCard.style.opacity = '1';
            }, 10);
            
            // Mettre à jour les points
            updateDots(newIndex);
            
        }, 300);
    }
    
    // Mettre à jour les points indicateurs
    function updateDots(index) {
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }
    
    // Démarrer le défilement automatique
    function startAutoSlide() {
        if (testimonials.length <= 1) return;
        
        clearInterval(autoSlideInterval);
        
        autoSlideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            goToTestimonial(nextIndex);
        }, slideDuration);
    }
    
    // Mettre en pause le défilement automatique
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Réinitialiser l'auto-slide
    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Générer une couleur basée sur le nom
    function getAvatarColor(name) {
        const colors = [
            '#6C63FF', // Violet
            '#FF6584', // Rose
            '#36B37E', // Vert
            '#FFAB00', // Jaune
            '#6554C0', // Violet foncé
            '#00BBD9', // Cyan
            '#FF5630'  // Orange
        ];
        
        let sum = 0;
        for (let i = 0; i < name.length; i++) {
            sum += name.charCodeAt(i);
        }
        
        return colors[sum % colors.length];
    }
    
    // Éclaircir une couleur
    function lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }
    
    // Démarrer le chargement des témoignages
    loadTestimonials();
}