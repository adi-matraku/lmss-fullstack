using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace lmss_fullstack.Models;

public class Loan
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    public DateTime LoanDate { get; set; }
    public DateTime DueDate { get; set; }
    
    public DateTime? ReturnDate { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }
    public bool IsActive { get; set; } // New column for logical deletion

    // Navigation Properties
    [JsonIgnore]
    public string BookID { get; set; }
    public Book Book { get; set; }
    
    [JsonIgnore] 
    public string UserID { get; set; }
    public User User { get; set; }
}