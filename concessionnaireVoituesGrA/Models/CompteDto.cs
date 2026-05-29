using System.ComponentModel.DataAnnotations;

namespace concessionnaireVoituesGrA.Models
{
    public class CompteDto
    {
        public string Username { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
