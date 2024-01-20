using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lmss_fullstack.Migrations
{
    public partial class AddStock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Books");
        }
    }
}
