using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc; //needed because this class derives from ControllerBase

namespace FoodImportStickerGenerator.Controllers;

[ApiController]
[Route("[controller]")]
public class StickerController : ControllerBase
{

    private static readonly List<Sticker> Stickers = new()
    {
        new Sticker()
        {
            Id = 1,
            Date = DateOnly.FromDateTime(DateTime.Now),
            LegalName = "Chocolate",
            Nutritions = "calories",
            Producer = "Mayu Kft.",
            CountryOfOrigin = "Hungary",
            NetWeight = 500,
            Storage = "20 °C",
            BBD = new DateTime(2023, 12,12),
            Organic = false
            
        },
        new Sticker()
        {
            Id = 2,
            Date = DateOnly.FromDateTime(DateTime.Now),
            LegalName = "Candy",
            Nutritions = "calories",
            Producer = "Mayu Kft.",
            CountryOfOrigin = "Hungary",
            NetWeight = 300,
            Storage = "25 °C",
            BBD = new DateTime(2023, 10,30),
            Organic = true
            
        }
    };
    
    private readonly ILogger<StickerController> _logger;

    public StickerController(ILogger<StickerController> logger)
    {
        _logger = logger;
    }

    [HttpGet("GetAll")]
    public IEnumerable<Sticker> GetAll()
    {
        return Stickers;
    }

    [HttpGet("GetByName")]
    public IEnumerable<Sticker> GetByName(string name)
    {
        return Stickers.Where(s=>s.LegalName.Contains(name));
    }
    
    [HttpGet("GetById/{id}")]
    public ActionResult<Sticker> GetById(int id)
    {
        Sticker existingSticker = Stickers.FirstOrDefault(s=>s.Id == id);
        
        if (existingSticker == null)
        {
            return NotFound();
        }

        return existingSticker;
    }
    
    
    [HttpPost("Add")]
    public ActionResult<IEnumerable<Sticker>> Add(string productName, [Required]string legalName,
        string ingredientsList, string allergens, [Required]string nutritions,
        [Required]string producer, string countryOfOrigin, int netWeight, int netVolume,
        [Required]string storage, DateTime ubd, DateTime bbd, DateTime bbe, [Required]bool organic)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Missing or invalid input data");
        }
        Sticker newSticker = new Sticker()
        {
            Id = Stickers.Count()+1,
            Date = DateOnly.FromDateTime(DateTime.Now),
            ProductName = productName,
            LegalName = legalName,
            IngredientsList = ingredientsList,
            Allergens = allergens,
            Nutritions = nutritions,
            Producer = producer,
            CountryOfOrigin = countryOfOrigin,
            NetWeight = netWeight,
            NetVolume = netVolume,
            Storage = storage,
            UBD = ubd,
            BBD = bbd,
            BBE = bbe,
            Organic = organic
        };

        Stickers.Add(newSticker);
        
        return Ok(Stickers);
    }

    
    [HttpPut("Update/{id}")]
    public ActionResult<Sticker> Update(int id, string productName, string legalName,
        string ingredientsList, string allergens, string nutritions,
        string producer, string countryOfOrigin, int netWeight, int netVolume,
        string storage, DateTime ubd, DateTime bbd, DateTime bbe, bool organic)
    {
        Sticker existingSticker = Stickers.FirstOrDefault(s => s.Id == id);

        if (existingSticker == null)
        {
            return NotFound();
        }

        existingSticker.ProductName = productName == "" ? existingSticker.ProductName : productName;
        existingSticker.LegalName = legalName == "" ? existingSticker.LegalName : legalName;
        existingSticker.IngredientsList = ingredientsList == "" ? existingSticker.IngredientsList : ingredientsList;
        existingSticker.Allergens = allergens == "" ? existingSticker.Allergens : allergens;
        existingSticker.Nutritions = nutritions == "" ? existingSticker.Nutritions : nutritions;
        existingSticker.Producer = producer == "" ? existingSticker.Producer : producer;
        existingSticker.CountryOfOrigin = countryOfOrigin == "" ? existingSticker.CountryOfOrigin : countryOfOrigin;
        existingSticker.NetWeight = netWeight == 0 ? existingSticker.NetWeight : netWeight;
        existingSticker.NetVolume = netVolume == 0 ? existingSticker.NetVolume :netVolume;
        existingSticker.Storage = storage == "" ? existingSticker.Storage : storage;
        existingSticker.UBD = ubd == new DateTime() ? existingSticker.UBD : ubd;
        existingSticker.BBD = bbd == new DateTime() ? existingSticker.BBD : bbd;
        existingSticker.BBE = bbe == new DateTime() ? existingSticker.BBE : bbe;
        existingSticker.Organic = organic == new Boolean() ? existingSticker.Organic : organic;

        return Ok(existingSticker);
    }
    
}