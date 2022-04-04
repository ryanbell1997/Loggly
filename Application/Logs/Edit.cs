using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Utils;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Logs
{
    public class Edit
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

            public IUserAccessor UserAccessor { get; }

            public async Task<Result<Log>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<Log>.Failure("Failed to validate user Token");

                Log eLog = await _context.Logs.FirstOrDefaultAsync(l => l.Id == request.Log.Id && l.UserId == user.Id);

                if (eLog is null) return null;
                
                _mapper.Map(request.Log, eLog);

                eLog.TotalTime = LogUtils.CalculateTotalTime(request.Log.StartTime, request.Log.EndTime);
                eLog.TotalCharged = LogUtils.CalculateTotalEarnings(eLog.TotalTime, request.Log.HourlyRate);

                bool result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Log>.Failure("Failed to save changes to log");

                return Result<Log>.Success(eLog);
            }
        }
    }
}