using System;

namespace MessDotCity.API.Models
{
    public class AssignedDate
    {
        public DateTime DateAssigned { get; set; }
        public int MessId { get; set; }
        public string MemberAssigned { get; set; }
    }
}