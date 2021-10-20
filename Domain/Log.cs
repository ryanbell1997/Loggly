using System;

namespace Domain
{
    public class Log
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public TimeSpan TotalTime { get; set; }
        public decimal HourlyRate { get; set; }
        public decimal TotalCharged { get; set; }
        public bool is_overtime { get; set; }
    }
}