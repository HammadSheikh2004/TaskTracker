using System.ComponentModel.DataAnnotations;

namespace TaskTrackr_API.Models
{
    public class SendTaskModel
    {
        [Key]
        public Guid DocId { get; set; } = Guid.NewGuid();
        public string? DocumentFile { get; set; }
        [Required]
        public string? ManagerEmail { get; set; }
    }
}
