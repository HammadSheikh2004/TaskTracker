using System.ComponentModel.DataAnnotations;

namespace TaskTrackr_API.Models
{
    public class EmployeeTask
    {
        [Key]
        public Guid Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string DocumentFile { get; set; }
    }
}
