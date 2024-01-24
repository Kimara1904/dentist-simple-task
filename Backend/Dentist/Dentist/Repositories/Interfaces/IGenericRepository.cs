namespace Dentist.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAllAsync();
        Task<T?> FindAsync(int id);
        Task Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
