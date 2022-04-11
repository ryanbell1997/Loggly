using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Logs
{
    public class LogDTO
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public TimeSpan TotalTime { get; set; }
        public decimal HourlyRate { get; set; }
        public decimal TotalCharged { get; set; }
        public bool is_overtime { get; set; }
        public string UserId { get; set; }
        public List<string> TagIds { get; set; }
    }
}
