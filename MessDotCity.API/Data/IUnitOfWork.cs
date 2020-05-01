using System.Threading.Tasks;

namespace MessDotCity.API.Data
{
    public interface IUnitOfWork
    {
         Task Complete();
    }
}