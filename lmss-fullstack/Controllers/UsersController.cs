using System.Security.Claims;
using AutoMapper;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.Helpers;
using lmss_fullstack.Models;
using lmss_fullstack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;
public class UsersController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly UserService _userService;
    
    public UsersController(DataContext context, IMapper mapper, UserService userService)
    {
        _context = context;
        _userService = userService;
        _mapper = mapper;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<PagedList<User>>> GetUsers([FromQuery] UsersParams userParams)
    {
        return await _userService.GetUsersAsync(userParams);
    }
    
    [Authorize(Roles = "Admin")]
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
    
    [Authorize(Roles = "Admin")]
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
    
    [Authorize]
    [HttpPatch]
    public async Task<ActionResult> UpdateUser(UserUpdate userPatch)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve id from the token claims

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return NotFound(); // User not found
        }

        // Ensure the user has the necessary permissions to perform the update
        if (user.Role != Role.Admin)
        {
            // If the user is not an admin, check if they are trying to update their own information
            if (userId != userPatch.Id)
            {
                return Forbid(); // User does not have permission to perform the update
            }
            
            userPatch.Role = user.Role;
        }

        // Check if the user to be updated exists
        var userToUpdate = await _context.Users.FindAsync(userPatch.Id);

        if (userToUpdate == null)
        {
            return NotFound(); // User to be updated not found
        }

        // Map the properties from userPatch to userToUpdate
        _mapper.Map(userPatch, userToUpdate);

        // Optionally, set other audit fields like UpdatedAt and UpdatedBy
        userToUpdate.UpdatedAt = DateTime.UtcNow;
        userToUpdate.UpdatedBy = user.FirstName + ' ' + user.LastName;

        await _context.SaveChangesAsync();

        return NoContent(); // 204 No Content, indicating a successful update
    }

}