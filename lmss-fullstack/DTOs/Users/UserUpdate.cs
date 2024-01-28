using System.ComponentModel.DataAnnotations;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class UserUpdate
{
    public string Id { get; set; }
    
    [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "Username cannot exceed 15 characters.")]
    public string? Username { get; set; }
    
    [MinLength(3, ErrorMessage = "FirstName must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "FirstName cannot exceed 15 characters.")]
    public string? FirstName { get; set; }
    
    [MinLength(3, ErrorMessage = "LastName must be at least 3 characters.")]
    [MaxLength(15, ErrorMessage = "LastName cannot exceed 15 characters.")]
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    
    [EnumDataType(typeof(Role), ErrorMessage = "Invalid role.")]
    public Role? Role { get; set; }
}