using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MessDotCity.API.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MessDotCity.API.Helpers
{
    public class CommonMethods: ICommonMethods
    {
        private readonly IProfileRepository _proRepo;
        private readonly IMessRepository _messRepo;
        private readonly IConfiguration _configuration;
        public CommonMethods(IProfileRepository proRepo, IMessRepository messRepo, IConfiguration configuration)
        {
            _configuration = configuration;
            _messRepo = messRepo;
            _proRepo = proRepo;

        }
        public async Task<string> GetUpdatedToken(string userId)
        {
            var user = await _proRepo.GetUserProfileData(userId);
            if(user == null) return null;
            var messId = 0;
            var messRole = "";
            var messName = "";
            var existingMember = await _messRepo.GetMemberByUserId(userId);
            if (existingMember != null)
            {
                messId = existingMember.MessId;
                messRole = existingMember.MessRole;
                var existingMess = await _messRepo.GetmessByMessId(messId);
                if (existingMess != null)
                {
                    messName = existingMess.MessName;
                }
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim("MessId", messId.ToString()),
                new Claim("messRole", messRole)
            };
            var key = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenToReturn = tokenHandler.WriteToken(token);
            return tokenToReturn;
        }
        
        public async Task<string> GetMessName(string userId)
        {
            var messName = "";
            var existingMember = await _messRepo.GetMemberByUserId(userId);
            if(existingMember != null)
            {
                var existingMess = await _messRepo.GetmessByMessId(existingMember.MessId);
                if(existingMess != null) messName = existingMess.MessName;
            }
            return messName;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}