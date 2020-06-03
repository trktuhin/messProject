namespace MessDotCity.API.Data.Resource
{
    public class DepositResource
    {
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoName { get; set; }
        public float TotalDebit { get; set; }
        public float TotalCredit { get; set; }
    }
}