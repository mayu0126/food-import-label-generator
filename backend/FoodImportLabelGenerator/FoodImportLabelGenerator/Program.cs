using FoodImportLabelGenerator;
using FoodImportLabelGenerator.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(); // Registers Controller classes in the builder

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*
// A way to avoid "xy field is required." and 400 Bad Request (empty strings are allowed)
builder.Services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
*/

var app = builder.Build(); // Create an instance of a WebApplication

// Configure the HTTP request pipeline.
// Swagger and Swagger UI should be used in a development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseDeveloperExceptionPage(); // Handy feature during development. In production: set up a custom exception page
}

// More config steps
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Adds endpoints for controller actions without specifying any routes

var configString = builder.Configuration["ConnectionStrings:DefaultConnection"];

void InitializeDb()
{
    using var db = new FoodImportLabelGeneratorContext(new ConfigurationManager(), configString);
    InitializeLabels();
    PrintLabels();

    void InitializeLabels()
    {
        db.Add(new Label
        {
            //Id = 1,
            Date = DateTime.Now,
            LegalName = "Chocolate",
            Nutritions = "calories",
            Producer = "Mayu Kft.",
            Distributor = "Mayu Kft.",
            CountryOfOrigin = "Hungary",
            NetWeight = 500,
            Storage = "20 °C",
            BBD = new DateTime(2023, 12,12),
            Organic = false
        });
        db.Add(new Label()
        {
            //Id = 2,
            Date = DateTime.Now,
            LegalName = "Candy",
            Nutritions = "calories",
            Producer = "Mayu Kft.",
            Distributor = "Mayu Kft.",
            CountryOfOrigin = "Hungary",
            NetWeight = 300,
            Storage = "25 °C",
            BBD = new DateTime(2023, 10, 30),
            Organic = true
        });
        db.SaveChanges(); // required to save changes
    }

    void PrintLabels() // reads all the data from the Labels DbSet
    {
        foreach (var label in db.Labels)
        {
            Console.WriteLine(label.LegalName);
        }
    }
}

InitializeDb();

app.Run(); // Starts the web server