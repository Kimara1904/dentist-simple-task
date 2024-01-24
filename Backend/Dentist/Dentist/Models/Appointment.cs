using Dentist.Enums;

namespace Dentist.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public virtual User Patient { get; set; } = null!;
        public string DescriptionOfAppointment { get; set; } = null!;
        public DateTime Start { get; set; }
        public Duration Duration { get; set; }
        public bool IsAppointedByDentist { get; set; }
        public bool IsCancelled { get; set; }
    }
}
