// projects.js - Gestion des projets, filtrage, pagination
export function initProjects() {
    console.log('🎨 Initialisation des projets...');
    
    // Variables d'état
    let allProjects = [];
    let filteredProjects = [];
    let currentPage = 1;
    const projectsPerPage = 6;
    let currentFilter = 'all';
    
    // Éléments DOM
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    // Charger les projets
    async function loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) throw new Error('Erreur de chargement des projets');
            
            allProjects = await response.json();
            filteredProjects = [...allProjects];
            
            // Initialiser le rendu
            renderProjects();
            initProjectFilter();
            
            // Cacher l'état de chargement
            const loadingElement = document.querySelector('.loading-projects');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            console.log(`✅ ${allProjects.length} projets chargés`);
            
        } catch (error) {
            console.error('❌ Erreur:', error);
            showErrorMessage('Impossible de charger les projets. Veuillez réessayer.');
            
            // Afficher un message d'erreur dans la grille
            if (projectsGrid) {
                projectsGrid.innerHTML = `
                    <div class="no-projects-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Impossible de charger les projets. Veuillez rafraîchir la page.</p>
                    </div>
                `;
            }
        }
    }
    
    // Rendre les projets
    function renderProjects(resetPagination = true) {
        if (!projectsGrid) return;
        
        // Réinitialiser la pagination si demandé
        if (resetPagination) {
            currentPage = 1;
        }
        
        // Calculer les projets à afficher
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const projectsToShow = filteredProjects.slice(startIndex, endIndex);
        
        // Vider la grille si première page
        if (currentPage === 1) {
            projectsGrid.innerHTML = '';
        }
        
        // Afficher un message si aucun projet
        if (projectsToShow.length === 0 && currentPage === 1) {
            projectsGrid.innerHTML = `
                <div class="no-projects-message">
                    <i class="fas fa-search"></i>
                    <p>Aucun projet trouvé dans cette catégorie.</p>
                </div>
            `;
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
            return;
        }
        
        // Créer et ajouter les cartes de projet
        projectsToShow.forEach((project, index) => {
            const projectCard = createProjectCard(project);
            
            // Ajouter un délai pour l'animation
            setTimeout(() => {
                projectCard.style.animationDelay = `${index * 0.1}s`;
                projectCard.classList.add('animated');
            }, 100);
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Mettre à jour le bouton "Voir plus"
        updateLoadMoreButton();
        
        // Animer l'apparition
        animateProjectsAppearance();
    }
    
    // Créer une carte de projet
    function createProjectCard(project) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.setAttribute('data-id', project.id);
        
        // Couleurs aléatoires pour les projets sans image
        const colors = ['#6C63FF', '#FF6584', '#36B37E', '#FFAB00', '#6554C0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Contenu de l'image
        let imageContent = '';
        if (project.imageUrl) {
            imageContent = `
                <img src="${project.imageUrl}" 
                     alt="${project.title}" 
                     loading="lazy"
                     class="project-img"
                     data-id="${project.id}">
                <i class="${project.icon} fallback-icon" style="display: none;"></i>
            `;
        } else {
            imageContent = `<i class="${project.icon}" style="color: ${randomColor}; font-size: 3rem;"></i>`;
        }
        
        // Catégorie formatée
        const categoryName = formatCategoryName(project.category);
        
        // HTML de la carte
        projectCard.innerHTML = `
            <div class="project-image" style="background-color: ${randomColor}20;">
                ${imageContent}
            </div>
            <div class="project-content">
                <span class="project-category" style="background-color: ${randomColor}20; color: ${randomColor};">${categoryName}</span>
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
        
        return projectCard;
    }
    
    // Gérer l'erreur d'image
    function handleImageError(imgElement, iconClass, color) {
        imgElement.style.display = 'none';
        const fallbackIcon = imgElement.nextElementSibling;
        if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
            fallbackIcon.style.display = 'block';
            fallbackIcon.style.color = color;
            fallbackIcon.style.position = 'absolute';
            fallbackIcon.style.top = '50%';
            fallbackIcon.style.left = '50%';
            fallbackIcon.style.transform = 'translate(-50%, -50%)';
        }
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
    
    // Afficher une modal avec les détails
    function showProjectModal(project) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const categoryName = formatCategoryName(project.category);
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${project.title}</h2>
                <div class="project-category">${categoryName}</div>
                <div class="modal-image">
                    ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}" loading="lazy">` : ''}
                </div>
                <p class="modal-description">${project.description}</p>
                <div class="modal-meta">
                    <div class="modal-date"><i class="far fa-calendar"></i> Projet réalisé récemment</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Afficher la modal
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Bouton de fermeture
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
        
        // Fermer en cliquant en dehors
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Fermer avec Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) modal.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }, 300);
            }
        });
    }
    
    // Initialiser le filtrage
    function initProjectFilter() {
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Gérer le bouton "Tous"
                if (filter === 'all') {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = 'all';
                } else {
                    // Toggle du bouton cliqué
                    this.classList.toggle('active');
                    
                    // Désactiver "Tous" si une catégorie est sélectionnée
                    const allBtn = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === 'all');
                    if (allBtn) allBtn.classList.remove('active');
                    
                    // Si plus aucune catégorie n'est active, réactiver "Tous"
                    const anyActive = Array.from(filterButtons).some(btn => btn.classList.contains('active'));
                    if (!anyActive && allBtn) {
                        allBtn.classList.add('active');
                        currentFilter = 'all';
                    } else {
                        currentFilter = getCurrentFilter();
                    }
                }
                
                // Appliquer le filtre
                applyFilter(currentFilter);
            });
        });
    }
    
    // Appliquer le filtre
    function applyFilter(filter) {
        if (filter === 'all') {
            filteredProjects = [...allProjects];
        } else {
            filteredProjects = allProjects.filter(project => {
                if (Array.isArray(filter)) {
                    return filter.includes(project.category);
                }
                return project.category === filter;
            });
        }
        
        // Re-rendre les projets
        renderProjects(true);
    }
    
    // Obtenir le filtre actuel
    function getCurrentFilter() {
        const activeButtons = Array.from(filterButtons).filter(btn => btn.classList.contains('active'));
        if (activeButtons.length === 0) return 'all';
        
        const activeFilters = activeButtons.map(btn => btn.getAttribute('data-filter'));
        if (activeFilters.includes('all')) return 'all';
        
        return activeFilters;
    }
    
    // Mettre à jour le bouton "Voir plus"
    function updateLoadMoreButton() {
        if (!loadMoreContainer) return;
        
        const totalProjects = filteredProjects.length;
        const projectsShown = Math.min(currentPage * projectsPerPage, totalProjects);
        const hasMoreProjects = projectsShown < totalProjects;
        
        if (hasMoreProjects && totalProjects > 0) {
            loadMoreContainer.style.display = 'block';
            loadMoreContainer.innerHTML = `
                <button id="loadMoreBtn" class="btn btn-secondary">
                    <i class="fas fa-plus"></i> Voir plus de projets (${projectsShown}/${totalProjects})
                </button>
                <p class="projects-count">Affichage de ${projectsShown} projets sur ${totalProjects}</p>
            `;
            
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            loadMoreBtn.addEventListener('click', loadMoreProjects);
        } else if (totalProjects > 0) {
            loadMoreContainer.style.display = 'block';
            loadMoreContainer.innerHTML = `
                <p class="all-projects-shown">
                    <i class="fas fa-check-circle"></i> Tous les projets sont affichés (${totalProjects} projets)
                </p>
            `;
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
    
    // Charger plus de projets
    function loadMoreProjects() {
        currentPage++;
        renderProjects(false);
        
        // Défiler vers les nouveaux projets
        setTimeout(() => {
            const projectCards = document.querySelectorAll('.project-card');
            const newCardIndex = (currentPage - 2) * projectsPerPage;
            if (projectCards[newCardIndex]) {
                projectCards[newCardIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
    
    // Animer l'apparition des projets
    function animateProjectsAppearance() {
        const projectCards = document.querySelectorAll('.project-card');
        const startIndex = (currentPage - 1) * projectsPerPage;
        
        projectCards.forEach((card, index) => {
            if (index >= startIndex - projectsPerPage) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, (index - (startIndex - projectsPerPage)) * 100);
            }
        });
    }
    
    // Formater le nom de la catégorie
    function formatCategoryName(category) {
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
    
    // Afficher un message d'erreur
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) errorDiv.remove();
        }, 5000);
    }
    
    // Démarrer le chargement des projets
    loadProjects();
}