using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
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
        private readonly IMessRepository _messRepo;
        private readonly IAuthRepository _authRepo;
        private readonly ICommonMethods _cms;

        public ProfileController(IMapper mapper, IProfileRepository repo, IUnitOfWork uow,
                                IMessRepository messRepo,
                                IAuthRepository authRepo,
                                ICommonMethods cms,
                                IHostingEnvironment env, IOptionsSnapshot<PhotoSettings> options)
        {
            _env = env;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;
            _photoSettings = options.Value;
            _messRepo = messRepo;
            _authRepo = authRepo;
            _cms =cms;

        }
        [HttpGet]
        public async Task<IActionResult> GetProfileInfo()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var profile = await _repo.GetUserProfileData(currentUserId);
            return Ok(_mapper.Map<UserProfileResource>(profile));
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userFromRepo = await _repo.GetUserProfileData(currentUserId);
            if(userFromRepo != null) {
                var oldPasswordCheck = await _authRepo.Login(userFromRepo.Mobile, dto.OldPassword);
                if(oldPasswordCheck != null)
                {
                    byte[] passwordHash, passwordSalt;
                    _cms.CreatePasswordHash(dto.NewPassword, out passwordHash, out passwordSalt);
                    userFromRepo.PasswordHash = passwordHash;
                    userFromRepo.PasswordSalt = passwordSalt;
                    await _uow.Complete();
                    return Ok();
                }
            }
            return Unauthorized();
        }

        [HttpPost("EditProfile")]
        public async Task<IActionResult> EditProfile([FromForm] ProfileSubmitDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var profile = await _repo.GetUserProfileData(currentUserId);
            _mapper.Map<ProfileSubmitDto, UserInfo>(dto, profile);
            if (dto.Image != null)
            {
                if (dto.Image.Length > _photoSettings.MaxBytes) return BadRequest("Maximum size exceeded");
                if (!(_photoSettings.AcceptedFileTypes.Any(s => s == Path.GetExtension(dto.Image.FileName).ToLower())))
                {
                    return BadRequest("Invalid file type");
                }
                await UploadPhoto(dto.Image, profile);
            }
            // changing members info
            var memberInDb = await _messRepo.GetMemberByUserId(currentUserId);
            if (memberInDb != null)
            {
                memberInDb.FirstName = profile.FirstName;
                memberInDb.LastName = profile.LastName;
                memberInDb.PhotoName = profile.PhotoUrl;
                memberInDb.Profession = profile.Profession;
            }
            await _uow.Complete();
            var userResource = _mapper.Map<UserProfileResource>(profile);
            return Ok(userResource);
        }

        private async Task UploadPhoto(IFormFile imageFile, UserInfo profile)
        {
            var uploadFolderPath = Path.Combine(_env.WebRootPath, "images");
            //creating folder if doesn't exist
            if (!Directory.Exists(uploadFolderPath))
            {
                Directory.CreateDirectory(uploadFolderPath);
            }
            //removing existing photoUrl
            if (!string.IsNullOrEmpty(profile.PhotoUrl))
            {
                var existingFilePath = Path.Combine(uploadFolderPath, profile.PhotoUrl);
                System.IO.File.Delete(existingFilePath);
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            profile.PhotoUrl = fileName;
        }


        [HttpPost("AddSession")]
        public async Task<IActionResult> AddSession(SessionDto dto)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _messRepo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            // var sessionToCreate = _mapper.Map<SessionInfo>(dto);
            var sessionToCreate = new SessionInfo();
            sessionToCreate.MessId = messId;
            sessionToCreate.Title = dto.Title;
            sessionToCreate.SessionStart = dto.SessionStart.Date;
            sessionToCreate.SessionEnd = dto.SessionEnd.Date;
            sessionToCreate.LastModifiedOn = DateTime.Now;
            _messRepo.Add(sessionToCreate);
            await _uow.Complete();
            return Ok();
        }

        [HttpPut("UpdateSession")]
        public async Task<IActionResult> UpdateSession(SessionDto dto)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _messRepo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var seInDb = await _messRepo.GetSession((int)dto.Id);
            if(seInDb == null) return NotFound();
            _mapper.Map<SessionDto,SessionInfo>(dto, seInDb);
            seInDb.SessionStart = seInDb.SessionStart.Date;
            seInDb.SessionEnd = seInDb.SessionEnd.Date;
            seInDb.MessId = messId;
            seInDb.LastModifiedOn = DateTime.Now;
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("GetSessions")]
        public async Task<IActionResult> GetSessions()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var sessions = await _messRepo.GetSessions(messId);
            return Ok(sessions);
        }

        [HttpGet("GetSession/{id}")]
        public async Task<IActionResult> GetSession(int id)
        {
            var session = await _messRepo.GetSession(id);
            if(session == null) return NotFound();
            return Ok(session);
        }

        [HttpDelete("DeleteSession/{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _messRepo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var sessionInDb = await _messRepo.GetSession(id);
            if(sessionInDb == null) return NotFound();
            _messRepo.Delete(sessionInDb);
            await _uow.Complete();
            return Ok();
        }
    }
}