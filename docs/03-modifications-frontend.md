# 03 — Modifications frontend React (`reactproject1`)

## Dépendance ajoutée

| Package | Version | Rôle |
|---------|---------|------|
| `react-router-dom` | ^7.x | Navigation SPA, routes, liens |

Aucune autre librairie (pas d’axios, Redux, TypeScript).

---

## Configuration

### `.env.development`

```env
VITE_API_BASE_URL=https://localhost:7202
```

Centralise l’URL du backend. Utilisée par `src/config/apiConfig.js`.

### `vite.config.js` (existant)

- Port dev : **12054** (autorisé par CORS backend)

---

## Structure des dossiers `src/`

```
src/
├── main.jsx                 # Point d’entrée + BrowserRouter + AuthProvider
├── App.jsx                  # Définition de toutes les routes
├── App.css                  # Styles layout, tableaux, formulaires
├── index.css                # Styles globaux Vite
│
├── config/
│   └── apiConfig.js         # URLs : ClientsAPI, VoituresAPI, ComptesAPI
│
├── context/
│   └── AuthContext.jsx      # Session minimale (username, role) après login
│
├── hooks/
│   └── useCompteFromRoute.js # Charge un compte pour Details/Edit/Delete
│
├── services/
│   ├── clientsService.js    # 5 fonctions CRUD clients
│   ├── voituresService.js   # 5 fonctions CRUD voitures
│   └── comptesService.js    # auth + liste (credentials: 'include')
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx       # Navbar + Outlet + footer
│   │   └── Navbar.jsx       # Liens navigation
│   ├── common/
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   ├── clients/
│   │   ├── ClientTable.jsx
│   │   ├── ClientForm.jsx
│   │   └── ClientDetailsDisplay.jsx
│   ├── voitures/
│   │   ├── VoitureTable.jsx
│   │   ├── VoitureForm.jsx
│   │   └── VoitureDetailsDisplay.jsx
│   └── comptes/
│       ├── CompteTable.jsx
│       ├── CompteForm.jsx
│       ├── CompteDetailsDisplay.jsx
│       └── AdminOnly.jsx      # Garde d’accès rôle Admin
│
└── pages/
    ├── clients/             # 5 pages CRUD
    ├── voitures/            # 5 pages CRUD
    └── comptes/             # Signin, Signup, liste, Details, Edit, Delete
```

---

## Routes React

### Clients

| Route | Composant | Équivalent MVC |
|-------|-----------|----------------|
| `/` | → redirect `/clients` | — |
| `/clients` | `ClientsListPage` | Index |
| `/clients/new` | `ClientCreatePage` | Create |
| `/clients/:cine` | `ClientDetailsPage` | Details |
| `/clients/:cine/edit` | `ClientEditPage` | Edit |
| `/clients/:cine/delete` | `ClientDeletePage` | Delete |

### Voitures

| Route | Composant |
|-------|-----------|
| `/voitures` | `VoituresListPage` |
| `/voitures/new` | `VoitureCreatePage` |
| `/voitures/:matricule` | `VoitureDetailsPage` |
| `/voitures/:matricule/edit` | `VoitureEditPage` |
| `/voitures/:matricule/delete` | `VoitureDeletePage` |

### Comptes

| Route | Composant |
|-------|-----------|
| `/comptes` | `ComptesListPage` |
| `/comptes/signin` | `CompteSignInPage` |
| `/comptes/signup` | `CompteSignUpPage` |
| `/comptes/:username` | `CompteDetailsPage` |
| `/comptes/:username/edit` | `CompteEditPage` |
| `/comptes/:username/delete` | `CompteDeletePage` |

---

## Services API (couche `services/`)

Chaque service encapsule les appels `fetch` vers une API. **Aucune logique métier** côté React.

### `clientsService.js` / `voituresService.js`

- `getAll`, `getById`, `create`, `update`, `delete`
- Pas de `credentials` (API ouvertes, comme `ClientsAPI` d’origine)

### `comptesService.js`

- Tous les appels avec **`credentials: 'include'`** pour les cookies
- `authentifier`, `register`, `signOut`, `getComptes`

---

## Composants clés — explications

### `AuthContext.jsx`

Stocke dans `sessionStorage` :
```json
{ "username": "Admin", "role": "Admin" }
```

**Pourquoi :** afficher Signin/SignOut dans la navbar et protéger les pages Comptes Admin. Le **vrai** contrôle d’accès reste côté API (`[Authorize(Roles = "Admin")]`).

### `AdminOnly.jsx`

Affiche un message d’erreur si `user.role !== 'Admin'`. Utilisé sur Details/Edit/Delete comptes.

### `CompteTable.jsx` + prop `showActions`

Affiche **Edit | Details | Delete** uniquement quand :
- l’API liste a répondu avec succès (utilisateur Admin authentifié par cookie), **ou**
- la session React indique le rôle Admin.

Aligné sur `Views/Comptes/Index.cshtml`.

### Formulaires (`ClientForm`, `VoitureForm`, `CompteForm`)

- Champs identiques aux vues MVC
- Clé métier en **lecture seule** en édition (CINE, Matricule, Username)
- Gestion loading / erreur à la soumission

---

## Fichiers supprimés ou remplacés

| Fichier | Action |
|---------|--------|
| `ClientsComponent.jsx` | Remplacé par `ClientTable` + `ClientsListPage` + `clientsService` (POC initial) |
| `App.jsx` (template Vite) | Réécrit pour le routing métier |

---

## Évolution par phase (historique)

### Phase A — Étape 1
Router, layout, `apiConfig`, `clientsService`, pages placeholder.

### Phase A — Étape 2
Liste clients complète avec `ClientTable`.

### Phase A — Étapes 3 à 7
CRUD clients complet + styles + README frontend.

### Phase B1
Module Voitures (service, composants, pages, routes, navbar).

### Phase B2
Module Comptes (API service, AuthContext, Signin/Signup/Liste/SignOut).

### Correction Comptes
Ajout liens Edit | Details | Delete + pages associées (parité MVC).

---

## Comportements spéciaux

| Cas | Comportement React |
|-----|-------------------|
| Matricule voiture dupliqué | Message `"Matricule existe déjà"` (400 API) |
| Client / voiture introuvable | Message API `"Client not found!"` / `"Voiture not found!"` |
| Login échoué | `"Invalid username or password."` |
| Username Admin au signup | `"Username 'Admin' is reserved."` |
| Comptes Edit Save | Redirection liste **sans** appel API (stub MVC) |
| Comptes Delete | Redirection liste **sans** suppression BDD (stub MVC) |
