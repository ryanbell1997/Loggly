using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Log> Logs { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
    }
}