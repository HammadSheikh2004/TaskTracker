using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class migration13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1ffc17f0-161d-4f17-827c-64badaab31be"));

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "TaskAssignments");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("5e3f771b-2fdd-4673-9b2b-571ebaff595a"), new DateTime(2024, 11, 16, 3, 20, 38, 677, DateTimeKind.Local).AddTicks(7847), "admin@gmail.com", "", "", "$2a$11$y9TMKVjRQhCtDvibWLnZ9utZ7uz3jKeH8FgrtVcrdmIhlE3wDZk7u", "Admin", new DateTime(2024, 11, 16, 3, 20, 38, 677, DateTimeKind.Local).AddTicks(7859), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5e3f771b-2fdd-4673-9b2b-571ebaff595a"));

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeId",
                table: "TaskAssignments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("1ffc17f0-161d-4f17-827c-64badaab31be"), new DateTime(2024, 11, 16, 2, 50, 38, 139, DateTimeKind.Local).AddTicks(3724), "admin@gmail.com", "", "", "$2a$11$/MSOTW3UPfLSieKVdUq3jOnSTvmiOJJWk45v9Ec4LjiEH9yjkvMk.", "Admin", new DateTime(2024, 11, 16, 2, 50, 38, 139, DateTimeKind.Local).AddTicks(3739), "", "Admin" });
        }
    }
}
