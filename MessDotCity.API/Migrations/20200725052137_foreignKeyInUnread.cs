using Microsoft.EntityFrameworkCore.Migrations;

namespace MessDotCity.API.Migrations
{
    public partial class foreignKeyInUnread : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UnreadNotices_NoticeId",
                table: "UnreadNotices",
                column: "NoticeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UnreadNotices_Notices_NoticeId",
                table: "UnreadNotices",
                column: "NoticeId",
                principalTable: "Notices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UnreadNotices_Notices_NoticeId",
                table: "UnreadNotices");

            migrationBuilder.DropIndex(
                name: "IX_UnreadNotices_NoticeId",
                table: "UnreadNotices");
        }
    }
}
