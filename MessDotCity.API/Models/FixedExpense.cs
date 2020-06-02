using System;

namespace MessDotCity.API.Models
{
    public class FixedExpense
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public float Amount { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Remarks { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int MessId { get; set; }
    }
}