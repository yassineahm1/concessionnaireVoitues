using concessionnaireVoituesGrA.Domains;
using concessionnaireVoituesGrA.Entities;
using concessionnaireVoituesGrA.Services;
using Dapper;
using System.Data.Common;

namespace concessionnaireVoituesGrA.Data
{
    public class ComptesDao
    {
        InterfaceDbFactory factory;
        DbConnection connection;
        public ComptesDao(InterfaceDbFactory factory) //DI
        {
            this.factory = factory;
            connection=factory.CreateConnection();
        }
        public void Ajouter(Compte compte)
        {
            CompteEntity compteEntity = new CompteEntity();
            AutoMapping<Compte, CompteEntity>.Map(compte, compteEntity);

            if (compte.Client != null)
            {
                connection.Open();
                string sqlClient = "SELECT Id FROM Clients WHERE CINE = @CINE";
                int? clientId = connection.QuerySingleOrDefault<int?>(sqlClient, new { CINE = compte.Client.CINE });
                connection.Close();
                if (clientId.HasValue)
                {
                    compteEntity.IdClient = clientId.Value;
                }
            }

            // Code pour ajouter un compte à la base de données
            connection.Open();
            string sql = @$"INSERT INTO Comptes (Username, Password, Role, IdClient) 
                        VALUES (@Username, @Password, @Role, @IdClient)";
            connection.Execute(sql, compteEntity);
            connection.Close();
        }
        public List<Compte> GetAllComptes()
        {
            connection.Open();
            string sql = "SELECT * FROM Comptes";
            List<CompteEntity> compteEntities = connection.Query<CompteEntity>(sql).ToList();
            connection.Close();
            List<Compte> comptes = new List<Compte>();
            foreach (var compteEntity in compteEntities)
            {
                Compte compte = new Compte();
                AutoMapping<CompteEntity, Compte>.Map(compteEntity, compte);
                comptes.Add(compte);
            }
            return comptes;
        }

        internal bool Authentifier(Compte c)
        {
            connection.Open();
            string sql = "SELECT * FROM Comptes WHERE Username = @Username AND Password = @Password";
            var compteEntity = connection.QueryFirstOrDefault<CompteEntity>(sql, c);
            connection.Close();
            return compteEntity != null;
        }

        public CompteEntity GetCompteEntity(string username)
        {
            connection.Open();
            string sql = "SELECT * FROM Comptes WHERE Username = @Username";
            var entity = connection.QuerySingleOrDefault<CompteEntity>(sql, new { Username = username });
            connection.Close();
            return entity;
        }

        public void UpdateIdClient(string username, int idClient)
        {
            connection.Open();
            string sql = "UPDATE Comptes SET IdClient = @IdClient WHERE Username = @Username";
            connection.Execute(sql, new { IdClient = idClient, Username = username });
            connection.Close();
        }
    }
}
