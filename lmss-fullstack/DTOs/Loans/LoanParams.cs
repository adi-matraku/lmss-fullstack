using lmss_fullstack.Helpers;

namespace lmss_fullstack.DTOs.Loans;

public class LoanParams: PaginationParams
{
    public string? BookID { get; set; }
    public string? UserID { get; set; }
    public DateTime? LoanDate { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public string? Status { get; set; }
}