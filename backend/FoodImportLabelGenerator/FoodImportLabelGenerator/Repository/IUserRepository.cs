using FoodImportLabelGenerator.Models;

namespace FoodImportLabelGenerator.Repository;

public interface IUserRepository
{
    IEnumerable<User> GetAll();
    IEnumerable<User> GetByUserName(string userName); //if the value was not found, the method will return null
    User? GetByEmail(string email);
    User? GetById(string id);
    IEnumerable<User> GetByCompanyName(string companyName);
    void Add(User user);
    void Update(User updatedUser);
    void Delete(User user);
}