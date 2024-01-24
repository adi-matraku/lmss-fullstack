using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.DTOs.Book;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Services;

public class BookService
{
    private readonly DataContext _context;
    
    public BookService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<BookResponse> GetBooksAsync(BookParams bookParams)
    {
        var query = _context.Books.AsQueryable();
        
        query = query.Where(u => u.IsActive);
        
        if (!string.IsNullOrEmpty(bookParams.Id))
        {
            query = query.Where(u => u.Id == bookParams.Id);
        }

        if (!string.IsNullOrEmpty(bookParams.Title))
        {
            query = query.Where(u => u.Title.Contains(bookParams.Title));
        }

        if (!string.IsNullOrEmpty(bookParams.Author))
        {
            query = query.Where(u => u.Author.Contains(bookParams.Author));
        }
        
        if (!string.IsNullOrEmpty(bookParams.ISBN))
        {
            query = query.Where(u => u.ISBN.Contains(bookParams.ISBN));
        }


        if (bookParams.AvailabilityStatus.HasValue)
        {
            query = query.Where(u => u.IsActive == bookParams.AvailabilityStatus.Value);
        }
        
        // return await PagedList<Book>.CreateAsync(query, bookParams.PageNumber, bookParams.PageSize);
        
        var books = await PagedList<Book>.CreateAsync(query, bookParams.PageNumber, bookParams.PageSize);
        
        var totalBooks = await query.CountAsync();

        return new BookResponse
        {
            Books = books,
            Total = totalBooks
        };
        
    }
}