namespace MessDotCity.API.Models
{
    public class UnreadNotice
    {
        public int Id { get; set; }
        public Notice Notice { get; set; }
        public int NoticeId { get; set; }
        public int MemberId { get; set; }
        public string MemberName { get; set; }
    }
}