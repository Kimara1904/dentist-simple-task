using Dentist.DTOs;
using Dentist.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Dentist.Controllers
{
    [Route("api/dentist")]
    [ApiController]
    public class DentistController : ControllerBase
    {
        private readonly IDentistService _dentistService;

        public DentistController(IDentistService dentistService)
        {
            _dentistService = dentistService;
        }

        [HttpGet("week")]
        [Authorize(Roles = "Dentist")]
        public async Task<ActionResult<Dictionary<DateTime, List<AppointmentDTO>>>> GetWeeklyAppointments()
        {
            return Ok(await _dentistService.GetAllForWeek());
        }

        [HttpGet("day")]
        [Authorize(Roles = "Dentist")]
        public async Task<ActionResult<List<AppointmentDTO>>> GetDaylyAppointments()
        {
            return Ok(await _dentistService.GetAllForDay());
        }

        [HttpGet("patients-appoint")]
        [Authorize(Roles = "Patient")]
        public async Task<ActionResult<List<PatientsAppointmentDTO>>> GetPatientsAppointments()
        {
            var patientId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            return Ok(await _dentistService.GetAllForPatient(patientId));
        }

        [HttpGet("taken")]
        [AllowAnonymous]
        public async Task<ActionResult<List<TakenAppointmentDTO>>> GetTakenAppointments()
        {
            return Ok(await _dentistService.GetTakenAppointments());
        }

        [HttpPost("appoint-with-jmbg")]
        [Authorize]
        public async Task<ActionResult<string>> MakeAppointWithJmbg([FromBody] NewAppointDTO newAppoint)
        {
            var patientsJmbg = User.Claims.First(c => c.Type == "IdNumber").Value;
            return Ok(await _dentistService.AppointWithJMBG(patientsJmbg, newAppoint));
        }

        [HttpPost("appoint-with-jmbg-dentist")]
        [Authorize(Roles = "Dentist")]
        public async Task<ActionResult<string>> MakeAppointWithJmbgForDentist([FromRoute] string patientsJmbg, [FromBody] NewAppointDTO newAppoint)
        {
            return Ok(await _dentistService.AppointWithJMBG(patientsJmbg, newAppoint));
        }

        [HttpPost("appoint-without-jmbg")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> MakeAppointWithoutJmbg([FromBody] AppointmentWithoutJmbgDTO newAppoint)
        {
            return Ok(await _dentistService.AppointWithoutJMBG(newAppoint));
        }

        [HttpPut("cancel/{id:int}")]
        [Authorize]
        public async Task<ActionResult<string>> CancelAppointment(int id)
        {
            var patientsJmbg = User.Claims.First(c => c.Type == "IdNumber").Value;
            if (User.IsInRole("Patient") && !await _dentistService.IsAppointmentOfPatient(id, patientsJmbg))
            {
                return new ContentResult
                {
                    StatusCode = 403,
                    Content = $"Appointment with id: {id} is not yours",
                    ContentType = "text/plain"
                };
            }
            return Ok(await _dentistService.Cancel(id, User.FindFirst(ClaimTypes.Role)!.Value));
        }
    }
}
