using lmss_fullstack.Helpers;
using lmss_fullstack.Models;

namespace lmss_fullstack.DTOs;

public class UsersParams: PaginationParams
{
    public string? Id { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool? IsActive { get; set; }
    public Role? Role { get; set; }
    
    public string[]? CreatedAtRange { get; set; }
}