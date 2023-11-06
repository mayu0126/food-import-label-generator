using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodImportLabelGenerator.Contracts;
using FoodImportLabelGenerator.Controllers;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Services.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;

namespace FoodImportLabelGeneratorTests
{
    public class AuthControllerUnitTests
    {
        private AuthController _authController;
        private Mock<IAuthService> _authServiceMock;
        private Mock<IServiceProvider> _serviceProviderMock;
        private IConfiguration _configuration;
        
    }
}