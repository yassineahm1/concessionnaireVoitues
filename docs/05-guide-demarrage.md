# 05 — Guide de démarrage et tests

## Prérequis

- **.NET SDK** (net10.0 — projet professeur)
- **Node.js** LTS
- **SQL Server LocalDB** avec la base `concessionnaireVoituresGrA`

---

## 1. Créer la base de données

Exécuter le script :

```
concessionnaireVoituesGrA/Scripts/schema-concessionnaireVoituresGrA.sql
```

Ce script crée :
- Tables `Clients`, `Voitures`, `Comptes`
- Compte Admin : `Admin` / `admin`

---

## 2. Lancer le backend

Depuis Visual Studio ou en ligne de commande :

```bash
cd concessionnaireVoituesGrA
dotnet run --launch-profile https
```

URLs :
- HTTPS : **https://localhost:7202**
- HTTP : http://localhost:5250

> **Important :** le frontend est configuré pour **HTTPS:7202**. Le module Comptes exige HTTPS pour les cookies.

Accepter le certificat de développement si le navigateur le demande.

---

## 3. Lancer le frontend React

```bash
cd reactproject1
npm install
npm run dev
```

URL : **http://localhost:12054**

Redirection automatique vers `/clients`.

---

## 4. Tests manuels recommandés

### Module Clients

1. Ouvrir `/clients` — liste affichée
2. **Create New** — créer un client
3. **Details** — voir le détail
4. **Edit** — modifier
5. **Delete** — supprimer

### Module Voitures

1. Menu **Voitures** → `/voitures`
2. Créer une voiture
3. Tenter un **matricule déjà existant** → message d’erreur
4. Edit / Details / Delete

### Module Comptes

1. **Signup** — créer un compte (pas `Admin`)
2. **Signin** avec `Admin` / `admin`
3. **Comptes** — liste avec Username et Password
4. Vérifier les liens **Edit | Details | Delete** (Admin)
5. **SignOut** — déconnexion

---

## 5. Dépannage

| Problème | Solution |
|----------|----------|
| Liste clients/voitures vide + erreur réseau | Backend non démarré ou mauvaise URL dans `.env.development` |
| Erreur certificat HTTPS | Faire confiance au certificat dev ASP.NET (`dotnet dev-certs https --trust`) |
| Comptes : 401 sur la liste | Se connecter d’abord en Admin via **Signin** |
| CORS error | Vérifier que le frontend tourne sur le port **12054** |
| Backend ne rebuild pas | Arrêter l’instance en cours (fichier `.exe` verrouillé) puis relancer |
| Cookie login ne persiste pas | Backend doit être en **HTTPS** ; `Program.cs` doit avoir `SameSite=None` + `AllowCredentials` |

---

## 6. Build production (optionnel)

**Frontend :**
```bash
cd reactproject1
npm run build
npm run preview
```

**Backend :**
```bash
dotnet publish -c Release
```

---

## 7. Fichiers de configuration à connaître

| Fichier | Rôle |
|---------|------|
| `reactproject1/.env.development` | URL API backend |
| `concessionnaireVoituesGrA/Properties/launchSettings.json` | Ports backend |
| `concessionnaireVoituesGrA/Services/SqlServerDBFactory.cs` | Chaîne connexion LocalDB |
| `concessionnaireVoituesGrA/Program.cs` | CORS, cookies, DI |
