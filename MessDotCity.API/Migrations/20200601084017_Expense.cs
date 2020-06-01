using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class Expense : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Day = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false),
                    Expense = table.Column<float>(nullable: false),
                    ResponsibleMember = table.Column<string>(nullable: true),
                    TotalMeal = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyExpenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    MemberId = table.Column<int>(nullable: false),
                    Day = table.Column<DateTime>(nullable: false),
                    BreakFast = table.Column<float>(nullable: false),
                    Lunch = table.Column<float>(nullable: false),
                    Dinner = table.Column<float>(nullable: false),
                    MessId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => new { x.MemberId, x.Day });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyExpenses");

            migrationBuilder.DropTable(
                name: "Meals");
        }
    }
}
