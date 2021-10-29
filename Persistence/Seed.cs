using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                List<AppUser> users = new List<AppUser>() 
                { 
                    new AppUser{Email = "bob@test.com", UserName = "Bob"},
                    new AppUser{Email = "chief@test.com", UserName = "Chief"},
                    new AppUser{Email = "ryan@test.com", UserName = "Ryan"},

                };

                foreach(AppUser user in users)
                {
                    await userManager.CreateAsync(user, "Test123!");
                }
            }

            if (context.Logs.Any()) return;

            List<Log> logs = new(){
                new Log
                {
                    StartTime = new TimeSpan(),
                    EndTime = new TimeSpan(),
                    TotalCharged = 15,
                    is_overtime = false,
                    HourlyRate = 5,
                    Date = DateTime.Now.Date
                }
            };

            await context.Logs.AddRangeAsync(logs);
            await context.SaveChangesAsync();
        }
    }
}