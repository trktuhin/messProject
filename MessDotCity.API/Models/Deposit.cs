using System;

namespace MessDotCity.API.Models
{
    public class Deposit
    {
        public int Id { get; set; }
        public float Debit { get; set; }
        public float Credit { get; set; }
        public int MemberId { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Remarks { get; set; }
        public int MessId { get; set; }
    }
}