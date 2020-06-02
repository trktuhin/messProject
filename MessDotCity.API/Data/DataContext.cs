using MessDotCity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MessDotCity.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}

        public DbSet<UserInfo> Users { get; set; }
        public DbSet<MessInfo> Messes { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<DailyExpense> DailyExpenses { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<FixedExpense> FixedExpenses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Meal>(meal => {
                meal.HasKey(ml => new {ml.MemberId, ml.Day});
            });
        }
    }
}