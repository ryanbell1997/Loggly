using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;

namespace Application.Logs
{
    public class Create
    {
        public class Command : IRequest
        {
            public Log Log { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Log eLog = new();
                eLog = request.Log;

                eLog.TotalTime = LogUtils.CalculateTotalTime(request.Log.StartTime, request.Log.EndTime);
                eLog.TotalCharged = LogUtils.CalculateTotalEarnings(eLog.TotalTime, request.Log.HourlyRate);    

                _context.Logs.Add(eLog);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}