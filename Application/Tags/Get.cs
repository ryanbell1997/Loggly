using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class Get
    {
        public class Query : IRequest<Result<Tag>>
        {
            public Guid Id { get; set; }
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Tag>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Tag>> Handle(Query request, CancellationToken cancellationToken)
            {
                Tag eTag = await _context.Tags.FindAsync(request.Id, request.UserId);

                return Result<Tag>.Success(eTag);
            }
        }
    }
}