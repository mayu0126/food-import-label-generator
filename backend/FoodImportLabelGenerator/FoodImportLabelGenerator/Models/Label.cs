using System.ComponentModel.DataAnnotations;

namespace FoodImportLabelGenerator.Models;

public class Label
{
    public int Id { get; init; }
    public int UserId { get; init; }
    public User? User { get; init; }
    public DateTime Date { get; init; }
    public string? ProductName { get; set; }
    public string LegalName { get; set; }
    
    public string? IngredientsList { get; set; }
    public string? Allergens { get; set; }
    public string Nutritions { get; set; }
    public string? Producer { get; set; }
    public string Distributor { get; set; }
    public string? CountryOfOrigin { get; set; }
    public int? NetWeight { get; set; }
    public int? NetVolume { get; set; }
    public string Storage { get; set; }
    public DateTime? UBD { get; set; }
    public DateTime? BBD { get; set; }
    public DateTime? BBE { get; set; }
    public bool Organic { get; set; }
}