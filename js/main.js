// main.js - Fichier principal qui initialise tout le site
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';
import { initTestimonials } from './testimonials.js';
import { initContact } from './contact.js';
import { initBackToTop, preloadImages, initTypingAnimation } from './utils.js';

// État global de l'application
let appState = {
    isLoading: true,
    data: null,
    currentPage: 1
};

// Charger les données JSON
async function loadData() {
    try {
        const response = await fetch('data/personal.json');
        if (!response.ok) throw new Error('Erreur de chargement des données');
        
        const personalData = await response.json();
        return personalData;
    } catch (error) {
        console.error('Erreur:', error);
        showErrorMessage('Impossible de charger les données. Veuillez rafraîchir la page.');
        return null;
    }
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

// Initialiser le compteur de statistiques
function initStatsCounter(data) {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length || !data) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || '0');
        const duration = 1500;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        
        const interval = setInterval(() => {
            current += increment;
            step++;
            if (step >= steps) {
                counter.textContent = target + '+';
                clearInterval(interval);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, duration / steps);
    });
}

// Initialiser les animations au défilement
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animer les compteurs dans les stats
                if (entry.target.classList.contains('stat')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.dataset.animated) {
                        const target = parseInt(counter.getAttribute('data-count') || '0');
                        counter.dataset.animated = 'true';
                    }
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les sections et éléments
    const elementsToAnimate = document.querySelectorAll('.section, .skill, .stat, .project-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Mettre à jour les informations personnelles
function updatePersonalInfo(data) {
    if (!data) return;
    
    // Mettre à jour les stats si elles existent déjà dans le HTML
    const stats = document.getElementById('statsContainer');
    if (stats) {
        // Les compteurs sont déjà initialisés dans le HTML
        // Ils seront animés par initStatsCounter
    }
}

// Initialisation principale
async function init() {
    console.log('🚀 Initialisation du portfolio...');
    
    // Afficher un état de chargement
    appState.isLoading = true;
    
    try {
        // 1. Charger les données
        console.log('📥 Chargement des données...');
        const personalData = await loadData();
        appState.data = personalData;
        
        // 2. Initialiser les modules
        console.log('🔧 Initialisation des modules...');
        initNavigation();
        initProjects();
        initTestimonials();
        initContact();
        initBackToTop();
        
        // 3. Initialiser les utilitaires
        console.log('⚙️ Initialisation des utilitaires...');
        if (personalData) {
            updatePersonalInfo(personalData);
            initStatsCounter(personalData);
        }
        preloadImages();
        initTypingAnimation();
        initScrollAnimations();
        
        // 4. Cacher l'état de chargement
        const loadingElements = document.querySelectorAll('.loading-projects, .loading-testimonials');
        loadingElements.forEach(el => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });
        
        appState.isLoading = false;
        console.log('✅ Portfolio initialisé avec succès!');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        showErrorMessage('Erreur lors du chargement du site. Veuillez réessayer.');
        appState.isLoading = false;
    }
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', init);

// Exporter pour le debugging
window.appState = appState;