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

namespace Application.Tags
{
    public class Create
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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Tag>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == _userAccessor.GetUserId());

                if (user is null) return Result<Tag>.Failure("Failed to validate user Token");

                Tag eTag = new();
                _mapper.Map(request.Tag, eTag);
                eTag.UserId = user.Id;

                _context.Tags.Add(eTag);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Tag>.Failure("Failed to create tag");

                return Result<Tag>.Success(eTag);
            }
        }
    }
}