using concessionnaireVoituesGrA.Domains;
using concessionnaireVoituesGrA.Entities;
using concessionnaireVoituesGrA.Services;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data.Common;
namespace concessionnaireVoituesGrA.Data
{
    public class ClientsDao

    {
        DbConnection connection;
        //SqlConnection connection;
        InterfaceDbFactory factory;
        public ClientsDao(InterfaceDbFactory factory) //DI
        {
            this.factory = factory;
            // Code pour initialiser la connexion à la base de données
            connection = factory.CreateConnection();

        }
        public void Ajouter(Client client)
        {
            ClientEntity clientEntity = new ClientEntity();
            AutoMapping<Client, ClientEntity>.Map(client, clientEntity);
            // Code pour ajouter un client à la base de données
            connection.Open();
            string sql = @$"INSERT INTO Clients (CINE, Nom, Prenom, Tel, Adresse) VALUES (@CINE, @Nom, @Prenom, @Tel, @Adresse)";
            connection.Execute(sql, clientEntity);
            connection.Close();     
        }
        public int AjouterEtRetournerId(Client client)
        {
            ClientEntity clientEntity = new ClientEntity();
            AutoMapping<Client, ClientEntity>.Map(client, clientEntity);
            connection.Open();
            string sql = @"INSERT INTO Clients (CINE, Nom, Prenom, Tel, Adresse) 
                           VALUES (@CINE, @Nom, @Prenom, @Tel, @Adresse);
                           SELECT CAST(SCOPE_IDENTITY() as int);";
            int insertedId = connection.ExecuteScalar<int>(sql, clientEntity);
            connection.Close();
            return insertedId;
        }
        public Client GetClient(string cine)
        {
            // Code pour récupérer les informations d'un client à partir de la base de données
            connection.Open();
            string sql = @$"SELECT * FROM Clients WHERE CINE = @CINE";
            ClientEntity clientEntity = connection.QuerySingleOrDefault<ClientEntity>(sql, new { CINE = cine });
            connection.Close();
            if (clientEntity == null)
                return null;
            Client client = new Client();
            AutoMapping<ClientEntity, Client>.Map(clientEntity, client);
           
            return client; // Retourne un objet Client avec les informations récupérées
        }
        public List<Client> GetAllClients()
        {
            // Code pour récupérer la liste de tous les clients à partir de la base de données
            connection.Open();
            string sql = @$"SELECT * FROM Clients";
            List<ClientEntity> liste1 = connection.Query<ClientEntity>(sql).ToList();
            connection.Close();
            List<Client> liste2  = new List<Client>();
            foreach (var item in liste1)
            {
                Client client = new Client();
                AutoMapping<ClientEntity, Client>.Map(item, client);
                liste2.Add(client);
            }
           
           
            return liste2; // Retourne une liste d'objets Client avec les informations récupérées
        }

        public bool Modifier(string cine, Client client)
        {
            ClientEntity clientEntity = new ClientEntity();
            AutoMapping<Client, ClientEntity>.Map(client, clientEntity);
            // Code pour modifier les informations d'un client dans la base de données
            connection.Open();
            string sql= @$"UPDATE Clients SET CINE=@CINE, Nom = @Nom, Prenom = @Prenom, Tel = @Tel, Adresse = @Adresse WHERE CINE = '{cine}'";
            connection.Execute(sql, clientEntity);
            connection.Close();
            return true; // Retourne true si la modification a réussi, sinon false
        }
        public bool Supprimer(string cine)
        {
            // Code pour supprimer un client de la base de données
            connection.Open();
            string sql = @$"Delete from Clients WHERE CINE = @CINE";
            connection.Execute(sql, new { CINE=cine});
            connection.Close();
            return true; // Retourne true si la suppression a réussi, sinon false
        }
        public int? GetClientIdByCine(string cine)
        {
            connection.Open();
            string sql = "SELECT Id FROM Clients WHERE CINE = @CINE";
            int? id = connection.QuerySingleOrDefault<int?>(sql, new { CINE = cine });
            connection.Close();
            return id;
        }
        public Client GetClientById(int id)
        {
            connection.Open();
            string sql = "SELECT * FROM Clients WHERE Id = @Id";
            ClientEntity clientEntity = connection.QuerySingleOrDefault<ClientEntity>(sql, new { Id = id });
            connection.Close();
            if (clientEntity == null)
                return null;
            Client client = new Client();
            AutoMapping<ClientEntity, Client>.Map(clientEntity, client);
            return client;
        }
    }
}
