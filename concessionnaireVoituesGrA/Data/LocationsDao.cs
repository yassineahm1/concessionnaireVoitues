using concessionnaireVoituesGrA.Entities;
using concessionnaireVoituesGrA.Services;
using Dapper;
using System.Data.Common;

namespace concessionnaireVoituesGrA.Data
{
    public class LocationsDao
    {
        private readonly DbConnection connection;

        public LocationsDao(InterfaceDbFactory factory)
        {
            connection = factory.CreateConnection();
        }

        public bool ExisteChevauchement(string matricule, DateTime dateDebut, DateTime dateFin, int? excludeId = null)
        {
            connection.Open();
            string sql = @"
                SELECT COUNT(1) FROM Locations
                WHERE Matricule = @Matricule
                  AND DateDebut <= @DateFin
                  AND DateFin >= @DateDebut";
            if (excludeId.HasValue)
            {
                sql += " AND Id <> @ExcludeId";
            }
            int count = connection.QuerySingle<int>(sql, new
            {
                Matricule = matricule,
                DateDebut = dateDebut.Date,
                DateFin = dateFin.Date,
                ExcludeId = excludeId
            });
            connection.Close();
            return count > 0;
        }

        public int Ajouter(LocationEntity entity)
        {
            connection.Open();
            string sql = @"
                INSERT INTO Locations (IdClient, Matricule, DateDebut, DateFin, NombreJours, PrixTotal)
                VALUES (@IdClient, @Matricule, @DateDebut, @DateFin, @NombreJours, @PrixTotal);
                SELECT CAST(SCOPE_IDENTITY() AS INT);";
            int id = connection.QuerySingle<int>(sql, new
            {
                entity.IdClient,
                entity.Matricule,
                DateDebut = entity.DateDebut.Date,
                DateFin = entity.DateFin.Date,
                entity.NombreJours,
                entity.PrixTotal
            });
            connection.Close();
            return id;
        }

        public List<LocationEntity> GetByClient(int idClient)
        {
            connection.Open();
            string sql = "SELECT * FROM Locations WHERE IdClient = @IdClient ORDER BY DateDebut DESC";
            var list = connection.Query<LocationEntity>(sql, new { IdClient = idClient }).ToList();
            connection.Close();
            return list;
        }

        public List<LocationEntity> GetAll()
        {
            connection.Open();
            string sql = "SELECT * FROM Locations ORDER BY DateDebut DESC";
            var list = connection.Query<LocationEntity>(sql).ToList();
            connection.Close();
            return list;
        }

        public LocationEntity? GetById(int id)
        {
            connection.Open();
            string sql = "SELECT * FROM Locations WHERE Id = @Id";
            var entity = connection.QuerySingleOrDefault<LocationEntity>(sql, new { Id = id });
            connection.Close();
            return entity;
        }

        public bool Supprimer(int id)
        {
            connection.Open();
            string sql = "DELETE FROM Locations WHERE Id = @Id";
            int rows = connection.Execute(sql, new { Id = id });
            connection.Close();
            return rows > 0;
        }
    }
}
