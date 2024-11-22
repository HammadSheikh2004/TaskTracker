using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskTrackr_API.Models;
using TaskTrackr_API.SignalR;

namespace TaskTrackr_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<MyDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MyConn")));

            var jwtIssuer = builder.Configuration.GetSection("JWT:Issuer").Get<string>();
            var jwtKey = builder.Configuration.GetSection("JWT:Key").Get<string>();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });

            builder.Services.AddCors(cor =>
                cor.AddPolicy("myApi", x =>
                    x.WithOrigins("http://localhost:5173") 
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials() 
                 ));

            builder.Services.AddSignalR();

            var app = builder.Build();
            app.UseCors("myApi");
            app.UseAuthorization();


            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseStaticFiles();

            app.MapControllers();

            app.MapHub<Notification>("/notification");

            app.Run();
        }
    }
}