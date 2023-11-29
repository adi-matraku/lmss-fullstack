using lmss_fullstack.Context;
using lmss_fullstack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly DataContext _context;
    
    public UsersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();

        return users;
    }

    [HttpGet("{id}")] // /api/users/2
    public async Task<ActionResult<User>> GetUser(string id)
    {
        return  await _context.Users.FindAsync(id);
    }
}