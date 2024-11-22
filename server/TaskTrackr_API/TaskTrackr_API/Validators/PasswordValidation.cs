using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace TaskTrackr_API.Validators
{
    public class PasswordValidation : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return new ValidationResult("Password is Required");
            }

            var password = value as string;

            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperCase = new Regex(@"[A-Z]+");
            var hasLowerCase = new Regex(@"[a-z]+");
            var hasMinMixCharacter = new Regex(@".{8,}");
            var hasSpecialCharacter = new Regex(@"[!@#$%^&*(),.?""':{}|<>]");

            if (!hasNumber.IsMatch(password!))
            {
                return new ValidationResult("Password must be atleast One Numeric(0-9) digit!");
            }
            else if(!hasUpperCase.IsMatch(password!))
            {
                return new ValidationResult("Password must be atleast One Upper Case Character!");
            }
            else if (!hasLowerCase.IsMatch(password!))
            {
                return new ValidationResult("Password must be atleast One Lower Case Character!");
            }
            else if (!hasMinMixCharacter.IsMatch(password!))
            {
                return new ValidationResult("Password must be atleast 8 Character long!");
            }
            else if (!hasSpecialCharacter.IsMatch(password!))
            {
                return new ValidationResult("Password must be atleast One Special Character!");
            }

            return ValidationResult.Success;
        }
    }
}
