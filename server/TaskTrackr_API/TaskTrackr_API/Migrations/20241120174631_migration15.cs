using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class migration15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("af3de1c1-61d0-4b01-848b-9281a5d97802"));

            migrationBuilder.AddColumn<bool>(
                name: "isTaskDone",
                table: "TaskAssignments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("ea3206ce-a1cb-447f-89c6-c5d76962ad3f"), new DateTime(2024, 11, 20, 22, 46, 31, 13, DateTimeKind.Local).AddTicks(5030), "admin@gmail.com", "", "", "$2a$11$uiYMcpe/rEsBCctg0GFNPeJ5D.Fpmd1NwtK.dq0oLfi47uEO1WxXa", "Admin", new DateTime(2024, 11, 20, 22, 46, 31, 13, DateTimeKind.Local).AddTicks(5042), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("ea3206ce-a1cb-447f-89c6-c5d76962ad3f"));

            migrationBuilder.DropColumn(
                name: "isTaskDone",
                table: "TaskAssignments");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("af3de1c1-61d0-4b01-848b-9281a5d97802"), new DateTime(2024, 11, 16, 15, 7, 47, 67, DateTimeKind.Local).AddTicks(274), "admin@gmail.com", "", "", "$2a$11$yVxt31QUJF0H2OnYLptEIegVwBlauEiNcjLtdAUIZvxEY7fNtBQGK", "Admin", new DateTime(2024, 11, 16, 15, 7, 47, 67, DateTimeKind.Local).AddTicks(288), "", "Admin" });
        }
    }
}
