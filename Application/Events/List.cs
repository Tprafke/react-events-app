using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<Event>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Event>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Event>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Event>>.Success(await _context.Events.ToListAsync(cancellationToken));
            }
        }
    }
}