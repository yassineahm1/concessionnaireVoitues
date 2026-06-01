namespace concessionnaireVoituesGrA.Domains
{
    public class Facture
    {
        // Identifiant de la réservation concernée
        public int      IdLocation    { get; set; }
        public int      IdClient      { get; set; }
        public DateTime DateCreation  { get; set; }

        // Informations client
        public string ClientNom      { get; set; }
        public string ClientPrenom   { get; set; }
        public string ClientCINE     { get; set; }
        public string ClientTel      { get; set; }
        public string ClientAdresse  { get; set; }

        // Informations véhicule
        public string Matricule      { get; set; }
        public string Marque         { get; set; }
        public string Modele         { get; set; }
        public int    Annee          { get; set; }
        public double PrixParJour    { get; set; }

        // Période de location
        public DateTime DateDebut    { get; set; }
        public DateTime DateFin      { get; set; }
        public int      NombreJours  { get; set; }

        // Montant total (en MAD)
        public double PrixTotal      { get; set; }
    }
}

