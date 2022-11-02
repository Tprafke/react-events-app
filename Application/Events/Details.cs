using Domain;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Result<Event>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Event>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                // @ used for event due to event being a reserved keyword
                var @event = await _context.Events.FindAsync(request.Id);

                return Result<Event>.Success(@event);
            }
        }
    }
}