using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class RegisterDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
}