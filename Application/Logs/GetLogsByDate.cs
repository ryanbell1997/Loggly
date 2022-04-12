using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Logs
{
    public class GetLogsByDate
    {
        public class Command : IRequest<Result<List<LogDTO>>>
        {
            public DateTime MonthYear { get; set; }
        }

        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.MonthYear).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command, Result<List<LogDTO>>> 
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

            public async Task<Result<List<LogDTO>>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<List<LogDTO>>.Failure("Failed to validate user Token");

                List<LogDTO> lstLog = await _context.Logs.OrderByDescending(x => x.Date).ProjectTo<LogDTO>(_mapper.ConfigurationProvider)
                                                         .Where(x => x.Date.Month == request.MonthYear.Month && x.Date.Year == request.MonthYear.Year && x.UserId == user.Id)
                                                         .ToListAsync();

                if (lstLog is null) return Result<List<LogDTO>>.Success(lstLog);

                

                return Result<List<LogDTO>>.Success(lstLog);
            
            }
        }

    }
}
