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

namespace Application.Logs
{
    public class List
    {
        public class Query : IRequest<Result<List<Log>>> 
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Log>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<Result<List<Log>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<List<Log>>.Failure("Failed to validate user Token");

                return Result<List<Log>>.Success(await _context.Logs.Where(x => x.UserId == user.Id).OrderByDescending(x => x.Date).ToListAsync());
            }
        }


    }
}
