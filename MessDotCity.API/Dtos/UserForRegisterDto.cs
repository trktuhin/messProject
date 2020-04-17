using System.ComponentModel.DataAnnotations;

namespace MessDotCity.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required]
        [StringLength(12, MinimumLength=4, ErrorMessage = "Password must be 4-12 characters")]
        public string Password { get; set; }
    }
}