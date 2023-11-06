namespace FoodImportLabelGenerator.Services.Translation;

public interface IGoogleTranslationService
{
    public Task<string> TranslateText(string text, string targetLanguage, string sourceLanguage);
}