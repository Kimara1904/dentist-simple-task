namespace Dentist.Services.Interfaces
{
    public interface IIdentificationService
    {
        Task<string> Identification(string jmbg);
    }
}
