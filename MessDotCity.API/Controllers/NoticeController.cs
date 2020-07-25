using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MessDotCity.API.Data;
using MessDotCity.API.Dtos;
using MessDotCity.API.Helpers;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessDotCity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMessRepository _repo;
        private readonly IUnitOfWork _uow;
        private readonly ICommonMethods _cms;
        public NoticeController(IMessRepository repo, IUnitOfWork uow, ICommonMethods cms, IMapper mapper)
        {
            _repo = repo;
            _uow = uow;
            _cms = cms;
            _mapper = mapper;
        }

        [HttpPost("AddNotice")]
        public async Task<IActionResult> AddNotice(NoticeCreationDto dto)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }
            var noticeToCreate = _mapper.Map<Notice>(dto);
            noticeToCreate.AddedDate = DateTime.Now;
            noticeToCreate.MessId = messId;
            _repo.Add(noticeToCreate);
            await _uow.Complete();
            // adding unread notices
            var allMembers = await _repo.GetMembersByMessId(messId);
            var membersToNotify = allMembers.Where(m => m.UserId != currentUserId).ToList();
            List<UnreadNotice> unreadNotices = new List<UnreadNotice>();
            foreach(var member in membersToNotify) 
            {
                var unreadNotice = new UnreadNotice();
                unreadNotice.MemberId = member.Id;
                unreadNotice.NoticeId = noticeToCreate.Id;
                unreadNotice.MemberName = member.FirstName;
                unreadNotices.Add(unreadNotice);
            }
            _repo.AddMultiple(unreadNotices);
            await _uow.Complete();
            return Ok();
        }

        [HttpDelete("deleteNotice/{id}")]
        public async Task<IActionResult> DeleteNotice(int id)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }

            var noticesInDb = await _repo.GetNotice(id);
            if(noticesInDb == null) return NotFound();
            _repo.Delete(noticesInDb);
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("GetAllNotices")]
        public async Task<IActionResult> GetAllNotices()
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var notices = await _repo.GetAllNotices(messId);
            return Ok(notices);
        }

        [HttpGet("GetUnreadNotices")]
        public async Task<IActionResult> GetUnreadNotices()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var membership = await _repo.GetMemberByUserId(currentUserId);
            var unreadNotices = await _repo.GetUnreadNotices(membership.Id);
            return Ok(unreadNotices);
        }

        [HttpGet("GetNotice/{id}")]
        public async Task<IActionResult> GetNotice(int id)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var notice = await _repo.GetNotice(id);
            if(notice == null) return NotFound();
            if(notice.MessId != messId) return Unauthorized();
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var membership = await _repo.GetMemberByUserId(currentUserId);
            var unreadNotice = await _repo.GetUnreadNotice(id, membership.Id);
            if(unreadNotice != null)
            {
                _repo.Delete(unreadNotice);
                await _uow.Complete();
            }
            return Ok(notice);
        }

        [HttpPut("editNotice")]
        public async Task<IActionResult> UpdateNotice(Notice notice)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ownedMess = await _repo.GetMessByOwner(currentUserId);
            if(ownedMess == null || ownedMess.Id != messId)
            {
                var messRole = User.FindFirst("messRole").Value;
                if(messRole != "manager") return Unauthorized();
            }
            var noticeInDb = await _repo.GetNotice(notice.Id);
            if(noticeInDb == null) return NotFound();
            noticeInDb.Title = notice.Title;
            noticeInDb.Details = notice.Details;
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("MarkAllRead")]
        public async Task<IActionResult> MarkAllRead()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var membership = await _repo.GetMemberByUserId(currentUserId);
            var unreadNotices = await _repo.GetUnreadNotices(membership.Id);
            _repo.RemoveMultiple(unreadNotices);
            await _uow.Complete();
            return Ok();
        }

        [HttpGet("GetUnreadDetails/{noticeId}")]
        public async Task<IActionResult> GetUnreadDetails(int noticeId)
        {
            int messId = int.Parse(User.FindFirst("MessId").Value);
            var noticeInDb = await _repo.GetNotice(noticeId);
            if(noticeInDb == null) return NotFound();
            if(noticeInDb.MessId != messId) return Unauthorized();
            var unreadNotices = await _repo.GetUnreadDetails(noticeId);
            return Ok(unreadNotices);
        }
    }
}