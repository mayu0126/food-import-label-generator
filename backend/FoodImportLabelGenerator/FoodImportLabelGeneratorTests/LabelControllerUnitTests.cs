using System.Collections;
using FoodImportLabelGenerator;
using FoodImportLabelGenerator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using IConfiguration = Castle.Core.Configuration.IConfiguration;

namespace FoodImportLabelGeneratorTests;

public class LabelControllerUnitTests
{
    private LabelController _labelController;
    private IConfiguration _configuration;

    [SetUp]
    public void Setup()
    {
        // Initializing the LabelController with a Mock ILogger and IConfiguration:
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()) // Add the appropriate path
            .AddJsonFile("appsettings.json") // Add configuration file
            .Build();
        
        _labelController = new LabelController(new Microsoft.Extensions.Logging.Abstractions.NullLogger<LabelController>(), configuration);
    }
/*
    [Test]
    public void GetAll_ReturnsOkResult()
    {
        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.GetAllAsync().Result;

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }
    /*
    [Test]
    public void GetByName_ReturnsOkResult()
    {
        // Arrange
        string name = "Chocolate";

        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.GetByNameAsync(name).Result;

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }
    
    [Test]
    public void GetByName_ReturnsNotFoundResult()
    {
        // Arrange
        string name = "NonexistentLabelName";

        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.GetByNameAsync(name).Result;

        // Assert
        Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
    }
    
    [Test]
    public void GetById_ReturnsOkResult()
    {
        // Arrange
        int id = 1;

        // Act
        ActionResult<Label> result = _labelController.GetByIdAsync(id).Result;

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }

    [Test]
    public void GetById_ReturnsNotFoundResult()
    {
        // Arrange
        int id = 999999999; // Non existing ID

        // Act
        ActionResult<Label> result = _labelController.GetByIdAsync(id).Result;

        // Assert
        Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
    }

    [Test]
    public void Add_ReturnsOkResult()
    {
        // Arrange: Valid details for Add
        string legalName = "NewLabel";

        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.AddAsync(null, legalName, null, null, "NewNutritions", null, "NewDistributor", "NewCountry", 500, 0, "NewStorage", null, null, null, true).Result;

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }

    [Test]
    public void Add_ReturnsBadRequestResultForInvalidInput_LegalName()
    {
        // Arrange: Non valid details for Add
        string legalName = null;

        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.AddAsync(null, legalName, null, null, "NewNutritions", null, "NewDistributor", "NewCountry", 500, 0, "NewStorage", null, null, null, true).Result;

        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
    }
    
    [Test]
    public void Add_ReturnsBadRequestResultForInvalidInput_Nutritions()
    {
        // Arrange: Non valid details for Add
        string nutritions = null;

        // Act
        ActionResult<IEnumerable<Label>> result = _labelController.AddAsync(null, "legalName", null, null, nutritions, null, "NewDistributor", "NewCountry", 500, 0, "NewStorage", null, null, null, true).Result;

        // Assert
        Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
    }

    [Test]
    public void Update_ReturnsOkResult()
    {
        // Arrange: Existing label ID and valid modifications
        int id = 1;
        string newProductName = "NewProductName";
        string newLegalName = "UpdatedLabelName";

        // Act
        ActionResult<Label> result = _labelController.UpdateAsync(id, newProductName, newLegalName, null, null, null, null, null, null, 0, 0, null, DateTime.Now, DateTime.Now, DateTime.Now, false).Result;

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }

    [Test]
    public void Update_ReturnsNotFoundResult()
    {
        // Arrange: Non existing label ID and modifications
        int id = 999;
        string newProductName = "NewProductName";
        string newLegalName = "UpdatedLabelName";

        // Act
        ActionResult<Label> result = _labelController.UpdateAsync(id, newProductName, newLegalName, null, null, null, null, null, null, 0, 0, null, DateTime.Now, DateTime.Now, DateTime.Now, false).Result;

        // Assert
        Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
    }
/*
    [Test]
    public void DeleteById_ReturnsOkResult()
    {
        // Arrange: Existing label ID
        int id = 1;

        // Act
        ActionResult<Label> result = _labelController.DeleteById(id);

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
    }

    [Test]
    public void DeleteById_ReturnsNotFoundResult()
    {
        // Arrange: Non existing label ID
        int id = 999999999;

        // Act
        ActionResult<Label> result = _labelController.DeleteById(id);

        // Assert
        Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
    }
*/
    
}