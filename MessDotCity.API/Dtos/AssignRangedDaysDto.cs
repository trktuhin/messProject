using System;

namespace MessDotCity.API.Dtos
{
    public class AssignRangedDaysDto
    {
        public DateTime AssignDateFrom { get; set; }
        public DateTime AssignDateTo { get; set; }
        public string MemberName { get; set; }
    }
}