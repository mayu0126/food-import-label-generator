using FoodImportLabelGenerator.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Data;

public class UsersContext : IdentityDbContext<User, IdentityRole, string>
{
    private readonly IConfiguration _configuration;
    
    public UsersContext (DbContextOptions<UsersContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //options.UseSqlServer(connectionString!);
        options.UseNpgsql(connectionString!);

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configure User
        modelBuilder.Entity<User>()
            .Property(e => e.Id)
            .ValueGeneratedOnAdd();
        
        // Configure connections
        modelBuilder.Entity<User>()
            .HasMany(u => u.Labels)
            .WithOne(l => l.User)
            .HasForeignKey(l => l.UserId);

    }
}