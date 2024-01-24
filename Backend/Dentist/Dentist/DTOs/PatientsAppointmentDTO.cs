namespace Dentist.DTOs
{
    public class PatientsAppointmentDTO
    {
        public int Id { get; set; }
        public string DescriptionOfAppointment { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
