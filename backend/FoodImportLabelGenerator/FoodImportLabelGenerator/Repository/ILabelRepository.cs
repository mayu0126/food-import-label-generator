using FoodImportLabelGenerator.Models;

namespace FoodImportLabelGenerator.Repository;

public interface ILabelRepository
{
    IEnumerable<Label> GetAll();
    IEnumerable<Label> GetByName(string legalName); //if the value was not found, the method will return null
    Label? GetById(int id);
    IEnumerable<Label>? GetByUserId(string userId);
    void Add(Label label);
    void Update(Label updatedLabel);
    void Delete(Label label);
}