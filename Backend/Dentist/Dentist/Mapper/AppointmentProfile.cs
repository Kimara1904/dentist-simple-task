using AutoMapper;
using Dentist.DTOs;
using Dentist.Enums;
using Dentist.Models;

namespace Dentist.Mapper
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            CreateMap<NewAppointDTO, Appointment>()
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => (Duration)src.Duration);
            CreateMap<Appointment, AppointmentDTO>();
            CreateMap<Appointment, TakenAppointmentDTO>();
            CreateMap<Appointment, PatientsAppointmentDTO>();
        }
    }
}
