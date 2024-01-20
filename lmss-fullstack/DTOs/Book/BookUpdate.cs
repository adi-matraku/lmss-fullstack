using System.ComponentModel.DataAnnotations;

namespace lmss_fullstack.DTOs.Book;

public class BookUpdate
{
    public string Id { get; set; }
    [MinLength(3, ErrorMessage = "Title must be at least 3 characters.")]
    [MaxLength(20, ErrorMessage = "Title cannot exceed 20 characters.")]
    public string Title { get; set; }
    [MinLength(3, ErrorMessage = "Author name must be at least 3 characters.")]
    [MaxLength(20, ErrorMessage = "Author name cannot exceed 20 characters.")]
    public string Author { get; set; }
    [MinLength(13, ErrorMessage = "ISBN must be 13 characters.")]
    [MaxLength(13, ErrorMessage = "ISBN must be 13 characters.")]
    public string ISBN { get; set; }
    public int NumberOfCopies { get; set; }
}