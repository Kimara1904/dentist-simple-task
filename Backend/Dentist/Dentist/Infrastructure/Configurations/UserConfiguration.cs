using Dentist.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dentist.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.FirstName).IsRequired();
            builder.Property(x => x.LastName).IsRequired();
            builder.Property(x => x.Role).IsRequired().HasConversion<int>();
            builder.Property(x => x.JMBG).HasMaxLength(13);
            builder.HasIndex(x => x.JMBG).IsUnique();
            builder.HasData(new User()
            {
                Id = 1,
                Email = "zubar@dentist.com",
                FirstName = "Zubarko",
                LastName = "Zubic",
                JMBG = "1111111111111",
                Role = Enums.Role.Dentist
            });
        }
    }
}
