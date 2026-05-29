using concessionnaireVoituesGrA.Domains;
using Microsoft.Data.SqlClient;
using Dapper;
using concessionnaireVoituesGrA.Entities;
using concessionnaireVoituesGrA.Services;
using System.Data.Common;
namespace concessionnaireVoituesGrA.Data
{
    public class VoituresDao
    {
        DbConnection connection; //DbConnection est une classe de base abstraite pour les connexions 
        //SqlConnection connection;
        InterfaceDbFactory factory;
        public VoituresDao(InterfaceDbFactory factory) //DI
        {
            this.factory = factory;
            // Code pour initialiser la connexion à la base de données
            connection = factory.CreateConnection();

        }
        public void Ajouter(Voiture voiture)
        {
            VoitureEntity voitureEntity = new VoitureEntity();
            AutoMapping<Voiture, VoitureEntity>.Map(voiture, voitureEntity);

            // Code pour ajouter une voiture à la base de données
            connection.Open();
            string sql = @$"INSERT INTO Voitures(Matricule, Marque, Modele, Annee, PrixLocation) 
                        VALUES (@Matricule, @Marque, @Modele, @Annee, @PrixLocation)";
            connection.Execute(sql, voiture );
            connection.Close();
        }
        public Voiture GetVoiture(string matricule)
        {
            connection.Open();
            string sql = @$"Select * from Voitures Where Matricule=@Matricule";
            VoitureEntity voitureEntity= connection.QuerySingleOrDefault<VoitureEntity>(sql, new {Matricule=matricule});
            connection.Close();
            if (voitureEntity == null)
                return null;
            Voiture voiture = new Voiture();
            AutoMapping<VoitureEntity, Voiture>.Map(voitureEntity, voiture);
            return voiture;
        }
        public List<Voiture> GetAllVoitures()
        {
            // Code pour récupérer la liste de tous les clients à partir de la base de données
            connection.Open();
            string sql = @$"SELECT * FROM Voitures";
            List<VoitureEntity> liste1 = connection.Query<VoitureEntity>(sql).ToList();
            connection.Close();
            List<Voiture> liste2 = new List<Voiture>();
            foreach (var item in liste1)
            {
                Voiture voiture = new Voiture();
                AutoMapping<VoitureEntity, Voiture>.Map(item, voiture);
                liste2.Add(voiture);
            }

            return liste2; // Retourne une liste d'objets Client avec les informations récupérées
        }

        public bool Modifier(string matricule, Voiture voiture)
        {
            VoitureEntity voitureEntity = new VoitureEntity();
            AutoMapping<Voiture, VoitureEntity>.Map(voiture, voitureEntity);
           
            connection.Open();
            string sql = @$"UPDATE Voitures SET Matricule=@Matricule, Marque=@Marque, Modele=@Modele,
                            Annee=@Annee, PrixLocation=@PrixLocation Where Matricule='{matricule}'";
            connection.Execute(sql, voitureEntity);
            connection.Close();
            return true; // Retourne true si la modification a réussi, sinon false
        }
        public bool Supprimer(string matricule)
        {
            connection.Open();
            string sql = @$"Delete from Voitures WHERE Matricule = @Matricule";
            connection.Execute(sql, new { Matricule = matricule });
            connection.Close();
            return true; // Retourne true si la suppression a réussi, sinon false
        }
    }
}
