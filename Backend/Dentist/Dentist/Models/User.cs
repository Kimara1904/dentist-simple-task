using Dentist.Enums;

namespace Dentist.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string JMBG { get; set; } = null!;
        public Role Role { get; set; }
        public virtual List<Appointment> Appointments { get; set; } = null!;
    }
}
