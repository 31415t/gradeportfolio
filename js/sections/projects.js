// sections/projects.js - Version avec solution/brief

export function renderProjects() {
  return `
    <section class="section projects" id="projets">
      <div class="container">
        <h2 class="section-title">Mon <span>Portfolio</span></h2>
        <p class="section-subtitle">Explorez ici une sélection de mes travaux récents en graphic design</p>
        
        <div class="projects-filter">
          <button class="filter-btn active" data-filter="all">Tous</button>
          <button class="filter-btn" data-filter="logo">Logo</button>
          <button class="filter-btn" data-filter="branding">Branding</button>
          <button class="filter-btn" data-filter="flyer">Flyer</button>
          <button class="filter-btn" data-filter="socialMedia">Social Media</button>
          <button class="filter-btn" data-filter="print">Print</button>
          <button class="filter-btn" data-filter="mockup">Mockup</button>
          <button class="filter-btn" data-filter="illustration">Illustration</button>
          <button class="filter-btn" data-filter="autre">Autres</button>
        </div>
        
        <div class="projects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10" id="projectsGrid">
          <div class="loading-projects col-span-full flex flex-col items-center justify-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p>Chargement des projets...</p>
          </div>
        </div>
        
        <!-- Conteneur de pagination -->
        <div class="pagination-container mt-12" id="paginationContainer" style="display: none;">
        </div>
      </div>
    </section>
  `;
}

export function initProjects() {
  console.log('🎨 Initialisation des projets...');

  // Variables d'état
  let allProjects = [];
  let filteredProjects = [];
  let currentPage = 1;
  const projectsPerPage = 6;
  let currentFilter = 'all';
  let totalPages = 1;

  // Éléments DOM
  const projectsGrid = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const paginationContainer = document.getElementById('paginationContainer');

  // Charger les projets
  async function loadProjects() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Erreur de chargement des projets');

      allProjects = await response.json();
      filteredProjects = [...allProjects];
      
      totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

      renderProjectsData();
      initProjectFilter();
      updateFilterCounts();

      const loadingElement = document.querySelector('.loading-projects');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }

      console.log(`✅ ${allProjects.length} projets chargés`);
    } catch (error) {
      console.error('❌ Erreur:', error);
      showErrorMessage('Impossible de charger les projets. Veuillez réessayer.');

      if (projectsGrid) {
        projectsGrid.innerHTML = `
          <div class="no-projects-message col-span-full">
            <i class="fas fa-exclamation-circle"></i>
            <p>Impossible de charger les projets. Veuillez rafraîchir la page.</p>
          </div>
        `;
      }
    }
  }

  // Rendre les projets
  function renderProjectsData(resetPage = true) {
    if (!projectsGrid) return;

    if (resetPage) {
      currentPage = 1;
    }

    totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, filteredProjects.length);
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);

    projectsGrid.innerHTML = '';

    if (projectsToShow.length === 0) {
      projectsGrid.innerHTML = `
        <div class="no-projects-message col-span-full">
          <i class="fas fa-search"></i>
          <p>Aucun projet trouvé dans cette catégorie.</p>
        </div>
      `;
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    }

    projectsToShow.forEach((project, index) => {
      const projectCard = createProjectCard(project);
      
      projectCard.style.opacity = '0';
      projectCard.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        projectCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
      }, index * 100);

      projectsGrid.appendChild(projectCard);
    });

    updatePagination();
  }

  // ==================== MODAL UNIQUE (Image + Info) ====================
  
  function showProjectModal(project, mode = 'image') {
    const modal = document.createElement('div');
    modal.className =
      'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm';
    modal.setAttribute('id', 'project-modal');

    // Récupérer les données selon le mode
    const {
      title = 'Projet sans titre',
      category = 'autre',
      solution = 'Solution non spécifiée',
      brief = 'Aucun brief fourni',
      imageUrl = null,
      client = {
        name: 'Client non spécifié',
        profile: 'fas fa-user',
        date: new Date().toLocaleDateString('fr-FR')
      },
      technologies = []
    } = project;

    // Couleur pour la catégorie
    const categoryColors = {
      logo: '#6C63FF',
      branding: '#FF6584',
      flyer: '#36B37E',
      socialMedia: '#FFAB00',
      print: '#6554C0',
      mockup: '#F95606',
      illustration: '#FF8A5C',
      autre: '#888888'
    };
    
    const categoryColor = categoryColors[category] || '#F95606';
    const categoryName = formatCategoryName(category);
    
    // Formater la date
    let formattedDate = client.date;
    if (client.date && !isNaN(new Date(client.date))) {
      formattedDate = new Date(client.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    // Contenu selon le mode
    let modalContent = '';

    if (mode === 'image') {
      // Mode IMAGE (comportement original)
      modalContent = `
        <div class="relative bg-white rounded-lg overflow-hidden animate-fade-in border-2 
                    inline-block max-w-[90vw] max-h-[80vh]"
            style="border-color: #F95606;">
          
          <!-- Bouton fermeture -->
          <button class="modal-close absolute top-4 right-4 z-10 bg-light/80 rounded-full p-2 
                        hover:bg-gray-200 transition duration-300 shadow-lg backdrop-blur-lg backdrop-saturate-150"
                  aria-label="Fermer la modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Image -->
          <div class="bg-gray-100 flex items-center justify-center">
            ${
              imageUrl
                ? `<img src="${imageUrl}" alt="${title}" 
                        class="object-contain" style="max-width: 80vw; max-height: 70vh;">`
                : `<div class="text-center py-20">
                    <i class="fas fa-image text-6xl text-gray-300"></i>
                  </div>`
            }
          </div>
        </div>
      `;
    } else {
      // Mode INFO (style message client)
      modalContent = `
        <div class="relative bg-white rounded-2xl overflow-hidden animate-fade-in max-w-md w-full mx-4 shadow-2xl"
            style="border: 1px solid ${categoryColor}20;">
          
          <!-- Bouton fermeture (seul, en haut à droite) -->
          <button class="modal-close absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center z-10">
            <i class="fas fa-times text-gray-500"></i>
          </button>
          
          <!-- En-tête avec juste le nom du client -->
          <div class="px-6 pt-8 pb-2 text-center">
            <h3 class="font-semibold text-gray-800">${client.name}</h3>
            <span class="text-xs text-gray-400">${categoryName}</span>
          </div>
          
          <!-- Corps - Message client uniquement -->
          <div class="px-6 py-4">
            <div class="inline-block max-w-[90%] rounded-2xl px-5 py-4 text-sm"
                style="background-color: #f0f0f0; color: #1a1a1a; border-bottom-left-radius: 4px;">
              <p class="leading-relaxed whitespace-pre-line">"${brief}"</p>
            </div>
            <div class="flex items-center gap-1 mt-2 ml-2">
              <span class="text-xs text-gray-400">${formattedDate}</span>
              <span class="text-xs text-gray-400">
                <i class="fas fa-check-double" style="color: ${categoryColor};"></i>
              </span>
            </div>
          </div>
          
          <!-- Pied avec titre du projet (discret) -->
          <div class="px-6 py-3 border-t border-gray-100 text-center text-xs text-gray-400">
            Projet: ${project.title}
          </div>
        </div>
      `;
    }

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Gestionnaires de fermeture (identiques pour les deux modes)
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.remove();
        document.body.classList.remove('modal-open');
        
        // Réinitialiser l'icône du bouton info si nécessaire
        if (mode === 'info') {
          document.querySelectorAll('.info-toggle[data-modal-open="true"]').forEach(btn => {
            btn.setAttribute('data-modal-open', 'false');
            const icon = btn.querySelector('i');
            if (icon) {
              icon.className = 'fas fa-chevron-down text-xs';
            }
          });
        }
      });
    });

    // Fermer en cliquant sur l'overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
        
        if (mode === 'info') {
          document.querySelectorAll('.info-toggle[data-modal-open="true"]').forEach(btn => {
            btn.setAttribute('data-modal-open', 'false');
            const icon = btn.querySelector('i');
            if (icon) {
              icon.className = 'fas fa-chevron-down text-xs';
            }
          });
        }
      }
    });

    // Fermer avec Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleEscape);
        
        if (mode === 'info') {
          document.querySelectorAll('.info-toggle[data-modal-open="true"]').forEach(btn => {
            btn.setAttribute('data-modal-open', 'false');
            const icon = btn.querySelector('i');
            if (icon) {
              icon.className = 'fas fa-chevron-down text-xs';
            }
          });
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Créer une carte de projet
  function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className =
      'rounded overflow-hidden shadow-lg flex flex-col h-full hover:shadow-2xl transition-shadow duration-300 relative';
    projectCard.setAttribute('data-category', project.category);
    projectCard.setAttribute('data-id', project.id);

    // Couleurs pour les catégories
    const colors = ['#6C63FF', '#FF6584', '#36B37E', '#FFAB00', '#6554C0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const primaryColor = '#F95606';

    // Catégorie formatée
    const categoryName = formatCategoryName(project.category);

    // Vérifier si le projet est liké
    const likedProjects = JSON.parse(
      localStorage.getItem('likedProjects') || '[]',
    );
    const isLiked = likedProjects.includes(project.id);

    // Contenu de l'image
    let imageContent = '';
    if (project.imageUrl) {
      imageContent = `
        <img src="${project.imageUrl}" 
             alt="${project.title}" 
             loading="lazy"
             class="project-img w-full h-56 object-cover"
             data-id="${project.id}">
      `;
    } else {
      imageContent = `
        <div class="w-full h-56 flex items-center justify-center" style="background-color: ${randomColor}20;">
          <i class="${project.icon}" style="color: ${randomColor}; font-size: 3rem;"></i>
        </div>
      `;
    }

    // HTML de la carte avec SOLUTION au lieu de description
    projectCard.innerHTML = `
    <div class="relative flex-shrink-0">
      <!-- Image + overlay -->
      <div class="relative overflow-hidden bg-gray h-56">
        ${imageContent}
        <div class="transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-dark opacity-0 hover-accent pointer-events-none"></div>
      </div>

      <!-- Badge catégorie -->
      <div class="text-xs absolute top-0 right-0 px-3 py-1 mt-3 mr-3 font-medium rounded border pointer-events-none bg-light text-secondary"
          style="border-color: ${randomColor}; color: ${randomColor};">
        ${categoryName}
      </div>
    </div>

    <!-- Contenu -->
    <div class="px-6 py-4 mb-auto flex-grow">
      <h3 class="font-medium text-lg mb-2" style="color: ${randomColor};">
        ${project.title}
      </h3>
      <!-- Affichage de la SOLUTION (courte) -->
      <p class="text-gray-600 text-sm leading-relaxed">
        ${project.solution || project.description || 'Aucune description'}
      </p>
    </div>

    <!-- Footer avec les boutons -->
    <div class="px-6 py-3 flex flex-row items-center justify-between bg-light border-t border-neutral">
      <!-- Groupe de gauche : like + info -->
      <div class="flex items-center gap-2">
        <!-- Bouton like -->
        <button class="like-btn w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                data-id="${project.id}">
          <i class="fas fa-heart" style="color: ${isLiked ? primaryColor : 'transparent'}; -webkit-text-stroke: 2px ${primaryColor};"></i>
        </button>
        
        <!-- Bouton info avec flèche - OUVRE LE BRIEF CLIENT -->
        <button class="info-toggle w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                data-modal-open="false"
                aria-label="Voir le brief client">
          <i class="fas fa-chevron-down text-xs" style="color: ${randomColor};"></i>
        </button>
      </div>

      <!-- Bouton voir (image) -->
      <button class="view-project-btn py-2 px-4 btn-secondary text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group/view">
        <span>Voir</span>
        <i class="fas fa-arrow-right text-xs opacity-100 -translate-x-2 group-hover/view:opacity-100 group-hover/view:translate-x-0 transition-all duration-300"></i>
      </button>
    </div>
    `;

    // ========== GESTIONNAIRES D'ÉVÉNEMENTS ==========

    // EVENT: Bouton info (ouvre le modal en mode 'info' avec le brief)
    const infoBtn = projectCard.querySelector('.info-toggle');
    if (infoBtn) {
      infoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = this.getAttribute('data-modal-open') === 'true';
        const icon = this.querySelector('i');
        
        if (!isOpen) {
          this.setAttribute('data-modal-open', 'true');
          icon.className = 'fas fa-chevron-up text-xs';
          showProjectModal(project, 'info');
        }
      });
    }

    // EVENT: Bouton J'aime
    const likeBtn = projectCard.querySelector('.like-btn');
    if (likeBtn) {
      updateLikeUI(likeBtn, project.id, randomColor);

      likeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        const projectId = parseInt(project.id);
        const likedProjects = JSON.parse(
          localStorage.getItem('likedProjects') || '[]',
        );
        const likeIcon = this.querySelector('i');

        if (likedProjects.includes(projectId)) {
          const index = likedProjects.indexOf(projectId);
          likedProjects.splice(index, 1);
          likeIcon.style.color = '#ccc';
        } else {
          likedProjects.push(projectId);
          likeIcon.style.color = primaryColor;
        }

        localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
        updateLikeUI(this, projectId, randomColor);
      });
    }

    // EVENT: Bouton Voir (ouvre le modal en mode 'image')
    const viewBtn = projectCard.querySelector('.view-project-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        showProjectModal(project, 'image');
      });
    }

    // Gestionnaire clique sur image
    const projectImg = projectCard.querySelector('.project-img');
    if (projectImg) {
      projectImg.style.cursor = 'pointer';
      projectImg.addEventListener('click', function (e) {
        e.preventDefault();
        showProjectModal(project, 'image');
      });

      projectImg.addEventListener('error', function () {
        this.style.display = 'none';
        const parent = this.parentElement;
        const fallback = document.createElement('div');
        fallback.className = 'w-full h-56 flex items-center justify-center';
        fallback.style.backgroundColor = randomColor + '20';
        fallback.innerHTML = `<i class="${project.icon}" style="color: ${randomColor}; font-size: 3rem;"></i>`;
        parent.appendChild(fallback);
      });
    }

    return projectCard;
  }

  // ==================== PAGINATION ====================
  
  function updatePagination() {
    if (!paginationContainer) return;

    if (totalPages <= 1 || filteredProjects.length === 0) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'block';
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    let paginationHTML = `
      <div class="flex flex-col items-center space-y-4">
        <div class="text-sm text-gray-600">
          Page ${currentPage} sur ${totalPages} · 
          <span class="font-medium">${filteredProjects.length} projets au total</span>
        </div>
        
        <div class="flex items-center space-x-2">
    `;

    // Bouton Précédent
    paginationHTML += `
      <button class="pagination-btn prev-btn px-4 py-2 rounded-lg border border-gray-300 
                     ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200'}"
              ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left mr-1"></i>
        Précédent
      </button>
    `;

    // Numéros de pages
    paginationHTML += `<div class="hidden sm:flex items-center space-x-2">`;
    
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button class="pagination-btn page-btn w-10 h-10 rounded-lg 
                       ${i === currentPage 
                         ? 'bg-orange-500 text-white font-semibold' 
                         : 'border border-gray-300 hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200'}"
                data-page="${i}">
          ${i}
        </button>
      `;
    }
    
    paginationHTML += `</div>`;

    // Bouton Suivant
    paginationHTML += `
      <button class="pagination-btn next-btn px-4 py-2 rounded-lg border border-gray-300
                     ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'hover:bg-orange-50 hover:border-orange-300 transition-colors duration-200'}"
              ${currentPage === totalPages ? 'disabled' : ''}>
        Suivant
        <i class="fas fa-chevron-right ml-1"></i>
      </button>
    `;

    paginationHTML += `
        </div>
        <div class="sm:hidden text-sm text-gray-500">
          ${currentPage}/${totalPages}
        </div>
      </div>
    `;

    paginationContainer.innerHTML = paginationHTML;
    attachPaginationEvents();
  }

  function attachPaginationEvents() {
    const prevBtn = paginationContainer.querySelector('.prev-btn');
    if (prevBtn && !prevBtn.disabled) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderProjectsData(false);
          document.getElementById('projets').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      });
    }

    const nextBtn = paginationContainer.querySelector('.next-btn');
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderProjectsData(false);
          document.getElementById('projets').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      });
    }

    const pageBtns = paginationContainer.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (page !== currentPage) {
          currentPage = page;
          renderProjectsData(false);
          document.getElementById('projets').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      });
    });
  }

  // ==================== FILTRES ====================

  function initProjectFilter() {
    if (!filterButtons.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        if (filter === 'all') {
          filterButtons.forEach((btn) => btn.classList.remove('active'));
          this.classList.add('active');
          currentFilter = 'all';
        } else {
          this.classList.toggle('active');

          const allBtn = Array.from(filterButtons).find(
            (btn) => btn.getAttribute('data-filter') === 'all',
          );
          if (allBtn) allBtn.classList.remove('active');

          const anyActive = Array.from(filterButtons).some((btn) =>
            btn.classList.contains('active'),
          );
          if (!anyActive && allBtn) {
            allBtn.classList.add('active');
            currentFilter = 'all';
          } else {
            currentFilter = getCurrentFilter();
          }
        }

        applyFilter(currentFilter);
      });
    });
  }

  function applyFilter(filter) {
    if (filter === 'all') {
      filteredProjects = [...allProjects];
    } else {
      filteredProjects = allProjects.filter((project) => {
        if (Array.isArray(filter)) {
          return filter.includes(project.category);
        }
        return project.category === filter;
      });
    }

    renderProjectsData(true);
  }

  function getCurrentFilter() {
    const activeButtons = Array.from(filterButtons).filter((btn) =>
      btn.classList.contains('active'),
    );
    if (activeButtons.length === 0) return 'all';

    const activeFilters = activeButtons.map((btn) =>
      btn.getAttribute('data-filter'),
    );
    if (activeFilters.includes('all')) return 'all';

    return activeFilters;
  }

  // ==================== FONCTIONS UTILITAIRES ====================

  function updateLikeUI(likeBtn, projectId, color) {
    const primaryColor = '#F95606';
    const likedProjects = JSON.parse(
      localStorage.getItem('likedProjects') || '[]',
    );
    const isLiked = likedProjects.includes(parseInt(projectId));
    const likeIcon = likeBtn.querySelector('i');

    if (isLiked) {
      likeIcon.style.color = primaryColor;
      likeIcon.style.webkitTextStroke = `2px ${primaryColor}`;
    } else {
      likeIcon.style.color = 'transparent';
      likeIcon.style.webkitTextStroke = `2px ${primaryColor}`;
    }
  }

  function formatCategoryName(category) {
    const categoryNames = {
      all: 'Tous',
      logo: 'Logo',
      branding: 'Branding',
      flyer: 'Flyer',
      socialMedia: 'Social Media',
      print: 'Print',
      mockup: 'Mockup',
      autre: 'Autres',
      illustration: 'Illustration',
    };

    return categoryNames[category] || category;
  }

  function updateFilterCounts() {
    if (!filterButtons.length || !allProjects.length) return;
    
    const counts = {
      all: allProjects.length,
      logo: allProjects.filter(p => p.category === 'logo').length,
      branding: allProjects.filter(p => p.category === 'branding').length,
      flyer: allProjects.filter(p => p.category === 'flyer').length,
      socialMedia: allProjects.filter(p => p.category === 'socialMedia').length,
      print: allProjects.filter(p => p.category === 'print').length,
      mockup: allProjects.filter(p => p.category === 'mockup').length,
      illustration: allProjects.filter(p => p.category === 'illustration').length,
      autre: allProjects.filter(p => p.category === 'autre').length
    };
    
    filterButtons.forEach(button => {
      const filter = button.getAttribute('data-filter');
      const count = counts[filter] || 0;
      const categoryName = formatCategoryName(filter);
      
      button.innerHTML = `${categoryName}<span class="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">${count}</span>`;
    });
  }

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