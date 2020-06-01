using System;

namespace MessDotCity.API.Models
{
    public class Meal
    {
        public int MemberId { get; set; }
        public DateTime Day { get; set; }
        public float BreakFast { get; set; }
        public float Lunch { get; set; }
        public float Dinner { get; set; }
        public int? MessId { get; set; }
    }
}