using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Logs
{
    internal class LogValidator : AbstractValidator<Log>
    {
        public LogValidator()
        {
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.StartTime).NotEmpty().LessThan(x => x.EndTime);
            RuleFor(x => x.EndTime).NotEmpty().GreaterThan(x => x.StartTime);
            RuleFor(x => x.HourlyRate).NotEmpty();
        }
    }
}
