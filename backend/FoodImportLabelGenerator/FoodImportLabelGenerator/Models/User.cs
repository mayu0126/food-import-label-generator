using Microsoft.AspNetCore.Identity;

namespace FoodImportLabelGenerator.Models;

public class User : IdentityUser<string>
{
    public string? CompanyName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}