using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskTrackr_API.Models;

namespace TaskTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _web;
        public UserController(MyDbContext context, IConfiguration configuration, IWebHostEnvironment web)
        {
            _context = context;
            _configuration = configuration;
            _web = web;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Registration([FromForm] UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid Data Provided!" });
            }

            if (await isEmailExsits(model.Email))
            {
                return BadRequest(new { Email = "Email Already Exists!" });
            }

            if (await isUserNameExsits(model.UserName))
            {
                return BadRequest(new { UserName = "UserName Already Exists!" });
            }

            model.Id = Guid.NewGuid();
            model.Password = hashPassword(model.Password);
            model.Role = "Employee";
            _context.Users.Add(model);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Register Successfully" });
        }

        private string? hashPassword(string? password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private async Task<bool> isUserNameExsits(string? userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName);
        }
        private async Task<bool> isEmailExsits(string? email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromForm] SigninModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid Data Provided!" });
            }

            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { EmailAndPassword = "Invalid Email or Password!" });
            }

            if (!varifyPasswors(model.Password, user.Password))
            {
                return BadRequest(new { Password = "Invalid Password!" });
            }

            var token = GenerateJwtToken(user);

            return Ok(new { message = "Sign in Successfully!", token, user });
        }

        private object GenerateJwtToken(UserModel model)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Email, model.Email!),
                new Claim(JwtRegisteredClaimNames.Sub, model.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, model.UserName!),
                new Claim(ClaimTypes.Role, model.Role!),
            };

            var token = new JwtSecurityToken(_configuration["JWT:Issuer"],
                _configuration["JWT:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool varifyPasswors(string? password1, string? password2)
        {
            return BCrypt.Net.BCrypt.Verify(password1, password2);
        }

        [HttpGet("FetchDataById")]
        public async Task<IActionResult> FetchDataById(string id)
        {
            var data = await _context.Users.FirstOrDefaultAsync(x => x.Id.ToString() == id);
            return Ok(data);
        }

        [HttpPost("UpdateUserData")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpDateData([FromForm] UserUpdateModel model, IFormFile file, string id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id.ToString() == id);
            if (user == null)
            {
                return BadRequest(new { message = "User Not Found" });
            }

            if (!string.IsNullOrEmpty(model.FirstName))
                user.FirstName = model.FirstName;

            if (!string.IsNullOrEmpty(model.LastName))
                user.LastName = model.LastName;

            if (file != null)
            {
                var imageName = "User_" + DateTime.Now.Millisecond + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(_web.WebRootPath, "UserImages", imageName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                user.UserImage = imageName;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Data Update Successfully!", user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        [HttpGet("GetEmployees")]
        public async Task<IActionResult> FetchEmployees()
        {
            var employees = await _context.Users.Where(x => x.Role == "Employee").ToListAsync();
            return Ok(employees);
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> AllUsers()
        {
            var users = await _context.Users.OrderByDescending(x => x.Id).ToListAsync();
            if (!users.Any())
            {
                return BadRequest(new { ErrorMsg = "Users Not Found!" });
            }
            return Ok(users);
        }

    }
}
