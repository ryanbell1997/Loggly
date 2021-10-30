using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using System.Linq;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using System;

namespace Application.Logs
{
    public class MonthlyLogQuantities
    {
        public class Query : IRequest<Result<List<Log>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Log>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Log>>> Handle(Query request, CancellationToken cancellationToken)
            {
                int year = DateTime.Now.Year;

                await _context.Logs.Where(x => x.Date.Year == year).GroupBy(x => x.Date.Month).ToListAsync();

                return Result<List<Log>>.Success(await _context.Logs.OrderByDescending(x => x.Date).ToListAsync());
            }
        }


    }
}
