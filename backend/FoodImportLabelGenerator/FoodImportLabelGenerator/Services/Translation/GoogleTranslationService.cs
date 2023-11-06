using FoodImportLabelGenerator.Contracts;
using Google.Cloud.Translation.V2;

namespace FoodImportLabelGenerator.Services.Translation;

public class GoogleTranslationService : IGoogleTranslationService
{
    private TranslationClient _translationClient;

    public GoogleTranslationService(string apiKey)
    {
        var clientBuilder = TranslationClient.CreateFromApiKey(apiKey);
        _translationClient = clientBuilder;
    }

    public async Task<string> TranslateText(string text, string targetLanguage, string sourceLanguage)
    {
        var response = _translationClient.TranslateText(text, targetLanguage, sourceLanguage);

        if (response.TranslatedText.Length > 0)
        {
            return response.TranslatedText;
        }

        throw new Exception("Translation failed.");
    }
}