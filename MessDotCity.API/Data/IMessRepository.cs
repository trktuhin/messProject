using System.Collections.Generic;
using System.Threading.Tasks;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;

namespace MessDotCity.API.Data
{
    public interface IMessRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         void RemoveMultiple<T>(IEnumerable<T> entities) where T:class;
         Task<MessInfo> GetMessByOwner(string userId);
         Task<Member> GetMemberByUserId(string userId);
         Task<MessInfo> GetmessByMessId(int messId);
         Task<MessInfo> GetmessByMessName(string messName);
         Task<IEnumerable<Member>> GetMembersByMessId(int messId);
    }
}