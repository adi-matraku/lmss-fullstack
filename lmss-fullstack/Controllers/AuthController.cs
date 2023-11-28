using System.Security.Cryptography;
using System.Text;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;

public class AuthController: BaseApiController
{
    private readonly DataContext _context;

    public AuthController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")] // /api/auth/register
    public async Task<ActionResult<User>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");
        
        // password salt
        using var hmac = new HMACSHA512();

        var user = new User
        {
            Username = registerDto.Username,
            Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
            Role = registerDto.Role,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            PhoneNumber = registerDto.PhoneNumber,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            UpdatedBy = registerDto.Username,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    private async Task<bool> UserExists(string email)
    {
        return await _context.Users.AnyAsync(user => user.Email == email.ToLower());
    }
}