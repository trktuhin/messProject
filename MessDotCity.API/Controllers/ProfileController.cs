using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProfileRepository _repo;
        private readonly IUnitOfWork _uow;
        public ProfileController(IMapper mapper, IProfileRepository repo, IUnitOfWork uow)
        {
            _uow = uow;
            _repo = repo;
            _mapper = mapper;

        }
        [HttpGet]
        public async Task<IActionResult> GetProfileInfo()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var profile = await _repo.GetUserProfileData(currentUserId);
            return Ok(_mapper.Map<UserProfileResource>(profile));
        }

        [HttpPost("EditProfile")]
        public async Task<IActionResult> EditProfile([FromForm]ProfileSubmitDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var profile = await _repo.GetUserProfileData(currentUserId);
            _mapper.Map<ProfileSubmitDto, UserInfo>(dto, profile);
            await _uow.Complete();
            return Ok();
        }

        private void UploadPhoto(IFormFile file)
        {

        }

    }
}