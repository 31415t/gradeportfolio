// utils.js - Fonctions utilitaires réutilisables

// Bouton retour en haut
export function initBackToTop() {
    console.log('⬆️ Initialisation du bouton retour en haut...');
    
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Gérer le clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('✅ Bouton retour en haut initialisé');
}

// Précharger les images
export function preloadImages() {
    console.log('🖼️ Préchargement des images...');
    
    // Images critiques à précharger
    const criticalImages = [
        'assets/images/logos/GradeLogo.png',
        'assets/images/certificate.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`✅ Image préchargée: ${src}`);
        img.onerror = () => console.warn(`❌ Erreur de préchargement: ${src}`);
    });
    
    // Observer les images pour le lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Animation de frappe
export function initTypingAnimation() {
    console.log('⌨️ Initialisation de l\'animation de frappe...');
    
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    // L'animation CSS fait déjà le travail
    // On peut ajouter un effet supplémentaire si besoin
    
    // Réinitialiser l'animation quand elle est terminée
    typingElement.addEventListener('animationend', () => {
        typingElement.style.borderRight = 'none';
    });
    
    console.log('✅ Animation de frappe initialisée');
}

// Gestion du redimensionnement
let resizeTimeout;
export function initResizeHandler() {
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Réparer les transitions qui pourraient causer des problèmes
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.transition = 'none';
            });
            
            setTimeout(() => {
                projectCards.forEach(card => {
                    card.style.transition = '';
                });
            }, 50);
        }, 250);
    });
}

// Formater les nombres
export function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Détecter le support des fonctionnalités
export function checkFeatureSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        fetch: 'fetch' in window,
        promises: 'Promise' in window,
        cssVariables: window.CSS && CSS.supports && CSS.supports('--test', '0')
    };
    
    console.log('🔍 Support des fonctionnalités:', features);
    
    // Ajouter des classes au body pour le feature detection
    const body = document.body;
    
    if (features.intersectionObserver) {
        body.classList.add('has-intersection-observer');
    }
    
    if (!features.fetch) {
        console.warn('⚠️ Fetch API non supporté, certaines fonctionnalités seront limitées');
    }
    
    return features;
}

// Démarrer le feature detection
document.addEventListener('DOMContentLoaded', () => {
    checkFeatureSupport();
    initResizeHandler();
});

// Exporter pour le debugging
export const utils = {
    initBackToTop,
    preloadImages,
    initTypingAnimation,
    initResizeHandler,
    formatNumber,
    checkFeatureSupport
};