using System.ComponentModel.DataAnnotations;

namespace MessDotCity.API.Dtos
{
    public class ReplaceMemberDto
    {
        [Required]
        public string UserId { get; set; }
        [Required]

        public int MemberId { get; set; }
    }
}