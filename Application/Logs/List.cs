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
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Logs
{
    public class List
    {
        public class Query : IRequest<Result<List<LogDTO>>> 
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<LogDTO>>>
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

            public IUserAccessor UserAccessor { get; }
            public IMapper Mapper { get; }

            public async Task<Result<List<LogDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<List<LogDTO>>.Failure("Failed to validate user Token");

                var logs = await _context.Logs.ProjectTo<LogDTO>(_mapper.ConfigurationProvider).Where(x => x.UserId == user.Id).OrderByDescending(x => x.Date).ToListAsync(cancellationToken);

                return Result<List<LogDTO>>.Success(logs);
            }
        }


    }
}
