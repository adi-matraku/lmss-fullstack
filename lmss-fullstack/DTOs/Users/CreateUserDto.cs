using System.ComponentModel.DataAnnotations;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class CreateUserDto
{
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string Username { get; set; }
    
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; }
    
    [EnumDataType(typeof(Role), ErrorMessage = "Invalid role.")]
    public Role Role { get; set; }
    
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string FirstName { get; set; }
    
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string LastName { get; set; }
    public string? PhoneNumber { get; set; }
}