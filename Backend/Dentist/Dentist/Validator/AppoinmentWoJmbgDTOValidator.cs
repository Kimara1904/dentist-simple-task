using Dentist.DTOs;
using FluentValidation;

namespace Dentist.Validator
{
    public class AppoinmentWoJmbgDTOValidator : AbstractValidator<AppointmentWithoutJmbgDTO>
    {
        public AppoinmentWoJmbgDTOValidator()
        {
            RuleFor(dto => dto.NewPatient).NotNull()
                .SetValidator(new NewPatientDTOValidator());

            RuleFor(dto => dto.NewAppoint).NotNull()
                .SetValidator(new NewAppointDTOValidator());
        }
    }
}
