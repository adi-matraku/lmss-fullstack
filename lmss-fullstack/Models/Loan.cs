namespace lmss_fullstack.Models;

public class Loan
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

    // Navigation Properties
    public string BookID { get; set; }
    public Book Book { get; set; }
    public string UserID { get; set; }
    public User User { get; set; }
}