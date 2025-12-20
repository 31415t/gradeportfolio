// data.js - Fichier séparé pour les données des projets
const projectsData = [
    {
        id: 1,
        title: "Brainhub",
        category: "logo",
        description: "Conception de logo moderne et minimaliste pour une startup technologique.",
        imageUrl: "images/Logofolio/Brainhub.jpg",
        icon: "fas fa-brain"
    },
    {
        id: 2,
        title: "App Mobile FitTrack",
        category: "branding",
        description: "Design d'interface utilisateur pour une application de suivi d'activité physique.",
        imageUrl: "images/projects/fittrack-app.jpg",
        icon: "fas fa-running"
    },
    {
        id: 3,
        title: "socialMedias TechCon",
        category: "socialMedia",
        description: "Série d'socialMedias pour une conférence sur les technologies émergentes.",
        imageUrl: "images/projects/techcon-socialMedias.jpg",
        icon: "fas fa-paint-brush"
    },
    {
        id: 4,
        title: "Catalogue Print Artisan",
        category: "print",
        description: "Conception et mise en page d'un catalogue print pour des artisans locaux.",
        imageUrl: "images/projects/artisan-catalog.jpg",
        icon: "fas fa-book"
    },
    {
        id: 5,
        title: "Prod'Haiti",
        category: "logo",
        description: "Création de logo pour une entreprise agro-alimentaire.",
        imageUrl: "images/Logofolio/Prod'Haiti.jpg",
        icon: "fas fa-rocket"
    },
    {
        id: 6,
        title: "Site E-commerce Luxe",
        category: "branding",
        description: "Design UX/UI pour une boutique en ligne de produits de luxe.",
        imageUrl: "images/projects/luxe-ecommerce.jpg",
        icon: "fas fa-shopping-bag"
    },
    {
        id: 7,
        title: "Max Motors",
        category: "logo",
        description: "Conception de logo pour une entreprise automobile.",
        imageUrl: "images/Logofolio/MaxMotors.jpg",
        icon: "fas fa-box-open"
    },
    {
        id: 8,
        title: "Bela Store",
        category: "logo",
        description: "Conception de logo pour une boutique en ligne.",
        imageUrl: "images/Logofolio/BelaStoreLogo.png",
        icon: "fas fa-music"
    },
    {
        id: 9,
        title: "Bela Store",
        category: "flyer",
        description: "Design de flyer pour le lancement d'une boutique en ligne.",
        imageUrl: "Images/Flyer/BelaStoreFLyer.jpeg",
        icon: "fas fa-store"
    }
];

// Données personnelles (optionnel)
const personalData = {
    name: "Alex Morgan",
    title: "Graphic Designer",
    email: "peterleyauguste@gmail.com",
    phone: "+509 41 97 53 92",
    location: "Port-de-Paix, Haiti",
    yearsExperience: 5,
    projectsCount: 120,
    clientsCount: 25,
    socialLinks: {
        behance: "#",
        dribbble: "#",
        linkedin: "#",
        instagram: "#"
    }
};

// Catégories disponibles pour le filtrage
const projectCategories = [
    { id: 'all', name: 'Tous' },
    { id: 'logo', name: 'Logo' },
    { id: 'branding', name: 'Branding' },
    { id: 'flyer', name: 'Flyer' },
    { id: 'socialMedia', name: 'Social Media' },
    { id: 'print', name: 'Print' }
];

// Exporter les données
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projectsData, projectCategories };
} else {
    window.portfolioData = { projectsData, projectCategories };
}

// Compétences
const skills = [
    {
        name: "Graphic Design",
        description: "Création d'identités visuelles, logos, supports print et socialMedias vectorielles.",
        icon: "fas fa-paint-brush"
    },
    {
        name: "Logo Design",
        description: "Conception d'interfaces utilisateur intuitives et d'expériences utilisateur optimisées.",
        icon: "fas fa-pencil-ruler"
    },
    {
        name: "Branding",
        description: "Développement de stratégies de marque cohérentes et impactantes.",
        icon: "fas fa-bullhorn"
    },
    {
        name: "Motion Design",
        description: "Animation de graphiques et création de vidéos explicatives engageantes.",
        icon: "fas fa-magic"
    }
];

// Outils maîtrisés
const tools = [
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Adobe Creative Suite", icon: "fab fa-adobe" },
    { name: "Blender", icon: "fas fa-cube" },
    { name: "Sketch", icon: "fab fa-sketch" }
];

// Exporter les données pour les rendre accessibles
if (typeof module !== 'undefined' && module.exports) {
    // Pour Node.js/CommonJS
    module.exports = {
        projectsData,
        personalData,
        projectCategories,
        skills,
        tools
    };
} else {
    // Pour le navigateur
    window.portfolioData = {
        projectsData,
        personalData,
        projectCategories,
        skills,
        tools
    };
}