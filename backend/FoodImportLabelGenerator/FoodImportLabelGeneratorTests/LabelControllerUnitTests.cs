using System.Collections;
using FoodImportLabelGenerator;
using FoodImportLabelGenerator.Controllers;
using FoodImportLabelGenerator.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;

namespace FoodImportLabelGeneratorTests;

public class LabelControllerUnitTests
{
    private LabelController _labelController;
    private IConfiguration _configuration;
    private Mock<ILogger<LabelController>> _loggerMock;
    private Mock<ILabelRepository> _labelRepositoryMock;

    [SetUp]
    public void Setup()
    {
        _loggerMock = new Mock<ILogger<LabelController>>();
        _configuration = new ConfigurationBuilder().Build();
        _labelRepositoryMock = new Mock<ILabelRepository>();
        _labelController = new LabelController(_loggerMock.Object, _configuration, _labelRepositoryMock.Object);
    }

    [Test]
    public async Task GetAllAsync_ReturnsOkResult()
    {
        // Arrange
        IEnumerable<Label> allLabels = new[] { new Label(), new Label(), new Label() };
        _labelRepositoryMock.Setup(x => x.GetAll()).Returns(allLabels);
            
        // Act
        var result = await _labelController.GetAllAsync();

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
        Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo(allLabels));
    }

    [Test]
    public async Task GetByName_ReturnsOkResult()
    {
        // Arrange
        IEnumerable<Label> labelByName = new[] { new Label(){LegalName = "Chocolate"}};
        string name = "Chocolate";
        _labelRepositoryMock.Setup(x => x.GetByName(name)).Returns(labelByName);
        
        // Act
        var result = await _labelController.GetByNameAsync(name);

        // Assert
        Assert.IsInstanceOf(typeof(OkObjectResult), result.Result);
        Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo(labelByName));
    }
  
     [Test]
     public async Task GetByName_ReturnsNotFoundResult()
     {
         // Arrange
         string name = "NonexistentLabelName";
         _labelRepositoryMock.Setup(x => x.GetByName(name)).Returns(Enumerable.Empty<Label>());
 
         // Act
         ActionResult<IEnumerable<Label>> result = await _labelController.GetByNameAsync(name);
 
         // Assert
         Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
     }
 
      [Test]
      public async Task GetById_ReturnsOkResult()
      {
          // Arrange
          Label labelById = new Label() {Id = 1};
          int id = 1;
          _labelRepositoryMock.Setup(x => x.GetById(id)).Returns(labelById);

          // Act
          ActionResult<Label> result = await _labelController.GetByIdAsync(id);
  
          // Assert
          Assert.IsInstanceOf(typeof(OkObjectResult), result.Result);
          Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo(labelById));
      }

      [Test]
      public async Task GetById_ReturnsNotFoundResult()
      {
          // Arrange
          int id = 999999999; // Non existing ID
          _labelRepositoryMock.Setup(x => x.GetById(id)).Returns((Label)null);

          // Act
          ActionResult<Label> result = await _labelController.GetByIdAsync(id);
  
          // Assert
          Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
      }

        [Test]
        public async Task Add_ReturnsOkResult()
        {
            // Arrange: Valid details for Add
            Label newLabel = new Label()
            {
                LegalName = "Milk",
                Distributor = "Milkman Kft.",
                Nutritions = "Nutritions",
                Storage = "Storage information",
                Organic = true
            };
            _labelRepositoryMock.Setup(x => x.Add(newLabel));
    
            // Act
            ActionResult<IEnumerable<Label>> result = await _labelController.AddAsync(null, "Milk", null, null, "Nutritions", null, "Milkman Kft.", null, 0, 0, "Storage information", null, null, null, true);
    
            // Assert
            Assert.IsInstanceOf(typeof(OkObjectResult), result.Result);
            Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo("New label added successfully."));
        }

        [Test]
        public async Task Add_ReturnsBadRequestResultForInvalidInput_LegalName()
        {
            // Arrange: Non valid details for Add
            Label newLabel = new Label()
            {
                LegalName = null,
                Distributor = "Milkman Kft.",
                Nutritions = "Nutritions",
                Storage = "Storage information",
                Organic = true
            };
            _labelRepositoryMock.Setup(x => x.Add(newLabel));
            
            // Act
            ActionResult<IEnumerable<Label>> result = await _labelController.AddAsync(null, null, null, null, "Nutritions", null, "Milkman Kft.", null, 0, 0, "Storage information", null, null, null, true);
    
            // Assert
            Assert.IsInstanceOf(typeof(BadRequestObjectResult), result.Result);
            Assert.That(((BadRequestObjectResult)result.Result).Value, Is.EqualTo("Missing or invalid input data"));
        }
    
        [Test]
        public async Task Add_ReturnsBadRequestResultForInvalidInput_Nutritions()
        {
            Label newLabel = new Label()
            {
                LegalName = "Milk",
                Distributor = "Milkman Kft.",
                Nutritions = null,
                Storage = "Storage information",
                Organic = true
            };
            _labelRepositoryMock.Setup(x => x.Add(newLabel));
            
            // Act
            ActionResult<IEnumerable<Label>> result = await _labelController.AddAsync(null, "Milk", null, null, null, null, "Milkman Kft.", null, 0, 0, "Storage information", null, null, null, true);

            // Assert
            Assert.IsInstanceOf(typeof(BadRequestObjectResult), result.Result);
            Assert.That(((BadRequestObjectResult)result.Result).Value, Is.EqualTo("Missing or invalid input data"));
        }

        [Test]
        public async Task Update_ReturnsOkResult()
        {
            // Arrange: Existing label ID and valid modifications
            Label oldLabel = new Label()
            {
                Id = 1,
                LegalName = "OldLegalName",
                Distributor = "Milkman Kft.",
                Nutritions = "Nutritions",
                Storage = "Storage information",
                Organic = true
            };
            Label updatedLabel = new Label()
            {
                Id = 1,
                ProductName = null,
                LegalName = "UpdatedLegalName",
                IngredientsList = null,
                Allergens = null,
                Nutritions = "Nutritions",
                Producer = null,
                Distributor = "Milkman Kft.",
                CountryOfOrigin = null,
                NetWeight = 0,
                NetVolume = 0,
                Storage = "Storage information",
                UBD = null,
                BBD = null,
                BBE = null,
                Organic = true
            };
            _labelRepositoryMock.Setup(x => x.GetById(It.IsAny<int>())).Returns(oldLabel);
            _labelRepositoryMock.Setup(x => x.Update(updatedLabel));

            // Act
            ActionResult<Label> result = await _labelController.UpdateAsync(1, null, "UpdatedLegalName", null, null, "Nutritions", null, null, null, 0, 0, null, DateTime.Now, DateTime.Now, DateTime.Now, true);

            // Assert
            Assert.IsInstanceOf(typeof(OkObjectResult), result.Result);
            Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo(oldLabel));
        } 

          [Test]
          public async Task Update_ReturnsNotFoundResult()
          {
              // Arrange: Non existing label ID and modifications
              int id = 999999999;
              string updatedLegalName = "UpdatedLabelName";
              _labelRepositoryMock.Setup(x => x.GetById(id)).Returns((Label)null);
      
              // Act
              ActionResult<Label> result = _labelController.UpdateAsync(id, null, updatedLegalName, null, null, null, null, null, null, 0, 0, null, DateTime.Now, DateTime.Now, DateTime.Now, false).Result;
      
              // Assert
              Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
              Assert.That(((NotFoundObjectResult)result.Result).Value, Is.EqualTo($"It is not possible to update label. There is no label with id {id}."));
          }

          [Test]
          public async Task DeleteById_ReturnsOkResult()
          {
              // Arrange: Existing label ID
              Label oldLabel = new Label()
              {
                  Id = 1,
                  LegalName = "OldLegalName",
                  Distributor = "Milkman Kft.",
                  Nutritions = "Nutritions",
                  Storage = "Storage information",
                  Organic = true
              };
              int id = 1;
              _labelRepositoryMock.Setup(x => x.GetById(It.IsAny<int>())).Returns(oldLabel);
              _labelRepositoryMock.Setup(x => x.Delete(oldLabel));
      
              // Act
              ActionResult<Label> result = await _labelController.DeleteByIdAsync(id);
      
              // Assert
              Assert.IsInstanceOf(typeof(OkObjectResult), result.Result);
              Assert.That(((OkObjectResult)result.Result).Value, Is.EqualTo($"Label with id {id} has been deleted successfully."));
          }

          [Test]
          public async Task DeleteById_ReturnsNotFoundResult()
          {
              // Arrange: Non existing label ID
              int id = 999999999;
              _labelRepositoryMock.Setup(x => x.GetById(id)).Returns((Label)null);
      
              // Act
              ActionResult<Label> result = await _labelController.DeleteByIdAsync(id);
      
              // Assert
              Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
              Assert.That(((NotFoundObjectResult)result.Result).Value, Is.EqualTo($"It is not possible to delete label. There is no label with id {id}."));
          }
}