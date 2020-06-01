using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;

namespace MessDotCity.API.Data
{
    public interface IMessRepository
    {
         void Add<T>(T entity) where T:class;
         void AddMultiple<T>(IEnumerable<T> entities) where T:class;
         void Delete<T>(T entity) where T:class;
         void RemoveMultiple<T>(IEnumerable<T> entities) where T:class;
         Task<MessInfo> GetMessByOwner(string userId);
         Task<Member> GetMemberByMemberId(int memberId);
         Task<Member> GetMemberByUserId(string userId);
         Task<MessInfo> GetmessByMessId(int messId);
         Task<MessInfo> GetmessByMessName(string messName);
         Task<IEnumerable<Member>> GetMembersByMessId(int messId);
         Task<Request> GetMemberRequest(string userId, int messId);
         Task<IEnumerable<Request>> GetRequests(int messId);
         Task<IEnumerable<DailyExpense>> GetDailyExpenses(int messId);
         Task<DailyExpense> GetDailyExpenseById(int id);
         Task<IEnumerable<MemberMealResource>> GetMemberMealResources(int messId, DateTime day);
         Task<DailyExpense> GetDailyExpenseByDate(DateTime day);
         Task<IEnumerable<Meal>> GetMealsByDate(DateTime day, int messId);
         Task<IEnumerable<Meal>> GetMealsByMemberId(int memberId);
    }
}