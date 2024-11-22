using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class Migration10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4539868f-91c5-4f09-88f2-ab287facea85"));

            migrationBuilder.AlterColumn<string>(
                name: "DocumentFile",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "SendTaskToSpecificEmps",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeeIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentFile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SendTaskToSpecificEmps", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("769b8f83-96ed-46a9-8a21-ef4ea53c34e7"), new DateTime(2024, 11, 14, 22, 34, 52, 580, DateTimeKind.Local).AddTicks(441), "admin@gmail.com", "", "", "$2a$11$gwyXR2R9OFhH5nIyYsy1We9vfrDXuvIovTRFcwf3cIibgyStlA.56", "Admin", new DateTime(2024, 11, 14, 22, 34, 52, 580, DateTimeKind.Local).AddTicks(462), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SendTaskToSpecificEmps");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("769b8f83-96ed-46a9-8a21-ef4ea53c34e7"));

            migrationBuilder.AlterColumn<string>(
                name: "DocumentFile",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("4539868f-91c5-4f09-88f2-ab287facea85"), new DateTime(2024, 11, 2, 2, 9, 20, 198, DateTimeKind.Local).AddTicks(7613), "admin@gmail.com", "", "", "$2a$11$K3kkO96PQZAkz4KeKg2aQe6ZJrbnts2lm/SDCyf.cIosKqAd3VsjG", "Admin", new DateTime(2024, 11, 2, 2, 9, 20, 198, DateTimeKind.Local).AddTicks(7629), "", "Admin" });
        }
    }
}
