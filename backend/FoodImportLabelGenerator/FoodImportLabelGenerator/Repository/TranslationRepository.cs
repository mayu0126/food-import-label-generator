using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodImportLabelGenerator.Repository;

public class TranslationRepository : ITranslationRepository
{
    private readonly IConfiguration _configuration;
    public TranslationRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public IEnumerable<Translation> GetAll()
    {
        using var dbContext = new TranslationsContext(_configuration);
        return dbContext.Translations!.ToList();
    }
    
    public Translation? GetById(int id)
    {
        using var dbContext = new TranslationsContext(_configuration);
        return dbContext.Translations!.FirstOrDefault(t=>t.Id == id);
    }

    public IEnumerable<Translation> GetByEnglishWord(string englishWord)
    {
        using var dbContext = new TranslationsContext(_configuration);
        return dbContext.Translations!.Where(t => t.English.ToLower().Contains(englishWord.ToLower())).ToList();
    }
    
    public IEnumerable<Translation> GetByHungarianWord(string hungarianWord)
    {
        using var dbContext = new TranslationsContext(_configuration);
        return dbContext.Translations!.Where(t => t.Hungarian.ToLower().Contains(hungarianWord.ToLower())).ToList();
    }

    public void Add(Translation translation)
    {
        using var dbContext = new TranslationsContext(_configuration);
        dbContext.Add(translation);
        dbContext.SaveChanges();

    }

    public void Update(Translation updatedTranslation)
    {
        using var dbContext = new TranslationsContext(_configuration);
        dbContext.Update(updatedTranslation);
        dbContext.SaveChanges();
    }

    public void Delete(Translation translation)
    {
        using var dbContext = new TranslationsContext(_configuration);
        dbContext.Remove(translation);
        dbContext.SaveChanges();
    }
}