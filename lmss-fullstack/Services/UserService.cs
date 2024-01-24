using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Services;

public class UserService
{
    private readonly DataContext _context;
    
    public UserService(DataContext context)
    {
        _context = context;
    }

    public async Task<UsersResponse> GetUsersAsync(UsersParams userParams)
    {
        var query = _context.Users.AsQueryable();
        
        if (!string.IsNullOrEmpty(userParams.Id))
        {
            query = query.Where(u => u.Id == userParams.Id);
        }

        if (!string.IsNullOrEmpty(userParams.Email))
        {
            query = query.Where(u => u.Email.Contains(userParams.Email));
        }

        if (!string.IsNullOrEmpty(userParams.FirstName))
        {
            query = query.Where(u => u.FirstName == userParams.FirstName);
        }
        
        if (!string.IsNullOrEmpty(userParams.LastName))
        {
            query = query.Where(u => u.LastName == userParams.LastName);
        }


        if (userParams.IsActive.HasValue)
        {
            query = query.Where(u => u.IsActive == userParams.IsActive.Value);
        }

        if (userParams.Role != null)
        {
            query = query.Where(u => u.Role == userParams.Role);
        }
        
        if (userParams.CreatedAtRange != null && userParams.CreatedAtRange.Length == 2)
        {
            var startDate = DateTime.Parse(userParams.CreatedAtRange[0]);
            var endDate = DateTime.Parse(userParams.CreatedAtRange[1]).AddDays(1).AddMilliseconds(-1);

            query = query.Where(u => u.CreatedAt >= startDate && u.CreatedAt <= endDate);
        }
        
        var users = await PagedList<User>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        
        var totalUsers = await query.CountAsync();

        return new UsersResponse
        {
            Users = users,
            Total = totalUsers
        };
    }
   
}