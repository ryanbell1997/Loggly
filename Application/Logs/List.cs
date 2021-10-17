using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Logs
{
    public class List
    {
        public class Query : IRequest<List<Log>> 
        {

        }

        public class Handler : IRequestHandler<Query, List<Log>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Log>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Logs.ToListAsync();
            }
        }


    }
}
