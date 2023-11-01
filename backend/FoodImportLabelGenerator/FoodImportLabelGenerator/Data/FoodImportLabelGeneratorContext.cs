using FoodImportLabelGenerator.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Data;

public class FoodImportLabelGeneratorContext : DbContext
{
    public DbSet<Label>? Labels { get; set; }
    private readonly IConfiguration _configuration;

    public FoodImportLabelGeneratorContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        optionsBuilder.UseSqlServer(connectionString!);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        /*
        builder.Entity<Label>()
            .HasOne(label => label.User)
            .WithMany()
            .HasForeignKey(label => label.User_Id);
        
        builder.Entity<Label>()
            .HasOne(label => label.User)
            .WithMany()
            .HasForeignKey(label => label.User_Id)
            .HasPrincipalKey(user => user.Id);
        */
    }
}