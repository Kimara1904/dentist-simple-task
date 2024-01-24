namespace Dentist.Services.Interfaces
{
    public interface IMailService
    {
        Task SendEmail(string header, string body, string to);
    }
}
