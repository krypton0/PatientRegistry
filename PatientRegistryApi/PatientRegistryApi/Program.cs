using HotChocolate.Execution;
using PatientRegistryApi.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Queries>()
    .AddMutationType<Mutations>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGraphQL();

app.MapGet("/graphql/schema", async (IServiceProvider services) =>
{
    var schema = await services.GetRequiredService<IRequestExecutorResolver>().GetRequestExecutorAsync();
    return Results.Ok(schema.Schema.ToString());
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
