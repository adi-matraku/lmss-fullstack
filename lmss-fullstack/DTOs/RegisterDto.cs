using System.ComponentModel.DataAnnotations;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class RegisterDto
{
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string Username { get; set; }
    
    [MinLength(3, ErrorMessage = "Password must be at least 3 characters.")]
    public string Password { get; set; }
    
    [EnumDataType(typeof(Role), ErrorMessage = "Invalid role.")]
    public Role Role { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; }
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string FirstName { get; set; }
    
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string LastName { get; set; }
    
    [RegularExpression(@"^\+[0-9]{1,3}[0-9]{6,14}$", ErrorMessage = "Invalid phone number format.")]
    public string PhoneNumber { get; set; }
}