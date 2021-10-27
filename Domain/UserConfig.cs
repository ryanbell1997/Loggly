using System;

namespace Domain
{
    public class UserConfig
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal HourlyRate { get; set; }
        public string ColourScheme { get; set; }
    }
}
