namespace concessionnaireVoituesGrA.Entities
{
    public class VoitureEntity
    {
        public int Id { get; set; }
        public string Matricule { get; set; }
        public string Marque { get; set; }
        public string Modele { get; set; }
        public int Annee { get; set; }
        public double PrixLocation { get; set; }
    }
}
