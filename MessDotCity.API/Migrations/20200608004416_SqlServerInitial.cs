using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class SqlServerInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
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
                name: "Deposits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Debit = table.Column<float>(nullable: false),
                    Credit = table.Column<float>(nullable: false),
                    MemberId = table.Column<int>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    MessId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deposits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FixedExpenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Amount = table.Column<float>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    Remarks = table.Column<string>(nullable: true),
                    LastModifiedOn = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FixedExpenses", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DBreakfast = table.Column<float>(nullable: false),
                    DLunch = table.Column<float>(nullable: false),
                    DDinner = table.Column<float>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    PhotoName = table.Column<string>(nullable: true),
                    Profession = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    LastModifiedOn = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false),
                    MessRole = table.Column<string>(nullable: true)
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MessName = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    SecretCode = table.Column<string>(nullable: true),
                    MealChangeFrom = table.Column<DateTime>(nullable: false),
                    MealChangeTo = table.Column<DateTime>(nullable: false),
                    OwnerId = table.Column<string>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    LastModifiedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    SessionStart = table.Column<DateTime>(nullable: false),
                    SessionEnd = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false),
                    LastModifiedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    Profession = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false),
                    IsMobileVerified = table.Column<bool>(nullable: false),
                    IsEmailVerified = table.Column<bool>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    RequestedOn = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Requests_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Requests_UserId",
                table: "Requests",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyExpenses");

            migrationBuilder.DropTable(
                name: "Deposits");

            migrationBuilder.DropTable(
                name: "FixedExpenses");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropTable(
                name: "Messes");

            migrationBuilder.DropTable(
                name: "Requests");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
