# 01 — Vue d’ensemble du projet

## Architecture globale

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend React (Vite) — http://localhost:12054            │
│  reactproject1/                                             │
│  • React 19 + react-router-dom                              │
│  • fetch natif vers l’API REST                              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP(S) + CORS
                           │ Cookies (module Comptes)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend ASP.NET Core — https://localhost:7202              │
│  concessionnaireVoituesGrA/                                 │
│  • API REST : ClientsAPI, VoituresAPI, ComptesAPI           │
│  • MVC Razor : vues existantes (non supprimées)             │
│  • Services → DAO → SQL Server LocalDB                      │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Base de données : concessionnaireVoituresGrA               │
│  Tables : Clients, Voitures, Comptes                        │
└─────────────────────────────────────────────────────────────┘
```

## Phases de développement réalisées

### Phase A — Module Clients

**Objectif :** remplacer l’écran MVC Clients par une interface React connectée à `ClientsAPI` (déjà fournie par le professeur).

**Livrables :**
- Infrastructure SPA (router, layout, service API)
- CRUD complet : liste, détails, création, édition, suppression

### Phase B1 — Module Voitures

**Objectif :** exposer Voitures en REST et reproduire le CRUD MVC en React.

**Livrables :**
- Nouveau `VoituresAPIController.cs` (calqué sur `ClientsAPIController`)
- Module React Voitures (même structure que Clients)

### Phase B2 — Module Comptes

**Objectif :** authentification et gestion des comptes depuis React.

**Livrables :**
- Nouveau `ComptesAPIController.cs` (login, register, logout, liste Admin)
- Modifications `Program.cs` (CORS credentials, cookies cross-origin)
- Pages React : Signin, Signup, liste Comptes, SignOut
- Liens Edit | Details | Delete sur la liste (alignés sur le MVC)

## Correspondance MVC ↔ React

Chaque écran React reprend **les mêmes libellés, champs et actions** que les vues Razor du professeur :

| Module | Vue MVC | Page React |
|--------|---------|------------|
| Clients | `Views/Clients/Index.cshtml` | `/clients` |
| Clients | `Create.cshtml` | `/clients/new` |
| Clients | `Details.cshtml` | `/clients/:cine` |
| Clients | `Edit.cshtml` | `/clients/:cine/edit` |
| Clients | `Delete.cshtml` | `/clients/:cine/delete` |
| Voitures | `Views/Voitures/*` | `/voitures/...` |
| Comptes | `Views/Comptes/*` | `/comptes/...` |

## Ce qui n’a pas été modifié

- Logique métier dans `GestionClients`, `GestionVoitures`, `GestionComptes`
- DAO (`ClientsDao`, `VoituresDao`, `ComptesDao`) — sauf utilisation via API
- Schéma SQL (`Scripts/schema-concessionnaireVoituresGrA.sql`)
- Vues MVC Razor et contrôleurs MVC existants
- Domaines `Location` et `Facture` (non implémentés côté professeur)

## Limitations connues (fidèles au backend)

| Fonctionnalité | État |
|----------------|------|
| Comptes Edit (Save) | UI présente ; **pas de persistance** (`GestionComptes.Modifier` → `NotImplementedException`) |
| Comptes Delete | UI présente ; **pas de suppression en BDD** (pas de DELETE dans `ComptesDao`) |
| Auth sur ClientsAPI / VoituresAPI | Aucune (comme à l’origine pour ClientsAPI) |
| Liste Comptes | Réservée Admin (cookie + `[Authorize]`) |
