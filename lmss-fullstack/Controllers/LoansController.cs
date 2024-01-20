using lmss_fullstack.Context;
using lmss_fullstack.DTOs.Book;
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

    public LoansController(DataContext context, LoanService loanService)
    {
        _context = context;
        _loanService = loanService;
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
    public async Task<ActionResult<PagedList<Loan>>> GetLoans([FromQuery] LoanParams loanParams)
    {
        return await _loanService.GetLoansAsync(loanParams);
    }
    
    [HttpPost]
    public async Task<ActionResult<LoanCreateDto>> CreateLoan(LoanCreateDto loanDto)
    {
        // Validation: Check if book stock is greater than 0
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == loanDto.BookID);
        
        if (book == null || book.Stock <= 0)
        {
            return BadRequest("Book is unavailable");
        }

        // Create and save the loan
        var loan = new Loan
        {
            DueDate = loanDto.DueDate,
            LoanDate = loanDto.LoanDate,
            BookID = loanDto.BookID,
            UserID = loanDto.UserID,
            Status = "inProgress",
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            UpdatedBy = loanDto.UserID,
            IsActive = true
        };

        await _context.Loans.AddAsync(loan);
        book.Stock--; // Decrease book stock
        
        await _context.Entry(loan).Reference(l => l.User).LoadAsync();
        await _context.SaveChangesAsync();

        return Ok(loan);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLoan(string id)
    {
        var loan = await _context.Loans.FindAsync(id);
        if (loan == null)
        {
            return NotFound();
        }

        _context.Loans.Remove(loan);
        await _context.SaveChangesAsync();

        return NoContent(); // Standard response for a successful DELETE operation
    }

}