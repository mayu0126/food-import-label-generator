using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Data;

public class FoodImportLabelGeneratorContext : DbContext
{
    public DbSet<Label> Labels { get; set; }
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public FoodImportLabelGeneratorContext(IConfiguration configuration, string connectionString)
    {
        _configuration = configuration;
        _connectionString = connectionString;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _connectionString;
        //var connectionString = _configuration.GetConnectionString("ConnectionStrings:DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);
    }
}