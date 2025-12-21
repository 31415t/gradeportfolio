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
    filteredProjects = filter === 'all' 
        ? [...allProjects] 
        : allProjects.filter(project => project.category === filter);
    
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
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.getAttribute('data-filter') : 'all';
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
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les projets (avec réinitialisation de la pagination)
            const filter = this.getAttribute('data-filter');
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