using System;

namespace MessDotCity.API.Models
{
    public class Request
    {
        public int Id { get; set; }
        public UserInfo User { get; set; }
        public string UserId { get; set; }
        public DateTime RequestedOn { get; set; }
        public int MessId { get; set; }
    }
}