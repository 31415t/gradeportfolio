// contact.js - Gestion du formulaire de contact et des infos de contact
export function initContact() {
    console.log('📞 Initialisation du contact...');
    
    // Éléments DOM
    const contactForm = document.getElementById('contactForm');
    const socialLinks = document.querySelectorAll('.social-icons a');
    
    // Initialiser les liens sociaux
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Ajouter un tracking simple (optionnel)
                const platform = link.querySelector('i').className.split(' ')[1];
                console.log(`Lien social cliqué: ${platform}`);
                
                // On laisse le lien s'ouvrir normalement
            });
        });
    }
    
    // Initialiser les liens de contact
    const contactLinks = document.querySelectorAll('.info-item a');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const type = link.querySelector('i').className.split(' ')[1];
            console.log(`Contact cliqué: ${type}`);
        });
    });
    
    // Vérifier si Google Forms est chargé
    const formIframe = document.querySelector('.contact-form iframe');
    if (formIframe) {
        formIframe.addEventListener('load', () => {
            console.log('✅ Formulaire Google Forms chargé');
        });
        
        formIframe.addEventListener('error', () => {
            console.error('❌ Erreur de chargement du formulaire Google Forms');
            showFormMessage('Impossible de charger le formulaire. Veuillez contacter peterleyauguste@gmail.com directement.', 'error');
        });
    }
    
    // Afficher un message
    function showFormMessage(message, type) {
        // Chercher un conteneur existant
        let messageContainer = document.querySelector('.form-message-container');
        
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message-container';
            const contactFormWrapper = document.querySelector('.contact-form-wrapper');
            if (contactFormWrapper) {
                contactFormWrapper.appendChild(messageContainer);
            }
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        messageContainer.appendChild(messageDiv);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // Initialiser les tooltips pour les icônes
    initTooltips();
    
    console.log('✅ Contact initialisé');
}

// Initialiser les tooltips
function initTooltips() {
    const elementsWithTitle = document.querySelectorAll('[title], .info-item a, .social-icons a');
    
    elementsWithTitle.forEach(element => {
        // Si l'élément n'a pas déjà un tooltip personnalisé
        if (!element.getAttribute('data-tooltip')) {
            const title = element.getAttribute('title') || 
                         element.getAttribute('aria-label') || 
                         getDefaultTooltip(element);
            
            if (title) {
                element.setAttribute('data-tooltip', title);
                element.removeAttribute('title'); // Pour éviter le tooltip par défaut
            }
        }
    });
    
    // Créer les tooltips personnalisés
    document.addEventListener('mouseover', (e) => {
        const element = e.target.closest('[data-tooltip]');
        if (element) {
            showTooltip(element, element.getAttribute('data-tooltip'));
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        const element = e.target.closest('[data-tooltip]');
        if (element) {
            hideTooltip();
        }
    });
}

// Afficher un tooltip personnalisé
function showTooltip(element, text) {
    // Supprimer le tooltip existant
    hideTooltip();
    
    // Créer le tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    
    // Positionner le tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    
    // Styles du tooltip
    tooltip.style.cssText = `
        position: fixed;
        background: var(--dark-color);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
        transition: opacity 0.2s, transform 0.2s;
    `;
    
    document.body.appendChild(tooltip);
    
    // Animer l'apparition
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Stocker la référence
    element.tooltip = tooltip;
}

// Cacher le tooltip
function hideTooltip() {
    const existingTooltip = document.querySelector('.custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

// Obtenir un tooltip par défaut basé sur l'élément
function getDefaultTooltip(element) {
    const icon = element.querySelector('i');
    if (!icon) return '';
    
    const iconClass = icon.className;
    
    if (iconClass.includes('fa-envelope')) return 'Envoyer un email';
    if (iconClass.includes('fa-whatsapp')) return 'Contacter via WhatsApp';
    if (iconClass.includes('fa-phone')) return 'Appeler';
    if (iconClass.includes('fa-facebook-f')) return 'Page Facebook';
    if (iconClass.includes('fa-instagram')) return 'Compte Instagram';
    if (iconClass.includes('fa-tiktok')) return 'Compte TikTok';
    if (iconClass.includes('fa-youtube')) return 'Chaîne YouTube';
    
    return '';
}