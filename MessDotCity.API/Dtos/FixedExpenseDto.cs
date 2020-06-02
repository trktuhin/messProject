using System;
using System.ComponentModel.DataAnnotations;

namespace MessDotCity.API.Dtos
{
    public class FixedExpenseDto
    {
        public int? Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public float Amount { get; set; }
        [Required]
        public DateTime EffectiveDate { get; set; }
        public string Remarks { get; set; }
    }
}