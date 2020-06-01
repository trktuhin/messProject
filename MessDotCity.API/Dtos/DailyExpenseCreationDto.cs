using System;
using MessDotCity.API.Models;

namespace MessDotCity.API.Dtos
{
    public class DailyExpenseCreationDto
    {
        public string ResponsibleMember { get; set; }
        public float Expense { get; set; }
        public DateTime Day { get; set; }
        public Member[] Members { get; set; }
    }
}