namespace FoodImportLabelGenerator.Contracts;

public record TranslateRequest(
    string Text,
    string TargetLanguage,
    string SourceLanguage);
