using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class Migration12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("abb9a76c-efd6-4b0b-a9f6-526f66a9d19a"));

            migrationBuilder.AlterColumn<string>(
                name: "DocumentFile",
                table: "SendTaskToSpecificEmps",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "EmployeeTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentFile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeTasks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaskAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AssignedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_EmployeeTasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "EmployeeTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskAssignments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("1ffc17f0-161d-4f17-827c-64badaab31be"), new DateTime(2024, 11, 16, 2, 50, 38, 139, DateTimeKind.Local).AddTicks(3724), "admin@gmail.com", "", "", "$2a$11$/MSOTW3UPfLSieKVdUq3jOnSTvmiOJJWk45v9Ec4LjiEH9yjkvMk.", "Admin", new DateTime(2024, 11, 16, 2, 50, 38, 139, DateTimeKind.Local).AddTicks(3739), "", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_TaskId",
                table: "TaskAssignments",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAssignments_UserId",
                table: "TaskAssignments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskAssignments");

            migrationBuilder.DropTable(
                name: "EmployeeTasks");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1ffc17f0-161d-4f17-827c-64badaab31be"));

            migrationBuilder.AlterColumn<string>(
                name: "DocumentFile",
                table: "SendTaskToSpecificEmps",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("abb9a76c-efd6-4b0b-a9f6-526f66a9d19a"), new DateTime(2024, 11, 15, 22, 21, 43, 965, DateTimeKind.Local).AddTicks(2312), "admin@gmail.com", "", "", "$2a$11$Im201zKy/kHTPer4BYZkEehYViNjTDCrccl8dB1Fd05Kl4xbdHHlm", "Admin", new DateTime(2024, 11, 15, 22, 21, 43, 965, DateTimeKind.Local).AddTicks(2339), "", "Admin" });
        }
    }
}
