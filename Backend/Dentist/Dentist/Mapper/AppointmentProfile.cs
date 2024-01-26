using AutoMapper;
using Dentist.DTOs;
using Dentist.Enums;
using Dentist.Models;
using System.Globalization;

namespace Dentist.Mapper
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            CreateMap<NewAppointDTO, Appointment>()
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => (Duration)src.Duration))
                .ForMember(dest => dest.WeekNumber, opt =>
                opt.MapFrom(src => DateTimeFormatInfo.CurrentInfo.Calendar.GetWeekOfYear(src.Start, CalendarWeekRule.FirstDay, DayOfWeek.Monday)));
            CreateMap<Appointment, AppointmentDTO>()
                .ForMember(dest => dest.End, opt => opt.MapFrom(src => src.Start.AddMinutes((double)src.Duration)));
            CreateMap<Appointment, TakenAppointmentDTO>()
                .ForMember(dest => dest.End, opt => opt.MapFrom(src => src.Start.AddMinutes((double)src.Duration)));
            CreateMap<Appointment, PatientsAppointmentDTO>()
                .ForMember(dest => dest.End, opt => opt.MapFrom(src => src.Start.AddMinutes((double)src.Duration)));
        }
    }
}
