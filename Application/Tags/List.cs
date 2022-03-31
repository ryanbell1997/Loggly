using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using System.Linq;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<Result<List<Tag>>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Tag>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Tag>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Tag>>.Success(await _context.Tags.Where(x => x.UserId == request.UserId).ToListAsync());
            }
        }


    }
}
