using System.Threading;
using System.Threading.Tasks;
using Application.Utils;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserConfigs    
{
    public class Edit
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
                UserConfig eUserConfig = await _context.UserConfigs.FindAsync(request.UserConfig.Id);

                _mapper.Map(request.UserConfig, eUserConfig);

                await _context.SaveChangesAsync();

                return eUserConfig;
            }
        }
    }
}