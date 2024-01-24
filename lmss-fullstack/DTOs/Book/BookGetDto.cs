namespace lmss_fullstack.DTOs.Book;

public class BookGetDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string ISBN { get; set; }
    public bool AvailabilityStatus { get; set; }
    public int NumberOfCopies { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public string CreatedBy { get; set; }
    public bool IsActive { get; set; }
}