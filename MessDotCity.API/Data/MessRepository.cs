using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessDotCity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MessDotCity.API.Data
{
    public class MessRepository : IMessRepository
    {
        private readonly DataContext _context;
        public MessRepository(DataContext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Member> GetMemberByMemberId(int memberId)
        {
            return await _context.Members.FirstOrDefaultAsync(m => m.Id == memberId);
        }

        public async Task<Member> GetMemberByUserId(string userId)
        {
            return await _context.Members.FirstOrDefaultAsync(m => m.UserId == userId);
        }

        public async Task<Request> GetMemberRequest(string userId, int messId)
        {
            return await _context.Requests.FirstOrDefaultAsync(r => r.UserId == userId && r.MessId == messId);
        }

        public async Task<IEnumerable<Member>> GetMembersByMessId(int messId)
        {
            return await _context.Members.Where(m => m.MessId == messId).ToListAsync();
        }

        public async Task<MessInfo> GetmessByMessId(int messId)
        {
            return await _context.Messes.FirstOrDefaultAsync(m => m.Id == messId);
        }

        public async Task<MessInfo> GetmessByMessName(string messName)
        {
            return await _context.Messes.FirstOrDefaultAsync(m => m.MessName.ToLower() == messName.ToLower());
        }

        public async Task<MessInfo> GetMessByOwner(string userId)
        {
            return await _context.Messes.FirstOrDefaultAsync(m => m.OwnerId == userId);
        }

        public async Task<IEnumerable<Request>> GetRequests(int messId)
        {
            return await _context.Requests.Where(r => r.MessId == messId).Include(r => r.User).ToListAsync();
        }

        public void RemoveMultiple<T>(IEnumerable<T> entities) where T : class
        {
            _context.RemoveRange(entities);
        }
    }
}