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
    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<BookCreateDto>> CreateBook(BookCreateDto bookCreateDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims

        var user = await _context.Users.FindAsync(userId);
        
        if (user == null)
        {
            return NotFound("User not found");
        }
        
        var book = _mapper.Map<Book>(bookCreateDto);

        book.CreatedBy = user!.FirstName + ' ' + user!.LastName;
        book.CreatedAt = DateTime.UtcNow;
        book.UpdatedAt = DateTime.UtcNow;
        book.UpdatedBy = user!.FirstName + ' ' + user!.LastName; // Set the user who updated/created the book
        book.AvailabilityStatus = true;
        book.IsActive = true;

        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetBooks", new { id = book.Id }, _mapper.Map<BookCreateDto>(book));
    }

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