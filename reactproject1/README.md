# Frontend React — concessionnaireVoituesGrA

Interface React (Vite) pour les modules **Clients**, **Voitures** et **Comptes**, connectée aux API REST du backend ASP.NET Core.

## Prérequis

- Node.js (LTS recommandé)
- Backend .NET lancé en HTTPS : `https://localhost:7202`
- Base SQL Server `concessionnaireVoituresGrA` créée (script dans `../concessionnaireVoituesGrA/Scripts/`)

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Application : [http://localhost:12054](http://localhost:12054)  
Redirection automatique vers `/clients`.

### Configuration API

Fichier `.env.development` :

```
VITE_API_BASE_URL=https://localhost:7202
```

Le backend doit tourner en **HTTPS** pour les cookies de session (module Comptes).

## Build production

```bash
npm run build
npm run preview
```

## Routes

### Clients / Voitures

| Module | Base route |
|--------|------------|
| Clients | `/clients`, `/clients/new`, `/clients/:cine`, … |
| Voitures | `/voitures`, `/voitures/new`, `/voitures/:matricule`, … |

### Comptes

| Route | Écran MVC équivalent |
|-------|----------------------|
| `/comptes` | Comptes/Index (Admin) |
| `/comptes/signin` | Comptes/Authentifier |
| `/comptes/signup` | Comptes/Create |

## API utilisée

- `/api/ClientsAPI` — CRUD clients
- `/api/VoituresAPI` — CRUD voitures
- `/api/ComptesAPI` — auth cookies (`credentials: 'include'`)
  - `POST /authentifier` — connexion
  - `POST /register` — inscription
  - `POST /signout` — déconnexion
  - `GET /` — liste comptes (Admin)

Compte test en BDD : `Admin` / `admin`

## Structure du code

```
src/
├── config/apiConfig.js
├── context/AuthContext.jsx
├── services/
├── components/
│   ├── clients/
│   ├── voitures/
│   ├── comptes/
│   ├── common/
│   └── layout/
└── pages/
```
