using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FoodImportLabelGenerator.Models;

public class Label
{
    public int Id { get; init; }
    public string? UserId { get; set; }
    public User? User { get; set; }
    public DateTime Date { get; init; }
    public string? ProductName { get; set; }
    public string LegalName { get; set; }
    public string? LegalNameAdditionalInformation { get; set; }
    
    public string? CookingInstructions { get; set; }
    public string? IngredientsList { get; set; }
    public string? IngredientsListAdditionalInformation { get; set; }
    public string? Allergens { get; set; }
    public string? MayContain { get; set; }
    public string Nutritions { get; set; }
    public string? Producer { get; set; }
    public string Distributor { get; set; }
    public string? CountryOfOrigin { get; set; }
    public string? MainIngredientCOO { get; set; }
    public string? NetWeight { get; set; }
    public string? NetVolume { get; set; }
    public string Storage { get; set; }
    public string? BestBeforeText {get; set;}
    public DateTime? UBD { get; set; }
    public DateTime? BBD { get; set; }
    public DateTime? BBE { get; set; }
    public string? BestBeforeAdditionalInformation { get; set; }
    public string? HealthMark {get; set;}
    public bool Organic { get; set; }
    public string EAN { get; set; }
}