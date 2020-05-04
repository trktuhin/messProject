using System;

namespace MessDotCity.API.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public float DBreakfast { get; set; }
        public float DLunch { get; set; }
        public float DDinner { get; set; }
        public string UserId { get; set; }
        public string PhotoName { get; set; }
        public string Profession { get; set; }
        public string Mobile { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int MessId { get; set; }
        public string MessRole { get; set; }
    }
}