using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly IProfileRepository _proRepo;
        public MessController(IMapper mapper, IMessRepository repo, IUnitOfWork uow, IProfileRepository proRepo)
        {
            _proRepo = proRepo;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetMess()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null) return BadRequest("You don't own a mess");
            var messResource = _mapper.Map<MessResource>(ownedMess);
            return Ok(messResource);
        }
        [HttpPost("createMess")]
        public async Task<IActionResult> CreateMess(MessCreationDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //checking if member of a mess
            var existingMember = await _repo.GetMemberByUserId(currentUserId);
            if (existingMember != null) return BadRequest("Already in a membership !");
            //creating mess
            var messToCreate = _mapper.Map<MessInfo>(dto);
            messToCreate.CreatedOn = DateTime.Now;
            messToCreate.LastModifiedOn = DateTime.Now;
            messToCreate.OwnerId = currentUserId;
            _repo.Add(messToCreate);
            await _uow.Complete();

            //creating member of the mess
            var currentUser = await _proRepo.GetUserProfileData(currentUserId);
            var memberToCreate = _mapper.Map<Member>(currentUser);
            memberToCreate.MessId = messToCreate.Id;
            _repo.Add(memberToCreate);
            await _uow.Complete();
            return Ok();
        }

        [HttpPut("updateMess")]
        public async Task<IActionResult> UpdateMess(MessUpdateDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null) return BadRequest("You don't own a mess");
            _mapper.Map<MessUpdateDto, MessInfo>(dto, ownedMess);
            await _uow.Complete();
            return Ok();
        }
    }
}