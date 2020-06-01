using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessDotCity.API.Data.Resource;
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

        public void AddMultiple<T>(IEnumerable<T> entities) where T : class
        {
            _context.AddRange(entities);
        }

        public async Task<IEnumerable<DailyExpense>> GetDailyExpenses(int messId)
        {
            return await _context.DailyExpenses.Where(dex => dex.MessId == messId).OrderByDescending(dex => dex.Day).ToListAsync();
        }

        public async Task<IEnumerable<MemberMealResource>> GetMemberMealResources(int messId, DateTime day)
        {
            var members = _context.Members.Where(m => m.MessId == messId);
            var meals = _context.Meals.Where(m => m.MessId == messId && m.Day.Date == day.Date);
            return await members.Join(
                meals,
                member => member.Id,
                meal => meal.MemberId,
                (member, meal) => new MemberMealResource
                {
                    FirstName = member.FirstName,
                    LastName = member.LastName,
                    PhotoUrl = member.PhotoName,
                    Breakfast = meal.BreakFast,
                    Lunch = meal.Lunch,
                    Dinner = meal.Dinner,
                    MemberId = member.Id
                }
            ).ToListAsync();
        }

        public async Task<DailyExpense> GetDailyExpenseById(int id)
        {
            return await _context.DailyExpenses.FirstOrDefaultAsync(ex => ex.Id == id);
        }

        public async Task<DailyExpense> GetDailyExpenseByDate(DateTime day)
        {
            return await _context.DailyExpenses.FirstOrDefaultAsync(ex => ex.Day.Date == day.Date);
        }

        public async Task<IEnumerable<Meal>> GetMealsByDate(DateTime day, int messId)
        {
            return await _context.Meals.Where(m => m.MessId == messId && m.Day.Date == day.Date).ToListAsync();
        }

        public async Task<IEnumerable<Meal>> GetMealsByMemberId(int memberId)
        {
            return await _context.Meals.Where(m => m.MemberId == memberId).ToListAsync();
        }
    }
}