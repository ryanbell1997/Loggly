using System;

namespace API.DTOs
{
    public class AccountInfoDto
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public decimal HourlyRate { get; set; }
        public string Currency { get; set; }
        public string ColourScheme { get; set; }
        public Guid UserConfigId { get; set; }
    }
}
