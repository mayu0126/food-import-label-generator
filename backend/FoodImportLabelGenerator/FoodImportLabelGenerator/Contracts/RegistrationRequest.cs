using System.ComponentModel.DataAnnotations;

namespace FoodImportLabelGenerator.Contracts;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Username, 
    [Required]string Password);