using System.ComponentModel.DataAnnotations;
using FoodImportLabelGenerator.Contracts;
using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using FoodImportLabelGenerator.Services.Translation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; //needed because this class derives from ControllerBase

namespace FoodImportLabelGenerator.Controllers;

//SRP - Any controller class should focus solely on handling the HTTP requests and responses and should be as 'thin' as possible

[ApiController]
[Route("[controller]")]
public class TranslationController : ControllerBase
{
    private readonly ILogger<TranslationController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ITranslationRepository _translationRepository;
    private readonly IGoogleTranslationService _googleTranslationService;

    public TranslationController(ILogger<TranslationController> logger, IConfiguration configuration,
        ITranslationRepository translationRepository, IGoogleTranslationService googleTranslationService)
    {
        _logger = logger;
        _configuration = configuration;
        _translationRepository = translationRepository;
        _googleTranslationService = googleTranslationService;
    }

    [HttpGet("GetAllAsync"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<IEnumerable<Translation>>> GetAllAsync()
    {
        var translations = _translationRepository.GetAll();
        if (translations == null)
        {
            return NotFound("There are no translations in the database.");
        }
        try
        {
            return Ok(translations);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting translations");
            return NotFound("Error getting translations.");
        }
    }
    
    
    [HttpGet("GetByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Translation>> GetByIdAsync(int id)
    {
        var translation = _translationRepository.GetById(id);

        if (translation == null)
        {
            return NotFound($"Cannot find translation with id {id}.");
        }
        try
        {
            return Ok(translation);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting translation");
            return NotFound("Error getting translation.");
        }
    }

    [HttpGet("GetByEnglishWordAsync/{englishWord}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Translation>> GetByEnglishAsync([FromRoute]string englishWord)
    {
        Console.WriteLine(englishWord);
        string decodedText = Uri.UnescapeDataString(englishWord);
        Console.WriteLine(decodedText);
        var translations = _translationRepository.GetByEnglishWord(englishWord);

        if (!translations.Any())
        {
            return NotFound($"Cannot find translation for {englishWord}.");
        }
        try
        {
            return Ok(translations.ToList()[0]);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting translations");
            return NotFound("Error getting translations.");
        }
    }

    [HttpGet("GetByHungarianWordAsync"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<IEnumerable<Translation>>> GetByHungarianWordAsync([Required]string hungarianWord)
    {
        var translations = _translationRepository.GetByHungarianWord(hungarianWord);

        if (!translations.Any())
        {
            return NotFound($"Cannot find translation for {hungarianWord}.");
        }
        try
        {
            return Ok(translations);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting translations");
            return NotFound("Error getting translations.");
        }
    }

    [HttpPost("AddAsync"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<IEnumerable<Translation>>> AddAsync([FromBody] Translation translation)
    {
        // Additional validation for mandatory parameters
        if (string.IsNullOrWhiteSpace(translation.English))
        {
            ModelState.AddModelError("englishWord", "English word field cannot be empty.");
        }
        
        if (string.IsNullOrWhiteSpace(translation.Hungarian))
        {
            ModelState.AddModelError("hungarianWord", "Hungarian word field cannot be empty.");
        }

        if (!ModelState.IsValid)
        {
            return BadRequest("Missing or invalid input data");
        }
        
        Translation newTranslation = new Translation()
        {
            English = translation.English,
            Hungarian = translation.Hungarian
        };
        _translationRepository.Add(newTranslation);
        return Ok("New translation added successfully.");
        //return Ok(new { Message = "New translation added successfully.", Translation = newTranslation });
    }

    [HttpPut("UpdateAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Translation>> UpdateAsync(int id, string englishWord, string hungarianWord)
    {
        Translation existingTranslation = _translationRepository.GetById(id);

        if (existingTranslation == null)
        {
            return NotFound($"It is not possible to update translation. There is no translation with id {id}.");
        }
        
        existingTranslation.English = string.IsNullOrEmpty(englishWord) ? existingTranslation.English : englishWord;
        existingTranslation.Hungarian = string.IsNullOrEmpty(hungarianWord) ? existingTranslation.Hungarian : hungarianWord;

        _translationRepository.Update(existingTranslation);

        return Ok(existingTranslation);
    }
    
    [HttpDelete("DeleteByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<Translation>> DeleteByIdAsync(int id)
    {
        Translation existingTranslation = _translationRepository.GetById(id);
        
        if (existingTranslation == null)
        {
            return NotFound($"It is not possible to delete translation. There is no translation with id {id}.");
        }

        _translationRepository.Delete(existingTranslation);
        return Ok($"Translation with id {id} has been deleted successfully.");
    }
    
    [HttpPost("Translate"), Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> Translate([FromBody] TranslateRequest request)
    {
        try
        {
            string translatedText = await _googleTranslationService.TranslateText(request.Text, request.TargetLanguage, request.SourceLanguage);
            return Ok(new { TranslatedText = translatedText });
        }
        catch (Exception ex)
        {
            return BadRequest("Translation failed: " + ex.Message);
        }
    }
    
    [HttpPost("TranslateEnglishTextAsync"), Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> TranslateEnglishTextAsync([FromBody] TranslateRequest request)
    {
        var translatedText = _translationRepository.TranslateEnglishText(request.Text);
        if (!translatedText.Any())
        {
            return NotFound("Cannot find translation.");
        }
        try
        {
            return Ok(translatedText);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting translation");
            return NotFound("Error getting translation.");
        }
    }
    
}