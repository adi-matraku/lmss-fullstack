using System.Security.Claims;
using AutoMapper;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs.Loans;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using lmss_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;

public class LoansController: BaseApiController
{
    private readonly DataContext _context;
    private readonly LoanService _loanService;
    private readonly IMapper _mapper;

    public LoansController(DataContext context, LoanService loanService, IMapper mapper)
    {
        _context = context;
        _loanService = loanService;
        _mapper = mapper;
    }
    
    // [HttpGet]
    // public async Task<IActionResult> GetAllLoans()
    // {
    //     var loans = await _context.Loans
    //         .Include(loan => loan.Book)
    //         .Include(loan => loan.User)
    //         .ToListAsync();
    //     return Ok(loans);
    // }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<PagedList<LoanResponse>>> GetLoans([FromQuery] LoanParams loanParams)
    {
        // return await _loanService.GetLoansAsync(loanParams);
        var loanResponse = await _loanService.GetLoansAsync(loanParams);
        return Ok(loanResponse);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<LoanDto>> GetLoanById(string id)
    {
        var loan = await _context.Loans
            .Include(l => l.Book)
            .Include(l => l.User)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (loan == null)
        {
            return NotFound("Loan not found");
        }
        return  _mapper.Map<LoanDto>(loan);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<LoanCreateDto>> CreateLoan(LoanCreateDto loanDto)
    {
        // Validation: Check if book stock is greater than 0
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == loanDto.BookID);

        if (book == null)
        {
            return BadRequest("Book is unavailable");
        }
        if (book.Stock <= 0)
        {
            return BadRequest("Book is unavailable");
        }
        
        var loan = _mapper.Map<Loan>(loanDto);

        // Set additional properties not covered by the DTO
        loan.Status = loan.DueDate < DateTime.Now ? "overdue" : "inProgress";
        loan.CreatedAt = DateTime.Now;
        loan.UpdatedAt = DateTime.Now;
        loan.UpdatedBy = loanDto.UserID; // Assuming UserID is available in loanDto
        loan.IsActive = true;

        await _context.Loans.AddAsync(loan);
        book.Stock--; // Decrease book stock
        if (book.Stock == 0)
        {
            book.AvailabilityStatus = false;
        }

        await _context.Entry(loan).Reference(l => l.User).LoadAsync();
        await _context.SaveChangesAsync();

        return Ok(loan);
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLoan(string id, [FromBody] LoanUpdate loanUpdateDto)
    {
        var loan = await _context.Loans
            .Include(l => l.Book)
            .Include(l => l.User)
            .FirstOrDefaultAsync(l => l.Id == id);
        
        if (loan == null)
        {
            return NotFound();
        }

        // Map the updated fields from the DTO to the loan entity
        _mapper.Map(loanUpdateDto, loan);
        
        await _context.SaveChangesAsync();
        return Ok(loan);
    }
    
    // [Authorize(Roles = "Admin")]
    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteBook(string id)
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims
    //
    //     var user = await _context.Users.FindAsync(userId);
    //
    //     if (user == null)
    //     {
    //         return NotFound("User not found");
    //     }
    //
    //     var loan = await _context.Loans.FindAsync(id);
    //
    //     if (loan == null)
    //     {
    //         return NotFound("Loan not found");
    //     }
    //     
    //     var book = await _context.Books.FindAsync(loan.BookID);
    //     if (book != null)
    //     {
    //         book.Stock++;
    //     }
    //
    //     loan.IsActive = false;
    //
    //     await _context.SaveChangesAsync();
    //
    //     return NoContent();
    // }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    public async Task<IActionResult> DeleteLoans([FromQuery] string[] ids)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return NotFound("User not found");
        }

        foreach (var id in ids)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan != null && loan.IsActive)
            {
                var book = await _context.Books.FindAsync(loan.BookID);
                if (book != null)
                {
                    bool wasOutOfStock = book.Stock == 0;
                    
                    book.Stock++;
                    
                    if (wasOutOfStock && book.Stock > 0)
                    {
                        book.AvailabilityStatus = true;
                    }
                }

                loan.IsActive = false;
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    
    // delete from db
    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteLoan(string id)
    // {
    //     var loan = await _context.Loans.FindAsync(id);
    //     if (loan == null)
    //     {
    //         return NotFound();
    //     }
    //
    //     _context.Loans.Remove(loan);
    //     await _context.SaveChangesAsync();
    //
    //     return NoContent(); // Standard response for a successful DELETE operation
    // }

}