using System.Threading;
using System.Threading.Tasks;
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
                _context.Logs.Add(request.Log);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}