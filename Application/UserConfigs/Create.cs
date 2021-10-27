using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.UserConfigs
{
    public class Create
    {
        public class Command : IRequest<UserConfig>
        {
            public UserConfig UserConfig { get; set; }

        }

        public class Handler : IRequestHandler<Command, UserConfig>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<UserConfig> Handle(Command request, CancellationToken cancellationToken)
            {
                UserConfig eUserConfig = new();
                _mapper.Map(request.UserConfig, eUserConfig);

                _context.UserConfigs.Add(eUserConfig);

                await _context.SaveChangesAsync();

                return eUserConfig;
            }
        }
    }
}