using AutoMapper;
using Dentist.DTOs;
using Dentist.Models;

namespace Dentist.Mapper
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<NewPatientDTO, User>();
            CreateMap<User, PatientDTO>();
        }
    }
}
