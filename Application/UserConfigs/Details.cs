using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserConfigs
{
    public class Details
    {
        public class Query : IRequest<UserConfig>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserConfig>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<UserConfig> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.UserConfigs.FindAsync(request.Id);
            }
        }
    }
}