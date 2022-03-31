using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Utils;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tags
{
    public class Edit
    {
        public class Command : IRequest<Result<Tag>>
        {
            public Tag Tag { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Tag).NotEmpty().SetValidator(new TagValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Tag>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Tag>> Handle(Command request, CancellationToken cancellationToken)
            {
                Tag eTag = await _context.Tags.FindAsync(request.Tag.Id);

                if (eTag is null) return null;

                _mapper.Map(request.Tag, eTag);

                bool result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Tag>.Failure("Failed to save changes to tag");

                return Result<Tag>.Success(eTag);
            }
        }
    }
}