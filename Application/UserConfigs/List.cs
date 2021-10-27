using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.UserConfigs
{
    public class List
    {
        public class Query : IRequest<List<UserConfig>>
        {

        }

        public class Handler : IRequestHandler<Query, List<UserConfig>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserConfig>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.UserConfigs.ToListAsync();
            }
        }


    }
}
