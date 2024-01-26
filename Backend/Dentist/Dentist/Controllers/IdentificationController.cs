using Dentist.DTOs;
using Dentist.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dentist.Controllers
{
    [Route("api/identification")]
    [ApiController]
    public class IdentificationController : ControllerBase
    {
        private readonly IIdentificationService _identificationService;

        public IdentificationController(IIdentificationService identificationService)
        {
            _identificationService = identificationService;
        }

        [HttpPost("identify")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenDTO>> Identify(string jmbg)
        {
            return Ok(await _identificationService.Identification(jmbg));
        }
    }
}
