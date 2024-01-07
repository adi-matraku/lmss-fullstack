using System.Security.Claims;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using lmss_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;

[Authorize(Roles = "Admin")]
public class UsersController : BaseApiController
{
    private readonly DataContext _context;
    private readonly UserService _userService;
    
    public UsersController(DataContext context, UserService userService)
    {
        _context = context;
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<User>>> GetUsers([FromQuery] UsersParams userParams)
    {
        return await _userService.GetUsersAsync(userParams);
    }

    [HttpGet("{id}")] // /api/users/2
    public async Task<ActionResult<User>> GetUser(string id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            // If the user with the given ID is not found, return a 404 Not Found response
            return NotFound();
        }

        return user;
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(string id)
    {
        
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims

        if (userId == id)
        {
            return Forbid(); // Return Forbidden status
        }
        
        var byUser = await _context.Users.SingleOrDefaultAsync(x => x.Id == userId);
        
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(); // User not found
        }

        // Perform soft delete by setting IsActive to false
        user.IsActive = false;
        
        user.UpdatedAt = DateTime.UtcNow;
        user.UpdatedBy = user.UpdatedBy = byUser != null ? byUser.FirstName + byUser.LastName : "";

        // Save changes to the database
        await _context.SaveChangesAsync();

        return NoContent(); // 204 No Content, indicating a successful soft delete
    }

}