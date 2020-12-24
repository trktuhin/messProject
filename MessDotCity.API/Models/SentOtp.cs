namespace MessDotCity.API.Models
{
    public class SentOtp
    {
        public int Id { get; set; }
        public string OtpCode { get; set; }
        public string OtpFor { get; set; }
        public string MobileNo { get; set; }
    }
}