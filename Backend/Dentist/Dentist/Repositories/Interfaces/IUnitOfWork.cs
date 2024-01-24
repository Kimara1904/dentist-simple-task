using Dentist.Models;

namespace Dentist.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<User> _userRepository { get; }
        IGenericRepository<Appointment> _appointmentRepository { get; }

        Task SaveChanges();
    }
}
