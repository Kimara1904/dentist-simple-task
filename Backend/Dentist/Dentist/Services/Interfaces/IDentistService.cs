namespace Dentist.Services.Interfaces
{
    public interface IDentistService
    {
        Task<string> AppointWithJMBG(string jmbg);
        Task<string> AppointWithoutJMBG();
        Task<string> Cancel(string jmbg);
    }
}
