using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class MeDto
{
    public string Id { get; set; }
    public string Username { get; set; }
    public Role Role { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public bool IsActive { get; set; }
}