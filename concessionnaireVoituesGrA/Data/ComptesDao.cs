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
            // Code pour ajouter un compte à la base de données
            connection.Open();
            string sql = @$"INSERT INTO Comptes (Username, Password, Role) 
                        VALUES (@Username, @Password, @Role)";
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
    }
}
