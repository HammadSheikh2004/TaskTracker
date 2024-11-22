using Microsoft.EntityFrameworkCore;

namespace TaskTrackr_API.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<SendTaskModel> Tasks { get; set; }
        public DbSet<EmployeeTask> EmployeeTasks { get; set; }
        public DbSet<TaskAssignment> TaskAssignments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var hashPassword = BCrypt.Net.BCrypt.HashPassword("Admin@12345");
            modelBuilder.Entity<UserModel>().HasData(new UserModel
            {
                Id = Guid.NewGuid(),
                UserName = "Admin",
                Email = "admin@gmail.com",
                Password = hashPassword,
                Role = "Admin",
            });
        }
    }
}
