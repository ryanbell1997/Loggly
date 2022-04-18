using System;

namespace Domain
{
    public class BillingProfile
    {
        public Guid Id { get; set; }
        public bool IsSubscribed { get; set; } = false;
        public string? StripeToken { get; set; } = null;
    }
}
