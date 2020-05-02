using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProfileRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly IHostingEnvironment _env;
        private readonly PhotoSettings _photoSettings;
        public ProfileController(IMapper mapper, IProfileRepository repo, IUnitOfWork uow, 
                                IHostingEnvironment env, IOptionsSnapshot<PhotoSettings> options)
        {
            _env = env;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;
            _photoSettings = options.Value;

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
            if(dto.Image !=null)
            {
                if(dto.Image.Length > _photoSettings.MaxBytes) return BadRequest("Maximum size exceeded");
                if(!(_photoSettings.AcceptedFileTypes.Any(s => s == Path.GetExtension(dto.Image.FileName).ToLower())))
                {
                    return BadRequest("Invalid file type");
                }
                await UploadPhoto(dto.Image, profile);
            }
            await _uow.Complete();
            var userResource = _mapper.Map<UserProfileResource>(profile);
            return Ok(userResource);
        }

        private async Task UploadPhoto(IFormFile imageFile, UserInfo profile)
        {
            var uploadFolderPath = Path.Combine(_env.WebRootPath, "images");
            //creating folder if doesn't exist
            if(!Directory.Exists(uploadFolderPath))
            {
                Directory.CreateDirectory(uploadFolderPath);
            }
            //removing existing photoUrl
            if(!string.IsNullOrEmpty(profile.PhotoUrl))
            {
                var existingFilePath = Path.Combine(uploadFolderPath, profile.PhotoUrl);
                System.IO.File.Delete(existingFilePath);
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);
            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            profile.PhotoUrl = fileName;
        }

    }
}