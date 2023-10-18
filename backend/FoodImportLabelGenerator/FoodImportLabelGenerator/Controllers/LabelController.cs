using System.ComponentModel.DataAnnotations;
using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; //needed because this class derives from ControllerBase

namespace FoodImportLabelGenerator.Controllers;

//SRP - Any controller class should focus solely on handling the HTTP requests and responses and should be as 'thin' as possible

[ApiController]
[Route("[controller]")]
public class LabelController : ControllerBase
{
    private readonly ILogger<LabelController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ILabelRepository _labelRepository;

    public LabelController(ILogger<LabelController> logger, IConfiguration configuration, ILabelRepository labelRepository)
    {
        _logger = logger;
        _configuration = configuration;
        _labelRepository = labelRepository;
    }

    [HttpGet("GetAllAsync")]
    public async Task<ActionResult<IEnumerable<Label>>> GetAllAsync()
    {
        var labels = _labelRepository.GetAll();
        if (labels == null)
        {
            return NotFound("There are no labels in the database.");
        }
        try
        {
            return Ok(labels);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting labels");
            return NotFound("Error getting labels.");
        }
    }

    [HttpGet("GetByNameAsync")]
    public async Task<ActionResult<IEnumerable<Label>>> GetByNameAsync([Required]string name)
    {
        var labels = _labelRepository.GetByName(name);

        if (!labels.Any())
        {
            return NotFound($"Cannot find label with name {name}.");
        }
        try
        {
            return Ok(labels);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting labels");
            return NotFound("Error getting labels.");
        }
    }

    [HttpGet("GetByIdAsync/{id}")]
    public async Task<ActionResult<Label>> GetByIdAsync(int id)
    {
        var label = _labelRepository.GetById(id);

        if (label == null)
        {
            return NotFound($"Cannot find label with id {id}.");
        }
        try
        {
            return Ok(label);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting labels");
            return NotFound("Error getting labels.");
        }
    }

    [HttpPost("AddAsync")]
    public async Task<ActionResult<IEnumerable<Label>>> AddAsync(string? productName, [Required]string legalName,
        string? ingredientsList, string? allergens, [Required]string nutritions, string? producer,
        [Required]string distributor, string? countryOfOrigin, int netWeight, int netVolume,
        [Required]string storage, DateTime? ubd, DateTime? bbd, DateTime? bbe, [Required]bool organic)
    {
        // Additional validation for mandatory parameters
        if (string.IsNullOrWhiteSpace(legalName))
        {
            ModelState.AddModelError("legalName", "Legal name cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(nutritions))
        {
            ModelState.AddModelError("nutritions", "Nutritions cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(distributor))
        {
            ModelState.AddModelError("distributor", "Distributor cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(storage))
        {
            ModelState.AddModelError("storage", "Storage cannot be empty.");
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest("Missing or invalid input data");
        }
        
        Label newLabel = new Label()
        {
            //Id = labels.Count()+1,
            Date = DateTime.Now,
            ProductName = productName,
            LegalName = legalName,
            IngredientsList = ingredientsList,
            Allergens = allergens,
            Nutritions = nutritions,
            Producer = producer,
            Distributor = distributor,
            CountryOfOrigin = countryOfOrigin,
            NetWeight = netWeight,
            NetVolume = netVolume,
            Storage = storage,
            UBD = ubd,
            BBD = bbd,
            BBE = bbe,
            Organic = organic
        };
        _labelRepository.Add(newLabel);
        return Ok("New label added successfully.");
        //return Ok(new { Message = "New label added successfully.", Label = newLabel });
    }

    [HttpPut("UpdateAsync/{id}")]
    public async Task<ActionResult<Label>> UpdateAsync(int id, string? productName, string? legalName, string? ingredientsList,
        string? allergens, string? nutritions, string? producer, string? distributor, string? countryOfOrigin,
        int netWeight, int netVolume, string? storage, DateTime ubd, DateTime bbd, DateTime bbe, bool organic)
    {
        Label existingLabel = _labelRepository.GetById(id);

        if (existingLabel == null)
        {
            return NotFound($"It is not possible to update label. There is no label with id {id}.");
        }
        
        existingLabel.ProductName = string.IsNullOrEmpty(productName) ? existingLabel.ProductName : productName;
        existingLabel.LegalName = string.IsNullOrEmpty(legalName) ? existingLabel.LegalName : legalName;
        existingLabel.IngredientsList =
        string.IsNullOrEmpty(ingredientsList) ? existingLabel.IngredientsList : ingredientsList;
        existingLabel.Allergens = string.IsNullOrEmpty(allergens) ? existingLabel.Allergens : allergens;
        existingLabel.Nutritions = string.IsNullOrEmpty(nutritions) ? existingLabel.Nutritions : nutritions;
        existingLabel.Producer = string.IsNullOrEmpty(producer) ? existingLabel.Producer : producer;
        existingLabel.Distributor = string.IsNullOrEmpty(distributor) ? existingLabel.Distributor : distributor;
        existingLabel.CountryOfOrigin =
        string.IsNullOrEmpty(countryOfOrigin) ? existingLabel.CountryOfOrigin : countryOfOrigin;
        existingLabel.NetWeight = netWeight == 0 ? existingLabel.NetWeight : netWeight;
        existingLabel.NetVolume = netVolume == 0 ? existingLabel.NetVolume :netVolume;
        existingLabel.Storage = string.IsNullOrEmpty(storage) ? existingLabel.Storage : storage;
        existingLabel.UBD = ubd == new DateTime() ? existingLabel.UBD : ubd;
        existingLabel.BBD = bbd == new DateTime() ? existingLabel.BBD : bbd;
        existingLabel.BBE = bbe == new DateTime() ? existingLabel.BBE : bbe;
        existingLabel.Organic = organic == new Boolean() ? existingLabel.Organic : organic;

        _labelRepository.Update(existingLabel);

        return Ok(existingLabel);
    }
    
    [HttpDelete("DeleteByIdAsync/{id}")]
    public async Task<ActionResult<Label>> DeleteByIdAsync(int id)
    {
        Label existingLabel = _labelRepository.GetById(id);
        
        if (existingLabel == null)
        {
            return NotFound($"It is not possible to delete label. There is no label with id {id}.");
        }

        _labelRepository.Delete(existingLabel);
        return Ok($"Label with id {id} has been deleted successfully.");
    }
}