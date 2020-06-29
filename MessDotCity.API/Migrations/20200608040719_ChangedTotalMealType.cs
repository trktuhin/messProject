using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class ChangedTotalMealType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "TotalMeal",
                table: "DailyExpenses",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TotalMeal",
                table: "DailyExpenses",
                nullable: true,
                oldClrType: typeof(float));
        }
    }
}
