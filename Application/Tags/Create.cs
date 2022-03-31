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
                //RuleFor(x => x.Log).NotEmpty().SetValidator(new LogValidator());
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
                string userId = request.Tag.UserId;

                if (userId == null)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserId());
                }

                if (string.IsNullOrEmpty(userId)) return Result<Tag>.Failure("No user could be found");

                Tag eTag = new();
                _mapper.Map(request.Tag, eTag);

                _context.Tags.Add(eTag);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Tag>.Failure("Failed to create tag");

                return Result<Tag>.Success(eTag);
            }
        }
    }
}