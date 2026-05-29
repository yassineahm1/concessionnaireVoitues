# Frontend React — concessionnaireVoituesGrA

Interface React (Vite) pour le module **Clients**, connectée à l'API REST `ClientsAPI` du backend ASP.NET Core.

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

## Routes (module Clients)

| Route | Écran MVC équivalent |
|-------|----------------------|
| `/clients` | Clients/Index |
| `/clients/new` | Clients/Create |
| `/clients/:cine` | Clients/Details |
| `/clients/:cine/edit` | Clients/Edit |
| `/clients/:cine/delete` | Clients/Delete |

## API utilisée

Base : `{VITE_API_BASE_URL}/api/ClientsAPI`

- `GET /` — liste
- `GET /{cine}` — détail
- `POST /` — création
- `PUT /{cine}` — modification
- `DELETE /{cine}` — suppression

## Structure du code

```
src/
├── config/apiConfig.js
├── services/clientsService.js
├── components/
│   ├── clients/     ClientTable, ClientForm, ClientDetailsDisplay
│   ├── common/      Loading, ErrorMessage
│   └── layout/      Layout, Navbar
└── pages/clients/   Pages CRUD
```

## Modules non couverts (Phase B)

Voitures et Comptes ne sont pas implémentés en React : aucune API REST n'existe pour ces modules dans le backend actuel.
