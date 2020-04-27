using System.Threading.Tasks;
using MessDotCity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MessDotCity.API.Data
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly DataContext _context;
        public ProfileRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<UserInfo> GetUserProfileData(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }
    }
}