using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class Migartion10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("53005b29-1fad-48e8-8f2c-45514b205e73"));

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    DocId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManagerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.DocId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("4539868f-91c5-4f09-88f2-ab287facea85"), new DateTime(2024, 11, 2, 2, 9, 20, 198, DateTimeKind.Local).AddTicks(7613), "admin@gmail.com", "", "", "$2a$11$K3kkO96PQZAkz4KeKg2aQe6ZJrbnts2lm/SDCyf.cIosKqAd3VsjG", "Admin", new DateTime(2024, 11, 2, 2, 9, 20, 198, DateTimeKind.Local).AddTicks(7629), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4539868f-91c5-4f09-88f2-ab287facea85"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("53005b29-1fad-48e8-8f2c-45514b205e73"), new DateTime(2024, 10, 24, 15, 52, 36, 770, DateTimeKind.Local).AddTicks(1480), "admin@gmail.com", "", "", "$2a$11$Y1f.fpAscmdHW6ipb2KoJOvwvEZOICzC2v6f6ROZTytic5y2ScAQS", "Admin", new DateTime(2024, 10, 24, 15, 52, 36, 770, DateTimeKind.Local).AddTicks(1493), "", "Admin" });
        }
    }
}
