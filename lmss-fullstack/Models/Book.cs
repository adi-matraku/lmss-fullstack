namespace lmss_fullstack.Models;

public class Book
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
    public string ISBN { get; set; }
    public string AvailabilityStatus { get; set; }
    public int NumberOfCopies { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }

    // Foreign Key
    public string CreatedByUserID { get; set; }

    public bool IsActive { get; set; }

    // Navigation Properties
    public User CreatedByUser { get; set; }
    public List<Loan> Loans { get; set; }
}