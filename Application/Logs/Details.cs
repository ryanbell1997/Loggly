using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Logs
{
    public class Details
    {
        public class Query : IRequest<Log>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Log>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Log> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Logs.FindAsync(request.Id);
            }
        }
    }
}