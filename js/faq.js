// faq.js - Gestion de la page FAQ (à charger uniquement sur faq.html)

// Variables globales pour les données FAQ
let faqData = [];
let faqCategories = [];
let faqContactInfo = {};

console.log('❓ Initialisation de la FAQ...');

// Charger les données FAQ depuis le fichier JSON
async function loadFAQData() {
    try {
        const response = await fetch('data/faq.json');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        faqData = data.questions || [];
        faqCategories = data.categories || [];
        faqContactInfo = data.contactInfo || {};
        
        console.log(`✅ ${faqData.length} questions chargées depuis FAQ.json`);
        console.log(`✅ ${faqCategories.length} catégories chargées`);
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur de chargement des données FAQ:', error);
        
        // Données de secours en cas d'erreur
        faqData = getFallbackFAQData();
        faqCategories = getFallbackCategories();
        faqContactInfo = getFallbackContactInfo();
        
        console.log('⚠️ Utilisation des données de secours');
        
        return false;
    }
}

// Données de secours
function getFallbackFAQData() {
    return [
        {
            id: 1,
            category: "general",
            question: "Quels types de projets acceptez-vous ?",
            answer: "Je travaille sur une large gamme de projets incluant la création de logos, le branding complet, le design de supports print (flyers, affiches, cartes de visite), les visuels pour réseaux sociaux, les mockups, et les illustrations. Je suis également ouvert aux projets de formation en design graphique.",
            tags: ["projets", "services"]
        }
    ];
}

function getFallbackCategories() {
    return [
        { id: 'all', name: 'Toutes les questions', description: '' },
        { id: 'general', name: 'Général', description: 'Questions générales' }
    ];
}

function getFallbackContactInfo() {
    return {
        email: "peterleyauguste@gmail.com",
        phone: "+509 41 97 53 92"
    };
}

// Initialiser la FAQ
async function initFAQ() {
    console.log('🔧 Initialisation de la FAQ...');
    
    // Vérifier qu'on est sur la page FAQ
    if (!document.querySelector('.faq-container')) {
        console.log('ℹ️ Page FAQ non détectée, arrêt de l\'initialisation.');
        return;
    }
    
    // Afficher un état de chargement
    showLoadingState();
    
    try {
        // Charger les données
        const dataLoaded = await loadFAQData();
        
        if (!dataLoaded || faqData.length === 0) {
            throw new Error('Aucune donnée FAQ disponible');
        }
        
        // Créer l'interface
        createCategoryButtons();
        createFAQItems('all');
        initFAQSearch();
        
        // Cacher l'état de chargement
        hideLoadingState();
        
        // Mettre à jour les statistiques
        updateFAQStats();
        
        console.log('✅ FAQ initialisée avec succès');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de la FAQ:', error);
        showErrorState('Impossible de charger les questions fréquentes. Veuillez réessayer plus tard.');
    }
}

// Afficher l'état de chargement
function showLoadingState() {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    
    faqList.innerHTML = `
        <div class="loading-questions">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Chargement des questions...</p>
        </div>
    `;
}

// Cacher l'état de chargement
function hideLoadingState() {
    const loadingElement = document.querySelector('.loading-questions');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Afficher un état d'erreur
function showErrorState(message) {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    
    faqList.innerHTML = `
        <div class="faq-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button class="btn btn-secondary" id="retryFAQ">
                <i class="fas fa-redo"></i> Réessayer
            </button>
        </div>
    `;
    
    // Bouton de réessai
    const retryBtn = document.getElementById('retryFAQ');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            initFAQ();
        });
    }
}

// Créer les boutons de catégorie (SANS doublon "Toutes les questions")
function createCategoryButtons() {
    const categoriesContainer = document.getElementById('faqCategories');
    if (!categoriesContainer) return;
    
    // Vider le conteneur
    categoriesContainer.innerHTML = '';
    
    // Ne pas ajouter la catégorie "all" si elle existe déjà dans les données
    const filteredCategories = faqCategories.filter(cat => cat.id !== 'all');
    
    // Ajouter d'abord "Toutes les questions" manuellement
    const allButton = document.createElement('button');
    allButton.className = 'faq-category-btn active';
    allButton.textContent = 'Toutes les questions';
    allButton.setAttribute('data-category', 'all');
    
    allButton.addEventListener('click', () => {
        // Mettre à jour les boutons actifs
        document.querySelectorAll('.faq-category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        allButton.classList.add('active');
        
        // Filtrer les questions
        createFAQItems('all');
        
        // Effacer la recherche
        const searchInput = document.querySelector('.faq-search');
        if (searchInput) {
            searchInput.value = '';
            const clearBtn = searchInput.parentNode.querySelector('.search-clear');
            if (clearBtn) clearBtn.style.display = 'none';
        }
        
        // Réinitialiser le compteur
        updateResultsCount('all');
    });
    
    categoriesContainer.appendChild(allButton);
    
    // Ajouter les autres catégories
    filteredCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'faq-category-btn';
        button.textContent = category.name;
        button.setAttribute('data-category', category.id);
        
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            document.querySelectorAll('.faq-category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Filtrer les questions
            createFAQItems(category.id);
            
            // Effacer la recherche
            const searchInput = document.querySelector('.faq-search');
            if (searchInput) {
                searchInput.value = '';
                const clearBtn = searchInput.parentNode.querySelector('.search-clear');
                if (clearBtn) clearBtn.style.display = 'none';
            }
            
            // Réinitialiser le compteur
            updateResultsCount(category.id);
        });
        
        categoriesContainer.appendChild(button);
    });
}

// Créer les items FAQ
function createFAQItems(categoryId) {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    
    // Filtrer les questions
    let filteredQuestions = faqData;
    if (categoryId !== 'all') {
        filteredQuestions = faqData.filter(item => item.category === categoryId);
    }
    
    // Réinitialiser le highlight
    removeHighlights();
    
    // Afficher un message si aucune question
    if (filteredQuestions.length === 0) {
        faqList.innerHTML = `
            <div class="faq-empty">
                <i class="fas fa-question-circle"></i>
                <p>Aucune question trouvée dans cette catégorie.</p>
                <p class="small">Essayez une autre catégorie ou contactez-moi directement.</p>
            </div>
        `;
        updateResultsCount(categoryId, 0);
        return;
    }
    
    // Créer les items
    faqList.innerHTML = '';
    
    filteredQuestions.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.setAttribute('data-category', item.category);
        faqItem.setAttribute('data-id', item.id);
        
        faqItem.innerHTML = `
            <div class="faq-question">
                <div class="faq-question-content">
                    <span class="faq-text">${item.question}</span>
                </div>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-content">
                    ${formatAnswer(item.answer)}
                </div>
            </div>
        `;
        
        // Gérer le clic sur la question
        const questionElement = faqItem.querySelector('.faq-question');
        questionElement.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            
            // Fermer tous les autres items
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Basculer l'état de l'item courant
            faqItem.classList.toggle('active');
        });
        
        faqList.appendChild(faqItem);
    });
    
    // Mettre à jour le compteur
    updateResultsCount(categoryId, filteredQuestions.length);
}

// Formater la réponse (format cohérent)
function formatAnswer(answer) {
    if (!answer) return '<p>Aucune réponse disponible.</p>';
    
    // Nettoyer le texte
    const cleanAnswer = answer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **texte** en <strong>
        .replace(/\n\n/g, '</p><p>') // Double saut de ligne = nouveau paragraphe
        .replace(/\n/g, '<br>'); // Saut simple = <br>
    
    return `<p>${cleanAnswer}</p>`;
}

// Initialiser la recherche
function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search');
    const searchClear = document.querySelector('.search-clear');
    
    if (!searchInput) return;
    
    // Gérer le bouton effacer UNIQUE
    if (searchClear) {
        searchClear.addEventListener('click', clearSearch);
    }
    
    // Recherche en temps réel
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Afficher/masquer le bouton effacer
            if (searchClear) {
                searchClear.style.display = searchTerm ? 'block' : 'none';
            }
            
            if (searchTerm.length === 0) {
                // Réinitialiser l'affichage
                const activeCategory = document.querySelector('.faq-category-btn.active');
                if (activeCategory) {
                    const categoryId = activeCategory.getAttribute('data-category');
                    createFAQItems(categoryId);
                }
                return;
            }
            
            // Filtrer les questions
            filterFAQBySearch(searchTerm);
        }, 300);
    });
    
    // Effacer avec Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            if (searchClear) searchClear.style.display = 'none';
            const activeCategory = document.querySelector('.faq-category-btn.active');
            if (activeCategory) {
                const categoryId = activeCategory.getAttribute('data-category');
                createFAQItems(categoryId);
            }
        }
    });
}

// Effacer la recherche
function clearSearch() {
    const searchInput = document.querySelector('.faq-search');
    const searchClear = document.querySelector('.search-clear');
    
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    
    if (searchClear) {
        searchClear.style.display = 'none';
    }
    
    // Réinitialiser l'affichage
    const activeCategory = document.querySelector('.faq-category-btn.active');
    if (activeCategory) {
        const categoryId = activeCategory.getAttribute('data-category');
        createFAQItems(categoryId);
    }
}

// Filtrer par recherche
function filterFAQBySearch(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    let hasResults = false;
    let resultCount = 0;
    
    // D'abord réinitialiser tous les items
    faqItems.forEach(item => {
        item.style.display = 'block';
        
        // Restaurer le texte original
        const questionElement = item.querySelector('.faq-text');
        const answerElement = item.querySelector('.faq-answer-content');
        
        if (questionElement.dataset.original) {
            questionElement.innerHTML = questionElement.dataset.original;
        }
        if (answerElement.dataset.original) {
            answerElement.innerHTML = answerElement.dataset.original;
        }
    });
    
    // Puis filtrer et surligner
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-text').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
            resultCount++;
            
            // Surligner le terme de recherche
            if (searchTerm.length > 2) {
                highlightText(item, searchTerm);
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // Afficher un message si aucun résultat
    const faqList = document.getElementById('faqList');
    const noResults = document.querySelector('.faq-no-results');
    
    if (!hasResults && faqItems.length > 0) {
        if (!noResults) {
            const message = document.createElement('div');
            message.className = 'faq-empty';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <p>Aucune question ne correspond à votre recherche : "${searchTerm}"</p>
                <p class="small">Essayez d'autres mots-clés ou contactez-moi directement.</p>
            `;
            faqList.appendChild(message);
        }
        updateResultsCount('search', 0, searchTerm);
    } else if (noResults) {
        noResults.remove();
        updateResultsCount('search', resultCount, searchTerm);
    }
}

// Surligner le texte
function highlightText(element, searchTerm) {
    const questionElement = element.querySelector('.faq-text');
    const answerElement = element.querySelector('.faq-answer-content');
    
    // Sauvegarder le texte original
    if (!questionElement.dataset.original) {
        questionElement.dataset.original = questionElement.innerHTML;
    }
    if (!answerElement.dataset.original) {
        answerElement.dataset.original = answerElement.innerHTML;
    }
    
    const highlight = (text) => {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };
    
    questionElement.innerHTML = highlight(questionElement.dataset.original);
    answerElement.innerHTML = highlight(answerElement.dataset.original);
}

// Supprimer les surlignages
function removeHighlights() {
    document.querySelectorAll('.faq-text, .faq-answer-content').forEach(element => {
        if (element.dataset.original) {
            element.innerHTML = element.dataset.original;
        }
    });
}

// Mettre à jour le compteur de résultats
function updateResultsCount(categoryId, count = null, searchTerm = '') {
    const resultsInfo = document.querySelector('.faq-results-info');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!resultsInfo || !resultsCount) return;
    
    if (count === null) {
        // Compter automatiquement
        const visibleItems = document.querySelectorAll('.faq-item[style="display: block"]').length;
        count = visibleItems;
    }
    
    if (categoryId === 'search') {
        resultsCount.textContent = `${count} résultat${count !== 1 ? 's' : ''} pour "${searchTerm}"`;
        resultsInfo.style.display = 'flex';
    } else if (count > 0) {
        const categoryName = categoryId === 'all' ? 'Toutes les questions' : 
            faqCategories.find(c => c.id === categoryId)?.name || categoryId;
        resultsCount.textContent = `${count} question${count !== 1 ? 's' : ''} dans "${categoryName}"`;
        resultsInfo.style.display = 'flex';
    } else {
        resultsInfo.style.display = 'none';
    }
}

// Mettre à jour les statistiques
function updateFAQStats() {
    const totalQuestions = document.getElementById('totalQuestions');
    const totalCategories = document.getElementById('totalCategories');
    
    if (totalQuestions) {
        totalQuestions.textContent = faqData.length;
    }
    
    if (totalCategories) {
        // Compter les catégories uniques (sans "all")
        const uniqueCategories = [...new Set(faqData.map(q => q.category))];
        totalCategories.textContent = uniqueCategories.length;
    }
    
    // Afficher les stats
    const statsSection = document.querySelector('.faq-stats');
    if (statsSection) {
        statsSection.style.display = 'block';
    }
}

// Démarrer l'initialisation
document.addEventListener('DOMContentLoaded', initFAQ);

// Supprimer les fonctions inutiles du scope global
window.FAQ = {
    initFAQ,
    faqData,
    faqCategories
};