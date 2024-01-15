using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lmss_fullstack.Migrations
{
    public partial class updateUserAndBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Users_CreatedByUserID",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CreatedByUserID",
                table: "Books");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByUserID",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Books",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_UserId",
                table: "Books",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Users_UserId",
                table: "Books",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Users_UserId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_UserId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Books");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByUserID",
                table: "Books",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Books_CreatedByUserID",
                table: "Books",
                column: "CreatedByUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Users_CreatedByUserID",
                table: "Books",
                column: "CreatedByUserID",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
