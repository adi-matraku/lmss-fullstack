using lmss_fullstack.Helpers;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs.Loans;

public class LoanResponse
{
    public PagedList<Loan> Loans { get; set; }
    public int Total { get; set; }
}