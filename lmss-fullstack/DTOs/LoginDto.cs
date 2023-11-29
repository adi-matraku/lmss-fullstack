using System.ComponentModel.DataAnnotations;

namespace lmss_fullstack.DTOs;

public class LoginDto
{
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; }
    public string Password { get; set; }
}