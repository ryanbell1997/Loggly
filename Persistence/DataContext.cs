using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Log> Logs { get; set; }
        public DbSet<UserConfig> UserConfigs { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<LinkLogTag> LinkLogTags { get; set; }
        public DbSet<BillingProfile> BillingProfiles  { get; set; }
    }
}