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
}

// More config steps
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Adds endpoints for controller actions without specifying any routes

app.Run(); // Starts the web server