namespace concessionnaireVoituesGrA.Entities
{
    public class LocationEntity
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public string Matricule { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public int NombreJours { get; set; }
        public double PrixTotal { get; set; }
        public DateTime DateCreation { get; set; }
    }
}
