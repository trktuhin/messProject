using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        public MembersController(IMapper mapper, IMessRepository repo, IUnitOfWork uow)
        {
            _uow = uow;
            _repo = repo;
            _mapper = mapper;

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
            var messId= 0;
            try
            {
                messId = int.Parse(User.FindFirst("MessId").Value);
            }
            catch (System.Exception)
            {
                return BadRequest("Don't have any mess to add");
            }
            if(messId == 0) return BadRequest("Don't have any mess to add");
            var memberToCreate = _mapper.Map<Member>(dto);
            memberToCreate.LastModifiedOn = DateTime.Now;
            memberToCreate.MessId = messId;
            memberToCreate.MessRole = "member";
            _repo.Add(memberToCreate);
            await _uow.Complete();
            return Ok(memberToCreate);
        }
    }
}