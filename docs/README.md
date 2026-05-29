# Documentation du projet concessionnaireVoituesGrA

Ce dossier décrit **toutes les modifications** réalisées pour connecter le frontend React (`reactproject1`) au backend ASP.NET Core existant.

## Fichiers de documentation

| Fichier | Contenu |
|---------|---------|
| [01-vue-ensemble.md](./01-vue-ensemble.md) | Architecture globale, phases du projet, périmètre |
| [02-modifications-backend.md](./02-modifications-backend.md) | Fichiers backend créés ou modifiés, explications |
| [03-modifications-frontend.md](./03-modifications-frontend.md) | Structure React, composants, pages, routes |
| [04-api-rest.md](./04-api-rest.md) | Liste complète des endpoints API REST |
| [05-guide-demarrage.md](./05-guide-demarrage.md) | Installation, lancement, tests manuels |
| [06-liste-fichiers.md](./06-liste-fichiers.md) | Liste exhaustive des fichiers créés/modifiés |

## Résumé rapide

- **Backend** : 2 nouveaux contrôleurs API (`VoituresAPIController`, `ComptesAPIController`) + ajustements CORS/cookies dans `Program.cs`. Le reste du backend (DAO, services, MVC Razor) est **inchangé**.
- **Frontend** : application React complète pour **Clients**, **Voitures** et **Comptes**, consommant les API REST via `fetch`.
- **Non implémenté** (absent du backend) : modules Location, Facture ; persistance réelle Edit/Delete Comptes (stubs comme en MVC).

## Auteur / contexte

Travail réalisé dans le cadre du projet académique **concessionnaireVoituesGrA**, en respectant l’architecture et les conventions du code fourni par le professeur.
