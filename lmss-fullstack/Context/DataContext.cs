using lmss_fullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace lmss_fullstack.Context;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options): base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Loan> Loans { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        // User entity
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        // Book entity
        modelBuilder.Entity<Book>()
            .HasKey(b => b.Id);

        // Loan entity
        modelBuilder.Entity<Loan>()
            .HasKey(l => l.Id);


        // Relationships between entities

        // User - Loans (One-to-Many)
        modelBuilder.Entity<User>()
            .HasMany(u => u.Loans)
            .WithOne(loan => loan.User)
            .HasForeignKey(loan => loan.UserID).OnDelete(DeleteBehavior.NoAction);

        // Book - Loans (One-to-Many)
        modelBuilder.Entity<Book>()
            .HasMany(book => book.Loans)
            .WithOne(loan => loan.Book)
            .HasForeignKey(loan => loan.BookID).OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);
    }
}