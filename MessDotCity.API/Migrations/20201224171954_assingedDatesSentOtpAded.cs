using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class assingedDatesSentOtpAded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AssignedDates",
                columns: table => new
                {
                    DateAssigned = table.Column<DateTime>(nullable: false),
                    MessId = table.Column<int>(nullable: false),
                    MemberAssigned = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignedDates", x => new { x.DateAssigned, x.MessId });
                });

            migrationBuilder.CreateTable(
                name: "SentOtps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OtpCode = table.Column<string>(nullable: true),
                    OtpFor = table.Column<string>(nullable: true),
                    MobileNo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentOtps", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssignedDates");

            migrationBuilder.DropTable(
                name: "SentOtps");
        }
    }
}
