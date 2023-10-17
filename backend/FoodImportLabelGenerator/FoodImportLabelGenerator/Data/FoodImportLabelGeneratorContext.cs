using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Data;

public class FoodImportLabelGeneratorContext : DbContext
{
    public DbSet<Label> Labels { get; set; }
    private readonly IConfiguration _configuration;
    private readonly string _configString;

    public FoodImportLabelGeneratorContext(IConfiguration configuration, string configString)
    {
        _configuration = configuration;
        _configString = configString;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _configString;
        //var connectionString = _configuration.GetConnectionString("ConnectionStrings:DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);
    }
}