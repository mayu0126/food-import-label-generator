using System.ComponentModel.DataAnnotations;
using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet("GetAllAsync"), Authorize(Roles = "Admin")]
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

    [HttpGet("GetByNameAsync"), Authorize(Roles = "Admin")]
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

    [HttpGet("GetByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
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
    
    [HttpGet("GetByUserIdAsync/{userId}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Label>> GetByUserIdAsync([FromRoute] string userId)
    {
        var labels = _labelRepository.GetByUserId(userId);

        if (labels == null)
        {
            return NotFound($"Cannot find label with user id {userId}.");
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

    [HttpPost("AddAsync"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<IEnumerable<Label>>> AddAsync([FromBody] Label labelData)
    {
        // Additional validation for mandatory parameters
        if (string.IsNullOrWhiteSpace(labelData.LegalName))
        {
            ModelState.AddModelError("LegalName", "Legal name cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(labelData.Nutritions))
        {
            ModelState.AddModelError("Nutritions", "Nutritions cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(labelData.Distributor))
        {
            ModelState.AddModelError("Distributor", "Distributor cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(labelData.Storage))
        {
            ModelState.AddModelError("Storage", "Storage cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(labelData.EAN))
        {
            ModelState.AddModelError("EAN", "EAN cannot be empty.");
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest("Missing or invalid input data");
        }
        
        Label newLabel = new Label()
        {
            //Id = labels.Count()+1,
            UserId = labelData.UserId,
            Date = DateTime.UtcNow,
            ProductName = labelData.ProductName,
            LegalName = labelData.LegalName,
            IngredientsList = labelData.IngredientsList,
            Allergens = labelData.Allergens,
            Nutritions = labelData.Nutritions,
            Producer = labelData.Producer,
            Distributor = labelData.Distributor,
            CountryOfOrigin = labelData.CountryOfOrigin,
            NetWeight = labelData.NetWeight,
            NetVolume = labelData.NetVolume,
            Storage = labelData.Storage,
            UBD = labelData.UBD,
            BBD = labelData.BBD,
            BBE = labelData.BBE,
            Organic = labelData.Organic,
            EAN = labelData.EAN,
            BestBeforeAdditionalInformation = labelData.BestBeforeAdditionalInformation,
            BestBeforeText = labelData.BestBeforeText,
            CookingInstructions = labelData.CookingInstructions,
            HealthMark = labelData.HealthMark,
            IngredientsListAdditionalInformation = labelData.IngredientsListAdditionalInformation,
            LegalNameAdditionalInformation = labelData.LegalNameAdditionalInformation,
            MainIngredientCOO = labelData.MainIngredientCOO,
            MayContain = labelData.MayContain
        };
        _labelRepository.Add(newLabel);
        return Ok("New label added successfully.");
        //return Ok(new { Message = "New label added successfully.", Label = newLabel });
    }

    [HttpPut("UpdateAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Label>> UpdateAsync([FromRoute] int id, [FromBody] Label labelData)
    {
        Label existingLabel = _labelRepository.GetById(id)!;

        if (existingLabel == null)
        {
            return NotFound($"It is not possible to update label. There is no label with id {id}.");
        }
        existingLabel.ProductName = labelData.ProductName;
        existingLabel.LegalName = labelData.LegalName;
        existingLabel.IngredientsList = labelData.IngredientsList;
        existingLabel.Allergens = labelData.Allergens;
        existingLabel.Nutritions = labelData.Nutritions;
        existingLabel.Producer = labelData.Producer;
        existingLabel.Distributor = labelData.Distributor;
        existingLabel.CountryOfOrigin = labelData.CountryOfOrigin;
        existingLabel.NetWeight = labelData.NetWeight;
        existingLabel.NetVolume = labelData.NetVolume;
        existingLabel.Storage = labelData.Storage;
        existingLabel.UBD = labelData.UBD == new DateTime() ? existingLabel.UBD : labelData.UBD;
        existingLabel.BBD = labelData.BBD == new DateTime() ? existingLabel.BBD : labelData.BBD;
        existingLabel.BBE = labelData.BBE == new DateTime() ? existingLabel.BBE : labelData.BBE;
        existingLabel.Organic = labelData.Organic;
        existingLabel.EAN = labelData.EAN;
        existingLabel.BestBeforeAdditionalInformation = labelData.BestBeforeAdditionalInformation;
        existingLabel.BestBeforeText = labelData.BestBeforeText;
        existingLabel.CookingInstructions = labelData.CookingInstructions;
        existingLabel.HealthMark = labelData.HealthMark;
        existingLabel.IngredientsListAdditionalInformation = labelData.IngredientsListAdditionalInformation;
        existingLabel.LegalNameAdditionalInformation = labelData.LegalNameAdditionalInformation;
        existingLabel.MainIngredientCOO = labelData.MainIngredientCOO;
        existingLabel.MayContain = labelData.MayContain;

        _labelRepository.Update(existingLabel);

        return Ok(existingLabel);
    }
    
    [HttpDelete("DeleteByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Label>> DeleteByIdAsync([FromRoute] int id)
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