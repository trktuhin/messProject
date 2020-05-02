using System.Threading.Tasks;
using MessDotCity.API.Dtos;
using MessDotCity.API.Models;

namespace MessDotCity.API.Data
{
    public interface IMessRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<MessInfo> GetMessByOwner(string userId);
    }
}