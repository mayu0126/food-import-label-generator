using System.ComponentModel.DataAnnotations;

namespace FoodImportLabelGenerator;

public class Label
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public string? ProductName { get; set; }
    public string LegalName { get; set; }
    
    public string? IngredientsList { get; set; }
    public string? Allergens { get; set; }
    public string Nutritions { get; set; }
    public string Producer { get; set; }
    public string Distributor { get; set; }
    public string CountryOfOrigin { get; set; }
    public int? NetWeight { get; set; }
    public int? NetVolume { get; set; }
    public string Storage { get; set; }
    public DateTime? UBD { get; set; }
    public DateTime? BBD { get; set; }
    public DateTime? BBE { get; set; }
    public bool Organic { get; set; }
}