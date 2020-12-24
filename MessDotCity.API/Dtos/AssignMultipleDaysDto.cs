using System;
using System.Collections.Generic;

namespace MessDotCity.API.Dtos
{
    public class AssignMultipleDaysDto
    {
        public List<DateTime> DatesToAssigned {get; set;}
        public string MemberName { get; set; }
    }
}