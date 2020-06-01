namespace MessDotCity.API.Data.Resource
{
    public class MemberMealResource
    {
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoUrl { get; set; }
        public float Breakfast { get; set; }
        public float Lunch { get; set; }
        public float Dinner { get; set; }
    }
}