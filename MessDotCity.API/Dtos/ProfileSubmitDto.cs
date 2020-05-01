using Microsoft.AspNetCore.Http;

namespace MessDotCity.API.Dtos
{
    public class ProfileSubmitDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IFormFile Image { get; set; }
        public string Email { get; set; }
        public string Profession { get; set; }
    }
}