namespace concessionnaireVoituesGrA.Models
{
    public class LocationDto
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public string Matricule { get; set; }
        public string Marque { get; set; }
        public string Modele { get; set; }
        public string DateDebut { get; set; }
        public string DateFin { get; set; }
        public int NombreJours { get; set; }
        public double PrixTotal { get; set; }
        public string ClientNom { get; set; }
        public string ClientPrenom { get; set; }
    }

    public class LocationCreateDto
    {
        public string Matricule { get; set; }
        public string DateDebut { get; set; }
        public int NombreJours { get; set; }
    }
}
