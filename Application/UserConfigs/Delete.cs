using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserConfigs
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                UserConfig eUserConfig = await _context.UserConfigs.FindAsync(request.Id);

                if (eUserConfig is not null)
                {
                    _context.Remove(eUserConfig);
                }

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}