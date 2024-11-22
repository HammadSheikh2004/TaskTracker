using System.ComponentModel.DataAnnotations;
using TaskTrackr_API.Validators;

namespace TaskTrackr_API.Models
{
    public class UserModel
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required(ErrorMessage = "UserName field is requied!")]
        public string? UserName { get; set; }
        [Required(ErrorMessage = "Email field is requied!")]
        [EmailAddress]
        public string? Email { get; set; }
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        [PasswordValidation]
        public string? Password { get; set; }
        public string? Role { get; set; } = "Employee";
        public string? UserImage { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public ICollection<TaskAssignment>? TaskAssignments { get; set; }

    }
}
