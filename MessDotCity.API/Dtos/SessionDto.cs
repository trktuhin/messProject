using System;

namespace MessDotCity.API.Dtos
{
    public class SessionDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public DateTime SessionStart { get; set; }
        public DateTime SessionEnd { get; set; }
        public int MessId { get; set; }
    }
}