using Dentist.DTOs;
using FluentValidation;

namespace Dentist.Validator
{
    public class NewPatientDTOValidator : AbstractValidator<NewPatientDTO>
    {
        public NewPatientDTOValidator()
        {
            RuleFor(p => p.FirstName).NotEmpty();
            RuleFor(p => p.LastName).NotEmpty();
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.JMBG).NotEmpty().Length(13).Must(jmbg => jmbg.All(char.IsDigit)).WithMessage("Jmbg must contain only numbers");
        }
    }
}
