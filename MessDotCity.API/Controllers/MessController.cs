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
    public class MessController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        public MessController(IMapper mapper, IMessRepository repo, IUnitOfWork uow)
        {
            _uow = uow;
            _repo = repo;
            _mapper = mapper;

        }
        [HttpPost("createMess")]
        public async Task<IActionResult> CreateMess(MessCreationDto dto)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //checking if any mess already belong to this user
            var existingMess = await _repo.GetMessByOwner(currentUserId);
            if(existingMess != null) return BadRequest("Already own a mess");
            //creating mess
            var messToCreate = _mapper.Map<MessInfo>(dto);
            messToCreate.CreatedOn = DateTime.Now;
            messToCreate.LastModifiedOn = DateTime.Now;
            messToCreate.OwnerId = currentUserId;
            _repo.Add(messToCreate);
            return Ok();
        }
    }
}