using System.Threading.Tasks;

namespace MessDotCity.API.Helpers
{
    public interface ICommonMethods
    {
         Task<string> GetUpdatedToken(string userId);
         Task<string> GetMessName(string userId);
    }
}