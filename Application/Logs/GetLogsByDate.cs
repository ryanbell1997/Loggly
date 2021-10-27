using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Logs
{
    public class GetLogsByDate
    {
        public class Command : IRequest<Result<List<Log>>>
        {
            public DateTime MonthYear { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.MonthYear).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command, Result<List<Log>>> 
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Log>>> Handle(Command request, CancellationToken cancellationToken)
            {
                List<Log> lstLog = await _context.Logs.Where(x => x.Date.Month == request.MonthYear.Month && x.Date.Year == request.MonthYear.Year).ToListAsync();

                if (lstLog is null) return null;

                return Result<List<Log>>.Success(lstLog);
            
            }
        }

    }
}
