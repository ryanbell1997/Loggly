using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Domain;
using Persistence;
using Stripe.BillingPortal;
using Stripe.Checkout;
using System.Collections.Generic;
using Stripe;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _context;

        public BillingController(UserManager<AppUser> userManager, DataContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [Route("checkout")]
        [HttpPost]
        public IActionResult CreateCheckout(string lookUpKey)
        {
            var domain = "http://localhost:4242";

            var priceOptions = new PriceListOptions
            {
                LookupKeys = new List<string> {
                    lookUpKey
                }
            };
            var priceService = new PriceService();
            StripeList<Price> prices = priceService.List(priceOptions);

            var options = new Stripe.Checkout.SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = prices.Data[0].Id,
                    Quantity = 1,
                  },
                },
                Mode = "subscription",
                SuccessUrl = domain + "?success=true&session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = domain + "?canceled=true",
            };
            var service = new Stripe.Checkout.SessionService();
            Stripe.Checkout.Session session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }

     
        [Route("manage")]
        [HttpPost]
        public async Task<IActionResult> CreateBillingPortal()
        {
            AppUser user = await _context.Users.Include(u => u.BillingProfile).FirstOrDefaultAsync(u => u.Id == ClaimTypes.NameIdentifier);

            if (user is null) return BadRequest();

            if (user.BillingProfile.StripeToken is null || string.IsNullOrEmpty(user.BillingProfile.StripeToken)) return BadRequest();
                
            // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
            // Typically this is stored alongside the authenticated user in your database.
            var checkoutService = new Stripe.Checkout.SessionService();
            var checkoutSession = checkoutService.Get(user.BillingProfile.StripeToken);

            // This is the URL to which your customer will return after
            // they are done managing billing in the Customer Portal.
            var returnUrl = "http://localhost:4242";

            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = checkoutSession.CustomerId,
                ReturnUrl = returnUrl,
            };
            var service = new Stripe.BillingPortal.SessionService();
            var session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
                
        }
        
    }
}
