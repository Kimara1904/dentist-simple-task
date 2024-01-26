using Dentist.DTOs;
using Dentist.Repositories.Interfaces;
using Dentist.Services.Interfaces;
using Exceptions.Exeptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Dentist.Services
{
    public class IdentificationService : IIdentificationService
    {
        private readonly IUnitOfWork _repository;
        private readonly IConfiguration _configuration;

        public IdentificationService(IUnitOfWork repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<TokenDTO> Identification(string jmbg)
        {
            var user = await _repository._userRepository.GetAll()
                .Where(x => x.JMBG.Equals(jmbg))
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException($"User with jmbg: {jmbg} doesn't exists");

            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ?? "default"),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("IdNumber", user.JMBG),
                        new Claim("Email", user.Email),
                        new Claim(ClaimTypes.Role, user.Role.ToString()),
                    };
            var jwtkey = _configuration["Jwt:Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "default"));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn);

            return new TokenDTO { Token = new JwtSecurityTokenHandler().WriteToken(token) };
        }
    }
}
