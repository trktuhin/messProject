namespace MessDotCity.API.Dtos
{
    public class MemberUpdateDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public float DBreakfast { get; set; }
        public float DLunch { get; set; }
        public float DDinner { get; set; }
    }
}