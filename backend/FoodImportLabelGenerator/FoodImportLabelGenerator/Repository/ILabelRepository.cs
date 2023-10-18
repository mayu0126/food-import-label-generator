namespace FoodImportLabelGenerator.Repository;

public interface ILabelRepository
{
    IEnumerable<Label> GetAll();
    IEnumerable<Label> GetByName(string legalName); //if the value was not found, the method will return null
    Label? GetById(int id);
    void Add(Label label);
    void Update(Label label);
    void Delete(Label label);
}