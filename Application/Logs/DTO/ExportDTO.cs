using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Logs.DTO
{
    public class ExportDTO
    {
        public string FileName { get; set; }
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public List<string>? TagIds { get; set; } = null;
    }
}
