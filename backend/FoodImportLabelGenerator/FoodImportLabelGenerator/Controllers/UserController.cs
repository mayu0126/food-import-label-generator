using System.ComponentModel.DataAnnotations;
using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; //needed because this class derives from ControllerBase

namespace FoodImportLabelGenerator.Controllers;

//SRP - Any controller class should focus solely on handling the HTTP requests and responses and should be as 'thin' as possible

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;
    private readonly UserManager<User> _userManager;

    public UserController(ILogger<UserController> logger, IConfiguration configuration, IUserRepository userRepository)
    {
        _logger = logger;
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpGet("GetAllAsync"), Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<User>>> GetAllAsync()
    {
        var users = _userRepository.GetAll();
        if (users == null)
        {
            return NotFound("There are no users in the database");
        }
        try
        {
            return Ok(users);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting users");
            return NotFound("Error getting users");
        }
    }

    [HttpGet("GetByUserNameAsync/{userName}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<User>> GetByUserNameAsync([Required]string userName)
    {
        var user = _userRepository.GetByUserName(userName);

        if (user == null)
        {
            return NotFound($"Cannot find user with username {userName}.");
        }
        try
        {
            return Ok(user);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting user");
            return NotFound("Error getting user");
        }
    }

    [HttpGet("GetByEmailAsync/{email}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<User>> GetByEmailAsync(string email)
    {
        var user = _userRepository.GetByEmail(email);

        if (user == null)
        {
            return NotFound($"Cannot find user with email {email}.");
        }
        try
        {
            return Ok(user);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting user");
            return NotFound("Error getting user");
        }
    }
    
    [HttpGet("GetByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<User>> GetByIdAsync(string id)
    {
        var user = _userRepository.GetById(id);

        if (user == null)
        {
            return NotFound($"Cannot find user with id {id}.");
        }
        try
        {
            return Ok(user);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting user");
            return NotFound("Error getting user");
        }
    }

        
    [HttpGet("GetByCompanyNameAsync/{companyName}"), Authorize(Roles = "Admin")]
    public async Task<ActionResult<User>> GetByCompanyNameAsync(string companyName)
    {
        var user = _userRepository.GetByCompanyName(companyName);

        if (user == null)
        {
            return NotFound($"Cannot find user with company name {companyName}.");
        }
        try
        {
            return Ok(user);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error getting user");
            return NotFound("Error getting user");
        }
    }

    
    [HttpPut("UpdateAsync"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<User>> UpdateAsync([FromBody] User userData)
    {
        try
        {
            User existingUser = _userRepository.GetByUserName(userData.UserName);

            if (existingUser == null)
            {
                return NotFound($"It is not possible to update user. There is no user with username {userData.UserName}.");
            }

            existingUser.FirstName = string.IsNullOrEmpty(userData.FirstName) ? existingUser.FirstName : userData.FirstName;
            existingUser.LastName = string.IsNullOrEmpty(userData.LastName) ? existingUser.LastName : userData.LastName;
            existingUser.CompanyName = string.IsNullOrEmpty(userData.CompanyName) ? existingUser.CompanyName : userData.CompanyName;
            existingUser.PhoneNumber = string.IsNullOrEmpty(userData.PhoneNumber) ? existingUser.PhoneNumber : userData.PhoneNumber;
            existingUser.UserName = string.IsNullOrEmpty(userData.UserName) ? existingUser.UserName : userData.UserName;
            existingUser.Email = string.IsNullOrEmpty(userData.Email) ? existingUser.Email : userData.Email;

            _userRepository.Update(existingUser);

            return Ok(existingUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user");
            throw;
        }
    }
    
    [HttpDelete("DeleteByIdAsync/{id}"), Authorize(Roles = "User, Admin")]
    public async Task<ActionResult<User>> DeleteByIdAsync(string id)
    {
        User existingUser = _userRepository.GetById(id)!;
        
        if (existingUser == null)
        {
            return NotFound($"It is not possible to delete user. There is no user with id {id}.");
        }

        _userRepository.Delete(existingUser);
        return Ok($"User with id {id} has been deleted successfully.");
    }
}