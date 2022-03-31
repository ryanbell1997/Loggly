using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class LinkLogTag
    {
        public Guid Id { get; set; }
        public Guid LogId { get; set; }
        public Guid TagId { get; set; }
        public string UserId { get; set; }
    }
}
