# 02 — Modifications backend (.NET)

## Fichiers créés

### 1. `Controllers/VoituresAPIController.cs`

**Pourquoi :** le professeur n’avait exposé que `ClientsAPI` en REST. Voitures existait uniquement en MVC. Ce contrôleur permet au React d’appeler les mêmes opérations que `VoituresController` + `GestionVoitures`.

**Pattern :** copie de `ClientsAPIController`, branché sur `InterfaceVoitures`.

| Méthode HTTP | Route | Service appelé | Réponse |
|--------------|-------|----------------|---------|
| GET | `/api/VoituresAPI` | `GetAllVoitures()` | 200 + liste JSON |
| GET | `/api/VoituresAPI/{matricule}` | `GetVoiture(id)` | 200 ou 404 `"Voiture not found!"` |
| POST | `/api/VoituresAPI` | `AjouterVoiture(dto)` | 200 ou **400** `"Matricule existe déjà"` |
| PUT | `/api/VoituresAPI/{matricule}` | `ModifierVoiture(id, dto)` | void (204) |
| DELETE | `/api/VoituresAPI/{matricule}` | `SupprimerVoiture(id)` | 200 ou 404 |

**Modèle JSON (`VoitureDto`) :**
```json
{
  "matricule": "string",
  "marque": "string",
  "modele": "string",
  "annee": 0,
  "prixLocation": 0.0
}
```

---

### 2. `Controllers/ComptesAPIController.cs`

**Pourquoi :** l’auth MVC utilise des formulaires + cookies + anti-forgery, inutilisables directement depuis React. Ce contrôleur expose les mêmes opérations en JSON.

| Méthode HTTP | Route | Comportement | Auth |
|--------------|-------|--------------|------|
| GET | `/api/ComptesAPI` | `GetComptes()` — liste | **Admin** |
| POST | `/api/ComptesAPI/authentifier` | Login + `SignInAsync` (claims identiques au MVC) | Anonyme |
| POST | `/api/ComptesAPI/register` | `Creer()` — rôle Client forcé | Anonyme |
| POST | `/api/ComptesAPI/signout` | `SignOutAsync()` | Anonyme |

**Login — logique identique à `ComptesController.Authentifier` :**
- Claim `Name` = username
- Claim `Role` = `"Admin"` si `Username == "Admin"`, sinon `"Client"`

**Register — identique à `ComptesController.Create` :**
- Refus si `Username == "Admin"` → 400 `"Username 'Admin' is reserved."`
- Sinon création via `GestionComptes.Creer`

**Modèle JSON (`CompteDto`) :**
```json
{
  "username": "string",
  "password": "string"
}
```

**Non exposé en API (stubs MVC) :** Details, Edit, Delete comptes.

---

## Fichiers modifiés

### `Program.cs`

Trois changements pour que React (port **12054**) puisse utiliser les **cookies de session** avec le backend HTTPS (**7202**) :

#### a) Cookies cross-origin

```csharp
options.Cookie.SameSite = SameSiteMode.None;
options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
```

**Explication :** le frontend est sur `http://localhost:12054` et l’API sur `https://localhost:7202`. Sans `SameSite=None` + `Secure`, le navigateur n’envoie pas le cookie après login.

#### b) CORS avec credentials

```csharp
policy.WithOrigins("http://localhost:12054")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
```

**Explication :** `AllowCredentials()` est obligatoire pour que `fetch(..., { credentials: 'include' })` envoie/reçoive les cookies.

#### c) Ordre des middlewares

**Avant :**
```csharp
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
```

**Après :**
```csharp
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

**Explication :** CORS doit être exécuté **avant** l’authentification pour que les requêtes preflight (`OPTIONS`) fonctionnent correctement.

---

## Fichiers backend NON modifiés

| Fichier / dossier | Raison |
|-------------------|--------|
| `ClientsAPIController.cs` | Déjà fourni ; utilisé tel quel |
| `GestionClients.cs`, `GestionVoitures.cs`, `GestionComptes.cs` | Logique métier inchangée |
| `*Dao.cs` | Accès SQL inchangé |
| `SqlServerDBFactory.cs` | Connexion LocalDB inchangée |
| `Scripts/schema-concessionnaireVoituresGrA.sql` | Schéma inchangé |
| Contrôleurs MVC | Conservés (Razor toujours utilisable) |

---

## Injection de dépendances

Aucun enregistrement DI supplémentaire : les nouveaux contrôleurs utilisent les services déjà enregistrés dans `Program.cs` :

- `InterfaceVoitures` → `GestionVoitures`
- `InterfaceComptes` → `GestionComptes`
- `InterfaceClients` → `GestionClients`
