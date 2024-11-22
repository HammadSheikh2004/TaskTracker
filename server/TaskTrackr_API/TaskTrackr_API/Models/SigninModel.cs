using System.ComponentModel.DataAnnotations;

namespace TaskTrackr_API.Models
{
    public class SigninModel
    {
        [Required(ErrorMessage = "Email is Requied!")]
        public string? Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Password is Requied!")]
        public string? Password { get; set; } = string.Empty;
    }
}
