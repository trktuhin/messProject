using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace MessDotCity.API.Data
{
    public class MessRepository : IMessRepository
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MessRepository(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
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
            SessionInfo sessionInDb = await GetCurrentSession();
            if(sessionInDb != null)
            {
                return await _context.DailyExpenses.Where(dex => dex.MessId == messId &&
                dex.Day >= sessionInDb.SessionStart && dex.Day <= sessionInDb.SessionEnd)
                .OrderByDescending(dex => dex.Day).ToListAsync();
            }
            else
            {
                return await _context.DailyExpenses.Where(dex => dex.MessId == messId).OrderByDescending(dex => dex.Day).ToListAsync();
            }
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

        public async Task<DailyExpense> GetDailyExpenseByDate(DateTime day, int messId)
        {
            return await _context.DailyExpenses.FirstOrDefaultAsync(ex => ex.Day.Date == day.Date && ex.MessId == messId);
        }

        public async Task<IEnumerable<Meal>> GetMealsByDate(DateTime day, int messId)
        {
            return await _context.Meals.Where(m => m.MessId == messId && m.Day.Date == day.Date).ToListAsync();
        }

        public async Task<IEnumerable<Meal>> GetMealsByMemberId(int memberId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            if(sessionInDb != null)
            {
                return await _context.Meals.Where(m => m.MemberId == memberId &&
                m.Day >= sessionInDb.SessionStart && m.Day <= sessionInDb.SessionEnd)
                .ToListAsync();
            }
            else
            {
                return await _context.Meals.Where(m => m.MemberId == memberId).ToListAsync();
            }
        }

        public async Task<IEnumerable<FixedExpense>> GetFixedExpenses(int messId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            if(sessionInDb != null)
            {
                return await _context.FixedExpenses.Where(fex => fex.MessId == messId && 
                fex.EffectiveDate >= sessionInDb.SessionStart && fex.EffectiveDate <= sessionInDb.SessionEnd)
                .ToListAsync();
            }
            else
            {
                return await _context.FixedExpenses.Where(fex => fex.MessId == messId)
                .ToListAsync();
            }

        }

        public async Task<FixedExpense> GetFixedExpenseById(int id)
        {
            return await _context.FixedExpenses.FirstOrDefaultAsync(fex => fex.Id == id);
        }

        public async Task<IEnumerable<SessionInfo>> GetSessions(int messId)
        {
            return await _context.Sessions.Where(se => se.MessId == messId).
            OrderByDescending(se => se.SessionEnd).ToListAsync();
        }

        public async Task<SessionInfo> GetSession(int id)
        {
            return await _context.Sessions.FirstOrDefaultAsync(se => se.Id == id);
        }

        public async Task<IEnumerable<MemberDropdownResource>> MembersForDropdown(int messId)
        {
            var members = _context.Members.Where(m => m.MessId == messId).Select(m => new MemberDropdownResource{
                Id = m.Id,
                FirstName = m.FirstName,
                LastName = m.LastName
            });
            return await members.ToListAsync();
        }

        public async Task<float> GetTotalCredit(int memberId, SessionInfo sessionInDb)
        {
            float credits = 0;
            if(sessionInDb != null)
            {
                credits = await _context.Deposits.Where(m => m.MemberId == memberId && 
                m.EffectiveDate >= sessionInDb.SessionStart && m.EffectiveDate <= sessionInDb.SessionEnd)
                .SumAsync(m => m.Credit);
            }
            else{
                credits = await _context.Deposits.Where(m => m.MemberId == memberId).SumAsync(m => m.Credit);
            }
            return credits;
        }

        public async Task<float> GetTotalDebit(int memberId, SessionInfo sessionInDb)
        {
            float debits = 0;
            if(sessionInDb != null)
            {
                debits = await _context.Deposits.Where(m => m.MemberId == memberId && 
                m.EffectiveDate >= sessionInDb.SessionStart && m.EffectiveDate <= sessionInDb.SessionEnd)
                .SumAsync(m => m.Debit);
            }
            else{
                debits = await _context.Deposits.Where(m => m.MemberId == memberId).SumAsync(m => m.Debit);
            }
            return debits;
        }

        public async Task<float> GetTotalMealsForMember(int memberId, SessionInfo sessionInDb)
        {
            float totalMeals = 0;
            if(sessionInDb != null)
            {
                totalMeals = await _context.Meals.Where(m => m.MemberId == memberId
                && m.Day >= sessionInDb.SessionStart && m.Day <= sessionInDb.SessionEnd)
                .SumAsync(m => m.BreakFast) +
                await _context.Meals.Where(m => m.MemberId == memberId
                && m.Day >= sessionInDb.SessionStart && m.Day <= sessionInDb.SessionEnd)
                .SumAsync(m => m.Lunch) +
                await _context.Meals.Where(m => m.MemberId == memberId
                && m.Day >= sessionInDb.SessionStart && m.Day <= sessionInDb.SessionEnd)
                .SumAsync(m => m.Dinner);
            }
            else {
                totalMeals = await _context.Meals.Where(m => m.MemberId == memberId)
                .SumAsync(m => m.BreakFast) +
                await _context.Meals.Where(m => m.MemberId == memberId)
                .SumAsync(m => m.Lunch) +
                await _context.Meals.Where(m => m.MemberId == memberId)
                .SumAsync(m => m.Dinner);
            }
            return totalMeals;
        }

        public async Task<float> GetMealReate(int messId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            float totalExpense = 0;
            float meals = 0;
            if(sessionInDb != null)
            {
                totalExpense = await _context.DailyExpenses.Where(ex => ex.MessId == messId
                && ex.Day >= sessionInDb.SessionStart && ex.Day <= sessionInDb.SessionEnd)
                .SumAsync(ex => ex.Expense);
                meals = (float)await _context.DailyExpenses.Where(ex => ex.MessId == messId
                && ex.Day >= sessionInDb.SessionStart && ex.Day <= sessionInDb.SessionEnd)
                .SumAsync(ex => ex.TotalMeal);
            }
            else{
                totalExpense = await _context.DailyExpenses.Where(ex => ex.MessId == messId)
                .SumAsync(ex => ex.Expense);
                meals = (float)await _context.DailyExpenses.Where(ex => ex.MessId == messId)
                .SumAsync(ex => ex.TotalMeal);
            }
            if(meals == 0) return 0;
            return totalExpense/meals;
        }

        public async Task<float> FixedExpersePerMember(int messId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            float totalExpense = 0;
            int totalMember = await _context.Members.Where(m => m.MessId == messId).CountAsync();
            if(totalMember == 0) return 0;
            if(sessionInDb != null)
            {
                totalExpense = await _context.FixedExpenses.Where(ex => ex.MessId == messId
                && ex.EffectiveDate >= sessionInDb.SessionStart && ex.EffectiveDate <= sessionInDb.SessionEnd)
                .SumAsync(ex => ex.Amount);
            }
            else{
                totalExpense = await _context.FixedExpenses.Where(ex => ex.MessId == messId)
                .SumAsync(ex => ex.Amount);
            }
            return totalExpense/totalMember;
        }

        public async Task<IEnumerable<Deposit>> GetDepositsByMemberId(int memberId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            if(sessionInDb != null)
            {
                return await _context.Deposits.Where(dp => dp.MemberId == memberId &&
                dp.EffectiveDate >= sessionInDb.SessionStart && dp.EffectiveDate <= sessionInDb.SessionEnd)
                .OrderByDescending(dp => dp.Id).ToListAsync();
            }
            else{
                return await _context.Deposits.Where(dp => dp.MemberId == memberId)
                .OrderByDescending(dp => dp.Id).ToListAsync();
            }
        }

        private async Task<SessionInfo> GetCurrentSession()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            int sessionId = 0;
            SessionInfo sessionInDb;
            try
            {
                sessionId = int.Parse(httpContext.Request.Query["sessionId"].ToString());
            }
            catch (System.Exception)
            {}
            sessionInDb = await _context.Sessions.FirstOrDefaultAsync(se => se.Id ==sessionId);
            return sessionInDb;
        }

        public async Task<Member> GetManager(int messId)
        {
            return await _context.Members.FirstOrDefaultAsync(m => m.MessId == messId && m.MessRole == "manager");
        }

        public async Task<IEnumerable<Notice>> GetAllNotices(int messId)
        {
            return await _context.Notices.Where(n => n.MessId == messId).ToListAsync();
        }

        public async Task<IEnumerable<AssignedDate>> GetAllAssignedDates(int messId)
        {
            SessionInfo sessionInDb = await GetCurrentSession();
            if(sessionInDb != null)
            {
                return await _context.AssignedDates.Where(fex => fex.MessId == messId && 
                fex.DateAssigned >= sessionInDb.SessionStart && fex.DateAssigned <= sessionInDb.SessionEnd)
                .OrderBy(fex => fex.DateAssigned).ToListAsync();
            }
            else
            {
                return await _context.AssignedDates.Where(fex => fex.MessId == messId).OrderBy(fex => fex.DateAssigned)
                .ToListAsync();
            }
        }

        public async Task<IEnumerable<UnreadNotice>> GetUnreadNotices(int memberId)
        {
            return await _context.UnreadNotices.Where(un => un.MemberId == memberId)
                    .Include(un => un.Notice).ToListAsync();
        }

        public async Task<Notice> GetNotice(int id)
        {
            return await _context.Notices.SingleOrDefaultAsync(n => n.Id == id);
        }

        public async Task<AssignedDate> GetAssignedDate(int messId, DateTime dateAssigned)
        {
            return await _context.AssignedDates.SingleOrDefaultAsync(n => n.MessId == messId && n.DateAssigned == dateAssigned);
        }

        public async Task<UnreadNotice> GetUnreadNotice(int noticeId, int memberId)
        {
            return await _context.UnreadNotices.FirstOrDefaultAsync(un => un.NoticeId == noticeId && un.MemberId == memberId);
        }

        public async Task<IEnumerable<UnreadNotice>> GetUnreadDetails(int noticeId)
        {
            return await _context.UnreadNotices.Where(un => un.NoticeId == noticeId).ToListAsync();
        }
    }
}