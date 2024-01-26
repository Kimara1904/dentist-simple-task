using AutoMapper;
using Dentist.DTOs;
using Dentist.Models;
using Dentist.Repositories.Interfaces;
using Dentist.Services.Interfaces;
using Exceptions.Exeptions;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Dentist.Services
{
    public class DentistService : IDentistService
    {
        private readonly IUnitOfWork _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IMailService _mailService;

        public DentistService(IUnitOfWork repository, IMapper mapper, IConfiguration configuration, IMailService mailService)
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
            _mailService = mailService;
        }

        public async Task<string> AppointWithJMBG(string jmbg, NewAppointDTO newAppointment)
        {
            var user = await _repository._userRepository.GetAll()
                .Where(x => x.JMBG.Equals(jmbg))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"Patient with jmbg: {jmbg} doesn't exist");


            if (await _repository._appointmentRepository.GetAll()
                .AnyAsync(x => x.Start < newAppointment.Start.AddMinutes((double)newAppointment.Duration)
                && x.Start.AddMinutes((double)x.Duration) > newAppointment.Start))
            {
                throw new ConflictException($"There are no available appointments");
            }

            var appointment = _mapper.Map<Appointment>(newAppointment);
            appointment.PatientId = user.Id;

            await _repository._appointmentRepository.Insert(appointment);
            await _repository.SaveChanges();

            await _mailService.SendEmail("Appointment",
                $"Patient {user.FirstName} {user.LastName}, {user.JMBG}, email: {user.Email} made appointment",
                "zubar@dentist.com");

            return "Successfully made an appointment";
        }

        public async Task<string> AppointWithoutJMBG(AppointmentWithoutJmbgDTO appointmentDTO)
        {
            var user = await _repository._userRepository.GetAll()
                .Where(x => x.JMBG.Equals(appointmentDTO.NewPatient.JMBG))
                .FirstOrDefaultAsync();

            if (user != null)
            {
                throw new ConflictException($"Patient with jmbg: {appointmentDTO.NewPatient.JMBG} already exists");
            }

            if (await _repository._appointmentRepository.GetAll()
                .AnyAsync(x => x.Start < appointmentDTO.NewAppoint.Start.AddMinutes((double)appointmentDTO.NewAppoint.Duration)
                && x.Start.AddMinutes((double)x.Duration) > appointmentDTO.NewAppoint.Start))
            {
                throw new ConflictException($"There are no available appointments");
            }

            var newUser = _mapper.Map<User>(appointmentDTO.NewPatient);
            newUser.Role = Enums.Role.Patient;
            await _repository._userRepository.Insert(newUser);

            var newAppointment = _mapper.Map<Appointment>(appointmentDTO.NewAppoint);
            newAppointment.Patient = newUser;

            await _repository._appointmentRepository.Insert(newAppointment);
            await _repository.SaveChanges();

            await _mailService.SendEmail("Appointment",
                $"Patient {newUser.FirstName} {newUser.LastName}, {newUser.JMBG}, email: {newUser.Email} made appointment",
                "zubar@dentist.com");

            return "Successfully made an appointment";
        }

        public async Task<string> Cancel(int id, string role)
        {
            var appointment = await _repository._appointmentRepository.FindAsync(id)
                ?? throw new NotFoundException($"There is no appointment with id: {id}");

            _ = double.TryParse(_configuration["AppointmentCancelInHours"], out double cancelHours);
            if (role.Equals("Patient") && appointment.Start.AddHours(-cancelHours) < DateTime.Now)
            {
                throw new ConflictException($"You can cancel up to {cancelHours} hours before the appointment");
            }

            appointment.IsCancelled = true;

            _repository._appointmentRepository.Update(appointment);
            await _repository.SaveChanges();

            await _mailService.SendEmail("Appointment",
                $"Appointment with id {id} is cancelled",
                "zubar@dentist.com");

            return "Successfully cancelled appointment";
        }

        public async Task<List<AppointmentDTO>> GetAllForDay()
        {
            var appointments = await _repository._appointmentRepository.GetAll()
                .Include(x => x.Patient)
                .Where(x => x.Start.Date == DateTime.Now.Date)
                .ToListAsync();

            var returnValue = _mapper.Map<List<AppointmentDTO>>(appointments);
            return returnValue;
        }

        public async Task<List<PatientsAppointmentDTO>> GetAllForPatient(int id)
        {
            var appointments = await _repository._appointmentRepository.GetAll()
                .Where(x => x.PatientId == id)
                .ToListAsync();

            var patientsAppointments = _mapper.Map<List<PatientsAppointmentDTO>>(appointments);
            return patientsAppointments;
        }

        public async Task<List<AppointmentDTO>> GetAllForWeek()
        {
            var currentWeekNumber = DateTimeFormatInfo.CurrentInfo.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
            var appointments = await _repository._appointmentRepository.GetAll()
                .Include(x => x.Patient)
                .Where(x => x.WeekNumber == currentWeekNumber && x.Start.Year == DateTime.Now.Year)
                .ToListAsync();

            var returnValue = _mapper.Map<List<AppointmentDTO>>(appointments);
            return returnValue;
        }

        public async Task<List<TakenAppointmentDTO>> GetTakenAppointments()
        {
            var appointments = await _repository._appointmentRepository.GetAll()
                .ToListAsync();

            var takenAppointments = _mapper.Map<List<TakenAppointmentDTO>>(appointments);
            return takenAppointments;
        }

        public async Task<bool> IsAppointmentOfPatient(int id, string jmbg)
        {
            var appointment = await _repository._appointmentRepository.GetAll()
                .Include(x => x.Patient)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"There is no appintment with id: {id}");

            if (!appointment.Patient.JMBG.Equals(jmbg))
            {
                return false;
            }

            return true;
        }
    }
}
