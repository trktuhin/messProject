using System.Collections.Generic;
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

    public class DepositsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly IProfileRepository _proRepo;
        private readonly IHubContext<TokenHub> _tokenHubContext;
        private readonly ICommonMethods _cms;
        public DepositsController(IMapper mapper, IMessRepository repo, IUnitOfWork uow,
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

        [HttpGet("GetMemberDropdown")]
        public async Task<IActionResult> GetMemberDropdown()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var membersToReturn = await _repo.MembersForDropdown(messId);
            return Ok(membersToReturn);
        }

        [HttpGet("GetDeposits")]
        public async Task<IActionResult> GetDeposits()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var members = await _repo.GetMembersByMessId(messId);
            List<DepositResource> depositResources = new List<DepositResource>();
            DepositResource tempResource;
            foreach(var member in members)
            {
                tempResource =new DepositResource();
                tempResource.MemberId = member.Id;
                tempResource.FirstName = member.FirstName;
                tempResource.LastName = member.LastName;
                tempResource.PhotoName = member.PhotoName;
                tempResource.TotalCredit = await _repo.GetTotalCredit(member.Id);
                tempResource.TotalDebit = await _repo.GetTotalDebit(member.Id);
                depositResources.Add(tempResource);
            }
            return Ok(depositResources);
        }

        [HttpPost("AddDeposit")]
        public async Task<IActionResult> AddDeposit(DepositDto dto)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId) return Unauthorized();

            var memberInDb = await _repo.GetMemberByMemberId(dto.MemberId);
            if(memberInDb == null) return NotFound();
            var depoToCreate = new Deposit();
            if(dto.DepositType.ToLower() == "debit")
            {
                depoToCreate.Debit = dto.Amount;
            }
            else{
                depoToCreate.Credit = dto.Amount;
            }
            depoToCreate.MemberId = dto.MemberId;
            depoToCreate.MessId = messId;
            depoToCreate.EffectiveDate = dto.EffectiveDate.Date;
            depoToCreate.Remarks = dto.Remarks;
            _repo.Add(depoToCreate);
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("GetDepositHistory/{memberId}")]
        public async Task<IActionResult> GetDepositHistory(int memberId)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var memberInDb = await _repo.GetMemberByMemberId(memberId);
            if(memberInDb == null) return NotFound();
            if(memberInDb.MessId != messId) return Unauthorized();
            var deposits = await _repo.GetDepositsByMemberId(memberId);
            return Ok(deposits);
        }
    }
}