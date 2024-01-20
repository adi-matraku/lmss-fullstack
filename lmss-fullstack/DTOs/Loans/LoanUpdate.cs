namespace lmss_fullstack.DTOs.Loans;

public class LoanUpdate
{
    public string BookID { get; set; }
    public string UserID { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime ReturnDate { get; set; }
    public string Status { get; set; }
}