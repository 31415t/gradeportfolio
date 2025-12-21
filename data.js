// data.js - Fichier séparé pour les données des projets
const projectsData = [
    {
        id: 1,
        title: "Brainhub",
        category: "logo",
        description: "Logo moderne et minimaliste pour une startup technologique.",
        imageUrl: "Images/Logofolio/Brainhub.jpg",
        icon: "fas fa-brain"
    },
    {
        id: 2,
        title: "Caritas - Identité visuelle",
        category: "branding",
        description: "Identité visuelle pour une organisation caritative dans le domaine de la santé.",
        imageUrl: "Images/Branding/caritas.png",
        icon: "fas fa-hands-helping"
    },
    {
        id: 3,
        title: "Anniversaire",
        category: "socialMedia",
        description: "Concept de visuel pour fête d'anniversaire sur les réseaux sociaux.",
        imageUrl: "Images/SocialMedia/HBD1.jpeg",
        icon: "fas fa-birthday-cake"
    },
    {
        id: 4,
        title: "Mockup",
        category: "mockup",
        description: "Mise en situation du logo à travers un mockup professionnel.",
        imageUrl: "Images/Mockups/mockup1.jpg",
        icon: "fas fa-desktop"
    },
    {
        id: 5,
        title: "Prod'Haiti",
        category: "logo",
        description: "Création de logo pour une entreprise agro-alimentaire.",
        imageUrl: "Images/Logofolio/ProdHaiti.jpg",
        icon: "fas fa-rocket"
    },
    {
        id: 6,
        title: "Composition",
        category: "autre",
        description: "Projet fictif mettant en relief les principes d'une bonne composition.",
        imageUrl: "Images/Autres/autre1.jpg",
        icon: "fas fa-shopping-bag"
    },
    {
        id: 7,
        title: "Max Motors",
        category: "logo",
        description: "Conception de logo pour une entreprise automobile.",
        imageUrl: "Images/Logofolio/MaxMotors.jpg",
        icon: "fas fa-box-open"
    },
    {
        id: 8,
        title: "Bela Store",
        category: "logo",
        description: "Conception de logo pour une boutique en ligne.",
        imageUrl: "Images/Logofolio/BelaStoreLogo.png",
        icon: "fas fa-music"
    },
    {
        id: 9,
        title: "Bela Store",
        category: "flyer",
        description: "Design de flyer pour le lancement d'une boutique en ligne.",
        imageUrl: "Images/Flyer/BelaStoreFLyer.jpeg",
        icon: "fas fa-store"
    },
    {
        id: 10,
        title: "Bibliyotèk Batravil",
        category: "logo",
        description: "Conception de logo pour une bibliothèque communautaire.",
        imageUrl: "Images/Logofolio/bblogo.png",
        icon: "fas fa-book-reader"
    },
    {
        id: 11,
        title: "Composition",
        category: "autre",
        description: "Projet fictif mettant en relief les principes d'une bonne composition.",
        imageUrl: "Images/Autres/autre2.jpg",
        icon: "fas fa-desktop"
    },
    {
        id: 12,
        title: "Baboo Epis",
        category: "logo",
        description: "Logo épuré pour une entreprise du secteur culinaire.",
        imageUrl: "Images/Logofolio/baboo.jpg",
        icon: "fas fa-lemon"
    },
    {
        id: 13,
        title: "Bon debut de mois",
        category: "socialMedia",
        description: "Concept de visuel pour les reseaux sociaux.",
        imageUrl: "Images/SocialMedia/november.jpeg",
        icon: "fas fa-calendar-alt"
    },
    {
        id: 14,
        title: "Renaud Agency",
        category: "logo",
        description: "Logo épuré, moderne et minimaliste pour une agence de voyage.",
        imageUrl: "Images/Logofolio/RenaudAgency.jpg",
        icon: "fas fa-paper-plane"
    },
    {
        id: 15,
        title: "Tableau",
        category: "illustration",
        description: "Realisation de tableau sur logiciel de graphisme.",
        imageUrl: "Images/illustration/tableau1.jpeg",
        icon: "fas fa-palette"
    },
    {
        id: 16,
        title: "Marco Zelle",
        category: "flyer",
        description: "Flyer promotionnel pour une entreprise qui fait de l'exchange.",
        imageUrl: "Images/Flyer/marcoflyer.jpeg",
        icon: "fas fa-paint-brush"
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
    { id: 'print', name: 'Print' },
    { id: 'mockup', name: 'Mockup' },
    { id: 'autre', name: 'Autres' },
    { id: 'illustration', name: 'Illustration' }
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