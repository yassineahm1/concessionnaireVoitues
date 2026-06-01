-- Script de création de la base concessionnaireVoituresGrA
-- Dérivé des DAO et Entities du projet (Dapper + SQL Server LocalDB)
-- Exécuter section par section dans VS Code (extension SQL Server) ou via sqlcmd

-- ========== ÉTAPE A : Créer la base ==========
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'concessionnaireVoituresGrA')
BEGIN
    CREATE DATABASE concessionnaireVoituresGrA;
END
GO

USE concessionnaireVoituresGrA;
GO

-- ========== ÉTAPE B : Table Clients ==========
IF OBJECT_ID(N'dbo.Clients', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Clients
    (
        Id       INT IDENTITY(1,1) NOT NULL,
        CINE     NVARCHAR(255)     NOT NULL,
        Nom      NVARCHAR(255)     NOT NULL,
        Prenom   NVARCHAR(255)     NOT NULL,
        Tel      NVARCHAR(255)     NULL,
        Adresse  NVARCHAR(255)     NULL,
        CONSTRAINT PK_Clients PRIMARY KEY (Id)
    );
END
GO

-- ========== ÉTAPE C : Table Voitures ==========
IF OBJECT_ID(N'dbo.Voitures', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Voitures
    (
        Id           INT IDENTITY(1,1) NOT NULL,
        Matricule    NVARCHAR(255)     NOT NULL,
        Marque       NVARCHAR(255)     NOT NULL,
        Modele       NVARCHAR(255)     NOT NULL,
        Annee        INT               NOT NULL,
        PrixLocation FLOAT             NOT NULL,
        CONSTRAINT PK_Voitures PRIMARY KEY (Id)
    );
END
GO

-- ========== ÉTAPE D : Table Comptes ==========
IF OBJECT_ID(N'dbo.Comptes', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Comptes
    (
        Id       INT IDENTITY(1,1) NOT NULL,
        Username NVARCHAR(255)       NOT NULL,
        Password NVARCHAR(255)       NOT NULL,
        Role     NVARCHAR(255)       NOT NULL,
        IdClient INT                 NULL,
        CONSTRAINT PK_Comptes PRIMARY KEY (Id)
        -- FK optionnelle (décommenter quand vous lierez comptes et clients) :
        -- , CONSTRAINT FK_Comptes_Clients FOREIGN KEY (IdClient) REFERENCES dbo.Clients(Id)
    );
END
GO

-- ========== ÉTAPE F : Table Locations (réservations) ==========
IF OBJECT_ID(N'dbo.Locations', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Locations
    (
        Id           INT IDENTITY(1,1) NOT NULL,
        IdClient     INT               NOT NULL,
        Matricule    NVARCHAR(255)     NOT NULL,
        DateDebut    DATE              NOT NULL,
        DateFin      DATE              NOT NULL,
        NombreJours  INT               NOT NULL,
        PrixTotal    FLOAT             NOT NULL,
        DateCreation DATETIME2         NOT NULL CONSTRAINT DF_Locations_DateCreation DEFAULT (SYSUTCDATETIME()),
        CONSTRAINT PK_Locations PRIMARY KEY (Id),
        CONSTRAINT FK_Locations_Clients FOREIGN KEY (IdClient) REFERENCES dbo.Clients (Id)
    );

    CREATE INDEX IX_Locations_IdClient ON dbo.Locations (IdClient);
    CREATE INDEX IX_Locations_Matricule ON dbo.Locations (Matricule);
END
GO

-- ========== ÉTAPE E : Données minimales pour tester l'auth ==========
-- Le contrôleur accorde le rôle Admin si Username == "Admin" (indépendamment de Role en BDD)
IF NOT EXISTS (SELECT 1 FROM dbo.Comptes WHERE Username = N'Admin')
BEGIN
    INSERT INTO dbo.Comptes (Username, Password, Role)
    VALUES (N'Admin', N'admin', N'Admin');
END
GO

-- Vérification
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
GO
