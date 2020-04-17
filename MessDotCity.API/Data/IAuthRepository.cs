using System.Threading.Tasks;
using MessDotCity.API.Models;

namespace MessDotCity.API.Data
{
    public interface IAuthRepository
    {
         Task<UserInfo> Register(UserInfo user, string password);

         Task<UserInfo> Login(string mobile, string password);

         Task<bool> UserExists(string mobile);
    }
}