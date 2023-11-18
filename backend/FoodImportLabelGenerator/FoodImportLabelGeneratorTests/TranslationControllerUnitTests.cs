using FoodImportLabelGenerator.Contracts;
using FoodImportLabelGenerator.Controllers;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using FoodImportLabelGenerator.Services.Translation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;

namespace FoodImportLabelGeneratorTests;

public class TranslationControllerUnitTests
{
    private TranslationController _translationController;
    private IConfiguration _configuration;
    private Mock<ILogger<TranslationController>> _loggerMock;
    private Mock<ITranslationRepository> _translationRepositoryMock;
    private Mock<IGoogleTranslationService> _googleTranslationServiceMock;

    [SetUp]
    public void Setup()
    {
        _loggerMock = new Mock<ILogger<TranslationController>>();
        _configuration = new ConfigurationBuilder().Build();
        _translationRepositoryMock = new Mock<ITranslationRepository>();
        _googleTranslationServiceMock = new Mock<IGoogleTranslationService>();

        _translationController = new TranslationController(
            _loggerMock.Object,
            _configuration,
            _translationRepositoryMock.Object,
            _googleTranslationServiceMock.Object
        );
    }

    [Test]
    public async Task GetAllAsync_ReturnsOkResult()
    {
        // Arrange
        IEnumerable<Translation> allTranslations = new[] { new Translation(), new Translation(), new Translation() };
        _translationRepositoryMock.Setup(x => x.GetAll()).Returns(allTranslations);

        // Act
        var result = await _translationController.GetAllAsync();

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
        Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(allTranslations));
    }

    [Test]
    public async Task GetByIdAsync_ReturnsOkResult()
    {
        // Arrange
        int translationId = 1;
        Translation translation = new Translation() { Id = translationId };
        _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns(translation);

        // Act
        var result = await _translationController.GetByIdAsync(translationId);

        // Assert
        Assert.IsInstanceOf<OkObjectResult>(result.Result);
        Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(translation));
    }

    [Test]
    public async Task GetByIdAsync_ReturnsNotFoundResult()
    {
        // Arrange: Non-existing translation by id
        int translationId = 999;
        _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns((Translation)null!);

        // Act
        ActionResult<Translation> result = await _translationController.GetByIdAsync(translationId);

        // Assert
        Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
    }

            [Test]
        public async Task GetByEnglishAsync_ReturnsOkResult()
        {
            // Arrange
            string englishWord = "TestWord";
            IEnumerable<Translation> translations = new[] { new Translation() { English = englishWord } };
            _translationRepositoryMock.Setup(x => x.GetByEnglishWord(englishWord)).Returns(translations);

            // Act
            var result = await _translationController.GetByEnglishAsync(englishWord);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(translations.First()));
        }

        [Test]
        public async Task GetByEnglishAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing translation by English word
            string englishWord = "NonexistentWord";
            _translationRepositoryMock.Setup(x => x.GetByEnglishWord(englishWord)).Returns(new List<Translation>());

            // Act
            ActionResult<Translation> result = await _translationController.GetByEnglishAsync(englishWord);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task GetByHungarianWordAsync_ReturnsOkResult()
        {
            // Arrange
            string hungarianWord = "TestWord";
            IEnumerable<Translation> translations = new[] { new Translation() { Hungarian = hungarianWord } };
            _translationRepositoryMock.Setup(x => x.GetByHungarianWord(hungarianWord)).Returns(translations);

            // Act
            var result = await _translationController.GetByHungarianWordAsync(hungarianWord);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(translations));
        }

        [Test]
        public async Task GetByHungarianWordAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing translation by Hungarian word
            string hungarianWord = "NonexistentWord";
            _translationRepositoryMock.Setup(x => x.GetByHungarianWord(hungarianWord)).Returns(new List<Translation>());

            // Act
            ActionResult<IEnumerable<Translation>> result = await _translationController.GetByHungarianWordAsync(hungarianWord);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task AddAsync_ReturnsOkResult()
        {
            // Arrange
            string englishWord = "TestEnglish";
            string hungarianWord = "TestHungarian";
            var newTranslation = new Translation() { English = englishWord, Hungarian = hungarianWord };
            _translationRepositoryMock.Setup(x => x.Add(newTranslation));

            // Act
            var result = await _translationController.AddAsync(newTranslation);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public async Task UpdateAsync_ReturnsOkResult()
        {
            // Arrange
            int translationId = 1;
            Translation existingTranslation = new Translation() { Id = translationId, English = "TestEnglish" };
            string newEnglishWord = "UpdatedEnglish";
            string newHungarianWord = "UpdatedHungarian";

            _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns(existingTranslation);
            _translationRepositoryMock.Setup(x => x.Update(existingTranslation));

            // Act
            var result = await _translationController.UpdateAsync(translationId, newEnglishWord, newHungarianWord);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(existingTranslation));
            Assert.That(newEnglishWord, Is.EqualTo(existingTranslation.English));
            Assert.That(newHungarianWord, Is.EqualTo(existingTranslation.Hungarian));
        }

        [Test]
        public async Task UpdateAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing translation by id
            int translationId = 999;
            _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns((Translation)null!);

            // Act
            ActionResult<Translation> result = await _translationController.UpdateAsync(translationId, "NewEnglish", "NewHungarian");

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task DeleteByIdAsync_ReturnsOkResult()
        {
            // Arrange
            int translationId = 1;
            Translation existingTranslation = new Translation() { Id = translationId, English = "TestEnglish" };

            _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns(existingTranslation);
            _translationRepositoryMock.Setup(x => x.Delete(existingTranslation));

            // Act
            var result = await _translationController.DeleteByIdAsync(translationId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public async Task DeleteByIdAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing translation by id
            int translationId = 999;
            _translationRepositoryMock.Setup(x => x.GetById(translationId)).Returns((Translation)null!);

            // Act
            ActionResult<Translation> result = await _translationController.DeleteByIdAsync(translationId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task Translate_ReturnsOkResult()
        {
            // Arrange
            var request = new TranslateRequest("TestText", "hu", "en");
            var translatedText = "TranslatedText";

            _googleTranslationServiceMock.Setup(x => x.TranslateText(request.Text, request.TargetLanguage, request.SourceLanguage))
                .ReturnsAsync(translatedText);

            // inject the mock service to the controller
            _translationController = new TranslationController(_loggerMock.Object, _configuration, _translationRepositoryMock.Object, _googleTranslationServiceMock.Object);

            // Act
            var result = await _translationController.Translate(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task TranslateEnglishText_ReturnsOkResult()
        {
            // Arrange
            var request = new TranslateRequest ("TestText", "hu", "en");
            IEnumerable<Translation> translations = new[] { new Translation { Hungarian = "TestHungarian" } };
            _translationRepositoryMock.Setup(x => x.TranslateEnglishText(request.Text)).Returns(translations);

            // Act
            var result = await _translationController.TranslateEnglishTextAsync(request);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task TranslateEnglishText_ReturnsNotFoundResult()
        {
            // Arrange: No translation found for the given English text
            var request = new TranslateRequest ("NonexistentText", "hu", "en");
            //IEnumerable<Translation> translations = new[] { new Translation {English = null, Hungarian = null} };
            _translationRepositoryMock.Setup(x => x.TranslateEnglishText(request.Text)).Returns(new List<Translation>());

            // Act
            var result = _translationController.TranslateEnglishTextAsync(request).Result;

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

}