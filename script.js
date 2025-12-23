// Variables globales pour la pagination
let currentPage = 1;
const projectsPerPage = 6;
let allProjects = [];
let filteredProjects = [];

// Initialisation du portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que les données sont disponibles
    if (!window.portfolioData || !window.portfolioData.projectsData) {
        console.error('Les données du portfolio ne sont pas disponibles.');
        showErrorMessage('Erreur de chargement des données. Veuillez rafraîchir la page.');
        return;
    }
    
    // Initialiser les données
    allProjects = window.portfolioData.projectsData;
    
    // Initialiser la pagination
    initPagination();
    
    // Initialisation des projets
    renderProjects('all');
    
    // Initialisation du menu mobile
    initMobileMenu();
    
    // Initialisation du filtrage des projets
    initProjectFilter();
    
    // Initialisation du formulaire de contact
    initContactForm();
    
    // Initialisation du bouton retour en haut
    initBackToTop();
    
    // Initialisation des animations au défilement
    initScrollAnimations();
    
    // Initialisation du bouton "Remonter dans la section"
    initBackToSectionButton();
    
    // Préchargement des images
    preloadImages();
    
    // Animation de frappe pour le titre hero
    setTimeout(initTypingAnimation, 1000);
    
    // Débogage des catégories
    debugCategories();
    
    // Initialisation de la section active
    initActiveSectionHighlight();
    
    // Forcer la mise à jour active au chargement après un court délai
    setTimeout(() => {
        updateActiveSectionHighlight();
    }, 100);
});

// Initialiser la pagination
function initPagination() {
    currentPage = 1;
}

// Rendu des projets avec pagination
function renderProjects(filter = 'all', resetPagination = true) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    // Réinitialiser la pagination si nécessaire
    if (resetPagination) {
        currentPage = 1;
    }
    
    // Filtrer les projets
    if (filter === 'all' || (Array.isArray(filter) && filter.length === 0)) {
        filteredProjects = [...allProjects];
    } else if (Array.isArray(filter)) {
        // garder les projets dont la catégorie est dans la liste sélectionnée
        filteredProjects = allProjects.filter(project => filter.includes(project.category));
    } else {
        // filtre simple (compatibilité rétro)
        filteredProjects = allProjects.filter(project => project.category === filter);
    }
    
    // Calculer les projets à afficher pour la page courante
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);
    
    // Afficher les projets
    displayProjects(projectsToShow);
    
    // Afficher/masquer le bouton "Voir plus"
    updateLoadMoreButton();
    
    // Animer l'apparition des projets
    animateProjectsAppearance();
}

// Afficher les projets dans la grille
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Si on réinitialise, vider la grille
    if (currentPage === 1) {
        projectsGrid.innerHTML = '';
    }
    
    if (projects.length === 0) {
        if (currentPage === 1) {
            projectsGrid.innerHTML = `
                <div class="no-projects-message">
                    <i class="fas fa-search"></i>
                    <p>Aucun projet trouvé dans cette catégorie.</p>
                </div>
            `;
        }
        return;
    }
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Mettre à jour le bouton "Voir plus"
function updateLoadMoreButton() {
    let loadMoreContainer = document.getElementById('loadMoreContainer');
    
    // Créer le conteneur s'il n'existe pas
    if (!loadMoreContainer) {
        loadMoreContainer = document.createElement('div');
        loadMoreContainer.id = 'loadMoreContainer';
        loadMoreContainer.className = 'load-more-container';
        document.querySelector('.projects .container').appendChild(loadMoreContainer);
    }
    
    // Calculer s'il reste des projets à afficher
    const totalProjects = filteredProjects.length;
    const projectsShown = Math.min(currentPage * projectsPerPage, totalProjects);
    const hasMoreProjects = projectsShown < totalProjects;
    
    if (hasMoreProjects) {
        loadMoreContainer.innerHTML = `
            <button id="loadMoreBtn" class="btn btn-secondary">
                <i class="fas fa-plus"></i> Voir plus de projets (${projectsShown}/${totalProjects})
            </button>
            <p class="projects-count">Affichage de ${projectsShown} projets sur ${totalProjects}</p>
        `;
        
        // Ajouter l'événement au bouton
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    } else if (totalProjects > 0) {
        loadMoreContainer.innerHTML = `
            <p class="all-projects-shown">
                <i class="fas fa-check-circle"></i> Tous les projets sont affichés (${totalProjects} projets)
            </p>
        `;
    } else {
        loadMoreContainer.innerHTML = '';
    }
}

// Charger plus de projets
function loadMoreProjects() {
    currentPage++;
    renderProjects(getCurrentFilter(), false); // false = ne pas réinitialiser la pagination
    
    // Défiler vers les nouveaux projets après un court délai
    setTimeout(scrollToNewProjects, 100);
}

// Obtenir le filtre actif
function getCurrentFilter() {
    // Retourne 'all' ou un tableau de catégories sélectionnées
    const activeButtons = Array.from(document.querySelectorAll('.filter-btn.active'));
    if (activeButtons.length === 0) return 'all';

    // Si le bouton 'all' est actif, considérer tout sélectionné
    const activeFilters = activeButtons.map(btn => btn.getAttribute('data-filter'));
    if (activeFilters.includes('all')) return 'all';

    return activeFilters;
}

// Défiler vers les nouveaux projets
function scrollToNewProjects() {
    if (currentPage > 1) {
        const projectCards = document.querySelectorAll('.project-card');
        const newCardIndex = (currentPage - 2) * projectsPerPage; // Index du premier nouveau projet
        
        if (projectCards[newCardIndex]) {
            // Marquer les nouveaux projets
            for (let i = newCardIndex; i < projectCards.length; i++) {
                projectCards[i].classList.add('new-project');
            }
            
            // Défiler doucement vers le premier nouveau projet
            setTimeout(() => {
                projectCards[newCardIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }
}

// Créer une carte de projet
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-category', project.category);
    projectCard.setAttribute('data-id', project.id);
    
    // Générer une couleur de fond
    const colors = ['#6C63FF', '#FF6584', '#36B37E', '#FFAB00', '#6554C0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Créer le contenu de l'image
    let imageContent = '';
    if (project.imageUrl) {
        imageContent = `
            <img 
                src="${project.imageUrl}" 
                alt="${project.title}"
                loading="lazy"
                class="project-img"
                data-id="${project.id}"
            >
            <i class="${project.icon} fallback-icon" style="display: none; color: ${randomColor};"></i>
        `;
    } else {
        imageContent = `<i class="${project.icon}" style="color: ${randomColor}; font-size: 3rem;"></i>`;
    }
    
    projectCard.innerHTML = `
        <div class="project-image" style="background-color: ${randomColor}20;">
            ${imageContent}
        </div>
        <div class="project-content">
            <span class="project-category" style="background-color: ${randomColor}20; color: var(--secondary-color);">${getCategoryName(project.category)}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <button class="project-view-btn" data-id="${project.id}">
                <i class="fas fa-eye"></i> Voir le projet
            </button>
        </div>
    `;
    
    // Gestionnaire d'erreur d'image
    const projectImg = projectCard.querySelector('.project-img');
    if (projectImg) {
        projectImg.addEventListener('error', function() {
            handleImageError(this, project.icon, randomColor);
        });
    }
    
    // Gestionnaire du bouton "Voir le projet"
    const viewBtn = projectCard.querySelector('.project-view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-id');
            viewProjectDetails(projectId);
        });
    }
    
    // Clic sur la carte entière
    projectCard.addEventListener('click', function(e) {
        if (!e.target.closest('.project-view-btn')) {
            const projectId = this.getAttribute('data-id');
            viewProjectDetails(projectId);
        }
    });
    
    // Effets de survol
    setupProjectCardHover(projectCard, projectImg);
    
    return projectCard;
}

// Gestionnaire d'erreur pour les images
function handleImageError(imgElement, iconClass, color) {
    // Cacher l'image
    imgElement.style.display = 'none';
    
    // Afficher l'icône de fallback
    const fallbackIcon = imgElement.nextElementSibling;
    if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
        fallbackIcon.style.display = 'block';
        fallbackIcon.style.color = color;
        fallbackIcon.style.fontSize = '3rem';
        fallbackIcon.style.position = 'absolute';
        fallbackIcon.style.top = '50%';
        fallbackIcon.style.left = '50%';
        fallbackIcon.style.transform = 'translate(-50%, -50%)';
    }
}

// Configuration des effets de survol
function setupProjectCardHover(projectCard, projectImg) {
    projectCard.addEventListener('mouseenter', function() {
        if (projectImg && projectImg.complete && projectImg.naturalHeight !== 0) {
            projectImg.style.transform = 'scale(1.05)';
        } else {
            const fallbackIcon = projectCard.querySelector('.fallback-icon');
            if (fallbackIcon) {
                fallbackIcon.style.transform = 'scale(1.1)';
            }
        }
    });
    
    projectCard.addEventListener('mouseleave', function() {
        if (projectImg) {
            projectImg.style.transform = 'scale(1)';
        }
        const fallbackIcon = projectCard.querySelector('.fallback-icon');
        if (fallbackIcon) {
            fallbackIcon.style.transform = 'scale(1)';
        }
    });
}

// Voir les détails d'un projet
function viewProjectDetails(projectId) {
    const project = allProjects.find(p => p.id == projectId);
    
    if (!project) {
        console.warn('Projet non trouvé:', projectId);
        return;
    }
    
    // Simple ouverture de l'image en grand
    if (project.imageUrl) {
        window.open(project.imageUrl, '_blank');
    } else {
        // Afficher une modal avec les détails
        showProjectModal(project);
    }
}

// Afficher une modal avec les détails du projet
function showProjectModal(project) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${project.title}</h2>
            <div class="modal-category">${getCategoryName(project.category)}</div>
            <p class="modal-description">${project.description}</p>
            <div class="modal-meta">
                <div class="modal-date"><i class="far fa-calendar"></i> Projet réalisé récemment</div>
            </div>
        </div>
    `;
    
    // Styles pour la modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        position: relative;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    // Bouton de fermeture
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--dark-color);
    `;
    
    // Ajouter la modal au document
    document.body.appendChild(modal);
    
    // Gestionnaire de fermeture
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Variables pour le slider des témoignages
let currentTestimonialIndex = 0;
let testimonials = [];
let autoSlideInterval;

// Initialisation des témoignages (à appeler dans DOMContentLoaded)
function initTestimonials() {
    if (!window.portfolioData || !window.portfolioData.testimonialsData) {
        console.warn('Aucune donnée de témoignages disponible.');
        return;
    }
    
    testimonials = window.portfolioData.testimonialsData;
    
    if (testimonials.length === 0) {
        console.warn('Aucun témoignage à afficher.');
        return;
    }
    
    // Générer les témoignages
    generateTestimonials();
    
    // Initialiser les contrôles
    initTestimonialsControls();
    
    // Démarrer le défilement automatique
    startAutoSlide();
}

// Générer les témoignages dans le slider
function generateTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    if (!slider || !dotsContainer) return;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        // Créer la carte de témoignage
        const testimonialCard = document.createElement('div');
        testimonialCard.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
        testimonialCard.setAttribute('data-index', index);
        
        // Créer le contenu de l'avatar
        let avatarContent = '';
        if (testimonial.avatar) {
            avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${testimonial.initials}';">`;
        } else {
            avatarContent = testimonial.initials;
        }
        
        // Créer les étoiles de notation
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<i class="fas fa-star${i < testimonial.rating ? '' : '-half-alt'}"></i>`;
        }
        
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.content}</p>
            </div>
            <div class="testimonial-author">
                <div class="testimonial-avatar">
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
        
        slider.appendChild(testimonialCard);
        
        // Créer le point indicateur
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
}

// Initialiser les contrôles du slider
function initTestimonialsControls() {
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevTestimonial);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    // Pause au survol
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Afficher le témoignage précédent
function showPrevTestimonial() {
    const newIndex = currentTestimonialIndex === 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
    goToTestimonial(newIndex);
}

// Afficher le témoignage suivant
function showNextTestimonial() {
    const newIndex = currentTestimonialIndex === testimonials.length - 1 ? 0 : currentTestimonialIndex + 1;
    goToTestimonial(newIndex);
}

// Aller à un témoignage spécifique
function goToTestimonial(index) {
    if (index < 0 || index >= testimonials.length) return;
    
    // Mettre à jour l'index courant
    currentTestimonialIndex = index;
    
    // Mettre à jour l'affichage
    updateTestimonialDisplay();
    
    // Réinitialiser l'auto-slide
    resetAutoSlide();
}

// Mettre à jour l'affichage des témoignages
function updateTestimonialDisplay() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Masquer toutes les cartes
    testimonialCards.forEach(card => {
        card.classList.remove('active');
        card.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
    });
    
    // Afficher la carte active
    if (testimonialCards[currentTestimonialIndex]) {
        testimonialCards[currentTestimonialIndex].classList.add('active');
    }
    
    // Mettre à jour les points actifs
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
}

// Démarrer le défilement automatique
function startAutoSlide() {
    if (testimonials.length <= 1) return; // Pas besoin d'auto-slide s'il n'y a qu'un seul témoignage
    
    clearInterval(autoSlideInterval);
    
    autoSlideInterval = setInterval(() => {
        const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        goToTestimonial(nextIndex);
    }, 5000); // Change toutes les 5 secondes
}

// Mettre en pause le défilement automatique
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Réinitialiser le défilement automatique
function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

// N'oublie pas d'appeler initTestimonials dans DOMContentLoaded :
document.addEventListener('DOMContentLoaded', function() {
    // ... autres initialisations ...
    
    // Initialisation des témoignages
    initTestimonials();
    
    // ...
});

// Générer une couleur d'avatar basée sur le nom
function getAvatarColor(name) {
    const colors = [
        '#6C63FF', // Violet
        '#FF6584', // Rose
        '#36B37E', // Vert
        '#FFAB00', // Jaune
        '#6554C0', // Violet foncé
        '#00B8D9', // Cyan
        '#FF5630'  // Orange
    ];
    
    // Générer un index basé sur la somme des codes ASCII du nom
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    
    return colors[sum % colors.length];
}

// Mettre à jour la fonction generateTestimonials pour utiliser les couleurs dynamiques
function generateTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    if (!slider || !dotsContainer) return;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const avatarColor = getAvatarColor(testimonial.name);
        
        // Créer la carte de témoignage
        const testimonialCard = document.createElement('div');
        testimonialCard.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
        testimonialCard.setAttribute('data-index', index);
        
        // Créer le contenu de l'avatar
        let avatarContent = '';
        if (testimonial.avatar) {
            avatarContent = `<img src="${testimonial.avatar}" alt="${testimonial.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='${testimonial.initials}';">`;
        } else {
            avatarContent = testimonial.initials;
        }
        
        // Créer les étoiles de notation
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `<i class="fas fa-star${i < testimonial.rating ? '' : '-half-alt'}"></i>`;
        }
        
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
        
        slider.appendChild(testimonialCard);
        
        // Créer le point indicateur
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
}

// Fonction utilitaire pour éclaircir une couleur
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

// Animation améliorée pour le changement de témoignage
function goToTestimonialWithAnimation(index) {
    if (index < 0 || index >= testimonials.length) return;
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const currentCard = testimonialCards[currentTestimonialIndex];
    const nextCard = testimonialCards[index];
    
    if (currentCard && nextCard) {
        // Animation de sortie
        currentCard.style.opacity = '0';
        currentCard.style.transform = `translateX(-${currentTestimonialIndex * 100}%) scale(0.95)`;
        
        // Animation d'entrée
        setTimeout(() => {
            nextCard.style.opacity = '1';
            nextCard.style.transform = `translateX(-${index * 100}%) scale(1)`;
            nextCard.classList.add('active');
            currentCard.classList.remove('active');
            
            // Mettre à jour l'index et les points
            currentTestimonialIndex = index;
            updateDots();
            
            // Réinitialiser l'auto-slide
            resetAutoSlide();
        }, 300);
    }
}

// Mettre à jour les points indicateurs
function updateDots() {
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
}

// ...existing code...

function initActiveSectionHighlight() {
    console.log('🔍 initActiveSectionHighlight appelé');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    // Définir "Accueil" comme actif par défaut au chargement
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[0].classList.add('active');
    
    // Gestion des clics
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Détection au scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Appel au chargement
document.addEventListener('DOMContentLoaded', initActiveSectionHighlight);
// ...existing code...

// Conversion des catégories en noms affichables
function getCategoryName(category) {
    const categoryNames = {
        'all': 'Tous',
        'logo': 'Logo',
        'branding': 'Branding',
        'flyer': 'Flyer',
        'socialMedia': 'Social Media',
        'print': 'Print',
        'mockup': 'Mockup',
        'autre': 'Autres',
        'illustration': 'Illustration'
    };
    
    return categoryNames[category] || category;
}

// Animation d'apparition des projets
function animateProjectsAppearance() {
    const projectCards = document.querySelectorAll('.project-card');
    const startIndex = (currentPage - 1) * projectsPerPage;
    
    projectCards.forEach((card, index) => {
        if (index >= startIndex) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index - startIndex) * 100);
        }
    });
}

// Filtrage des projets
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isAll = this.getAttribute('data-filter') === 'all';

            if (isAll) {
                // Si on clique sur 'all', désactiver les autres et activer 'all'
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            } else {
                // Toggle du bouton cliqué
                this.classList.toggle('active');

                // Désactiver 'all' si une catégorie spécifique est sélectionnée
                const allBtn = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === 'all');
                if (allBtn) allBtn.classList.remove('active');

                // Si plus aucune catégorie n'est active, réactiver 'all'
                const anyActive = Array.from(filterButtons).some(btn => btn.classList.contains('active'));
                if (!anyActive && allBtn) allBtn.classList.add('active');
            }

            // Filtrer les projets (avec réinitialisation de la pagination)
            const filter = getCurrentFilter();
            renderProjects(filter, true);
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Veuillez remplir tous les champs du formulaire.', 'error');
            return;
        }
        
        // Validation d'email basique
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulation d'envoi
        console.log('Formulaire soumis:');
        console.log('Nom:', name);
        console.log('Email:', email);
        console.log('Sujet:', subject);
        console.log('Message:', message);
        
        // Afficher un message de confirmation
        showFormMessage('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.', 'success');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// Fonction pour afficher les messages du formulaire
function showFormMessage(message, type) {
    // Supprimer les messages existants
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Créer le message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.padding = '15px';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(54, 179, 126, 0.1)';
        messageDiv.style.color = '#36B37E';
        messageDiv.style.border = '1px solid #36B37E';
    } else {
        messageDiv.style.backgroundColor = 'rgba(255, 101, 132, 0.1)';
        messageDiv.style.color = '#FF6584';
        messageDiv.style.border = '1px solid #FF6584';
    }
    
    // Ajouter le message après le formulaire
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageDiv);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Bouton retour en haut
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Bouton pour remonter dans la section projets
function initBackToSectionButton() {
    const backToSectionBtn = document.createElement('button');
    backToSectionBtn.className = 'back-to-section';
    backToSectionBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToSectionBtn.title = 'Remonter dans les projets';
    document.body.appendChild(backToSectionBtn);

/*
    // Afficher/masquer le bouton
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && window.scrollY > projectsSection.offsetTop) {
                backToSectionBtn.classList.add('visible');
            } else {
                backToSectionBtn.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(projectsSection);
    
    // Gérer le clic
    backToSectionBtn.addEventListener('click', () => {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Animations au défilement
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
*/
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animation spécifique pour les stats
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target.querySelector('h3'));
                }
            }
        });
    }, observerOptions);
    
    // Observer les sections à animer
    const sectionsToAnimate = document.querySelectorAll('.section, .skill, .stat');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
}

// Animation de compteur pour les stats
function animateCounter(element) {
    if (!element || element.dataset.animated) return;
    
    const text = element.textContent;
    const finalValue = parseInt(text.replace('+', ''));
    if (isNaN(finalValue)) return;
    
    const duration = 1500;
    const steps = 60;
    const increment = finalValue / steps;
    let current = 0;
    let step = 0;
    
    element.dataset.animated = 'true';
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            element.textContent = finalValue + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, duration / steps);
}

// Fonction de préchargement des images
function preloadImages() {
    if (!allProjects || !Array.isArray(allProjects)) return;
    
    allProjects.forEach(project => {
        if (project.imageUrl) {
            const img = new Image();
            img.src = project.imageUrl;
            img.onload = function() {
                console.log(`✓ Image préchargée: ${project.title}`);
            };
            img.onerror = function() {
                console.warn(`✗ Erreur de chargement: ${project.imageUrl}`);
            };
        }
    });
}

// Animation de frappe pour le titre hero
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    
    // Animation simple pour mettre en évidence le mot "expériences visuelles"
    heroTitle.innerHTML = originalText.replace(
        'expériences visuelles', 
        '<span class="highlight typing">expériences visuelles</span>'
    );
    
    // Ajouter une animation de clignotement
    const typingElement = heroTitle.querySelector('.typing');
    if (typingElement) {
        typingElement.style.animation = 'typing 3s steps(40, end), blink-caret .75s step-end infinite';
    }
}

// Afficher un message d'erreur
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #FF6584;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Débogage des catégories
function debugCategories() {
    if (!allProjects || !Array.isArray(allProjects)) return;
    
    // Vérifier les catégories uniques utilisées
    const uniqueCategories = [...new Set(allProjects.map(p => p.category))];
    console.log('Catégories utilisées dans les projets:', uniqueCategories);
    
    // Vérifier la correspondance avec categoryNames
    const categoryNames = {
        'all': 'Tous',
        'logo': 'Logo',
        'branding': 'Branding',
        'flyer': 'Flyer',
        'socialMedia': 'Social Media',
        'print': 'Print'
    };
    
    uniqueCategories.forEach(cat => {
        if (!categoryNames[cat]) {
            console.warn(`ATTENTION: La catégorie "${cat}" n'a pas de nom d'affichage défini!`);
        }
    });
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur globale:', e.message, e.filename, e.lineno);
    
    // Vous pouvez ajouter ici une logique pour gérer les erreurs spécifiques
    if (e.message.includes('Failed to load resource')) {
        console.warn('Une ressource n\'a pas pu être chargée. Vérifiez les liens d\'images.');
    }
});

// Redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Réinitialiser les transitions pour éviter les problèmes de rendu
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

// ...existing code...
// effet de typing hero section
function typeEffect(element, text, speed = 100) {
    element.textContent = '';
    let index = 0;
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            // Garder le curseur après l'animation
            element.style.borderRight = 'none';
        }
    }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        const text = highlight.textContent;
        typeEffect(highlight, text, 80);
    }
});