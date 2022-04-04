using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Logs
{
    public class Create
    {
        public class Command : IRequest<Result<Log>>
        {
            public Log Log { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Log).NotEmpty().SetValidator(new LogValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Log>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Log>> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserId());
                
                if (user is null) return Result<Log>.Failure("Failed to validate user Token");

                Log eLog = new();
                _mapper.Map(request.Log, eLog);

                eLog.UserId = user.Id;
                eLog.TotalTime = LogUtils.CalculateTotalTime(request.Log.StartTime, request.Log.EndTime);
                eLog.TotalCharged = LogUtils.CalculateTotalEarnings(eLog.TotalTime, request.Log.HourlyRate);    

                _context.Logs.Add(eLog);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Log>.Failure("Failed to create activity");

                return Result<Log>.Success(eLog);
            }
        }
    }
}