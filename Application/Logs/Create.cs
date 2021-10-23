using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Logs
{
    public class Create
    {
        public class Command : IRequest<Log>
        {
            public Log Log { get; set; }

        }

        public class Handler : IRequestHandler<Command, Log>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Log> Handle(Command request, CancellationToken cancellationToken)
            {
                Log eLog = new();
                _mapper.Map(request.Log, eLog);

                eLog.TotalTime = LogUtils.CalculateTotalTime(request.Log.StartTime, request.Log.EndTime);
                eLog.TotalCharged = LogUtils.CalculateTotalEarnings(eLog.TotalTime, request.Log.HourlyRate);    

                _context.Logs.Add(eLog);

                await _context.SaveChangesAsync();

                return eLog;
            }
        }
    }
}