# PA CRUD App (React + Vite)

Mini-projet CRUD pour gérer des clients (React + Vite).

Prérequis
- Node.js (>=16) et npm

Installation
```sh
npm install

Démarrage en développement
npm run dev

Mock API (optionnel)

Le front communique avec http://localhost:3002/clients. Pour utiliser la BD fournie, lancez:
npx json-server --watch  --port 3002


Fichier de données : PA_CRUD_app/db.json


Scripts utiles

Voir PA_CRUD_app/package.json pour dev, build, lint, preview.


Fichiers importants

Entrée app : PA_CRUD_app/src/main.jsx
Routeur / point central : PA_CRUD_app/src/App.jsx
Configuration Vite : PA_CRUD_app/vite.config.js


Composants principaux

Liste clients : ClientList (PA_CRUD_app/src/components/ClientsList.jsx)
Détails client : ClientDetails (PA_CRUD_app/src/components/ClientsDetails.jsx)
Créer client : CreateClient (PA_CRUD_app/src/components/CreateClient.jsx)
Mettre à jour : UpdateClient (PA_CRUD_app/src/components/UpdateClient.jsx)
UI : PA_CRUD_app/src/components/header.jsx, PA_CRUD_app/src/components/footer.jsx


API utilisée (exemples)

GET /clients
GET /clients/:id
POST /clients
PUT /clients/:id
DELETE /clients/:id
Notes

Le front utilise axios et Bootstrap (voir PA_CRUD_app/package.json).