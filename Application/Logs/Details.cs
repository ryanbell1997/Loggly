using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Logs
{
    public class Details
    {
        public class Query : IRequest<Result<Log>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Log>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                 _userAccessor = userAccessor;
            }

            public async Task<Result<Log>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<Log>.Failure("Failed to validate user Token");

                Log eLog = await _context.Logs.FirstOrDefaultAsync(l => l.Id == request.Id && l.UserId == user.Id);

                return Result<Log>.Success(eLog);
            }
        }
    }
}