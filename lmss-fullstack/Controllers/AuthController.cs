using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using lmss_fullstack.Context;
using lmss_fullstack.DTOs;
using lmss_fullstack.Interfaces;
using lmss_fullstack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Controllers;

public class AuthController: BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AuthController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")] // /api/auth/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
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

        return new UserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

        if (user == null) return Unauthorized("Invalid user");
        
        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.Password[i]) return Unauthorized("Invalid Password");
        }

        return new UserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }
    
    [Authorize] // Add this attribute to require authorization for the /me endpoint
    [HttpGet("me")]
    public async Task<ActionResult<User>> GetCurrentUser()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve email from the token claims

        var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == id);

        if (user == null) return NotFound("User not found");

        return user;
    }
    
    private async Task<bool> UserExists(string email)
    {
        return await _context.Users.AnyAsync(user => user.Email == email.ToLower());
    }
}