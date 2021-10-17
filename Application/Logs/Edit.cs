using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Logs
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Log Log { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Log eLog = await _context.Logs.FindAsync(request.Log.Id);

                _mapper.Map(request.Log, eLog);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}