🎯 QU'EST-CE QUE C'EST ?
Un portfolio moderne et responsive pour un graphic designer. Le site présente tes projets, témoignages clients, services et offre une page FAQ complète.

📂 STRUCTURE DES DOSSIERS
text
portfolio/
├── index.html              # Page principale
├── faq.html               # Page FAQ
├── css/                   # Tous les styles
│   ├── style.css         # Importe tous les fichiers CSS
│   ├── base.css          # Fondations (variables, reset)
│   ├── layout.css        # Structure (grilles, conteneurs)
│   ├── components.css    # Éléments réutilisables (boutons, cartes)
│   ├── sections.css      # Sections spécifiques du site
│   ├── utilities.css     # Classes utilitaires
│   └── faq.css           # Styles spécifiques à la FAQ
├── js/                    # Toute la logique JavaScript
│   ├── main.js           # Point d'entrée (initialise tout)
│   ├── navigation.js     # Menu mobile, navigation active
│   ├── projects.js       # Projets, filtrage, pagination
│   ├── testimonials.js   # Slider de témoignages
│   ├── contact.js        # Formulaire et infos de contact
│   ├── utils.js          # Fonctions utilitaires
│   └── faq.js            # Logique spécifique à la FAQ
├── data/                 # Toutes les données (modifiables)
│   ├── personal.json     # Infos personnelles
│   ├── projects.json     # Liste des projets
│   ├── testimonials.json # Témoignages clients
│   └── faq.json          # Questions fréquentes
└── assets/              # Images et médias
    └── images/
        ├── logos/       # Logo et favicon
        ├── projects/    # Images des projets
        └── certificate.jpg
🎨 MODIFIER L'APPARENCE (CSS)
1. Changer les couleurs
Ouvre css/base.css et modifie les variables CSS :

css
:root {
    --primary-color: #F95606;    /* Orange - Boutons, accents */
    --secondary-color: #0066CC;  /* Bleu - Liens, UI */
    --accent-color: #FFD43B;     /* Jaune - Surlignage */
    --dark-color: #7A3EB1;       /* Mauve - Titres, footer */
    --light-color: #F8F9FA;      /* Blanc cassé - Fond */
}
2. Changer les polices
Dans css/base.css :

--font-primary: 'Poppins' → Police principale (texte)

--font-secondary: 'Montserrat' → Police secondaire (titres)

Pour changer de polices :

Va sur Google Fonts

Choisis tes polices

Remplace les liens dans index.html et faq.html

Modifie les variables dans base.css

3. Modifier une section spécifique
Chaque section a son propre style :

Section	Fichier CSS	Classes principales
Navigation	sections.css	.navbar, .nav-menu
Hero	sections.css	.hero, .hero-title
Projets	sections.css	.projects, .project-card
À propos	sections.css	.about, .stats
Services	sections.css	.skills, .skill
Contact	sections.css	.contact, .contact-form
Footer	sections.css	.footer
FAQ	faq.css	.faq-container, .faq-item
📝 MODIFIER LE CONTENU (DONNÉES)
1. Infos personnelles (data/personal.json)
2. Ajouter un projet (data/projects.json)
json
{
  "id": 18,
  "title": "Nom du projet",
  "category": "logo",  // logo, branding, flyer, socialMedia, print, mockup, illustration, autre
  "description": "Description courte du projet",
  "imageUrl": "assets/images/projects/nom-image.jpg",
  "icon": "fas fa-paint-brush",  // Icône Font Awesome
  "date": "2024-01",
  "client": "Nom du client",
  "technologies": ["Inkscape", "Photopea"]
}
3. Ajouter un témoignage (data/testimonials.json)
json
{
  "id": 13,
  "name": "Nom du client",
  "position": "Poste",
  "company": "Entreprise",
  "content": "Texte du témoignage...",
  "rating": 5,  // Note sur 5
  "avatar": "",  // URL de l'image (laisser vide si pas d'image)
  "initials": "NC",  // Initiales pour l'avatar
  "date": "2024-01-15",
  "project": "Type de projet",
  "category": "branding"
}
4. Modifier la FAQ (data/faq.json)
json
{
  "id": 19,
  "category": "general",  // general, pricing, process, technical, delivery
  "question": "Ta question ici ?",
  "answer": "Ta réponse ici.\nTu peux faire des paragraphes avec des sauts de ligne.\nUtilise **texte** pour mettre en gras.",
  "tags": ["mot-clé1", "mot-clé2"],
  "popularity": 85,
  "lastUpdated": "2024-01-15"
}
🖼️ AJOUTER DES IMAGES
Structure des images :
text
assets/images/
├── logos/
│   └── GradeLogo.png     # Logo principal
├── projects/
│   ├── projet1.jpg
│   ├── projet2.jpg
│   └── ...
└── certificate.jpg       # Certificat dans "À propos"
Conseils pour les images :
Format : JPG ou PNG

Taille recommandée : 1200x800px pour les projets

Poids : < 500KB par image

Nommage : Sans espaces, sans accents

🔧 FONCTIONNALITÉS PRINCIPALES
1. Filtrage des projets
Fichier : js/projects.js

Fonction : initProjectFilter()

Comment ça marche :

Clique sur une catégorie pour filtrer

"Tous" affiche tous les projets

Pagination automatique (6 projets par page)

2. Slider de témoignages
Fichier : js/testimonials.js

Fonction : initTestimonials()

Caractéristiques :

Changement automatique toutes les 5s

Navigation avec flèches et points

Pause au survol

3. FAQ interactive
Fichier : js/faq.js

Fonctionnalités :

Filtrage par catégories

Recherche en temps réel

Ouverture/fermeture des questions

4. Navigation responsive
Fichier : js/navigation.js

Fonctions :

Menu hamburger sur mobile

Navigation active au scroll

Liens fluides (smooth scroll)

📱 RÉGLAGES RESPONSIVE
Points de rupture :
Desktop : > 992px

Tablette : 768px - 992px

Mobile : < 768px

Où modifier le responsive :
css/utilities.css → Media queries générales

css/sections.css → Media queries par section

css/faq.css → Media queries pour la FAQ

Exemple de modification :
css
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;  /* Taille réduite sur mobile */
    }
    
    .projects-grid {
        grid-template-columns: 1fr;  /* 1 colonne sur mobile */
    }
}
🔗 LIENS ET INTÉGRATIONS
1. Liens sociaux (index.html)
html
<div class="social-icons">
    <a href="LIEN_FACEBOOK" target="_blank">
        <i class="fab fa-facebook-f"></i>
    </a>
    <a href="LIEN_INSTAGRAM" target="_blank">
        <i class="fab fa-instagram"></i>
    </a>
    <!-- Ajouter d'autres réseaux -->
</div>
2. Formulaire de contact
Le formulaire utilise Google Forms intégré :

html
<iframe 
    src="TON_LIEN_GOOGLE_FORMS"
    width="100%" 
    height="550">
</iframe>
Pour changer le formulaire :

Crée un formulaire sur Google Forms

Publie-le (Options de partage → Intégrer)

Copie le code iframe

Remplace dans index.html

🚀 DÉPLOIEMENT SUR INTERNET
Option 1 : GitHub Pages (gratuit)
Crée un compte sur GitHub

Crée un nouveau dépôt nommé tonnom.github.io

Télécharge tous tes fichiers

Active GitHub Pages dans les paramètres du dépôt

Option 2 : Hébergement traditionnel
Achète un nom de domaine (ex: peterley-auguste.com)

Prends un hébergement (Hostinger, OVH, etc.)

Télécharge tes fichiers via FTP

Ton site est accessible à tonadresse.com

🐛 DÉPANNAGE RAPIDE
Problème : Les images ne s'affichent pas
✅ Vérifie le chemin : assets/images/projets/nom.jpg

✅ Vérifie l'extension : .jpg vs .jpeg vs .png

✅ Vérifie la casse : Image.jpg ≠ image.jpg

Problème : Le JavaScript ne fonctionne pas
Ouvre la console (F12 → Console)

Vérifie les erreurs rouges

Vérifie que les fichiers JS sont bien chargés

Problème : Le site n'est pas responsive
✅ Vérifie les media queries dans utilities.css

✅ Vérifie la balise viewport dans <head>

Problème : La FAQ ne se charge pas
✅ Vérifie que data/faq.json existe

✅ Vérifie la console pour les erreurs de chargement

✅ Vérifie que js/faq.js est bien lié dans faq.html


📚 POUR ALLER PLUS LOIN
Si tu veux ajouter une section :
Ajoute le HTML dans index.html

Ajoute les styles dans sections.css

Ajoute la logique dans un nouveau fichier JS si nécessaire

Si tu veux changer l'ordre des sections :
Modifie l'ordre dans index.html

Les IDs (#accueil, #projets) doivent correspondre

La navigation se met à jour automatiquement

Si tu veux ajouter des animations :
Ajoute des keyframes dans base.css

Utilise les classes .fade-in, .slide-up

Ou crée tes propres animations

🎉 FÉLICITATIONS !
Ton portfolio est maintenant prêt. Tu peux :

✅ Modifier ton contenu facilement

✅ Ajouter de nouveaux projets

✅ Personnaliser les couleurs

✅ Déployer en ligne

N'oublie pas : Ton portfolio évolue avec toi. Mets-le à jour régulièrement avec tes nouveaux projets !


