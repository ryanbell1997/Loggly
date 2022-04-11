using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Logs
{
    public class Details
    {
        public class Query : IRequest<Result<LogDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<LogDTO>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<LogDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<LogDTO>.Failure("Failed to validate user Token");

                LogDTO eLog = await _context.Logs.ProjectTo<LogDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(l => l.Id == request.Id && l.UserId == user.Id);

                return Result<LogDTO>.Success(eLog);
            }
        }
    }
}