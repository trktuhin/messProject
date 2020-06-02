using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class AddedFixedExpense : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Amount = table.Column<float>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    LastModifiedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FixedExpenses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FixedExpenses");
        }
    }
}
