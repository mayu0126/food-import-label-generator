using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace FoodImportLabelGenerator.Models;

[Table("AspNetUsers")]
public class User : IdentityUser<string>
{
    public string? CompanyName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public IEnumerable<Label>? Labels { get; set; }
}