using Dentist.DTOs;
using FluentValidation;

namespace Dentist.Validator
{
    public class NewAppointDTOValidator : AbstractValidator<NewAppointDTO>
    {
        public NewAppointDTOValidator()
        {
            RuleFor(a => a.DescriptionOfAppointment).NotEmpty();
            RuleFor(a => a.Start).NotEmpty()
                .Must(s => s.DayOfWeek != DayOfWeek.Saturday && s.DayOfWeek != DayOfWeek.Sunday)
                .WithMessage("Start must be a weekday")
                .Must(s => s.Hour >= 9 && s.Hour < 17).WithMessage("Working hours are 9-17h")
                .Must(s => s.Minute == 0 || s.Minute == 30).WithMessage("Start must be at full or half hour")
                .Must(s => s > DateTime.Now).WithMessage("Time must be in future");
            RuleFor(a => a.Duration).NotEmpty()
                .Must((a, d) => d == 30 || (d == 60 && a.Start.Hour != 18 && a.Start.Minute != 30))
                .WithMessage("Duration must be 30 or 60 minutes. If the start is at 18:30, duration must be 30 minutes.");
        }
    }
}
