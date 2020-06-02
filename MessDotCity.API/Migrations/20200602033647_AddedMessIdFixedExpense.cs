using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class AddedMessIdFixedExpense : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MessId",
                table: "FixedExpenses",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MessId",
                table: "FixedExpenses");
        }
    }
}
