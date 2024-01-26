using Dentist.DTOs;

namespace Dentist.Services.Interfaces
{
    public interface IIdentificationService
    {
        Task<TokenDTO> Identification(string jmbg);
    }
}
