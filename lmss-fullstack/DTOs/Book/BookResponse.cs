using lmss_fullstack.Helpers;

namespace lmss_fullstack.DTOs;

public class BookResponse
{
    public PagedList<Models.Book> Books { get; set; }
    public int Total { get; set; }
}