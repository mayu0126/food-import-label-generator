using Microsoft.AspNetCore.Mvc; //needed because this class derives from ControllerBase

namespace FoodImportStickerGenerator.Controllers;

[ApiController]
[Route("[controller]")]
public class StickerController : ControllerBase
{
    private readonly ILogger<StickerController> _logger;

    public StickerController(ILogger<StickerController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetSticker")]
    public Sticker Get()
    {
        return new Sticker
        {
            Date = DateOnly.FromDateTime(DateTime.Now),
            LegalName = "Chocolate",
            Nutritions = "calories",
            Producer = "Mayu Kft.",
            CountryOfOrigin = "Hungary",
            NetWeight = 500,
            Storage = "20 °C",
            BBD = new DateTime(2023, 12,12),
            Organic = false
            
        };
    }
}