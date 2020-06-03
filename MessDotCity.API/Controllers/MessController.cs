using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
using MessDotCity.API.Hubs;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IHubContext<TokenHub> _tokenHubContext;
        private readonly IUnitOfWork _uow;
        private readonly IProfileRepository _proRepo;
        private readonly ICommonMethods _cms;

        public MessController(IMapper mapper, IMessRepository repo,
                            IUnitOfWork uow,
                            IProfileRepository proRepo,
                            IHubContext<TokenHub> tokenHubContext,
                            ICommonMethods cms)
        {
            _proRepo = proRepo;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;
            _tokenHubContext = tokenHubContext;
            _cms = cms;
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
            // checking if there's a mess of the same name
            var messExist = await _repo.GetmessByMessName(dto.MessName);
            if(messExist != null) return BadRequest("Mess name already exists !");
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
            memberToCreate.MessRole = "admin";
            _repo.Add(memberToCreate);
            await _uow.Complete();
            await BroadCastUpdatedToken(currentUserId);
            return Ok();
        }

        public async Task BroadCastUpdatedToken(string userId)
        {
            var updatedToken = await _cms.GetUpdatedToken(userId);
            var messName = await _cms.GetMessName(userId);
            await _tokenHubContext.Clients.Group(userId).SendAsync("ReceiveToken", new {
                token = updatedToken,
                messName = messName
            });
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


        [HttpPost("deleteMess")]
        public async Task<IActionResult> DeleteMess()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null) return BadRequest("You don't own a mess");
            //delete all members
            var members = await _repo.GetMembersByMessId(ownedMess.Id);
            _repo.RemoveMultiple(members);
            //deleting mess
            _repo.Delete(ownedMess);
            await _uow.Complete();
            return Ok();
        }
    }
}