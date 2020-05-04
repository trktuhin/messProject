using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IMessRepository _messRepo;
        public AuthController(IAuthRepository repo, IConfiguration configuration, IMapper mapper, IMessRepository messRepo)
        {
            _messRepo = messRepo;
            _mapper = mapper;
            _configuration = configuration;
            _repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto dto)
        {
            //Validate request
            if (await _repo.UserExists(dto.Mobile)) return BadRequest("Mobile no already used");

            var userToCreate = new UserInfo();
            userToCreate.FirstName = dto.FirstName;
            userToCreate.LastName = dto.LastName;
            userToCreate.Mobile = dto.Mobile;
            userToCreate.UserId = Guid.NewGuid().ToString();
            var createdUser = await _repo.Register(userToCreate, dto.Password);
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto dto)
        {
            var userFromRepo = await _repo.Login(dto.Mobile, dto.Password);
            if (userFromRepo == null) return Unauthorized();
            var messId = 0;
            var messRole = "";
            var messName = "";
            var existingMember = await _messRepo.GetMemberByUserId(userFromRepo.UserId);
            if(existingMember != null)
            {
                messId = existingMember.MessId;
                messRole = existingMember.MessRole;
                var existingMess = await _messRepo.GetmessByMessId(messId);
                if(existingMess !=null)
                {
                    messName = existingMess.MessName;
                }
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.UserId),
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
            var userResource = _mapper.Map<UserProfileResource>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user = userResource,
                messName = messName
            });
        }

    }
}