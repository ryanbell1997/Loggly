//using Stripe;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Infrastructure.Billing
//{
//    public class StripeProvider
//    {
//        // Set your secret key. Remember to switch to your live secret key in production.
//        // See your keys here: https://dashboard.stripe.com/apikeys
//        StripeConfiguration.ApiKey = "sk_test_51KnndnB68sI0alzq3xchxGbRZU0XDki7ndV4QQ3dTxQOiZ1qcScbB3gyoKJhkj7UqRJyvm6ltu9pLsBRRB5TD4v500tdxLj34X";

//        var options = new ProductCreateOptions { Name = "Basic Dashboard" };
//        var service = new ProductService();
//        service.Create(options);

//        var options = new PriceCreateOptions
//        {
//            Product = "{{PRODUCT_ID}}",
//            UnitAmount = 1000,
//            Currency = "usd",
//            Recurring = new PriceRecurringOptions { Interval = "month" },
//        };

//        var service = new PriceService();
//        service.Create(options);
//    }
//}
