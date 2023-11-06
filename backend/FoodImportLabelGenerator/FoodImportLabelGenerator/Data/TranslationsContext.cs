using FoodImportLabelGenerator.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Data;

public class TranslationsContext : DbContext
{
    public DbSet<Translation>? Translations { get; set; }
    private readonly IConfiguration _configuration;

    public TranslationsContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //var connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //options.UseSqlServer(connectionString!);
        
        var connectionString = Environment.GetEnvironmentVariable("ConnectionString"); //for deployment
        optionsBuilder.UseNpgsql(connectionString!);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        
    }
}