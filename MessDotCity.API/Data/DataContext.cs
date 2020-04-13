using MessDotCity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MessDotCity.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}

        public DbSet<UserInfo> Users { get; set; }
    }
}