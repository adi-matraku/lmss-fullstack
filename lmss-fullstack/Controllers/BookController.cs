using System.Security.Claims;
using AutoMapper;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs.Book;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using lmss_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lmss_fullstack.Controllers;

public class BookController: BaseApiController
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly BookService _bookService;
    private readonly UserService _userService;
    
    public BookController(DataContext context, IMapper mapper, BookService bookService, UserService userService)
    {
        _context = context;
        _mapper = mapper;
        _bookService = bookService;
        _userService = userService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<PagedList<Book>>> GetBooks([FromQuery] BookParams bookParams)
    {
        return await _bookService.GetBooksAsync(bookParams);
    }
    
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBookById(string id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return book;
    }

    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(BookCreateDto bookCreateDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims

        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        var book = _mapper.Map<Book>(bookCreateDto);

        book.IsActive = true;
        book.Stock = bookCreateDto.NumberOfCopies;
        book.CreatedBy = user!.FirstName + ' ' + user!.LastName;
        book.CreatedAt = DateTime.UtcNow;
        book.UpdatedAt = DateTime.UtcNow;
        book.UpdatedBy = user!.FirstName + ' ' + user!.LastName; // Set the user who updated/created the book
        book.AvailabilityStatus = true;

        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        return Ok(book);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateBook(string id, [FromBody] BookUpdate bookUpdateDto)
    {
        if (id != bookUpdateDto.Id)
        {
            return BadRequest("Mismatched book ID.");
        }

        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound("Book Not Found");
        }

        var currentNumberOfCopies = book.NumberOfCopies;
        book.Title = bookUpdateDto.Title;
        book.Author = bookUpdateDto.Author;
        book.ISBN = bookUpdateDto.ISBN;
        book.NumberOfCopies = bookUpdateDto.NumberOfCopies;
        if (bookUpdateDto.NumberOfCopies > currentNumberOfCopies)
        {
            // If the number of copies has increased
            var addedCopies = bookUpdateDto.NumberOfCopies - currentNumberOfCopies;
            book.Stock += addedCopies;
        }
        else
        {
            // If the number of copies has decreased
            var removedCopies = currentNumberOfCopies - bookUpdateDto.NumberOfCopies;
            book.Stock = Math.Max(book.Stock - removedCopies, 0);
        }

        book.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(book); // Or return Ok(book) if you want to return the updated book
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return NotFound("User not found");
        }

        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound("Book not found");
        }

        book.IsActive = false;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}