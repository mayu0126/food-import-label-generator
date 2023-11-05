using System.Collections.Generic;
using FoodImportLabelGenerator.Controllers;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System;
using System.ComponentModel.DataAnnotations;

namespace FoodImportLabelGeneratorTests
{
    public class UserControllerUnitTests
    {
        private UserController _userController;
        private IConfiguration _configuration;
        private Mock<ILogger<UserController>> _loggerMock;
        private Mock<IUserRepository> _userRepositoryMock;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<ILogger<UserController>>();
            _configuration = new ConfigurationBuilder().Build();
            _userRepositoryMock = new Mock<IUserRepository>();
            _userController = new UserController(_loggerMock.Object, _configuration, _userRepositoryMock.Object);
        }

        [Test]
        public async Task GetAllAsync_ReturnsOkResult()
        {
            // Arrange
            IEnumerable<User> allUsers = new[] { new User(), new User(), new User() };
            _userRepositoryMock.Setup(x => x.GetAll()).Returns(allUsers);

            // Act
            var result = await _userController.GetAllAsync();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(allUsers));
        }

        [Test]
        public async Task GetByUserNameAsync_ReturnsOkResult()
        {
            // Arrange
            string userName = "TestUser";
            User user = new User() { UserName = userName };
            _userRepositoryMock.Setup(x => x.GetByUserName(userName)).Returns(user);

            // Act
            var result = await _userController.GetByUserNameAsync(userName);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(user));
        }

        [Test]
        public async Task GetByUserNameAsync_ReturnsNotFoundResult()
        {
            // Arrange
            string userName = "NonexistentUser";
            _userRepositoryMock.Setup(x => x.GetByUserName(userName)).Returns((User)null!);

            // Act
            ActionResult<User> result = await _userController.GetByUserNameAsync(userName);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }
        
        [Test]
        public async Task GetByEmailAsync_ReturnsOkResult()
        {
            // Arrange
            string email = "testuser@example.com";
            User user = new User() { Email = email };
            _userRepositoryMock.Setup(x => x.GetByEmail(email)).Returns(user);

            // Act
            var result = await _userController.GetByEmailAsync(email);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(user));
        }

        [Test]
        public async Task GetByEmailAsync_ReturnsNotFoundResult()
        {
            // Arrange
            string email = "nonexistent@example.com";
            _userRepositoryMock.Setup(x => x.GetByEmail(email)).Returns((User)null!);

            // Act
            ActionResult<User> result = await _userController.GetByEmailAsync(email);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }
        
        [Test]
        public async Task GetByIdAsync_ReturnsOkResult()
        {
            // Arrange
            string userId = "1";
            User user = new User() { Id = userId };
            _userRepositoryMock.Setup(x => x.GetById(userId)).Returns(user);

            // Act
            var result = await _userController.GetByIdAsync(userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(user));
        }

        [Test]
        public async Task GetByIdAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing user by ID
            string userId = "999";
            _userRepositoryMock.Setup(x => x.GetById(userId)).Returns((User)null!);

            // Act
            ActionResult<User> result = await _userController.GetByIdAsync(userId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task GetByCompanyNameAsync_ReturnsOkResult()
        {
            // Arrange
            string companyName = "TestCompany";
            IEnumerable<User> users = new[] { new User() { CompanyName = companyName } };
            _userRepositoryMock.Setup(x => x.GetByCompanyName(companyName)).Returns(users);

            // Act
            var result = await _userController.GetByCompanyNameAsync(companyName);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(users));
        }

        [Test]
        public async Task GetByCompanyNameAsync_ReturnsNotFoundResult()
        {
            // Arrange
            string companyName = "NonexistentCompany";
            _userRepositoryMock.Setup(x => x.GetByCompanyName(companyName)).Returns((IEnumerable<User>)null!);

            // Act
            ActionResult<User> result = await _userController.GetByCompanyNameAsync(companyName);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task UpdateAsync_ReturnsOkResult()
        {
            // Arrange: Existing user with valid modifications
            User existingUser = new User() { UserName = "TestUser" };
            User updatedUser = new User() { UserName = "UpdatedUser" };
            _userRepositoryMock.Setup(x => x.GetByUserName(updatedUser.UserName)).Returns(existingUser);
            _userRepositoryMock.Setup(x => x.Update(existingUser));

            // Act
            ActionResult<User> result = await _userController.UpdateAsync(updatedUser);

            // Assert
            // Assert.IsInstanceOf<OkObjectResult>(result);
            Assert.That(((OkObjectResult)result.Result!).Value, Is.EqualTo(existingUser));
        }

        [Test]
        public async Task UpdateAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing user
            User updatedUser = new User() { UserName = "NonexistentUser" };
            _userRepositoryMock.Setup(x => x.GetByUserName(updatedUser.UserName)).Returns((User)null!);

            // Act
            ActionResult<User> result = await _userController.UpdateAsync(updatedUser);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }

        [Test]
        public async Task DeleteByIdAsync_ReturnsOkResult()
        {
            // Arrange: Existing user by ID
            User existingUser = new User() { Id = "1", UserName = "TestUser" };
            string userId = "1";
            _userRepositoryMock.Setup(x => x.GetById(userId)).Returns(existingUser);
            _userRepositoryMock.Setup(x => x.Delete(existingUser));

            // Act
            ActionResult<User> result = await _userController.DeleteByIdAsync(userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public async Task DeleteByIdAsync_ReturnsNotFoundResult()
        {
            // Arrange: Non-existing user by ID
            string userId = "999";
            _userRepositoryMock.Setup(x => x.GetById(userId)).Returns((User)null!);

            // Act
            ActionResult<User> result = await _userController.DeleteByIdAsync(userId);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
        }
    }
}