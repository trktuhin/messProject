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

        public async Task<MessInfo> GetMessByOwner(string userId)
        {
            var messInfo = await _context.Messes.FirstOrDefaultAsync(m => m.OwnerId == userId);
            return messInfo;
        }
    }
}