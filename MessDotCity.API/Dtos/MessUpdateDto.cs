using System;

namespace MessDotCity.API.Dtos
{
    public class MessUpdateDto
    {
        public string Location { get; set; }
        public string SecretCode { get; set; }
        public DateTime? MealChangeFrom { get; set; }
        public DateTime? MealChangeTo { get; set; }
    }
}