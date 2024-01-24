using Dentist.Enums;

namespace Dentist.DTOs
{
    public class NewAppointDTO
    {
        public string DescriptionOfAppointment { get; set; } = null!;
        public DateTime Start { get; set; }
        public Duration Duration { get; set; }
    }
}
