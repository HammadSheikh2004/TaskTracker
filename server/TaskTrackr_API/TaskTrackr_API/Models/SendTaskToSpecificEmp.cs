using System.ComponentModel.DataAnnotations;

namespace TaskTrackr_API.Models
{
    public class SendTaskToSpecificEmp
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string? StartDate { get; set; }
        [Required] 
        public string? EndDate { get; set; }
        [Required]
        public string EmployeeIds { get; set; }
        public string? DocumentFile { get; set; }
    }
}
