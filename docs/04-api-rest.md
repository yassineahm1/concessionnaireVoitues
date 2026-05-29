# 04 — Référence API REST

Base URL (développement) : **`https://localhost:7202`**

Format JSON : **camelCase** (sérialisation ASP.NET Core par défaut).

---

## ClientsAPI

**Base :** `/api/ClientsAPI`  
**Auth :** aucune  
**Cookies :** non requis

| Méthode | URL | Body | Réponse |
|---------|-----|------|---------|
| GET | `/api/ClientsAPI` | — | `200` — `ClientDto[]` |
| GET | `/api/ClientsAPI/{cine}` | — | `200` — `ClientDto` ou `404` |
| POST | `/api/ClientsAPI` | `ClientDto` | `204` |
| PUT | `/api/ClientsAPI/{cine}` | `ClientDto` | `204` |
| DELETE | `/api/ClientsAPI/{cine}` | — | `204` |

**ClientDto :**
```json
{
  "cine": "AB123456",
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "adresse": "Casablanca"
}
```

---

## VoituresAPI

**Base :** `/api/VoituresAPI`  
**Auth :** aucune  
**Cookies :** non requis

| Méthode | URL | Body | Réponse |
|---------|-----|------|---------|
| GET | `/api/VoituresAPI` | — | `200` — `VoitureDto[]` |
| GET | `/api/VoituresAPI/{matricule}` | — | `200` ou `404` `"Voiture not found!"` |
| POST | `/api/VoituresAPI` | `VoitureDto` | `200` ou `400` `"Matricule existe déjà"` |
| PUT | `/api/VoituresAPI/{matricule}` | `VoitureDto` | `204` |
| DELETE | `/api/VoituresAPI/{matricule}` | — | `200` ou `404` |

**VoitureDto :**
```json
{
  "matricule": "12345-A-67",
  "marque": "Renault",
  "modele": "Clio",
  "annee": 2022,
  "prixLocation": 350.0
}
```

---

## ComptesAPI

**Base :** `/api/ComptesAPI`  
**Cookies :** **requis** pour GET liste (`credentials: 'include'` côté React)

| Méthode | URL | Body | Auth | Réponse |
|---------|-----|------|------|---------|
| GET | `/api/ComptesAPI` | — | **Admin** | `200` — `CompteDto[]` |
| POST | `/api/ComptesAPI/authentifier` | `CompteDto` | Anonyme | `200` + cookie ou `401` |
| POST | `/api/ComptesAPI/register` | `CompteDto` | Anonyme | `200` ou `400` |
| POST | `/api/ComptesAPI/signout` | — | Anonyme | `200` |

**CompteDto :**
```json
{
  "username": "monuser",
  "password": "monpass"
}
```

**Compte seed (script SQL) :**
- Username : `Admin`
- Password : `admin`
- Rôle en BDD : `Admin`

---

## CORS (backend)

Origine autorisée : `http://localhost:12054`  
Headers / méthodes : tous  
Credentials : **oui**

---

## Exemple d’appel depuis React

```javascript
// Clients — sans cookie
const res = await fetch('https://localhost:7202/api/ClientsAPI')

// Comptes — avec cookie de session
const res = await fetch('https://localhost:7202/api/ComptesAPI', {
  credentials: 'include',
})
```

---

## Endpoints MVC (non utilisés par React)

Le frontend React **n’appelle pas** les routes MVC (`/Clients/Index`, `/Voitures/Create`, etc.).  
Elles restent disponibles si on lance le backend dans un navigateur sans React.
