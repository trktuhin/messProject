using System;

namespace MessDotCity.API.Models
{
    public class DailyExpense
    {
        public int Id { get; set; }
        public DateTime Day { get; set; }
        public int MessId { get; set; }
        public float Expense { get; set; }
        public string ResponsibleMember { get; set; }
        public float TotalMeal  { get; set; }
    }
}