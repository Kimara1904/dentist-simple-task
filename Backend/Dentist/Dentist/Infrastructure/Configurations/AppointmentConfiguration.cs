using Dentist.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dentist.Infrastructure.Configurations
{
    public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DescriptionOfAppointment).IsRequired();
            builder.Property(x => x.Start).IsRequired();
            builder.Property(x => x.Duration).IsRequired();
            builder.Property(x => x.IsAppointedByDentist).IsRequired();
            builder.Property(x => x.IsCancelled).HasDefaultValue(false);
            builder.HasOne(x => x.Patient).WithMany(x => x.Appointments).HasForeignKey(x => x.PatientId);
        }
    }
}
