using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lmss_fullstack.Migrations
{
    public partial class BookCreatedBy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedByUserID",
                table: "Books",
                newName: "CreatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Books",
                newName: "CreatedByUserID");
        }
    }
}
