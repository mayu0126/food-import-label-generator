using System.Text;
using FoodImportLabelGenerator;
using FoodImportLabelGenerator.Data;
using FoodImportLabelGenerator.Models;
using FoodImportLabelGenerator.Repository;
using FoodImportLabelGenerator.Services.Authentication;
using FoodImportLabelGenerator.Services.Translation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

var appSettings = configuration.GetSection("AppSettings");
var validIssuer = appSettings["ValidIssuer"];
var validAudience = appSettings["ValidAudience"];
var issuerSigningKey = builder.Configuration["UserSecrets:IssuerSigningKey"];
var googleApiKey = builder.Configuration["UserSecrets:GoogleApiKey"];

var defaultRole = appSettings["DefaultRole"];

AddServices();
ConfigureSwagger();
AddDbContext();
AddAuthentication();
AddIdentity();

var app = builder.Build(); // Create an instance of a WebApplication

// Configure the HTTP request pipeline.
// Swagger and Swagger UI should be used in a development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseDeveloperExceptionPage(); // Handy feature during development. In production: set up a custom exception page
}

app.UseCors("AllowAllOrigins");

// More config steps
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); // Adds endpoints for controller actions without specifying any routes

//string connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
/*
void InitializeDb()
{
    using var db = new FoodImportLabelGeneratorContext(new ConfigurationManager());
    db.Database.EnsureCreated();
    PrintLabels();
    
    void PrintLabels()
    {
        foreach (var label in db.Labels)
        {
            Console.WriteLine($"{label.Id}, {label.LegalName}");
        }
    }
}

InitializeDb();
*/

AddRoles();
AddAdmin();

app.Run(); // Starts the web server


void AddServices()
{
    // Add services to the container.
    builder.Services.AddControllers(); // Registers Controller classes in the builder

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    
    // Register the repository interfaces and implementations:
    builder.Services.AddSingleton<ILabelRepository, LabelRepository>();
    builder.Services.AddSingleton<ITranslationRepository, TranslationRepository>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    
    // Add AuthService and TokenService as scoped services:
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<ITokenService>(provider => new TokenService(issuerSigningKey!, validIssuer!, validAudience!));
    
    builder.Services.AddSingleton(defaultRole!); // Register the defaultRole in the IoC  (Inversion of Control) container to be available in the AuthController
    
    builder.Services.AddSingleton(new GoogleTranslationService(googleApiKey!));
    
    /*
    // A way to avoid "xy field is required." and 400 Bad Request (empty strings are allowed)
    builder.Services.AddControllers(
        options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
    */
    
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins", builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });
}

void ConfigureSwagger()
{
    builder.Services.AddSwaggerGen(
        option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Food Import Label Generator API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });
}

void AddDbContext()
{
    builder.Services.AddDbContext<FoodImportLabelGeneratorContext>();
    builder.Services.AddDbContext<UsersContext>();
    builder.Services.AddDbContext<TranslationsContext>();
}

void AddAuthentication()
{
    // JWT token authentication scheme:
    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = validIssuer,
                ValidAudience = validAudience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(issuerSigningKey!)
                ),
            };
        });
}

void AddIdentity()
{
    builder.Services
        .AddIdentityCore<User>(options =>
        {
            options.SignIn.RequireConfirmedAccount = false;
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
        .AddRoles<IdentityRole>() //Enable Identity roles 
        .AddEntityFrameworkStores<UsersContext>();
}

void AddRoles()
{
    using var scope = app.Services.CreateScope(); // RoleManager is a scoped service, therefore we need a scope instance to access it
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var tAdmin = CreateAdminRole(roleManager);
    tAdmin.Wait();

    var tUser = CreateUserRole(roleManager);
    tUser.Wait();
}

async Task CreateAdminRole(RoleManager<IdentityRole> roleManager)
{
    await roleManager.CreateAsync(new IdentityRole("Admin")); //The role string should better be stored as a constant or a value in appsettings
}

async Task CreateUserRole(RoleManager<IdentityRole> roleManager)
{
    await roleManager.CreateAsync(new IdentityRole("User")); //The role string should better be stored as a constant or a value in appsettings
}

void AddAdmin()
{
    var tAdmin = CreateAdminIfNotExists();
    tAdmin.Wait();
}

async Task CreateAdminIfNotExists()
{
    using var scope = app.Services.CreateScope();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var adminInDb = await userManager.FindByEmailAsync("admin@admin.com");
    if (adminInDb == null)
    {
        var admin = new User { UserName = "admin", Email = "admin@admin.com" };
        var adminCreated = await userManager.CreateAsync(admin, "admin123");

        if (adminCreated.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}