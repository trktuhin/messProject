using System.Collections.Generic;
using MessDotCity.API.Data.Resource;
using MessDotCity.API.Models;

namespace MessDotCity.API.Dtos
{
    public class DailyExpenseUpdateDto
    {
        public DailyExpense DailyExpense { get; set; }
        public IEnumerable<MemberMealResource> MemberMealResources { get; set; }
    }
}