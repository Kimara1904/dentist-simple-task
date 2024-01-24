using Dentist.Models;
using Microsoft.EntityFrameworkCore;

namespace Dentist.Infrastructure
{
    public class DentistDatabaseContext : DbContext
    {
        private DbSet<User> Users { get; set; }
        private DbSet<Appointment> Appointments { get; set; }

        public DentistDatabaseContext(DbContextOptions<DentistDatabaseContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DentistDatabaseContext).Assembly);
        }
    }
}
