using System;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;
using MessDotCity.API.Data.Resource;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using MessDotCity.API.Hubs;
using MessDotCity.API.Helpers;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly IProfileRepository _proRepo;
        private readonly IHubContext<TokenHub> _tokenHubContext;
        private readonly ICommonMethods _cms;
        public MembersController(IMapper mapper, IMessRepository repo, IUnitOfWork uow,
                                IProfileRepository proRepo,
                                IHubContext<TokenHub> tokenHubContext,
                                ICommonMethods cms)
        {
            _tokenHubContext = tokenHubContext;
            _proRepo = proRepo;
            _uow = uow;
            _repo = repo;
            _mapper = mapper;
            _cms = cms;

        }

        [HttpGet]
        public async Task<IActionResult> GetMembers()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var members = await _repo.GetMembersByMessId(messId);
            return Ok(members);
        }

        [HttpPost("addMember")]
        public async Task<IActionResult> AddMember(MemberCreationDto dto)
        {
            var messId = 0;
            try
            {
                messId = int.Parse(User.FindFirst("MessId").Value);
            }
            catch (System.Exception)
            {
                return BadRequest("Don't have any mess to add");
            }
            if (messId == 0) return BadRequest("Don't have any mess to add");
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();
            var memberToCreate = _mapper.Map<Member>(dto);
            memberToCreate.LastModifiedOn = DateTime.Now;
            memberToCreate.MessId = messId;
            memberToCreate.MessRole = "member";
            _repo.Add(memberToCreate);
            await _uow.Complete();
            return Ok(memberToCreate);
        }
        [HttpDelete("{memberId}")]
        public async Task<IActionResult> DeleteMember(int memberId)
        {
            var messId = 0;
            var messRole = "";
            try
            {
                messId = int.Parse(User.FindFirst("MessId").Value);
                messRole = User.FindFirst("messRole").Value;
            }
            catch (System.Exception)
            {
                return BadRequest("You don't have permissions to delete this member");
            }
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if (memberInDb == null) return NotFound();
            if (memberInDb.MessId != messId || messRole != "admin")
            {
                return BadRequest("Not allowed");
            }
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != memberInDb.MessId) return Unauthorized();

            if(memberInDb.UserId == ownedMess.OwnerId) return BadRequest("Can't remove yourself from your owwn mess");

            _repo.Delete(memberInDb);
            await _uow.Complete();
            if(memberInDb.UserId != null)
            {
                await BroadCastUpdatedToken(memberInDb.UserId);
            }
            return Ok();
        }

        [HttpGet("{memberId}")]
        public async Task<IActionResult> GetMember(int memberId)
        {
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if (memberInDb == null) return NotFound();
            var messId = int.Parse(User.FindFirst("MessId").Value);
            if (memberInDb.MessId != messId) return BadRequest("Not allowed");
            var memberToReturn = _mapper.Map<MemberResource>(memberInDb);
            return Ok(memberToReturn);
        }

        [HttpGet("getRequests")]
        public async Task<IActionResult> GetRequsets()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            if (messId == 0) return BadRequest("Don't have any mess");
            var requests = await _repo.GetRequests(messId);
            return Ok(requests);
        }

        [HttpPost("addRequest")]
        public async Task<IActionResult> AddRequest(AddRequestDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var membership = await _repo.GetMemberByUserId(currentUserId);
            if (membership != null) return BadRequest("You are already in a membership");
            var mess = await _repo.GetmessByMessName(dto.MessName);
            if (mess == null) return BadRequest("Mess doesn't exist");
            if (mess.SecretCode != dto.SecretCode) return BadRequest("Wrong code");
            var request = await _repo.GetMemberRequest(currentUserId, mess.Id);
            if (request != null) return BadRequest("Already sent request previously");
            var requestToCreate = new Request();
            requestToCreate.MessId = mess.Id;
            requestToCreate.UserId = currentUserId;
            requestToCreate.RequestedOn = DateTime.Now;
            _repo.Add(requestToCreate);
            await _uow.Complete();
            await BroadCastMemberRequest(mess.OwnerId, currentUserId);
            return Ok();
        }

        public async Task BroadCastMemberRequest(string userId, string memberUserId)
        {
            await _tokenHubContext.Clients.Group(userId).SendAsync("ReceiveRequest", memberUserId);
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

        [HttpPost("deleteRequest/{userId}")]
        public async Task<IActionResult> DeleteRequest(string userId)
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var request = await _repo.GetMemberRequest(userId, messId);
            if (request == null) return BadRequest("Could not find the request");

            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();
            
            _repo.Delete(request);
            await _uow.Complete();
            return Ok();
        }

        [HttpPost("approveRequest/{userId}")]
        public async Task<IActionResult> ApproveRequest(string userId)
        {
            var membership = await _repo.GetMemberByUserId(userId);
            if (membership != null) return BadRequest("User is already in a membership");
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var request = await _repo.GetMemberRequest(userId, messId);
            if(request == null) return BadRequest("Did not send a request");
            var userProfile = await _proRepo.GetUserProfileData(userId);
            if(userProfile == null) return BadRequest("Could not find the user");
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var memberToCreate = _mapper.Map<Member>(userProfile);
            memberToCreate.MessId = messId;
            memberToCreate.MessRole = "member";
            // adding member and deleting request
            _repo.Add(memberToCreate);
            _repo.Delete(request);
            await _uow.Complete();
            await BroadCastUpdatedToken(userId);
            return Ok();
        }
        [HttpPost("replaceMember")]
        public async Task<IActionResult> ReplaceMember([FromBody]ReplaceMemberDto dto)
        {
            var membership = await _repo.GetMemberByUserId(dto.UserId);
            if (membership != null) return BadRequest("User is already in a membership");
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var request = await _repo.GetMemberRequest(dto.UserId, messId);
            if(request == null) return BadRequest("Did not send a request");
            var userProfile = await _proRepo.GetUserProfileData(dto.UserId);
            if(userProfile == null) return BadRequest("Could not find the user");
            // checking existing memberId
            var member = await _repo.GetMemberByMemberId(dto.MemberId);
            if(member == null) return BadRequest("Invalid member");
            if(member.MessRole.ToLower() == "admin") return BadRequest("Can't replace admin");

            var memberToCreate = _mapper.Map<Member>(userProfile);
            member.FirstName = memberToCreate.FirstName;
            member.LastName = memberToCreate.LastName;
            member.LastModifiedOn = DateTime.Now;
            member.Mobile = memberToCreate.Mobile;
            member.UserId = memberToCreate.UserId;
            member.Profession = memberToCreate.Profession;
            member.PhotoName = memberToCreate.PhotoName;
            // deleting request
            _repo.Delete(request);
            await _uow.Complete();
            await BroadCastUpdatedToken(dto.UserId);
            return Ok();
        }
        [HttpDelete("deleteMembership/{memberId}")]
        public async Task<IActionResult> DeleteOwnMembership(int memberId)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if (memberInDb == null) return NotFound();
            if(memberInDb.UserId != currentUserId) return Unauthorized();
            var messRole = User.FindFirst("messRole").Value;
            if(messRole.ToLower() == "admin") return BadRequest("Can't reomve admin membership");
            _repo.Delete(memberInDb);
            await _uow.Complete();
            if(memberInDb.UserId != null)
            {
                await BroadCastUpdatedToken(memberInDb.UserId);
            }
            return Ok();
        }
        [HttpPost("EditMember")]
        public async Task<IActionResult> EditMember(MemberUpdateDto dto)
        {
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var memberInDb = await _repo.GetMemberByMemberId(dto.Id);

            if(memberInDb.UserId == null && (ownedMess == null || ownedMess.Id != messId)) return Unauthorized();
            if(memberInDb.UserId != null && memberInDb.UserId != currentUserId) return Unauthorized();

            // update time checking
            var messInDb = await _repo.GetmessByMessId(messId);
            if(messInDb == null) return BadRequest("Mess not found");
            var currentTime = DateTime.Now.TimeOfDay;
            var startTime = messInDb.MealChangeFrom.TimeOfDay;
            var endTime = messInDb.MealChangeTo.TimeOfDay;
            if(startTime > endTime)
            {
                if(currentTime<startTime && currentTime>endTime) 
                    return BadRequest("Wrong time to update!");
            }
            else {
                if(currentTime<startTime || currentTime>endTime)
                    return BadRequest("Wrong time to update!");
            }


            if(memberInDb == null) return NotFound();
            if(memberInDb.UserId == null)
            {
                memberInDb.FirstName = dto.FirstName;
                memberInDb.LastName = dto.LastName;
            }
            memberInDb.DBreakfast = dto.DBreakfast;
            memberInDb.DLunch = dto.DLunch;
            memberInDb.DDinner = dto.DDinner;
            memberInDb.LastModifiedOn = DateTime.Now;
            await _uow.Complete();
            return Ok();
        }
    
        [HttpGet("ViewMeals/{memberId}")]
        public async Task<IActionResult> ViewMeals(int memberId)
        {
            int sessionId = int.Parse(HttpContext.Request.Query["sessionId"].ToString());
            var meals = await _repo.GetMealsByMemberId(memberId);
            return Ok(meals);
        }

        [HttpGet("makeManager/{memberId}")]
        public async Task<IActionResult> MakeManager(int memberId)
        {
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if(memberInDb == null) return NotFound();
            if(memberInDb.MessRole == "manager") return BadRequest("Already manager");
            // removing old manager if exists
            var oldManager = await _repo.GetManager(messId);
            if(oldManager != null)
            {
                oldManager.MessRole = "member";
            }
            memberInDb.MessRole = "manager";
            await _uow.Complete();
            await BroadCastUpdatedToken(memberInDb.UserId);
            return Ok();
        }

        [HttpGet("deleteManagership/{memberId}")]
        public async Task<IActionResult> DeleteManagership(int memberId)
        {
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            var messId = int.Parse(User.FindFirst("MessId").Value);
            if(ownedMess.Id != messId) return Unauthorized();
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if(memberInDb == null) return NotFound();
            if(memberInDb.MessRole == "member") return BadRequest("Not a manager");
            memberInDb.MessRole = "member";
            await _uow.Complete();
            await BroadCastUpdatedToken(memberInDb.UserId);
            return Ok();
        }

        [HttpGet("GetMemberRole/{memberId}")]
        public async Task<IActionResult> GetMemberRole(int memberId)
        {
            // checking is admin
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            var messId = int.Parse(User.FindFirst("MessId").Value);
            if(ownedMess.Id != messId) return Unauthorized();
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if(memberInDb == null) return NotFound();
            return Ok(memberInDb.MessRole);
        }
    }
}