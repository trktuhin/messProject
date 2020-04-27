using System.Threading.Tasks;
using MessDotCity.API.Models;

namespace MessDotCity.API.Data
{
    public interface IProfileRepository
    {
         Task<UserInfo> GetUserProfileData(string userId);
    }
}