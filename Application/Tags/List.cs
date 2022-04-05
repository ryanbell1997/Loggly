using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using System.Linq;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Application.Interfaces;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<Result<List<Tag>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Tag>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<Result<List<Tag>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<List<Tag>>.Failure("Failed to validate user Token");

                return Result<List<Tag>>.Success(await _context.Tags.Where(x => x.UserId == user.Id).ToListAsync());
            }
        }


    }
}
