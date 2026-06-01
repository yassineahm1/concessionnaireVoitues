-- Migration : table Locations (réservations)
USE concessionnaireVoituresGrA;
GO

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
