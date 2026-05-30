-- Migration : créer la table Locations si elle n'existe pas encore
-- Exécuter sur la base concessionnaireVoituresGrA (LocalDB)

USE concessionnaireVoituresGrA;
GO

IF OBJECT_ID(N'dbo.Locations', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Locations
    (
        Id        INT IDENTITY(1,1) NOT NULL,
        Username  NVARCHAR(255)     NOT NULL,
        CINE      NVARCHAR(255)     NOT NULL,
        Matricule NVARCHAR(255)     NOT NULL,
        DateDebut DATE              NOT NULL,
        DateFin   DATE              NOT NULL,
        CONSTRAINT PK_Locations PRIMARY KEY (Id)
    );
    PRINT 'Table Locations créée.';
END
ELSE
BEGIN
    PRINT 'Table Locations existe déjà.';
END
GO
