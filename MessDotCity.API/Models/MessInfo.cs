using System;

namespace MessDotCity.API.Models
{
    public class MessInfo
    {
        public int Id { get; set; }
        public string MessName { get; set; }
        public string Location { get; set; }
        public string SecretCode { get; set; }
        public DateTime MealChangeFrom { get; set; }
        public DateTime MealChangeTo { get; set; }
        public string OwnerId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}