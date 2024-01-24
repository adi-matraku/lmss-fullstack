using lmss_fullstack.DTOs.Book;

namespace lmss_fullstack.DTOs.Loans;

public class LoanDto
{
    public string Id { get; set; }
    public DateTime LoanDate { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public bool IsActive { get; set; } // New column for logical deletion
    public BookGetDto Book { get; set; }
    public MeDto User { get; set; }
}