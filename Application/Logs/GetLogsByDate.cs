using Application.Core;
using Application.Interfaces;
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
        public class Command : IRequest<Result<List<Log>>>
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


        public class Handler : IRequestHandler<Command, Result<List<Log>>> 
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public IUserAccessor UserAccessor { get; }

            public async Task<Result<List<Log>>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<List<Log>>.Failure("Failed to validate user Token");

                List<Log> lstLog = await _context.Logs.Where(x => x.Date.Month == request.MonthYear.Month && x.Date.Year == request.MonthYear.Year && x.UserId == user.Id).ToListAsync();

                if (lstLog is null) return Result<List<Log>>.Success(lstLog);

                return Result<List<Log>>.Success(lstLog);
            
            }
        }

    }
}
