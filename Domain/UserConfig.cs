using System;

namespace Domain
{
    public class UserConfig
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public decimal HourlyRate { get; set; } = 0;
        public string ColourScheme { get; set; } = String.Empty;
        public string Currency { get; set; } = String.Empty;
    }
}
