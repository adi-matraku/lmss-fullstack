namespace lmss_fullstack.DTOs.Loans;

public class LoanCreateDto
{
    public string UserID { get; set; }
    public string BookID { get; set; }
    public DateTime LoanDate { get; set; }
    public DateTime DueDate { get; set; }
}