# Frontend React — concessionnaireVoituesGrA

Interface React (Vite) pour les modules **Clients** et **Voitures**, connectée aux API REST du backend ASP.NET Core.

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

Modifier cette URL si le backend utilise un autre port.

## Build production

```bash
npm run build
npm run preview
```

## Routes

### Clients

| Route | Écran MVC équivalent |
|-------|----------------------|
| `/clients` | Clients/Index |
| `/clients/new` | Clients/Create |
| `/clients/:cine` | Clients/Details |
| `/clients/:cine/edit` | Clients/Edit |
| `/clients/:cine/delete` | Clients/Delete |

### Voitures

| Route | Écran MVC équivalent |
|-------|----------------------|
| `/voitures` | Voitures/Index |
| `/voitures/new` | Voitures/Create |
| `/voitures/:matricule` | Voitures/Details |
| `/voitures/:matricule/edit` | Voitures/Edit |
| `/voitures/:matricule/delete` | Voitures/Delete |

## API utilisée

- `{VITE_API_BASE_URL}/api/ClientsAPI` — CRUD clients
- `{VITE_API_BASE_URL}/api/VoituresAPI` — CRUD voitures (POST retourne 400 si matricule dupliqué)

## Structure du code

```
src/
├── config/apiConfig.js
├── services/clientsService.js
├── components/
│   ├── clients/     ClientTable, ClientForm, ClientDetailsDisplay
│   ├── voitures/    VoitureTable, VoitureForm, VoitureDetailsDisplay
│   ├── common/      Loading, ErrorMessage
│   └── layout/      Layout, Navbar
└── pages/clients/   Pages CRUD
```

## Modules non couverts (Phase B2)

Comptes (auth, inscription) : aucune API REST pour l'instant.
