using System;
using System.Collections.Generic;

namespace API.DTOs
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
        public List<string> TagIds { get; set; }
    }
}
