using System;

namespace MessDotCity.API.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime AddedDate { get; set; }
        public int MessId { get; set; }
    }
}