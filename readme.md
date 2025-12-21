# Carnet de commandes — Mettre à jour le site (VS Code / Git Bash)

Raccourci : ouvrir le terminal intégré (Ctrl+`) → profil Git Bash.

Vérifications générales
- git status
- git remote -v

1) Modifier un fichier existant
- git add path/to/file
- git commit -m "Message court"
- git push origin main

2) Créer un nouveau fichier
- git add newfile.ext
- git commit -m "Add newfile.ext"
- git push origin main

3) Créer un sous-dossier et y ajouter des images
- mkdir -p Images/monProjet
- (copier/placer les images dans Images/monProjet)
- git add Images/monProjet/*
- git commit -m "Add images for monProjet"
- git push origin main

4) Ajouter des images à un sous-dossier existant
- git add Images/monProjet/*
- git commit -m "Add images"
- git push origin main

5) Dossiers vides (si nécessaire)
- touch folder/.gitkeep
- git add folder/.gitkeep
- git commit -m "Track empty folder"
- git push origin main

6) Changer la casse d'un dossier sous Windows (ex: images → Images)
- git mv images tmp_images
- git mv tmp_images Images
- git add -A
- git commit -m "Rename images -> Images"
- git push origin main

7) Retirer du repo sans supprimer local (ex: ProjetsReact)
- ajouter `ProjetsReact/` à .gitignore
- git rm -r --cached ProjetsReact
- git commit -m "Remove ProjetsReact from repo"
- git push origin main

8) Fichiers trop volumineux (>100 MB)
- installer Git LFS : git lfs install
- git lfs track "*.psd"
- git add .gitattributes
- git add <gros_fichiers>
- git commit -m "Track large files with LFS"
- git push origin main

Commandes pratiques
- tout ajouter et committer : git add -A && git commit -m "Msg" && git push origin main
- voir les fichiers suivis dans Images : git ls-files | grep -i '^Images/'
- forcer renommage/corrections de chemin dans les fichiers : git ls-files | xargs sed -i 's#old/#New/#g' && git add -A && git commit -m "Fix paths" && git push

Après le push
- attendre quelques secondes, puis recharger la page GitHub Pages (Ctrl+F5)
- ouvrir l'URL : start "https://USERNAME.github.io/REPO/"

Notes
- Git n'ajoute pas automatiquement les changements locaux — il faut add, commit, push.
- Attention à la casse des chemins et aux caractères spéciaux dans les noms de fichiers.
- Toujours vérifier .gitignore si des fichiers ne sont pas pris en compte.
// ...existing code...