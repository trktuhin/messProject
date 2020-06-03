using System;
using System.ComponentModel.DataAnnotations;

namespace MessDotCity.API.Dtos
{
    public class DepositDto
    {
        public int? Id { get; set; }
        public float Amount { get; set; }
        [Required]
        public string DepositType { get; set; }
        public int MemberId { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Remarks { get; set; }
    }
}