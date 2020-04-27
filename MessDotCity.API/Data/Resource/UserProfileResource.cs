namespace MessDotCity.API.Data.Resource
{
    public class UserProfileResource
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Profession { get; set; }
        public bool IsMobileVerified { get; set; }
        public bool IsEmailVerified { get; set; }
        public string PhotoUrl { get; set; }
    }
}