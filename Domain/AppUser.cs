using Microsoft.AspNetCore.Identity;
using System;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public Guid BillingProfileId { get; set; }
        public BillingProfile BillingProfile { get; set; }
    }
}
