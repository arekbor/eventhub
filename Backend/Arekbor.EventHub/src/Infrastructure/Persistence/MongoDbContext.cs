using Arekbor.EventHub.Domain.Entities;
using Arekbor.EventHub.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Arekbor.EventHub.Infrastructure.Persistence;

public class MongoDbContext(
    DbContextOptions<MongoDbContext> dbContextOptions, 
    IOptions<MongoDbOptions> options) : DbContext(dbContextOptions)
{
    private readonly MongoDbOptions _options = options.Value;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder
            .UseMongoDB(_options.ConnectionString, _options.DatabaseName);
    }

    public DbSet<User> Users { get; set; }
}