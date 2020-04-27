using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProfileRepository _repo;
        public ProfileController(IMapper mapper, IProfileRepository repo)
        {
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
        
    }
}