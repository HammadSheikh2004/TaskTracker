using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class migration14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SendTaskToSpecificEmps");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5e3f771b-2fdd-4673-9b2b-571ebaff595a"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("af3de1c1-61d0-4b01-848b-9281a5d97802"), new DateTime(2024, 11, 16, 15, 7, 47, 67, DateTimeKind.Local).AddTicks(274), "admin@gmail.com", "", "", "$2a$11$yVxt31QUJF0H2OnYLptEIegVwBlauEiNcjLtdAUIZvxEY7fNtBQGK", "Admin", new DateTime(2024, 11, 16, 15, 7, 47, 67, DateTimeKind.Local).AddTicks(288), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("af3de1c1-61d0-4b01-848b-9281a5d97802"));

            migrationBuilder.CreateTable(
                name: "SendTaskToSpecificEmps",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SendTaskToSpecificEmps", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("5e3f771b-2fdd-4673-9b2b-571ebaff595a"), new DateTime(2024, 11, 16, 3, 20, 38, 677, DateTimeKind.Local).AddTicks(7847), "admin@gmail.com", "", "", "$2a$11$y9TMKVjRQhCtDvibWLnZ9utZ7uz3jKeH8FgrtVcrdmIhlE3wDZk7u", "Admin", new DateTime(2024, 11, 16, 3, 20, 38, 677, DateTimeKind.Local).AddTicks(7859), "", "Admin" });
        }
    }
}
