using System;

namespace MessDotCity.API.Data.Resource
{
    public class MessResource
    {
        public string MessName { get; set; }
        public string Location { get; set; }
        public string SecretCode { get; set; }
        public DateTime MealChangeFrom { get; set; }
        public DateTime MealChangeTo { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}