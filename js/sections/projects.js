// sections/projects.js - Génération HTML + Gestion des projets, filtrage, pagination

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
        
        <div class="load-more-container" id="loadMoreContainer" style="display: none;">
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
      renderProjectsData();
      initProjectFilter();

      // Cacher l'état de chargement
      const loadingElement = document.querySelector('.loading-projects');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }

      console.log(`✅ ${allProjects.length} projets chargés`);
    } catch (error) {
      console.error('❌ Erreur:', error);
      showErrorMessage(
        'Impossible de charger les projets. Veuillez réessayer.',
      );

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
  function renderProjectsData(resetPagination = true) {
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
    projectCard.className =
      'rounded overflow-hidden shadow-lg flex flex-col h-full hover:shadow-2xl transition-shadow duration-300';
    projectCard.setAttribute('data-category', project.category);
    projectCard.setAttribute('data-id', project.id);

    // Couleurs pour les catégories
    const colors = ['#6C63FF', '#FF6584', '#36B37E', '#FFAB00', '#6554C0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const primaryColor = '#F95606'; // Orange depuis styles.css

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

    // HTML de la carte
    projectCard.innerHTML = `
      <div class="relative flex-shrink-0">
        <div class="relative overflow-hidden bg-gray-100 h-56">
          ${imageContent}
          <!-- Overlay au hover -->
          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0 hover:opacity-20 pointer-events-none"></div>
        </div>
        <!-- Badge catégorie discret -->
        <div class="text-xs absolute top-0 right-0 px-3 py-1 mt-3 mr-3 font-medium rounded border pointer-events-none  bg-light/80 backdrop-blur-lg backdrop-brightness-150" 
             style="border-color: ${randomColor}; color: ${randomColor};">
          ${categoryName}
        </div>
      </div>

      <!-- Contenu -->
      <div class="px-6 py-4 mb-auto flex-grow">
        <h3 class="font-medium text-lg hover:text-primary transition duration-500 ease-in-out mb-2">
          ${project.title}
        </h3>
        <p class="text-gray-500 text-sm line-clamp-2">
          ${project.description}
        </p>
      </div>

      <!-- Footer -->
      <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-50 border-t border-gray-200">
        <button class="like-btn py-1 px-3 text-sm font-semibold flex flex-row items-center transition duration-300" 
                data-id="${project.id}">
          <i class="fas fa-heart" style="color: ${isLiked ? primaryColor : 'transparent'}; -webkit-text-stroke: 2px ${primaryColor};"></i>
        </button>
        
        <button class="view-project-btn py-2 px-4 text-sm font-semibold text-white rounded transition duration-300 hover:shadow-lg"
                style="background-color: ${primaryColor};"
                data-id="${project.id}">
          <i class="fas fa-eye"></i> Voir
        </button>
      </div>
    `;

    // EVENT: Bouton J'aime
    const likeBtn = projectCard.querySelector('.like-btn');
    const likeIcon = likeBtn.querySelector('i');
    if (likeBtn) {
      updateLikeUI(likeBtn, project.id, randomColor);

      likeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = parseInt(project.id);
        const likedProjects = JSON.parse(
          localStorage.getItem('likedProjects') || '[]',
        );

        if (likedProjects.includes(projectId)) {
          // Retirer du liked
          const index = likedProjects.indexOf(projectId);
          likedProjects.splice(index, 1);
          likeIcon.style.color = '#ccc';
        } else {
          // Ajouter au liked
          likedProjects.push(projectId);
          likeIcon.style.color = randomColor;
        }

        localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
        updateLikeUI(likeBtn, projectId, randomColor);
      });
    }

    // EVENT: Bouton Voir le projet
    const viewBtn = projectCard.querySelector('.view-project-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-id');
        showProjectModal(project);
      });
    }

    // Gestionnaire clique sur image + erreur d'image
    const projectImg = projectCard.querySelector('.project-img');
    if (projectImg) {
      // Rendre l'image cliquable pour ouvrir le modal
      projectImg.style.cursor = 'pointer';
      projectImg.addEventListener('click', function (e) {
        e.preventDefault();
        showProjectModal(project);
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

  // Mettre à jour l'UI du like
  function updateLikeUI(likeBtn, projectId, color) {
    const primaryColor = '#F95606'; // Orange
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
    const project = allProjects.find((p) => p.id == projectId);
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

  // Afficher une modal de projet
  function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className =
      'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm';
    modal.setAttribute('id', 'project-modal');

    modal.innerHTML = `
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
          project.imageUrl
            ? `<img src="${project.imageUrl}" alt="${project.title}" 
                    class="object-contain" style="max-width: 80vw; max-height: 70vh;">`
            : `<div class="text-center py-20">
                <i class="fas fa-image text-6xl text-gray-300"></i>
              </div>`
        }
      </div>
    </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Bouton fermeture
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      modal.remove();
      document.body.classList.remove('modal-open');
    });

    // Fermer en cliquant en dehors
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
      }
    });

    // Fermer avec Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Initialiser le filtrage
  function initProjectFilter() {
    if (!filterButtons.length) return;

    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Gérer le bouton "Tous"
        if (filter === 'all') {
          filterButtons.forEach((btn) => btn.classList.remove('active'));
          this.classList.add('active');
          currentFilter = 'all';
        } else {
          // Toggle du bouton cliqué
          this.classList.toggle('active');

          // Désactiver "Tous" si une catégorie est sélectionnée
          const allBtn = Array.from(filterButtons).find(
            (btn) => btn.getAttribute('data-filter') === 'all',
          );
          if (allBtn) allBtn.classList.remove('active');

          // Si plus aucune catégorie n'est active, réactiver "Tous"
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
      filteredProjects = allProjects.filter((project) => {
        if (Array.isArray(filter)) {
          return filter.includes(project.category);
        }
        return project.category === filter;
      });
    }

    // Re-rendre les projets
    renderProjectsData(true);
  }

  // Obtenir le filtre actuel
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

  // Mettre à jour le bouton "Voir plus"
  function updateLoadMoreButton() {
    if (!loadMoreContainer) return;

    const totalProjects = filteredProjects.length;
    const projectsShown = Math.min(
      currentPage * projectsPerPage,
      totalProjects,
    );
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
    renderProjectsData(false);

    // Défiler vers les nouveaux projets
    setTimeout(() => {
      const projectCards = document.querySelectorAll('.project-card');
      const newCardIndex = (currentPage - 2) * projectsPerPage;
      if (projectCards[newCardIndex]) {
        projectCards[newCardIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
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

        setTimeout(
          () => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          },
          (index - (startIndex - projectsPerPage)) * 100,
        );
      }
    });
  }

  // Formater le nom de la catégorie
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
