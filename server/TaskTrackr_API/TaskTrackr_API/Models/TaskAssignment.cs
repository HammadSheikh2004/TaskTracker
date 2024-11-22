using System.ComponentModel.DataAnnotations;

namespace TaskTrackr_API.Models
{
    public class TaskAssignment
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
        public bool isTaskDone { get; set; } = false;
        public DateTime AssignedDate { get; set; }
        public EmployeeTask Task { get; set; }
        public UserModel User { get; set; }  
    }
}
