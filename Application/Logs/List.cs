﻿using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using System.Threading;
using System.Linq;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Logs
{
    public class List
    {
        public class Query : IRequest<Result<List<Log>>> 
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Log>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Log>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Log>>.Success(await _context.Logs.Where(x => x.UserId == request.UserId).OrderByDescending(x => x.Date).ToListAsync());
            }
        }


    }
}
