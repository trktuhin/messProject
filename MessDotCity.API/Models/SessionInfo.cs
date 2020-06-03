using System;

namespace MessDotCity.API.Models
{
    public class SessionInfo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime SessionStart { get; set; }
        public DateTime SessionEnd { get; set; }
        public int MessId { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}