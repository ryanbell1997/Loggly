using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Logs.Any()) return;

            List<Log> logs = new(){
                new Log
                {
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now,
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