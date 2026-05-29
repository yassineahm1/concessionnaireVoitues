# 06 — Liste des fichiers créés et modifiés

Récapitulatif exhaustif pour la remise académique ou la relecture du projet.

---

## Backend — fichiers CRÉÉS

| Fichier | Description |
|---------|-------------|
| `concessionnaireVoituesGrA/Controllers/VoituresAPIController.cs` | API REST CRUD voitures |
| `concessionnaireVoituesGrA/Controllers/ComptesAPIController.cs` | API REST auth + liste comptes |

---

## Backend — fichiers MODIFIÉS

| Fichier | Modification |
|---------|--------------|
| `concessionnaireVoituesGrA/Program.cs` | CORS `AllowCredentials`, cookies `SameSite=None` + `Secure`, ordre middleware CORS |

---

## Backend — fichiers NON touchés (liste principale)

- `Controllers/ClientsAPIController.cs` (existant)
- `Controllers/ClientsController.cs`, `VoituresController.cs`, `ComptesController.cs`
- `Data/*.cs`, `Services/Gestion*.cs`, `Domains/*`, `Entities/*`, `Models/*`
- `Views/**`, `Scripts/schema-concessionnaireVoituresGrA.sql`

---

## Frontend — fichiers CRÉÉS

### Configuration & services

| Fichier |
|---------|
| `reactproject1/.env.development` |
| `reactproject1/src/config/apiConfig.js` |
| `reactproject1/src/services/clientsService.js` |
| `reactproject1/src/services/voituresService.js` |
| `reactproject1/src/services/comptesService.js` |

### Contexte & hooks

| Fichier |
|---------|
| `reactproject1/src/context/AuthContext.jsx` |
| `reactproject1/src/hooks/useCompteFromRoute.js` |

### Layout & commun

| Fichier |
|---------|
| `reactproject1/src/components/layout/Layout.jsx` |
| `reactproject1/src/components/layout/Navbar.jsx` |
| `reactproject1/src/components/common/Loading.jsx` |
| `reactproject1/src/components/common/ErrorMessage.jsx` |

### Clients

| Fichier |
|---------|
| `reactproject1/src/components/clients/ClientTable.jsx` |
| `reactproject1/src/components/clients/ClientForm.jsx` |
| `reactproject1/src/components/clients/ClientDetailsDisplay.jsx` |
| `reactproject1/src/pages/clients/ClientsListPage.jsx` |
| `reactproject1/src/pages/clients/ClientDetailsPage.jsx` |
| `reactproject1/src/pages/clients/ClientCreatePage.jsx` |
| `reactproject1/src/pages/clients/ClientEditPage.jsx` |
| `reactproject1/src/pages/clients/ClientDeletePage.jsx` |

### Voitures

| Fichier |
|---------|
| `reactproject1/src/components/voitures/VoitureTable.jsx` |
| `reactproject1/src/components/voitures/VoitureForm.jsx` |
| `reactproject1/src/components/voitures/VoitureDetailsDisplay.jsx` |
| `reactproject1/src/pages/voitures/VoituresListPage.jsx` |
| `reactproject1/src/pages/voitures/VoitureDetailsPage.jsx` |
| `reactproject1/src/pages/voitures/VoitureCreatePage.jsx` |
| `reactproject1/src/pages/voitures/VoitureEditPage.jsx` |
| `reactproject1/src/pages/voitures/VoitureDeletePage.jsx` |

### Comptes

| Fichier |
|---------|
| `reactproject1/src/components/comptes/CompteTable.jsx` |
| `reactproject1/src/components/comptes/CompteForm.jsx` |
| `reactproject1/src/components/comptes/CompteDetailsDisplay.jsx` |
| `reactproject1/src/components/comptes/AdminOnly.jsx` |
| `reactproject1/src/pages/comptes/ComptesListPage.jsx` |
| `reactproject1/src/pages/comptes/CompteSignInPage.jsx` |
| `reactproject1/src/pages/comptes/CompteSignUpPage.jsx` |
| `reactproject1/src/pages/comptes/CompteDetailsPage.jsx` |
| `reactproject1/src/pages/comptes/CompteEditPage.jsx` |
| `reactproject1/src/pages/comptes/CompteDeletePage.jsx` |

### Documentation

| Fichier |
|---------|
| `docs/README.md` |
| `docs/01-vue-ensemble.md` |
| `docs/02-modifications-backend.md` |
| `docs/03-modifications-frontend.md` |
| `docs/04-api-rest.md` |
| `docs/05-guide-demarrage.md` |
| `docs/06-liste-fichiers.md` (ce fichier) |

---

## Frontend — fichiers MODIFIÉS

| Fichier | Modification |
|---------|--------------|
| `reactproject1/package.json` | Ajout `react-router-dom` |
| `reactproject1/package-lock.json` | Lockfile npm |
| `reactproject1/src/main.jsx` | Router + AuthProvider |
| `reactproject1/src/App.jsx` | Routes Clients, Voitures, Comptes |
| `reactproject1/src/App.css` | Styles tableaux, formulaires, navbar |
| `reactproject1/index.html` | Titre + favicon `/icons.svg` |
| `reactproject1/README.md` | Documentation frontend |

---

## Frontend — fichiers SUPPRIMÉS / remplacés

| Fichier | Note |
|---------|------|
| `reactproject1/src/ClientsComponent.jsx` | POC initial remplacé par architecture modulaire |

---

## Dépendance npm ajoutée

```json
"react-router-dom": "^7.x"
```

Toutes les autres dépendances étaient déjà présentes (React 19, Vite 8).
