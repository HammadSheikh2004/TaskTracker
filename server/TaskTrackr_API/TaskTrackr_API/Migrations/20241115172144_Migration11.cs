using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskTrackr_API.Migrations
{
    public partial class Migration11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("769b8f83-96ed-46a9-8a21-ef4ea53c34e7"));

            migrationBuilder.AlterColumn<string>(
                name: "StartDate",
                table: "SendTaskToSpecificEmps",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "EndDate",
                table: "SendTaskToSpecificEmps",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("abb9a76c-efd6-4b0b-a9f6-526f66a9d19a"), new DateTime(2024, 11, 15, 22, 21, 43, 965, DateTimeKind.Local).AddTicks(2312), "admin@gmail.com", "", "", "$2a$11$Im201zKy/kHTPer4BYZkEehYViNjTDCrccl8dB1Fd05Kl4xbdHHlm", "Admin", new DateTime(2024, 11, 15, 22, 21, 43, 965, DateTimeKind.Local).AddTicks(2339), "", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("abb9a76c-efd6-4b0b-a9f6-526f66a9d19a"));

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "SendTaskToSpecificEmps",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "SendTaskToSpecificEmps",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Password", "Role", "UpdatedAt", "UserImage", "UserName" },
                values: new object[] { new Guid("769b8f83-96ed-46a9-8a21-ef4ea53c34e7"), new DateTime(2024, 11, 14, 22, 34, 52, 580, DateTimeKind.Local).AddTicks(441), "admin@gmail.com", "", "", "$2a$11$gwyXR2R9OFhH5nIyYsy1We9vfrDXuvIovTRFcwf3cIibgyStlA.56", "Admin", new DateTime(2024, 11, 14, 22, 34, 52, 580, DateTimeKind.Local).AddTicks(462), "", "Admin" });
        }
    }
}
