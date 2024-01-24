using Dentist.DTOs;

namespace Dentist.Services.Interfaces
{
    public interface IDentistService
    {
        Task<string> AppointWithJMBG(string jmbg, NewAppointDTO newAppointment);
        Task<string> AppointWithoutJMBG(AppointmentWithoutJmbgDTO appointmentDTO);
        Task<string> Cancel(int id);
        Task<List<AppointmentDTO>> GetAllForWeek();
        Task<List<AppointmentDTO>> GetAllForDay();
        Task<bool> IsAppointmentOfPatient(int id, string jmbg);
        Task<List<PatientsAppointmentDTO>> GetAllForPatient(int id);
        Task<List<TakenAppointmentDTO>> GetTakenAppointments();
    }
}
