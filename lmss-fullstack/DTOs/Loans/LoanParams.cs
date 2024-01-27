using lmss_fullstack.Helpers;

namespace lmss_fullstack.DTOs.Loans;

public class LoanParams: PaginationParams
{
    public string? BookID { get; set; }
    public string? UserID { get; set; }
    
    public DateTime? LoanDateStart { get; set; }
    
    public DateTime? LoanDateEnd { get; set; }
    
    public DateTime? DueDateStart { get; set; }
    
    public DateTime? DueDateEnd { get; set; }
    
    public DateTime? ReturnDateStart { get; set; }
    
    public DateTime? ReturnDateEnd { get; set; }
    public string? Status { get; set; }
}