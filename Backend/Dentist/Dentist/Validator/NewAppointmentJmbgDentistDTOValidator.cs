using Dentist.DTOs;
using FluentValidation;

namespace Dentist.Validator
{
    public class NewAppointmentJmbgDentistDTOValidator : AbstractValidator<NewAppointmentJmbgDentistDTO>
    {
        public NewAppointmentJmbgDentistDTOValidator()
        {
            RuleFor(dto => dto.Jmbg).NotEmpty().Length(13).Must(jmbg => jmbg.All(char.IsDigit)).WithMessage("Jmbg must contain only numbers");
            RuleFor(dto => dto.NewAppoint).NotNull()
                .SetValidator(new NewAppointDTOValidator());
        }
    }
}
