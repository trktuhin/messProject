using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class MessMemberEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DBreakfast = table.Column<float>(nullable: false),
                    DLunch = table.Column<float>(nullable: false),
                    DDinner = table.Column<float>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    PhotoName = table.Column<string>(nullable: true),
                    Profession = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Messes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MessName = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    SecretCode = table.Column<string>(nullable: true),
                    MealChangeFrom = table.Column<DateTime>(nullable: false),
                    MealChangeTo = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropTable(
                name: "Messes");
        }
    }
}
