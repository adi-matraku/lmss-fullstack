using System.ComponentModel.DataAnnotations;

namespace lmss_fullstack.DTOs;

public class RegisterDto
{
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string Username { get; set; }
    
    [MinLength(3, ErrorMessage = "Password must be at least 3 characters.")]
    public string Password { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; }
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string FirstName { get; set; }
    
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string LastName { get; set; }
    public string? PhoneNumber { get; set; }
}