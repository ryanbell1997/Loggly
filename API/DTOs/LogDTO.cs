using Domain;
using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class LogDTO
    {
        public Log Log { get; set; }
        public List<string> TagIds { get; set; }
    }
}
