using lmss_fullstack.Helpers;

namespace lmss_fullstack.DTOs.Book;

public class BookParams: PaginationParams
{
    public string? Id { get; set; }
    public string? ISBN { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
    public bool? AvailabilityStatus { get; set; }
}