namespace lmss_fullstack.Models;

public class User
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string PasswordSalt { get; set; }
    public Role Role { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public bool IsActive { get; set; } // New column for logical deletion

    // Navigation Properties
    public List<Loan> Loans { get; set; }
    public List<Book> CreatedBooks { get; set; }
}