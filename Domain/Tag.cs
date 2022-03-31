using System;
using System.Collections.Generic;

namespace Domain
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal HourlyRate { get; set; }
        public string UserId { get; set; }
        public ICollection<LinkLogTag> LinkLogTags { get; set; }
    }
}
