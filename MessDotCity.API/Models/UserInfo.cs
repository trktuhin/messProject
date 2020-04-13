using System.ComponentModel.DataAnnotations;

namespace MessDotCity.API.Models
{
    public class UserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Profession { get; set; }
        [Key]
        public string UserId { get; set; }
        public bool IsMobileVerified { get; set; }
        public bool IsEmailVerified { get; set; }
    }
}