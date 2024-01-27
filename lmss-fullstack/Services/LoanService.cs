using lmss_fullstack.Context;
using lmss_fullstack.DTOs.Loans;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Services;

public class LoanService
{
    private readonly DataContext _context;
    
    public LoanService(DataContext context)
    {
        _context = context;
    }
    
    public async Task<LoanResponse> GetLoansAsync(LoanParams loanParams)
    {
        var query = _context.Loans
            .Include(l => l.Book)
            .Include(l => l.User)
            .AsQueryable();
        
        query = query.Where(u => u.IsActive);

        if (!string.IsNullOrEmpty(loanParams.BookID))
        {
            query = query.Where(u => u.BookID == loanParams.BookID);
        }

        if (!string.IsNullOrEmpty(loanParams.UserID))
        {
            query = query.Where(u => u.UserID == loanParams.UserID);
        }
        
        if (!string.IsNullOrEmpty(loanParams.Status))
        {
            query = query.Where(u => u.Status == loanParams.Status);
        }
        
        if (loanParams.LoanDateStart.HasValue && loanParams.LoanDateEnd.HasValue)
        {
            query = query.Where(l => l.LoanDate >= loanParams.LoanDateStart.Value 
                                     && l.LoanDate <= loanParams.LoanDateEnd.Value);
        }
        
        if (loanParams.DueDateStart.HasValue && loanParams.DueDateEnd.HasValue)
        {
            query = query.Where(l => l.LoanDate >= loanParams.DueDateStart.Value 
                                     && l.LoanDate <= loanParams.DueDateEnd.Value);
        }
        
        if (loanParams.ReturnDateStart.HasValue && loanParams.ReturnDateEnd.HasValue)
        {
            query = query.Where(l => l.LoanDate >= loanParams.ReturnDateStart.Value 
                                     && l.LoanDate <= loanParams.ReturnDateEnd.Value);
        }
        
        // if (loanParams.LoanDate.HasValue)
        // {
        //     query = query.Where(l => l.LoanDate >= loanParams.LoanDate.Value);
        // }
        //
        // if (loanParams.DueDate.HasValue)
        // {
        //     query = query.Where(l => l.DueDate <= loanParams.DueDate.Value);
        // }
        //
        // if (loanParams.ReturnDate.HasValue)
        // {
        //     query = query.Where(l => l.ReturnDate == loanParams.ReturnDate.Value);
        // }
     
        var loans = await PagedList<Loan>.CreateAsync(query, loanParams.PageNumber, loanParams.PageSize);
        
        var totalLoans = await query.CountAsync();

        return new LoanResponse
        {
            Loans = loans,
            Total = totalLoans
        };
        // return await PagedList<Loan>.CreateAsync(query, loanParams.PageNumber, loanParams.PageSize);
    }

}