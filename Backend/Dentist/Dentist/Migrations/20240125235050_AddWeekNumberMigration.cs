using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dentist.Migrations
{
    /// <inheritdoc />
    public partial class AddWeekNumberMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAppointedByDentist",
                table: "Appointments");

            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "Appointments");

            migrationBuilder.AddColumn<bool>(
                name: "IsAppointedByDentist",
                table: "Appointments",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
