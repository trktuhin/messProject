using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
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
        private readonly ICommonMethods _cms;
        public AuthController(IAuthRepository repo, IConfiguration configuration, IMapper mapper, IMessRepository messRepo, ICommonMethods cms)
        {
            _cms = cms;
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
            // getting token from common methods
            var token = await _cms.GetUpdatedToken(userFromRepo.UserId);
            // getting messname
            var messName = await _cms.GetMessName(userFromRepo.UserId);
            // getting user object
            var userResource = _mapper.Map<UserProfileResource>(userFromRepo);
            if(userResource.PhotoUrl == null)
            {
                userResource.PhotoUrl = "user.jpg";
            }
            return Ok(new
            {
                token = token,
                user = userResource,
                messName = messName
            });
        }

    }
}