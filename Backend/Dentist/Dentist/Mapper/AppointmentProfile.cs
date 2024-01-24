using AutoMapper;
using Dentist.DTOs;
using Dentist.Models;

namespace Dentist.Mapper
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            CreateMap<NewAppointDTO, Appointment>();
            CreateMap<Appointment, AppointmentDTO>();
            CreateMap<Appointment, TakenAppointmentDTO>();
            CreateMap<Appointment, PatientsAppointmentDTO>();
        }
    }
}
