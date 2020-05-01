using System.Threading.Tasks;

namespace MessDotCity.API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;

        }
        public async Task Complete()
        {
            await _context.SaveChangesAsync();
        }
    }
}