using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MessDotCity.API.Data;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignedDateController: ControllerBase
    {
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly ICommonMethods _cms;
        public AssignedDateController(IMessRepository repository,IUnitOfWork unitOfWork, ICommonMethods cms)
        {
            _repo = repository;
            _uow = unitOfWork;
            _cms = cms;
        }

        [HttpPost("AssignMultipleDays")]
        public async Task<IActionResult> AssignMultipleDays(AssignMultipleDaysDto dto)
        {
            if(dto.DatesToAssigned.Count==0)
            {
                return BadRequest("Empty dates");
            }
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }
            AssignedDate assignedDate;
            List<AssignedDate> assignedDates = new List<AssignedDate>();

            foreach(var aDate in dto.DatesToAssigned)
            {
                var existingDate = await _repo.GetAssignedDate(messId, aDate);
                if(existingDate == null)
                {
                    assignedDate = new AssignedDate();
                    assignedDate.DateAssigned = aDate;
                    assignedDate.MessId = messId;
                    assignedDate.MemberAssigned = dto.MemberName;
                    assignedDates.Add(assignedDate);
                }
            }
            _repo.AddMultiple(assignedDates);
            await _uow.Complete();
            return Ok();
        }

        [HttpPost("AssignRangedDays")]
        public async Task<IActionResult> AssignRangedDays(AssignRangedDaysDto dto)
        {
            if(dto.AssignDateTo <= dto.AssignDateFrom)
            {
                return BadRequest("Invalid date range");
            }
            var dayDifference = (dto.AssignDateTo - dto.AssignDateFrom).TotalDays;
            if(dayDifference>30)
            {
                return BadRequest("Maximum range 30 days for a member");
            }
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }
            AssignedDate assignedDate;
            List<AssignedDate> assignedDates = new List<AssignedDate>();

            while(dto.AssignDateFrom<=dto.AssignDateTo)
            {
                var existingDate = await _repo.GetAssignedDate(messId, dto.AssignDateFrom);
                if(existingDate == null)
                {
                    assignedDate = new AssignedDate();
                    assignedDate.DateAssigned = dto.AssignDateFrom;
                    assignedDate.MessId = messId;
                    assignedDate.MemberAssigned = dto.MemberName;
                    assignedDates.Add(assignedDate);
                }
                dto.AssignDateFrom = dto.AssignDateFrom.AddDays(1);
            }
            _repo.AddMultiple(assignedDates);
            await _uow.Complete();
            return Ok();
        }

        [HttpPost("IsDateAvailable")]
        public async Task<IActionResult> IsDateAvailable(DateTime dateAssigned)
        {
            // checking is admin
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }
            var existingDate = await _repo.GetAssignedDate(messId,dateAssigned);
            if(existingDate != null)
            {
                return BadRequest("Not available");
            }
            return Ok(new {
                    isAvailable = true
                });
        }

        [HttpGet("GetAllAssignedDates")]
        public async Task<IActionResult> GetAllAssignedDates()
        {
            var messId = int.Parse(User.FindFirst("MessId").Value);
            var aDates = await _repo.GetAllAssignedDates(messId);
            return Ok(aDates);
        }

        [HttpPost("GetSingleAssignedDate")]
        public async Task<IActionResult> GetSingleAssignedDate(AssignedDate aDate)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var existingDate = await _repo.GetAssignedDate(messId,aDate.DateAssigned);
            if(existingDate == null)
            {
                return BadRequest("Doesn't exist");
            }
            return Ok(existingDate);
        }

        [HttpPost("DeleteAssignedDate")]
        public async Task<IActionResult> DeleteAssignedDate(AssignedDate aDate)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }

            var existingDate = await _repo.GetAssignedDate(messId,aDate.DateAssigned);
            if(existingDate == null)
            {
                return BadRequest("Doesn't exist");
            }
            _repo.Delete(existingDate);
            await _uow.Complete();
            return Ok();
        }
    }
}