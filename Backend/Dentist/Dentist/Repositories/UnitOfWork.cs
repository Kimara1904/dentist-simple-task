using Dentist.Models;
using Dentist.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dentist.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        public IGenericRepository<User> _userRepository { get; } = null!;

        public IGenericRepository<Appointment> _appointmentRepository { get; } = null!;

        public UnitOfWork(DbContext context, IGenericRepository<User> userRepository, IGenericRepository<Appointment> appointmentRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _appointmentRepository = appointmentRepository;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
