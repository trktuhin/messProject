using System;

namespace MessDotCity.API.Dtos
{
    public class MessCreationDto
    {
        public string MessName { get; set; }
        public string Location { get; set; }
        public string SecretCode { get; set; }
        public DateTime MealChangeFrom { get; set; }
        public DateTime MealChangeTo { get; set; }
    }
}